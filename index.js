const path = require('path')

const express = require('express')
require('dotenv').config()
const { dbConnection } = require('./db/config')
const cors = require('cors')
// Crear el sv de express
const app = express()
//DB
dbConnection()

//CORS
app.use(cors())
//Directorio publico
app.use( express.static('public'))

//Rutas
//Lecturas y parseo del body
app.use(express.json())

// TODO: auth // crear, login, renew
app.use('/api/auth', require('./routes/auth'))
// TODO: CRUD: Eventos del Calendario
app.use('/api/events', require('./routes/events'))

app.use('*', (req, res) => {
    res.sendFile( path.join( __dirname, 'public/index.html'))
})

//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor funcionando en puerto ${ process.env.PORT }`)
})