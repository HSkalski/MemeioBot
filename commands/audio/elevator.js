const {playAudioFile} = require('./audio.js');

module.exports = {
    name:'elevator',
    description:'ding',
    usage:'[] | [start time (0-3600)]',
    execute(message, args){
        let startTime = parseInt(args[0]);
        playAudioFile(message, './otherSounds/elevator.mp3', startTime);
    }
}