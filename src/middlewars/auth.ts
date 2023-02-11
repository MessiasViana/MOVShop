import { Request, Response, NextFunction } from "express"
import JWT from "jsonwebtoken";

class Auth {
  async private(req: Request, res: Response, next: NextFunction) {
    let sucess = false;

    if (req.headers.authorization) {
      const [authType, token] = req.headers.authorization.split(" ");

      if (authType === "Bearer") {
        try {
          
          JWT.verify(
            token,
            process.env.JWT_SECRET as string
          );
          sucess = true

        } catch (error) {
          console.log(error)
        }
      }
    }

    if (sucess) {
      next();
    } else {
      res.status(403).json({ message: "Não autorizado" });
    }
  }
}

export default new Auth();