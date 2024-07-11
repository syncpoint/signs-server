FROM node:18-alpine3.14

RUN apk update && apk add poppler-utils

EXPOSE 8891
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY ./src .
CMD [ "node", "index.mjs" ]