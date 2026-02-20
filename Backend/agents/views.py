from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Candidate, Agent, TrainingRecord, AgentID, ClearanceRequest
from .serializers import (
    CandidateSerializer, AgentSerializer, AgentListSerializer,
    TrainingRecordSerializer, AgentIDSerializer, ClearanceRequestSerializer
)

PIPELINE_ORDER = ['APPLIED', 'SCREENING', 'FIELD_TEST', 'INTERVIEW', 'POLYGRAPH', 'CLEARANCE', 'INDUCTED']


class CandidateViewSet(viewsets.ModelViewSet):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        stage = self.request.query_params.get('stage')
        if stage:
            qs = qs.filter(stage=stage)
        return qs

    @action(detail=True, methods=['post'])
    def advance(self, request, pk=None):
        candidate = self.get_object()
        if candidate.stage == 'REJECTED':
            return Response({'error': 'Cannot advance a rejected candidate'}, status=400)
        try:
            idx = PIPELINE_ORDER.index(candidate.stage)
            if idx < len(PIPELINE_ORDER) - 1:
                candidate.stage = PIPELINE_ORDER[idx + 1]
                candidate.save()
                return Response({'success': True, 'new_stage': candidate.stage})
            return Response({'error': 'Already at final stage'}, status=400)
        except ValueError:
            return Response({'error': 'Invalid stage'}, status=400)

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        candidate = self.get_object()
        candidate.stage = 'REJECTED'
        candidate.save()
        return Response({'success': True})


class AgentViewSet(viewsets.ModelViewSet):
    queryset = Agent.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return AgentListSerializer
        return AgentSerializer

    @action(detail=True, methods=['get', 'post'])
    def training(self, request, pk=None):
        agent = self.get_object()
        if request.method == 'GET':
            records = agent.training_records.all()
            return Response(TrainingRecordSerializer(records, many=True).data)
        serializer = TrainingRecordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(agent=agent)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AgentIDViewSet(viewsets.ModelViewSet):
    queryset = AgentID.objects.all()
    serializer_class = AgentIDSerializer

    @action(detail=True, methods=['post'])
    def revoke(self, request, pk=None):
        agent_id = self.get_object()
        agent_id.status = 'REVOKED'
        agent_id.save()
        return Response({'success': True})


class ClearanceRequestViewSet(viewsets.ModelViewSet):
    queryset = ClearanceRequest.objects.all()
    serializer_class = ClearanceRequestSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        status_filter = self.request.query_params.get('status')
        if status_filter:
            qs = qs.filter(status=status_filter)
        return qs

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        req = self.get_object()
        req.status = 'APPROVED'
        req.save()
        req.agent.clearance = req.requested_level
        req.agent.save()
        return Response({'success': True})

    @action(detail=True, methods=['post'])
    def deny(self, request, pk=None):
        req = self.get_object()
        req.status = 'DENIED'
        req.save()
        return Response({'success': True})
