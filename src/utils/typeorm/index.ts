import { SessionEntity } from './entities/session';
import { User } from '../../user/entities/user.entity';
import { Conversation } from '../../conversation/entities/Conversation.entity';

const entities = [SessionEntity, User, Conversation];
export default entities;

export { SessionEntity, User, Conversation };
