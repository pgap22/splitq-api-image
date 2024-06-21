FROM node:22

WORKDIR /app
COPY . /app

RUN npm i

EXPOSE 5000

CMD [ "npm", "start" ]