# /frontend/Dockerfile (Dioptimalkan untuk Development)

FROM node:20-alpine

WORKDIR /app

# Copy hanya package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Tidak perlu 'COPY . .' atau 'EXPOSE'.
# Perintah untuk menjalankan aplikasi akan didefinisikan di docker-compose.