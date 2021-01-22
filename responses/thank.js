//of course this doesn't work, need a rolling shutter style string comparison

// const triggers = [
//     'good bot',
//     'thanks memeio',
//     'thanks bot',
//     'good memeio'
// ];

module.exports = {
    name:'thankBot',
    description:'respond to thanks',
    triggers: [
        'good bot',
        'thanks memeio',
        'thanks bot',
        'good memeio',
    ],
    execute(message, trig){
        message.channel.send('just doin muh jawb maam');
    }
}