# Use Node 20
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy source
COPY . .

# Expose port
EXPOSE 3001

# Start development server
CMD ["yarn", "start"]
