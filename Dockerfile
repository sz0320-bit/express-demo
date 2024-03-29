# Use Node.js version 16
FROM node:16

# Set working directory
WORKDIR /Users/syed/projects/express-demo

ARG GIT_AUTH_TOKEN
ENV GIT_AUTH_TOKEN=${GIT_AUTH_TOKEN}
RUN git config --global credential.helper store && \
    git config --global user.email "syed.zaidi.hussain@gmail.com" && \
    git config --global user.name "Syed Zaidi" && \
    git clone https://sz0320-bit:${GIT_AUTH_TOKEN}@github.com/sz0320-bit/express-demo.git .

EXPOSE 8080

WORKDIR  /Users/syed/projects/express-demo/src

# Copy .env file
COPY .env .

WORKDIR /Users/syed/projects/express-demo


# Clone project from GitHub

# Install dependencies
RUN npm install

# Build project
RUN npm run build

# Start the application
CMD ["npm", "run", "start"]
