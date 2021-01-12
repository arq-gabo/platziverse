'use strict'

const debug = require('debug')
const http = require('http')
const express = require('express')
const chalk = require('chalk')
const path = require('path')

const port = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)

app.use(express.static(path.join(__dirname, 'public')))

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