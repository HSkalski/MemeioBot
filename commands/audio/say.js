
const say = require('say');
const fs = require('fs'); 
const { VoiceChannel } = require('discord.js');
const {playAudioFile} = require('./audio.js');
if(!fs.existsSync('./temp')){
    fs.mkdirSync('./temp');
}else{
    fs.rmdirSync('./temp', {recursive: true}); // delete temp files on each load
    fs.mkdirSync('./temp');
}
//say.getInstalledVoices((err, voices) => console.log(voices)); // list installed voices on startup
module.exports = {
    name:'say',
    description:'speach was a mistake',
    usage:'[tts string]',
    execute(message, args){
        const timestamp = new Date().getTime();
        const soundPath = `./temp/${timestamp}.wav`;
        say.export(args.join(' '), 'IVONA Brian', 1, soundPath, (err) => {
            if(err){
                console.error(err);
                return;
            }else{
                playAudioFile(message, soundPath);
            }
        })
    }
}