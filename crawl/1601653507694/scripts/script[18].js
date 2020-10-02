/*

HTML-WRITTEN FILE || Script sequence: [18]

*/


	function goSearchForm(obj) {
		var frm = document.forms[obj];
		if (!frm.kwd.value) {
			alert("검색어를 입력해주세요.");
			frm.kwd.focus();
			return;
		}
		window.location = frm.action + "?" + $(frm).serialize();
	}
	