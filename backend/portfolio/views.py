from django.core.mail import send_mail
from django.http import JsonResponse
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import os
import json

@csrf_exempt  # Use this decorator to disable CSRF protection for this endpoint in development. Ensure proper CSRF protection in production.
def send_email(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))

        # Extract data from the request
        subject = data.get('subject', '')
        sender_name = data.get('name', '')
        sender_email = data.get('email', '')
        message = data.get('message', '')

        # Get email configuration from environment variables
        from_email = os.environ['CONTACT_FROM']
        recipient_emails = os.environ['CONTACT_TO'].split(',')

        # Construct the email message
        email_message = f"Name: {sender_name}\n"
        email_message += f"Reply-To: {sender_email}\n\n"
        email_message += f"Subject: {subject}\n\n"
        email_message += f"Message: {message}\n"

        try:
            send_mail(subject, email_message, from_email, recipient_emails)
            return JsonResponse({'message': 'Email sent successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)})

    return JsonResponse({'error': 'Invalid request method'})
