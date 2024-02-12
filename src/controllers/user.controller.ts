import { Request, Response, NextFunction } from "express";
import * as service from "../services/user.service";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await service.signup(req.body);

    return res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await service.signin(req.body);

    res.cookie("token", user.token, { httpOnly: true, maxAge: 4 * 86400 });

    return res.status(200).json(user.user);
  } catch (err) {
    next(err);
  }
};
