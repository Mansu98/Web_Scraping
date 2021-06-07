const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const json2csv = require("json2csv").Parser;

const movies =[
    "https://m.imdb.com/title/tt4154796/?ref_=ttls_li_tt",
    "https://m.imdb.com/title/tt4154756/?ref_=tt_sims_tt_i_1",
    "https://m.imdb.com/title/tt3501632/?ref_=tt_sims_tt_i_3",
    "https://m.imdb.com/title/tt3498820/?ref_=tt_sims_tt_i_1"
];

(async()=>{

    let imdbData =[];
    for (let movie of movies)
    {
        const response = await request({
            uri:movie,
            headers:{
                accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
               "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9"
            },
            gzip:true
        });
   
    
    let $ = cheerio.load(response);
    let title=$('div[class="TitleBlock__TitleContainer-sc-1nlhx7j-1 jxsVNt"] > h1').text();
    let rating = $('div[class="AggregateRatingButton__Rating-sc-1il8omz-2 ckpPOV"] > span').text();
    let summary = $('div[class="GenresAndPlot__TextContainerBreakpointXS-cum89p-0 GxFuV"]').text();
  
    imdbData.push({
        title:title,
        rating:rating,
        summary:summary
    });
}

const j2cp = new json2csv();
const csv = j2cp.parse(imdbData);
fs.writeFileSync("./imdb.csv", csv, "utf-8")
})();

