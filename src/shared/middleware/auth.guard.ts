import jwtService from "../service/jwt.service";

const authGuard = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }
    try {
        const decoded = await jwtService.verify(token);
        if (!decoded.valid) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded.decoded;
    } catch (error) {
        return res.status(500).json({ message: 'Internal error' });
    }
    next();
}

export default authGuard;