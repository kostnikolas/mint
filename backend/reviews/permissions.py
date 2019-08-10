from rest_framework import permissions

class ReviewAuthorOrReanOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        review = view.get_object()
        return request.user == review.author
 