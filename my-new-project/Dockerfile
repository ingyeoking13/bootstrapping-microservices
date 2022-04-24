FROM node:16.13.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY ./src ./src

COPY ./videos ./videos

CMD npm run start
