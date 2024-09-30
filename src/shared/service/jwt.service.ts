import * as jwt from 'jsonwebtoken';

class JwtService {
    constructor(
        private readonly secret = process.env.JWT_SECRET,
        private readonly salt = process.env.JWT_SALT
    ) {}

    async generateToken(
        payload: { id: string },
        expiresIn: string
    ): Promise<string> {
        return jwt.sign(payload, this.secret, { expiresIn: expiresIn });
    }

    async verify(token: string): Promise<object> {
        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            return {
                valid: true,
                decoded: decoded,
            };
        } catch (error) {
            return {
                valid: false,
                error: error.message,
            };
        }
    }
}

const jwtService = new JwtService();
export default jwtService;