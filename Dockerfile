FROM node:18.14.0 as vue

WORKDIR /app

# copia arquivos e pastas para o diretório atual de trabalho (pasta 'app')
RUN git clone -b master https://oauth2:glpat-oyFcCtZP5nzQz44c73Bz@git.avmb.com.br/projetinhoappapp/projetinhoapp-web.git
# Defina o diretório de trabalho como /app
WORKDIR /app/projetinhoapp-web

# COPY ./ /app/plataforma-frontend

RUN npm install
RUN npm install -g @vue/cli
RUN npm install -g @quasar/cli
RUN quasar build
# Instale as dependências do projeto
FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=vue /app/projetinhoapp-web/dist/spa /usr/share/nginx/html
COPY --from=vue /app/projetinhoapp-web/nginx.conf /etc/nginx/conf.d/default.conf

# Compile o projeto Angular
#RUN npm run build
