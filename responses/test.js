module.exports = {
    name:'test',
    description:'test responses',
    triggers: [
        'test',
        'test t'
    ],
    execute(message, trig){
        message.channel.send('no u');
    }
};