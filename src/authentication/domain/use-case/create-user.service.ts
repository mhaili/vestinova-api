import {UserModel} from "../model/User.model";
import UserEntity from "../../infrastructure/entity/User.entity";
import {SequelizeUserRepository} from "../../infrastructure/repository/SequelizeUserRepository";
import hashPasswordService from "../../../shared/service/hashPassword.service";

export class CreateUserService {
    constructor(
        private readonly userRepository: SequelizeUserRepository
    ) {}
    async execute(
        data: {
            firstname: string,
            lastname: string,
            email: string,
            password: string
        }
    ): Promise<UserEntity | Error> {
        let newUser = new UserModel()
        const firstnameError = newUser.setFirstname(data.firstname)
        if (firstnameError instanceof Error) {
            throw firstnameError;
        }
        const lastnameError = newUser.setLastname(data.lastname)
        if (lastnameError instanceof Error) {
            throw lastnameError;
        }
        const emailError = newUser.setEmail(data.email)
        if (emailError instanceof Error) {
            throw emailError;
        }
        const passwordError = newUser.setPassword(data.password)
        if (passwordError instanceof Error) {
            throw passwordError;
        }
        newUser = Object.assign({}, newUser);
        newUser.password = await hashPasswordService.hashPassword(newUser.password);
        return await this.userRepository.createUser(newUser);
    }
}