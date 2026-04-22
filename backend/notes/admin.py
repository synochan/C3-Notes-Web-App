from django.contrib import admin

from .models import Note


@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "owner",
        "priority",
        "status",
        "due_at",
        "is_pinned",
        "is_archived",
        "updated_at",
    )
    search_fields = ("title", "content", "category")
    list_filter = ("priority", "status", "is_pinned", "is_archived", "created_at", "updated_at")
