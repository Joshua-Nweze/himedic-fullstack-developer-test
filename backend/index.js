import express from "express";
import bodyParser from 'body-parser'
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import cors from 'cors'
import checkAuth from "./middleware/checkAuth.js";

import bookRoutes from './routes/book.routes.js'
import userRoutes from './routes/user.routes.js'

configDotenv()

const app = express()

const PORT = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ['http://localhost:3000', 'https://himedic-test.netlify.app/'],
    credentials: true
}))

app.use('/api/book', bookRoutes)
app.use('/api/user', userRoutes)
// app.put('/api/book/updatebook/:id', (req, res) => { console.log('oh my') })

// validate token

app.post('/api/validate-token', checkAuth, (req, res) => {
	return res.status(200).json({ valid: true })
})

mongoose.connect(process.env.DB_URI)
    .then(app.listen(PORT, () => {
        console.log('db connected')
        console.log(`server running in port ${PORT}`)
    }))