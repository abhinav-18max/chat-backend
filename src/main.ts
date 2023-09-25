import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as passport from 'passport';
import { Repository } from 'typeorm';
import { TypeormStore } from 'connect-typeorm';
import 

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const session = Repository<Session>;

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
      store: new TypeormStore().connect(),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(5000);
}

bootstrap();
