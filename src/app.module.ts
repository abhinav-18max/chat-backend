import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appdatasource } from './utils/appdatasource';
import { SessionentityModule } from './sessionentity/sessionentity.module';
import { ConversationController } from './conversation/conversation.controller';
import { ConversationService } from './conversation/conversation.service';
import { ConversationModule } from './conversation/conversation.module';
import  entities  from './utils/typeorm';



@Module({
  imports: [
    TypeOrmModule.forRoot(Appdatasource.options),
    PassportModule.register({ session: true }),
    AuthModule,
    UserModule,
    SessionentityModule,
    ConversationModule,
  ],
  controllers: [ConversationController],
  providers: [ConversationService],

})
export class AppModule {
  constructor(private Appdatasource: DataSource) {}

}
