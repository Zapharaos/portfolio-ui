#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset
set -e

# Wait for MongoDB to be ready
while ! nc -z portfolio-mongodb-1 $MONGO_INITDB_PORT; do
  echo "Waiting for MongoDB to start..."
  sleep 1
done
echo "MongoDB started successfully."

# Apply database migrations
python manage.py makemigrations
python manage.py migrate --fake-initial

# Check if static files have already been collected
if [ -z "$(ls -A $DJANGO_STATIC_ROOT)" ]
then
  # Collect static files
  python manage.py collectstatic
fi

# Create a default superuser if none exists
if [ "$DJANGO_SUPERUSER_USERNAME" ]
then
    python manage.py shell -c "\
from django.contrib.auth.models import User; \
User.objects.create_superuser('$DJANGO_SUPERUSER_USERNAME', '$DJANGO_SUPERUSER_EMAIL', '$DJANGO_SUPERUSER_PASSWORD') \
if not User.objects.filter(username='$DJANGO_SUPERUSER_USERNAME').exists() \
else None"
fi

# Start the server
python manage.py runserver 0.0.0.0:$DJANGO_PORT