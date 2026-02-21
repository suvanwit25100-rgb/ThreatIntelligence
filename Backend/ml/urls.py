from django.urls import path
from . import views

urlpatterns = [
    path('threat-predict/', views.threat_predict, name='ml-threat-predict'),
    path('anomaly-detect/', views.anomaly_detect, name='ml-anomaly-detect'),
    path('classify-text/', views.classify_intel, name='ml-classify-text'),
    path('score-agent/', views.agent_score, name='ml-score-agent'),
]
