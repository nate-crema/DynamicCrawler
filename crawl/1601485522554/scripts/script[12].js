
			var agent = navigator.userAgent.toLowerCase();

			function loadEvent(){
				try{
					getGNB();
				}catch(ex){

				}
				new naver.comic.RealtimeRankLayer();
				if ( $("uploadLinkId") ){
					$Fn(function(oEvent) {
						oEvent.stop();
						if ("true" != "false") {
							if (!confirm('로그인해야 이용할 수 있습니다. 로그인 하겠습니까?'))
								return false;
							else {
								location.href = "https://nid.naver.com/nidlogin.login?mode=form&url="
										+ encodeURIComponent("https://" + location.host
												+ "/upload/upload.nhn");
								return;
							}
						}
						location.href = "/upload/upload.nhn";
						return true;
					}).attach($("uploadLinkId"),"click");
				}
				naver.comic.oArtistAction = new naver.comic.Artist();
				artistAction = naver.comic.oArtistAction;
				naver.comic.oSearchBar = new naver.comic.SearchBarOptionActHandler();

				// GNB 이벤트 재정의.
				$Fn(function(oEvent){
					var aWtChild = $Element("gnb" ).child(function (v){return true;});
					var wtSrc = $Element(oEvent.element);
					var bContain = false;
					for (var i = 0 ; i < aWtChild.length ;i++){
						if ( aWtChild[i].$value() == wtSrc.$value()){
							bContain = true;
							break;
						}
					}
					if ( !bContain && gnbAllLayerClose ){
						gnbAllLayerClose();

					}

				}).attach(document,"click");
			}
			$Fn(loadEvent).attach(window,'load');
		