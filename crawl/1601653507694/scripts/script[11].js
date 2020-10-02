/*

Base URL: /resource/common/jquery_plugin/validation/accessability.js || Script sequence: [11]

*/

/*--
    웹접근성 체크, harangida@gmail.com
    Copyright (C) 2018, harangi
	All rights reserved.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are
    met:

        * Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.
        * Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.
        * Neither the name of the <ORGANIZATION> nor the names of its
        contributors may be used to endorse or promote products derived from
        this software without specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
    IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
    TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
    PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER
    OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
    EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
    LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
    NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
    SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

--*/
function checkAccessability(title,target) {
	var result = true;

	/*
	이미지 alt 체크
	콘텐츠내에 이미지 요소를 모두 찾아 alt 속성 존재여부와 속성값이 존재하는지 확인
	*/
	$("#" + target + " img").each(function(index, item){
//		console.log(index + " alt : " + $(this).attr("alt"));
		var isAlt = $(this).is('[alt]');//boolean
		if (!isAlt && result) {
			result = false;
			alert("["+title+"] "+(index+1)+"번째 이미지 alt 속성이 존재하지 않습니다.");
		}

		if (result) {
			var altTxt = $(this).attr("alt");
			if (!altTxt || altTxt == "") {
				result = false;
				alert("["+title+"] "+(index+1)+"번째 이미지 alt 속성값이 비어있습니다.");
			}
		}
	});

//	result = true;
	/*
	테이블 summary, caption 체크
	*/
	$("#" + target + " table").each(function(index, item){
		/*
		콘텐츠내에 테이블 요소를 모두 찾아 summary 속성 존재여부와 속성값 체크
		*/
		var summary = true;
//		console.log(index + " summary : " + $(this).attr("summary"));
		var isSummary = $(this).is('[summary]');//boolean
		if (!isSummary && summary) {
			summary = false;
//			alert((index+1)+"번째 표에 summary 속성이 존재하지 않습니다.");
		}

		if (summary) {
			var summaryTxt = $(this).attr("summary");
			if (!summaryTxt || summaryTxt == "") {
				summary = false;
//				alert((index+1)+"번째 표에 summary 속성값이 비어있습니다.");
			}
		}

		/*
		caption 요소 존재여부와 요소값 확인
		*/
		var caption = true;
		var isCaption = $(this).find("caption").length;
//		console.log(index + " caption : " + isCaption);
		if (isCaption == 0 && caption) {
			caption = false;
		}

		if (caption) {
			var captionTxt = $(this).find("caption").text();
//			console.log(index + " caption : " + captionTxt);
			if (!captionTxt || captionTxt == "") {
				caption = false;
			}
		}

		if (result && (!summary && !caption)) {
			result = false;
			alert("["+title+"] "+(index+1)+"번째 표에 summary 와 caption 값이 존재하지 않습니다.");
		}
	});

	return result;
}