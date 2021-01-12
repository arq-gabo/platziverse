'use strict'

const debug = require('debug')('platziverse:web')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const chalk = require('chalk')
const path = require('path')

const port = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

//Socket.io / webSocket
io.on('connect', socket => {
    debug(`Connected ${socket.id}`)

    socket.on('agent/message', payload => {
        console.log(payload)
    })

    setInterval(() => {
        socket.emit('agent/message', { agent: 'xxx-yyy' })
    }, 2000)
})

function handleFatalError(err){
    console.error(`${chalk.red('[Fatal Error]')} ${err.message}`)
    console.error(err.stack)
    process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

server.listen(port, () => {
    console.log(`${chalk.green('[platziverse-web]')} server listen un port ${port}`)
})