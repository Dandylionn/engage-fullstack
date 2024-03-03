FROM node:alpine3.18
WORKDIR /app
COPY packkage.json ./
RUN npm install
COPY . .
EXPOSE 8001
CMD ["npm", "run", "start"]