FROM node:16-alpine AS BUILD_IMAGE

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

# install dependencies
RUN yarn --frozen-lockfile

COPY . .

ARG SURVEY_ENDPOINT="http://localhost"
ARG AUTH_ENDPOINT="http://localhost"

# build application
RUN REACT_APP_SURVEY_ENDPOINT=${SURVEY_ENDPOINT} \
    REACT_APP_AUTH_ENDPOINT=${AUTH_ENDPOINT}     \
    yarn build

FROM nginx:alpine

# Copy config nginx
COPY --from=BUILD_IMAGE /usr/src/app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=BUILD_IMAGE /usr/src/app/build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]