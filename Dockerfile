# frontend build stage
FROM node:lts-alpine as frontend-build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# frontend production stage
FROM nginx:stable-alpine as frontend-production-stage
COPY --from=frontend-build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]