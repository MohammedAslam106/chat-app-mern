import path from 'path'
import express from 'express'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.route.ts'
import messageRoutes from './routes/message.route.ts'
import userRoutes from './routes/user.route.ts'

import connectToMongoDB from './db/connectToMongoDB.ts'
import cookieParser from 'cookie-parser'
// import cors from 'cors'
import { app, server } from './scoket/socket.ts'

dotenv.config()

// const app = express()

app.use(express.json())
app.use(cookieParser());
// app.use(cors({origin:'http://localhost:5173'}))

const PORT = process.env.PORT || 5000

const __dirname=path.resolve()

app.use('/api/auth',authRoutes);

app.use('/api/messages',messageRoutes)

app.use('/api/users',userRoutes)

app.use(express.static(path.join(__dirname,'/fe/dist')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"fe","dist",'index.html'))
})

// You need to call listen on the result of app.listen
server.listen(PORT, () => {
    connectToMongoDB();
    console.log('Server is running at http://localhost:5000')
})