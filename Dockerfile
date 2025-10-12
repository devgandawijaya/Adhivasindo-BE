FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
ENV NODE_ENV=development
RUN npm install

COPY . .

EXPOSE 2028

CMD ["npx", "nodemon", "index.js"]