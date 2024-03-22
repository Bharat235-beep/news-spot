const connectTOMongo=require('./db')
connectTOMongo();
const express = require('express')
const cors = require('cors')
const app = express()

const port = 5000
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Connected Successfully')
})
app.use('/api/auth',require('./routes/auth'));
app.use('/api/news',require('./routes/news'));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})