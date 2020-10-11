/*

Base URL: /resource/common/js/jquery.outside.js || Script sequence: [8]

*/

!function(i,s,c){function e(t,n){n=n||t+c;var u=i(),e=t+"."+n+"-special-event";function o(e){i(u).each(function(){var t=i(this);this===e.target||t.has(e.target).length||t.triggerHandler(n,[e.target])})}i.event.special[n]={setup:function(){1===(u=u.add(this)).length&&i(s).bind(e,o)},teardown:function(){0===(u=u.not(this)).length&&i(s).unbind(e)},add:function(t){var n=t.handler;t.handler=function(t,e){t.target=e,n.apply(this,arguments)}}}}i.map("click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup".split(" "),function(t){e(t)}),e("focusin","focus"+c),e("focusout","blur"+c),i.addOutsideEvent=e}(jQuery,document,"outside");