require('dotenv').config()// used for .env secret variables
const axios = require('axios').default


module.exports = {
    name:'gpic',
    description:'google photo querry',
    usage:'[querry string]',
    execute(message, args){
        if(args.length == 0){
            message.reply('need a query dummy');
            return;
        }
        let q = args.join(' ');
        console.log(q);
        axios.get(`https://www.googleapis.com/customsearch/v1`,{
            params: {
                q: q,
                imgSize: 'MEDIUM',
                safe: 'off',
                searchType: 'image',
                cx: process.env.GOOGLE_CX,
                key: process.env.GOOGLE_KEY
            }
        })
            .then((res) => {
                //console.log(res.data.items);
                if(!res.data.items){
                    message.reply('no images reponded to the call');
                    return;
                }
                console.log(res.data.items.length)
                let url = res.data.items[Math.floor(Math.random() * res.data.items.length)].link
                message.channel.send(url);
            })
            .catch((e) => {
                console.error(e)
            })
            .then(() => {
                //done
            })
    }
}
