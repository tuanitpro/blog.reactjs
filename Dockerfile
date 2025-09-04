FROM node:21.5.0-alpine3.18 AS build
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# production stage
FROM nginx:1.25.3-alpine AS production
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
COPY --from=dist /app/nginx.config /etc/nginx/conf.d/default.conf
COPY --from=dist /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]