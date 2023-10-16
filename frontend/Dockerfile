# Stage 1: Build stage
FROM node:18 as build-stage

WORKDIR /frontend
COPY . .

RUN yarn ci
RUN yarn build
CMD ["yarn", "preview" ]

EXPOSE 3000