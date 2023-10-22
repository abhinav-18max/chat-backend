import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { SessionEntity } from './utils/typeorm/entities/session';
import { TypeormStore } from 'connect-typeorm';
import { Appdatasource } from './utils/appdatasource';
import { getConnection, getRepository } from "typeorm";


async function bootstrap() {
  if (Appdatasource.isInitialized===false)
    await Appdatasource.initialize()
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const sessionrepository = Appdatasource.getRepository(SessionEntity);

  app.use(
    session({
      secret: 'my-secret',
      resave:false,
      saveUninitialized:false,
      cookie: { maxAge: 3600000 },
      store: new TypeormStore().connect(sessionrepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(5001);
}

bootstrap();
