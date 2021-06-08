const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const json2csv = require("json2csv").Parser;

const books =[
    "https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html",
    "https://books.toscrape.com/catalogue/tipping-the-velvet_999/index.html",
    "https://books.toscrape.com/catalogue/forever-and-forever-the-courtship-of-henry-longfellow-and-fanny-appleton_894/index.html",
    "https://books.toscrape.com/catalogue/the-house-by-the-lake_846/index.html"];


(async()=>{
    let bookData =[];
for(let book of books)
{
    const response = await request({
        uri:book,
        headers:{
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
"accept-encoding": "gzip, deflate, br",
"accept-language": "en-US,en;q=0.9"
        },
        gzip:true
    });
    let $ = cheerio.load(response);
    let title=$('#content_inner > article > div.row > div.col-sm-6.product_main > h1').text().trim();
    let price = $('#content_inner > article > div.row > div.col-sm-6.product_main > p.price_color').text().trim();
    let stock = $('#content_inner > article > div.row > div.col-sm-6.product_main > p.instock.availability').text().trim();
  
    bookData.push({
        Title:title,
        Price:price,
        Stock:stock
    });

}

const j2cp = new json2csv();
const csv = j2cp.parse(bookData);
fs.writeFileSync("./book.csv", csv, "utf-8")
})();