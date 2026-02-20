from django.db import models
import random
import string


class Candidate(models.Model):
    STAGE_CHOICES = [
        ('APPLIED', 'Applied'), ('SCREENING', 'Screening'), ('FIELD_TEST', 'Field Test'),
        ('INTERVIEW', 'Interview'), ('POLYGRAPH', 'Polygraph'), ('CLEARANCE', 'Clearance'),
        ('INDUCTED', 'Inducted'), ('REJECTED', 'Rejected'),
    ]
    SERVICE_CHOICES = [
        ('MILITARY', 'Military'), ('POLICE', 'Police'), ('CIVILIAN', 'Civilian'), ('INTELLIGENCE', 'Intelligence'),
    ]
    SPEC_CHOICES = [
        ('HUMINT', 'HUMINT'), ('SIGINT', 'SIGINT'), ('CYBER', 'Cyber Ops'),
        ('COVERT_OPS', 'Covert Ops'), ('ANALYSIS', 'Analysis'), ('COUNTER_INTEL', 'Counter-Intelligence'),
    ]

    name = models.CharField(max_length=200)
    app_id = models.CharField(max_length=20, unique=True, blank=True)
    age = models.IntegerField()
    education = models.CharField(max_length=100)
    university = models.CharField(max_length=200)
    languages = models.JSONField(default=list)
    physical_score = models.IntegerField()
    iq_score = models.IntegerField()
    service = models.CharField(max_length=20, choices=SERVICE_CHOICES)
    specialization = models.CharField(max_length=20, choices=SPEC_CHOICES)
    stage = models.CharField(max_length=20, choices=STAGE_CHOICES, default='APPLIED')
    priority = models.BooleanField(default=False)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.app_id:
            suffix = ''.join(random.choices(string.digits, k=4))
            self.app_id = f"RAW-2026-{suffix}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.app_id} — {self.name} [{self.stage}]"


class Agent(models.Model):
    STATUS_CHOICES = [
        ('ACTIVE', 'Active'), ('DORMANT', 'Dormant'), ('COMPROMISED', 'Compromised'),
        ('EXTRACTED', 'Extracted'), ('MIA', 'Missing in Action'), ('TRAINING', 'Training'),
    ]
    CLEARANCE_CHOICES = [
        ('RESTRICTED', 'Restricted'), ('CONFIDENTIAL', 'Confidential'), ('SECRET', 'Secret'),
        ('TOP_SECRET', 'Top Secret'), ('COSMIC', 'Cosmic Top Secret'),
    ]
    DIVISION_CHOICES = [
        ('RAW', 'R&AW'), ('IB', 'IB'), ('DIA', 'DIA'), ('NTRO', 'NTRO'),
    ]

    codename = models.CharField(max_length=50, unique=True)
    real_name = models.CharField(max_length=200)
    cover_identity = models.CharField(max_length=200, blank=True)
    batch = models.CharField(max_length=20, blank=True)
    specialization = models.CharField(max_length=50)
    clearance = models.CharField(max_length=20, choices=CLEARANCE_CHOICES, default='SECRET')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='TRAINING')
    division = models.CharField(max_length=10, choices=DIVISION_CHOICES, default='RAW')
    skills = models.JSONField(default=dict)
    handler = models.CharField(max_length=100, blank=True)
    deployed_country = models.CharField(max_length=100, blank=True)
    languages = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.codename} ({self.real_name}) [{self.status}]"


class TrainingRecord(models.Model):
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='training_records')
    module_name = models.CharField(max_length=100)
    duration_weeks = models.IntegerField(default=4)
    difficulty = models.IntegerField(default=3)
    score = models.IntegerField(default=0)
    passed = models.BooleanField(default=False)
    completed_date = models.DateField(null=True, blank=True)

    class Meta:
        unique_together = ('agent', 'module_name')

    def __str__(self):
        return f"{self.agent.codename} — {self.module_name}: {self.score}"


class AgentID(models.Model):
    STATUS_CHOICES = [('ACTIVE', 'Active'), ('EXPIRED', 'Expired'), ('REVOKED', 'Revoked')]
    AGENCY_CHOICES = [('RAW', 'R&AW'), ('IB', 'IB'), ('DIA', 'DIA'), ('NTRO', 'NTRO')]

    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='ids')
    id_number = models.CharField(max_length=30, unique=True)
    agency = models.CharField(max_length=10, choices=AGENCY_CHOICES)
    clearance = models.CharField(max_length=20)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='ACTIVE')
    bio_hash = models.CharField(max_length=64, blank=True)
    blood_type = models.CharField(max_length=5, blank=True)
    issued = models.DateField(auto_now_add=True)
    expiry = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.id_number} — {self.agent.codename} [{self.status}]"


class ClearanceRequest(models.Model):
    STATUS_CHOICES = [('PENDING', 'Pending'), ('APPROVED', 'Approved'), ('DENIED', 'Denied')]

    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='clearance_requests')
    current_level = models.CharField(max_length=20)
    requested_level = models.CharField(max_length=20)
    supervisor = models.CharField(max_length=100)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    requested_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.agent.codename}: {self.current_level} → {self.requested_level} [{self.status}]"
