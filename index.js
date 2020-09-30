const path = require("path");
const fs = require("fs");
const cheerio = require("cheerio");
const axios = require("axios");

getter("https://comic.naver.com/index.nhn");

function getter(url) {
    if (!url | typeof url != "string") return new Error("params error");
    axios.get(url)
    .then(({data}) => {
        fs.appendFileSync("test.html", data, {encoding: 'utf-8'});
    })
}