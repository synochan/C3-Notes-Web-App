from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("notes", "0002_note_owner_flags"),
    ]

    operations = [
        migrations.AddField(
            model_name="note",
            name="category",
            field=models.CharField(blank=True, max_length=80),
        ),
        migrations.AddField(
            model_name="note",
            name="checklist",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name="note",
            name="due_at",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="note",
            name="priority",
            field=models.CharField(
                choices=[("low", "Low"), ("medium", "Medium"), ("high", "High"), ("urgent", "Urgent")],
                default="medium",
                max_length=16,
            ),
        ),
        migrations.AddField(
            model_name="note",
            name="status",
            field=models.CharField(
                choices=[("open", "Open"), ("in_progress", "In Progress"), ("completed", "Completed")],
                default="open",
                max_length=20,
            ),
        ),
    ]
