import { User } from '../entities/user.entity';
export type FindUserParams = Partial<{
  id: number;
}>;
export type CreateUserParams = {
  name: string;
  email: string;
  password: string;
};
export type UpdateUserParams = {
  id: number;
  name: string;
  email: string;
  password: string;
};
export type DeleteUserParams = {
  id: number;
};
export interface IUserService {
  findOne(id: number): Promise<User | null>;
  createUser(params: CreateUserParams): Promise<User>;
  updateUser(params: UpdateUserParams): Promise<User>;
  deleteUser(params: DeleteUserParams): Promise<User>;
  saveUser(user: User): Promise<User>;
  findOneByEmail(email: string): Promise<User | null>;
}
