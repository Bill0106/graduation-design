const express = require('express')
const app = express()

app.use('/', (req, res) => res.send('Hello World'))

app.listen(8888, () => console.log('Listen at http://localhost:8888'))
