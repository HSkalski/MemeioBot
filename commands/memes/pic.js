require('dotenv').config()// used for .env secret variables
const fetch = require("node-fetch")
const { createApi } = require('unsplash-js');

const unsplashApi = createApi({
    accessKey: process.env.UNSPLASH_KEY,
    fetch: fetch
    //other headers
});

module.exports = {
    name:'pic',
    description:'stock photo querry',
    usage:'[querry string]',
    async execute(message, args){
        //message.channel.send("This command is down for maintenance, check debug info");
        let q = args.join(' ');
        console.log(q);
        let res = await unsplashApi.search.getPhotos({
            query: q,
        });

        if(res.response.results.length == 0){
            message.channel.send('No images responded to the call :(');
            return;
        }
        
        //console.log(res.response.results[0].urls.small);
        let url = res.response.results[Math.floor(Math.random() * res.response.results.length)].urls.small
        console.log(url);
        message.channel.send(url);
        
    }
}