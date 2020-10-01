/*

Base URL: /P_js/js.js || Script sequence: [2]

*/

/** 탭메뉴 공통적으로 사용
* author : myshin
* update : 2007.11.28
* desc : 이미지일때 소스 경로/이름 무관하게 수정. 앵커일때 스타일로 제어하게 수정.
* guide : tab1m01, tab1c01 등 탭메뉴, 컨텐츠 id값 맞춤.
ex) tabOn(1,1);
*/
function tabOn(tabid,a) {
	for (i=1;i<=10;i++) {
		if(i<10){inn="0"+i;} else {inn=""+i;}
		tabMenu = document.getElementById("tab"+tabid+"m"+i);
		tabContent = document.getElementById("tab"+tabid+"c"+i);
		if (tabMenu) { //객체가존재하면
			if (tabMenu.tagName=="IMG") { tabMenu.src = tabMenu.src.replace("on.gif", ".gif"); } //이미지일때
			if (tabMenu.tagName=="A") { tabMenu.className=""; } //앵커일때
		}
		if (tabContent) { tabContent.style.display="none"; }
	}
	if(a<10){ann="0"+a;} else {ann=""+a;}
	tabMenu = document.getElementById("tab"+tabid+"m"+a);
	tabContent = document.getElementById("tab"+tabid+"c"+a);
//	alert(tabMenu.tagName);
	if (tabMenu) { //객체가존재하면
		if (tabMenu.tagName=="IMG") { tabMenu.src = tabMenu.src.replace(".gif", "on.gif"); } //이미지일때
		if (tabMenu.tagName=="A") { tabMenu.className="on"; } //앵커일때
	}
	if (tabContent) { tabContent.style.display="block"; }
	tabMore = document.getElementById("tab"+tabid+"more");
}


/* 탭메뉴 */
function tab_menu(num){	
		var f = jQuery('.tabBox').find('li');
		for ( var i = 0; i < f.length; i++ ) {			
			if ( i == num) {			
				f.eq(i).addClass('Tabon');	
				jQuery('.tab-con0' + i ).addClass('show').removeClass('hide');			
			} else {
				f.eq(i).removeClass('Tabon');					
				jQuery('.tab-con0' + i ).addClass('hide').removeClass('show');
			}
		}
	};


/* 탭메뉴 */
function tab_menu3(num){	
		var f = jQuery('.tabBox03').find('li');
		for ( var i = 0; i < f.length; i++ ) {			
			if ( i == num) {			
				f.eq(i).addClass('Tabon');	
				jQuery('.tab-con0' + i ).addClass('show').removeClass('hide');			
			} else {
				f.eq(i).removeClass('Tabon');					
				jQuery('.tab-con0' + i ).addClass('hide').removeClass('show');
			}
		}
	};


function tab_menu2(num){	
		var f = jQuery('.box').find('li');
		for ( var i = 0; i < f.length; i++ ) {			
			if ( i == num) {			
				f.eq(i).addClass('active');	
				jQuery('.tab-con1' + i ).addClass('show').removeClass('hide');			
			} else {
				f.eq(i).removeClass('active');					
				jQuery('.tab-con1' + i ).addClass('hide').removeClass('show');
			}
		}
	};


 
// 마우스오버아웃
function imgOver(imgEl) {
	imgEl.src = imgEl.src.replace(".gif", "on.gif");
}
function imgOut(imgEl) {
	imgEl.src = imgEl.src.replace("on.gif", ".gif");
}
function menuOver() {
	this.src = this.src.replace(".gif", "on.gif");
}
function menuOut() {
	this.src = this.src.replace("on.gif", ".gif");
}

//이미지롤오버함수할당
//ex) initImgRoll("containerId");
function initImgRoll(containerId) { 
 	imgEl = document.getElementById(containerId).getElementsByTagName("img");
	for (i=0; i<imgEl.length; i++) {
		var menuImg = imgEl[i]
		var where = menuImg.src.indexOf("on.gif",0)
		if (where==-1) {
				menuImg.onmouseover = menuOver;
				menuImg.onmouseout = menuOut;
		}
	}
}


function changeLm2pic(a) {
  obj = document.getElementById("lm2pic").getElementsByTagName("img")[0];
	var aa="";
  if(a<10) { aa="0"; }
	aa=aa+a;
	if(a==0) { obj.src="/gmi/main/lm2pic"+"01"+".gif"; }
  else { obj.src="/gmi/main/lm2pic"+aa+".gif"; }
}









// 이미지 오버
function initImgOver(as_ID) {
	var rollNav = document.getElementById(as_ID);	
	var rollLan = rollNav.childNodes.length;	
	var rollItem;	
	var rollAnchor;
	var rollImg;	
	
	for (var i=0; i<rollLan; i++) {
		rollItem = rollNav.childNodes.item(i);
		if (rollItem.tagName != "LI") {
			continue;
		}
		rollAnchor = rollItem.getElementsByTagName("a").item(0);
		if (rollAnchor.className != "over") {
			rollAnchor.onmouseover = rollAnchor.onfocus = function () {
				if (rollNav.current) {
					rollImg = rollNav.current.childNodes.item(0);
					rollImg.src = rollImg.src.replace("_on.gif", ".gif");
					rollNav.current = null;				
				}
				if ((rollNav.current == null) || (rollNav.current != this)) {
					rollImg = this.childNodes.item(0);
					rollImg.src = rollImg.src.replace(".gif", "_on.gif");
					rollNav.current = this;
				}
				rollNav.isOver = true;			
			}
			rollAnchor.onmouseout = rollAnchor.onblur = function () {
				if (rollNav.current) {
					rollImg = rollNav.current.childNodes.item(0);
					rollImg.src = rollImg.src.replace("_on.gif", ".gif");
					rollNav.current = null;				
				}
			}
		}
	}	
}





// 보이기감추기
//ex) displayOff('idName','idName'); displayOn('idName','idName'); //인수 개수에 상관없다.
function displayOn() {
	var i,j,a=displayOn.arguments;
	for(i=0;i<a.length;i++) {
		obj = document.getElementById(a[i]);
		if (obj) { obj.style.display = "block"; }
	}
}
function displayOff() {
	var i,j,a=displayOff.arguments;
	for(i=0;i<a.length;i++) {
		obj = document.getElementById(a[i]);
		if (obj) { obj.style.display = "none"; }
	}
}



// 나만보이기
//ex) displayOnly('id이름중공통되는부분',전체수,현재순번); //현재순번의 객체만 보여준다
function displayOnly(coId,num,curr) {
	for (i=1;i<= num;i++) {
		var obj = document.getElementById(coId+i);
		if (obj) { obj.style.display = "none"; }
	}
	var obj = document.getElementById(coId+curr);
	if (obj) { obj.style.display = "block"; }
}
// class="Value" 정확히 일치시 보이기감추기
//ex) classDisplay('item restaurant','block');classDisplay('item lodging','none');
function classDisplay(tagClassVal,val) {
	var objs = getElementsByClassName(tagClassVal);
	for(var i=0; i<objs.length; i++) {
		objs[i].style.display = val;
	}
}
//모든 태그를 배열에 넣고 인수로 받아온 클래스이름과 일치하는 태그의 배열값을 배열로 리턴
function getElementsByClassName(clsName) { 
var arr = new Array(); 
	var elems = document.getElementsByTagName("*");
	for ( var i = 0; ( elem = elems[i] ); i++ ) {
		if ( elem.className == clsName ) {
			arr[arr.length] = elem;
		}
	}
	return arr;
}
// selector 일치시 보이기감추기
//ex) selectorDisplay('#business_register div.restaurant','block');selectorDisplay('#business_register div.lodging','none');
function selectorDisplay(selector,val) {
	var objs = document.getElementsBySelector(selector);
	for(var i=0; i<objs.length; i++) {
		objs[i].style.display = val;
	}
}


// 활성표시
//ex) activeOnly('id이름중공통되는부분',전체수,현재순번); //현재순번의 객체만 활성화한다.
function activeOnly(coId,num,curr) {
	for (i=1;i<= num;i++) {
		var obj = document.getElementById(coId+i);
		if (obj) { obj.style.fontWeight = "normal"; }
		if (obj) { obj.style.backgroundColor = "#fff"; }
		if (obj) { obj.style.letterSpacing = "-1px"; }
		if (obj) { obj.getElementsByTagName("a")[0].style.color = "#666"; }
	}
	var obj = document.getElementById(coId+curr);
	if (obj) { obj.style.fontWeight = "bold"; }
	if (obj) { obj.style.backgroundColor = "#fa4"; }
	if (obj) { obj.style.letterSpacing = "-2px"; }
	if (obj) { obj.getElementsByTagName("a")[0].style.color = "#fff"; }
}

//이벤트위치에보여주기
function eventOnOff(a) {
	eventX = event.x;
	eventY = event.y;
	obj = document.getElementById(a);
	obj.style.left = eventX;
	obj.style.top = eventY;
	obj.style.visibility = "visible";
}



/********************************팝업존 ********************************************************************/

var popup_timer = null;
var popup_delay_time = 6000;
var popup_pause = false;
var popup_button_pause = false;
var select_popup_num = 1;
var popup_object_num = 20; 

function popup_open(url, target, width, height){
	if( url == '') return ;
	window.open(url, target, 'width='+width+',height='+height);
}

function popup_display(popupIDX, move) {
	if(!popupIDX)  {
		popupIDX = select_popup_num;
		if(popup_pause==true && !move) return;
		if(popup_button_pause==true && !move) return;
		if(!move) move = 'next';
		hide_popup(popupIDX);
	}else{
		hide_popup(select_popup_num);
	}
	if(move=='prev') {
		if(popupIDX==1) {
			popupIDX = popup_object_num;
		} else {
			popupIDX--;
		}
	} else if(move=='next') {
		if(popupIDX==popup_object_num) {
			popupIDX = 1;
		} else {
			popupIDX++;
		}
	} else if(move=='pause') {
		if(popup_button_pause==true) {
			popup_button_pause=false;	
			document.getElementById("popup_pause_img02").src='/images/gmi/niam/b_stop.png';
			document.getElementById("popup_pause_img02").alt='일시정지';
		} else if(popup_button_pause==false) {
			popup_button_pause=true;	
			document.getElementById("popup_pause_img02").src='/images/gmi/niam/b_play.png';
			document.getElementById("popup_pause_img02").alt='재생';
		}
	}
	show_popup(popupIDX);
	select_popup_num = popupIDX;



}

function hide_popup(num) {

	document.getElementById("popupzoneImage" + num).style.display = 'none';

	document.getElementById("popupzoneNumber" + num).style.display = 'none';

}

function show_popup(num) {

	document.getElementById("popupzoneImage" + num).style.display = 'block';

	document.getElementById("popupzoneNumber" + num).style.display = 'block';

}

function popup_scroll(count ) {
	popup_object_num = count;
	popup_timer = setInterval("popup_display()",popup_delay_time); 


//	document.getElementById("popupzoneImage1").style.display = 'block';



}


/*배너모음*/
	var bannerAuto=null;
	var bannerDirect="left"; 

	function bRightMv(){
		$(".banner_img").stop().animate(   
			{left:"-=942px"},0,function(){
					var $bannerObj=$(".banner_img li:first").clone(true);
					$(".banner_img li:first").remove(); 
					$(".banner_img").css("left",0); 
					$(".banner_img").append($bannerObj);
			} 
		)
			if(bannerAuto)clearTimeout(bannerAuto);
			bannerAuto=setTimeout(bRightMv,3000)
	}
	

	function bLeftMv(){
		$(".banner_img").stop().animate(
			{left:"0px"},0,function(){
					var $bannerObj=$(".banner_img li:last").clone(true);
					$(".banner_img li:last").remove(); 
					$(".banner_img").css("left","-942px"); 
					$(".banner_img").prepend($bannerObj);
			} 
		)
			
			if(bannerAuto)clearTimeout(bannerAuto);
			bannerAuto=setTimeout(bRightMv,3000) 
	}
	

$(document).ready(function(){
	bannerAuto=setTimeout(bRightMv,1000) 


		$bleftBtn=$(".banner_control .prev_banner a");
		$brightBtn=$(".banner_control .next_banner a");
		$bpauseBtn=$(".banner_control .pause_banner a");
		$bp_btn=$(".banner_control .pause_banner a img")
		var bplay = false;

		$bleftBtn.click(function(){
			if (bplay == true){	
			bLeftMv();
			clearTimeout(bannerAuto); 
			}else{			
			bannerDirect="left"
			clearTimeout(bannerAuto);
			bLeftMv();
			return false;
			}
		})

		$brightBtn.click(function(){
			if (bplay == true){	
			bRightMv();
			clearTimeout(bannerAuto); 
			}else{			
			bannerDirect="right"
			clearTimeout(bannerAuto);
			bRightMv();
			return false;
			}
		});

		$bpauseBtn.click(function(){
			clearTimeout(bannerAuto);
			return false;
			bplay = false;
		});
		
		$bpauseBtn.click(function(){	
			if (bplay == false){	
			clearTimeout(bannerAuto); 
			$bp_btn.attr("src","/images/gmi/cni/banner_btn_play.gif");
			$bp_btn.attr("alt","배너재생");
			bplay = true;
			}else{			
			bplay = false;
			$bp_btn.attr("src","/images/gmi/cni/banner_btn_stop.gif");
			$bp_btn.attr("alt","배너정지");
			bannerAuto=setTimeout(bRightMv,500) 
			}
		});
		//$(".banner_img a").bind('mouseover focusin' , function(){
		//	clearTimeout(bannerAuto);
		//});

		//$(".banner_img a").mouseleave(function(){
		//	bplay = false;
		//	clearTimeout(bannerAuto);
		//	bRightMv();
		//	$bp_btn.attr("src","/gmi/main/banner_btn_stop.gif");
		//	$bp_btn.attr("alt","배너정지");
		//});


});

