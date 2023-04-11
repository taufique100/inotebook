const connectToMongo = require('./db');
connectToMongo();

const express = require('express')
const app = express()
const port = 5000

app.use(express.json());
//available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})