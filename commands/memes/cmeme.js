const Canvas  = require("canvas");
const {MessageAttachment} = require('discord.js')// discord api helper
require('dotenv').config()// used for .env secret variables
const fetch = require("node-fetch")
const { createApi } = require('unsplash-js');

const unsplashApi = createApi({
    accessKey: process.env.UNSPLASH_KEY,
    fetch: fetch
    //other headers
});

module.exports = {
    name:'cmeme',
    description:'custom meme with stock photo and text',
    usage:'[background querry]; [top text]; [bottom text]',
    async execute(message, args){

        const canvas = Canvas.createCanvas(500,350);
        const ctx = canvas.getContext('2d');
        
        //message.channel.send("This command is down for maintenance, check debug info");
        let memeTexts = args.join(' ').split(';');//I don't check to see if there are enough args, turns into undefined on the meme
        let q = memeTexts[0]; 
        console.log(q);
        let res = await unsplashApi.search.getPhotos({
            query: q,
        });
        //console.log(res);
        if(res.response.results.length == 0){
            message.channel.send('No images responded to the call :(');
            return;
        }
        let url = res.response.results[Math.floor(Math.random() * res.response.results.length)].urls.small
        console.log(url);
        
        const background = await Canvas.loadImage(url);
        let maxFontSize = 60;
        let fontface = 'impact';
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle='#000000';
        ctx.textAlight = 'center';
        ctx.lineWidth = 1;
        let topBotMargin = 15;
        let leftMargin = 5;
        
        //long and annoying process to get text to not go out of picture
        // dynamic for top and bottom text
        // ---- line 1 ----
        let fontsize = maxFontSize;
        ctx.font = fontsize+'px '+fontface;

        //decrease font size until text fits on a line
        while(ctx.measureText(memeTexts[1]).width > canvas.width-canvas.width*(2*leftMargin/100)){
            fontsize--;
            ctx.font = fontsize+'px '+fontface;
        }
        let textWidth = ctx.measureText(memeTexts[1]).width;//used to center text
        ctx.fillText(memeTexts[1], (canvas.width/2) - (textWidth/2), canvas.height*(topBotMargin/100));
        ctx.strokeText(memeTexts[1], (canvas.width/2) - (textWidth/2), canvas.height*(topBotMargin/100));
        
        // ---- line 2 ----
        fontsize = maxFontSize;
        ctx.font = fontsize+'px '+fontface;
        while(ctx.measureText(memeTexts[2]).width > canvas.width-canvas.width*(2*leftMargin/100)){
            fontsize--;
            ctx.font = fontsize+'px '+fontface;
        }
        textWidth = ctx.measureText(memeTexts[2]).width;
        ctx.fillText(memeTexts[2], (canvas.width/2) - (textWidth/2), canvas.height-(canvas.height*(topBotMargin/100)));
        ctx.strokeText(memeTexts[2], (canvas.width/2) - (textWidth/2), canvas.height-(canvas.height*(topBotMargin/100)));
        

        const attachment = new MessageAttachment(canvas.toBuffer(), 'cmeme.png');
        message.channel.send('', attachment);
    }
}