/*

Base URL: /P_js/mt_navi/pushy.min.js || Script sequence: [6]

*/

/*! Pushy - v0.9.1 - 2013-9-16
* Pushy is a responsive off-canvas navigation menu using CSS transforms & transitions.
* https://github.com/christophery/pushy/
* by Christopher Yee */
jQuery(function(){function h(){t.toggleClass(o);e.toggleClass(s);n.toggleClass(u);r.toggleClass(a)}function p(){t.addClass(o);e.animate({left:"0px"},l);n.animate({left:c},l);r.animate({left:c},l)}function d(){t.removeClass(o);e.animate({left:"-"+c},l);n.animate({left:"0px"},l);r.animate({left:"0px"},l)}var e=jQuery(".pushy"),t=jQuery("body"),n=jQuery("#container"),r=jQuery(".push"),i=jQuery(".site-overlay"),s="pushy-left pushy-open",o="pushy-active",u="container-push",a="push-push",f=jQuery(".SideBtn, .pushy a"),l=260,c=e.width()+"px";if(Modernizr.csstransforms3d){f.click(function(){h()});i.click(function(){h()})}else{e.css({left:"-"+c});n.css({"overflow-x":"hidden"});var v=!0;f.click(function(){if(v){p();v=!1}else{d();v=!0}});i.click(function(){if(v){p();v=!1}else{d();v=!0}})}});