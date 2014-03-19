;(function($) {

    var methods = {
        _init: function(options) {
            var settings = $.extend({
                grid: [10, 10]
            }, options);

            return this.each(function() {
                var $this = $(this);
                $this.data('settings', settings);
                var point = $this.offset();
                $this.find('.portal').draggable({
                    grid: settings.grid,
                    containment: 'parent',
                    stack: $this.find('.portal'),
                    stop: function() {
                        var p = $(this).offset();
                        $(this).attr('data-x', (p.left - point.left).toFixed(0));
                        $(this).attr('data-y', (p.top - point.top).toFixed(0));
                        methods._resize($this, settings);
                    }
                }).each(function() {
                        var x = $(this).attr('data-x');
                        var y = $(this).attr('data-y');
                        $(this).offset({
                            left: parseInt(x) + point.left,
                            top: parseInt(y) + point.top
                        });
                    });
                methods._resize($this, settings);
            });
        },

        add_portal: function(el) {
            return this.each(function() {
                var $this = $(this);
                var settings = $this.data('settings');
                var height = $this.data('height');
                var point = $this.offset();
                var $portal = $(el);
                if ($portal.hasClass('portal')) {
                    $this.append($portal);
                    $this.find('.portal').draggable({
                        grid: settings.grid,
                        containment: 'parent',
                        stack: $this.find('.portal'),
                        stop: function() {
                            var p = $(this).offset();
                            $(this).attr('data-x', (p.left - point.left).toFixed(0));
                            $(this).attr('data-y', (p.top - point.top).toFixed(0));
                            methods._resize($this, settings);
                        }
                    });
                    $portal.offset({
                        left: point.left,
                        top: height + settings.grid[1]
                    });
                    $portal.attr('data-x', ($portal.offset().left - point.left).toFixed(0));
                    $portal.attr('data-y', ($portal.offset().top - point.top).toFixed(0));
                    methods._resize($this, settings);
                }

            });
        },

        remove_portal: function(arg) {
            return this.each(function() {
                var $this = $(this);
                var settings = $this.data('settings');
                $this.find('.portal').filter(arg).remove();
                $this.portal(settings);
            });
        },

        get_portal: function(arg) {
            var portals = [];
            this.each(function() {
                var $this = $(this);
                $this.find('.portal').filter(arg).each(function() {
                    var left = $(this).attr('data-x');
                    var top = $(this).attr('data-y');
                    var id = $(this).attr('data-id');
                    portals.push({'id': id, 'x': left, 'y': top});
                });
            });
            return portals;
        },

        _resize: function($portals, options) {
            var height = 0; // 外框高度
            var highest = 0; // 最高的portal的高度
            $portals.find('.portal').each(function() {
                var portalY = $(this).offset().top + $(this).height();
                height = height > portalY ? height : portalY;
                highest = highest > $(this).height() ? height : $(this).height();
            });
            $portals.height(height + highest + options.grid[1] - $portals.offset().top);
            $portals.data('height', height);
            $portals.data('highest', highest);
        }
    };

    /**
     * xqlc portal插件
     * @param arg 如果传入对象则初始化，如果传入字符则调用对应的方法
     */
    $.fn.portal = function(arg) {

        if (typeof arg === 'object' || !arg) {
            return methods._init.apply(this, arguments);
        } else if (methods[arg]) {
            return methods[arg].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            $.error('Method ' + arg + ' does not exist on jQuery.portal');
        }

    }
})(jQuery);