const triggers = [
    '<:hasCapital:798047629233094656>'
];

module.exports = {
    name:'hasCap',
    description:'respond to hascap',
    triggers: triggers,
    execute(message, trig){
        message.react('<:hammer_and_sickle:763227754900488202>');
    }
}