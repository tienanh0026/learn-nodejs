FROM node:20
WORKDIR /nodejs
COPY . .

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/bin/wait-for-it
RUN chmod +x /usr/bin/wait-for-it

RUN npm install

CMD ["sh", "-c", "wait-for-it mysql:3306 -- npm run dev"]

EXPOSE ${PORT}