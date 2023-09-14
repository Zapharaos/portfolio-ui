from django.core.mail import send_mail
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

import os
import json

@csrf_exempt
def send_email(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))

        # Extract data from the request
        subject = data.get('subject', '')
        sender_name = data.get('name', '')
        sender_email = data.get('email', '')
        message = data.get('message', '')

        # Check if required fields are empty and identify which ones are empty
        empty_fields = []
        if not subject:
            empty_fields.append('subject')
        if not sender_name:
            empty_fields.append('name')
        if not sender_email:
            empty_fields.append('email')
        if not message:
            empty_fields.append('message')

        if empty_fields:
            return JsonResponse({'error': 'The following fields are required', 'error_type': 'empty_field', 'empty_fields': empty_fields}, status=400)  # HTTP 400 Bad Request

        # Validate the email address format
        try:
            validate_email(sender_email)
        except ValidationError:
            return JsonResponse({'error': 'Invalid email address', 'error_type': 'invalid_email'}, status=400)  # HTTP 400 Bad Request

        # Get email configuration from environment variables
        from_email = os.environ['CONTACT_FROM']
        recipient_emails = os.environ['CONTACT_TO']

        if not from_email or not recipient_emails:
            return JsonResponse({'error': 'Email configuration is missing', 'error_type': 'config_missing'}, status=500)  # HTTP 500 Internal Server Error

        recipient_emails = recipient_emails.split(',')

        # Construct the email message
        email_message = f"Name: {sender_name}\n"
        email_message += f"Reply-To: {sender_email}\n\n"
        email_message += f"Subject: {subject}\n\n"
        email_message += f"Message: {message}\n"

        try:
            send_mail(subject, email_message, from_email, recipient_emails)
            return JsonResponse({'message': 'Email sent successfully'}, status=200)  # HTTP 200 OK
        except Exception as e:
            return JsonResponse({'error': str(e), 'error_type': 'email_send_error'}, status=500)  # HTTP 500 Internal Server Error

    return JsonResponse({'error': 'Invalid request method', 'error_type': 'invalid_method'})   # HTTP 405 Method Not Allowed
