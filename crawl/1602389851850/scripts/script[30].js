/*

HTML-WRITTEN FILE || Script sequence: [30]

*/


    (function() {
      var setFiller = function() {
        var fillerData = {
          browse: {
            filler: true,
            page: 'browse'
          },
          home: {
            filler: true,
            page: 'home',
            endpoint: {
              commandMetadata: {
                webCommandMetadata: {
                  url: "/",
                  webPageType: "WEB_PAGE_TYPE_BROWSE"
                }
              },
              urlEndpoint: {
                url: "/"
              }
            },
            response: {
              contents: {
                twoColumnBrowseResultsRenderer: {
                  tabs: [{
                    tabRenderer: {
                      selected: true,
                      content: {
                        richGridRenderer: {
                          contents: [],
                          continuations: [{
                            nextContinuationData: {continuation: ''}
                          }]
                        }
                      }
                    }
                  }]
                }
              }
            }
          },
          search: {
            filler: true,
            page: 'search',
            endpoint: {
              commandMetadata: {
                webCommandMetadata: {
                  url: "/results",
                  webPageType: "WEB_PAGE_TYPE_SEARCH"
                }
              },
              urlEndpoint: {
                url: "/results"
              }
            },
            response: {
              contents: {
                twoColumnSearchResultsRenderer: {
                  primaryContents: {
                    sectionListRenderer: {
                      contents: [],
                      subMenu: {
                        searchSubMenuRenderer: {}
                      }
                    }
                  },
                  secondaryContents: {
                    secondarySearchContainerRenderer: {
                      contents: []
                    }
                  }
                }
              }
            }
          },
          watch: {
            filler: true,
            page: 'watch',
            endpoint: {
              commandMetadata: {
                webCommandMetadata: {
                  url: "/watch",
                  webPageType: "WEB_PAGE_TYPE_WATCH"
                }
              },
              urlEndpoint: {
                url: "/watch"
              }
            },
            playerResponse: {
              playabilityStatus: {
                status: 'OK'
              }
            },
            response: {
              contents: {
                twoColumnWatchNextResults: {
                  results: {
                    results: {
                      contents: [{
                        videoPrimaryInfoRenderer: {},
                        videoSecondaryInfoRenderer: {}
                      }]
                    }
                  },
                  secondaryResults: {
                    secondaryResults: {}
                  }
                }
              }
            }
          }
        };

        window.ytcfg.set('FILLER_DATA', fillerData);
      };

        var csn = null, previousCsn = null, endpoint = null, url = null;
          endpoint = {"commandMetadata":{"webCommandMetadata":{"url":"/","webPageType":"WEB_PAGE_TYPE_BROWSE","rootVe":3854}},"urlEndpoint":{"url":"/"}};
          url = "\/";

        window['chp_ssr'](
            csn,
            previousCsn,
            endpoint,
            "browse",
            window["ytInitialData"],
            window["ytInitialDataPbjPromise"],
            url,
            setFiller);

    })();


  