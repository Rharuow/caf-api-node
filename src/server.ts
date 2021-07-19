import express from 'express'
require('dotenv').config()

const app = express()

app.use(express.json())

app.listen(process.env.PORT || 3000, () => console.log(`start server at ${process.env.HOST}:${process.env.PORT}`))