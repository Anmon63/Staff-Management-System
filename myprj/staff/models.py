from django.db import models
import random
import string



ROLE_CHOICES = [
    ('admin', 'Admin'),
    ('hr', 'HR'),
    ('management', 'Management'),
    ('teamlead', 'Team Lead'),
    ('staff', 'Staff'),
]

class Staff_Profile(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    position = models.CharField(max_length=50)
    join_date = models.DateField()
    username = models.CharField(max_length=50, unique=True,blank=True,null=True)
    password = models.CharField(max_length=100,blank=True,null=True)
    role = models.CharField(max_length=20,choices=ROLE_CHOICES)
    
    def save(self, *args, **kwargs):
        if not self.username:
            base_username = ''.join(self.name.lower().split())  # remove spaces, lowercase
            random_suffix = ''.join(random.choices(string.digits, k=4))  # 4 random digits
            final_username = f"{base_username}{random_suffix}"

        # Ensure username is unique
            while Staff_Profile.objects.filter(username=final_username).exists():
                random_suffix = ''.join(random.choices(string.digits, k=4))
                final_username = f"{base_username}{random_suffix}"

            self.username = final_username

        super().save(*args, **kwargs)
    
class Project(models.Model):
    project_name = models.CharField(max_length=100)
    project_description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    assigned_management = models.ForeignKey(Staff_Profile, on_delete=models.CASCADE, related_name='management_projects')
    assigned_team_lead = models.ForeignKey(Staff_Profile, on_delete=models.CASCADE, related_name='team_lead_projects')
    assigned_staff = models.ManyToManyField(Staff_Profile, related_name='staff_projects')
    status = models.CharField(max_length=20, choices=[('ongoing', 'Ongoing'), ('completed', 'Completed'), ('on_hold', 'On Hold')])

class Task(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tasks')
    assigned_staff = models.ForeignKey(Staff_Profile, on_delete=models.CASCADE, related_name='assigned_tasks')
    task_name = models.CharField(max_length=100)
    task_description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=[('not_started', 'Not Started'), ('in_progress', 'In Progress'), ('completed', 'Completed')])
# Create your models here.
# 1:name  2:email  3:Phone  4:Position  5:Join date  6:Username  7: Password  8:role