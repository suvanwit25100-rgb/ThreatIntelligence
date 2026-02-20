from rest_framework import viewsets, status, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Thread, Message, CheckIn, DeadDrop, ExtractionRequest
from .serializers import (
    ThreadSerializer, MessageSerializer, CheckInSerializer,
    DeadDropSerializer, ExtractionRequestSerializer
)


class ThreadViewSet(viewsets.ModelViewSet):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer

    @action(detail=True, methods=['get'])
    def messages(self, request, pk=None):
        thread = self.get_object()
        msgs = thread.messages.all()
        return Response(MessageSerializer(msgs, many=True).data)


class MessageViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        thread_id = self.request.query_params.get('thread')
        if thread_id:
            qs = qs.filter(thread_id=thread_id)
        return qs


class CheckInViewSet(viewsets.ModelViewSet):
    queryset = CheckIn.objects.all()
    serializer_class = CheckInSerializer


class DeadDropViewSet(viewsets.ModelViewSet):
    queryset = DeadDrop.objects.all()
    serializer_class = DeadDropSerializer


class ExtractionRequestViewSet(viewsets.ModelViewSet):
    queryset = ExtractionRequest.objects.all()
    serializer_class = ExtractionRequestSerializer

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        req = self.get_object()
        req.status = 'APPROVED'
        req.save()
        return Response({'success': True})
