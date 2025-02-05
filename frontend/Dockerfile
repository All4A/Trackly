# Install node.js
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install necessary build tools
RUN apk add --no-cache python3 make g++

# Upgrade npm globally
RUN npm install -g npm@8.19.4

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

RUN npm install src

# Add app source code
COPY . ./ 

# Build the app for production
RUN npm run build

# Expose port 5000 to the outside world
EXPOSE 5000

# Start the server
CMD ["npx", "serve", "-s", "build"]