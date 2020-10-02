const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const cheerio = require("cheerio");
const { userInfo } = require("os");
const app = express();
const async = require("async");
const { createBrotliCompress } = require("zlib");
const { setFlagsFromString } = require("v8");

app.set(express.static(path.join(__dirname)));
app.use(bodyParser.json());

app.listen("80", () => {
    console.log("READY");
})


function scriptReplacer(htmlDataO, data, url, crawlDir, time, $Main) {
    let htmlData = htmlDataO;
    return new Promise((resolve, reject) => {
    // script Auto-replacer
        const scripts = $Main("script");
        fs.mkdirSync(path.join(crawlDir, time, '/scripts'));
        console.log(`TOTAL Scripts: ${scripts.length}`)

        // script tag ignorance section

        let lstIdxSECA = 0;
        let lstIdxSECB = 0;
        let tagStartPointSEC = [];
        let tagEndPointSEC = [];

        while(true) {
            let searchResSECA = data.indexOf("<!--", lstIdxSECA);
            // console.log(`searchResSECA: ${searchResSECA}`);
            if (searchResSECA == -1) break;
            else {
                tagStartPointSEC.push(searchResSECA);
                lstIdxSECA = searchResSECA+1;
            }
            let searchResSECB = data.indexOf("-->", lstIdxSECB);
            // console.log(`searchResSECB: ${searchResSECB}`);
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
        let ignIdx = [];
        while(true) {
            let searchRESA = data.indexOf("<script", lstIdxA);
            // console.log(`searchRESA: ${searchRESA}`);
            let isPushA = true;
            if (searchRESA == -1) break;
            else {
                tagStartPointSEC.forEach((val, idx) => {
                    if (val<searchRESA && searchRESA <tagEndPointSEC[idx]) {isPushA = false;}
                })
                // console.log(`isPushA: ${isPushA}`);
                if (isPushA) {
                    tagStartPoint.push(searchRESA);
                    // console.log(`IGNORANCE SECTION: NOT INCLUDED [indexNum [${cnt}] || scriptTagCNGREGNum [${tagStartPoint.length-1}]]`)
                } else {
                    console.log(`IGNORANCE SECTION: INCLUDED [indexNum [${cnt}] || scriptTagCNGREGNum [NaN]]`)
                    ignIdx.push(cnt);
                }
                lstIdxA = searchRESA+1;
            }
            let searchRESB = data.indexOf("</script>", lstIdxB);
            // console.log(`searchRESB: ${searchRESB}`);
            let isPushB = true;
            if (searchRESB == -1) break;
            else {
                tagStartPointSEC.forEach((val, idx) => {
                    if (val<searchRESB && searchRESB <tagEndPointSEC[idx]) isPushB = false;
                })
                // console.log(`isPushB: ${isPushB}`);
                if (isPushB) tagEndPoint.push(searchRESB+9); // +8: for get '>' location
                lstIdxB = searchRESB+1;
            }

            if (isPushA && isPushB) cngCont.push(data.substring(searchRESA, searchRESB+9));
            cnt++;
        }

        console.log(ignIdx);

        let scriptEndCnt = 0;

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
            console.log(`Progressing Script Sequence: ${scIdx} || willChange: ${!ignIdx.includes(scIdx)}`);
            // if (!ignIdx.includes(scIdx)) {
                // console.log(htmlData.includes(scriptLocARRS.cngCont[scIdx]));
                htmlData = htmlData.replace(scriptLocARRS.cngCont[scIdx], `<script src="./scripts/script[${scIdx}].js"></script>`);
                // console.log(`<script src="./scripts/script[${scIdx}].js"></script>: ` + htmlData.includes(`<script src="./scripts/script[${scIdx}].js"></script>`));
                // console.log(!htmlData.includes(scriptLocARRS.cngCont[scIdx]) ? `Script Modified: [${scIdx}]` : `Script NOT Modified: [${scIdx}]`);
                scriptEndCnt++;
                console.log(`scriptEndCnt: ${scriptEndCnt}`);
            // } else {
            //     scriptEndCnt++;
            //     console.log(`scriptEndCnt: ${scriptEndCnt}`);
            // }

        }

        let scriptDownloadQueue = [];
        
        function scriptDownload(scriptURL, scIdx, dir, orgDomain, scriptLocARRS) {
            // console.log(`${orgDomain.split("/")[0]}//${baseDMN}${scriptURL}`);
            const baseDMN = orgDomain.split("/")[2];
            // console.log(`${orgDomain.split("/")[0]}//${baseDMN}${stylesheetURL}`);
            let domain;
            // console.log(stylesheetURL.split("/")[0].includes("http"));
            if (scriptURL.split("/")[0].includes("http")) domain = scriptURL;
            else if (scriptURL[0] == "/") domain = `${orgDomain.split("/")[0]}//${baseDMN}${scriptURL}`;
            else domain = `${orgDomain.split("/")[0]}//${baseDMN}/${scriptURL}`;
            let queueInfo = {
                scriptURLinHTML: scriptURL,
                scriptURL: domain,
                scIdx,
                dir,
                orgDomain,
                scriptLocARRS
            };
            scriptDownloadQueue.push(queueInfo);
            // console.log(domain);
            axios.get(domain)
            .then(({data}) => {
                scriptDownloadQueue.splice(scriptDownloadQueue.indexOf(queueInfo), 1);
                try {
                    fs.appendFileSync(path.join(dir, `/scripts/script[${scIdx}].js`), `/*\n\nBase URL: ${scriptURL} || Script sequence: [${scIdx}]\n\n*/\n\n` + data, {encoding: "utf-8"});
                } catch(e) {
                    console.error(`Script Save Error: [${scIdx}]`);
                }
                console.log(`Progressing Script Sequence: ${scIdx} || willChange: ${!ignIdx.includes(scIdx)}`);
                // if (!ignIdx.includes(scIdx)) {
                    // console.log(htmlData.includes(scriptLocARRS.cngCont[scIdx]));
                    htmlData = htmlData.replace(scriptLocARRS.cngCont[scIdx], `<script src="./scripts/script[${scIdx}].js"></script>`);
                    // console.log(`<script src="./scripts/script[${scIdx}].js"></script>: ` + htmlData.includes(`<script src="./scripts/script[${scIdx}].js"></script>`));
                    // console.log(!htmlData.includes(scriptLocARRS.cngCont[scIdx]) ? `Script Modified: [${scIdx}] || DEPENDENCIES TAG` : `Script NOT Modified: [${scIdx}] || DEPENDENCIES TAG`);
                    scriptEndCnt++;
                    console.log(`scriptEndCnt: ${scriptEndCnt}`);
                // } else {
                //     scriptEndCnt++;
                //     console.log(`scriptEndCnt: ${scriptEndCnt}`);
                // }
                
            })
            .catch((e) => {
                scriptEndCnt++;
                console.log(`scriptEndCnt: ${scriptEndCnt}`);
                console.error(`ERR: ${scriptURL} || BASEURL: ${baseDMN} || SEND: ${`${orgDomain.split("/")[0]}://${baseDMN}${scriptURL}`}`)
            });
        }


        for (var idx = 0; idx < scripts.length; idx++) {
            var script = scripts[idx];
            console.log(idx);
            console.log(`${tagStartPoint.length} || ${scripts.length}`);
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

        // cngCont.forEach((value, index) => {
        //     if (htmlData.includes(value)) {
        //         console.log(`Script CHANGE TRY: ${index}`);
        //         htmlData = htmlData.replace(value, `<script src="./scripts/script[${index}].js"></script>`);
        //         console.log(!htmlData.includes(value) ? "SUCCESS" : "FAIED");
        //     }
        // })
    // script Auto-replacer
        endLooper();

        function endLooper() {
            console.log(`Progressing... || Script Download Progressing: ${scriptDownloadQueue.length}`);
            if (scriptEndCnt == scripts.length) {
                resolve(htmlData)
            } else setTimeout(() => {
                endLooper();
            }, 150);
        }
    });
}


function stylesheetReplacer(htmlDataO, data, url, crawlDir, time, $Main) {
    let htmlData = htmlDataO
    return new Promise((resolve, reject) => {
    // stylesheet Auto-replacer
        const stylesheets = $Main("link[rel='stylesheet']");
        fs.mkdirSync(path.join(crawlDir, time, '/stylesheets'));
        console.log(`TOTAL stylesheets: ${stylesheets.length}`)

        // stylesheet tag ignorance section

        let lstIdxSECA = 0;
        let lstIdxSECB = 0;
        let tagStartPointSEC = [];
        let tagEndPointSEC = [];

        while(true) {
            let searchResSECA = data.indexOf("<!--", lstIdxSECA);
            // console.log(`searchResSECA: ${searchResSECA}`);
            if (searchResSECA == -1) break;
            else {
                tagStartPointSEC.push(searchResSECA);
                lstIdxSECA = searchResSECA+1;
            }
            let searchResSECB = data.indexOf("-->", lstIdxSECB);
            // console.log(`searchResSECB: ${searchResSECB}`);
            if (searchResSECB == -1) break;
            else {
                tagEndPointSEC.push(searchResSECB+3);
                lstIdxSECB = searchResSECB+1;
            }
        }

        // console.log(tagStartPointSEC);
        // console.log(tagEndPointSEC);

        // stylesheet tag location find
        let lstIdxA = 0;
        let tagStartPoint = [];
        let tagEndPoint = [];
        let cngCont = [];
        let cnt = 0;
        let ignIdx = [];
        while(true) {
            let searchRESA = data.indexOf("<link", lstIdxA);
            lstIdxA = searchRESA+5;
            let searchRESB = data.indexOf(">", lstIdxA);
            let isPushA = true;
            let isPushB = true;
            // console.log(`searchRESA: ${searchRESA}`);
            // console.log(`searchRESB: ${searchRESB}`);
            
            if (searchRESA == -1) break;
            let relInfo = data.indexOf("rel=", searchRESA);
            if (relInfo > searchRESB) continue;
            else if (data.substr(relInfo+5,3) != "sty") {
                console.log(data.substr(relInfo+5,3));
                continue;
            }
            else {
                tagStartPointSEC.forEach((val, idx) => {
                    // console.log(val<searchRESA && searchRESA <tagEndPointSEC[idx]);
                    // console.log(val<searchRESB && searchRESB <tagEndPointSEC[idx]);
                    if (val<searchRESA && searchRESA <tagEndPointSEC[idx]) isPushA = false;
                    if (val<searchRESB && searchRESB <tagEndPointSEC[idx]) isPushB = false;
                })
                // console.log(`isPushA: ${isPushA}`);
                if (isPushA) {
                    tagStartPoint.push(searchRESA);
                    // console.log(`IGNORANCE SECTION: NOT INCLUDED [indexNum [${cnt}] || stylesheetTagCNGREGNum [${tagStartPoint.length-1}]]`)
                } else {
                    console.log(`IGNORANCE SECTION: INCLUDED [indexNum [${cnt}] || stylesheetTagCNGREGNum [NaN]]`)
                    ignIdx.push(cnt);
                }
                
                // console.log(`isPushB: ${isPushB}`);
                if (isPushB) tagEndPoint.push(searchRESB); // +8: for get '>' location
                if (isPushA && isPushB) cngCont.push(data.substring(searchRESA, searchRESB));
                cnt++;
            }
        }

        console.log(ignIdx);
        console.log(tagStartPoint);

        let stylesheetEndCnt = 0;

        function stylesheetSave(stylesheetObj, scIdx, dir, stylesheetLocARRS) {
            let cont = "";
            stylesheetObj.children.forEach((val, idx) => {
                if (val.type == "text") (cont =="") ? (cont += val.data) : (cont += "\n" + val.data);
                else console.log(val);
            })
            try {
                fs.writeFileSync(path.join(dir, `/stylesheets/stylesheet[${scIdx}].css`), `/*\n\nHTML-WRITTEN FILE || stylesheet sequence: [${scIdx}]\n\n*/\n\n` + cont, {encoding: "utf-8"});
            } catch(e) {
                console.error(`stylesheet Save Error: [${scIdx}]`);
            }
            console.log(`Progressing stylesheet Sequence: ${scIdx} || willChange: ${!ignIdx.includes(scIdx)}`);
            // if (!ignIdx.includes(scIdx)) {
                // console.log(htmlData.includes(stylesheetLocARRS.cngCont[scIdx]));
                htmlData = htmlData.replace(stylesheetLocARRS.cngCont[scIdx], `<link rel="stylesheet" href="./stylesheets/stylesheet[${scIdx}].js"/>`);
                // console.log(`<stylesheet src="./stylesheets/stylesheet[${scIdx}].js"></stylesheet>: ` + htmlData.includes(`<stylesheet src="./stylesheets/stylesheet[${scIdx}].js"></stylesheet>`));
                // console.log(!htmlData.includes(stylesheetLocARRS.cngCont[scIdx]) ? `stylesheet Modified: [${scIdx}]` : `stylesheet NOT Modified: [${scIdx}]`);
                stylesheetEndCnt++;
                console.log(`stylesheetEndCnt: ${stylesheetEndCnt}`);
            // } else {
            //     stylesheetEndCnt++;
            //     console.log(`stylesheetEndCnt: ${stylesheetEndCnt}`);
            // }

        }
        
        function stylesheetDownload(stylesheetURL, scIdx, dir, orgDomain, stylesheetLocARRS, filename) {
            const baseDMN = orgDomain.split("/")[2];
            // console.log(`${orgDomain.split("/")[0]}//${baseDMN}${stylesheetURL}`);
            let domain;
            let locExtSpliter = stylesheetURL.split("/");
            // console.log(stylesheetURL.split("/")[0].includes("http"));
            let saveLoc;
            // console.log(saveLoc);
            if (stylesheetURL.split("/")[0].includes("http")) {
                domain = stylesheetURL;
                saveLoc = stylesheetURL.replace(locExtSpliter[locExtSpliter.length-1], "");                
            } else if (stylesheetURL[0] == "/") {
                domain = `${orgDomain.split("/")[0]}//${baseDMN}${stylesheetURL}`;
                saveLoc = stylesheetURL.replace(locExtSpliter[locExtSpliter.length-1], "");
            } else {
                domain = `${orgDomain.split("/")[0]}//${baseDMN}/${stylesheetURL}`;
                saveLoc = stylesheetURL.replace(locExtSpliter[locExtSpliter.length-1], "");
            }
            // console.log(`splited: ${stylesheetURL} --> ${saveLoc}`);
            // console.log(domain);
            axios.get(domain)
            .then((dataB) => {
                let data = dataB.data;
                // console.log(data);
                const realSaveLoc = path.join(dir, `/stylesheets`, (saveLoc[saveLoc.length-1] == "/" ? saveLoc.slice(0, -1) : saveLoc));
                
                // check @import

                let importFIdx = 0;

                while(true) {
                    let searchRes = data.indexOf("@import", importFIdx);
                    let searchResSP = data.indexOf("\'", searchRes+7);
                    let searchResEP = data.indexOf("\'", searchRes+9);
                    if(searchRes == -1) break;
                    else {
                        let urlExt = data.slice(searchResSP+1, searchResEP);
                        let importStylesheetURL = path.join(stylesheetURL, urlExt);
                        importFIdx = searchRes+9;
                        // console.log(orgDomain.split("/")[0]);
                        let importLocExtSpliter = importStylesheetURL.split("/");
                        stylesheetDownload(importStylesheetURL[0] == "/" ? importStylesheetURL : "/" + importStylesheetURL, scIdx, path.join(dir, `/stylesheets`, (importLocExtSpliter.pop() == "/" ? importStylesheetURL.replace(importLocExtSpliter.pop(), "") : importLocExtSpliter)), orgDomain, stylesheetLocARRS, urlExt.split("/").pop());
                        // data.replace(data.slice(searchRes, searchResEP), `@import '${}'`)
                    }
                }

                // console.log(importLoc);

                // check @import

                try {
                    console.log(!fs.existsSync(realSaveLoc));
                    if (!fs.existsSync(realSaveLoc)) {
                        // console.log(`make new directory: ${realSaveLoc}`);
                        // fs.mkdirSync(realSaveLoc);
                        let stbLoc = realSaveLoc.split("/");
                        let extLoc = "";
                        stbLoc.forEach((val, idx) => {
                            if (idx != 0) {
                                extLoc += "/" + val;
                                // console.log(`${scIdx}: check Location Existence [${extLoc}]`)
                                if (!fs.existsSync(extLoc)) fs.mkdirSync(extLoc);
                            }
                        })
                        console.log(`make new directory: ${fs.existsSync(realSaveLoc) ? "success" : "failed"}`);
                    }
                    setTimeout(() => {
                        console.log(`stylesheet: [${scIdx}] save route: ${realSaveLoc}`);
                        fs.appendFileSync(path.join(realSaveLoc, `${filename ? filename : `/stylesheet_typeA[${scIdx}].css`}`), `/*\n\nBase URL: ${stylesheetURL} || stylesheet sequence: [${scIdx}]\n\n*/\n\n` + data, {encoding: "utf-8"});
                    }, 100);
                } catch(e) {
                    console.error(`stylesheet Save Error: [${scIdx}] - ${e}`);
                }
                console.log(`Progressing stylesheet Sequence: ${scIdx} || willChange: ${!ignIdx.includes(scIdx)}`);
                // if (!ignIdx.includes(scIdx)) {
                    // console.log(htmlData.includes(stylesheetLocARRS.cngCont[scIdx]));
                    if (!filename) htmlData = htmlData.replace(stylesheetLocARRS.cngCont[scIdx], `<link rel="stylesheet" href=".${path.join("/stylesheets/", saveLoc)}/stylesheet_typeA[${scIdx}].css"/>`);
                    // console.log(`<stylesheet src="./stylesheets/stylesheet[${scIdx}].js"></stylesheet>: ` + htmlData.includes(`<stylesheet src="./stylesheets/stylesheet[${scIdx}].js"></stylesheet>`));
                    // console.log(!htmlData.includes(stylesheetLocARRS.cngCont[scIdx]) ? `stylesheet Modified: [${scIdx}] || DEPENDENCIES TAG` : `stylesheet NOT Modified: [${scIdx}] || DEPENDENCIES TAG`);
                    stylesheetEndCnt++;
                    console.log(`stylesheetEndCnt: ${stylesheetEndCnt}`);
                // } else {
                //     stylesheetEndCnt++;
                //     console.log(`stylesheetEndCnt: ${stylesheetEndCnt}`);
                // }

            })
            .catch((e) => {
                stylesheetEndCnt++;
                console.log(`stylesheetEndCnt: ${stylesheetEndCnt}`);
                console.error(`ERR: ${stylesheetURL} || BASEURL: ${baseDMN} || SEND: ${`${orgDomain.split("/")[0]}//${baseDMN}${stylesheetURL}`} ==> ${e}`)
            });
        }


        for (var idx = 0; idx < tagStartPoint.length; idx++) {
            console.log(idx);
            var stylesheet = stylesheets[idx];
            if (!stylesheet.attribs.href) {
                // text stylesheet
                stylesheetSave(stylesheet, idx, path.join(crawlDir, time), {tagStartPoint, tagEndPoint, cngCont});
            } else {
                // dependencies stylesheet
                stylesheetDownload(stylesheet.attribs.href, idx, path.join(crawlDir, time), url, {tagStartPoint, tagEndPoint, cngCont});
            }
            // const start = $Main('stylesheet').get(idx).startIndex;
            // const lineNumber = data.substr(0, start).split('\n').length;
            // console.log(lineNumber)
        }
    // stylesheet Auto-replacer

        endLooper();

        function endLooper() {
            console.log(`..? || ${stylesheetEndCnt} / ${stylesheets.length}`);
            if (stylesheetEndCnt >= stylesheets.length) {
                console.log("resolve");
                resolve(htmlData)
            } else setTimeout(() => {
                endLooper();
            }, 150);
        }
    });
}


function resourceReplacer(htmlDataO, data, url, crawlDir, time, $Main) {
    let htmlData = htmlDataO
    return new Promise((resolve, reject) => {
    // stylesheet Auto-replacer
        const stylesheets = $Main("link[rel='stylesheet']");
        fs.mkdirSync(path.join(crawlDir, time, '/stylesheets'));
        console.log(`TOTAL stylesheets: ${stylesheets.length}`)

        // stylesheet tag ignorance section

        let lstIdxSECA = 0;
        let lstIdxSECB = 0;
        let tagStartPointSEC = [];
        let tagEndPointSEC = [];

        while(true) {
            let searchResSECA = data.indexOf("<!--", lstIdxSECA);
            // console.log(`searchResSECA: ${searchResSECA}`);
            if (searchResSECA == -1) break;
            else {
                tagStartPointSEC.push(searchResSECA);
                lstIdxSECA = searchResSECA+1;
            }
            let searchResSECB = data.indexOf("-->", lstIdxSECB);
            // console.log(`searchResSECB: ${searchResSECB}`);
            if (searchResSECB == -1) break;
            else {
                tagEndPointSEC.push(searchResSECB+3);
                lstIdxSECB = searchResSECB+1;
            }
        }

        // console.log(tagStartPointSEC);
        // console.log(tagEndPointSEC);

        // stylesheet tag location find
        let lstIdxA = 0;
        let tagStartPoint = [];
        let tagEndPoint = [];
        let cngCont = [];
        let cnt = 0;
        let ignIdx = [];
        while(true) {
            let searchRESA = data.indexOf("<link", lstIdxA);
            lstIdxA = searchRESA+5;
            let searchRESB = data.indexOf(">", lstIdxA);
            let isPushA = true;
            let isPushB = true;
            // console.log(`searchRESA: ${searchRESA}`);
            // console.log(`searchRESB: ${searchRESB}`);
            
            if (searchRESA == -1) break;
            let relInfo = data.indexOf("rel=", searchRESA);
            if (relInfo > searchRESB) continue;
            else if (data.substr(relInfo+5,3) != "sty") {
                console.log(data.substr(relInfo+5,3));
                continue;
            } else {
                tagStartPointSEC.forEach((val, idx) => {
                    // console.log(val<searchRESA && searchRESA <tagEndPointSEC[idx]);
                    // console.log(val<searchRESB && searchRESB <tagEndPointSEC[idx]);
                    if (val<searchRESA && searchRESA <tagEndPointSEC[idx]) isPushA = false;
                    if (val<searchRESB && searchRESB <tagEndPointSEC[idx]) isPushB = false;
                })
                // console.log(`isPushA: ${isPushA}`);
                if (isPushA) {
                    tagStartPoint.push(searchRESA);
                    // console.log(`IGNORANCE SECTION: NOT INCLUDED [indexNum [${cnt}] || stylesheetTagCNGREGNum [${tagStartPoint.length-1}]]`)
                } else {
                    console.log(`IGNORANCE SECTION: INCLUDED [indexNum [${cnt}] || stylesheetTagCNGREGNum [NaN]]`)
                    ignIdx.push(cnt);
                }
                
                // console.log(`isPushB: ${isPushB}`);
                if (isPushB) tagEndPoint.push(searchRESB); // +8: for get '>' location
                if (isPushA && isPushB) cngCont.push(data.substring(searchRESA, searchRESB));
                cnt++;
            }
        }

        console.log(ignIdx);
        console.log(tagStartPoint);

        let stylesheetEndCnt = 0;

        function stylesheetSave(stylesheetObj, scIdx, dir, stylesheetLocARRS) {
            let cont = "";
            stylesheetObj.children.forEach((val, idx) => {
                if (val.type == "text") (cont == "") ? (cont += val.data) : (cont += "\n" + val.data);
                else console.log(val);
            })
            try {
                fs.writeFileSync(path.join(dir, `/stylesheets/stylesheet[${scIdx}].css`), `/*\n\nHTML-WRITTEN FILE || stylesheet sequence: [${scIdx}]\n\n*/\n\n` + cont, {encoding: "utf-8"});
            } catch(e) {
                console.error(`stylesheet Save Error: [${scIdx}]`);
            }
            console.log(`Progressing stylesheet Sequence: ${scIdx} || willChange: ${!ignIdx.includes(scIdx)}`);
            // if (!ignIdx.includes(scIdx)) {
                // console.log(htmlData.includes(stylesheetLocARRS.cngCont[scIdx]));
                htmlData = htmlData.replace(stylesheetLocARRS.cngCont[scIdx], `<link rel="stylesheet" href="./stylesheets/stylesheet[${scIdx}].js"/>`);
                // console.log(`<stylesheet src="./stylesheets/stylesheet[${scIdx}].js"></stylesheet>: ` + htmlData.includes(`<stylesheet src="./stylesheets/stylesheet[${scIdx}].js"></stylesheet>`));
                // console.log(!htmlData.includes(stylesheetLocARRS.cngCont[scIdx]) ? `stylesheet Modified: [${scIdx}]` : `stylesheet NOT Modified: [${scIdx}]`);
                stylesheetEndCnt++;
                console.log(`stylesheetEndCnt: ${stylesheetEndCnt}`);
            // } else {
            //     stylesheetEndCnt++;
            //     console.log(`stylesheetEndCnt: ${stylesheetEndCnt}`);
            // }

        }
        
        function stylesheetDownload(stylesheetURL, scIdx, dir, orgDomain, stylesheetLocARRS) {
            const baseDMN = orgDomain.split("/")[2];
            // console.log(`${orgDomain.split("/")[0]}//${baseDMN}${stylesheetURL}`);
            let domain;
            // console.log(stylesheetURL.split("/")[0].includes("http"));
            if (stylesheetURL.split("/")[0].includes("http")) domain = stylesheetURL;
            else if (stylesheetURL[0] == "/") domain = `${orgDomain.split("/")[0]}//${baseDMN}${stylesheetURL}`;
            else domain = `${orgDomain.split("/")[0]}//${baseDMN}/${stylesheetURL}`;
            // console.log(domain);
            axios.get(domain)
            .then(({data}) => {
                // console.log(data);
                try {
                    fs.appendFileSync(path.join(dir, `/stylesheets/stylesheet_typeA[${scIdx}].css`), `/*\n\nBase URL: ${stylesheetURL} || stylesheet sequence: [${scIdx}]\n\n*/\n\n` + data, {encoding: "utf-8"});
                } catch(e) {
                    console.error(`stylesheet Save Error: [${scIdx}]`);
                }
                console.log(`Progressing stylesheet Sequence: ${scIdx} || willChange: ${!ignIdx.includes(scIdx)}`);
                // if (!ignIdx.includes(scIdx)) {
                    // console.log(htmlData.includes(stylesheetLocARRS.cngCont[scIdx]));
                    htmlData = htmlData.replace(stylesheetLocARRS.cngCont[scIdx], `<link rel="stylesheet" href="./stylesheets/stylesheet_typeA[${scIdx}].css"/>`);
                    // console.log(`<stylesheet src="./stylesheets/stylesheet[${scIdx}].js"></stylesheet>: ` + htmlData.includes(`<stylesheet src="./stylesheets/stylesheet[${scIdx}].js"></stylesheet>`));
                    // console.log(!htmlData.includes(stylesheetLocARRS.cngCont[scIdx]) ? `stylesheet Modified: [${scIdx}] || DEPENDENCIES TAG` : `stylesheet NOT Modified: [${scIdx}] || DEPENDENCIES TAG`);
                    stylesheetEndCnt++;
                    console.log(`stylesheetEndCnt: ${stylesheetEndCnt}`);
                // } else {
                //     stylesheetEndCnt++;
                //     console.log(`stylesheetEndCnt: ${stylesheetEndCnt}`);
                // }

            })
            .catch((e) => {
                stylesheetEndCnt++;
                console.log(`stylesheetEndCnt: ${stylesheetEndCnt}`);
                console.error(`ERR: ${stylesheetURL} || BASEURL: ${baseDMN} || SEND: ${`${orgDomain.split("/")[0]}://${baseDMN}${stylesheetURL}`}`)
            });
        }


        for (var idx = 0; idx < tagStartPoint.length; idx++) {
            console.log(idx);
            var stylesheet = stylesheets[idx];
            if (!stylesheet.attribs.href) {
                // text stylesheet
                stylesheetSave(stylesheet, idx, path.join(crawlDir, time), {tagStartPoint, tagEndPoint, cngCont});
            } else {
                // dependencies stylesheet
                stylesheetDownload(stylesheet.attribs.href, idx, path.join(crawlDir, time), url, {tagStartPoint, tagEndPoint, cngCont});
            }
            // const start = $Main('stylesheet').get(idx).startIndex;
            // const lineNumber = data.substr(0, start).split('\n').length;
            // console.log(lineNumber)
        }
    // stylesheet Auto-replacer

        endLooper();

        function endLooper() {
            console.log(`..? || ${stylesheetEndCnt} / ${stylesheets.length}`);
            if (stylesheetEndCnt == stylesheets.length) {
                console.log("resolve");
                resolve(htmlData)
            } else setTimeout(() => {
                endLooper();
            }, 150);
        }
    });
}





function getter(urlB) {
    const url = urlB[urlB.length-1] == "/" ? urlB.substr(0, urlB.length-1) : urlB;
    if (!url | typeof url != "string") return new Error("params error");
    axios.get(url)
    .then(async ({data}) => {
        let htmlData = data;
        const crawlDir = path.join(__dirname, "../", "crawl");
        const time = Date.now().toString();
        fs.mkdirSync(path.join(crawlDir, time));
        const filename = url.split("/")[url.split("/").length-1];
        console.log(`filename: ${filename}`);
        console.log(`url: ${url}`);
        console.log(`urlSplited: ${url.split("/")}`);
        console.log(fs.existsSync(path.join(crawlDir, time)));
        const $Main = cheerio.load(data, {withStartIndices: true});

        async.waterfall([
            (cb) => {
                scriptReplacer(htmlData, data, url, crawlDir, time, $Main)
                .then((htmlDataCNG) => cb(null, htmlDataCNG))
                .catch(e => cb(e));
            },
            (htmlDataC, cb) => {
                stylesheetReplacer(htmlDataC, data, url, crawlDir, time, $Main)
                .then((htmlDataCNG) => cb(null, htmlDataCNG))
                .catch(e => cb(e));
            }
            // (htmlDataC, cb) => {
            //     resourceReplacer(htmlDataC, data, url, crawlDir, time, $Main)
            //     .then((htmlDataCNG) => cb(null, htmlDataCNG))
            //     .catch(e => cb(e));
            // }
        ], (err, htmlDataC) => {
            if (err) throw err;
            fs.writeFileSync(path.join(crawlDir, time, `/${filename}.html`), htmlDataC, {encoding: 'utf-8'});
            fs.writeFileSync(path.join(crawlDir, time, `/${filename}_ORG.html`), data, {encoding: 'utf-8'});
        })

        // scriptReplacer(htmlData, data, url, crawlDir, time, $Main)
        // .then((htmlDataA) => {
        //     stylesheetAReplacer(htmlDataA, data, url, crawlDir, time, $Main)
        //     .then((htmlDataB) => {
        //     })
        // })

        
        // endLooper();

        // function endLooper() {
        //     console.log("..");
        //     if (scriptEndCnt == scripts.length) {
        //     } else setTimeout(() => {
        //         endLooper();
        //     }, 150);
        // }

    })
    .catch((e) => {throw e});
}

app.get("/", (req, res) => (res.sendFile(__dirname + "/index.html")))
app.get("/siteData", (req, res) => (res.sendFile(__dirname + "/" + req.query.url + ".html")))
app.post("/getData", (req, res) => {
    getter(req.body.url);
    res.end();
})

