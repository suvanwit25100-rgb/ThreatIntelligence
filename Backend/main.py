from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, timedelta
from database import init_db, get_session, Alert, UserPreference, SearchHistory, ThreatHistory
import os
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'dev-jwt-secret')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# CORS configuration
CORS(app, origins=os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(','))

# JWT setup
jwt = JWTManager(app)

# Initialize database
db_session = init_db(os.getenv('DATABASE_URL', 'sqlite:///intelligence.db'))

# Sample country data (will be imported from frontend)
COUNTRY_DATA_PATH = '../Frontend/src/data/countryData.js'

# ==================== AUTHENTICATION ====================

@app.route('/api/auth/login', methods=['POST'])
def login():
    """Simple authentication endpoint"""
    data = request.get_json()
    username = data.get('username', '')
    pin = data.get('pin', '')
    
    # Simple validation (in production, use proper authentication)
    if username and len(pin) == 6:
        access_token = create_access_token(identity=username)
        return jsonify({
            'success': True,
            'access_token': access_token,
            'username': username
        }), 200
    
    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

# ==================== ALERTS ====================

@app.route('/api/alerts', methods=['GET'])
@jwt_required()
def get_alerts():
    """Get all alerts with optional filtering"""
    priority = request.args.get('priority')
    country = request.args.get('country')
    limit = int(request.args.get('limit', 50))
    
    session = get_session()
    query = session.query(Alert)
    
    if priority:
        query = query.filter(Alert.priority == priority)
    if country:
        query = query.filter(Alert.country == country)
    
    alerts = query.order_by(Alert.timestamp.desc()).limit(limit).all()
    
    return jsonify({
        'alerts': [{
            'id': a.id,
            'country': a.country,
            'event': a.event,
            'priority': a.priority,
            'timestamp': a.timestamp.isoformat(),
            'read': a.read,
            'category': a.category
        } for a in alerts]
    }), 200

@app.route('/api/alerts', methods=['POST'])
@jwt_required()
def create_alert():
    """Create a new alert"""
    data = request.get_json()
    session = get_session()
    
    alert = Alert(
        country=data.get('country'),
        event=data.get('event'),
        priority=data.get('priority', 'MEDIUM'),
        category=data.get('category', 'GENERAL')
    )
    
    session.add(alert)
    session.commit()
    
    return jsonify({'success': True, 'alert_id': alert.id}), 201

@app.route('/api/alerts/<int:alert_id>/read', methods=['PUT'])
@jwt_required()
def mark_alert_read(alert_id):
    """Mark an alert as read"""
    session = get_session()
    alert = session.query(Alert).filter(Alert.id == alert_id).first()
    
    if alert:
        alert.read = True
        session.commit()
        return jsonify({'success': True}), 200
    
    return jsonify({'success': False, 'message': 'Alert not found'}), 404

# ==================== USER PREFERENCES ====================

@app.route('/api/preferences', methods=['GET'])
@jwt_required()
def get_preferences():
    """Get user preferences"""
    user_id = get_jwt_identity()
    session = get_session()
    
    prefs = session.query(UserPreference).filter(UserPreference.user_id == user_id).first()
    
    if not prefs:
        # Create default preferences
        prefs = UserPreference(
            user_id=user_id,
            favorites=[],
            watchlist=[],
            alert_settings={'sound': True, 'critical_only': False},
            theme='dark',
            dashboard_layout={}
        )
        session.add(prefs)
        session.commit()
    
    return jsonify({
        'favorites': prefs.favorites or [],
        'watchlist': prefs.watchlist or [],
        'alert_settings': prefs.alert_settings or {},
        'theme': prefs.theme,
        'dashboard_layout': prefs.dashboard_layout or {}
    }), 200

@app.route('/api/preferences', methods=['PUT'])
@jwt_required()
def update_preferences():
    """Update user preferences"""
    user_id = get_jwt_identity()
    data = request.get_json()
    session = get_session()
    
    prefs = session.query(UserPreference).filter(UserPreference.user_id == user_id).first()
    
    if not prefs:
        prefs = UserPreference(user_id=user_id)
        session.add(prefs)
    
    if 'favorites' in data:
        prefs.favorites = data['favorites']
    if 'watchlist' in data:
        prefs.watchlist = data['watchlist']
    if 'alert_settings' in data:
        prefs.alert_settings = data['alert_settings']
    if 'theme' in data:
        prefs.theme = data['theme']
    if 'dashboard_layout' in data:
        prefs.dashboard_layout = data['dashboard_layout']
    
    session.commit()
    
    return jsonify({'success': True}), 200

# ==================== SEARCH & HISTORY ====================

@app.route('/api/search/history', methods=['GET'])
@jwt_required()
def get_search_history():
    """Get user's search history"""
    user_id = get_jwt_identity()
    session = get_session()
    
    history = session.query(SearchHistory)\
        .filter(SearchHistory.user_id == user_id)\
        .order_by(SearchHistory.timestamp.desc())\
        .limit(20).all()
    
    return jsonify({
        'history': [{
            'id': h.id,
            'query': h.query,
            'filters': h.filters,
            'timestamp': h.timestamp.isoformat()
        } for h in history]
    }), 200

@app.route('/api/search/history', methods=['POST'])
@jwt_required()
def save_search():
    """Save a search query"""
    user_id = get_jwt_identity()
    data = request.get_json()
    session = get_session()
    
    search = SearchHistory(
        user_id=user_id,
        query=data.get('query', ''),
        filters=data.get('filters', {})
    )
    
    session.add(search)
    session.commit()
    
    return jsonify({'success': True}), 201

# ==================== THREAT HISTORY ====================

@app.route('/api/threats/history/<country>', methods=['GET'])
@jwt_required()
def get_threat_history(country):
    """Get historical threat data for a country"""
    days = int(request.args.get('days', 30))
    session = get_session()
    
    since = datetime.utcnow() - timedelta(days=days)
    history = session.query(ThreatHistory)\
        .filter(ThreatHistory.country == country)\
        .filter(ThreatHistory.timestamp >= since)\
        .order_by(ThreatHistory.timestamp.asc()).all()
    
    return jsonify({
        'country': country,
        'history': [{
            'timestamp': h.timestamp.isoformat(),
            'threat_level': h.threat_level,
            'threat_score': h.threat_score
        } for h in history]
    }), 200

@app.route('/api/threats/snapshot', methods=['POST'])
@jwt_required()
def save_threat_snapshot():
    """Save a threat data snapshot"""
    data = request.get_json()
    session = get_session()
    
    snapshot = ThreatHistory(
        country=data.get('country'),
        threat_level=data.get('threat_level'),
        threat_score=data.get('threat_score'),
        snapshot_data=data.get('snapshot_data', {})
    )
    
    session.add(snapshot)
    session.commit()
    
    return jsonify({'success': True}), 201

# ==================== NEWS INTEGRATION ====================

@app.route('/api/news/<country>', methods=['GET'])
@jwt_required()
def get_country_news(country):
    """Get news for a specific country"""
    try:
        from newsapi import NewsApiClient
        
        api_key = os.getenv('NEWS_API_KEY')
        if not api_key:
            return jsonify({
                'articles': [],
                'message': 'News API key not configured'
            }), 200
        
        newsapi = NewsApiClient(api_key=api_key)
        
        # Get news articles
        articles = newsapi.get_everything(
            q=country,
            language='en',
            sort_by='publishedAt',
            page_size=10
        )
        
        return jsonify({
            'articles': articles.get('articles', [])
        }), 200
        
    except Exception as e:
        return jsonify({
            'articles': [],
            'error': str(e)
        }), 500

# ==================== HEALTH CHECK ====================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat()
    }), 200

# ==================== MAIN ====================

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)