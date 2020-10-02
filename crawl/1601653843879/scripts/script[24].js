/*

HTML-WRITTEN FILE || Script sequence: [24]

*/


	$('.tabList li a').click(function(){
		$('.tabList li').attr('data-selected','false');
		$(this).parent().attr('data-selected','true');

		$(this).closest('div').find('.tabpanel_wrap').children('div').hide();
		$('#'+$(this).parent().attr('data-controls')).show();

	});
	