FROM node:16.19.0-alpine3.17

WORKDIR /usr/src/app
COPY package.json .

RUN npm install -g npm@9.6.6
RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["npm", "run", "start"]