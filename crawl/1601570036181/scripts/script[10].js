/*

HTML-WRITTEN FILE || Script sequence: [10]

*/


function notice_getCookie(name){
 var nameOfCookie = name + "=";
 var x = 0;
 while(x <= document.cookie.length){
   var y = ( x + nameOfCookie.length);
   if(document.cookie.substring(x,y) == nameOfCookie){
     if((endOfCookie = document.cookie.indexOf(";",y)) == -1)
           endOfCookie = document.cookie.length;
     return unescape(document.cookie.substring(y, endOfCookie));
    }
   x = document.cookie.indexOf(" ",x) + 1;
   if(x == 0)
      break;
 }
 return "";     
}

function closeWin(msg_num) { 
	if (msg_num == "T")
	{
		alert("님의 회원정보 수집이용·동의 만료일은 입니다.\n만료일 이후에도 도서관 서비스를 계속 이용하시려면 재동의를 하여 주시기 바랍니다.\n");
		location.href="/ilogout.asp?url=ct";
	}
	else
	{
		alert("님 회원정보 수집이용 동의기간이 만료되었습니다.\n계속 도서관 서비스를 이용하시려면 재동의를 하여 주시기 바랍니다.");
		location.href="/ilogout.asp";
	}
	
}
