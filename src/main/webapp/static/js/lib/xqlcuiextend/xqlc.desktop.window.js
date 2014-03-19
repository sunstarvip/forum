;(function($) {
    var methods = {
        _init: function(options) {
            var settings = $.extend({
                id: null,
                title: 'window',
                titleText: {
                    home: 'Home',
                    minimize: 'Minimize',
                    maximize: 'Maximize',
                    regular: 'Regular',
                    close: 'Close'
                },
                icon: '../../static/themes/default/images/icons/actions_small/help.png',
                status: 'maximized', // regular, maximized, minimized
                top: 'center',
                left: 'center',
                width: 800,
                height: 600,
                maxable: true,
                minable: true,
                url: '404.jsp',
                bodyHeight: $(window).height() - 40,
                bodyWidth: $(window).width() - 80,
                dblclickTitle: function() {}
            }, options);

            return this.each(function() {
                var $this = $(this);

                // 窗口dom
                var $window = $('<div id="' + settings.id + '" class="windows corner" style="position: absolute;"></div>');
                var $title = $(
                    '<div class="win-title">' +
                        '<img src="" width="16" height="16" />' +
                        '<b>' + settings.title + '</b>' +
                        '<span class="win-btn-block">' +
                            '<a class="win-home win_home" title="' + settings.titleText.home + '" href="#"></a>' +
                            '<a class="win-minimize win_minimize" title="' + settings.titleText.minimize + '" href="#"></a>' +
                            '<a class="win-maximize win_maximize" title="' + settings.titleText.maximize + '" href="#"></a>' +
                            '<a class="win-regular win_regular" title="' + settings.titleText.regular + '" href="#"></a>' +
                            '<a class="win-close win_close" title="' + settings.titleText.close + '" href="#"></a>' +
                        '</span>' +
                    '</div>'
                ).dblclick(function() {
                    settings.dblclickTitle.apply(this, [settings.id])
                    switch (settings.status) {
                        case 'regular':
                            _maximize();
                            break;
                        case 'maximized':
                            _regular();
                            break;
                    }
                });
                // 窗口中添加iframe
                $window.append($title).append($(
                    '<iframe id="window_iframe_' + settings.id + '" class="win-frame win_frame" scrolling="auto" frameborder="0" src="' + settings.url + '"></iframe>' +
                    '<div class="iframe-helper"></div>'
                ));
                // 桌面上添加窗口
                $this.append($window);

                $window.animate({ // 显示窗口
                    width: settings.width,
                    height: settings.height,
                    top: settings.top == 'center' ? (settings.bodyHeight - settings.height) / 2 : settings.top,
                    left: settings.left == 'center' ? (settings.bodyWidth - settings.width) / 2 : settings.left
                }, 0, function() {
                    _resize_iframe('window_iframe_' + settings.id, settings.width, settings.height);
                }).draggable({ // 窗口拖动
                    handle: 'div.win_title',
                    start: function() {
                        $('body').desktop('focusApplication', $(this).attr('id'));
                        $('.iframe-helper').css({'display': 'block'});
                    },
                    stop: function() {
                        var top  = $window.css('top');
                        var left = $window.css('left');
                        settings.top = parseInt(top.replace('px', ''));
                        settings.left = parseInt(left.replace('px', ''));

                        if (settings.top * 1 < 6) {
                            settings.top = 6;
                        }
                        if (settings.top * 1 > settings.bodyHeight - 30) {
                            settings.top = settings.bodyHeight - 30;
                        }
                        if (settings.left * 1 < -1*settings.width+80) {
                            settings.left = -1*settings.width+80;
                        }
                        if (settings.left * 1 > settings.bodyWidth - 30) {
                            settings.left = settings.bodyWidth - 30;
                        }
                        $window.animate({
                            width: settings.width,
                            height: settings.height,
                            top: settings.top,
                            left: settings.left
                        }, 0);
                        $('.iframe-helper').css({'display': 'none'});
                    }
                }).resizable({ // 窗口改变大小
                    start: function() {
                        $('body').desktop('focusApplication', $(this).attr('id'));
                        $('.iframe-helper').css({'display': 'block'});
                        $window.find('.win_frame').css({'display': 'none'})
                    },
                    stop: function() {
                        $('.iframe-helper').css({'display': 'none'});
                        $window.find('.win_frame').css({'display': 'block'})
                        settings.width = $window.width();
                        settings.height = $window.height();
                        _resize_iframe('window_iframe_' + settings.id, settings.width, settings.height);
                    }
                }).click(function() { // 点击窗口
                    $('body').desktop('focusApplication', $(this).attr('id'));
                }); // window设置完成

                var $btn_home = $title.find('a.win_home');
                var $btn_minimize = $title.find('a.win_minimize');
                var $btn_maximize = $title.find('a.win_maximize');
                var $btn_regular = $title.find('a.win_regular');
                var $btn_close = $title.find('a.win_close');

                $btn_home.click(function() {
                    $window.find('.win_frame').attr('src', settings.url);
                });

                // 关闭按钮
                $btn_close.click(function() {
                    $('body').desktop('removeApplication', settings.id);
                });

                //
                $btn_maximize.click(function(event) {
                    _maximize();
                    event.stopPropagation();
                });

                $btn_minimize.click(function(event) {
                    _minimize();
                    event.stopPropagation();
                });

                $btn_regular.click(function(event) {
                    _regular();
                    event.stopPropagation();
                });

                var _maximize = function() {
                    $btn_maximize.hide();
                    $btn_regular.show();
                    $window.animate({
                        width: settings.bodyWidth,
                        height: settings.bodyHeight - 5,
                        top: 0,
                        left: 0
                    }, 0, function() {
                        _resize_iframe('window_iframe_' + settings.id, settings.bodyWidth, settings.bodyHeight - 5);
                    });
                    $window.draggable('disable').resizable('disable');
                    $('body').desktop('focusApplication', settings.id);
                    settings.status = 'maximized';
                };

                var _regular = function() {
                    $btn_regular.hide();
                    $btn_maximize.show();
                    $window.animate({
                        width: settings.width,
                        height: settings.height,
                        top: settings.top == 'center' ? (settings.bodyHeight - settings.height) / 2 : settings.top,
                        left: settings.left == 'center' ? (settings.bodyWidth - settings.width) / 2 : settings.left
                    }, 0, function() {
                        _resize_iframe('window_iframe_' + settings.id, settings.width, settings.height);
                    });
                    $window.draggable('enable').resizable('enable');
                    $('body').desktop('focusApplication', settings.id);
                    settings.status = 'regular';
                };

                var _minimize = function() {
                    $window.hide();
                    settings.status = 'minimized';
                };

                switch (settings.status) {
                    case 'regular':
                        _regular();
                        break;
                    case 'maximized':
                        _maximize();
                        break;
                    case 'minimized':
                        _minimize();
                        break;
                    default:
                        _regular();
                }
            });
        },

        showWindow: function() {
            return this.each(function() {
                var $this = $(this);

                var apps = $('body').data('apps');
                for (var i = 0; i < apps.length; i++) {
                    if (apps[i].focus) {
                        var $window = $('#' + apps[i].id);
                        _top_z_index($window);
                        if ($window.data('status') != 'minimized') {
                            $window.show();
                        }
                    }
                }
            });
        },

        closeWindow: function(id) {
            return this.each(function() {
                $(this).find('#' + id).remove();
            });
        },

        closeOtherWindow: function(id) {
            return this.each(function() {
                $(this).find('.windows').each(function() {
                    var $window = $(this);
                    if ($window.attr('id') != id) {
                        $window.remove();
                    }
                });
            });
        },

        closeAllWindow: function() {
            return this.each(function() {
                $(this).find('.windows').each(function() {
                    $(this).remove();
                });
            });
        },

        reloadWindow: function(id) {
            return this.each(function() {
                var $this = $(this);
                var apps = $('body').data('apps');
                for (var i = 0; i < apps.length; i++) {
                    if (apps[i].id == id) {
                        $this.find('#window_iframe_' + id).attr('src', apps[i].url);
                        break;
                    }
                }
            });
        },

        hideAllWindow: function() {
            return this.each(function() {
                $(this).find('.windows').each(function() {
                    $(this).hide();
                });
            });
        }
    };

    var _top_z_index = function($obj) {
        $('body').find('.windows').each(function() {
            $(this).find('.iframe-helper').css({'display': 'block'});
        });
        $obj.find('.iframe-helper').css({'display': 'none'});

        var max_z_index = $('body').data('max_z_index');
        if (!max_z_index) {
            max_z_index = 100;
        }
        var z_index = $obj.css('z-index') == 'auto' ? 0 : $obj.css('z-index');
        if (z_index < max_z_index - 1) {
            $obj.css('z-index', max_z_index++);
        }
        $('body').data('max_z_index', max_z_index);
    };

    var _resize_iframe = function(iframe_id, width, height) {
        //alert($('#' + iframe_id).length);
        var UA = navigator.userAgent;
        if(!UA.match(/iPad/) && !UA.match(/iPhone/) && !UA.match(/iPod/)) {
            $('#' + iframe_id).width(width - 6);
            $('#' + iframe_id).height(height - 20);
        } else {
            var wrapper = $('#wrapper' + iframe_id);
            if (wrapper.length == 0) {
                wrapper = $('<div id="wrapper' + iframe_id +  '"></div>');
                $('#' + iframe_id).wrapAll(wrapper)
            }
            wrapper.width(width - 6).height(height - 20).css({'-webkit-overflow-scrolling':'touch','overflow':'auto'});
            $('#' + iframe_id).removeClass('win-frame').css({'width':'100%'})
        }

    };

    var _maxWindow = function($window) {

    };

    var _regularWindow = function() {

    };

    $.fn.window = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods._init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.window');
        }
    };
})(jQuery);