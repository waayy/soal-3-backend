let express = require('express')
let app = express()
let cors = require('cors')
let router = require('./routes/router')
app.use(cors())
app.use(router)
app.get('/', (req, res) => {
    res.send('<h1>Sekolahku </h1>')
})

app.listen(1212, () => {
    console.log('server running')
})