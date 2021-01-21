require('dotenv').config()// used for .env secret variables
const fetch = require("node-fetch")

module.exports = {
    name:'gif',
    description:'findo the gifo',
    usage:'[querry string]',
    async execute(message, args){
        let keywords = args.join(' ');
        let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}`
        let response = await fetch(url);
        let json = await response.json();
        const index = Math.floor(Math.random() * json.results.length);
        message.channel.send(json.results[index].url);
    }
}