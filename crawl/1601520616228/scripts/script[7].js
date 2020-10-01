
				//<![CDATA[
				// 새창 이동
				function moveSite(selId) {
					if(selId == null || selId == '' || $.trim($('#'+selId).val()) == '') {
						alert('항목을 선택하세요.');
						$('#'+selId).focus();
						return ;
					} else {
						window.open($('#'+selId).val(), "_blank");
					}
				}
				//]]>
				