FROM node:18

# Working Dir
WORKDIR /usr/src/app

# Copy Package Json
COPY package.json ./

# Install Files
RUN npm install

# Copy Source Files
COPY . .

# Start
EXPOSE 3001

CMD ["npm", "run", "dev"]
