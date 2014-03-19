;(function($) {
    window.UI_BASE_PATH = window.UI_BASE_PATH ? window.UI_BASE_PATH : '/xqlc-ui';
    var PER_HEIGHT = 70;
    var methods = {
        _init: function(options) {
            var settings = $.extend({
                startLogo: window.UI_BASE_PATH + '/static/images/startlogo.png',
                startText: '开始',
                height: $(window).height()
            }, options);

            return this.each(function() {
                var $this = $(this);

                $this.find('.start')
                    .html($('<a href="#" title="' + settings.startText + '"><img style="width: 48px; height: 48px;" src="' + settings.startLogo + '"></a>'))
                    .css({'z-index': 10000}).click(function() {
                        $('body').desktop('changeModalStatus');
                    });

                // 应用程序icon显示个数
                var rows = __iconRows(settings.height);
                $this.find('.app_icon_list').empty().height(rows * PER_HEIGHT);
                $this.data('rows', rows);

                // 显示桌面
                $this.find('.leftbar_show_desktop').click(function() {
                    $('body').desktop('showDesktop');
                });

                // 左翻页
                $this.find('.leftbar_left').click(function() {
                    var apps = $('body').data('apps');
                    var rows = $this.data('rows');
                    var page = $this.data('page') - 1;
                    if (page < 1) {
                        page = 1;
                    }
                    $this.data('page', page);
                    __showIcon($this, apps, rows, page);
                });

                // 右翻页
                $this.find('.leftbar_right').click(function() {
                    var apps = $('body').data('apps');
                    var rows = $this.data('rows');
                    var page = $this.data('page') * 1 + 1;
                    var maxPage = Math.ceil(apps.length / rows);
                    if (page > maxPage) {
                        page = maxPage;
                    }
                    $this.data('page', page);
                    __showIcon($this, apps, rows, page);
                });
            });
        },

        changeHeight: function(height) {
            return this.each(function() {
                var $this = $(this);
                var apps = $('body').data('apps');
                var rows = __iconRows(height);
                $this.data('rows', rows);
                var focusIndex = __focusIndex(apps);
                var page = __currPage(rows, focusIndex);
                $this.data('page', page);
                __showIcon($this, apps, rows, page);
            });
        },

        showIcon: function() {
            return this.each(function() {
                var $this = $(this);
                var rows = $this.data('rows');
                var apps = $('body').data('apps');
                var focusIndex = __focusIndex(apps);
                var page = __currPage(rows, focusIndex);
                $this.data('page', page);
                __showIcon($this, apps, rows, page);
            });
        }
    };

    /**
     * 计算显示icon的数量
     * @param bodyHeight
     * @return {Number}
     * @private
     */
    var __iconRows = function(bodyHeight) {
        var h = bodyHeight - PER_HEIGHT - 120; // 70为 topbar + 空隙 + 底部按钮栏 的高度
        return parseInt(h / PER_HEIGHT);
    };

    /**
     * 计算活动应用的index
     * @param apps 所有打开的app
     * @return {Number}
     * @private
     */
    var __focusIndex = function(apps) {
        for (var i = 0; i < apps.length; i++) {
            if (apps[i].focus) {
                return i;
            }
        }
        return -1;
    };

    /**
     * 计算当前分页
     * @param rows 每页显示行数
     * @param index 当前活动应用的index
     * @private
     */
    var __currPage = function(rows, index) {
        return Math.ceil((index + 1) / rows);
    };

    /**
     * 计算开始和结束的index
     * @param apps
     * @param page
     * @param rows
     * @return {Object}
     * @private
     */
    var __iconIndex = function(apps, page, rows) {
        var startIndex = (page - 1) * rows;
        var endIndex = apps.length > page * rows ? page * rows : apps.length;
        return {start: startIndex, end: endIndex};
    }

    var __showIcon = function($dom, apps, rows, page) {
        var icons = __iconIndex(apps, page, rows);
        var $iconList = $dom.find('.app_icon_list').empty();
        if (!apps.length) return;
        for (var i = icons.start; i < icons.end; i++) {
            var $li = $('<li data-app-id="' + apps[i].id + '"></li>');
            if (apps[i].focus) {
                $li.addClass('active');
            }
            var img = apps[i].img ? apps[i].img : window.UI_BASE_PATH + '/static/images/startlogo.png';
            $li.append($('<a href="#" title="' + apps[i].name + '"><img src="' +  img + '"></a>'));
            $li.on('click', function(apps) {
                $('body').desktop('focusApplication', $(this).attr('data-app-id'));
            });
            $li.contextMenu('leftbar_right_click_context_menu', {
                bindings: {
                    'close': function(el) {
                        console.log($(el).attr('data-app-id'));
                        $('body').desktop('removeApplication', $(el).attr('data-app-id'));
                    },
                    'close_other': function(el) {
                        $('body').desktop('removeOtherApplication', $(el).attr('data-app-id'));
                    },
                    'close_all': function(el) {
                        $('body').desktop('removeAllApplication');
                    },
                    'reload': function(el) {
                        $('body').desktop('reloadApplication', $(el).attr('data-app-id'));
                    }
                }
            });
            $iconList.append($li);
        }
    };

    var __pageLeft = function($leftbar, apps, rows, page) {

    }

    $.fn.leftbar = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods._init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.leftbar');
        }

    };
})(jQuery);