#!/bin/bash

docker build -t mesh-cloud-backend-server-image-local .
docker run -p 3001:3001 mesh-cloud-backend-server-image-local