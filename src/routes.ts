import express from "express";
import { AuthController } from "./authentication/presentation/controller/controller";
import {SequelizeUserRepository} from "./authentication/infrastructure/repository/SequelizeUserRepository";
import authGuard from "./shared/middleware/auth.guard";

const router = express.Router();
const userRepository = new SequelizeUserRepository();
const authController = new AuthController(userRepository);

router.post("/api/auth/register", authController.registerHandler);
router.post("/api/auth/login", authController.loginHandler);

export default router;