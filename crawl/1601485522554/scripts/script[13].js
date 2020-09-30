(function(exportTarget){var lcs_options={nnb:true};var lcs_version="v0.7.3";var lcs_add={};var lcs_bc={};var lcs_perf={};var lcs_do_count=0;var lcs_do_retry_count=0;var lcs_waiting_pageshow=false;function lcs_do(etc){if(lcs_waiting_pageshow){return}var retry=function(__etc){return function(){window.setTimeout(function(){lcs_waiting_pageshow=false;lcs_do(__etc)},10)}}(etc);if(document.readyState!=="complete"){var eventName="onpageshow" in window?"pageshow":"load";if(document.addEventListener){window.addEventListener(eventName,retry,false)}else{window.attachEvent("on"+eventName,retry)}lcs_do_retry_count++;lcs_waiting_pageshow=true;return}if(!window.lcs_SerName){window.lcs_SerName="lcs.naver.com"}var rs="";var index;var itarVal;var doc=document;var wlt=window.location;var lcsServerAddr;try{lcsServerAddr=(wlt.protocol?wlt.protocol:"http:")+"//"+window.lcs_SerName+"/m?"}catch(e){return}try{rs=lcsServerAddr+"u="+encodeURIComponent(wlt.href)+"&e="+(doc.referrer?encodeURIComponent(doc.referrer):"")}catch(e){}try{if(typeof lcs_add.i=="undefined"){lcs_add.i=""}if(lcs_do_count<1){lcs_setBrowserCapa();if(lcs_options.nnb){lcs_setNNB()}lcs_add.ct=lcs_getConnectType();lcs_setNavigationTiming();var loadEventStart=lcs_perf.loadEventStart||0;var loadEventEnd=lcs_perf.loadEventEnd||0;if(loadEventEnd<loadEventStart&&lcs_do_retry_count<3){lcs_do_retry_count++;lcs_waiting_pageshow=true;retry();return}lcs_setPaintTiming();lcs_setNavigationType()}for(index in lcs_bc){if(typeof lcs_bc[index]!=="function"){rs+="&"+index+"="+encodeURIComponent(lcs_bc[index])}}for(index in lcs_add){itarVal=lcs_add[index];if(itarVal!==undefined&&typeof itarVal!=="function"){rs+="&"+index+"="+encodeURIComponent(itarVal)}}if(lcs_do_count<1){for(index in lcs_perf){itarVal=lcs_perf[index];if(itarVal){rs+="&"+index+"="+encodeURIComponent(itarVal)}}}for(index in etc){if((index.length>=3&&typeof etc[index]!=="function")||index==="qy"){rs+="&"+index+"="+encodeURIComponent(etc[index])}}if(!!etc===false||!!etc.pid===false){var pidFallback;if(window.g_pid){pidFallback=g_pid}else{pidFallback=lcs_get_lpid()}rs+="&pid="+encodeURIComponent(pidFallback)}var timeStr=new Date().getTime();rs+="&ts="+timeStr;rs+="&EOU";var obj=document.createElement("img");obj.src=rs;obj.onload=function(){obj.onload=null;return};lcs_do_count++}catch(e){return}}function lcs_do_gdid(gdid,etc){try{if(gdid){lcs_add.i=gdid;if(etc){lcs_do(etc)}else{lcs_do()}}}catch(e){}}function getLocalStorage(){var localStorage=null;try{localStorage=window.localStorage}catch(e){}try{if(!localStorage){localStorage=window.sessionStorage}}catch(e){}return localStorage||null}function lcs_setNNB(){try{var lsg=getLocalStorage();if(lsg){if(lsg.ls){var lc=lsg.ls;if(lc.length==13){lcs_add.ls=lc;return}}var nnb=lcs_getNNBfromCookie();if(nnb!=null&&nnb!=""){lsg.ls=nnb;lcs_add.ls=nnb}}}catch(e){}}function lcs_setBrowserCapa(){lcs_bc.os=lcs_getOS();lcs_bc.ln=lcs_getlanguage();lcs_bc.sr=lcs_getScreen();lcs_bc.pr=window.devicePixelRatio||1;var windowSize=lcs_getWindowSize();lcs_bc.bw=windowSize.bw;lcs_bc.bh=windowSize.bh;lcs_bc.c=lcs_getColorDepth();lcs_bc.j=lcs_getJavaEnabled();lcs_bc.k=lcs_getCookieEnabled()}function lcs_getOS(){var lcs_os="";try{navigator.platform?(lcs_os=navigator.platform):""}catch(e){}return lcs_os}function lcs_getlanguage(){var lcs_ln="";try{navigator.userLanguage?(lcs_ln=navigator.userLanguage):navigator.language?(lcs_ln=navigator.language):""}catch(e){}return lcs_ln}function lcs_getScreen(){var lcs_sr="";try{if(window.screen&&screen.width&&screen.height){lcs_sr=screen.width+"x"+screen.height}else{if(window.java||self.java){var sr=java.awt.Toolkit.getDefaultToolkit().getScreenSize();lcs_sr=sr.width+"x"+sr.height}}}catch(e){lcs_sr=""}return lcs_sr}function lcs_getWindowSize(){var doc=document;var size={bw:"",bh:""};try{size.bw=doc.documentElement.clientWidth?doc.documentElement.clientWidth:doc.body.clientWidth;size.bh=doc.documentElement.clientHeight?doc.documentElement.clientHeight:doc.body.clientHeight}catch(e){}return size}function lcs_getColorDepth(){var colorDepth="";try{if(window.screen){colorDepth=screen.colorDepth?screen.colorDepth:screen.pixelDepth}else{if(window.java||self.java){var c=java.awt.Toolkit.getDefaultToolkit().getColorModel().getPixelSize();colorDepth=c}}}catch(e){colorDepth=""}return colorDepth}function lcs_getJavaEnabled(){var jsEnable="";try{jsEnable=navigator.javaEnabled()?"Y":"N"}catch(e){}return jsEnable}function lcs_getCookieEnabled(){var cookieEnable="";try{cookieEnable=navigator.cookieEnabled?"Y":"N"}catch(e){}return cookieEnable}function lcs_getNNBfromCookie(){try{var ck=document.cookie;var k,v,i,ArrCookies=ck.split(";");for(i=0;i<ArrCookies.length;i++){k=ArrCookies[i].substr(0,ArrCookies[i].indexOf("="));v=ArrCookies[i].substr(ArrCookies[i].indexOf("=")+1);k=k.replace(/^\s+|\s+$/g,"");if(k=="NNB"){return unescape(v)}}}catch(e){}}function lcs_getConnectType(){var ct="";try{var conn=navigator.connection||navigator.mozConnection||navigator.webkitConnection;if(conn&&typeof conn.type!="undefined"){switch(conn.type){case conn.CELL_2G:ct="2g";break;case conn.CELL_3G:ct="3g";break;case conn.CELL_4G:ct="4g";break;case conn.WIFI:ct="wifi";break;case conn.ETHERNET:ct="eth";break;case conn.UNKNOWN:ct="unknown";break;case conn.NONE:ct="none";break;default:ct=""}}else{if(typeof blackberry!="undefined"&&typeof blackberry.network!="undefined"){var bnet=blackberry.network;if(bnet=="Wi-Fi"){ct="wifi"}else{if(bnet=="3G"){ct="3g"}else{ct=bnet}}}else{var lcs_isie=navigator.appName=="Microsoft Internet Explorer";var lcs_ismac=navigator.userAgent.indexOf("MAC")>=0;if(lcs_isie&&!lcs_ismac&&bd&&bd.addBehavior){var bd=document.body;var lcs_ct="";var obj=bd.addBehavior("#default#clientCaps");ct=bd.connectionType;bd.removeBehavior(obj)}}}}catch(e){console.warn(e)}return ct}function lcs_setNavigationTiming(){var performance=window.performance||{};if(performance.timing){var pt=performance.timing;for(var key in pt){var value=pt[key];if(typeof value==="number"){lcs_perf[key]=value}}}}function lcs_setPaintTiming(){var performance=window.performance||{};try{if(performance.getEntriesByType){var performanceEntries=performance.getEntriesByType("paint");performanceEntries.forEach(function(performanceEntry,i,entries){var name=performanceEntry.name;switch(name){case"first-paint":case"first-contentful-paint":lcs_perf[name]=performanceEntry.startTime;break;default:break}})}else{}}catch(e){console.warn(e)}}function lcs_setNavigationType(){var ngt=getNavigationType();if(ngt!==undefined){lcs_perf.ngt=ngt}}function getNavigationType(){var performance=window.performance||{};if(performance.navigation){return performance.navigation.type}return}var lpid=null;function lcs_create_lpid(){var uaID;var lsg=getLocalStorage();var nnb=lsg?lsg.ls:null;if(nnb){uaID=nnb}else{var nnbFallback;nnbFallback=navigator.userAgent+Math.random();uaID=nnbFallback}var performance=window.performance||{};var pageURL=location.href;var currentTime;if(performance.now){currentTime=performance.now()}else{currentTime=new Date().getTime()}lpid=hashFunction.md5(uaID+pageURL+currentTime);return lpid}function lcs_get_lpid(){if(lpid===null){lpid=lcs_create_lpid()}return lpid}function lcs_update_lpid(){lpid=lcs_create_lpid();return lpid}var hashFunction={};(function(exportTarget){function safeAdd(x,y){var lsw=(x&65535)+(y&65535);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&65535)}function bitRotateLeft(num,cnt){return(num<<cnt)|(num>>>(32-cnt))}function md5cmn(q,a,b,x,s,t){return safeAdd(bitRotateLeft(safeAdd(safeAdd(a,q),safeAdd(x,t)),s),b)}function md5ff(a,b,c,d,x,s,t){return md5cmn((b&c)|(~b&d),a,b,x,s,t)}function md5gg(a,b,c,d,x,s,t){return md5cmn((b&d)|(c&~d),a,b,x,s,t)}function md5hh(a,b,c,d,x,s,t){return md5cmn(b^c^d,a,b,x,s,t)}function md5ii(a,b,c,d,x,s,t){return md5cmn(c^(b|~d),a,b,x,s,t)}function binlMD5(x,len){x[len>>5]|=128<<len%32;x[(((len+64)>>>9)<<4)+14]=len;var i;var olda;var oldb;var oldc;var oldd;var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;for(i=0;i<x.length;i+=16){olda=a;oldb=b;oldc=c;oldd=d;a=md5ff(a,b,c,d,x[i],7,-680876936);d=md5ff(d,a,b,c,x[i+1],12,-389564586);c=md5ff(c,d,a,b,x[i+2],17,606105819);b=md5ff(b,c,d,a,x[i+3],22,-1044525330);a=md5ff(a,b,c,d,x[i+4],7,-176418897);d=md5ff(d,a,b,c,x[i+5],12,1200080426);c=md5ff(c,d,a,b,x[i+6],17,-1473231341);b=md5ff(b,c,d,a,x[i+7],22,-45705983);a=md5ff(a,b,c,d,x[i+8],7,1770035416);d=md5ff(d,a,b,c,x[i+9],12,-1958414417);c=md5ff(c,d,a,b,x[i+10],17,-42063);b=md5ff(b,c,d,a,x[i+11],22,-1990404162);a=md5ff(a,b,c,d,x[i+12],7,1804603682);d=md5ff(d,a,b,c,x[i+13],12,-40341101);c=md5ff(c,d,a,b,x[i+14],17,-1502002290);b=md5ff(b,c,d,a,x[i+15],22,1236535329);a=md5gg(a,b,c,d,x[i+1],5,-165796510);d=md5gg(d,a,b,c,x[i+6],9,-1069501632);c=md5gg(c,d,a,b,x[i+11],14,643717713);b=md5gg(b,c,d,a,x[i],20,-373897302);a=md5gg(a,b,c,d,x[i+5],5,-701558691);d=md5gg(d,a,b,c,x[i+10],9,38016083);c=md5gg(c,d,a,b,x[i+15],14,-660478335);b=md5gg(b,c,d,a,x[i+4],20,-405537848);a=md5gg(a,b,c,d,x[i+9],5,568446438);d=md5gg(d,a,b,c,x[i+14],9,-1019803690);c=md5gg(c,d,a,b,x[i+3],14,-187363961);b=md5gg(b,c,d,a,x[i+8],20,1163531501);a=md5gg(a,b,c,d,x[i+13],5,-1444681467);d=md5gg(d,a,b,c,x[i+2],9,-51403784);c=md5gg(c,d,a,b,x[i+7],14,1735328473);b=md5gg(b,c,d,a,x[i+12],20,-1926607734);a=md5hh(a,b,c,d,x[i+5],4,-378558);d=md5hh(d,a,b,c,x[i+8],11,-2022574463);c=md5hh(c,d,a,b,x[i+11],16,1839030562);b=md5hh(b,c,d,a,x[i+14],23,-35309556);a=md5hh(a,b,c,d,x[i+1],4,-1530992060);d=md5hh(d,a,b,c,x[i+4],11,1272893353);c=md5hh(c,d,a,b,x[i+7],16,-155497632);b=md5hh(b,c,d,a,x[i+10],23,-1094730640);a=md5hh(a,b,c,d,x[i+13],4,681279174);d=md5hh(d,a,b,c,x[i],11,-358537222);c=md5hh(c,d,a,b,x[i+3],16,-722521979);b=md5hh(b,c,d,a,x[i+6],23,76029189);a=md5hh(a,b,c,d,x[i+9],4,-640364487);d=md5hh(d,a,b,c,x[i+12],11,-421815835);c=md5hh(c,d,a,b,x[i+15],16,530742520);b=md5hh(b,c,d,a,x[i+2],23,-995338651);a=md5ii(a,b,c,d,x[i],6,-198630844);d=md5ii(d,a,b,c,x[i+7],10,1126891415);c=md5ii(c,d,a,b,x[i+14],15,-1416354905);b=md5ii(b,c,d,a,x[i+5],21,-57434055);a=md5ii(a,b,c,d,x[i+12],6,1700485571);d=md5ii(d,a,b,c,x[i+3],10,-1894986606);c=md5ii(c,d,a,b,x[i+10],15,-1051523);b=md5ii(b,c,d,a,x[i+1],21,-2054922799);a=md5ii(a,b,c,d,x[i+8],6,1873313359);d=md5ii(d,a,b,c,x[i+15],10,-30611744);c=md5ii(c,d,a,b,x[i+6],15,-1560198380);b=md5ii(b,c,d,a,x[i+13],21,1309151649);a=md5ii(a,b,c,d,x[i+4],6,-145523070);d=md5ii(d,a,b,c,x[i+11],10,-1120210379);c=md5ii(c,d,a,b,x[i+2],15,718787259);b=md5ii(b,c,d,a,x[i+9],21,-343485551);a=safeAdd(a,olda);b=safeAdd(b,oldb);c=safeAdd(c,oldc);d=safeAdd(d,oldd)}return[a,b,c,d]}function binl2rstr(input){var i;var output="";var length32=input.length*32;for(i=0;i<length32;i+=8){output+=String.fromCharCode((input[i>>5]>>>i%32)&255)}return output}function rstr2binl(input){var i;var output=[];output[(input.length>>2)-1]=undefined;for(i=0;i<output.length;i+=1){output[i]=0}var length8=input.length*8;for(i=0;i<length8;i+=8){output[i>>5]|=(input.charCodeAt(i/8)&255)<<i%32}return output}function rstrMD5(s){return binl2rstr(binlMD5(rstr2binl(s),s.length*8))}function rstrHMACMD5(key,data){var i;var bkey=rstr2binl(key);var ipad=[];var opad=[];var hash;ipad[15]=opad[15]=undefined;if(bkey.length>16){bkey=binlMD5(bkey,key.length*8)}for(i=0;i<16;i+=1){ipad[i]=bkey[i]^909522486;opad[i]=bkey[i]^1549556828}hash=binlMD5(ipad.concat(rstr2binl(data)),512+data.length*8);return binl2rstr(binlMD5(opad.concat(hash),512+128))}function rstr2hex(input){var hexTab="0123456789abcdef";var output="";var x;var i;for(i=0;i<input.length;i+=1){x=input.charCodeAt(i);output+=hexTab.charAt((x>>>4)&15)+hexTab.charAt(x&15)}return output}function str2rstrUTF8(input){return unescape(encodeURIComponent(input))}function rawMD5(s){return rstrMD5(str2rstrUTF8(s))}function hexMD5(s){return rstr2hex(rawMD5(s))}function rawHMACMD5(k,d){return rstrHMACMD5(str2rstrUTF8(k),str2rstrUTF8(d))}function hexHMACMD5(k,d){return rstr2hex(rawHMACMD5(k,d))}function md5(string,key,raw){if(!key){if(!raw){return hexMD5(string)}return rawMD5(string)}if(!raw){return hexHMACMD5(key,string)}return rawHMACMD5(key,string)}exportTarget.md5=md5})(hashFunction);exportTarget.lcs_do=lcs_do;exportTarget.lcs_do_gdid=lcs_do_gdid;exportTarget.lcs_get_lpid=lcs_get_lpid;exportTarget.lcs_update_lpid=lcs_update_lpid;exportTarget.lcs_version=lcs_version})(window);