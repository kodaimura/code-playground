docker pull python:3.13;
docker pull python:2.7;

docker pull ruby:3.2;
docker pull ruby:2.7;

docker pull openjdk:17;
docker pull openjdk:12;
docker pull openjdk:8;

docker pull racket/racket:8.3;

docker pull golang:1.22;

docker pull rust:1.58;

docker pull node:8.3.0;

docker run --name base-typescript -it node:8.3.0 npm init -y; npm install typescript@4.5 @types/node; npx tsc --init;
docker commit base-typescript cp/typescript;
docker rm base-typescript

docker pull gcc;


