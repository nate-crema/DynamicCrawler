
	(function ellipsis() {
		var wel = $Element($$.getSingle("dd.ellipsis_content a"));
		var sParent = $Element($$.getSingle("dd.ellipsis_content"));

		if (!wel || !sParent) {
			return;
		}

		var sText = wel.text();
		var sLength = sText.length;

		for(var count = 1; count <= sLength; count++) {
			if (wel.height() > sParent.height()) {
				var cutText = sText.slice(0, count * (-1));
				wel.text(cutText + ' . . .');
			} else {
				break;
			}
		}
	})();
