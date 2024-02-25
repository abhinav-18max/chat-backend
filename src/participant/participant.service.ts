import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatParticipant } from './entities/ChatParticipant.entity';
import {
  CreateParticipantParams,
  FindParticipantParams,
  IParticipantService,
} from './interface/participant';
import { Conversation } from '../conversation/entities/Conversation.entity';

@Injectable()
export class ParticipantService implements IParticipantService {
  constructor(
    @InjectRepository(ChatParticipant)
    private readonly participantRepository: Repository<ChatParticipant>,
  ) {}

  findParticipant(
    params: FindParticipantParams,
  ): Promise<ChatParticipant | null> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const participant = this.participantRepository.findOne({
      select: ['id', 'conversations'],
      where: { id: params.id },
    });
    return participant;
  }

  async createParticipant(
    params: CreateParticipantParams,
  ): Promise<ChatParticipant> {
    const participant = this.participantRepository.create(params);
    return this.participantRepository.save(participant);
  }

  async findParticipantConversations(id: number) {
    return this.participantRepository
      .createQueryBuilder('participant')
      .leftJoinAndSelect('participant.conversations', 'conversations')
      .where('participant.id = :id', { id: id })
      .leftJoinAndSelect('conversations.chatParticipants', 'participants')
      .leftJoin('participants.user', 'user')
      .addSelect(['user.name', 'user.email'])
      .getOne();
  }
}
