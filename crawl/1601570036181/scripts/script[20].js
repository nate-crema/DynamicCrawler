/*

HTML-WRITTEN FILE || Script sequence: [20]

*/


	$(document).ready(function() {
		$(".short_tt > .prev_ar").click(function() {
			console.log(1);
			$(".shortcut_list").find("ul").prepend($(".shortcut_list").find("li:last"));
		});

		$(".short_tt > .next_ar").click(function() {
			console.log(2);
			$(".shortcut_list").find("ul").append($(".shortcut_list").find("li:first"));
		});
	})
