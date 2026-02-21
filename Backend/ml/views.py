import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models_ml import predict_threat_score, detect_anomalies, classify_text, score_agent


def _json_body(request):
    try:
        return json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return {}


# ──────────────────────────────
# 1. Threat Score Predictor
# ──────────────────────────────
@csrf_exempt
@require_http_methods(['GET', 'OPTIONS'])
def threat_predict(request):
    if request.method == 'OPTIONS':
        return _cors_ok()
    params = request.GET
    features = {
        'military_budget':      params.get('military_budget', 50),
        'military_personnel':   params.get('military_personnel', 0.5),
        'gdp':                  params.get('gdp', 500),
        'nuclear':              params.get('nuclear', 0),
        'cyber_index':          params.get('cyber_index', 40),
        'air_power':            params.get('air_power', 100),
        'naval_power':          params.get('naval_power', 20),
        'active_conflicts':     params.get('active_conflicts', 0),
        'sanctions':            params.get('sanctions', 0),
        'landmass':             params.get('landmass', 1),
        'population':           params.get('population', 50),
        'exports':              params.get('exports', 100),
        'debt_to_gdp':          params.get('debt_to_gdp', 60),
        'internal_instability': params.get('internal_instability', 30),
        'num_allies':           params.get('num_allies', 5),
    }
    try:
        result = predict_threat_score(features)
        return _json_response(result)
    except Exception as e:
        return _json_response({'error': str(e)}, status=400)


# ──────────────────────────────
# 2. Anomaly Detector
# ──────────────────────────────
@csrf_exempt
@require_http_methods(['POST', 'OPTIONS'])
def anomaly_detect(request):
    if request.method == 'OPTIONS':
        return _cors_ok()
    body = _json_body(request)
    alerts = body.get('alerts', [])
    if not isinstance(alerts, list):
        return _json_response({'error': 'alerts must be a list'}, status=400)
    try:
        result = detect_anomalies(alerts)
        return _json_response(result)
    except Exception as e:
        return _json_response({'error': str(e)}, status=400)


# ──────────────────────────────
# 3. NLP Intel Classifier
# ──────────────────────────────
@csrf_exempt
@require_http_methods(['POST', 'OPTIONS'])
def classify_intel(request):
    if request.method == 'OPTIONS':
        return _cors_ok()
    body = _json_body(request)
    text = body.get('text', '').strip()
    if not text:
        return _json_response({'error': 'text field required'}, status=400)
    try:
        result = classify_text(text)
        return _json_response(result)
    except Exception as e:
        return _json_response({'error': str(e)}, status=400)


# ──────────────────────────────
# 4. Agent Suitability Scorer
# ──────────────────────────────
@csrf_exempt
@require_http_methods(['POST', 'OPTIONS'])
def agent_score(request):
    if request.method == 'OPTIONS':
        return _cors_ok()
    body = _json_body(request)
    try:
        result = score_agent(
            iq=int(body.get('iq', 110)),
            physical=int(body.get('physical', 70)),
            languages=int(body.get('languages', 2)),
            specialization=str(body.get('specialization', 'ANALYSIS')),
            service_years=int(body.get('service_years', 5)),
            prior_ops=int(body.get('prior_ops', 3)),
        )
        return _json_response(result)
    except Exception as e:
        return _json_response({'error': str(e)}, status=400)


# ──────────────────────────────
# Helpers
# ──────────────────────────────
def _json_response(data, status=200):
    resp = JsonResponse(data, status=status)
    resp['Access-Control-Allow-Origin'] = '*'
    resp['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    resp['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    return resp


def _cors_ok():
    from django.http import HttpResponse
    resp = HttpResponse()
    resp['Access-Control-Allow-Origin'] = '*'
    resp['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    resp['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    return resp
