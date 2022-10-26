# SemanaI


## Running locally

### Frontend

```sh
cd front
yarn install
yarn start
```

### Auth Service

Fill out .env from .env.example in ``services/auth``

```sh
cd services/auth
yarn install
yarn start
```

### Survey Service

Fill out .env from .env.example in ``services/survey``

```sh
cd services/survey
yarn install
yarn start
```

## Running in docker


### Building

Fill out .env from .env.example in root

```sh
docker compose build
```

### Running

```sh
docker compose up
```