/*

Base URL: https://ds.nl.go.kr/js/nlogger.js || Script sequence: [27]

*/

var Nethru = window.Nethru || {};

Nethru.Settings = function() {
    // 서비스 ID
    var NTH_SERVICE_ID = "sample";

    // 로깅서버 URL
    var NTH_LOGGING_URL_BASE_HTTP = "http://nlog.nethru.io/nlog";
    var NTH_LOGGING_URL_BASE_HTTPS = "https://nlog.nethru.io/nlog";

    // 단말 ID
    var NTH_PCID = "nth_pcid";
    var NTH_PCID_KEY = "PCID";
    var NTH_PCID_DOMAIN = undefined;
    var NTH_ALWAYS_HAS_PCID = false;

    // 회원 ID
    var NTH_UID = "nth_uid";
    var NTH_UID_KEY = "ndl_user_id";
    var NTH_UID_DOMAIN = undefined;

    // XHR
    var NTH_XHR_ENABLED = true;
    var NTH_XHR_WITH_CREDENTIALS = false;

    return {
        serviceId: NTH_SERVICE_ID,
        loggingUrlBaseHttp: NTH_LOGGING_URL_BASE_HTTP,
        loggingUrlBaseHttps: NTH_LOGGING_URL_BASE_HTTPS,
        pcidLoggingKey: NTH_PCID,
        pcidStorageKey: NTH_PCID_KEY,
        pcidDomain: NTH_PCID_DOMAIN,
        alwaysHasPcid: NTH_ALWAYS_HAS_PCID,
        uidLoggingKey: NTH_UID,
        uidStorageKey: NTH_UID_KEY,
        uidDomain: NTH_UID_DOMAIN,
        xhrEnabled : NTH_XHR_ENABLED,
        xhrWithCredentials : NTH_XHR_WITH_CREDENTIALS,
        uidStorageType: 'Cookie',
        pcidStorageType: 'Cookie',
        adInflowStorageType: 'SessionStorage',
        queueCapacity : 100,
        timeout: 3000
    };
}();var Nethru = window.Nethru || {};

Nethru.Util = function() {
    var _this = {};

    _this.copyObject = function(val) {
        return JSON.parse(JSON.stringify(val));
    };

    _this.extendObject = function() {
        var extended = {};

        for(var index = 0; index < arguments.length; index++) {
            var source = arguments[index];

            for(var prop in source) {
                if(Object.prototype.hasOwnProperty.call(source, prop))
                    extended[prop] = source[prop];
            }
        }

        return extended;
    };

    _this.extendClass = function(childClass, parentClass) {
        childClass.prototype = new parentClass();
        childClass.prototype.constructor = childClass;
        childClass.prototype._super = parentClass.prototype;
    };

    _this.objectToString = function(obj, delimeter, skipNull) {
        var result = "";

        for(var prop in obj) {
            if(Object.prototype.hasOwnProperty.call(obj, prop)) {
                if(skipNull && !obj[prop]) continue;

                if(result.length > 0) result += delimeter;
                result += prop + "=" + encodeURIComponent(obj[prop]);
            }
        }

        return result;
    };

    _this.toQueryString = function(obj, skipNull) {
        return _this.objectToString(obj, "&", skipNull);
    };

    _this.toCookieString = function(obj, skipNull) {
        return _this.objectToString(obj, "; ", skipNull);
    };

    _this.generateUuid = function() {
        var result = "";

        if(typeof window.crypto != 'undefined' && typeof window.crypto.getRandomValues != 'undefined') {
            var buf = new Uint16Array(8);
            window.crypto.getRandomValues(buf);
            var S4 = function (num) {
                var ret = num.toString(16);
                while (ret.length < 4) {
                    ret = "0" + ret;
                }
                return ret;
            };

            result = (S4(buf[0]) + S4(buf[1]) + "-" + S4(buf[2]) + "-"
            + S4(buf[3]) + "-" + S4(buf[4]) + "-" + S4(buf[5])
            + S4(buf[6]) + S4(buf[7]));
        }
        else {
            result = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
                function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r
                        : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
        }

        return result + '-' + new Date().getTime();
    };

    _this.fallbackForInternetExplorer = function() {
        if(typeof console === "undefined" || typeof console.log === "undefined") {
            console = {
                log: function() {},
                debug: function() {},
                info: function() {},
                error: function() {},
                dir: function() {}
            };
        }
    };

    _this.configure = function(settings) {
        var converted = {};
        var keys = {
            nth_service_id: "serviceId",
            nth_logging_url_base_http: "loggingUrlBaseHttp",
            nth_logging_url_base_https: "loggingUrlBaseHttps",
            nth_pcid: "pcidLoggingKey",
            nth_pcid_key: "pcidStorageKey",
            nth_pcid_domain: "pcidDomain",
            nth_always_has_pcid: "alwaysHasPcid",
            nth_uid: "uidLoggingKey",
            nth_uid_key: "uidStorageKey",
            nth_uid_domain: "uidDomain",
            nth_xhr_enabled: "xhrEnabled",
            nth_xhr_with_credentials: "xhrWithCredentials"
        };

        for(var key in settings) {
            if(!settings.hasOwnProperty(key)) continue;
            converted[keys[key]] = settings[key];
        }

        Nethru.Settings = _this.extendObject(Nethru.Settings, converted);
    };

    _this.fallbackForInternetExplorer();

    return {
        copyObject: _this.copyObject,
        extendObject: _this.extendObject,
        extendClass: _this.extendClass,
        toQueryString: _this.toQueryString,
        toCookieString: _this.toCookieString,
        generateUuid: _this.generateUuid,
        configure: _this.configure
    }
}();

var Nethru = window.Nethru || {};

Nethru.BrowserInfo = function() {
    var _this = {};

    _this.updateUrlParameters = function(url, object) {
        for(var key in object) {
            if(object.hasOwnProperty(key)) {
                url = _this.updateUrlParameter(url, key, object[key]);
            }
        }

        return url;
    };

    _this.updateUrlParameter = function(url, key, value) {
        // remove the hash part before operating on the url
        var i = url.indexOf('#');
        var hash = i === -1 ? '' : url.substr(i);

        url = i === -1 ? url : url.substr(0, i);
        key = encodeURIComponent(key);
        value = encodeURIComponent(value);

        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = url.indexOf('?') !== -1 ? "&" : "?";

        if(url.match(re)) url = url.replace(re, '$1' + key + "=" + value + '$2');
        else url = url + separator + key + "=" + value;

        return url + hash;  // finally append the hash as well
    };

    _this.getDomain = function() {
        var domain = document.domain;
        if(_this.isIpType(domain)) return domain;

        var tokens = domain.split('.');
        var length = tokens.length;
        if(length !== 4 && length !== 3) return domain;

        var dm = tokens[length - 2] + '.' + tokens[length - 1];

        return tokens[length - 1].length === 2 ? tokens[length - 3] + '.' + dm : dm;
    };

    _this.isIpType = function(domain) {
        var ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

        return ipRegex.test(domain);
    };

    _this.getResolution = function() {
        var screenSize = "";
        var screen = window.screen;

        if(screen != null && typeof screen === "object") {
            screenSize = screen.width + "x" + screen.height;
        }

        return screenSize;
    };

    _this.getLanguage = function() {
        var language = "-";
        var navigator = window.navigator;

        if(navigator.language) language = navigator.language.toLowerCase();
        else if(navigator.userLanguage) language = navigator.userLanguage.toLowerCase();

        return language;
    };

    _this.getLocaleLanguage = function() {
        var splitLanguage = _this.getLanguage().split("-");

        if(splitLanguage.length > 0) return splitLanguage[0];
        else return "";
    };

    _this.getLocaleCountry = function() {
        var splitLanguage = _this.getLanguage().split("-");

        if(splitLanguage.length > 1) return splitLanguage[1];
        else return "";
    };

    _this.getReferer = function() {
        var myRef = self.document.referrer;
        var parentHref = "";
        var parentRef = "";

        try {
            parentHref = top.document.location.href;
            parentRef = top.document.referrer;
        } catch (e) {
            return myRef;
        }

        if(myRef === parentHref) return parentRef;

        return myRef;
    };

    _this.getQueryStringValueByName = function(name) {
        name = name.replace(/[\[\]]/g, "\\$&");

        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        var url = window.location.href;
        var results = regex.exec(url);

        if(!results) return null;
        if(!results[2]) return '';

        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    return {
        updateUrlParameters: _this.updateUrlParameters,
        getResolution: _this.getResolution,
        getLanguage: _this.getLanguage,
        getReferer: _this.getReferer,
        getDomain: _this.getDomain,
        getDomainWithPort: function() {
            var port = location.port;
            if (port === undefined || port === "" || port === "0" || port === 0) {
                return _this.getDomain();
            }

            return _this.getDomain() + ":" + port;
        },
        getUserAgent: function() {
            return navigator.userAgent;
        },
        getFullURL: function() {
            return self.location.href;
        },
        getQueryStringValueByName: function(name, defaultValue) {
            if(!defaultValue) defaultValue = null;

            var value = _this.getQueryStringValueByName(name);
            return value === null ? defaultValue : value;
        },
        getAutoLoggingParameters: function() {
            return {
                nth_locale_lang: _this.getLocaleLanguage(),
                nth_locale_country: _this.getLocaleCountry(),
                nth_resolution: _this.getResolution(),
                nth_screen_id: document.location.pathname,
                nth_screen_title: document.title
            };
        }
    }
}();

var Nethru = window.Nethru || {};

Nethru.BaseStorage = function(storage) {
    var _this = {};

    _this.storage = storage;

    this.storageName = function() {
        throw new Error("Not Implemented");
    };

    this.isAvailable = function() {
        try {
            var x = '__storage_test__';
            _this.storage.setItem(x, x);
            _this.storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                    // Firefox를 제외한 모든 브라우저
                e.code === 22 ||
                    // Firefox
                e.code === 1014 ||
                    // 코드가 존재하지 않을 수도 있기 때문에 테스트 이름 필드도 있습니다.
                    // Firefox를 제외한 모든 브라우저
                e.name === 'QuotaExceededError' ||
                    // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                    // 이미 저장된 것이있는 경우에만 QuotaExceededError를 확인하십시오.
                storage.length !== 0;
        }
    };

    this.setStorage = function(storage) {
        _this.storage = storage;
    };

    this.get = function(key) {
        return _this.storage.getItem(key);
    };

    this.put = function(key, value) {
        _this.storage.setItem(key, value);
    };

    this.remove = function(key) {
        _this.storage.removeItem(key);
    };
};

Nethru.SessionStorage = function() {
    Nethru.BaseStorage.call(this, window.sessionStorage);

    this.storageName = function() {
        return 'sessionStorage';
    };
};
Nethru.Util.extendClass(Nethru.SessionStorage, Nethru.BaseStorage);

Nethru.LocalStorage = function() {
    Nethru.BaseStorage.call(this, window.localStorage);

    this.storageName = function() {
        return 'localStorage';
    };
};
Nethru.Util.extendClass(Nethru.LocalStorage, Nethru.BaseStorage);

Nethru.Cookie = function() {
    this.storageName = function() {
        return 'cookie';
    };

    this.isAvailable = function() {
        return navigator.cookieEnabled;
    };

    this.get = function(key) {
        var result = new RegExp('(?:^|; )' + key + '=([^;]*)').exec(document.cookie);

        return (result != null) ? decodeURIComponent(result[1]) : null;
    };

    this.put = function(key, value, options) {
        if(!options) options = {};

        var expires = options.expires;
        var path = options.path;
        var domain = options.domain ? options.domain : (options.domain === undefined ? Nethru.BrowserInfo.getDomain() : null);

        document.cookie = key + '=' + encodeURIComponent(value) + ';' +
            (expires ? 'expires=' + expires + ';' : '') +
            (path ? 'path=' + path + ';' : '') +
            (domain ? 'domain=' + domain : '');
    };

    this.remove = function(key, options) {
        options = Nethru.Util.extendObject(options || {}, {
            "expires": "Thu, 01-Jan-1970 00:00:01 GMT"
        });

        this.put(key, "", options);
    };
};
Nethru.Util.extendClass(Nethru.Cookie, Nethru.BaseStorage);

Nethru.Storage = function() {
    var _this = {};

    _this.sessionStorage = new Nethru.SessionStorage();
    _this.localStorage = new Nethru.LocalStorage();
    _this.cookie = new Nethru.Cookie();

    _this.getStorage = function(type) {
        type = type.toUpperCase();

        if(type === _this.sessionStorage.storageName().toUpperCase()) return _this.sessionStorage;
        else if(type === _this.localStorage.storageName().toUpperCase()) return _this.localStorage;
        else if(type === _this.cookie.storageName().toUpperCase()) return _this.cookie;

        return _this.cookie;
    };

    return {
        getStorage: _this.getStorage
    };
}();

Nethru.AdInflowStorage = function(storageType) {
    var _this = {};

    _this.storage = Nethru.Storage.getStorage(storageType);
    _this.STORAGE_KEY = 'nLogger_adInflow';

    this.add = function(adInflow) {
        if(!(adInflow instanceof Nethru.AdInflow))
            throw new Error('input is not type of AdInflow');

        _this.storage.put(_this.STORAGE_KEY, JSON.stringify(adInflow.asObject()));
    };

    this.clear = function() {
        _this.storage.remove(_this.STORAGE_KEY);
    };

    this.readData = function() {
        var adInflowObject = JSON.parse(_this.storage.get(_this.STORAGE_KEY));
        return adInflowObject ? adInflowObject : {};
    };
};

Nethru.StorageManager = function() {
    var _this = {};

    _this.pcidStorage = Nethru.Storage.getStorage(Nethru.Settings.pcidStorageType);
    _this.uidStorage = Nethru.Storage.getStorage(Nethru.Settings.uidStorageType);
    _this.adInflowStorage = new Nethru.AdInflowStorage(Nethru.Settings.adInflowStorageType);

    _this.pcidToStorage = function(id) {
        var date = new Date();
        date.setFullYear(date.getFullYear() + 10);

        _this.pcidStorage.put(Nethru.Settings.pcidStorageKey, id, {
            path: "/",
            domain: Nethru.Settings.pcidDomain,
            expires: date.toUTCString()
        });
    };

    _this.pcidFromStorage = function() {
        return _this.pcidStorage.get(Nethru.Settings.pcidStorageKey);
    };

    _this.uidToStorage = function(id) {
        _this.uidStorage.put(Nethru.Settings.uidStorageKey, id, {
            path: "/",
            domain: Nethru.Settings.uidDomain
        });
    };

    _this.uidFromStorage = function() {
        return _this.uidStorage.get(Nethru.Settings.uidStorageKey);
    };

    _this.getAdInflowStorage = function() {
        return _this.adInflowStorage;
    };

    return {
        pcidToStorage: _this.pcidToStorage,
        pcidFromStorage: _this.pcidFromStorage,
        uidToStorage: _this.uidToStorage,
        uidFromStorage: _this.uidFromStorage,
        getAdInflowStorage: _this.getAdInflowStorage
    };
}();

var Nethru = window.Nethru || {};

Nethru.Request = function() {
    var _this = {};

    _this.createScriptElement = function(src, options) {
        var element = document.createElement('script');
        element.type = 'text/javascript';
        element.src = src;
        element.async = options.async;
        element.charset = 'UTF-8';

        if(options.onSuccess) {
            if(typeof element.onreadystatechange !== 'undefined') {
                element.onreadystatechange = function() {
                    if(this.readyState === 'complete' || this.readyState === 'loaded')
                        setTimeout(options.onSuccess, options.callBackTimeOutAsMillis);
                };
            }
            else {
                element.onload = function() {
                    setTimeout(options.onSuccess, options.callBackTimeOutAsMillis);
                };
            }
        }

        if(options.onError) {
            element.onerror = function() {
                setTimeout(options.onError, options.callBackTimeOutAsMillis);
            };
        }

        return element;
    };

    _this.appendElement = function(element) {
        var ssc = document.getElementsByTagName('script')[0];
        ssc.parentNode.insertBefore(element, ssc);
    };

    _this.removeElement = function(element) {
        if(typeof element.remove === 'function') element.remove();
        else element.parentNode.removeChild(element);   // For IE
    };

    /**
     * JSONP 방식으로 Http 요청을 보내는 함수
     *
     * @param src
     *     {String} 요청을 보낼 주소
     * @param options
     *     {Object} 요청에 필수적이지는 않지만 설정가능한 변수들을 모아놓은 변수
     *     @example
     *         {
     *              async: true,
     *              onSuccess: function() { console.log('success'); },
     *              onError: null,
     *              callBackTimeOutAsMillis: 400
     *         }
     */
    _this.requestByJsonp = function(src, options) {
        options = Nethru.Util.extendObject({
            async: true,
            onSuccess: null,
            onError: null,
            callBackTimeOutAsMillis: 400
        }, options);

        var script = _this.createScriptElement(src, options);
        _this.appendElement(script);
        _this.removeElement(script);
    };

    /**
     * XMLHttpRequest 방식으로 Http 요청을 보내는 함수
     *
     * @param src
     *     {String} 요청을 보낼 주소
     * @param options
     *     {Object} 요청에 필수적이지는 않지만 설정 가능한 변수들을 모아놓은 변수
     *     @example
     *         {
     *              async: true,
     *              onSuccess: function() { console.log('success'); },
     *                 onError: null,
     *              callBackTimeOutAsMillis: 400
     *         }
     */
    _this.requestByXhr = function(src, options) {
        options = Nethru.Util.extendObject({
            async: true,
            method: 'GET',
            data: null,
            onSuccess: null,
            onError: null,
            onAbort: null,
            callBackTimeOutAsMillis: 400
        }, options);

        var xmlHttpRequest = _this.createXmlHttpRequest();
        if (!xmlHttpRequest)
            return;

        var timer = setTimeout(function() {
            xmlHttpRequest.abort();
        }, Nethru.Settings.timeout);

        xmlHttpRequest.open(options.method, src, options.async);

        if (options.withCredentials) {
            xmlHttpRequest.withCredentials = Nethru.Settings.xhrWithCredentials;
        }

        xmlHttpRequest.onload = function() {
            clearTimeout(timer);
            if (options.onSuccess) {
                options.onSuccess();
            }
        };

        xmlHttpRequest.onerror = function() {
            clearTimeout(timer);
            if (options.onError) {
                options.onError();
            }
        };

        xmlHttpRequest.onabort = function() {
            if (options.onAbort) {
                options.onAbort();
            }
        };

        xmlHttpRequest.timeout = options.callBackTimeOutAsMillis;

        xmlHttpRequest.send(options.data);
    };

    _this.createXmlHttpRequest = function() {
        var xhr;

        var xhrs = [
            function() {return new XDomainRequest()},
            function() {return new XMLHttpRequest()},
            function() {return new ActiveXObject("Msxml2.XMLHTTP")},
            function() {return new ActiveXObject("Msxml3.XMLHTTP")},
            function() {return new ActiveXObject("Microsoft.XMLHTTP")}
        ];

        for (var i = 0; i < xhrs.length; i++) {
            try {
                xhr = xhrs[i]();
            }
            catch (e) {
                continue;
            }
            break;
        }

        return xhr;
    };

    return {
        requestByJsonp: _this.requestByJsonp,
        requestByXhr: _this.requestByXhr
    };
}();

var Nethru = window.Nethru || {};

Nethru.Queue = function(key) {
    var _this = {};

    _this.localStorage = Nethru.Storage.getStorage('localStorage');
    _this.key = key ? key : 'nLogger_logData_queue';

    _this.push = function(data) {
        var currentQueue = _this.load();

        if (currentQueue.length < Nethru.Settings.queueCapacity) {
            currentQueue.push(data);
            _this.save(currentQueue);
        }
    };

    _this.pop = function() {
        if (_this.isEmpty()) throw new Error('Empty Queue');

        var currentQueue = _this.load();
        var data = currentQueue.shift();

        _this.save(currentQueue);

        return data;
    };

    _this.isEmpty = function() {
        var currentQueue = _this.load();

        return currentQueue.length === 0;
    };

    _this.load = function() {
        var data = [];

        if (_this.localStorage.get(_this.key) !== null) {
            data = JSON.parse(_this.localStorage.get(_this.key));
            if(typeof data === "string") data = JSON.parse(data);
        }

        return data;
    };

    _this.save = function(data) {
        _this.localStorage.put(_this.key, JSON.stringify(data));
    };

    _this.clearQueue = function() {
        _this.save([]);
    };

    return {
        push: _this.push,
        pop: _this.pop,
        isEmpty: _this.isEmpty,
        // For Debugging
        clearQueue: _this.clearQueue
    }
};

var Nethru = window.Nethru || {};

Nethru.LogDataHelper = function() {
    var _this = {};

    _this.cacheBuster = function() {
        return Math.round(Math.random() * 1999083012);
    };

    _this.getDefaultRequestParams = function() {
        return {
            v: _this.cacheBuster(),
            s: Nethru.Settings.serviceId
        };
    };
    
    _this.getCookieData = function() {
        var cookieData = {};
        var pcid = Nethru.StorageManager.pcidFromStorage();
    
        if(!pcid) {
            pcid = Nethru.Util.generateUuid();
            Nethru.StorageManager.pcidToStorage(pcid);

            if(!Nethru.Settings.alwaysHasPcid) pcid = "";
        }
    
        cookieData[Nethru.Settings.pcidLoggingKey] = pcid;
        cookieData[Nethru.Settings.uidLoggingKey] = Nethru.StorageManager.uidFromStorage();
    
        cookieData = Nethru.Util.extendObject(cookieData, Nethru.StorageManager.getAdInflowStorage().readData());
        cookieData = Nethru.Util.extendObject(cookieData, Nethru.BrowserInfo.getAutoLoggingParameters());
    
        return Nethru.Util.toCookieString(cookieData, true);
    };

    _this.validateUser = function(user) {
        return Nethru.Util.extendObject({
            uid: "",
            sex: "",
            age: "",
            locale: "",
            grade: "",
            attr1: "",
            attr2: "",
            attr3: "",
            attr4: "",
            attr5: ""
        }, user);
    };

    _this.validateOrder = function(order) {
        return Nethru.Util.extendObject({
            ord_id: "",
            prd_id: "",
            price: "",
            disprice: "",
            discount: "",
            cnt: "",
            prd: "",
            lctg: "",
            mctg: "",
            sctg: "",
            dctg: "",
            brand: "",
            cp_yn: "",
            cp_no: "",
            paym: "",
            attr1: "",
            attr2: "",
            attr3: "",
            attr4: "",
            attr5: ""
        }, order);
    };

    _this.validateOrders = function(orders) {
        var result = [];
    
        if(orders) {
            for(var i=0; i<orders.length; i++) {
                var order = orders[i];
                if(!order || !order.ord_id) continue;
    
                result.push(_this.validateOrder(order));
            }
        }
    
        return result;
    };

    return {
        getDefaultRequestParams: _this.getDefaultRequestParams,
        getCookieData: _this.getCookieData,
        validateUser: _this.validateUser,
        validateOrder: _this.validateOrder,
        validateOrders: _this.validateOrders
    };
}();

var Nethru = window.Nethru || {};

Nethru.LogData = function() {
    this.requestPath = function() {
        throw new Error("Not Implemented");
    };

    this.requestData = function() {
        throw new Error("Not Implemented");
    };

    this.requestMethod = function() {
        return 'POST';
    };

    this.toRequestObject = function() {
        return {
            path: this.requestPath(),
            data: this.requestData(),
            method: this.requestMethod()
        };
    };
};

Nethru.CustomParams = function(params, options) {
    var _this = {};

    _this.params = params;
    _this.options = options;

    _this.getBaseParams = function() {
        return {
            u: Nethru.BrowserInfo.getFullURL(),
            r: Nethru.BrowserInfo.getReferer(),
            a: Nethru.BrowserInfo.getUserAgent(),
            c: Nethru.LogDataHelper.getCookieData()
        };
    };

    this.requestPath = function() {
        return '/log/event';
    };

    this.requestData = function() {
        var params = Nethru.Util.extendObject(_this.getBaseParams(), _this.options);
        params.u = Nethru.BrowserInfo.updateUrlParameters(params.u, _this.params);

        return params;
    };

    this.requestMethod = function() {
        return 'GET';
    };
};
Nethru.Util.extendClass(Nethru.CustomParams, Nethru.LogData);

Nethru.Event = function(name, params) {
    if(!name) throw new Error("Event name is required");

    var _this = {};

    _this.name = name;
    _this.params = params;

    _this.getBaseParams = function() {
        return {
            u: _this.getUrl(),
            r: Nethru.BrowserInfo.getFullURL(),
            a: Nethru.BrowserInfo.getUserAgent(),
            c: Nethru.LogDataHelper.getCookieData()
        };
    };

    _this.getUrl = function() {
        var url = window.location.origin;
        if(_this.name.indexOf("/")!==0) url += "/";
        return url + _this.name;
    };

    this.requestPath = function() {
        return '/log/event';
    };

    this.requestData = function() {
        var params = _this.getBaseParams();
        params.u = Nethru.BrowserInfo.updateUrlParameters(params.u, _this.params);

        return params;
    };

    this.requestMethod = function() {
        return 'GET';
    };
};
Nethru.Util.extendClass(Nethru.Event, Nethru.LogData);

Nethru.User = function(user) {
    var _this = {};

    _this.user = Nethru.LogDataHelper.validateUser(user);
    if(!_this.user.uid) throw Error("User ID is required");

    this.requestPath = function() {
        return '/user';
    };

    this.requestData = function() {
        return Nethru.Util.copyObject(_this.user);
    };
};
Nethru.Util.extendClass(Nethru.User, Nethru.LogData);

Nethru.CancelOrder = function(id) {
    if(!id) throw new Error("Order ID is required.");

    var _this = {};

    _this.id = id;

    this.requestPath = function() {
        return '/order/cancel-all';
    };

    this.requestData = function() {
        return {
            order_id: _this.id
        };
    };
};
Nethru.Util.extendClass(Nethru.CancelOrder, Nethru.LogData);

Nethru.OrderList = function(orders) {
    if(!orders || orders.length===0) throw Error("Order list is required");

    var _this = {};

    _this.orders = Nethru.LogDataHelper.validateOrders(orders);

    this.requestPath = function() {
        return '/order/request';
    };

    this.requestData = function() {
        return Nethru.Util.copyObject(_this.orders);
    };
};
Nethru.Util.extendClass(Nethru.OrderList, Nethru.LogData);

Nethru.CancelList = function(orders) {
    if(!orders || orders.length===0) throw Error("Order list is required");

    var _this = {};

    _this.orders = Nethru.LogDataHelper.validateOrders(orders);

    this.requestPath = function() {
        return '/order/cancel';
    };

    this.requestData = function() {
        return Nethru.Util.copyObject(_this.orders);
    };
};
Nethru.Util.extendClass(Nethru.CancelList, Nethru.LogData);

Nethru.AdInflow = function(data) {
    if(!data) throw Error("AdInflow date is required");

    var _this = {};

    _this.data = data;

    this.asObject = function() {
        return Nethru.Util.copyObject(_this.data);
    };
};

var Nethru = window.Nethru || {};

Nethru.Logger = function() {
    var _this = {};

    _this.request = null;
    _this.queue = Nethru.Queue();
    _this.params = {};
    _this.cookieStorage = Nethru.Storage.getStorage("cookie");

    _this.createUrl = function(path, data) {
        var query = Nethru.Util.extendObject(Nethru.LogDataHelper.getDefaultRequestParams(), data);
        var base = window.location.protocol === "https:" ? Nethru.Settings.loggingUrlBaseHttps : Nethru.Settings.loggingUrlBaseHttp;
        return base + path + "?" + Nethru.Util.toQueryString(query, true);
    };

    _this.logByGet = function(request, options) {
        var url = _this.createUrl(request.path, request.data);
        if(Nethru.Settings.xhrEnabled) Nethru.Request.requestByXhr(url, _this.optionsWithCallbacks(request, options));
        else Nethru.Request.requestByJsonp(url, options);
    };

    _this.logByPost = function(request) {
        var url = _this.createUrl(request.path);
        var options = {
            method: "POST",
            data: JSON.stringify(request.data)
        };

        Nethru.Request.requestByXhr(url, _this.optionsWithCallbacks(request, options));
    };

    _this.optionsWithCallbacks = function(request, options) {
        return Nethru.Util.extendObject(options, {
            onError: function() {
                _this.queue.push(request);
            },
            onAbort: function() {
                _this.queue.push(request);
            }
        });
    };

    _this.updateAdInflow = function(data) {
        var storage = Nethru.StorageManager.getAdInflowStorage();
        storage.add(new Nethru.AdInflow(data));
    };

    _this.updateLogData = function()  {
        _this.request = new Nethru.CustomParams(_this.params, {}).toRequestObject();
    };

    _this.sendAll = function(func) {
        var methodFunc;

        while(!_this.queue.isEmpty()) {
            var request = _this.queue.pop();

            if(func && typeof func ==="function") methodFunc = func;
            else methodFunc = request.method === "POST" ? _this.logByPost : _this.logByGet;

            methodFunc(request);
        }
    };

    _this.log = function(func) {
        if(!_this.request) _this.updateLogData();
        _this.queue.push(_this.request);
        _this.request = null;
        _this.sendAll(func);
    };

    _this.addUser = function(user) {
        _this.queue.push(new Nethru.User(user ? user : {}).toRequestObject());
    };

    _this.addOrder = function(orders) {
        _this.queue.push(new Nethru.OrderList(orders ? orders : []).toRequestObject());
    };

    _this.addCancelOrder = function(id) {
        _this.queue.push(new Nethru.CancelOrder(id).toRequestObject());
    };

    _this.addCancelOrders = function(orders) {
        _this.queue.push(new Nethru.CancelList(orders ? orders : []).toRequestObject());
    };

    _this.addEvent = function(name, params) {
        _this.queue.push(new Nethru.Event(name, params).toRequestObject());
    };

    _this.setCookie = function(key, value, expires, domain, path) {
        if(typeof expires == "number" && expires > 0) {
            var date = new Date();
            date.setMinutes(date.getMinutes() + expires);
            expires = date.toUTCString();
        }
        else expires = undefined

        _this.cookieStorage.put(key, value, {
            expires: expires,
            domain: domain,
            path: path || "/"
        });
    };

    _this.getCookie = function(key) {
        return _this.cookieStorage.get(key);
    };

    _this.removeCookie = function(key, domain, path) {
        _this.cookieStorage.remove(key, {
            domain: domain,
            path: path || "/"
        });
    };

    return {
        configure: function(settings) {
            Nethru.Util.configure(settings);
        },
        setDeviceId: function(id) {
            Nethru.StorageManager.pcidToStorage(id);
        },
        getDeviceId: function() {
            return Nethru.StorageManager.pcidFromStorage();
        },
        setUserId: function(id) {
            Nethru.StorageManager.uidToStorage(id);
        },
        getUserId: function() {
            return Nethru.StorageManager.uidFromStorage();
        },
        user: function(user, options) {
            _this.addUser(Nethru.Util.extendObject(user, options));
        },
        params: function(params) {
            _this.params = params;
            _this.updateLogData();
        },
        addParams: function(params) {
            _this.params = Nethru.Util.extendObject(_this.params, params);
            _this.updateLogData();
        },
        adInflow: function(data) {
            _this.updateAdInflow(data);
        },
        orderItems: function(orders) {
            _this.addOrder(orders);
        },
        cancelItems: function(orders) {
            _this.addCancelOrders(orders);
        },
        cancelOrder: function(order_id) {
            _this.addCancelOrder(order_id);
        },
        setCookie: function(key, value, expires, domain, path) {
            _this.setCookie(key, value, expires, domain, path);
        },
        getCookie: function(key) {
            return _this.getCookie(key);
        },
        removeCookie: function(key, domain, path) {
            _this.removeCookie(key, domain, path);
        },
        event: function(name, params, func) {
            _this.addEvent(name, params);
            _this.sendAll(func);
        },
        log: function(func) {
            _this.log(func);
        }
    };
};

window.nLogger = Nethru.Logger();
