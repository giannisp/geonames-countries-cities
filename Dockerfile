FROM node:lts

LABEL maintainer "Ray Ch<i@iraycd.com>"
WORKDIR /app

COPY package.json Makefile ./
COPY ./src ./src


EXPOSE 3400

RUN yarn
RUN make
RUN yarn start

CMD node ./src/server.js