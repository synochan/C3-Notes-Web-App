from django.db.models import Q
from rest_framework import generics, permissions

from .models import Note
from .serializers import NoteSerializer


class NoteListCreateView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Note.objects.filter(owner=self.request.user)
        archived = self.request.query_params.get("archived")
        search = self.request.query_params.get("search", "").strip()

        if archived in {"true", "false"}:
            queryset = queryset.filter(is_archived=archived == "true")

        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | Q(content__icontains=search),
            )

        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class NoteRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(owner=self.request.user)
