# Pull base image
FROM python:3.10.2-slim-bullseye

# Set environment variables
ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
COPY . /django
WORKDIR /django

# Install dependencies
RUN pip install -r requirements.txt
RUN apt-get update && apt-get install -y netcat

# Run the command to start the Django development server
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]