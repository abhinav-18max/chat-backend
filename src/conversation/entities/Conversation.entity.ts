import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChatParticipant } from './ChatParticipant.entity';
import { JoinTable } from 'typeorm';

@Entity({ name: 'Conversation' })
export class Conversation {
  @PrimaryGeneratedColumn() id: number;

  @ManyToMany(
    () => ChatParticipant,
    (ChatParticipant) => ChatParticipant.conversations,
  )
  @JoinTable()
  chatParticipants: ChatParticipant[];
}
