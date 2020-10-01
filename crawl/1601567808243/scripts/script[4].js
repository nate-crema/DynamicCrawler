/*

HTML-WRITTEN FILE || Script sequence: [4]

*/


$(document).ready(function () {
	$("#sitekey").val('1');
	$("#sitekey0").val('1');
	$("#sitekey1").val('1');
	$("#sitekey2").val('1');
	$("#iLibkey").val('1').attr("disabled", "disabled");
	
	$("#srcYear").val('2020');
	$("#srcMonth").val('10');

	//접근성 포커스
	var access = '';
	if( access != "" ){
		$("#"+access).focus();
	}
});

function getSaveId()
{
	var saveId = window.localStorage.getItem("saveId");
	var userId = window.localStorage.getItem("userId");
	
	if (saveId == "Y")
	{
		document.loginForm.keepId.checked = true;
		document.loginForm.userid.value = userId;
	}
}

function form_ck() 
{
	var saveId = document.loginForm.keepId.checked;
	var userId = document.loginForm.userid.value;
	var passWd = document.loginForm.password.value;
	var chkSSL = document.loginForm.chkSSL.checked;

	if(userId =="")
	{
		alert("ID를 입력해주세요");
        loginForm.userid.focus();
        return false;
    }
	
	if(passWd =="") 
	{
         alert("비밀번호를 입력해주세요");
         loginForm.password.focus();
         return false;
    }
	
	if (saveId)
	{
		window.localStorage.setItem("saveId", "Y");
		window.localStorage.setItem("userId", userId);
	}
	else
	{
		window.localStorage.removeItem("saveId");
		window.localStorage.removeItem("userId");
	}
	
	$("#userid").val();
	$("#password").val();
	
	if(chkSSL){
  	$("#loginForm").attr("action","https://lib.ansan.go.kr/login.do").submit();
  }else{
  	$("#loginForm").attr("action","/login.do").submit();
  }
}

function fnBookSrc(){
	if($.trim($("#srcWord").val()).length == 0){
		alert("검색어를 입력해주십시오.");
		return;
	}
	
	$("#bookSearch").attr("action", "/detailDataSearchList.do").submit();
}

function goLibrary(idx){
	var szDate = new Date();

	// Display the month, day, and year. getMonth() returns a 0-based number.
	var szMonth = szDate.getMonth()+1;
	var szYear = szDate.getFullYear();
	$("#sitekey1").val(idx);
	$("#srcYear").val(szYear);
	$("#srcMonth").val(szMonth);
	$("#goLibrary").attr("action","/main.do").submit();
}

function goMinLibrary(idx){
	$("#minisitekey").val(idx);
	$("#goLibrary").attr("action","/minLib.do").submit();
}

function beforeMonthlyInfo(){
	var srcBeforeYear = Number($("#srcYear").val());
	var srcBeforeMonth = Number($("#srcMonth").val())-1;
	if(srcBeforeMonth < 1){
		srcBeforeYear = srcBeforeYear-1;
		srcBeforeMonth = 12;
	}
	
	$("#srcYear").val(srcBeforeYear);
	$("#srcMonth").val(srcBeforeMonth);
	$("#access").val("btn_before_mon");
	$("#goLibrary").attr("action","/main.do").submit();
}

function nextMonthlyInfo(){
	var srcNextYear = Number($("#srcYear").val());
	var srcNextMonth = Number($("#srcMonth").val())+1;
	if(srcNextMonth > 12){
		srcNextYear = srcNextYear+1;
		srcNextMonth = 1;
	}
	
	$("#srcYear").val(srcNextYear);
	$("#srcMonth").val(srcNextMonth);
	$("#access").val("btn_next_mon");
	$("#goLibrary").attr("action","/main.do").submit();
}

function fnNoticeDetail(fn_seq, gwan){
	$("#fn_seq").val(fn_seq);
	$("#gwan1").val(gwan);
	$("#goLibrary").attr("action", "/noticeP.do").submit();
}
function fnLectureDetail(sitekey1){
	$("#sitekey1").val(sitekey1);
	$("#goLibrary").attr("action", "/culturalclass.do").submit();
}
function fnComplimentDetail(fn_seq, gwan){
	$("#fn_seq").val(fn_seq);
	$("#gwan1").val(gwan);
	$("#goLibrary").attr("action", "/complimentP.do").submit();
}
function goBook(seq){
	$("#bookSeq").val(seq);
	$("#sitekey4").val('1' );
	$("#goBookList").attr("action", "/monthrecommendreading.do").submit();
}
