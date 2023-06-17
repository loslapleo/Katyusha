FROM node:18.12.1
WORKDIR /usr/src/Katyusha
COPY src/package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "sh", "run.sh" ]
