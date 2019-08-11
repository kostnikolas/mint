#!/bin/sh

echo "Apply database migrations"

python ./backend/manage.py migrate

echo "Starting server"
service nginx start
python ./backend/manage.py runserver --noreload