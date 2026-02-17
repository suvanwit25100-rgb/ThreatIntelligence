from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, JSON, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import os

Base = declarative_base()

class Alert(Base):
    __tablename__ = 'alerts'
    
    id = Column(Integer, primary_key=True)
    country = Column(String(100))
    event = Column(String(500))
    priority = Column(String(20))  # LOW, MEDIUM, HIGH, CRITICAL
    timestamp = Column(DateTime, default=datetime.utcnow)
    read = Column(Boolean, default=False)
    category = Column(String(50))  # MILITARY, ECONOMIC, DIPLOMATIC, etc.

class UserPreference(Base):
    __tablename__ = 'user_preferences'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(String(100), unique=True)
    favorites = Column(JSON)  # List of favorite countries
    watchlist = Column(JSON)  # List of countries to watch
    alert_settings = Column(JSON)  # Alert configuration
    theme = Column(String(20), default='dark')
    dashboard_layout = Column(JSON)  # Custom layout preferences

class SearchHistory(Base):
    __tablename__ = 'search_history'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(String(100))
    query = Column(String(200))
    filters = Column(JSON)
    timestamp = Column(DateTime, default=datetime.utcnow)

class ThreatHistory(Base):
    __tablename__ = 'threat_history'
    
    id = Column(Integer, primary_key=True)
    country = Column(String(100))
    threat_level = Column(String(20))
    threat_score = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)
    snapshot_data = Column(JSON)  # Full country data snapshot

# Database initialization
def init_db(database_url='sqlite:///intelligence.db'):
    engine = create_engine(database_url, echo=True)
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    return Session()

def get_session(database_url='sqlite:///intelligence.db'):
    engine = create_engine(database_url, echo=False)
    Session = sessionmaker(bind=engine)
    return Session()
