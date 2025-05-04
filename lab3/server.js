const express = require('express')
const path = require('path')

const blueprints = require('./internal/blueprints')

const app = express()

const host = 'localhost'
const port = 8000

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.use(express.json())
app.use('/blueprints', blueprints)

app.listen(port, host, () => {
	console.log(`Сервер запущен по адресу http://${host}:${port}`)
})
