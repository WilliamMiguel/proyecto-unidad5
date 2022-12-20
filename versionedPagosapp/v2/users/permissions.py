from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return request.user.is_authenticated

        if request.method == "POST" or request.method == "PUT" or request.method == "DELETE" or request.method == "PATCH":
            return request.user.is_staff

class IsUserOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        
        if request.method == "GET" or request.method == 'POST':
            return bool(request.user and request.user.is_authenticated)
        
        if request.method == "PUT" or request.method == "DELETE" or request.method == "PATCH":
            return request.user.is_staff