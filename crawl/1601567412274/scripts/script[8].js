/*

HTML-WRITTEN FILE || Script sequence: [8]

*/


		$(document).ready(function(){
			//본문으로바로가기 수정 (페이지가 많아서 자바스크립트로 처리)
			var skipToContent = $("a[href='#container']").attr('onclick', '').attr('href', '#ct').text('본문바로가기');

			//메뉴바로가기
			var skipToMenu = $("<a href='#gnb' class='skip'>주메뉴바로가기</a>");

			//사이드메뉴 바로가기
			var skipToLeftMenu = $("<a href='#lnb' class='skip'>사이드메뉴바로가기</a>");
			if($("#lnb").length > 0 ){
				$("#lnb").attr('tabIndex', '0');
				$("body").prepend(skipToLeftMenu);
			}
			$("body").prepend(skipToMenu);
			$("body").prepend(skipToContent);
			$("#ct, #gnb").attr('tabIndex', '0');
		});

	