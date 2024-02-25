import { Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Conversation } from '../../conversation/entities/Conversation.entity';
import { JoinTable } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'ChatParticipant' })
export class ChatParticipant {
  @PrimaryGeneratedColumn() id: number;

  @ManyToMany(
    () => Conversation,
    (conversation) => conversation.chatParticipants,
  )
  @JoinTable()
  conversations: Conversation[];

  @OneToOne(() => User, (user) => user.chatParticipant)
  user: User;
}
