# Generated by Django 3.0.7 on 2021-01-11 10:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20210110_2025'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comments',
            old_name='user',
            new_name='author',
        ),
    ]
