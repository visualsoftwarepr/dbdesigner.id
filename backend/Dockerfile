FROM node:22-alpine AS base


FROM node:22-alpine AS build
RUN apk add --no-cache git
WORKDIR /app
COPY package*.json ./

COPY . .
RUN npm install --force
RUN npm run build


FROM base AS final
WORKDIR /app
ARG ENV_FILE
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
#COPY --from=build /app/node_modules_tune/chats.js /app/node_modules/@whiskeysockets/baileys/lib/Socket/chats.js
COPY --from=build /app/package.json /app/
COPY --from=build /app/${ENV_FILE} /app/.env
COPY --from=build /app/.sequelizerc /app/.sequelizerc

ENV PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

CMD redis-server --daemonize yes && yarn db:migrate && yarn start
#CMD redis-server --daemonize yes && yarn start
#CMD sh
