FROM node:lts-bookworm-slim 

WORKDIR /app

COPY package*.json .

COPY . .

RUN npm install

EXPOSE 80

CMD [ "npx", "nodemon", "--delay", "500ms", "build/app.js" ]
