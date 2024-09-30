import { IUserRepository } from './IUserRepository';
import UserEntity from '../../infrastructure/entity/User.entity';

export class UserRepository implements IUserRepository {
    async getUserById(id: string): Promise<UserEntity> {
        return UserEntity.findByPk(id);
    }

    async getUsers(): Promise<UserEntity[]> {
        return UserEntity.findAll();
    }

    async createUser(data: any): Promise<any> {
        return UserEntity.create(data);
    }

    async getUserByEmail(email: string): Promise<UserEntity> {
        return UserEntity.findOne({ where: { email } });
    }
}