# Generated by Django 5.0.7 on 2024-08-20 12:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('startups', '0005_alter_post_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='thumbnail',
            field=models.ImageField(blank=True, upload_to='posts/'),
        ),
    ]
