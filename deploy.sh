#!/usr/bin/env bash

pull_latest_changes() {
  echo "🔄 Pulling the latest changes..."
  git pull
}

build_and_run_docker() {
  echo "🐳 Building and running Docker..."
  docker compose --file docker-compose.prod.yml up --detach --build
}


prune_docker_system() {
  echo "Pruning Docker system..."
  docker system prune --force --filter="until=1h"
}

start_deployment() {
  echo "Starting deployment..."
  pull_latest_changes
  build_and_run_docker
  prune_docker_system
  echo "Deployment successful."
}

start_deployment