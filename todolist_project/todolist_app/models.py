from django.db import models
from django.contrib.auth.models import User


class TaskList(models.Model):
    title = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
