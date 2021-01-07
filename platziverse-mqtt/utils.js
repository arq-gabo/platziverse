'use strict'

function parsePayLoad(payload){
    if(payload instanceof Buffer){
        payload = payload.toString('utf8')
    }

    try {
        payload = JSON.parse(payload)
    } catch(e){
        payload = null
    }

    return payload
}

module.exports = {
    parsePayLoad
}