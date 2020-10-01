

/*Base URL: /js/common_util.js || Script sequence: [14]*/

/** 3자리수마다 콤마 */
function fnComma(n) {
   n += '';
   var reg = /(^[+-]?\d+)(\d{3})/;
   while (reg.test(n)){
      n = n.replace(reg, '$1' + ',' + '$2');
   }
   return n;
}

/**
 * 숫자만 입력
 * @param event
 * @returns {Boolean}
 */
function onlyNumber(event) {
	var key = window.event ? event.keyCode : event.which;    
	if ((event.shiftKey == false) && ((key  > 47 && key  < 58) || (key  > 95 && key  < 106)
	|| key  == 35 || key  == 36 || key  == 37 || key  == 39  // 방향키 좌우,home,end  
	|| key  == 8  || key  == 46 || key  == 9) // del, back space, Tab
	) {
		return true;
	}else {
	    return false;
	}    
}
