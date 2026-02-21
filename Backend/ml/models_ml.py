"""
ML Engine — Threat Intelligence Platform
Four trained scikit-learn models:
  1. ThreatScorePredictor   — RandomForestRegressor
  2. AnomalyDetector        — IsolationForest
  3. NLPClassifier          — TF-IDF + LogisticRegression
  4. AgentScorer            — GradientBoostingClassifier
"""

import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingClassifier, IsolationForest
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import LabelEncoder
import warnings

warnings.filterwarnings('ignore')

np.random.seed(42)

# ─────────────────────────────────────────────────────────────
# 1. THREAT SCORE PREDICTOR  (RandomForestRegressor)
# ─────────────────────────────────────────────────────────────
FEATURE_NAMES = [
    'military_budget',   # $B
    'military_personnel',# in millions
    'gdp',               # $B
    'nuclear',           # 0/1
    'cyber_index',       # 0-100
    'air_power',         # aircraft count / 100
    'naval_power',       # warship count / 10
    'active_conflicts',  # count
    'sanctions',         # 0/1
    'landmass',          # M km²
    'population',        # M
    'exports',           # $B
    'debt_to_gdp',       # %
    'internal_instability', # 0-100
    'num_allies',        # count
]

def _make_threat_training_data(n=200):
    """Synthesize plausible country-feature → threat-score pairs."""
    rng = np.random.RandomState(42)
    X = np.column_stack([
        rng.uniform(5, 800, n),      # military_budget
        rng.uniform(0.01, 2.5, n),   # military_personnel
        rng.uniform(50, 25000, n),   # gdp
        rng.randint(0, 2, n),        # nuclear
        rng.uniform(10, 95, n),      # cyber_index
        rng.uniform(10, 1500, n),    # air_power
        rng.uniform(1, 400, n),      # naval_power
        rng.randint(0, 8, n),        # active_conflicts
        rng.randint(0, 2, n),        # sanctions
        rng.uniform(0.1, 17, n),     # landmass
        rng.uniform(1, 1400, n),     # population
        rng.uniform(10, 4000, n),    # exports
        rng.uniform(20, 280, n),     # debt_to_gdp
        rng.uniform(0, 100, n),      # internal_instability
        rng.randint(0, 30, n),       # num_allies
    ])
    # Threat score: weighted composite + noise
    y = (
        0.20 * (X[:, 0] / 800 * 100) +            # military_budget
        0.15 * X[:, 3] * 30 +                      # nuclear (big bonus)
        0.15 * (X[:, 4] / 95 * 100) +             # cyber_index
        0.10 * (X[:, 7] / 8 * 100) +              # conflicts
        0.10 * X[:, 8] * 25 +                     # sanctions
        0.10 * (X[:, 13]) +                        # instability
        0.08 * (X[:, 2] / 25000 * 100) +          # gdp (inverse via power)
        0.07 * (X[:, 1] / 2.5 * 100) +            # personnel
        0.05 * np.maximum(0, 20 - X[:, 14]) +     # fewer allies → more threat
        rng.normal(0, 5, n)
    )
    y = np.clip(y, 0, 100)
    return X, y


_X_threat, _y_threat = _make_threat_training_data()
threat_model = RandomForestRegressor(n_estimators=200, max_depth=8, random_state=42, n_jobs=-1)
threat_model.fit(_X_threat, _y_threat)


def predict_threat_score(features: dict) -> dict:
    """
    features: dict with keys matching FEATURE_NAMES.
    Returns predicted score + feature importances.
    """
    vec = np.array([[
        float(features.get('military_budget', 50)),
        float(features.get('military_personnel', 0.5)),
        float(features.get('gdp', 500)),
        float(features.get('nuclear', 0)),
        float(features.get('cyber_index', 40)),
        float(features.get('air_power', 100)),
        float(features.get('naval_power', 20)),
        float(features.get('active_conflicts', 0)),
        float(features.get('sanctions', 0)),
        float(features.get('landmass', 1)),
        float(features.get('population', 50)),
        float(features.get('exports', 100)),
        float(features.get('debt_to_gdp', 60)),
        float(features.get('internal_instability', 30)),
        float(features.get('num_allies', 5)),
    ]])
    score = float(threat_model.predict(vec)[0])
    importances = threat_model.feature_importances_
    fi = sorted(
        [{'feature': n, 'importance': round(float(v), 4)}
         for n, v in zip(FEATURE_NAMES, importances)],
        key=lambda x: x['importance'], reverse=True
    )
    # Per-tree variance as uncertainty estimate
    tree_preds = np.array([t.predict(vec)[0] for t in threat_model.estimators_])
    uncertainty = float(np.std(tree_preds))
    return {
        'score': round(score, 2),
        'uncertainty': round(uncertainty, 2),
        'confidence': round(max(0, 100 - uncertainty * 2), 1),
        'feature_importances': fi[:8],  # top 8
    }


# ─────────────────────────────────────────────────────────────
# 2. ANOMALY DETECTOR  (IsolationForest)
# ─────────────────────────────────────────────────────────────
_SEVERITY_MAP = {'LOW': 1, 'MEDIUM': 2, 'HIGH': 3, 'CRITICAL': 4}
_CATEGORY_MAP = {
    'MILITARY': 1, 'CYBER': 2, 'TERRORISM': 3,
    'ECONOMIC': 4, 'DIPLOMATIC': 5, 'NUCLEAR': 6, 'GENERAL': 0
}

def _make_anomaly_training_data(n=1000):
    """Normal alert patterns (low severity, spread out)."""
    rng = np.random.RandomState(0)
    severity = rng.choice([1, 2, 2, 2, 3], size=n)     # mostly low
    category = rng.randint(0, 7, n)
    hour = rng.randint(0, 24, n)
    count_in_window = rng.poisson(3, n)                  # ~3 alerts/window normally
    return np.column_stack([severity, category, hour, count_in_window])

_X_anom = _make_anomaly_training_data()
anomaly_model = IsolationForest(n_estimators=150, contamination=0.08,
                                 random_state=42, n_jobs=-1)
anomaly_model.fit(_X_anom)


def detect_anomalies(alerts: list) -> dict:
    """
    alerts: list of dicts { severity (str or int), category (str), hour (int, optional) }
    Groups into windows of 5, scores each window.
    """
    if not alerts:
        return {'anomalies': [], 'total_windows': 0, 'anomaly_count': 0}

    windows = []
    size = 5
    for i in range(0, len(alerts), size):
        chunk = alerts[i:i+size]
        severities = []
        categories = []
        for a in chunk:
            sev = a.get('severity', 1)
            if isinstance(sev, str):
                sev = _SEVERITY_MAP.get(sev.upper(), 1)
            cat = a.get('category', 0)
            if isinstance(cat, str):
                cat = _CATEGORY_MAP.get(cat.upper(), 0)
            severities.append(int(sev))
            categories.append(int(cat))
        windows.append({
            'window_idx': i // size,
            'avg_severity': np.mean(severities),
            'max_severity': max(severities),
            'dominant_category': max(set(categories), key=categories.count),
            'count': len(chunk),
        })

    if not windows:
        return {'anomalies': [], 'total_windows': 0, 'anomaly_count': 0}

    X_win = np.array([[
        w['avg_severity'], w['dominant_category'],
        12,  # hour placeholder
        w['count']
    ] for w in windows])

    preds = anomaly_model.predict(X_win)   # 1 = normal, -1 = anomaly
    scores = anomaly_model.score_samples(X_win)  # more negative = more anomalous

    results = []
    for w, p, s in zip(windows, preds, scores):
        results.append({
            **w,
            'is_anomaly': bool(p == -1),
            'anomaly_score': round(float(-s), 4),   # flip so higher = more suspicious
        })

    anomaly_count = sum(1 for r in results if r['is_anomaly'])
    return {
        'anomalies': results,
        'total_windows': len(results),
        'anomaly_count': anomaly_count,
        'overall_risk': 'HIGH' if anomaly_count >= 3 else 'MEDIUM' if anomaly_count >= 1 else 'NORMAL',
    }


# ─────────────────────────────────────────────────────────────
# 3. NLP INTEL CLASSIFIER  (TF-IDF + LogisticRegression)
# ─────────────────────────────────────────────────────────────
_NLP_CATEGORIES = ['Military', 'Cyber', 'Terrorism', 'Economic', 'Political', 'Nuclear']

_NLP_TRAINING_DATA = [
    # Military
    ("PLA armored divisions repositioning near LAC border sectors", "Military"),
    ("Satellite imagery shows military buildup along disputed border", "Military"),
    ("Naval carrier group deployed toward contested waters", "Military"),
    ("Air force conducts live-fire drills with advanced fighters", "Military"),
    ("Army special forces inserted into denied area for reconnaissance", "Military"),
    ("Missile battery activated near forward operating base", "Military"),
    ("Artillery positioned along border amid rising tensions", "Military"),
    ("Troops on high alert as mobilization orders issued", "Military"),
    ("Fighter jets scrambled in response to airspace violation", "Military"),
    ("Ground troops crossing boundary under cover of darkness", "Military"),
    ("Drone surveillance detected over sensitive military facility", "Military"),
    ("Helicopter gunships deployed along contested mountain range", "Military"),
    ("Infantry battalion moved to forward position near border", "Military"),
    ("Navy frigate conducting patrol near disputed island chain", "Military"),
    ("Special forces conducting covert operations in hostile territory", "Military"),
    ("Tank regiment positioned at strategic valley entrance", "Military"),
    ("Submarine detected near naval base amid heightened tensions", "Military"),
    ("Air defense systems activated following radar contacts", "Military"),

    # Cyber
    ("APT group targets government infrastructure with zero-day exploit", "Cyber"),
    ("Critical power grid infiltrated via SCADA vulnerability", "Cyber"),
    ("Ransomware deployed against defense contractor networks", "Cyber"),
    ("State-sponsored hackers breach classified database servers", "Cyber"),
    ("Phishing campaign targets intelligence agency personnel", "Cyber"),
    ("DDoS attack overwhelms financial sector infrastructure", "Cyber"),
    ("Malware found in industrial control systems of nuclear plant", "Cyber"),
    ("Data exfiltration detected from ministry of defense networks", "Cyber"),
    ("Advanced persistent threat active in telecom provider systems", "Cyber"),
    ("Cyber espionage campaign steals weapons research data", "Cyber"),
    ("Nation-state malware variants identified on government servers", "Cyber"),
    ("Backdoor discovered in critical national infrastructure software", "Cyber"),
    ("Encrypted command-and-control traffic indicates active intrusion", "Cyber"),
    ("Supply chain attack compromises defense software update mechanism", "Cyber"),
    ("Operational technology network breached via internet-facing asset", "Cyber"),
    ("Spear phishing emails targeting senior officials with trojan payload", "Cyber"),
    ("CERT alerts to active exploitation of authentication bypass", "Cyber"),
    ("Traffic analysis reveals active data theft from classified networks", "Cyber"),

    # Terrorism
    ("Militant group planning cross-border attack on security forces", "Terrorism"),
    ("Suicide bomber targets crowded market killing civilians", "Terrorism"),
    ("Militant handlers coordinating sleeper cell activation", "Terrorism"),
    ("IED cache discovered near military convoy route", "Terrorism"),
    ("Terror financing network disrupted through joint operation", "Terrorism"),
    ("Kidnapping of foreign nationals by extremist group", "Terrorism"),
    ("Radical group recruiting via encrypted messaging platforms", "Terrorism"),
    ("Car bomb detonated near government building causing casualties", "Terrorism"),
    ("Militant training camp identified from aerial reconnaissance", "Terrorism"),
    ("Extremist cell planning attack on religious gathering", "Terrorism"),
    ("Arms smuggling route used by terrorist organization uncovered", "Terrorism"),
    ("Bomb-making materials seized from suspected militant hideout", "Terrorism"),
    ("Foreign fighters crossing border to join insurgent group", "Terrorism"),
    ("Terror plot against transit infrastructure foiled by agencies", "Terrorism"),
    ("Extremist propaganda inciting violence against minorities", "Terrorism"),
    ("Kidnap-for-ransom operation by militant group in border area", "Terrorism"),
    ("Grenade attack on police station by separatist faction", "Terrorism"),
    ("Ambush of security convoy on highway by armed group", "Terrorism"),

    # Economic
    ("Central bank intervention signals currency manipulation strategy", "Economic"),
    ("Trade war escalates with new tariffs on strategic imports", "Economic"),
    ("Sanctions imposed crippling energy and banking sectors", "Economic"),
    ("Foreign investment withdrawn amid political instability", "Economic"),
    ("Stock market crash triggered by geopolitical uncertainty", "Economic"),
    ("Debt default risk rises as foreign exchange reserves deplete", "Economic"),
    ("Supply chain disruption impacts critical manufacturing sector", "Economic"),
    ("PBOC quietly devaluing yuan amid trade negotiations", "Economic"),
    ("Capital flight accelerates following diplomatic breakdown", "Economic"),
    ("Oil production cuts trigger price spike affecting importers", "Economic"),
    ("Cryptocurrency used to evade financial sanctions", "Economic"),
    ("Export controls on semiconductor components escalate tension", "Economic"),
    ("Belt and Road debt trap mechanisms exploited for leverage", "Economic"),
    ("Energy pipeline weaponized as geopolitical pressure tool", "Economic"),
    ("Commodity market manipulation detected by financial intelligence", "Economic"),
    ("Bond market under stress as foreign holders dump holdings", "Economic"),
    ("Currency swap agreement bypasses dollar-dominated system", "Economic"),
    ("Hostile takeover of strategic port infrastructure via debt relief", "Economic"),

    # Political
    ("Government demands diplomatic expulsion of foreign ambassador", "Political"),
    ("Election interference through social media disinformation", "Political"),
    ("Opposition leader arrested on treason charges before election", "Political"),
    ("Coup attempt foiled by loyalist military units", "Political"),
    ("Diplomatic relations severed following border skirmish", "Political"),
    ("Sanctions regime expanded after human rights violations", "Political"),
    ("UN Security Council emergency session on border crisis", "Political"),
    ("Foreign minister summoned over espionage allegations", "Political"),
    ("State-sponsored propaganda targeting diaspora communities", "Political"),
    ("International coalition forming against rogue regime", "Political"),
    ("Parliamentary crisis triggers early election announcement", "Political"),
    ("Protest movement gains momentum against ruling party", "Political"),
    ("Bilateral summit collapses over sovereignty dispute", "Political"),
    ("Intelligence community briefed on foreign meddling attempt", "Political"),
    ("Ambassador recalled for consultations over territorial claim", "Political"),
    ("Referendum result disputed triggering constitutional crisis", "Political"),
    ("Sanctions waiver denied increasing diplomatic pressure", "Political"),
    ("Foreign ministry issues strongly-worded communique over incident", "Political"),

    # Nuclear
    ("Nuclear test site shows increased tunneling activity", "Nuclear"),
    ("Uranium enrichment elevated beyond treaty thresholds", "Nuclear"),
    ("ICBM launch detected on ballistic trajectory", "Nuclear"),
    ("Nuclear warhead miniaturization program advancing rapidly", "Nuclear"),
    ("Radioactive isotopes detected near suspected test site", "Nuclear"),
    ("Reactor-grade plutonium diverted to weapons program", "Nuclear"),
    ("IAEA inspectors denied access to undeclared facility", "Nuclear"),
    ("Second strike capability demonstrated through submarine launch", "Nuclear"),
    ("Tactical nuclear weapons repositioned to forward deployment zone", "Nuclear"),
    ("Fissile material stockpile exceeds NPT limits by significant margin", "Nuclear"),
    ("Seismic sensors detect underground detonation signatures", "Nuclear"),
    ("Hypersonic vehicle carrying nuclear payload tested successfully", "Nuclear"),
    ("Nuclear doctrine updated to include first-use scenarios", "Nuclear"),
    ("Centrifuge cascade expansion noted at enrichment facility", "Nuclear"),
    ("Dead hand system activated suggesting nuclear readiness posture", "Nuclear"),
    ("Plutonium reprocessing plant operational ahead of schedule", "Nuclear"),
    ("Electromagnetic pulse weapon test causes regional electronics damage", "Nuclear"),
    ("Nuclear submarine patrol frequency increased in strategic waters", "Nuclear"),
]

_texts = [t for t, _ in _NLP_TRAINING_DATA]
_labels = [l for _, l in _NLP_TRAINING_DATA]

nlp_pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(
        ngram_range=(1, 3),
        min_df=1,
        max_features=3000,
        sublinear_tf=True,
    )),
    ('clf', LogisticRegression(
        C=2.0,
        max_iter=1000,
        random_state=42,
        solver='lbfgs',
    )),
])
nlp_pipeline.fit(_texts, _labels)


def classify_text(text: str) -> dict:
    """Returns predicted category + class probabilities."""
    proba = nlp_pipeline.predict_proba([text])[0]
    classes = nlp_pipeline.classes_
    top_idx = int(np.argmax(proba))
    probs = {c: round(float(p), 4) for c, p in zip(classes, proba)}
    sorted_probs = sorted(probs.items(), key=lambda x: x[1], reverse=True)
    return {
        'category': classes[top_idx],
        'confidence': round(float(proba[top_idx]) * 100, 1),
        'probabilities': probs,
        'ranked_categories': [{'category': c, 'probability': round(p * 100, 1)}
                               for c, p in sorted_probs],
    }


# ─────────────────────────────────────────────────────────────
# 4. AGENT SUITABILITY SCORER  (GradientBoostingClassifier)
# ─────────────────────────────────────────────────────────────
_SPEC_ENCODING = {
    'HUMINT': 0, 'SIGINT': 1, 'CYBER': 2,
    'COVERT_OPS': 3, 'ANALYSIS': 4, 'COUNTER_INTEL': 5,
}
_TIER_LABELS = ['TIER-3 (Basic)', 'TIER-2 (Proficient)', 'TIER-1 (Elite)']

def _make_agent_training_data(n=400):
    rng = np.random.RandomState(7)
    iq = rng.randint(90, 160, n)
    physical = rng.randint(40, 100, n)
    languages = rng.randint(1, 7, n)
    spec = rng.randint(0, 6, n)
    service_years = rng.randint(0, 25, n)
    prior_ops = rng.randint(0, 15, n)

    composite = (
        0.30 * (iq - 90) / 70 * 100 +
        0.25 * physical +
        0.15 * languages / 6 * 100 +
        0.15 * service_years / 25 * 100 +
        0.15 * prior_ops / 15 * 100 +
        rng.normal(0, 8, n)
    )
    y = np.where(composite >= 72, 2, np.where(composite >= 48, 1, 0))
    X = np.column_stack([iq, physical, languages, spec, service_years, prior_ops])
    return X, y

_X_agent, _y_agent = _make_agent_training_data()
agent_model = GradientBoostingClassifier(
    n_estimators=200, max_depth=4, learning_rate=0.08,
    random_state=42, subsample=0.8,
)
agent_model.fit(_X_agent, _y_agent)


def score_agent(iq: int, physical: int, languages: int,
                specialization: str, service_years: int = 5,
                prior_ops: int = 3) -> dict:
    spec_enc = _SPEC_ENCODING.get(specialization.upper(), 4)
    X = np.array([[iq, physical, languages, spec_enc, service_years, prior_ops]])
    proba = agent_model.predict_proba(X)[0]
    tier_idx = int(np.argmax(proba))

    # Continuous suitability score (0-100) from weighted composite
    score = min(100, max(0,
        0.30 * (iq - 90) / 70 * 100 +
        0.25 * physical +
        0.15 * languages / 6 * 100 +
        0.15 * service_years / 25 * 100 +
        0.15 * prior_ops / 15 * 100
    ))

    strengths = []
    weaknesses = []
    if iq >= 130: strengths.append("Exceptional analytical intelligence")
    elif iq < 105: weaknesses.append("Below-average cognitive score")
    if physical >= 85: strengths.append("Outstanding physical fitness")
    elif physical < 60: weaknesses.append("Physical fitness below field threshold")
    if languages >= 4: strengths.append("Multi-lingual asset — high infiltration value")
    elif languages == 1: weaknesses.append("Mono-lingual — limited deployment options")
    if prior_ops >= 8: strengths.append("Extensive operational experience")
    if service_years >= 15: strengths.append("Long service track record")

    recommendation = (
        "RECOMMEND FOR IMMEDIATE DEPLOYMENT" if tier_idx == 2 else
        "RECOMMEND FOR FURTHER TRAINING" if tier_idx == 1 else
        "DO NOT DEPLOY — ADDITIONAL PREPARATION REQUIRED"
    )

    return {
        'score': round(score, 1),
        'tier': _TIER_LABELS[tier_idx],
        'tier_idx': tier_idx,
        'recommendation': recommendation,
        'tier_probabilities': {
            'TIER-3': round(float(proba[0]) * 100, 1),
            'TIER-2': round(float(proba[1]) * 100, 1),
            'TIER-1': round(float(proba[2]) * 100, 1),
        },
        'strengths': strengths,
        'weaknesses': weaknesses,
    }
