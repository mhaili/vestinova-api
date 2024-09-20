import bcrypt from 'bcryptjs';
export class HashPasswordService {
    constructor(
        private readonly saltRounds: number = 10,
        private readonly bcrypt1 = bcrypt
    ) {}

    async hashPassword(password: string): Promise<string> {
        return await this.bcrypt1.hash(password, this.saltRounds);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await this.bcrypt1.compare(password, hash);
    }
}

const hashPasswordService = new HashPasswordService();

export default hashPasswordService;