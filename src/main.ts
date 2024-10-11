import { NestFactory } from '@nestjs/core';
import { FileModule } from './file.module';
import { env } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(FileModule);
  await app.listen(env.port);
}
bootstrap();
