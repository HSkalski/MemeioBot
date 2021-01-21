module.exports = {
    name:'ping',
    description:'ping pong',
    usage:'[]',
    execute(message, args){
        message.channel.send('Pong.')
    }
}