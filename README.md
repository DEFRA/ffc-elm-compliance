[![Known Vulnerabilities](https://snyk.io//test/github/DEFRA/ffc-elm-compliance/badge.svg?targetFile=package.json)](https://snyk.io//test/github/DEFRA/ffc-elm-compliance?targetFile=package.json)

# FFC ELM

Environmental Land Management compliance facts service.

## Prerequisites

Either:
- Docker
- Docker Compose

Or:
- Node 12

## Environment variables

### In development

The following environment variables are required in development environments running via `docker-compose`. They can be added to a `.env` file in the project root, which is listed in `.gitignore` and automatically used by Docker Compose.

| Name            | Description                                  |
|-----------------|----------------------------------------------|
| DOCKER_REGISTRY | Docker registry URL to pull base images from |

Example `.env` file:

```
DOCKER_REGISTRY=defradigital
```

### In production

The following environment variables are required by the application container.

| Name                                  | Description                | Required | Default               | Valid                       |
|---------------------------------------|----------------------------|:--------:|-----------------------|-----------------------------|
| NODE_ENV                              | Node environment           | no       | development           | development,test,production |
| PORT                                  | Port number                | no       | 3004                  |                             |

## How to run tests

A convenience script is provided to run automated tests in a containerised environment. This will rebuild images before running tests via docker-compose, using a combination of `docker-compose.yaml` and `docker-compose.test.yaml`. The command given to `docker-compose run` may be customised by passing arguments to the test script.

Examples:

```
# Run all tests
scripts/test

# Run only unit tests
scripts/test npm run test:unit
```

Alternatively, the same tests may be run locally via npm:

```
# Run tests without Docker
npm run test
```

### Test watcher

A more convenient way to run tests in development is to use a file watcher to automatically run tests each time associated files are modified. For this purpose, the default docker-compose configuration mounts all app, test and git files into the main `app` container, enabling the test watcher to be run as shown below. The same approach may be used to execute arbitrary commands in the running app.

```
# Run unit test file watcher
docker-compose exec app npm run test:unit-watch

# Run all tests
docker-compose exec app npm test

# Open an interactive shell in the app container
docker-compose exec app sh
```

### Why docker-compose.test.yaml exists

Given that tests can be run in the main app container during development, it may not be obvious why `docker-compose.test.yaml` exists. It's main purpose is for CI pipelines, where tests need to run in a container without any ports forwarded from the host machine.

## Running the application

The application is designed to run in containerised environments, using Docker Compose in development and Kubernetes in production.

### Build container image

Container images are built using Docker Compose. They extend FFC parent images so building will fail without access to the parent images in the dockerhub registry.

```
# Build container images
docker-compose build
```

The test script will will automatically build (or rebuild) any additional images required to run tests.

### Running in development

Use Docker Compose to run service locally in development.

Example commands:

```
# Start the service
docker-compose up

# Stop the service
docker-compose down

# Stop the service and remove data volumes
docker-compose down -v
```

Additional Docker Compose files are provided for scenarios such as linking to other ELM services running in the same environment.

```
# Start the service with links to other ELM services
docker-compose -f docker-compose.yaml -f docker-compose.link.yaml up
```

#### Probes

The service has HTTP readiness and liveness probes at the following end points.

Readiness: `/healthy`
Liveness: `/healthz`

### Running without containers

The application may be run natively on the local operating system if NPM is installed.

```
# Build the application
npm run build

# Run the application
node app
```

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the license

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
