FROM nikolaik/python-nodejs:latest

MAINTAINER kostnikolas <kostnikolas@yandex.ru>
RUN apt-get update 
RUN apt-get install nginx -yqq

ADD . /usr/src/app
WORKDIR /usr/src/app/
RUN cp ./conf/mint.conf /etc/nginx/sites-available/
RUN ln  /etc/nginx/sites-available/mint.conf /etc/nginx/sites-enabled/mint.conf
RUN rm /etc/nginx/sites-enabled/default
WORKDIR /usr/src/app/backend
RUN mv local_settings_prod.py local_settings.py
RUN pip install -r requirements.txt
WORKDIR /usr/src/app/frontend
RUN npm install
RUN npm run build
WORKDIR /usr/src/app/
RUN chmod +x ./docker-entrypoint.sh
EXPOSE 80/tcp
ENTRYPOINT ["./docker-entrypoint.sh"]