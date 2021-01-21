const Canvas  = require("canvas");
const {MessageAttachment} = require('discord.js')// discord api helper
require('dotenv').config()// used for .env secret variables

const axios = require('axios').default


module.exports = {
    name:'gmeme',
    description:'custom meme with google photo and text',
    usage:'[background querry]; [top text]; [bottom text]',
    execute(message, args){

        const canvas = Canvas.createCanvas(500,350);
        const ctx = canvas.getContext('2d');
        
        //message.channel.send("This command is down for maintenance, check debug info");
        let memeTexts = args.join(' ').split(';');//I don't check to see if there are enough args, turns into undefined on the meme
        let q = memeTexts[0]; 
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
            let url = res.data.items[Math.floor(Math.random() * res.data.items.length)].link
            console.log(url);
        
            //const background = Canvas.loadImage(url)
            Canvas.loadImage(url)
                .then((background) => {
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
                })
        })
    }
}