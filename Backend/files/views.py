from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import GovFile
from .serializers import GovFileSerializer
from core.permissions import IsAdmin


class GovFileViewSet(viewsets.ModelViewSet):
    queryset = GovFile.objects.all()
    serializer_class = GovFileSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        classification = self.request.query_params.get('classification')
        category = self.request.query_params.get('category')
        department = self.request.query_params.get('department')
        if classification:
            qs = qs.filter(classification=classification)
        if category:
            qs = qs.filter(category=category)
        if department:
            qs = qs.filter(department=department)
        return qs

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_permissions(self):
        if self.action == 'destroy':
            return [IsAdmin()]
        return [IsAuthenticated()]
