import pytest
from django.contrib.auth import get_user_model

from accounts.serializers import RegisterSerializer, UpdateAccountSerializer


User = get_user_model()


@pytest.mark.django_db
def test_register_serializer_rejects_duplicate_username():
    User.objects.create_user(username="existing", email="first@example.com", password="StrongPass123!")

    serializer = RegisterSerializer(
        data={
            "username": "existing",
            "email": "second@example.com",
            "password": "StrongPass123!",
        }
    )

    assert not serializer.is_valid()
    assert serializer.errors["username"][0] == "That username is already in use."


@pytest.mark.django_db
def test_register_serializer_rejects_duplicate_email_case_insensitively():
    User.objects.create_user(username="existing", email="taken@example.com", password="StrongPass123!")

    serializer = RegisterSerializer(
        data={
            "username": "fresh-user",
            "email": "Taken@Example.com",
            "password": "StrongPass123!",
        }
    )

    assert not serializer.is_valid()
    assert serializer.errors["email"][0] == "That email is already registered."


@pytest.mark.django_db
def test_update_account_serializer_rejects_duplicate_username_for_other_user(rf):
    current_user = User.objects.create_user(
        username="current-user",
        email="current@example.com",
        password="StrongPass123!",
    )
    User.objects.create_user(
        username="taken-user",
        email="taken@example.com",
        password="StrongPass123!",
    )

    request = rf.patch("/api/auth/me/")
    request.user = current_user

    serializer = UpdateAccountSerializer(
        data={
            "username": "taken-user",
            "email": "current@example.com",
            "display_name": "Current User",
            "marketing_emails": False,
        },
        context={"request": request},
    )

    assert not serializer.is_valid()
    assert serializer.errors["username"][0] == "That username is already in use."
