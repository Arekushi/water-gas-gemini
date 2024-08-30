FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install --quiet --loglevel=error

RUN npm run build

EXPOSE 8787

EXPOSE 35000

CMD ["./migrate-and-start.sh"]
