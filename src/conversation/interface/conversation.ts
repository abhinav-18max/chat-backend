import { User } from '../../user/entities/user.entity';
import { Conversation } from '../entities/Conversation.entity';

export type createConversationParams = {
  authorId: number;
  recipientId: number;
  message: string;
};

export interface Iconversation {
  createConversation(
    user: User,
    createConversationDetails: createConversationParams,
  ): Promise<Conversation>;
  find(id: number);
  findConversationById(id: number): Promise<Conversation>;
}
