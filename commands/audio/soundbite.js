const fs = require('fs'); 
const { stringify } = require('querystring');
const { playAudioFile } = require('./audio');

const exts = ['.wav', '.mp3']; // file endings for sound files
let soundFiles = fs.readdirSync('./soundBites');
for(let i = 0; i < soundFiles.length; i++){ // only load files of the correct file types
    let flag = false;
    for (let ext of exts){
        if(soundFiles[i].endsWith(ext)){
            flag = true;
            break;
        }
    }
    if(!flag){
        soundFiles.splice(i,1);
        flag = false;
    }
}
console.log(soundFiles);
console.log('Sound effects ready');

module.exports = {
    name:'soundbite',
    description:'AwwooOOOOOgggaaa, refer to !help audio for queue info',
    usage:'[sound file] | \'list\'',
    execute(message, args){
        //console.log(args);
        if(args[0] == "list"){
            list(message);
        }else{
            for(let i = 0; i < soundFiles.length; i++){
                if(args[0] == soundFiles[i].split('.').slice(0, -1).join('.')){
                    let file = soundFiles[i];
                    playAudioFile(message, `./soundBites/${file}`);
                }
            }
        }
    }
}

let list = (message) => {
    let data = [];
    data.push('```');
    data.push('Sound files:');
    data.push(soundFiles.join('\n'));
    data.push('```');
    message.channel.send(data);
}