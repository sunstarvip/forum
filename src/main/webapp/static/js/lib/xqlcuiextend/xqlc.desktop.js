;(function($) {
    var methods = {
        _init: function(options) {
            var settings = $.extend({
                loadApplication:'',
                loadUser:'',
                loadSpace:''
            }, options);

            settings.topbar = $.extend({
                name: 'desktop_topbar'
            }, options.topbar);
            settings.leftbar = $.extend({
                name: 'desktop_leftbar',
                startText: '开始'
            }, options.leftbar);
            settings.content = $.extend({
                name: 'desktop_content'
            }, options.content);
            settings.modal = $.extend({
                name: 'desktop_modal'
            }, options.modal);

            return this.each(function() {
                var $this = $(this);
                $this.addClass('desktop');
                $this.data('apps', []);
                $this.data('apps_index', []);
                var bodyHeight = $(window).height() - 40;

                // 处理topbar
                var $topbar = $('.' + settings.topbar.name).topbar({
                    workSpace: [{id: '01', name: '项目a'}],
                    deptSpace: [{id: '11',name: '部门a'}],
                    switchSpace: function(id, name) {
                        alert(name);
                    }
                });
                $this.data('topbar', settings.topbar.name);

                // 处理leftbar
                var $leftbar = $this.find('.' + settings.leftbar.name).leftbar(settings.leftbar);
                $this.data('leftbar', settings.leftbar.name);

                // 处理content
                var $content = $this.find('.' + settings.content.name).height(bodyHeight);
                $this.data('content', settings.content.name);

                // 处理modal
                $this.find('.' + settings.modal.name + "_div").hide();
                $.get(settings.loadApplication, {}, function(applications) {
                    var $modal = $this.find('.' + settings.modal.name).modals({
                        applications:applications
                    });
                    $this.data('modal', settings.modal.name);
                }, 'json')
            });
        },

        addApplication: function(options) {
            var settings = $.extend({
                id: null,
                name: '',
                description: '',
                img: '',
                url: '',
                permission: '',
                visible: true,
                focus: true
            }, options);

            return this.each(function() {
                var $this = $(this);

                var leftbar = $this.data('leftbar');
                var $leftbar = $this.find('.' + leftbar);
                var content = $this.data('content');
                var $content = $this.find('.' + content);

                var apps = $this.data('apps');
                for (var i = 0; i < apps.length; i++) {
                    if (apps[i].id == settings.id) {
                        $('body').desktop('focusApplication', settings.id);
                        return;
                    }
                }

                var apps_index = $('body').data('apps_index');
                apps_index.push(settings.id);

                for (var i = 0; i < apps.length; i++) {
                    apps[i].focus = false;
                }
                apps.push(settings);
                $this.data('apps', apps);
                $leftbar.leftbar('showIcon');

                $content.window({
                    id: settings.id,
                    url: settings.url,
                    title: settings.name
                });
            });
        },

        focusApplication: function(id) {

            return this.each(function() {
                var $this = $(this);

                var leftbar = $this.data('leftbar');
                var $leftbar = $this.find('.' + leftbar);
                var content = $this.data('content');
                var $content = $this.find('.' + content);

                // 计算应用的焦点顺序
                var apps_index = $('body').data('apps_index');
                for (var i = 0; i < apps_index.length; i++) {
                    if (apps_index[i] == id) {
                        apps_index.splice(i, 1);
                        break;
                    }
                }
                apps_index.push(id);
                $('body').data('apps_index', apps_index);

                // 设置应用焦点
                var apps = $('body').data('apps');
                for (var i = 0; i < apps.length; i++) {
                    if (apps[i].id == id) {
                        apps[i].focus = true;
                    } else {
                        apps[i].focus = false
                    }
                }
                $('body').data('apps', apps);

                $leftbar.leftbar('showIcon');
                $content.window('showWindow');
            })
        },

        removeApplication: function(id) {
            return this.each(function() {
                var $this = $(this);

                var leftbar = $this.data('leftbar');
                var $leftbar = $this.find('.' + leftbar);
                var content = $this.data('content');
                var $content = $this.find('.' + content);

                $content.window('closeWindow', id);

                // 计算app焦点
                var apps_index = $('body').data('apps_index');
                for (var i = 0; i < apps_index.length; i++) {
                    if (apps_index[i] == id) {
                        apps_index.splice(i, 1);
                        $('body').data('apps_index', apps_index);
                        break
                    }
                }
                var focus_app_id = apps_index[apps_index.length - 1];

                // 删除app图标
                var apps = $('body').data('apps');
                for (var i = 0; i < apps.length; i++) {
                    if (apps[i].id == id) {
                        apps.splice(i, 1);
                        break;
                    }
                }
                // 设置app焦点
                for (var i = 0; i < apps.length; i++) {
                    if (apps[i].id == focus_app_id) {
                        apps[i].focus = true;
                    } else {
                        apps[i].focus = false;
                    }
                }
                $('body').data('apps', apps);

                $leftbar.leftbar('showIcon');
            });
        },

        removeAllApplication: function() {
            return this.each(function() {
                var $this = $(this);

                var leftbar = $this.data('leftbar');
                var $leftbar = $this.find('.' + leftbar);
                var content = $this.data('content');
                var $content = $this.find('.' + content);

                $('body').data('apps', []);
                $('body').data('apps_index', []);

                $leftbar.leftbar('showIcon');
                $content.window('closeAllWindow');
            });
        },

        removeOtherApplication: function(id) {
            return this.each(function() {
                var $this = $(this);

                var leftbar = $this.data('leftbar');
                var $leftbar = $this.find('.' + leftbar);
                var content = $this.data('content');
                var $content = $this.find('.' + content);

                $('body').data('apps_index', [id]);

                var apps = $('body').data('apps');
                var app = {};
                for (var i = 0; i < apps.length; i++) {
                    if (apps[i].id == id) {
                        app = apps[i];
                    }
                }
                app.focus = true;
                $('body').data('apps', [app]);

                $leftbar.leftbar('showIcon');
                $content.window('closeOtherWindow', id);
            });
        },

        reloadApplication: function(id) {
            return this.each(function() {
                var $this = $(this);
                var content = $this.data('content');
                var $content = $this.find('.' + content);
                $content.window('reloadWindow', id);
            });

        },

        changeModalStatus: function() {
            return this.each(function() {
                var $this = $(this);

                var modal = $this.data('modal');
                var $modal = $this.find('.' + modal);

                if (modalStatus == 'show') {
                    $this.find('.' + modal + "_div").hide();
                } else {
                    $this.find('.' + modal + "_div").show();
                }

                $modal.modals('changeStatus');
                var modalStatus = $modal.data('status');

            });
        },

        showDesktop: function() {
            return this.each(function() {
                var $this = $(this);

                var content = $this.data('content');
                var $content = $this.find('.' + content);

                $content.window('hideAllWindow');
            })
        }
    };

    $.fn.desktop = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods._init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.desktop');
        }

    };
})(jQuery);