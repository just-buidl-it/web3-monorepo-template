FROM node:16-alpine

RUN apk add --update --no-cache python3 git openssh

COPY package.json /usr/app/package.json
COPY yarn.lock /usr/app/yarn.lock

WORKDIR /usr/app

RUN yarn
