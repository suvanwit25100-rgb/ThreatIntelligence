from django.db import models


class Mission(models.Model):
    TYPE_CHOICES = [
        ('INFILTRATION', 'Infiltration'), ('SURVEILLANCE', 'Surveillance'),
        ('EXTRACTION', 'Extraction'), ('SABOTAGE', 'Sabotage'),
        ('ASSASSINATION', 'Assassination'), ('INTELLIGENCE', 'Intelligence Gathering'),
        ('RECON', 'Reconnaissance'), ('ESCORT', 'Escort'),
    ]
    STATUS_CHOICES = [
        ('UNASSIGNED', 'Unassigned'), ('ASSIGNED', 'Assigned'), ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'), ('FAILED', 'Failed'), ('ABORTED', 'Aborted'),
    ]
    CLASSIFICATION_CHOICES = [
        ('UNCLASSIFIED', 'Unclassified'), ('CONFIDENTIAL', 'Confidential'),
        ('SECRET', 'Secret'), ('TOP_SECRET', 'Top Secret'), ('COSMIC', 'Cosmic'),
    ]

    mission_id = models.CharField(max_length=20, unique=True)
    codename = models.CharField(max_length=100)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    location = models.CharField(max_length=200)
    risk_level = models.IntegerField(default=3)
    duration = models.CharField(max_length=50)
    required_skills = models.JSONField(default=list)
    classification = models.CharField(max_length=20, choices=CLASSIFICATION_CHOICES, default='SECRET')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='UNASSIGNED')
    briefing = models.TextField(blank=True)
    assigned_agent = models.ForeignKey('agents.Agent', on_delete=models.SET_NULL, null=True, blank=True, related_name='missions')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.mission_id} — {self.codename} [{self.status}]"


class Deployment(models.Model):
    STATUS_CHOICES = [
        ('ON_MISSION', 'On Mission'), ('RETURNING', 'Returning'), ('OVERDUE', 'Overdue'), ('COMPLETED', 'Completed'),
    ]

    agent = models.ForeignKey('agents.Agent', on_delete=models.CASCADE, related_name='deployments')
    mission = models.ForeignKey(Mission, on_delete=models.CASCADE, related_name='deployments')
    deployed_date = models.DateTimeField(auto_now_add=True)
    last_checkin = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ON_MISSION')
    days_deployed = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.agent.codename} → {self.mission.codename} [{self.status}]"
