import express from "express";
import { AuthController } from "./authentication/presentation/controller/controller";
import {UserRepository} from "./authentication/infrastructure/repository/UserRepository";
import authGuard from "./shared/middleware/auth.guard";
import {ItemRepository} from "./items/infrastructure/repository/ItemRepository";
import {ItemController} from "./items/presentation/controller/controller";

const router = express.Router();

const userRepository = new UserRepository();
const authController = new AuthController(userRepository);

router.post("/api/auth/register", authController.registerHandler);
router.post("/api/auth/login", authController.loginHandler);

const itemRepository = new ItemRepository();
const itemController = new ItemController(itemRepository);

router.post("/api/items", authGuard, itemController.createItem);

export default router;