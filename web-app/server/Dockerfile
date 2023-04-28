FROM node:18.16.0

# Start the app
WORKDIR /app

COPY package*.json ./

ENV NODE_ENV="production"

RUN npm install --only=production

COPY . .

CMD ["npm", "start"]