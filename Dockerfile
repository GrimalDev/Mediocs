FROM node:16.5.0

# Create app directory
WORKDIR /usr/src/app

#Copy file dependencies list for the app
#Wildcard is required to get both the package.json and the package-lock.json
COPY package*.json ./

RUN npm install

#Bundle the app
COPY . .

EXPOSE 8080

CMD  ["node", "server.js"]
