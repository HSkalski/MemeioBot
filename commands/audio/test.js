const {playAudioFile} = require('./audio.js');

module.exports = {
    name:'test',
    description:'The FitnessGram™ Pacer Test is a multistage aerobic capacity test',
    usage:'[]',
    execute(message, args){
        playAudioFile(message, './otherSounds/20meterPACER.mp3');
    }
}