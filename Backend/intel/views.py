import os
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Alert, UserPreference, SearchHistory, ThreatHistory
from .serializers import AlertSerializer, UserPreferenceSerializer, SearchHistorySerializer, ThreatHistorySerializer


class AlertViewSet(viewsets.ModelViewSet):
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        priority = self.request.query_params.get('priority')
        country = self.request.query_params.get('country')
        if priority:
            qs = qs.filter(priority=priority)
        if country:
            qs = qs.filter(country=country)
        return qs

    @action(detail=True, methods=['put'])
    def read(self, request, pk=None):
        alert = self.get_object()
        alert.read = True
        alert.save()
        return Response({'success': True})


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def preferences_view(request):
    pref, _ = UserPreference.objects.get_or_create(user=request.user)
    if request.method == 'GET':
        return Response(UserPreferenceSerializer(pref).data)
    for field in ('favorites', 'watchlist', 'alert_settings', 'theme', 'dashboard_layout'):
        if field in request.data:
            setattr(pref, field, request.data[field])
    pref.save()
    return Response({'success': True})


class SearchHistoryViewSet(viewsets.ModelViewSet):
    serializer_class = SearchHistorySerializer
    http_method_names = ['get', 'post']

    def get_queryset(self):
        return SearchHistory.objects.filter(user=self.request.user)[:20]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def threat_history_view(request, country):
    days = int(request.query_params.get('days', 30))
    from django.utils import timezone
    from datetime import timedelta
    since = timezone.now() - timedelta(days=days)
    history = ThreatHistory.objects.filter(country=country, timestamp__gte=since).order_by('timestamp')
    return Response({
        'country': country,
        'history': ThreatHistorySerializer(history, many=True).data,
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def threat_snapshot_view(request):
    serializer = ThreatHistorySerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response({'success': True}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def news_view(request, country):
    try:
        from newsapi import NewsApiClient
        api_key = os.getenv('NEWS_API_KEY')
        if not api_key:
            return Response({'articles': [], 'message': 'News API key not configured'})
        newsapi = NewsApiClient(api_key=api_key)
        articles = newsapi.get_everything(q=country, language='en', sort_by='publishedAt', page_size=10)
        return Response({'articles': articles.get('articles', [])})
    except Exception as e:
        return Response({'articles': [], 'error': str(e)}, status=500)


@api_view(['GET'])
@permission_classes([])
def health_view(request):
    from django.utils import timezone
    return Response({'status': 'healthy', 'timestamp': timezone.now().isoformat()})
