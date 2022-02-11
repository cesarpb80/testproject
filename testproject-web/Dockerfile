FROM node:16.13.0-alpine3.14

#CREAR DIRECTORIOS
RUN mkdir -p /usr/src/app

#VARIABLES DE AMBIENTE
ENV PORT 3000

#DIRECTORIO DE TRABAJO
WORKDIR /usr/src/app
RUN apk add --upgrade apk-tools

#COPIA DE ARCHIVOS PARA EL CONTENEDOR
COPY node_modules ./node_modules
COPY package.json ./
COPY .next ./.next
COPY public ./public
COPY pages ./pages
COPY next.config.js ./
COPY i18n.json ./
COPY .env ./

RUN npm install

COPY . /usr/src/app/

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
#ENTRYPOINT [ "npm", "run" ]