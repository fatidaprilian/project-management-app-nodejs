# /backend/Dockerfile (Dioptimalkan untuk Development)

FROM node:20-alpine

WORKDIR /app

# Copy hanya package.json dan package-lock.json terlebih dahulu
# Ini memanfaatkan Docker layer caching. Docker hanya akan menjalankan 'npm install' lagi
# jika salah satu dari file ini berubah.
COPY package*.json ./

# Install dependencies
RUN npm install

# Tidak perlu 'COPY . .' karena source code akan di-mount dari docker-compose.
# Tidak perlu 'EXPOSE' karena port di-publish oleh docker-compose.
# Perintah untuk menjalankan aplikasi akan didefinisikan di docker-compose.