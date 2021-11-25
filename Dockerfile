FROM node:14

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm install glob rimraf

RUN yarn install

COPY . .

RUN yarn build

CMD [ "node", "dist/main" ]
