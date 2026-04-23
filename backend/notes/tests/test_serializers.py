from django.contrib.auth import get_user_model
import pytest

from notes.models import Note
from notes.serializers import NoteSerializer


User = get_user_model()


@pytest.mark.django_db
def test_note_serializer_rejects_blank_title():
    serializer = NoteSerializer(
        data={
            "title": "   ",
            "content": "Body",
            "category": "",
            "priority": Note.Priority.MEDIUM,
            "status": Note.Status.OPEN,
            "due_at": None,
            "checklist": [],
            "is_pinned": False,
            "is_archived": False,
        }
    )

    assert not serializer.is_valid()
    assert serializer.errors["title"][0] == "This field may not be blank."


@pytest.mark.django_db
def test_note_serializer_normalizes_checklist_and_drops_empty_items():
    serializer = NoteSerializer(
        data={
            "title": "Weekly plan",
            "content": " Tasks ",
            "category": " Work ",
            "priority": Note.Priority.HIGH,
            "status": Note.Status.IN_PROGRESS,
            "due_at": None,
            "checklist": [
                {"id": "", "text": " Draft report ", "completed": True},
                {"id": "keep-id", "text": " ", "completed": False},
                {"id": "item-3", "text": "Review notes", "completed": 0},
            ],
            "is_pinned": True,
            "is_archived": False,
        }
    )

    assert serializer.is_valid(), serializer.errors
    assert serializer.validated_data["content"] == "Tasks"
    assert serializer.validated_data["category"] == "Work"
    assert serializer.validated_data["checklist"] == [
        {"id": "draft-report", "text": "Draft report", "completed": True},
        {"id": "item-3", "text": "Review notes", "completed": False},
    ]


@pytest.mark.django_db
def test_note_serializer_rejects_non_list_checklist():
    serializer = NoteSerializer(
        data={
            "title": "Checklist issue",
            "content": "",
            "category": "",
            "priority": Note.Priority.LOW,
            "status": Note.Status.OPEN,
            "due_at": None,
            "checklist": {"text": "bad-shape"},
            "is_pinned": False,
            "is_archived": False,
        }
    )

    assert not serializer.is_valid()
    assert serializer.errors["checklist"][0] == "Checklist must be a list."
