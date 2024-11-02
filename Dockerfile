# Define the base image (Node in this case - alpine is a lightweight Linux distribution)
FROM node:20-alpine AS build

# Metadata
LABEL version="0.2"
LABEL app="Pixel Art Maker"

# Activate Corepack to manage the Yarn version
RUN corepack enable

# Create a dedicated non-root user within the container
RUN addgroup -g 1598 pixelartgroup && adduser -D -u 1599 -G pixelartgroup pixelartuser

# Change the user to the one created above
USER pixelartuser

# Create app directory (Docker container working directory)
WORKDIR /app

# Copy package.json and yarn.lock files to the working directory
COPY package.json yarn.lock .yarn .yarnrc.yml ./

# Install dependencies with the correct yarn version (defined in yarn.lock, without attempting to update or modify this file)
RUN corepack prepare yarn@4.5.1 --activate && yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN yarn build

# Declares on which port the application “should” run (not “must” run).
EXPOSE 3100

# Start the application
CMD ["yarn", "preview", "--port", "3100", "--host"]