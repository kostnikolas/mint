from django.urls import path
from .views import ReviewsListView, ReviewDetailView

urlpatterns = [
    path('', ReviewsListView.as_view()),
    path('<int:pk>/', ReviewDetailView.as_view()),
    
]
