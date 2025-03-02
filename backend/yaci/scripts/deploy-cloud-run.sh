#!/bin/bash

# Check if a parameter is provided
if [ -z "$1" ]; then
  echo "No parameter provided. Usage: ./script.sh <param>"
  exit 1
fi

# Check if the parameter equals "yaci"
if [ "$1" == "yaci" ]; then
  echo "Parameter is 'yaci'. Running commands..."
  
  docker buildx build --platform linux/amd64 -t yaci-backend-image --load .
  docker tag yaci-backend-image asia-southeast1-docker.pkg.dev/mesh-432507/mesh-saas-repo/yaci-backend-image
  docker push asia-southeast1-docker.pkg.dev/mesh-432507/mesh-saas-repo/yaci-backend-image:latest
  gcloud run deploy yaci-backend-image --image=asia-southeast1-docker.pkg.dev/mesh-432507/mesh-saas-repo/yaci-backend-image:latest --project mesh-432507 --region=asia-southeast1 --allow-unauthenticated
else
  echo "Parameter is not 'yaci'. No commands to run."
fi
