
// ! not updated yet
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import UserSchema from "../models/Users";

import { ISignup } from "../DTOs/IUsers";

export const signup = async (req: Request, res: Response) => {
  let { name, email, password, password_confirmation, datebirth }: ISignup = req.body;

  if (!name || !email || !password || !password_confirmation || !datebirth) {
    return res.json({ error: "Algum campo não foi preenchido" });
  }

  const user = await UserSchema.findOne({ where: { email } });
  if(user)
    return res.json({ error: "Usuário já cadastrado" });
  
  /** 
   * * Age and password handling
  */
  
  const date = new Date(datebirth)
  const dateNow = new Date();
  const ageInMilliseconds = dateNow.getTime() - date.getTime();
  const ageInYears = ageInMilliseconds / 1000 / 60 / 60 / 24 / 365.25;
  
  if (ageInYears < 18) {
    return res.json({ error: "Você deve ser maior de 18 anos para se cadastrar!" });
  }


  if (password !== password_confirmation) {
    return res.json({ error: "Senhas não coincidem!" });
  }
  const passwordHash = await bcrypt.hash(password, 10);

  /** 
   * * End of age and password handling
  */
  
  /**
   * ! Criation of users
   */
  
  try {
    const newUser = await UserSchema.create({
      name,
      email,
      password : passwordHash,
      datebirth,
      profile: 2
    })

    const token = JWT.sign(
      { id: newUser.dataValues.id, email: newUser.dataValues.email },
      process.env.JWT_SECRET as string, { expiresIn: "1h" }
    );

    res.status(200).json({ id: newUser.dataValues.id, token: token });

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: false });
  }
}