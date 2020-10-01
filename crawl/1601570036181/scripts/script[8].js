/*

HTML-WRITTEN FILE || Script sequence: [8]

*/


function middle_search() {
	if (document.seek.a_q.value=="도서검색명" || document.seek.a_q.value=="") {
		alert("검색어를 입력해주세요.");
		document.seek.a_q.value=''; 
		document.seek.a_q.focus();
		return false;
	} else {
		document.seek.action='/ct/A-LibM/search1.asp';
		document.seek.target='_self';
		return true;
	}
}
