import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChatParticipant } from '../../participant/entities/ChatParticipant.entity';
import { JoinTable } from 'typeorm';

@Entity({ name: 'Conversation' })
export class Conversation {
  @PrimaryGeneratedColumn() id: number;

  @ManyToMany(
    () => ChatParticipant,
    (ChatParticipant) => ChatParticipant.conversations,
  )
  chatParticipants: ChatParticipant[];
}
