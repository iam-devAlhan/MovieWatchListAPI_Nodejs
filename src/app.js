import express from 'express';
import pinoHttp from 'pino-http';
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.use(
  pinoHttp({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        ignore: 'pid,hostname,req,res,responseTime',
        messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
      },
    },
  })
);


app.get('/health', (req, res) => {
    res.json({status: 'ok'})
})

app.get('/', (req, res) => {
    res.json({message: `Server is running on port ${port}`})
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

