FROM node:20

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

CMD [ "npm", "run", "preview" ]