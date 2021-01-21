const triggers = [
    'robot',
    'bot',
    'memeio'
];
module.exports = {
    name:'bot',
    description:'respond to name',
    triggers: triggers,
    execute(message, trig){
        message.channel.send('you talkin\' to me?');
    }
};