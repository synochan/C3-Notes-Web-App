from rest_framework import serializers

from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = [
            "id",
            "title",
            "content",
            "category",
            "priority",
            "status",
            "due_at",
            "checklist",
            "is_pinned",
            "is_archived",
            "created_at",
            "updated_at",
        ]

    def validate_title(self, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise serializers.ValidationError("Title is required.")
        return cleaned

    def validate_content(self, value: str) -> str:
        return value.strip()

    def validate_category(self, value: str) -> str:
        return value.strip()

    def validate_checklist(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("Checklist must be a list.")

        normalized = []
        for item in value:
            if not isinstance(item, dict):
                raise serializers.ValidationError("Each checklist item must be an object.")

            text = str(item.get("text", "")).strip()
            if not text:
                continue

            normalized.append(
                {
                    "id": str(item.get("id", "")).strip() or text.lower().replace(" ", "-")[:24],
                    "text": text,
                    "completed": bool(item.get("completed", False)),
                },
            )

        return normalized
