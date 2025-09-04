FROM node:24-alpine3.21 AS build
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build --if-present

# production stage
FROM nginx:1.29.1-alpine AS production
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
COPY --from=build /app/nginx.config /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]