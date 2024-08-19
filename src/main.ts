import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 활성화
  app.enableCors({
    origin: 'https://d0b3-61-22-124-12.ngrok-free.app', // 클라이언트 도메인을 명시적으로 설정
    methods: 'GET,POST', // 허용할 메서드 지정
    credentials: true, // 쿠키 사용 시 설정
  });

  await app.listen(3000);
}
bootstrap();