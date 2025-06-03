# Build stage
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files from both root and examples
COPY package*.json ./
COPY examples/package*.json ./examples/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the example app
RUN npm run example-app:build

# Production stage
FROM nginx:alpine

# Copy built files from the examples dist directory
COPY --from=builder /app/examples/dist /usr/share/nginx/html

# Copy custom nginx config to handle React routing
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
    error_page 500 502 503 504 /50x.html; \
    location = /50x.html { \
        root /usr/share/nginx/html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]