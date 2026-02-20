from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Mission, Deployment
from .serializers import MissionSerializer, DeploymentSerializer
from agents.models import Agent


class MissionViewSet(viewsets.ModelViewSet):
    queryset = Mission.objects.all()
    serializer_class = MissionSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        status_filter = self.request.query_params.get('status')
        mission_type = self.request.query_params.get('type')
        if status_filter:
            qs = qs.filter(status=status_filter)
        if mission_type:
            qs = qs.filter(type=mission_type)
        return qs

    @action(detail=True, methods=['post'])
    def assign(self, request, pk=None):
        mission = self.get_object()
        agent_id = request.data.get('agent_id')
        try:
            agent = Agent.objects.get(id=agent_id)
        except Agent.DoesNotExist:
            return Response({'error': 'Agent not found'}, status=404)
        mission.assigned_agent = agent
        mission.status = 'ASSIGNED'
        mission.save()
        Deployment.objects.create(agent=agent, mission=mission)
        return Response({'success': True, 'agent': agent.codename})

    @action(detail=True, methods=['get'])
    def match(self, request, pk=None):
        mission = self.get_object()
        required = set(mission.required_skills)
        agents = Agent.objects.filter(status__in=['ACTIVE', 'TRAINING'])
        results = []
        for agent in agents:
            agent_skills = set(agent.skills.keys()) if isinstance(agent.skills, dict) else set()
            overlap = required & agent_skills
            score = (len(overlap) / len(required) * 100) if required else 50
            results.append({
                'id': agent.id,
                'codename': agent.codename,
                'match_percent': round(score),
                'skills': agent.skills,
                'status': agent.status,
            })
        results.sort(key=lambda x: x['match_percent'], reverse=True)
        return Response(results[:5])


class DeploymentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Deployment.objects.all()
    serializer_class = DeploymentSerializer
