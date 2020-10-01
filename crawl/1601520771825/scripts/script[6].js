
		//전체주소
		console.log("url 1 : "+$(location).attr('href'));

		//http:, localhost:port번호, index.html ?test=tttt 순으로 나누어져 있습니다.
		console.log("url 2 : "+$(location).attr('protocol')+"//"+$(location).attr('host')+""+$(location).attr('pathname')+""+$(location).attr('search'));
	