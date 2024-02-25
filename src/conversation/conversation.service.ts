import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  createConversationParams,
  Iconversation,
} from './interface/conversation';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from './entities/Conversation.entity';
import { Repository } from 'typeorm';
import { ParticipantService } from '../participant/participant.service';
import { IParticipantService } from '../participant/interface/participant';
import { User } from '../user/entities/user.entity';
import { IUserService } from '../user/interface/user';
import { UserService } from '../user/user.service';
import { ChatParticipant } from '../participant/entities/ChatParticipant.entity';

@Injectable()
export class ConversationService implements Iconversation {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @Inject(ParticipantService)
    private readonly participantService: IParticipantService,
    @Inject(UserService)
    private readonly userService: IUserService,
  ) {}

  async createConversation(user: User, params: createConversationParams) {
    const userDB = await this.userService.findOne(user.id);
    const participants: ChatParticipant[] = [];
    if (!userDB.chatParticipant) {
      const newParticipant = await this.participantService.createParticipant({
        id: params.authorId,
      });
      userDB.chatParticipant = newParticipant;
      await this.userService.saveUser(userDB);
      participants.push(newParticipant);
    } else {
      participants.push(userDB.chatParticipant);
    }

    const receipient = await this.userService.findOne(params.recipientId);
    if (!receipient)
      throw new HttpException('Recipient not found', HttpStatus.NOT_FOUND);
    if (!receipient.chatParticipant) {
      const newParticipant = await this.participantService.createParticipant({
        id: params.recipientId,
      });
      receipient.chatParticipant = newParticipant;
      await this.userService.saveUser(receipient);
      participants.push(newParticipant);
    } else {
      participants.push(receipient.chatParticipant);
    }
    const newConversation = await this.conversationRepository.create({
      chatParticipants: participants,
    });
    return await this.conversationRepository.save(newConversation);
  }

  async find(id: number) {
    return await this.participantService.findParticipantConversations(id);
  }

  async findConversationById(id: number) {
    return await this.conversationRepository.findOne({
      where: { id },
      relations: ['chatParticipants', 'chatParticipants.user'],
    });
  }
}
