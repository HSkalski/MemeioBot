const { playAudioFile } = require('./audio');

const jammiesGifs = [
    'https://tenor.com/view/pepe-the-frog-dance-pepepeepo-jammies-jammies-peepo-gif-17771748',
    'https://tenor.com/bjdRR.gif',
    'https://cdn.betterttv.net/emote/5d2dc7dcff6ed3680130eb6d/3x'
]

module.exports = {
    name:'jammies',
    description:'We jammin',
    usage:'[] | [jam time (sec)]',
    execute(message, args){
        // message.channel.send('-play BUILT DIFFERENTLY') // groovy doesnt get triggered by other bots I guess
        //     .then(sentMessage => {
        //         sentMessage.delete({ timeout: 100});
        //     });
        let jamTime = 10000; // default time
        const maxJam = 1000*120
        if(args[0]){ jamTime = 1000 * parseInt(args[0]); }
        if(jamTime > maxJam){ jamTime = maxJam; }
        playAudioFile(message, './sounds/builtdifferently.mp3');
        for(let i = 0; i < 4; i++){
            message.channel.send(jammiesGifs[Math.floor(Math.random() * jammiesGifs.length)])
                .then(sentMessage => {
                    sentMessage.delete({ timeout: jamTime});
                });
            
        }
    }
}