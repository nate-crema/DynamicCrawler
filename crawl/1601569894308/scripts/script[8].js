/*

HTML-WRITTEN FILE || Script sequence: [8]

*/


		function login()
		{
			$("#loginFrm").submit();			
		}
		
		function logout()
		{				
			if(confirm("로그아웃하시겠습니까?"))
				document.location.href="/logout.do";												
		}
		/*function showFull(id)
		{
			$("#abs_div_"+id).toggle();
			$("#full_div_"+id).toggle();
		}	*/
		
		function queryTag(tag)
		{
			$(".divTagList").hide();
			$("#div_id_taglist_"+tag).show();
		}
		
		function queryTagTmp(tag)		
		{
			
			$("#search_tag_name").val(name);		
			
			
			$("#ul_wrap li").removeClass("on");
			$("#li_"+id).addClass("on");
			
			var frm = $("#listSaveForm");		
			var sendData = frm.serialize();
			
			$("#div_id_taglist").html('');
			
			$.ajax({
				type: "POST",
				url : "/ajax/queryMyList.do",
				data: sendData,
				//dataType: "json",
				//contentType:"application/json;charset=UTF-8",
				//async: true,
				success : function(data, status, xhr) {
					 
					 $.each(data, function(index, item){
						 $.each(item.list, function(index2, d){
							 
							 var val = setList(d);
							 
							 var html = $("#div_id_taglist").html();
							 html += val;
							 $("#"+id).html(html);
				        	});
							 	 
			        	});
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert(jqXHR.responseText);
				}
			});			
		}
		
		
		function addGood(review_id)
		{
				var frm = $("#historyFrm");
				//frm = $("#searchFrm");
				var sendData = "review_id="+review_id;						
				//alert(sendData);
				$.ajax({
					type: "POST",
					url : "/ajax/insertReviewFavor.do",
					data: sendData,
					//dataType: "json",
					//contentType:"application/json;charset=UTF-8",
					//async: true,
					success : function(data, status, xhr) {
						 $.each(data, function(index, item){
							 
								 if(item.code=='not_login')
								{
									 if(confirm(item.msg))
									 {
										 goLogin();
									 }
									 
								}
								 else									 
								 {	 
									 alert(item.msg);
									 if(item.code=="ok")
									 {	
										 //location.reload();
										 
										 val = $("#cnt_"+review_id).html();
										 val *=1;
										 val +=1; 
										
										 $("#cnt_"+review_id).val(val);
										 $("#cnt_"+review_id).html(val);
										 $("#cnt_"+review_id).addClass("sel_good");
										 $("#a_href_"+review_id).removeClass("good");
										 
										 
								 	}
									 
								 }
				        	
				        	});
					},
					error: function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR.responseText);
					}
				});			
				
			
		}
		function logout()
		{	
			if(confirm("로그아웃하시겠습니까?"))
				document.location.href="/logout.do";	
			
		}
		
		function goLogin()
		{		
			$("#top_login_Frm").attr("action","/login.do");
			//$("#top_login_Frm").attr("target","_blank");
			var returnUrl =  window.location.href;  
			
			$("#top_login_Frm input[name=returnUrl]").val(returnUrl);
			//returnUrl =$("#top_login_Frm input[name=returnUrl]").val()  ;
			//alert(returnUrl);
			$("#top_login_Frm").submit();
		}
		
		function checkLogin()
		{
			if(confirm('로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?'))
			{
				goLogin();
				return false;
			}
		}

		/** 로깅 설정 **/
		nLogger.configure({
			nth_service_id: 					"dlibrary", 							// 로그 생성 단위, 첨부파일 참조
			nth_logging_url_base_http: 	"https://ds.nl.go.kr/nlog", 	// 수집 서버 주소
			nth_logging_url_base_https: 	"https://ds.nl.go.kr/nlog" 	// 수집 서버 주소
		});

		/** 기본 페이지뷰 로깅 **/
		nLogger.log();
		
	
