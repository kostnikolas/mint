from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/reviews/', include('reviews.urls')),
    path('api/accounts/', include('accounts.urls')),
    path('api/api-auth/', include('rest_framework.urls'))
]
