import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLoggerService } from './my-logger/my-logger.service';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: ['error', 'warn', 'log'],
    // bufferLogs: true,
  });
  // app.useLogger(app.get(MyLoggerService));

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.setGlobalPrefix('api/v1');

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: '*',
    credentials: true,
    allowedHeaders: '*',
  });
  await app.listen(8000);
}
bootstrap();
