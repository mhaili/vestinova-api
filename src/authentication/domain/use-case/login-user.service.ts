import {SequelizeUserRepository} from "../../infrastructure/repository/SequelizeUserRepository";
import hashPasswordService from "../../../shared/service/hashPassword.service";

export class LoginUserService {
    constructor(
        private readonly userRepository: SequelizeUserRepository
    ) {}

    public async execute(
        data: {
            email: string,
            password: string
        }
    ): Promise<any> {
        const user = await this.userRepository.getUserByEmail(data.email);
        if (!user) {
            return new Error('User not found');
        }
        const isSamePassword = await hashPasswordService.comparePassword(data.password, user.password);
        if (!isSamePassword) {
            console.log('is not same password')
            return new Error('Invalid password');
        }
        console.log('is same password')
        return user;
    }
}