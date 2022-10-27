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

### Generating RS256 keys for JWT

```sh
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```

Then pass the public key and private key through https://www.base64encode.org/ and append them to the .env

### Building

Fill out .env from .env.example in root

```sh
docker compose build
```

### Running

```sh
docker compose up
```