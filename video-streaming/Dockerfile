FROM node:16.13.0-alpine

WORKDIR /usr/src/app
COPY package*.json ./
COPY .env ./
RUN npm install 
COPY ./src ./src
CMD npm run start
