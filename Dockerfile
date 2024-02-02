FROM node:14

# Copy package.json
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# start command
CMD ["npm", "start"]
