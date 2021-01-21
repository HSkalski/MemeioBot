const { commandPrefix } = require('../../config.json');//open config file

module.exports = {
    name:'help',
    description:'helpo welpo',
    usage:'[] | [command]',
    execute(message, args){
        const data = [];
        const {commands} = message.client;
        if(!args.length){
            data.push('```')
            data.push('Welcome to the internet bub');
            data.push('use !help [command] for more info');
            data.push('```')
            data.push('Heres a list of stuff you can do:');
            data.push(commands.map(command=>"**"+command.name+":** "+command.description).join('\n'));
            message.channel.send(data)
        }
        else{
            const command = commands.get(args[0].toLowerCase());
            if(!command){
                message.channel.send('That is not a valid command silly');
                return;
            }
            data.push('```');
            data.push(commandPrefix+args[0]+' '+command.usage);
            data.push(command.description);
            data.push('```');
            message.channel.send(data);
        }
    }
}