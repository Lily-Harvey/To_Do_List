from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):
    """
    Model representing a task created by a user.
    Each task has a title, an optional description, a completion status,
    and a timestamp of when it was created.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             related_name='tasks')
    # ForeignKey links each task to a specific user.
    # 'on_delete=models.CASCADE' ensures that if a user is deleted,
    # their tasks are also deleted.
    # 'related_name' allows access to a user's tasks via 'user.tasks'.

    title = models.CharField(max_length=255)
    # Title of the task, limited to 255 characters.

    description = models.TextField(blank=True, null=True)
    # Optional detailed description of the task.
    # Can be left blank or set to null.

    completed = models.BooleanField(default=False)
    # Boolean field to indicate whether the task is completed or not.
    # Defaults to False.

    created_at = models.DateTimeField(auto_now_add=True)
    # Timestamp that automatically records when the task was created.

    def __str__(self):
        # String representation of the task model,
        # returning the title of the task.
        return self.title
