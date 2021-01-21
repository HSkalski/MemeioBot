const jailOptions = [
    'https://tenor.com/bi5aV.gif',
    'https://tenor.com/bf2F5.gif'
]

module.exports = {
    name:'jail?',
    description:'belive it or not.. jail',
    usage:'[]',
    execute(message, args){
        message.reply(jailOptions[Math.floor(Math.random()*jailOptions.length)])
    }
}