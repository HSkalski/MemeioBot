module.exports = {
    name:'test',
    description:'test responses',
    triggers: [
        'test'
    ],
    execute(message, trig){
        message.channel.send('no u');
    }
};