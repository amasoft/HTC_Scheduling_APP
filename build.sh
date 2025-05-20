#!/usr/bin/env bash

# Exit on errors
set -e

# Install Chromium
apt-get update
apt-get install -y chromium

# Install project dependencies
yarn install
