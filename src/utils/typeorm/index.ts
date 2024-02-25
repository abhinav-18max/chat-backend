import { SessionEntity } from './entities/session';
import { User } from '../../user/entities/user.entity';
import { Conversation } from '../../conversation/entities/Conversation.entity';
import { ChatParticipant } from '../../participant/entities/ChatParticipant.entity';

const entities = [SessionEntity, User, Conversation, ChatParticipant];
export default entities;

export { SessionEntity, User, Conversation, ChatParticipant };
