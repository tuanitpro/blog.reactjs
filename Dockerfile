# production stage
FROM nginx:1.25.3-alpine-slim
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
COPY nginx.config /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]