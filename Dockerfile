# ----- Build stage -----

# Define the base image (Node in this case - alpine is a lightweight Linux distribution)
FROM node:20-alpine AS build

# Metadata
LABEL version="0.2"
LABEL app="Pixel Art Maker"

# Create app directory (Docker container working directory)
WORKDIR /app

# Copy package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install dependencies (defined in yarn.lock, without attempting to update or modify this file)
RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN yarn build


# ----- Production stage -----

# Fetch the production-ready Nginx image from Docker Hub
FROM nginx:alpine

# Copy the build output from the previous stage to the Nginx server
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]