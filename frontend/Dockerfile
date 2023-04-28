# build stage
FROM node:lts-alpine as build-stage
WORKDIR /vuejs
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /vuejs/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]