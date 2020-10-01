const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const cheerio = require("cheerio");
const app = express();

app.set(express.static(path.join(__dirname)));
app.use(bodyParser.json());

app.listen("80", () => {
    console.log("READY");
})

function getter(url) {
    if (!url | typeof url != "string") return new Error("params error");
    axios.get(url)
    .then(({data}) => {
        let htmlData = data;
        const crawlDir = path.join(__dirname, "../", "crawl");
        const time = Date.now().toString();
        fs.mkdirSync(path.join(crawlDir, time));
        const filename = url.split("/")[url.split("/").length-1];
        console.log(filename);
        console.log(fs.existsSync(path.join(crawlDir, time)));
        const $Main = cheerio.load(data, {withStartIndices: true});
        $Main.prototype.logHTML = function() {
            console.log(this.html());
        }
        const scripts = $Main("script");
        // scripts.logHTML();
        fs.mkdirSync(path.join(crawlDir, time, '/scripts'));
        console.log(`TOTAL Scripts: ${scripts.length}`)

        // script tag ignorance section

        let lstIdxSECA = 0;
        let lstIdxSECB = 0;
        let tagStartPointSEC = [];
        let tagEndPointSEC = [];

        while(true) {
            let searchResSECA = data.indexOf("<!--", lstIdxSECA);
            console.log(`searchResSECA: ${searchResSECA}`);
            if (searchResSECA == -1) break;
            else {
                tagStartPointSEC.push(searchResSECA);
                lstIdxSECA = searchResSECA+1;
            }
            let searchResSECB = data.indexOf("-->", lstIdxSECB);
            console.log(`searchResSECB: ${searchResSECB}`);
            if (searchResSECB == -1) break;
            else {
                tagEndPointSEC.push(searchResSECB+3);
                lstIdxSECB = searchResSECB+1;
            }
        }

        console.log(tagStartPointSEC.length);
        console.log(tagEndPointSEC.length);

        // script tag location find
        let lstIdxA = 0;
        let lstIdxB = 0;
        let tagStartPoint = [];
        let tagEndPoint = [];
        let cngCont = [];
        let cnt = 0;
        while(true) {
            let searchRESA = data.indexOf("<script", lstIdxA);
            // console.log(`searchRESA: ${searchRESA}`);
            if (searchRESA == -1) break;
            else {
                let isPushA = true;
                tagStartPointSEC.forEach((val, idx) => {
                    if (val<searchRESA && searchRESA <tagEndPointSEC[idx]) {isPushA = false;}
                })
                console.log(`isPushB: ${isPushA}`);
                if (isPushA) {
                    tagStartPoint.push(searchRESA);
                    console.log(`IGNORANCE SECTION: NOT INCLUDED [indexNum [${cnt}] || scriptTagCNGREGNum [${tagStartPoint.length-1}]]`)
                } else console.log(`IGNORANCE SECTION: INCLUDED [indexNum [${cnt}] || scriptTagCNGREGNum [NaN]]`)
                lstIdxA = searchRESA+1;
            }
            let searchRESB = data.indexOf("</script>", lstIdxB);
            // console.log(`searchRESB: ${searchRESB}`);
            if (searchRESB == -1) break;
            else {
                let isPushB = true;
                tagStartPointSEC.forEach((val, idx) => {
                    if (val<searchRESB && searchRESB <tagEndPointSEC[idx]) isPushB = false;
                })
                console.log(`isPushB: ${isPushB}`);
                if (isPushB) tagEndPoint.push(searchRESB+9); // +8: for get '>' location
                lstIdxB = searchRESB+1;
            }
            cngCont.push(data.substring(searchRESA, searchRESB+9));
            cnt++;
        }

        console.log(cngCont);

        function scriptSave(scriptObj, scIdx, dir, scriptLocARRS) {
            let cont = "";
            scriptObj.children.forEach((val, idx) => {
                if (val.type == "text") (cont =="") ? (cont += val.data) : (cont += "\n" + val.data);
                else console.log(val);
            })
            try {
                fs.writeFileSync(path.join(dir, `/scripts/script[${scIdx}].js`), `/*\n\nHTML-WRITTEN FILE || Script sequence: [${scIdx}]\n\n*/\n\n` + cont, {encoding: "utf-8"});
            } catch(e) {
                console.error(`Script Save Error: [${scIdx}]`);
            }
            console.log(htmlData.includes(scriptLocARRS.cngCont[scIdx]));
            htmlData = htmlData.replace(scriptLocARRS.cngCont[scIdx], `<script src="./scripts/script[${scIdx}].js"></script>`);
            console.log(!htmlData.includes(scriptLocARRS.cngCont[scIdx]) ? `Script Modified: [${scIdx}]` : `Script NOT Modified: [${scIdx}]`);
        }
        
        function scriptDownload(scriptURL, scIdx, dir, orgDomain, scriptLocARRS) {
            const baseDMN = orgDomain.split("/")[2];
            console.log(`${orgDomain.split("/")[0]}//${baseDMN}${scriptURL}`);
            if (scriptURL[0] == "/") axios.get(`${orgDomain.split("/")[0]}//${baseDMN}${scriptURL}`)
            .then(({data}) => {
                try {
                    fs.appendFileSync(path.join(dir, `/scripts/script[${scIdx}].js`), `/*\n\nBase URL: ${scriptURL} || Script sequence: [${scIdx}]\n\n*/\n\n` + data, {encoding: "utf-8"});
                } catch(e) {
                    console.error(`Script Save Error: [${scIdx}]`);
                }
                console.log(htmlData.includes(scriptLocARRS.cngCont[scIdx]));
                htmlData = htmlData.replace(scriptLocARRS.cngCont[scIdx], `<script src="./scripts/script[${scIdx}].js"></script>`);
                console.log(!htmlData.includes(scriptLocARRS.cngCont[scIdx]) ? `Script Modified: [${scIdx}] || DEPENDENCIES TAG` : `Script NOT Modified: [${scIdx}] || DEPENDENCIES TAG`);
            })
            .catch((e) => {console.error(`ERR: ${scriptURL} || BASEURL: ${baseDMN} || SEND: ${`${orgDomain.split("/")[0]}://${baseDMN}${scriptURL}`}`)});
        }


        for (var idx = 0; idx < scripts.length; idx++) {
            var script = scripts[idx];
            if (!script.attribs.src) {
                // text script
                scriptSave(script, idx, path.join(crawlDir, time), {tagStartPoint, tagEndPoint, cngCont});
            } else {
                // dependencies script
                scriptDownload(script.attribs.src, idx, path.join(crawlDir, time), url, {tagStartPoint, tagEndPoint, cngCont});
            }
            // const start = $Main('script').get(idx).startIndex;
            // const lineNumber = data.substr(0, start).split('\n').length;
            // console.log(lineNumber)
        }

        // console.log("type: " + typeof data);

        // console.log(tagStartPoint);
        // console.log(tagEndPoint);

        cngCont.forEach((value, index) => {
            if (htmlData.includes(value)) {
                console.log(`Script CHANGE TRY: ${index}`);
                htmlData = htmlData.replace(value, `<script src="./scripts/script[${index}].js"></script>`);
                console.log(!htmlData.includes(value) ? "SUCCESS" : "FAIED");
            }
        })
        fs.writeFileSync(path.join(crawlDir, time, `/${filename}.html`), htmlData, {encoding: 'utf-8'});
        fs.writeFileSync(path.join(crawlDir, time, `/${filename}_ORG.html`), data, {encoding: 'utf-8'});

    })
}

app.get("/", (req, res) => (res.sendFile(__dirname + "/index.html")))
app.get("/siteData", (req, res) => (res.sendFile(__dirname + "/" + req.query.url + ".html")))
app.post("/getData", (req, res) => {
    getter(req.body.url);
    res.end();
})

