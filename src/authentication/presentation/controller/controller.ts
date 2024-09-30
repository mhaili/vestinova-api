import { Request, Response } from "express";
import {CreateUserService} from "../../domain/use-case/create-user.service";
import {IUserRepository} from "../../infrastructure/repository/IUserRepository";
import {isCreateUserDto} from "../dto/creatUser.dto";
import hashPasswordService from "../../../shared/service/hashPassword.service";
import {isLoginUserDto} from "../dto/loginUser.dto";
import {LoginUserService} from "../../domain/use-case/login-user.service";

export class AuthController {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
    this.registerHandler = this.registerHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }

  public async registerHandler(req: Request, res: Response) {
    const body = req.body;
    if (!isCreateUserDto(body)) return res.status(400).json({ error: 'Invalid body' });
    try {
      const createdUser = await new CreateUserService(this.userRepository).execute(body);
      res.status(201).json(createdUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  public async loginHandler(req: Request, res: Response) {
    const body = req.body;
    if (!isLoginUserDto(body)) return res.status(400).json({ error: 'Invalid body' });
    try {
      const loggegUser = await new LoginUserService(this.userRepository).execute(body);
      res.status(201).json(loggegUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}