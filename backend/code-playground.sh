docker pull python:3.10;
docker pull python:3.9;
docker pull python:3.8;
docker pull python:2.7;

docker pull ruby:3.1;
docker pull ruby:3.0;
docker pull ruby:2.7;

docker pull openjdk:17;
docker pull openjdk:12;
docker pull openjdk:8;

docker pull racket/racket:8.3;
docker pull racket/racket:7.9;

docker pull golang:1.17;

docker pull rust:1.58;

docker pull node:8.3.0;

docker run --name base-typescript -it node:8.3.0 npm init -y; npm install typescript@4.5 @types/node; npx tsc --init;
docker commit base-typescript cp/typescript;
docker rm base-typescript

docker pull gcc;


