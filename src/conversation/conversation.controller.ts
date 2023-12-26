import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { Iconversation } from './interface/conversation';
import { createConversationDto } from './dto/createConversation.dto';

@Controller('conversation')
export class ConversationController {
  constructor(
    @Inject(ConversationService)
    private readonly conversationService: Iconversation,
  ) {}

  @Post() createConversation(
    @Body() createConversationPayload: createConversationDto,
  ) {
    this.conversationService.createConversation();
  }
}
