import {UserRepository} from "../../infrastructure/repository/UserRepository";
import hashPasswordService from "../../../shared/service/hashPassword.service";
import jwtService from "../../../shared/service/jwt.service";

export class LoginUserUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    public async execute(
        data: {
            email: string,
            password: string
        }
    ): Promise<{token: string} | Error> {
        const user = await this.userRepository.getUserByEmail(data.email);
        if (!user) {
            return new Error('User not found');
        }
        const isSamePassword = await hashPasswordService.comparePassword(data.password, user.password);
        if (!isSamePassword) {
            console.log('is not same password')
            return new Error('Invalid password');
        }
        return {
            token: await jwtService.generateToken({ id: user.id }, '30d')
        };
    }
}