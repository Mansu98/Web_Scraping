const request = require('request');
const cheerio= require("cheerio");
const fs = require("fs");
const writeStream = fs.createWriteStream("product.csv");


request("https://books.toscrape.com/index.html",(error,Response,html)=>{
    if(!error && Response.statusCode==200){
        const $ = cheerio.load(html);
        writeStream.write(`"title","price","stock"\n`);


     $('#default > div > div > div > div > section > div:nth-child(2) > ol > li').each((i,element)=>{

        const title =$(element).find('h3').text().trim();
        const price = $(element).find('.price_color').text().trim();
        const stock = $(element).find('.price_color + p').text().trim();

        writeStream.write(`${title},${price},${stock} \n`);

     })
     console.log("scraping done ..." )

      
    }
})