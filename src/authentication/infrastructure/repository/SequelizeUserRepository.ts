import { IUserRepository } from './IUserRepository';
import UserEntity from '../../infrastructure/entity/User.entity';
import sequelize from "../../../../sequelize.config";

export class SequelizeUserRepository implements IUserRepository {
    async getUserById(id: string): Promise<UserEntity> {
        return UserEntity.findByPk(id);
    }

    async getUsers(): Promise<UserEntity[]> {
        return UserEntity.findAll();
    }

    async createUser(data: any): Promise<any> {
        return UserEntity.create(data);
    }
}