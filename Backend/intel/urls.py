from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'alerts', views.AlertViewSet)
router.register(r'search/history', views.SearchHistoryViewSet, basename='search-history')

urlpatterns = [
    path('', include(router.urls)),
    path('preferences/', views.preferences_view, name='preferences'),
    path('threats/history/<str:country>/', views.threat_history_view, name='threat-history'),
    path('threats/snapshot/', views.threat_snapshot_view, name='threat-snapshot'),
    path('news/<str:country>/', views.news_view, name='news'),
    path('health/', views.health_view, name='health'),
]
