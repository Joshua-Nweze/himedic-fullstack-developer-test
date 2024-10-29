import express from "express";
import bodyParser from 'body-parser'
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import cors from 'cors'

import bookRoutes from './routes/book.routes.js'

configDotenv()

const app = express()

const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: [],
    credentials: true
}))

app.use('/api/book', bookRoutes)

// validate token

// app.post('/api/validate-token', checkAuth, (req, res) => {
// 	return res.status(200).json({ valid: true })
// })

mongoose.connect(process.env.DB_URI)
    .then(app.listen(PORT, () => {
        console.log('db connected')
        console.log(`server running in port ${PORT}`)
    }))