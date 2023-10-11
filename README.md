# EngVision System

## Run the System

We can easily run the whole with only a single command:

```bash
docker-compose up
```

The services can be run on the background with command:

```bash
docker-compose up -d --build
```

## Stop the System

Stopping all the running containers is also simple with a single command:

```bash
docker-compose down
```

If you need to stop and remove all containers, networks, and all images used by any service in <em>docker-compose.yml</em> file, use the command:

```bash
docker-compose down --rmi all
```

## Run the Frontend System

The frontend system is built with React.js. Refer to the [README.md](./frontend/README.md) in the frontend folder for more details.

## Run the Backend System

The backend system is built with Nest.js. Refer to the [README.md](./backend/README.md) in the backend folder for more details.
