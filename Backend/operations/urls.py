from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'missions', views.MissionViewSet)
router.register(r'deployments', views.DeploymentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
