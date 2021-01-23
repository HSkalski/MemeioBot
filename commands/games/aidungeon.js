
//spawn child process AI Dungeon and send commands to it
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');
const { spawn } = require('child_process');
const { statSync } = require('fs');
const say = require('../audio/say.js');

let aidProg;

let instructions = 'Type !aid to begin the AI Dungeon session, follow !aid with your AI Dungeon action'
instructions += "\nAI Dungeon 2 Instructions:"
instructions += '\n Enter actions starting with a verb ex. "go to the tavern" or "attack the orc."'
instructions += '\n To speak enter \'say "(thing you want to say)"\' or just "(thing you want to say)" '
instructions += "\n\nThe following commands can be entered for any action: "
instructions += '\n  "/revert"   Reverts the last action allowing you to pick a different action.'
instructions += '\n  "/quit"     Quits the game and saves'
instructions += '\n  "/reset"    Starts a new game and saves your current one'
instructions += '\n  "/restart"  Starts the game from beginning with same settings'
instructions += '\n  "/save"     Makes a new save of your game and gives you the save ID'
instructions += '\n  "/load"     Asks for a save ID and loads the game if the ID is valid'
instructions += '\n  "/print"    Prints a transcript of your adventure (without extra newline formatting)'
instructions += '\n  "/help"     Prints these instructions again'
instructions += '\n  "/censor off/on" to turn censoring off or on.'

//function out of exports for testing
let playAID = (message, args) =>{
    //message.channel.send('still workin on it');
    //console.log(aidProg);
    //if there isn't a AI Dungeon started, start one
    if(!aidProg){
        message.channel.send("AI Dungeon is warming up, this could take a minute");
        aidProg = spawn('py', ['../AIDungeon/play.py'], {cwd: '../AIDungeon/'});
        aidProg.stdout.on('data', (data) => {
            let str = decoder.write(data);
            console.log(str);
            message.channel.send(str);
            if(message.member.voice.channel){
                say.execute(message,[str]);
            }
        })
        aidProg.stderr.on('data', (data) =>{
            //let str = decoder.write(data);
            //console.log(str);
        })
        aidProg.on('close', (code) => {
            console.log(`AIDprog closed with ${code} code`);
            aidProg = undefined;
        })
    }else{
        console.log(`Sent: "${args.join(' ')}"`);
        aidProg.stdin.write(args.join(' '));
        aidProg.stdin.write('\n');
    }
}

module.exports = {
    name:'aid',
    description:'ai dungeon js wrapper - in development',
    usage: instructions,
    execute(message, args){
        playAID(message,args);
    }
}

//playAID(undefined, [' ']);

