import express, {type Router} from 'express'
import { authController } from '../controllers/authController.js'

const authRouter: Router = express.Router()

authRouter.post('/register', authController)

export default authRouter