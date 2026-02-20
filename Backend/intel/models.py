from django.db import models
from django.conf import settings


class Alert(models.Model):
    PRIORITY_CHOICES = [('LOW', 'Low'), ('MEDIUM', 'Medium'), ('HIGH', 'High'), ('CRITICAL', 'Critical')]
    CATEGORY_CHOICES = [
        ('MILITARY', 'Military'), ('ECONOMIC', 'Economic'), ('DIPLOMATIC', 'Diplomatic'),
        ('CYBER', 'Cyber'), ('TERRORISM', 'Terrorism'), ('NUCLEAR', 'Nuclear'), ('GENERAL', 'General'),
    ]

    country = models.CharField(max_length=100)
    event = models.TextField()
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='MEDIUM')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='GENERAL')
    read = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"[{self.priority}] {self.country}: {self.event[:60]}"


class UserPreference(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='preferences')
    favorites = models.JSONField(default=list, blank=True)
    watchlist = models.JSONField(default=list, blank=True)
    alert_settings = models.JSONField(default=dict, blank=True)
    theme = models.CharField(max_length=20, default='dark')
    dashboard_layout = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return f"Preferences for {self.user.username}"


class SearchHistory(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='searches')
    query = models.CharField(max_length=200)
    filters = models.JSONField(default=dict, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.user.username}: {self.query}"


class ThreatHistory(models.Model):
    country = models.CharField(max_length=100)
    threat_level = models.CharField(max_length=20)
    threat_score = models.FloatField()
    snapshot_data = models.JSONField(default=dict, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.country} — {self.threat_level} ({self.threat_score})"
