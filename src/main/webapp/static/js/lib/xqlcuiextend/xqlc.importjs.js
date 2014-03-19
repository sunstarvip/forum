var $import = (function() {
    var component = {
        'ui-all': 'base/bootstrap.min.js'
    };
    return (function(url, callback) {
        var _imports = {};
        var _length = url.length;
        var head = document.getElementsByTagName('head')[0];
        for (var i = 0; i < url.length; i++) {
            if (!_imports[url[i]]) {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = window.JAVASCRIPT_BASE_PATH + component[url[i]];
                (function(elem) {
                    elem.onload = elem.onreadystatechange = function() {
                        if (! elem.readyState || /loaded|complete/.test(elem.readyState)) {
                            _length--;
                            elem.onload = elem.onreadystatechange = null;
                            elem = null;
                            if (_length === 0) {
                                callback.call();
                            }
                        }
                    }
                })(script)
                head.appendChild(script);
                _imports[url[i]] = true;
            } else {
                _length--;
                if (_length === 0) {
                    callback.call();
                }
            }
        }
    });
})();