import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyHelmet from "@fastify/helmet";
import fastifyRateLimit from "@fastify/rate-limit";
import fastifyCompress from "@fastify/compress";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
     new FastifyAdapter(),
    );
  app.enableShutdownHooks();
  app.enableCors();
  await app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });
  await app.register(fastifyHelmet);
  await app.register(fastifyCompress);


  await app.listen(3000, "0.0.0.0");
}
bootstrap();