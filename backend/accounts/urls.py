from django.urls import path
from .views import UserRegistrationView, UserProfileView, UserSigninView

urlpatterns = [
    path('', UserProfileView.as_view()),
    path('signup/', UserRegistrationView.as_view()),
    path('signin/', UserSigninView.as_view()),
]
