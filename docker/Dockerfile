FROM ubuntu:14.04

RUN apt-get update

RUN apt-get install -y openssh-server vim nano htop git curl

RUN apt-get install -y supervisor

RUN apt-get install -y nginx
RUN apt-get install -y nodejs
RUN apt-get install -y mongodb

RUN echo 'root:picanoo' | chpasswd

EXPOSE 80