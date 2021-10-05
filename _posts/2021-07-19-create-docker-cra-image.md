---
title: "Case Study - Wrap React app in Docker container + NGINX"
last_modified_at: 2021-07-17T16:20:02-05:00
categories:
  - Blog
tags:
  - Case Study
  - AghTrain
  - Kotlin
  - Docker
  - DevOps
  - Gradle
toc: true
toc_label: "Table of Contents"
toc_icon: "cog"
---

# Case Study - Wrap React app in Docker container + NGINX

## How to build CRA App

There isn't a lot of hustle.
First

`npm install`

following by

`npm build`

And we'd get static html file alongside generated js in `./build` directory.

|![](/assets/images/2021-07-22-17-39-11.png)|
|-|
| **Figure 1. Structure of directories** |

We'd use this knowledge later on.

## Prepare NGINX

As in Heroku we have to use `$PORT` Environmental variable we need to make our Docker container expose app in that port.

I used `NGINX` for that - unfortunately we need do changes some config.

> default.conf

```nginx
server {
  listen       $PORT;
  server_name  localhost;

  root   /usr/share/nginx/html;
  index  index.html;

  location / {
    try_files $uri $uri/ =404;
  }
}
```

Later on, we'd substitute `$PORT` with variable provisioned by HEROKU.

## Dockerizin'

Lets prepare `Dockerfile` - remember, capital D, Heroku cli is case sensitive


> Dockerfile

```Dockerfile
# Use newest version of the image
FROM node:16.5-alpine3.11 AS build

# It's a specific step to copy generated code
COPY ./client /client

# Copy application
COPY ./frontend /frontend

# Let's set current directory to main app dir 
WORKDIR /frontend

# Install dependencies
RUN npm ci

# Build the application
RUN npm run build

# Another build stage - 
FROM nginx:stable-alpine

# Lets use default port 80 for testing
ENV PORT=80

# Copy the app to the container
COPY --from=build /frontend/build  /usr/share/nginx/html

# Copy prepared file with $PORT variable
COPY ./default.conf /etc/nginx/conf.d/

# Replace $PORT with $PORT value and run nginx.
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
```

Done! Now we're able to build this image.

` docker build . -t fe`

and later on test it

`docker run -p 80:80 fe`

Everything should be ok at this point. 

| ![](/assets/images/2021-07-22-17-47-21.png)|
|-|
| **Figure 2. Structure of directories** |


Here we can deploy to [heroku]({% link _posts/2021-07-18-deploy-on-heroku.md %}) 


## tr;dr;

``` powershell
heroku container:push web -a agh-train-fe
heroku container:release web -a agh-train-fe
```