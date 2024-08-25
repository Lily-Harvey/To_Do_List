from django.http import JsonResponse
from django.middleware.csrf import get_token
# from django.views.decorators.csrf import csrf_protect


def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})
