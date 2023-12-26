import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Conversation } from './Conversation.entity';
import { JoinTable } from 'typeorm/browser';

@Entity({ name: 'ChatParticipant' })
export class ChatParticipant {
  @PrimaryGeneratedColumn() id: number;

  @ManyToMany(
    () => Conversation,
    (conversation) => conversation.chatParticipants,
  )
  @JoinTable()
  conversations: Conversation[];
}
