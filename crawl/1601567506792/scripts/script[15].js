/*

HTML-WRITTEN FILE || Script sequence: [15]

*/


function getCookie(name){
	name=name+'=';
	var tmp = document.cookie;
	var sidx = tmp.indexOf(name);
	if(sidx == -1) return '';
	sidx = sidx + name.length;
	var eidx = tmp.indexOf(';', sidx);
	if(eidx == -1)eidx = tmp.length;
	return unescape(tmp.substring(sidx, eidx));
}

function getTimeStamp(s1) {
	//현재시간 구하기
	var d = new Date();
	
	if (s1 == 1) {
		// 20080301103025 표현식
		var s =
		leadingZeros(d.getFullYear(), 4) +
		leadingZeros(d.getMonth() + 1, 2) +
		leadingZeros(d.getDate(), 2) +
		
		leadingZeros(d.getHours(), 2) +
		leadingZeros(d.getMinutes(), 2) +
		leadingZeros(d.getSeconds(), 2);
	}else {
		// 2008-03-01 10:30:25 표현식
		var s =
		leadingZeros(d.getFullYear(), 4) + '-' +
		leadingZeros(d.getMonth() + 1, 2) + '-' +
		leadingZeros(d.getDate(), 2) + ' ' +
		
		leadingZeros(d.getHours(), 2) + ':' +
		leadingZeros(d.getMinutes(), 2) + ':' +
		leadingZeros(d.getSeconds(), 2);
	}
	return s;
}

function leadingZeros(n, digits) {
	// 1 -> 01 과 같이 변경하기
	var zero = '';
	n = n.toString();
	
	if (n.length < digits) {
		for (i = 0; i < digits - n.length; i++)
		zero += '0';
	}
	return zero + n;
}

//전체팝업추가(height 30px)추가
if ( getCookie( "20_0508_1" ) != "no" && getTimeStamp(1) <= "202101312359" ) 
{
	popWindow  = window.open('popup/20_0508_1.html','20_0508_1','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=350,height=525,left=0,top=0');
	popWindow.opener = self; 
}

//도서관 전면 휴관
//if ( getCookie( "20_0815" ) != "no" && getTimeStamp(1) <= "202009302359" ) 
//{
//	popWindow  = window.open('popup/20_0815.html','20_0815','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=450,height=660,left=550,top=0');
//	popWindow.opener = self; 
//}
//안심예약대출
if ( getCookie( "20_0922" ) != "no"  ) 
{
	popWindow  = window.open('popup/20_0819.html','20_0922','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=500,height=700,left=800,top=0');
	popWindow.opener = self; 
}

function popupGo(url, type){
	console.log(url + ' / ' + type);
	if(url != null && url != '' && url !='null'){
	url = url.replace(/amp;/g, '');
		if(type == '1'){
			window.open('http://'+url, '_blank');
		}else{
			location.href = 'http://'+url;
		}
	}
}

function openImage(){
	window.open('popupImage.html?v=1','천권북챌린지','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=600,height=920,left=0,top=0');
}
function openImage2(){
	window.open('popuppage/popupImage.html','전자저널 DBpia','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=395,height=400,left=0,top=0');
}

if('' != '' ){
	if('' == 'err3' ){
		alert("세션이 만료되어 로그아웃 되었습니다. 로그인 후 재신청 바랍니다.");
	}
	
}


