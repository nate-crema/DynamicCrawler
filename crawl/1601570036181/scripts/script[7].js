/*

HTML-WRITTEN FILE || Script sequence: [7]

*/


$(document).ready( function() {
	widFix();
	$(window).resize( function() { widFix(); });
});

function widFix() {
	wid = $(window).width();
	
	if (wid < 790) {
		$(".link_btn02").removeClass('none');
    } else {
        $(".link_btn02").addClass('none');
	}
}
