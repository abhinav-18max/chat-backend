import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { Iconversation } from './interface/conversation';
import { createConversationDto } from './dto/createConversation.dto';
import { AuthenticatedGuard } from '../auth/guards/Authenticated.guard';
import { AuthUser } from '../utils/decorators/AthUser.decorator';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { ParticipantService } from '../participant/participant.service';

@Controller('conversation')
export class ConversationController {
  constructor(
    @Inject(ConversationService)
    private readonly conversationService: Iconversation,
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(ParticipantService)
    private readonly participantService: ParticipantService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Post('create')
  async createConversation(
    @AuthUser() user: User,
    @Body() createConversationPayload: createConversationDto,
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userDB: User = await this.userService.findOne(user.id);
    return this.conversationService.createConversation(
      userDB,
      createConversationPayload,
    );
  }
  @Get(':id')
  async find(@AuthUser() user: User, @Param('id') id: number) {
    return this.conversationService.findConversationById(id);
  }

  @Get()
  async findAll(@AuthUser() user: User) {
    const participant = await this.conversationService.find(user.id);
    return participant.conversations.map((c) => {
      return {
        id: c.id,
        receipient: c.chatParticipants.filter((p) => p.id !== user.id),
      };
    });
  }
}
