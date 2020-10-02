/*

HTML-WRITTEN FILE || Script sequence: [31]

*/


		$(document).ready(function(){

			/* 통합검색 자동완성 */
			$(".schKwd").keyup(function() {
			var akc_enable = akc_getCookie(); //자동완성 1:켜기, 0:끄기

			//if(!$(".autocomplete_layer").hasClass("is_collapsed")){ //자동완성 끄기 해제시
			if(akc_enable == 1){
				var term = $(this).val();
				if(!ItgJs.fn_isEmpty(term)){
					$.ajax({
						  url : "/NL/main/autoCompleteList.ajax"
						, data: {'term':term}
						, dataType: "json"
						, type : "post"
						, beforeSend : ""
						, success : function(data){
							var suggest = "";
							var sArr = data.suggestArr;
							for(var i in sArr) {
								suggest += "<li class='item'><a href='#none' onclick='autocompleteChoice(\""+sArr[i]+"\");'>"+
								sArr[i][0].replace(term,'<strong>'+term+'</strong>')+"</a></li>";
							}
							$(".result_list").html(suggest);
							$(".result_list").refreshAutoList(suggest);
						}
						, error : function(jqXHR,textStatus,e){
							//alert("결과 조회 중 오류가 발생하였습니다. 관리자에게 문의해 주세요.");
							return;
						}
					});
				}
			//}
			}else{//자동완성 미사용
				$('div.autocomplete_layer').addClass('is_collapsed');
				$(".result_list").refreshAutoList("");
			}

			});

			/* 내서재 - 연구자정보서비스정보 표출 여부  */
			var researchYn = 'false';
			if(researchYn == 'false'){
				$('#MMAP_N60509000000').hide();
			}
			/* 내서재 - 회원가입 표출 여부  */
			var loginYn = 'false';
			if(loginYn == 'true'){
				$('#SNB_N60300000000').hide();
			}

			/* 책읽어주는 도서관 이미지로딩실패시 기본이미지처리 */
			$(".bookReadImg").each( function(i, ele){
				var uri = "/resource/common/img/noimage_audio.gif";
				//이미 load된 이미지들을 처리하기 위한 코드
			    // if((typeof this.naturalWidth != "undefined" && this.naturalWidth == 0 ) || this.readyState == 'uninitialized' ) {//국중AS-IS조건
			    if( ele.src != '' && ele.complete == true && ele.naturalWidth == 0 ){
					$(this).attr('src', uri );
				}

			    //load되지 않은 이미지들은 load와 error 이벤트를 추가해준다
			    $(this).load( function(n){
			        //do nothing
			    }).error( function(){
			        $(this).attr("src", uri );
			    });
			});
		});

		/**
		 * <a href="#">링크</a>
		 * 위와 같은 형태로 된 링크를 '#'동작이 먹지 않게 막는다.
		 */
		$(document).delegate("a[href='#']","click",function(event){
			event.preventDefault();
		});
		$(document).delegate("a[href='#none']","click",function(event){
			event.preventDefault();
		});

		//자동완성 쿠키
		function akc_setCookie(bool) {
			var akc_cookie = 0;
			var todayDate;

			if(bool)
			{
				akc_cookie = "1";
				akc_enable = "1";
				$('div.autocomplete_layer').removeClass('is_collapsed');
			} else {
				akc_enable = "0";
				$('div.autocomplete_layer').addClass('is_collapsed');
			}

			todayDate = new Date();
			todayDate.setDate(todayDate.getDate() + 3650);
			document.cookie = "KonanAKC=" + escape(akc_cookie) + "; path=/; expires=" + todayDate.toGMTString();

			$('div.autocomplete_layer').removeClass('is_expanded');
			$(".result_list").refreshAutoList("");
		}

		function akc_getCookie() {
			var bool=false;
			var allcookies;
			var pos;
			var start;
			var end;
			var akc_cookie;

			allcookies = document.cookie;
			pos = allcookies.indexOf("KonanAKC=");
			if ( pos==-1 ) return "1";
			start = pos + 9;
			end = allcookies.indexOf(";",start);

			if (end == -1) end = allcookies.length;

			akc_cookie = allcookies.substring(start,end);
			akc_cookie = unescape(akc_cookie);

			return akc_cookie;
		}

		//[자동완성 목록 갱신]
		$.fn.refreshAutoList = function(str){
			var listStr = str;
			//최초 수행 버튼
			var akc_enable = akc_getCookie(); //자동완성 1:켜기, 0:끄기
			var closeBtn = "<button type=\"button\" class=\"autocomplete_close\" onclick=\"akc_setCookie(0);\">자동완성 끄기</button>";

			if(akc_enable == 1){
				closeBtn = "<button type=\"button\" class=\"autocomplete_close\" onclick=\"akc_setCookie(0);\">자동완성 끄기</button>";
				$('.search-btn-wrap .btn_arrow .arrow_fold').removeClass('is_collapsed');
			}else{
				closeBtn = "<button type=\"button\" class=\"autocomplete_close\" onclick=\"akc_setCookie(1);\">자동완성 켜기</button>";
				listStr = "<li class='item'><a href=\"javascript:void(0);\">자동완성이 꺼져있습니다.</a></li>";
				$('.search-btn-wrap .btn_arrow .arrow_fold').addClass('is_collapsed');
			}
			$('.autocomplete_layer div.btn_wrap').html(closeBtn);//자동완성 켜기끄기 버튼
			$(this).html(listStr);
		}
	