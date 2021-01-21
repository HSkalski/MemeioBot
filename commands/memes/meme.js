
require('dotenv').config()
const axios = require('axios').default

// init random meme templates
let templateArray = []
let filteredTemplates = []

let templateStartup = false
axios.get('https://api.imgflip.com/get_memes')
    .then(function(response) {
        // handle success
        templateArray = response.data.data.memes
        filteredTemplates = templateArray.filter(function(obj) {
            // filter only two box memes
            return obj.box_count == 2
        })
        templateStartup = true
        console.log('Templates ready')
    })
    .catch(function(error) {
        // handle error
        console.log(error)
    })
    .then(function() {
        // always executed
    })


module.exports = {
    name:'meme',
    description:'its a gooda meeme',
    usage:'[top text]; [bottom text]',
    execute(message, args){
        let memeTexts = args.join(' ').split(';');
        
        console.log(memeTexts[0])
        console.log(memeTexts[1])
        let rng = Math.floor(Math.random() * filteredTemplates.length)
        const templateId = filteredTemplates[rng].id // get it boi

        axios.post('https://api.imgflip.com/caption_image', null, {
                params: {
                    template_id: templateId,
                    username: process.env.IMGFLIP_USER,
                    password: process.env.IMGFLIP_PASS,
                    text0: memeTexts[0],
                    text1: memeTexts[1],
                },
            })
            .then(function(response) {
                console.log('meme url: ' + response.data.data.url)
                message.reply(response.data.data.url)
            })
            .catch(function(error) {
                console.log(error)
                message.reply('something went wrongo in meme retrival wango')
            })
    }
}