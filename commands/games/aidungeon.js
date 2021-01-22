
//spawn child process of AI Dungeon
//Errors: 
//  AI Dungeon uses file paths relative to where you launch the program from
//  this causes it to error out when loading
//  fixes:
//      find all locations of loading files ( time consuming, no thanks)
//      script to cd into the folder then launch it ( don't know how that would treat the stdout and stdin when its another layer down)
//      py argument that allows to call it in place maybe?

const { spawn } = require('child_process');
const { statSync } = require('fs');
const say = require('../audio/say.js');

let aidProg;
     
let text = 'Type !aid to begin the AI Dungeon session'
text += "\nAI Dungeon 2 Instructions:"
text += '\n Enter actions starting with a verb ex. "go to the tavern" or "attack the orc."'
text += '\n To speak enter \'say "(thing you want to say)"\' or just "(thing you want to say)" '
text += "\n\nThe following commands can be entered for any action: "
text += '\n  "/revert"   Reverts the last action allowing you to pick a different action.'
text += '\n  "/quit"     Quits the game and saves'
text += '\n  "/reset"    Starts a new game and saves your current one'
text += '\n  "/restart"  Starts the game from beginning with same settings'
text += '\n  "/save"     Makes a new save of your game and gives you the save ID'
text += '\n  "/load"     Asks for a save ID and loads the game if the ID is valid'
text += '\n  "/print"    Prints a transcript of your adventure (without extra newline formatting)'
text += '\n  "/help"     Prints these instructions again'
text += '\n  "/censor off/on" to turn censoring off or on.'

//function out of exports for testing
let playAID = (message, args) =>{
    //message.channel.send('still workin on it');
    //console.log(aidProg);
    if(!aidProg){
        message.channel.send("AI Dungeon is warming up, this could take a minute");
        aidProg = spawn('py', ['../AIDungeon/play.py'], {encoding:'utf8',cwd: '../AIDungeon/'});
        aidProg.stdout.on('data', (data) => {
            console.log(data.toString());
            message.channel.send(data.toString());
            if(message.member.voice.channel){
                say.execute(message,[data.toString()]);
            }
            //aidProg.stdin.write('0\n')
        })
        aidProg.stderr.on('data', (data) =>{
            //console.log(data.toString());
        })
        aidProg.on('close', (code) => {
            console.log(`AIDprog closed with ${code} code`);
            aidProg = undefined;
        })
    }else{
        aidProg.stdin.write(args.join(' '));
        aidProg.stdin.write('\n');
    }
}

module.exports = {
    name:'aid',
    description:'ai dungeon js wrapper - in development',
    usage: text,
    execute(message, args){
        playAID(message,args);
    }
}

//playAID(undefined, [' ']);

