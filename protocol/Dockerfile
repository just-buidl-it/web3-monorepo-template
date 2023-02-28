FROM node:16-alpine

RUN apk add git;

COPY package.json /usr/app/package.json
COPY yarn.lock /usr/app/yarn.lock

WORKDIR /usr/app

RUN yarn
