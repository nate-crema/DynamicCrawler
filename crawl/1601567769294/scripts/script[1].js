/*

Base URL: /js/dext5/common.js?v=180726_2 || Script sequence: [1]

*/

function chkInputData(p_o, p_m){
	var obj = $(p_o);
	if(obj.value.isNullOrEmpty()){
		alert(p_m);
		obj.focus();
		return false;
	}
	else{
		return true;
	}
}

String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)|($\s*)/g, "");
}

String.prototype.bytes = function(){
    var str = this;
    var l = 0;
    for (var i=0; i<str.length; i++) 
     l += (str.charCodeAt(i) > 128) ? 2 : 1;
	
    return l;
}

String.prototype.isNullOrEmpty=function(){
	if(this==null) return true;
	if(this=="undefined") return true;
	if(this.trim()=="") return true;
	return false;
}

function $(id){
	return document.getElementById(id);
}

function xmlhttpPost(strURL, strSubmit, strResultFunc) {
    var xmlHttpReq = false;

    if (window.ActiveXObject) {
        // IE
        xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest) {
        // Mozilla/Safari
        xmlHttpReq = new XMLHttpRequest();
        xmlHttpReq.overrideMimeType('text/xml');
    }

    xmlHttpReq.open('POST', strURL, true);
    xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xmlHttpReq.onreadystatechange = function() {
        if (xmlHttpReq.readyState == 4) {
            eval(strResultFunc + "(xmlHttpReq.responseText);");
            //fnResult(xmlHttpReq.responseText;)
        }
    }

    xmlHttpReq.send(strSubmit);

    if (xmlHttpReq.readyState == 4) {
        strResponse = xmlHttpReq.responseText;
        switch (xmlHttpReq.status) {
            // Page-not-found error  
            case 404:
                alert('Error: Not Found. The requested URL ' + strURL + ' could not be found.');
                break;
            // Display results in a full window for server-side errors  
            case 500:
                handleErrFullPage(strResponse);
                break;
            default:
                // Call JS alert for custom error or debug messages
                if (strResponse.indexOf('Error:') > -1 ||
                    strResponse.indexOf('Debug:') > -1) {
                    alert(strResponse);
                }
                // Call the desired result function
                else {
                    eval(strResultFunc + '(strResponse);');
                }
                break;
        }
    }
}

function paramEscape(paramValue) {
    return encodeURIComponent(paramValue);
}

function formData2QueryString(docForm) {
    var submitString = "";
    var formElement = "";
    var lastElementName = "";

    for (i = 0; i < docForm.elements.length; i++) {
        formElement = docForm.elements[i];

        switch (formElement.type) {
            case 'text':
            case 'select-one':
            case 'hidden':
            case 'password':
            case 'textarea':
                submitString += formElement.name + '=' + paramEscape(formElement.value) + '&';
                break;
            case 'radio':
                if (formElement.checked) {
                    submitString += formElement.name + '=' + paramEscape(formElement.value) + '&';
                }
                break;
            case 'checkbox':
        }
    }

    return submitString;
}

function $(id){
	return document.getElementById(id);
}

function fProductH() {
	window.open("http://www.dext5.com");
}