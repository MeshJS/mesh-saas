#!/bin/bash

docker build -t yaci-backend-image-local .
docker run -p 8080:8080 yaci-backend-image-local