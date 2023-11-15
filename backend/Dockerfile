FROM node:18

# Install MongoDB tools and essential build tools
RUN if [ "$(arch)" = "aarch64" ] || [ "$(arch)" = "arm64" ]; then\
    wget https://fastdl.mongodb.org/tools/db/mongodb-database-tools-ubuntu2204-arm64-100.7.3.deb;\
  else\
    wget https://fastdl.mongodb.org/tools/db/mongodb-database-tools-debian10-x86_64-100.7.3.deb;\
  fi;

RUN apt install ./mongodb-database-tools-*.deb

RUN apt-get update && apt-get install -y build-essential gcc libpq-dev make 

WORKDIR /backend
COPY . .
RUN yarn ci
CMD yarn start

EXPOSE 5000
