from django.contrib import admin
from django.urls import path, include
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from accounts.models import User
from agents.models import Candidate, Agent
from operations.models import Mission, Deployment
from intel.models import Alert
from comms.models import Thread, CheckIn


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_stats(request):
    return Response({
        'users': User.objects.count(),
        'candidates': Candidate.objects.count(),
        'agents': Agent.objects.count(),
        'missions': Mission.objects.count(),
        'active_deployments': Deployment.objects.filter(status='ON_MISSION').count(),
        'alerts': Alert.objects.count(),
        'unread_alerts': Alert.objects.filter(read=False).count(),
        'threads': Thread.objects.count(),
        'checkins_overdue': CheckIn.objects.filter(status__in=['MISSED', 'CRITICAL']).count(),
    })


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/', include('intel.urls')),
    path('api/', include('agents.urls')),
    path('api/', include('operations.urls')),
    path('api/', include('comms.urls')),
    path('api/', include('files.urls')),
    path('api/admin/stats/', admin_stats, name='admin-stats'),
    path('api/ml/', include('ml.urls')),
]
