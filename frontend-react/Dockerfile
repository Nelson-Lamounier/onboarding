# Use a lightweight Node.js image
FROM node:18-alpine AS build

WORKDIR /app

# Enable Corepack (required for Yarn 4+)
RUN corepack enable
RUN corepack prepare yarn@4.6.0 --activate

# Copy package.json and yarn.lock before installing dependencies
COPY package.json yarn.lock ./

# Set environment variable to disable scripts (Fix for Yarn 4)
ENV YARN_ENABLE_SCRIPTS=false

# Install dependencies using Yarn 4
RUN yarn install --immutable

# Copy all source code
COPY . .

# Manually install missing rollup dependencies
RUN yarn add @rollup/rollup-linux-arm64-musl

# Build the React app
RUN yarn build

# Use Nginx to serve the built files
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]