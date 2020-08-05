FROM node:10
WORKDIR /GetStuffDone
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
