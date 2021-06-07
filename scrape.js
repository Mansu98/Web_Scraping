const request = require('request');
const cheerio= require("cheerio");
const fs = require("fs");
const writeStream = fs.createWriteStream("post.csv");


request("https://www.dummies.com/",(error,Response,html)=>{
    if(!error && Response.statusCode==200){
        const $ = cheerio.load(html);
        // const site = $('.single-featured-category-inner-content');
        // const title = site.find('h3').text().replace(/\s\s+/g ,'');
        // const desc = site.find('span').text().trim();
        // console.log(title);
        // console.log(desc);
        writeStream.write('"title","description" \n');
     $('.single-featured-category-inner-content').each((i,el)=>{

        const title =$(el).find('h3').text().replace(/\s\s+/g ,'');
        const desc = $(el).find('span').text().trim();

        

        writeStream.write(`${title},${desc} \n`);

     })
     console.log("scraping done ..." )

      
    }
})