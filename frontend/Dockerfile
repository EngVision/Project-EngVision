# Stage 1: Build stage
FROM node:18 as build-stage

WORKDIR /frontend
COPY . .

ARG VITE_BASE_URL
ARG VITE_SERVER_FILES_URL
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_SERVER_FILES_URL=$VITE_SERVER_FILES_URL

RUN yarn ci
RUN yarn build

# Create .env file
RUN echo "VITE_BASE_URL=$VITE_BASE_URL" > /frontend/.env
RUN echo "VITE_SERVER_FILES_URL=$VITE_SERVER_FILES_URL" >> /frontend/.env

CMD ["yarn", "preview" ]

EXPOSE 3000