from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from accounts.serializers import UserPublicSerializer
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    author = UserPublicSerializer(read_only=True)
    evaluation = serializers.IntegerField(max_value=5, min_value=1)
    class Meta:
        model = Review
        fields = '__all__'
        validators = [
            UniqueTogetherValidator(
                queryset=Review.objects.all(),
                fields=['author', 'blogger']
            )
        ]
  