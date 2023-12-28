FROM node:19-alpine3.16
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
RUN apk update && apk add --no-cache nodejs npm python3 py3-pip build-base
RUN apk add bash
WORKDIR /home/node/app
COPY package*.json .
USER node
COPY --chown=node:node . .
RUN npm install
COPY  . .
EXPOSE 3030
CMD ["npm", "run",  "all"]