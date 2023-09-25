import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Session } from '../user/entities/session.entity';

export const AppdataSource: DataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  password: '226939',
  username: 'postgres',
  entities: [User],
  database: 'chat',
  synchronize: true,
  logging: true,
});
