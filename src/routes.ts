import express from "express";
import { AuthController } from "./authentication/presentation/controller/controller";
import {SequelizeUserRepository} from "./authentication/infrastructure/repository/SequelizeUserRepository";

const router = express.Router();
const userRepository = new SequelizeUserRepository();
const authController = new AuthController(userRepository);

router.get("/api/auth", authController.getHandler);
router.post("/api/auth", authController.postHandler);
router.put("/api/auth", authController.putHandler);
router.delete("/api/auth", authController.deleteHandler);

export default router;