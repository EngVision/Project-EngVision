FROM node:18-alpine
# App directory
WORKDIR /app

# App dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# Copy app source code
COPY . .

# Env setup
COPY .env.example .env

#Expose port and begin application
EXPOSE 9000

# Start the app
CMD [ "yarn", "start:dev" ]