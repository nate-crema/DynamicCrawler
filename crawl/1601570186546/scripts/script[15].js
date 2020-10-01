/*

Base URL: /resource/templete/nl/js/common.js || Script sequence: [15]

*/

$(function(){
		 //sns 공유하기 애니메이션
	$(".menu__set-share").click(function(e){
        e.preventDefault();
        var $target = $(e.currentTarget).parents('.menu__set').find('.menu-sns');
        var isCollapsed = $target.hasClass('is_sns_opened');

        if(isCollapsed) {
            $target.removeClass('is_sns_opened');
            $target.find('.my_welfare_info').stop().slideDown(function () {
              $(this).removeAttr('style');
            });
            $target.attr("aria-label","SNS 공유하기 축소됨");
        } else {
            $target.addClass('is_sns_opened');
            $target.find('.my_welfare_info').stop().slideUp(function () {
              $(this).attr('style', 'display:none');
            });
            $target.attr("aria-label","SNS 공유하기 확장됨");
        }
    });
});

$(document).on('click', '.all_menu, .header .menu_wrap .gnb_wrap .menu', function(){
	$('.header .menu_wrap .gnb_wrap .menu').toggle();
});





