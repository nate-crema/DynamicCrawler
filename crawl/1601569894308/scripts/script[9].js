/*

HTML-WRITTEN FILE || Script sequence: [9]

*/


	function getCookie(cookie_name) {
	  var x, y;
	  var val = document.cookie.split(';');	  
	  var ret_val;
	  for (var i = 0; i < val.length; i++) {
	    x = val[i].substr(0, val[i].indexOf('='));
	    y = val[i].substr(val[i].indexOf('=') + 1);
	    x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
	    if (x == cookie_name) {
	      ret_val=unescape(y); // unescape로 디코딩 후 값 리턴
	      break;
	    }
	  }
	  
	  return ret_val;
	}
	function popclose()
	{
		var expiredays =1;
		var todayDate = new Date();
	    todayDate.setDate( todayDate.getDate() + expiredays );
		var val= $(".popup input:checkbox[name=close_pop]").val();
		document.cookie = "close_pop="+val+ "; path=/; expires=" + todayDate.toGMTString() + ";";
		$(".topInfo").hide();
	}
