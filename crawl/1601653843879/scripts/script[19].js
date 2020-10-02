/*

HTML-WRITTEN FILE || Script sequence: [19]

*/


		/* 팝업닫기처리 */
		function fn_popupClose(popidx,expireday){
			if($("input:checkbox[id='pop_exp_chk_"+popidx+"']").is(":checked")){
				ItgJs.LSset("POPUP_"+popidx, "ON", expireday*24*60*60*1000);
			}
		}

		/* 자동완성 결과 선택 */
		function autocompleteChoice(suggest){
			$(".autocomplete_layer").removeClass("is_expanded");
			$(".search-btn-wrap .btn_arrow").removeClass("is_fold");
			$(".schKwd").val(suggest);
		}

		/* 아이콘영역 출력 */
		function fn_initIcon(){
			$.ajax({
				type : "post"
				, url : "/NL/module/main_use_service_inc.ajax"
				, dataType : "html"
				, beforeSend : ""
				, success : function(data){
					$("#use_service_icon").html(data);
					//ItgJs.LSset("use_service_icon", data, 1*24*60*60*1000);//30일
				}
				, error : function(jqXHR,textStatus,e){
		 			console.log("fn_initIcon 오류");
					return;
				}
				, complete : function(){
					new Tabs(".shortcut_wrap", { initialIndex: 0 });
					new Tabs(".type_service_wrap", {
						initialIndex: 0,
						tabListClassName: ".type_list",
				    	tabItemClassName: ".type_item",
				    	tabPanelWrapClassName: ".type_tabpanel_wrap",
				    	tabPanelClassName: ".type_tabpanel",
					});
				    $(".icon_link").hover(function(){
				    	console.log($(this).children(".icon_non_hover"));
				    	$(this).find(".icon_non_hover").hide();
				    	$(this).find(".icon_hover").show();
				    },function(){
				    	$(this).find(".icon_non_hover").show();
				    	$(this).find(".icon_hover").hide();
				    });
				    ItgJs.hideLoading();
				}
			});
		}

		/* 아이콘설정저장 */
		function fn_setIcon(){
			var frm = document.iconForm;
			//var data = new FormData(frm);
			var data = $(frm).serialize();
			$.ajax({
				type : "post"
				, url : "/NL/module/main_icon_input_proc.ajax"
				, data : data
				, dataType : "json"
				, success : function(data){
					//console.log(data);
					//localStorage.removeItem('use_service_icon_logined');
					//fn_initIcon();
				}
				, error : function(jqXHR,textStatus,e){
					console.log("fn_setIcon 오류");
					console.log(jqXHR);
					console.log(textStatus);
					console.log(e);
					return;
				}
				, complete : fn_initIcon

			});

		}

		/* 도서관 일정 달력 출력 */
		function fn_changeMonth(act){ //act(0:이전, 1:다음)
		 	var data = null;
			var frm = document.calForm;
			var contents_data = null;

			if(act != ""){
				frm.act.value=act;
				data = new FormData(frm);
			}else{
				contents_data = ItgJs.LSget("library_schedule");
			}
			if(contents_data != null && contents_data != ""){
				$("#library_schedule").html(contents_data);
			}else{
				$.ajax({
					type : "post"
					, url : "/NL/main/incLibCalendar.ajax"
					, data : data
				    , processData: false  // Important!
				    , contentType: false
			        , cache: false
					, dataType : "html"
					, beforeSend : ""
					, success : function(data){
						$("#library_schedule").html(data);
						ItgJs.LSset("library_schedule", data, 2*60*60*1000);//2시간
					}
					, error : function(jqXHR,textStatus,e){
			// 			alert("일정 조회 중 오류가 발생하였습니다. 관리자에게 문의해 주세요.");
						return;
					}
				});
			}
		}

		/* 도서관 일정 달력 모달팝업 출력 */
		function fn_changeMonth_modal(act){ //act(0:이전, 1:다음)
		 	var data = null;
			var frm = document.modalCalForm;

			if(act != ""){
				frm.act.value=act;
				data = new FormData(frm);
			}

			$.ajax({
				type : "post"
				, url : "/NL/main/incLibCalendarModal.ajax"
				, data : data
			    , processData: false  // Important!
			    , contentType: false
		        , cache: false
				, dataType : "html"
				, beforeSend : ""
				, success : function(data){
					$("#schedule_popup_contents").html(data);
				}
				, error : function(jqXHR,textStatus,e){
					alert("일정 조회 중 오류가 발생하였습니다. 관리자에게 문의해 주세요.");
					return;
				}
			});
		}

		/* 아이콘 점검 */
		function iconCheck(checked){
			if($("input:checkbox[name=iconArray]:checked").length > 7){
				alert("이용 가능한 최대 서비스는 7개 입니다.");
				$(checked).attr("checked", false);
				return false;
			}else if($("input:checkbox[name=iconArray]:checked").length <= 0){
				alert("선택한 서비스가 없을시 초기 상태로 돌아갑니다");
		/* 		if(!confirm("선택한 서비스가 없을시 초기 상태로 돌아갑니다.\n선택해제 하시겠습니까?")){
					$(checked).attr("checked", true);
					return false;
				} */
			}
		}
	