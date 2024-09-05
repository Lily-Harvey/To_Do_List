from django.contrib import admin
from .models import Task


class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'created_at', 'user')
    search_fields = ('title', 'description')
    list_filter = ('created_at', 'user')


admin.site.register(Task)
