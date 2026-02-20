from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = [
        ('ADMIN', 'Admin'),
        ('COMMANDER', 'Commander'),
        ('OPERATOR', 'Operator'),
        ('AGENT', 'Agent'),
    ]
    CLEARANCE_CHOICES = [
        ('RESTRICTED', 'Restricted'),
        ('CONFIDENTIAL', 'Confidential'),
        ('SECRET', 'Secret'),
        ('TOP_SECRET', 'Top Secret'),
        ('COSMIC', 'Cosmic Top Secret'),
    ]
    DIVISION_CHOICES = [
        ('RAW', 'R&AW'),
        ('IB', 'Intelligence Bureau'),
        ('DIA', 'Defence Intelligence Agency'),
        ('NTRO', 'National Technical Research Organisation'),
    ]

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='OPERATOR')
    clearance_level = models.CharField(max_length=20, choices=CLEARANCE_CHOICES, default='RESTRICTED')
    division = models.CharField(max_length=10, choices=DIVISION_CHOICES, default='RAW', blank=True)
    avatar_initials = models.CharField(max_length=4, blank=True)

    def save(self, *args, **kwargs):
        if not self.avatar_initials and self.first_name and self.last_name:
            self.avatar_initials = (self.first_name[0] + self.last_name[0]).upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
