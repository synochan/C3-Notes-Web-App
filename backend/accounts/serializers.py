from django.contrib.auth import authenticate, get_user_model, password_validation
from rest_framework import serializers

from .models import UserProfile


User = get_user_model()


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["display_name", "avatar_url", "marketing_emails"]


class CurrentUserSerializer(serializers.ModelSerializer):
    display_name = serializers.SerializerMethodField()
    avatar_url = serializers.SerializerMethodField()
    marketing_emails = serializers.SerializerMethodField()
    notes_count = serializers.SerializerMethodField()
    pinned_notes_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "display_name",
            "avatar_url",
            "marketing_emails",
            "date_joined",
            "notes_count",
            "pinned_notes_count",
        ]

    def get_profile(self, user):
        profile, _ = UserProfile.objects.get_or_create(user=user)
        return profile

    def get_display_name(self, user):
        return self.get_profile(user).display_name

    def get_marketing_emails(self, user):
        return self.get_profile(user).marketing_emails

    def get_avatar_url(self, user):
        profile = self.get_profile(user)
        if profile.avatar:
            request = self.context.get("request")
            url = profile.avatar.url
            return request.build_absolute_uri(url) if request else url
        return profile.avatar_url

    def get_notes_count(self, user):
        return user.notes.filter(is_archived=False).count()

    def get_pinned_notes_count(self, user):
        return user.notes.filter(is_pinned=True, is_archived=False).count()


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    display_name = serializers.CharField(max_length=120, required=False, allow_blank=True)
    avatar_url = serializers.URLField(required=False, allow_blank=True)

    def validate_username(self, value: str) -> str:
        cleaned = value.strip()
        if User.objects.filter(username__iexact=cleaned).exists():
            raise serializers.ValidationError("That username is already in use.")
        return cleaned

    def validate_email(self, value: str) -> str:
        cleaned = value.strip().lower()
        if User.objects.filter(email__iexact=cleaned).exists():
            raise serializers.ValidationError("That email is already registered.")
        return cleaned

    def validate_password(self, value: str) -> str:
        password_validation.validate_password(value)
        return value

    def create(self, validated_data):
        display_name = validated_data.pop("display_name", "").strip()
        avatar_url = validated_data.pop("avatar_url", "").strip()
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user, display_name=display_name, avatar_url=avatar_url)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = authenticate(
            username=attrs.get("username", "").strip(),
            password=attrs.get("password", ""),
        )
        if not user:
            raise serializers.ValidationError("Invalid username or password.")
        attrs["user"] = user
        return attrs


class UpdateAccountSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    display_name = serializers.CharField(max_length=120, required=False, allow_blank=True)
    avatar = serializers.ImageField(required=False, allow_null=True)
    clear_avatar = serializers.BooleanField(required=False, default=False)
    marketing_emails = serializers.BooleanField(required=False)

    def validate_username(self, value: str) -> str:
        cleaned = value.strip()
        user = self.context["request"].user
        if User.objects.exclude(pk=user.pk).filter(username__iexact=cleaned).exists():
            raise serializers.ValidationError("That username is already in use.")
        return cleaned

    def validate_email(self, value: str) -> str:
        cleaned = value.strip().lower()
        user = self.context["request"].user
        if User.objects.exclude(pk=user.pk).filter(email__iexact=cleaned).exists():
            raise serializers.ValidationError("That email is already registered.")
        return cleaned

    def save(self, **kwargs):
        user = self.context["request"].user
        profile, _ = UserProfile.objects.get_or_create(user=user)
        user.username = self.validated_data["username"]
        user.email = self.validated_data["email"]
        user.save(update_fields=["username", "email"])
        profile.display_name = self.validated_data.get("display_name", "").strip()
        if self.validated_data.get("clear_avatar"):
            if profile.avatar:
                profile.avatar.delete(save=False)
            profile.avatar = None
            profile.avatar_url = ""
        elif "avatar" in self.validated_data:
            profile.avatar = self.validated_data["avatar"]
            profile.avatar_url = ""
        if "marketing_emails" in self.validated_data:
            profile.marketing_emails = self.validated_data["marketing_emails"]
        profile.save()
        return user


class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, min_length=8)

    def validate_current_password(self, value: str) -> str:
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError("Current password is incorrect.")
        return value

    def validate_new_password(self, value: str) -> str:
        password_validation.validate_password(value, self.context["request"].user)
        return value

    def save(self, **kwargs):
        user = self.context["request"].user
        user.set_password(self.validated_data["new_password"])
        user.save(update_fields=["password"])
        return user
