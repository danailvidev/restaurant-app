FROM node:alpine
LABEL author="Danail Videv"
WORKDIR /var/www/angular-node-service
COPY package.json package.json
RUN npm install
COPY . .
EXPOSE 3000
ENTRYPOINT [ "node", "server.js" ]