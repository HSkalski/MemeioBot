
// TODO: 
//       AI dungeon command?
//       new brian tts
//       separate api calls into own folder of files
//       separate audio handling into its own object
//

require('dotenv').config()// used for .env secret variables

const fs = require('fs'); // used for getting commands from /commands dir
const Discord = require('discord.js'); // discord api helper
const {commandPrefix, allowedChannels, secretKeywords} = require('./config.json'); //open config file
const chatLine = require('./botChat.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.responses = new Discord.Collection();

fs.readdirSync('./commands').forEach(dir =>{
    const commandFiles = fs.readdirSync(`./commands/${dir}`)
        .filter(file => file.endsWith('.js')); // grab all command files
    for(const file of commandFiles){ // add them to the collection
        const command = require(`./commands/${dir}/${file}`);
        client.commands.set(command.name, command);
    }
})
console.log('Commands loaded');

const responsFiles = fs.readdirSync('./responses').filter(file => file.endsWith('.js')); // grab all response files
for(const file of responsFiles){
    const response = require(`./responses/${file}`);
    client.responses.set(response.name, response);
}
console.log('Responses loaded');

// Bot startup
client.on('ready', () => { 
    console.log('Bot 🤖 Ready')
    client.user.setActivity('What, you need !help or something?')
    chatLine.initChatLine(client, allowedChannels);
});


client.on('message', (msg)=>{
    // console.log(msg);
    // don't continue if it is the bot's message or not in approved channel
    if(msg.author.bot || allowedChannels.indexOf(msg.channel.id) == undefined) return;
    
    //if prefixed, continue with command
    if(msg.content.startsWith(commandPrefix)){
        resolveCommand(msg);
    }else{
        resolveSecret(msg);
    }
    
})

function resolveCommand(msg){
    console.log(msg.content)
    const args = msg.content.slice(commandPrefix.length).trim().split(/ +/); //cut off prefix, whitespace and split into tokens by space
    const command = args.shift().toLowerCase(); // pop off first element (the command) and convert to lower case

    if(!client.commands.has(command)) return; // only attempt if the command exists

    try{
        client.commands.get(command).execute(msg, args);
    }catch(error){
        console.error(error);
        msg.reply('oopsie doopsie, something wen\'t wrong with that command')
    }
}
// call and response execution
//      could map all triggers back to the execution for faster runtime
//      might have issue with duplicate triggers
function resolveSecret(msg){
    //const tokens = msg.content.trim().toLowerCase().split(/ +/);
    text = msg.content.trim().toLowerCase();
    for(response of client.responses){
        for(let i = 0; i < response[1].triggers.length; i++){
            //console.log(token +' =?= '+ response[1].triggers[i].toLowerCase());
            if(text.includes(response[1].triggers[i].toLowerCase())){
                console.log(`Trigger: ${response[1].triggers[i].toLowerCase()}`);
                response[1].execute(msg, response[1].triggers[i].toLowerCase());
            }
        
        }
    }
}

client.login(process.env.TOKEN)

