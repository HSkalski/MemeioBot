const {playAudioFile} = require('./audio.js');
const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports = {
    name:'yt',
    description:'Youtube DL audio',
    usage:'[youtube link]',
    execute(message, args){
        let stream = ytdl(args[0], {filter: 'audioonly'});
        console.log(args[0]);
        const timestamp = new Date().getTime();
        const tempPath = `./temp/${timestamp}.mp3`;
        console.log('loading file...');
        stream.pipe(fs.createWriteStream(tempPath))
            .on('finish', () =>{
                console.log('playing audio');
                playAudioFile(message, tempPath);
            })
    }
}