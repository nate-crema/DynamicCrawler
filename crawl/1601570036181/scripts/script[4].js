/*

Base URL: /P_js/gnb.js || Script sequence: [4]

*/

var oneNum = -1;
var twoNum = -1;
jQuery(document).ready(function(){
	//top
	//jQuery(".top ul").children("li").removeClass("on");
	jQuery(".top ul").children("li").each(function(q){
		jQuery(this).mouseover(function(){
			jQuery("#header").stop(true, true).delay(300).animate({height:162}, 400, "easeOutCubic");
			jQuery(".top ul").children("li").removeClass("on");
			jQuery(this).addClass("on");
		});

		jQuery(this).mouseout(function(){
			jQuery("#header").stop(true, true).delay(300).animate({height:32}, 400, "easeOutCubic", function(){jQuery(this).removeClass("on");});
		})
		jQuery(this).focusin(function(){
			jQuery("#header").stop(true, true).delay(300).animate({height:162}, 400, "easeOutCubic");
			jQuery(".top ul").children("li").removeClass("on");
			jQuery(this).addClass("on");
		}).focusout(function(){
			jQuery("#header").stop(true, true).delay(300).animate({height:32}, 400, "easeOutCubic", function(){jQuery(this).removeClass("on");});
		})
	})


	//gnb
	if(oneNum != -1) activeSub();
	jQuery(".gnb ul").children("li").each(function(q){
		jQuery(this).mouseenter(function(){
			if(oneNum != -1) {
				jQuery(".gnb ul").children("li").eq(oneNum).removeClass("on");
			}
			jQuery(".gnbDiv").stop().animate({height:380}, 400, "easeOutCubic");
			jQuery(this).addClass("on");
		}).focusin(function(){
			jQuery(this).mouseenter();
		})

		jQuery(this).mouseleave(function(){
			jQuery(this).removeClass("on");
			jQuery(".gnbDiv").stop().animate({height:92}, 400, "easeOutCubic");

			if(oneNum != -1) {
				activeSub()
			}
		}).focusout(function(){
			jQuery(this).mouseleave();
		})

		jQuery(this).find(".twoDep").find("a").each(function(){
			jQuery(this).mouseover(function(){
			})

			jQuery(this).mouseout(function(){
			})
		})
	})
})

function activeSub()
{
	jQuery(".gnb ul").children("li").eq(oneNum).addClass("on");
}




