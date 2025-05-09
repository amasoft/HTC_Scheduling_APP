# FROM node:18

# # Install dependencies for puppeteer with Chromium
# RUN apt-get update && apt-get install -y \
#     wget \
#     ca-certificates \
#     fonts-liberation \
#     libappindicator3-1 \
#     libasound2 \
#     libatk-bridge2.0-0 \
#     libatk1.0-0 \
#     libcups2 \
#     libdbus-1-3 \
#     libgdk-pixbuf2.0-0 \
#     libnspr4 \
#     libnss3 \
#     libx11-xcb1 \
#     libxcomposite1 \
#     libxdamage1 \
#     libxrandr2 \
#     xdg-utils \
#     libu2f-udev \
#     chromium \
#     --no-install-recommends && \
#     apt-get clean && \
#     rm -rf /var/lib/apt/lists/*

# # Set Puppeteer to use Chromium
# ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# # Create app directory
# WORKDIR /app

# # Copy dependency files
# COPY package.json yarn.lock* ./

# # Install dependencies
# RUN yarn install

# # Copy the rest of the app
# COPY . .

# # Install dotenv (if needed)
# RUN yarn add dotenv

# # Expose port
# EXPOSE 3000

# # Start the app
# CMD ["yarn", "start"]

FROM node:18

# Install dependencies for puppeteer with Chromium (optimized for production)
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    libu2f-udev \
    chromium \
    --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set Puppeteer to use Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV NODE_ENV=production

# Create app directory
WORKDIR /app

# Copy dependency files first for better layer caching
COPY package.json yarn.lock ./

# Install production dependencies only (no devDependencies)
RUN yarn install --frozen-lockfile --production

# Copy the rest of the app
COPY . .

# Expose port (required for Render)
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]