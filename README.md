# Portfolio

Repository related to my own portfolio.

Link : www.matthieu-freitag.com/

## Setup

Copy the .env.example file into a new .env file and update the variables you want to change.

## Create django superuser

`docker exec -it django python manage.py createsuperuser`

## Dumb database

`docker exec mysql mysqldump -uMYSQL_ROOT_USER -pMYSQL_ROOT_PASSWORD MYSQL_DATABASE > dump.sql`