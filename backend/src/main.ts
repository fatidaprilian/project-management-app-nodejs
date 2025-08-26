import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Mengatur prefix global untuk semua route menjadi '/api/v1' 
  app.setGlobalPrefix('api/v1');

  // Menggunakan cookie-parser sebagai middleware global
  app.use(cookieParser());

  // Menggunakan exception filter global untuk menangani error secara konsisten 
  app.useGlobalFilters(new HttpExceptionFilter());

  // Menggunakan validation pipe global untuk semua DTO 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Mengambil URL frontend dari .env untuk konfigurasi CORS
  const frontendUrl = configService.get('FRONTEND_URL');

  // Mengaktifkan CORS hanya untuk origin yang diizinkan [cite: 422]
  if (frontendUrl) {
    app.enableCors({
      origin: frontendUrl,
      credentials: true,
    });
  }

  // Menggunakan port 3001 secara langsung sesuai diskusi kita sebelumnya
  const port = 3001;
  await app.listen(port);

  console.log(`🚀 Server berjalan di http://localhost:${port}`);
  if (frontendUrl) {
    console.log(`✅ CORS diaktifkan untuk origin: ${frontendUrl}`);
  }
}
bootstrap();