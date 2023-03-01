import { Router, Request, Response } from "express";
import * as UserController from "../controllers/userController";
import Middleware from "../middlewars/auth";


const router = Router();


router.get("/ping", Middleware.private, async (req: Request, res: Response) => {
    res.json({pong: true});
});

router.post("/signup", UserController.signup);


export default router;