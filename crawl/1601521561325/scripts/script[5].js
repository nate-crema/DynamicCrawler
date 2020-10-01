
function goDigitalLib(){
  /*
	if(true){
		alert("로그인 후 이용하실 수 있습니다.");
		goMenu("main.do");
		return;
	}
	*/
	var tform = document.goDigital;
	var sitekey = '1';
	var action="http://seat.ansan.go.kr:7500";
	
	//디폴트 중앙
	var gourl = "http://seat.ansan.go.kr:7500/nav?id=0";
	//관산
	if(sitekey=='2'){
		//action="http://seat.iansan.net:7800";
		//action="http://27.101.109.215:7500/nav";
		//tform.method = "GET";
		gourl = "http://seat.ansan.go.kr:7500/nav?id=1"
	}else if(sitekey=='3'){
		//action="http://seat.iansan.net:7900";
		//action="http://27.101.109.215:7500/nav";
		//tform.method = "GET";
		gourl = "http://seat.ansan.go.kr:7500/nav?id=2" //성포
	}else if(sitekey=='4'){
		//action="http://seat.iansan.net:8200";
		//action="http://27.101.109.215:7500/nav";
		//tform.method = "GET";
		gourl = "http://seat.ansan.go.kr:7500/nav?id=3" //감골
	}else if(sitekey=='1'){
		//action="http://seat.iansan.net:7700";
		//action="http://27.101.109.215:7500/nav";
		//tform.method = "GET";
		gourl = "http://seat.ansan.go.kr:7500/nav?id=0";
	}else if(sitekey=='31'){
		//action="http://27.101.109.215:8401/digital.do?mc=NF";
		//action="http://27.101.109.215:7500/nav";
		//tform.method = "GET";
		gourl = "http://seat.ansan.go.kr:7500/?mc=NF";
	}
	//alert(action);
	//var tform = document.goDigital;
	//var nWin = window.open('', 'digitalLib');
	//tform.target="digitalLib";
	//tform.action=action;
	//tform.submit();
	//$("#goDigital").attr("action",action).submit();
	window.open(gourl, "_blank");
}
function goEBooks(){
	var tform = document.goEBook;
	var nWin = window.open('', 'eBooks');
	tform.target="eBooks";
	//tform.action=action;
	tform.submit();
	//$("#goEBook").attr("action","/http://ebook.iansan.net").submit();	
}
function goEBooks2(gotype){
	var tform = document.goEBook2;
	//var nWin = window.open('', 'eBooks2');
	//tform.target="_blank";
	
	if(gotype=="1"){
	  tform.action="http://ebook.ansan.go.kr:8080/english/autologin.php";
	}else{
	  tform.action="http://www.selibrary.com/pages/otherdomain/sso_join_web.asp";
	}
	//tform.action=action;
	tform.submit();
	//$("#goEBook").attr("action","/http://ebook.iansan.net").submit();	
}
function goTrailer(){
	var tform = document.goTrailer;
	var nWin = window.open('', 'BooksTrailer');
	tform.target="BooksTrailer";
	tform.submit();
}

