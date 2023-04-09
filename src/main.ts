import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 7070;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => {
    console.log(`\nServer started on ${PORT} port...`);
  });
}

start();
