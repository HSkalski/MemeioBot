
const readline = require('readline');
let cClient = {};
let botChannel = {}; // current chat channel
const prefix = '-'
// send message to bot-chenanigans as memeio
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let consoleInput = () => {
    rl.question(`[${botChannel.name}] > `, (input) =>{
        if(input == ""){
            //console.log("Need input");
        }else if(input.startsWith(prefix)){
            const args = input.slice(prefix.length).trim().split(/ +/);
            if(args[0] == "swap"){ // change channel bot is talking to
                if (cClient.channels.cache.find(channel => channel.name === args[1]))
                    botChannel = cClient.channels.cache.find(channel => channel.name === args[1]);
                else
                    console.log("no matching channel")
            }
        }else{
            botChannel.send(input);
            console.log(`Sent: ${input}`)
        }
        consoleInput();
    })
}


module.exports = {
    initChatLine(client, allowedChannels){
        cClient = client;
        cClient.channels.fetch(allowedChannels[0]) // Get channel that bot cmd chats on ('bot_shenanigans')
        .then((channel) => {
            botChannel = channel;
            console.log('Chatline Ready');
            consoleInput();
        });
    }
}