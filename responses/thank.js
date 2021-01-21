const triggers = [
    'good bot',
    'thanks memeio',
    'thanks bot',
    'good memeio'
];

module.exports = {
    name:'thankBot',
    description:'respond to thanks',
    triggers: triggers,
    execute(message, trig){
        message.react('just doin muh jawb maam');
    }
}