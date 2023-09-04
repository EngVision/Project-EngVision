# Stage 1: Build stage
FROM node:18 as build-stage

WORKDIR /frontend
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Stage 2: Production stage
FROM nginx:alpine as production-stage

# Remove default NGINX configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy built frontend files
COPY --from=build-stage /frontend/dist /usr/share/nginx/html

# Copy custom NGINX configuration
COPY nginx/default.conf /etc/nginx/conf.d/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
