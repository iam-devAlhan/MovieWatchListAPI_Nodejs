import { type Request, type Response } from "express"

export const authController = (req: Request, res: Response) => {
    res.status(201).json({
        message: "User Registered Successfully"
    })
}