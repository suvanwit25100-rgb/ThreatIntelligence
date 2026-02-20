from django.db import models
from django.conf import settings


class GovFile(models.Model):
    CLASSIFICATION_CHOICES = [
        ('UNCLASSIFIED', 'Unclassified'), ('CONFIDENTIAL', 'Confidential'),
        ('SECRET', 'Secret'), ('TOP_SECRET', 'Top Secret'), ('COSMIC', 'Cosmic'),
    ]
    CATEGORY_CHOICES = [
        ('INTELLIGENCE', 'Intelligence Report'), ('MILITARY', 'Military'),
        ('DIPLOMATIC', 'Diplomatic Cable'), ('ECONOMIC', 'Economic'),
        ('NUCLEAR', 'Nuclear'), ('CYBER', 'Cyber'), ('INTERNAL', 'Internal Memo'),
    ]

    title = models.CharField(max_length=300)
    classification = models.CharField(max_length=20, choices=CLASSIFICATION_CHOICES, default='SECRET')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='INTELLIGENCE')
    department = models.CharField(max_length=100)
    content_summary = models.TextField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='files')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"[{self.classification}] {self.title}"
