import { Injectable } from '@nestjs/common';
import {
  createConversationParams,
  Iconversation,
} from './interface/conversation';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from './entities/Conversation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConversationService implements Iconversation {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  createConversation(params: createConversationParams) {
    console.log(params);
  }
}
