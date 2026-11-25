import express, {type Express, type Request, type Response} from 'express'
import authRouter from './routes/authRoute.js'
import cors from 'cors'
import { type Server } from 'node:http'
import { disconnectDb, connectDb } from './config/db.js'

const app: Express = express()
const port = Number(process.env.PORT) || 5000

connectDb()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: `Server is Running on port ${port}`
    })
})

const server: Server = app.listen(port, () => {
    console.log(`Server is running on port 127.0.0.1:${port}`)
})

process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception Error", err)
    await disconnectDb()
    process.exit(1)
})

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection Error", err)
    server.close(async () => {
        await disconnectDb()
        process.exit(1)
    })
})

process.on("SIGTERM", () => {
    console.log("Shutting Down Server Gracefully")
    server.close(async () => {
        await disconnectDb()
        process.exit(1)
    })
})
