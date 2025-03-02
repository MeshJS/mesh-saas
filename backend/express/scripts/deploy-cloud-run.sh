#!/bin/bash

# Check if a parameter is provided
if [ -z "$1" ]; then
  echo "No parameter provided. Usage: ./script.sh <param>"
  exit 1
fi

# Check if the parameter equals "express"
if [ "$1" == "express" ]; then
  echo "Parameter is 'express'. Running commands..."
  
  docker buildx build --platform linux/amd64 -t mesh-cloud-backend-server-image .
  docker tag mesh-cloud-backend-server-image asia-southeast1-docker.pkg.dev/mesh-432507/mesh-saas-repo/mesh-cloud-backend-server-image
  docker push asia-southeast1-docker.pkg.dev/mesh-432507/mesh-saas-repo/mesh-cloud-backend-server-image:latest
  gcloud run deploy mesh-cloud-backend-server-image --image=asia-southeast1-docker.pkg.dev/mesh-432507/mesh-saas-repo/mesh-cloud-backend-server-image:latest --project mesh-432507 --region=asia-southeast1 --allow-unauthenticated
else
  echo "Parameter is not 'express'. No commands to run."
fi
