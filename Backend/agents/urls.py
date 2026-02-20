from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'candidates', views.CandidateViewSet)
router.register(r'agents', views.AgentViewSet)
router.register(r'agent-ids', views.AgentIDViewSet)
router.register(r'clearance-requests', views.ClearanceRequestViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
