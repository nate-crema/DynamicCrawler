/*

HTML-WRITTEN FILE || Script sequence: [10]

*/


    [
      '#search-query-nav',
      '#search-query-sidebar',
      '#search-query-menu'
    ].forEach(function (selector) {
      if (!document.querySelector(selector)) return
      // search index defaults to v2
      var match = window.location.pathname.match(/^\/(v\d+)/)
      var version = match ? match[1] : 'v2'
      docsearch({
      appId: 'BH4D9OD16A',
      apiKey: '85cc3221c9f23bfbaa4e3913dd7625ea',
      indexName: 'vuejs',
      inputSelector: selector,
      algoliaOptions: { facetFilters: ["version:" + version] },
      autocompleteOptions: { hint: false, appendTo: 'body'}
      })
    })
    