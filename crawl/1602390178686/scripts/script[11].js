/*

HTML-WRITTEN FILE || Script sequence: [11]

*/

'use strict';'serviceWorker'in navigator&&navigator.serviceWorker.register('service-worker.js').then(function(a){a.onupdatefound=function(){var b=a.installing;b.onstatechange=function(){switch(b.state){case'installed':navigator.serviceWorker.controller?console.log('New or updated content is available.'):console.log('Content is now available offline!');break;case'redundant':console.error('The installing service worker became redundant.');}}}}).catch(function(a){console.error('Error during service worker registration:',a)});
