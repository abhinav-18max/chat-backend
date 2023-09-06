import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";

import * as session from "express-session";
import * as passport from "passport";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(session({
    secret: "my-secret", resave: false, saveUninitialized: false, cookie: { maxAge: 3600000 }
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(5000);
}

bootstrap();
