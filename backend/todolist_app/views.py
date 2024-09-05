from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from .models import Task
from .serializers import RegisterSerializer, TaskSerializer


@api_view(['POST'])
def register(request):
    """
    Register a new user and return JWT tokens upon successful registration.
    """
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()

        # Generate JWT tokens for the newly registered user
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response({
            "detail": "User registered successfully.",
            "access": access_token,
            "refresh": str(refresh),
        }, status=status.HTTP_201_CREATED)
    # Return validation errors if registration fails
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskCreateView(generics.CreateAPIView):
    """
    API view to create a new task.
    Only authenticated users can create tasks.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Assign the task to the currently authenticated user
        serializer.save(user=self.request.user)


class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a specific task.
    The task must belong to the currently authenticated user.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter tasks by the currently authenticated user
        return self.queryset.filter(user=self.request.user)


class TaskListView(generics.ListAPIView):
    """
    API view to list all tasks for the currently authenticated user.
    """
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return tasks that belong to the currently authenticated user
        return Task.objects.filter(user=self.request.user)


class TokenVerifyView(APIView):
    """
    API view to verify the validity of a JWT token.
    """
    def post(self, request):
        # Extract token from Authorization header
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        if not token:
            return Response({"error": "Token not provided"}, status=400)

        try:
            # Verify if the token is valid
            AccessToken(token)
            return Response({"status": "Token is valid"}, status=200)
        except (InvalidToken, TokenError):
            # Handle invalid or expired tokens
            return Response({"error": "Token is invalid"}, status=401)
