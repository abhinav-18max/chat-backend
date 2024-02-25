import { ChatParticipant } from '../entities/ChatParticipant.entity';

export type FindParticipantParams = Partial<{
  id: number;
}>;
export type CreateParticipantParams = {
  id: number;
};
export interface IParticipantService {
  findParticipant(
    params: FindParticipantParams,
  ): Promise<ChatParticipant | null>;
  createParticipant(params: CreateParticipantParams): Promise<ChatParticipant>;
  findParticipantConversations(id: number);
}
