import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserServiceModule } from 'apps/user-service/src/user-service.module';

async function bootstrap() {
  const app = await NestFactory.create(UserServiceModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379',
    },
  });

  await app.startAllMicroservices();
  await app.listen(3002);
}
bootstrap();
