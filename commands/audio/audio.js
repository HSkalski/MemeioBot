//main audio handler command file
// exposes function to play audio from file
// pushes to queue, works accross servers - future possibilities

// to do: push time to queue as well, currently time only works if nothing is playing

let servers = {}; // control audio accros multiple discord servers


let play = (message, time) => {
    //console.log(message);
    var server = servers[message.guild.id];
    server.playing = true;
    server.dispatcher = server.connection.play(server.queue.shift(), {volume: 0.6, seek: time});
    
    server.dispatcher.on('finish', () => {
        if(server.queue[0]){
            console.log(server.queue[0]);
            play(message);
        }else{ // queue empty
            server.playing = false;
            //server.connection.disconnect();
        }
    })
    server.dispatcher.on('err', (err) => {
        console.error(err);
    })
}

module.exports = {
    name:'audio',
    description:'queue: lists q, skip: skips current play, stop: clear queue',
    usage:'\'queue\' | \'skip\'|\'stop\'',
    execute(message, args){ // called from bot.js
        let server = servers[message.guild.id];
        switch(args.join(' ')){
            // case 'play': // for testing, will eventually be all internal
            //     this.playAudioFile(message, args[1]);
            //     break;
            case 'skip':
                //let server = servers[message.guild.id];
                if(server.dispatcher) server.dispatcher.end();
                message.react('<:hammer_and_sickle:763227754900488202>');
                break;
            case 'stop':
                //let server = servers[message.guild.id];
                //console.log(message.guild.voice.connections);
                if(message.client.voice.connections.get(message.member.voice.channel.guild.id)){
                    for(let i = server.queue.length - 1; i>=0; i--){
                        server.queue.splice(i,1);
                    }
                    server.dispatcher.end()
                    console.log('stopped queue');
                    message.reply("is a fun ruiner");
                }
                break;
            case 'queue':
                message.channel.send(servers[message.guild.id].queue);
            case 'leave':
                //let server = servers[message.guild.id];
                server.connection.disconnect();
                console.log(server.connection);
                break;
            default:
                break;

        }
    },
    playAudioFile(message, path, time){
        if(!path){
            message.channel.send("Need a file to play bub");
            return;
        }
        if(!message.member.voice.channel){
            message.reply("ya gotta join a voice channel first dummy");
            return;
        }
        if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue: [],
            connection: undefined,
            playing: false
        }
        var server = servers[message.guild.id];
        server.queue.push(path);
        console.log(`queue: ${server.queue}`);
        let voiceChannel = message.member.voice.channel;
        // console.log(message.client.voice.connections.get(voiceChannel.guild.id));
        // console.log(voiceChannel.guild.id);
        //console.log(!server.connection);
        //if(!message.client.voice.connections.get(voiceChannel.guild.id)) voiceChannel.join().then((connection) => {
            //console.log(message.guild.voiceConnection);
        if(!server.playing) voiceChannel.join().then((connection) => { // restart queue if not currently playing
            server.connection = connection;
            play(message, time)
        }) 
    }
}