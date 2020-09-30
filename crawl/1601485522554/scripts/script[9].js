

    new mainGenreInfo("Update", "omnibus");

    function goSeries(url) {
        var seriesPopup = window.open("https://series.naver.com" + url, "series", "left=0, top=0, menubar=yes, resizable=yes, scrollbars=yes, status=yes, titlebar=yes, toolbar=yes, directories=yes, location=yes");
        seriesPopup.focus();
    }



