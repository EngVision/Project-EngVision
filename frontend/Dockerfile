# Stage 1: Build stage
FROM node:18 as build-stage

WORKDIR /frontend
COPY . .

# Prepare environment variables
ARG VITE_BASE_URL
ARG VITE_SERVER_FILES_URL

ENV VITE_BASE_URL=${VITE_BASE_URL}
ENV VITE_SERVER_FILES_URL=${VITE_SERVER_FILES_URL}

RUN yarn ci
RUN yarn build

# Create .env file to dist folder
RUN echo "VITE_BASE_URL=${VITE_BASE_URL}" > /frontend/dist/.env
RUN echo "VITE_SERVER_FILES_URL=${VITE_SERVER_FILES_URL}" >> /frontend/dist/.env

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
