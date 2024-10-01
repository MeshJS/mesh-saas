FROM node:20

# Working Dir
WORKDIR /usr/src/app

# Copy Package Json
COPY package.json ./

# Install Files
RUN npm install

# Compile typescript
RUN npm install -D typescript

# Copy Source Files
COPY . .

# Start
EXPOSE 8080 

CMD ["npm", "run", "start"]
