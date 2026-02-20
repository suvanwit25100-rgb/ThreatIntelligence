from django.db import models


class Thread(models.Model):
    PRIORITY_CHOICES = [
        ('ROUTINE', 'Routine'), ('PRIORITY', 'Priority'), ('FLASH', 'Flash'), ('CRITIC', 'CRITIC'),
    ]

    participants = models.JSONField(default=list)
    encryption_type = models.CharField(max_length=50, default='AES-256-GCM')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='ROUTINE')
    subject = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Thread #{self.id}: {self.subject or ', '.join(self.participants[:2])}"


class Message(models.Model):
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, related_name='messages')
    sender = models.CharField(max_length=100)
    content = models.TextField()
    encrypted_content = models.TextField(blank=True)
    is_encrypted = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"{self.sender}: {self.content[:50]}"


class CheckIn(models.Model):
    STATUS_CHOICES = [
        ('ON_TIME', 'On Time'), ('LATE', 'Late'), ('MISSED', 'Missed'), ('CRITICAL', 'Critical'),
    ]

    agent_codename = models.CharField(max_length=50)
    last_checkin = models.DateTimeField()
    next_expected = models.DateTimeField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='ON_TIME')

    def __str__(self):
        return f"{self.agent_codename} — {self.status}"


class DeadDrop(models.Model):
    STATUS_CHOICES = [
        ('SCHEDULED', 'Scheduled'), ('COMPLETED', 'Completed'), ('COMPROMISED', 'Compromised'),
    ]

    location_codename = models.CharField(max_length=50)
    city = models.CharField(max_length=100)
    coords = models.CharField(max_length=50, blank=True)
    next_scheduled = models.DateTimeField(null=True, blank=True)
    assigned_agent = models.CharField(max_length=50, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='SCHEDULED')

    def __str__(self):
        return f"{self.location_codename} ({self.city}) [{self.status}]"


class ExtractionRequest(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'), ('APPROVED', 'Approved'), ('DENIED', 'Denied'), ('COMPLETED', 'Completed'),
    ]

    agent_codename = models.CharField(max_length=50)
    location = models.CharField(max_length=200)
    threat_level = models.IntegerField(default=3)
    reason = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    requested_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-requested_at']

    def __str__(self):
        return f"EXTRACT {self.agent_codename} [{self.status}]"
