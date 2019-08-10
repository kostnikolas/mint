from django.db import models
from django.contrib.auth.models import User

class Review(models.Model):
    author = models.ForeignKey(User, verbose_name='Author', on_delete=models.CASCADE)
    blogger = models.CharField('Blogger', max_length=255, db_index=False)
    evaluation = models.IntegerField('Evaluation', default=0)
    created = models.DateTimeField('Date created', auto_now_add=True)
    last_modify = models.DateTimeField('Last modify', auto_now=True)
    
    class Meta:
        verbose_name = 'Review'
        verbose_name_plural = 'Reviews'
        unique_together = [['author', 'blogger'], ]
        ordering = ['-last_modify', ]

    def __str__(self):
        return '{0}: {1}'.format(self.author.username, self.blogger)
    