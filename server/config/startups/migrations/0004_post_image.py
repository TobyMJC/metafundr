# Generated by Django 5.0.7 on 2024-11-08 12:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('startups', '0003_alter_postcomment_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='image',
            field=models.ImageField(default='user.png', upload_to=''),
        ),
    ]