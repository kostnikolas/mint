from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import filters, status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import Review
from .serializers import ReviewSerializer
from .permissions import ReviewAuthorOrReanOnly


class ReviewsListView(ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, ]
    search_fields = ['author__username', 'blogger',
                     'author__last_name', 'author__first_name', ]
    filterset_fields = ['evaluation', ]
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        # set value to author field for validation
        author_field = serializer.fields.get('author')
        author_field.default = request.user

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ReviewDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = (ReviewAuthorOrReanOnly, )
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    lookup_url_kwarg = 'pk'
