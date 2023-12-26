import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/Conversation.entity';
import { ChatParticipant } from './entities/ChatParticipant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, ChatParticipant])],
  controllers: [ConversationController],
  providers: [ConversationService],
})
export class ConversationModule {}
