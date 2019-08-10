from django.contrib import admin
from .models import Review

class ReviewModelAdmin(admin.ModelAdmin):
    date_hierarchy = 'last_modify'
    list_display = ('author', 'blogger', 'evaluation', 'last_modify')
    search_fields = ('author__username', 'blogger')

admin.site.register(Review, ReviewModelAdmin)