
    try {
        var eventType = "onpageshow" in window ? "onpageshow" : "onload";
        var oldEvent = window[eventType];
        window[eventType] = function() {
            if (oldEvent) {
                oldEvent();
            }
            lcs_do();
        };
    } catch(ex) { }
