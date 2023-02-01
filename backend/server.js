const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended : false}))

app.use('/api/trips', require('./routes/tripRoutes'))
app.use('/api/agent', require('./routes/agentRoutes'))
app.use('/api/user', require('./routes/userRoutes'))



app.use(errorHandler)


app.listen(port, () => {console.log(`listening on port ${port}`)})