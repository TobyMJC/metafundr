from django.http import HttpResponse

# Create your views here.

def get_posts(req):
    return HttpResponse("<h1>Fisica</h1>")