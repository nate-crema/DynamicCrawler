/*

Base URL: /resource/search/js/detailSearch.js || Script sequence: [17]

*/

var selectedObj = ('form[name=detailSearchForm] .tbl_input input[name=v1]');


//form 유무 체크
$.detailFormCheck = function(obj){
	var r = false;
	try{
		if(obj.is('form')) r = true;
	}catch(exception){}
	return r;
}

//[ajax] 요청
$.fn.setDetailAjax = function(data, url, dataType, method, loadingFlag){

	var deferred = $.Deferred();// promise
	var dataValue = data;
	if($.detailFormCheck(data)) dataValue = data.serialize();

	var setDataType = "html";
	if(dataType !== undefined) setDataType = dataType;

	var obj = $(this);
	//로딩바 강제 해제 beforeSend 설정 초기화  resurce/common/jquery_plugin/jquer_plugincommon_functions.js
	$.ajax({
		type: method,
		async: true,
		dataType: setDataType,
		url:  url,
		data: dataValue,

		error: function(){
			deferred.reject();
		},
		beforeSend:function(){
			if(loadingFlag) ItgJs.showLoading();
		},
		success: function(msg){
			if(setDataType == "json"){
				deferred.resolve(msg);
			}else{
				obj.html(msg).promise().done(function(){
					deferred.resolve();
				});
			}
		},
		complete:function(e){
			if(loadingFlag) ItgJs.hideLoading();
		}
	});
	return deferred.promise();
}


$(document).ready(function(){
	$('form[name=detailSearchForm] .tbl_input input').focus(function(){//입력창 선택자
		selectedObj = $(this);
	});
	//detailVrKeyword();// 상세검색 다국어 입력기 (개선필요)

	list_scroll();
	pop_sch_tab();

	//메뉴 가로스크롤
	$(".sch_layer").click(function(){
		list_scroll();
	});
	// 고급검색 펼치지/접기
	$(".sch_more_btn").click(function(){
		$(this).toggleClass('on');
		$(".sch_add_tbl").toggle();
	});
	// 저자검색 정보펼치지/접기
	//$(".sch_more_list").click(function(){
	$(document).on('click','.sch_more_list',function(){
		var is_more_tbl = $(this).closest(".sch_tbl_wrap").find(".more_group");
		$(this).toggleClass('on');
		$(this).closest('.sch_tbl_wrap').find('.tbl_top_group').toggleClass('close');
		if($( window ).width() < 767){
			if($(is_more_tbl).css("display") == "none"){
				$(is_more_tbl).css('display','block');
			} else {
				$(is_more_tbl).hide();
			}
		} else {
			if($(is_more_tbl).css("display") == "none"){
				$(is_more_tbl).css('display','table');
			} else {
				$(is_more_tbl).hide();
			}
		}
	});
	// 상세검색 탭버튼
	$(".sch_pop_wrap .sch_ctgr_item").click(function(){
		$(".ctgr_cont_wrap").hide();
		$(".sch_pop_wrap .sch_ctgr_item").removeClass("active");
		$(".sch_pop_wrap .sch_ctgr_item a .check-text").remove();
		$(this).addClass("active");
		$(this).children("a").append('<span class="ir_text check-text">(선택됨)</span>');
		if($(this).hasClass("item_type") == true){
			$(".ctgr_cont_type").show();
		} else if($(this).hasClass("item_author") == true) {
			$(".ctgr_cont_author").show();
			//저자정보 Session Storage 표출
			$('#acName').val(sessionStorage.getItem("nlAcHistory_#acName"));//개인명키워드
			$('#acOrgName').val(sessionStorage.getItem("nlAcHistory_#acOrgName"));//단체명키워드
			if($('#acName').val() != null) $("label[for=acName]").hide();
			if($('#acOrgName').val() != null)  $("label[for=acOrgName]").hide();
			$('#acDataList').html(sessionStorage.getItem("nlAcHistory_#acDataList"));//개인명
			$('#acOrgDataList').html(sessionStorage.getItem("nlAcHistory_#acOrgDataList"));//단체명

		} else {
			$(".ctgr_cont_subject").show();
		}
	});
	// 팝업 종료시
	$(".sch_pop_wrap .btn_close").click(function(){
		if($(".sch_more_btn").hasClass("on") == true){
			return;
		} else {
			$(".sch_more_btn").toggleClass('on');
		}
		$(".sch_add_tbl").show();
	});
	// 리스트 클릭
	$(".sch_ctgr_list a").click(function(){
		var isTxt = $(this).text();
		if($(this).hasClass("sch_list_btn") == true){
			$(".sch_block_wrap .sch_list_btn").removeClass('active');
			$(this).addClass('active');
			$(".sch_tit_wrap .sch_tit").text(isTxt);
			$(".sch_tit_wrap .sch_sub_tit").hide();
			$(".sch_subList_wrap li").hide();
			$(".sch_ctgr_list").removeClass("pdd_b");
			if($(this).hasClass("multimedia") == true){
				$(".sch_subList_wrap").show();
				$(".sch_subList_wrap li.media").show();
				if($( window ).width() < 767){
					$(".sch_ctgr_list").addClass("pdd_b");
					$(".sch_subList_wrap").css('hieght','45px');
					$(".sch_subList").css('width','180%');
				}
			} else if($(this).hasClass("alternative") == true){
				$(".sch_subList_wrap").show();
				$(".sch_subList_wrap li.disabled").show();
				if($( window ).width() < 767){
					$(".sch_ctgr_list").addClass("pdd_b");
					$(".sch_subList_wrap").css('hieght','45px');
					$(".sch_subList").css('width','100%');
				}
			} else {
				$(".sch_subList_wrap").hide();
			}
		} else {
			$(".sch_tit_wrap .sch_sub_tit").show();
			$(".sch_subList_wrap .sub_list_btn").removeClass('active');
			$(this).addClass('active');
			$(".sch_tit_wrap .sch_sub_tit").text(isTxt);
		}
	});
	// 팝업 종료시
	$(".detail_search_wrap h4 a").click(function(){
		$('.sch_tips').toggleClass('active');
	});
	// 저자별/주제별 검색 탭버튼
	$(".ctgr_cont_tab_wrap a").click(function(){
		var href = $(this).attr("href");
		var cls = href.replace('#', '.tab_');
		$(this).closest(".ctgr_cont_tab_wrap").find("a").removeClass("active");
		$(this).addClass("active");
		$(cls).closest(".ctgr_cont_wrap").find(".ctgr_cont_tab").hide();
		$(cls).show();
	});
	// 주제별 검색 - focus/hover 리스트
	$(".sch_list_menu ul li a").focus(function() {
		if($( window ).width() > 767){
			$(this).closest("ul").find('ul').hide();
			$(this).closest("li").children('ul').show();
			if( $(this).closest("li").children('ul').length > 0 ){
				$(this).closest("ul").children('li').find('a').removeClass('on');
				$(this).addClass('on');
			} else {
				$(this).closest("ul").find('a').removeClass('on');
				$(this).closest("ul").find('ul').hide();
			}
			$(".sch_list_menu ul li a").removeClass('hov');
			$(this).addClass('hov');
		}
	});
	$(".sch_list_menu ul li a").hover(function() {
		if($( window ).width() > 767){
			$(this).closest("ul").find('ul').hide();
			$(this).closest("li").children('ul').show();
			if( $(this).closest("li").children('ul').length > 0 ){
				$(this).closest("ul").children('li').find('a').removeClass('on');
				$(this).addClass('on');
			} else {
				$(this).closest("ul").find('a').removeClass('on');
				$(this).closest("ul").find('ul').hide();
			}
			$(".sch_list_menu ul li a").removeClass('hov');
			$(this).addClass('hov');
		}
	});
	//주제별검색 셀렉트박스
	var depth_clone_tab01 = $(".tab_01_subject .sch_list_menu .sch_list_depth01").children('li').clone();
	var depth_clone_tab02 = $(".tab_02_subject .sch_list_menu .sch_list_depth01").children('li').clone();
	$(".tab_01_subject .sch_select_menu .sel_menu01").append(depth_clone_tab01).find('.sch_depth').remove();
	$(".tab_02_subject .sch_select_menu .sel_menu01").append(depth_clone_tab02).find('.sch_depth').remove();
	//주제별검색 셀렉트박스 시작버튼
	$(".sch_select_menu").on("click", ".init", function() {
		var depth_clone = $(this).closest(".ctgr_cont_tab").find(".sch_list_menu").children('ul').children('li').clone();
		if($( window ).width() < 767){
			if($(this).next("ul").find('li').length > 0 ){
				$(this).next("ul").toggle();
			}
		}
		return false;
	});
	//주제별검색 셀렉트박스 선택시
	var allOptions = $(".sch_select_menu ul").children('li');
	$(".sch_select_menu ul").on("click", "li", function() {
		var sel_txt = $(this).text();
		var ref = $(this).children('a').attr('href');
		// 검색버튼
		$(this).closest(".sch_select_menu").find(".search_btn").attr("href" , ref);
		if($( window ).width() < 767){
			$('.sch_list_menu li').removeClass('selected_open');
			$('.sch_depth a[href="'+ref+'"]').closest('li').addClass('selected_open');
			allOptions.removeClass('selected');
			$(this).addClass('selected');
			$(this).closest(".select_menu_wrap").children('.init').text($(this).text());
			$(this).closest("ul").toggle();
			var sel_depth_clone = $(".sch_list_menu .selected_open > ul > li").clone();
			if($(this).closest('ul').hasClass('sel_menu01') == true){
				$(this).closest(".sch_select_menu").find(".sel_menu02").find('li').remove();
				$(this).closest(".sch_select_menu").find(".sel_menu02").append(sel_depth_clone).find('.sch_depth').remove();
				if($(".sel_menu02").children('li').length > 0 ){
					$(".sel_menu02").closest(".select_menu_wrap").children('.init').text('선택해주세요.');
				} else {
					$(".sel_menu02").closest(".select_menu_wrap").children('.init').text('분류가 없습니다.');
				}
			} else if($(this).closest('ul').hasClass('sel_menu02') == true) {
				$(this).closest(".sch_select_menu").find(".sel_menu03").find('li').remove();
				$(this).closest(".sch_select_menu").find(".sel_menu03").append(sel_depth_clone).find('.sch_depth').remove();
				if($(".sel_menu03").children('li').length > 0 ){
					$(".sel_menu03").closest(".select_menu_wrap").children('.init').text('선택해주세요.');
				} else {
					$(".sel_menu03").closest(".select_menu_wrap").children('.init').text('분류가 없습니다.');
				}
			} else if($(this).closest('ul').hasClass('sel_menu03') == true) {
				$(this).closest(".sch_select_menu").find(".sel_menu04").find('li').remove();
				$(this).closest(".sch_select_menu").find(".sel_menu04").append(sel_depth_clone).find('.sch_depth').remove();
				if($(".sel_menu04").children('li').length > 0 ){
					$(".sel_menu04").closest(".select_menu_wrap").children('.init').text('선택해주세요.');
				} else {
					$(".sel_menu04").closest(".select_menu_wrap").children('.init').text('분류가 없습니다.');
				}
			}
		}
		return false;
	});
	//주제별검색 셀렉트박스 리셋 버튼
	$(".sch_select_menu .reset_btn").click(function(){
		$(".select_menu_wrap ul:not(.sel_menu01)").find('li').remove();
		$(".select_menu_wrap ul:not(.sel_menu01)").closest('.select_menu_wrap').children('.init').text('상위 분류를 선택해주세요.');
		$(".sel_menu01").closest('.select_menu_wrap').children('.init').text('선택해주세요.');
		$(this).closest(".sch_select_menu").find(".search_btn").attr("href" , "#none");
	});

	//주제어검색 셀렉트박스
	$(".scroll_box_l .box_cont a").click(function(){
		var txt = $(this).text();
		$(this).closest(".scroll_box_l").find(".box_txt").text(txt);
		$(this).closest(".box_cont").find("a").removeClass("active");
		$(this).addClass("active");
		if($( window ).width() < 767){
			$(this).closest(".box_cont").toggle();
		}
	});
	$(".scroll_box_l .box_txt").click(function(){
		if($( window ).width() < 767){
			$(this).closest(".scroll_box_l").find(".box_cont").toggle();
		}
	});

	//[다국어입력기] V1
   var vrKeyboardNLDetailSearch = new VRKeyboard(
    'form[name="detailSearchForm"] input[name="v1"]',
    '#v1WorldWrapperBtn',
    'form[name="detailSearchForm"] .keyboard-wrapper',
   { position: { top: 40, right: 0, zIndex: 210} }
  );

 //[다국어입력기] V2
   var vrKeyboardNLDetailSearch = new VRKeyboard(
    'form[name="detailSearchForm"] input[name="v2"]',
    '#v2WorldWrapperBtn',
    'form[name="detailSearchForm"] .keyboard-wrapper',
   { position: { top: 90, right: 0, zIndex: 210} }
  );

 //[다국어입력기] V3
   var vrKeyboardNLDetailSearch = new VRKeyboard(
    'form[name="detailSearchForm"] input[name="v3"]',
    '#v3WorldWrapperBtn',
    'form[name="detailSearchForm"] .keyboard-wrapper',
   { position: { top: 140, right: 0, zIndex: 210} }
  );

 //[다국어입력기] V4
   var vrKeyboardNLDetailSearch = new VRKeyboard(
    'form[name="detailSearchForm"] input[name="v4"]',
    '#v4WorldWrapperBtn',
    'form[name="detailSearchForm"] .keyboard-wrapper',
   { position: { top: 190, right: 0, zIndex: 210} }
  );
});

$(window).resize(function (){
	list_scroll();
	if($( window ).width() < 767){
		$(".scroll_box_l .box_cont").hide();
	} else {
		$(".sch_add_tbl").show();
		$(".scroll_box_l .box_cont").show();
		$(".sch_subList_wrap").css('left','0');
		if($(".sch_more_btn").hasClass("on") != true){
			$(".sch_more_btn").toggleClass('on');
		}
	}
});


//상세검색 다국어입력기
function detailVrKeyword(){
	if($('.worldword-wrap').size() > 1) $('.worldword-wrap:not(:eq(0))').remove();//생성된 다국어 입력기 삭제(0은 검색창용.. 개선필요)
	var top = 'auto';
	//if(selectedObj.offset() != undefined) top = selectedObj.offset().top+'px';

	var vrKeyboardNlSearch = new VRKeyboard(
		selectedObj,
		'form[name=detailSearchForm] .btn-worldword',
		'.search-form_group .btn-worldword-wrap',
		{ position: { top: top, right: -30, zIndex: 210} }
	);
}

//모바일 체크
function isMobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
//리스트메뉴 스크롤
function list_scroll(){
	var totalWidth = 0;
	var set = $(".sch_list_wrap li");
	var set_lenght = $(".sch_list_wrap li").length;
	var set_wid = $(".scroll_wid_wrap .scroll_wid > *");
	var set_wid_lenght = $(".scroll_wid_wrap .scroll_wid > *").length;
	set.each(function(){
		totalWidth = totalWidth + $(this).outerWidth() + (30 * set_lenght);
	});
	set_wid.each(function(){
		totalWidth_wid = totalWidth + $(this).outerWidth() + 30;
	});
	/*if ($( window ).width() < 767) {*/
		$(".sch_list_wrap").css("width", totalWidth);
		$(".scroll_wid_wrap .scroll_wid").css("width", totalWidth);
		$(".sch_list_wrap").closest("div").css("overflow-x","auto");
		//모바일에서만 실행
		if (isMobile()) {
			// 선택된 리스트메뉴를 좌측으로
			var position = $(".sch_list_btn.active").offset().left - 20;
			$(".sch_list_wrap").closest("div").scrollLeft(position);
			$("a.txt_btn").closest("div").scrollLeft(position);
		} else {
			//반응형 드래그
			var dragFlag = false;
			var x, y, pre_x, pre_y;
			$(function () {
				$(".sch_list_wrap, .scroll_wid_wrap, .ctgr_cont_tab_wrap, .sch_subList_wrap").closest("div").mousedown(
					function (e) {
						dragFlag = true;
						var obj = $(this);
						x = obj.scrollLeft();

						pre_x = e.screenX;

						$(this).css("cursor", "pointer");
					}
				);
				$(".sch_list_wrap, .scroll_wid_wrap, .ctgr_cont_tab_wrap, .sch_subList_wrap").closest("div").mousemove(
					function (e) {
						if (dragFlag) {
							var obj = $(this);
							obj.scrollLeft(x - e.screenX + pre_x);
							return false;
						}
					}
				);
				$(".sch_list_wrap, .scroll_wid_wrap, .ctgr_cont_tab_wrap, .sch_subList_wrap").closest("div").mouseup(
					function () {
						dragFlag = false;
						$(this).css("cursor", "default");
					}
				);
				$('body').mouseup(
					function () {
						dragFlag = false;
						$(this).css("cursor", "default");
					}
				);
			});
		}
	/*
	} else {
		$('.sch_list_wrap').css('width','100%');
		$('.sch_list_wrap').closest('div').css('overflow-x','hidden');
	}
	*/
}

/****************************
 * 상세 검색
 ****************************/
 function goDetailSearch(){
	 var f = document.forms["detailSearchForm"];
	 f.action = "/NL/contents/search.do";
	 //var cate = $('div.sch_ctgr_list ul.sch_list_wrap a.active').text();
	 var cate = $('div.sch_ctgr_list ul.sch_list_wrap a.active').attr("data-d-ategory");

	 var lnbType = $('ul.sch_subList_wrap:visible a.active').text();

	 f.category.value = cate;
	 f.lnbTypeName.value = lnbType;

	 var dFlag = false;
		$('form[name=detailSearchForm] input[type=text]').each(function(){
			if($(this).val().trim() != "") dFlag= true;
		});

		if(!dFlag){
			alert('1개 이상의 검색어를 입력하세요.');
			return false;
		}

	var path = window.location.pathname;//현재 경로

	if(path.indexOf("/EN/") > -1){
		f.action = "/EN/contents/engSearch.do";
	}else{
		f.action = "/NL/contents/search.do";
	}


	f.submit();

 }




/****************************
 * 판종유형
 ****************************/
function getEditList(obj){
	 var code = $(obj).val();
	 var obj = new Object();

	 var dTxt = "적용안함";
	 //if($('form[name=historyForm]').attr('action') == "/NE/contents/engSearch.do") dTxt = "N/A"; //영문구분
	 if($('form[name=historyForm]').attr('action') == "/EN/contents/engSearch.do") dTxt = "N/A"; //영문구분

	 obj.editText = code;

	 $("#gu10 option").remove();
	 $("#gu10").append("<option value=''>"+dTxt+"</option>");

	 $(obj).setDetailAjax(obj, "/NL/search/edit_list_ajax.do", "json","GET", false).done(function(data){
		 $.each(data,function(key,value){
			$("#gu10").append("<option value='"+value.codeData+"'>"+value.description+"</option>");

		 });
	 });

}

/****************************
 * 저자조회
 ****************************/
function goAuthorInfo(type,pageNum){

	 var nameObj = "#acName";
	 var objName = "#acDataList";

	 if(type == '1'){
		 objName = "#acOrgDataList";
		 nameObj = "#acOrgName";
	 }else{
		 objName = "#acDataList";
		 nameObj = "#acName";
	 }

	 var code = $(obj).val();
	 var obj = new Object();
	 obj.acName =  $(nameObj).val();
	 obj.acType = type;
	 obj.pageNum = pageNum;

	 if(obj.acName == ""){
		 alert('저자(단체)명을 입력해주세요.');
		 return false;
	 }

	 $(objName).setDetailAjax(obj, "/NL/search/ac_list.ajax", "html","POST", true).done(function(data){
		 sessionStorage.setItem("nlAcHistory_"+nameObj, $(nameObj).val());//개인명키워드
		 sessionStorage.setItem("nlAcHistory_"+objName, $(objName).html());//저자정보 Session Storage 저장
	 });

	 return false;

}

/****************************
 * 주제별 목록 조회 1단계
 ****************************/
function goSubject1depthList(){
	var kwd = $('#detailSubjectKwd').val();
	var dataValue =  ({"kwd":kwd});

	$('#detailSubject1deptAjaxList').setDetailAjax(dataValue, "/NL/search/subject_list_1depth.ajax", "html","POST", true).done(function(data){

	 });

}

/****************************
 * LOD보기/다운로드
 ****************************/
function goLodDownload(controlNo){
	window.open('http://lod.nl.go.kr/home/include/lodpopup.jsp?uri=http://lod.nl.go.kr/resource/'+controlNo, 'popup_lodview','width=750,height=640,scrollbars=yes,toolbar=no,status=no');
}

function goMarcView(downData){
	window.open('/NL/search/subject_marc_view.do?downData='+downData, 'popup_marcview','width=400,height=640,scrollbars=yes,toolbar=no,status=no');
}
/****************************
 * 주제별 목록 조회 2단계
 ****************************/
function goSubject2depthList(id, name, controlNo){
	var dataValue =  ({"id":id});

	$('#detailSubject2deptAjaxList').setDetailAjax(dataValue, "/NL/search/subject_list_2depth.ajax", "html","POST", true).done(function(data){
		var str = "<input type=\"checkbox\" class=\"input_check\" id=\"chk_box\" onclick=\"setSubjectInfo(this, '"+name+"')\" />"+name;
		var lodBtn = "";
		if(controlNo != "") lodBtn = "<a href=\"javascript:goLodDownload('"+controlNo+"');\" class='btn btn_view'>LOD 보기/다운로드</a>";

		var str_btn = "<span class='btn_wrap is_pair'><a href=\"javascript:goMarcView('"+id+"');\" class='btn btn_view'>MARC 보기/다운로드</a>"+lodBtn+"</span>";

		$('span.box_chk_wrap label').html(str);//2depth 상단에 클릭한 정보
		$('span.label_chk_wrap').append(str_btn);
	 });
}

/****************************
 * 주제어 목록 선택 처리
 ****************************/
function setSubjectInfo(obj, val){
	var duFlag = false
	$("#detailSubjectList div.total_sch_box span").each(function(){

		var spanText = $(this).text().trim().replace("×","");

		if(spanText == val.trim()){
			duFlag = true;
		}
	});

	if(!duFlag){
		var str = "<span class=\"total_sch\">"+val+"<a href=\"javascript:void(0);\" onclick=\"$(this).closest('span').remove();\">×</a></span>";
		$("#detailSubjectList div.total_sch_box").append(str);
	}
}

/****************************
 * 주제어 검색
 ****************************/
function goSubject(){
	var f = document.detailSubject;

	var subjectList = "";
	$("#detailSubjectList div.total_sch_box span").each(function(i){
		var spanText = $(this).text().trim().replace("×","");
		if(i != 0) subjectList += "|";//| 구분자
		subjectList += spanText;
	});

	f.subject.value = subjectList;
	f.action = "/NL/contents/search.do";
	f.submit();
}

/****************************************
 * 상세검색 입력값 초기화
 ****************************************/
function goDetailClear(){
	$("form[name=detailSearchForm] input[type=text]").val("");
}

function pop_sch_tab() {
    $(".detail_sch_sub .popup_contents .tab_content").hide();
    $(".detail_sch_sub .popup_contents .tab_content:first").show();

    $(".detail_sch_sub .popup_contents ul.tabs li").click(function () {
        $(".detail_sch_sub .popup_contents ul.tabs li").removeClass("active");
        $(this).addClass("active");
        $(".detail_sch_sub .popup_contents .tab_content").hide()
        var activeTab = $(this).attr("rel");
        $("." + activeTab).fadeIn()
    });
}

/****************************************
 * 분류기호 참조
 ****************************************/
function popKdc4List(){
	var keyword = $('#kdc4Keyword').val();
	var dataValue = ({"keyword":keyword});

	$(this).setDetailAjax(dataValue,"/NL/search/pop_kdc4_list.ajax","json","POST",true).done(function(data){
		var codeList = "";
		$.each(data,function(key,value) {
			codeList += "<tr>";
			codeList += "<td><a href=\"#none\" onclick=\"setPopKdcData('"+value.classVal+"');return false;\">"+value.classVal+"</a></td>";
			codeList += "<td class=\"left\"><a href=\"#none\" onclick=\"setPopKdcData('"+value.classVal+"');return false;\">"+value.classTitle+"</a></td>";
			codeList += "</tr>";
		});

		if(data.length == 0) codeList = "<tr><td colspan=\"2\"><span>검색된 결과가 없습니다.</span></td></tr>";

		$('#popKdc4Result').html(codeList);
	});
}

/****************************************
 * 분류기호 참조 set
 ****************************************/
function setPopKdcData(code){
	$('form[name=detailSearchForm] input[name=guCode2]').val(code);
	$('#kdc4Keyword').parent().parent().parent().parent().parent().find('.btn_close').click();
}

/****************************************
 * 별치기호 참조
 ****************************************/
function popMngList(){
	var keyword = $('#mngKeyword').val();
	var dataValue = ({"keyword":keyword});

	$(this).setDetailAjax(dataValue,"/NL/search/pop_mng_list.ajax","json","POST",true).done(function(data){
		var codeList = "";
		$.each(data,function(key,value) {
			codeList += "<tr>";
			codeList += "<td><a href=\"#none\" onclick=\"setPopMngData('"+value.codeData+"');return false;\">"+value.codeData+"</a></td>";
			codeList += "<td class=\"left\"><a href=\"#none\" onclick=\"setPopMngData('"+value.codeData+"');return false;\">"+value.matName+"</a></td>";
			codeList += "</tr>";
		});

		if(data.length == 0) codeList = "<tr><td colspan=\"2\"><span>검색된 결과가 없습니다.</span></td></tr>";

		$('#popMngResult').html(codeList);
	});
}

/****************************************
 * 별치기호 참조 set
 ****************************************/
function setPopMngData(code){
	$('form[name=detailSearchForm] input[name=guCode3]').val(code);
	$('#popMngResult').parent().parent().parent().parent().parent().find('.btn_close').click();
}

/****************************************
 * 대학명 참조
 ****************************************/
function popUniList(){
	var keyword = $('#uniKeyword').val();
	var dataValue = ({"keyword":keyword});

	$(this).setDetailAjax(dataValue,"/NL/search/pop_uni_list.ajax","json","POST",true).done(function(data){
		var codeList = "";
		$.each(data,function(key,value) {
			codeList += "<tr>";
			codeList += "<td><a href=\"#none\" onclick=\"setPopUniData('"+value.classCode+"','"+value.description+"');return false;\">"+value.classCode+"</a></td>";
			codeList += "<td class=\"left\"><a href=\"#none\" onclick=\"setPopUniData('"+value.classCode+"','"+value.description+"');return false;\">"+value.description+"</a></td>";
			codeList += "</tr>";
		});

		if(data.length == 0) codeList = "<tr><td colspan=\"2\"><span>검색된 결과가 없습니다.</span></td></tr>";

		$('#popUniResult').html(codeList);
	});
}

/****************************************
 * 대학명 참조 set
 ****************************************/
function setPopUniData(code, name){
	$('form[name=detailSearchForm] input[name=guCode7]').val(code);
	$('form[name=detailSearchForm] input[name=gu7]').val(name);
	$('#popUniResult').parent().parent().parent().parent().parent().find('.btn_close').click();
}

/****************************************
 * 정부기관명 참조
 ****************************************/
function popGovList(){
	var keyword = $('#govKeyword').val();
	var dataValue = ({"keyword":keyword});

	$(this).setDetailAjax(dataValue,"/NL/search/pop_gov_list.ajax","json","POST",true).done(function(data){
		var codeList = "";
		$.each(data,function(key,value) {
			codeList += "<tr>";
			codeList += "<td><a href=\"#none\" onclick=\"setPopGovData('"+value.classCode+"','"+value.description+"');return false;\">"+value.classCode+"</a></td>";
			codeList += "<td class=\"left\"><a href=\"#none\" onclick=\"setPopGovData('"+value.classCode+"','"+value.description+"');return false;\">"+value.description+"</a></td>";
			codeList += "</tr>";
		});

		if(data.length == 0) codeList = "<tr><td colspan=\"2\"><span>검색된 결과가 없습니다.</span></td></tr>";

		$('#popGovResult').html(codeList);
	});
}

/****************************************
 * 정부기관명 참조 set
 ****************************************/
function setPopGovData(code, name){
	$('form[name=detailSearchForm] input[name=guCode8]').val(code);
	$('form[name=detailSearchForm] input[name=gu8]').val(name);
	$('#popGovResult').parent().parent().parent().parent().parent().parent().find('.btn_close').click();
}
