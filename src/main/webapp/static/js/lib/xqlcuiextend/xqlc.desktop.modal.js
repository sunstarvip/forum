;(function($) {
    var methods = {
        _init: function(options) {
            var settings = $.extend({
                applications: [{
                    id: '001',
                    name: '一个应用',
                    modules: [{
                        id: 1,
                        name: '一个模块',
                        url: '/xqlc-security/security/user'
                    }, {
                        id: 2,
                        name: '二个模块',
                        url: '/xqlc-security/resource/appCenter'
                    }]
                }, {
                    id: '002',
                    name: '应用2',
                    modules: []
                }]
            }, options);

            return this.each(function() {
                var $this = $(this);

                __hideModal($this);
                __addApplication($this, settings.applications)
                __loadModule($this, settings.applications);
                $this.find('.modal_search_text').keyup(function() {
                    __filter($this);
                });
            });
        },

        changeStatus: function() {
            return this.each(function() {
                var $this = $(this);

                var status = $this.data('status');
                if (status == 'hide') {
                    __showModal($this);
                } else {
                    __hideModal($this);
                }
            });
        }
    };

    var __hideModal = function($modal) {
        $modal.hide();
        $modal.data('status', 'hide');
    };

    var __showModal = function($modal) {
        $modal.show();
        $modal.data('status', 'show');
    };

    var __addApplication = function($modal, applications) {
        var $appList = $modal.find('.right').empty();
        for (var i = 0; i < applications.length; i++) {
            var $button = $('<button type="button" class="btn application_btn" data-active="up" data-app-id="' + applications[i].id + '">' + applications[i].name + '</button>').click(function() {
                if ($(this).attr('data-active') == 'up') {
                    $appList.children().removeClass('active').attr('data-active', 'up');
                    $(this).addClass('active');
                    $(this).attr('data-active', 'down');
                } else {
                    $(this).removeClass('active');
                    $(this).attr('data-active', 'up');
                }
                __filter($modal);
            });
            $appList.append($button);
        }
    };

    var __filter = function($modal) {
        var $modules = $modal.find('.app_list').children();
        var text = $modal.find('.modal_search_text').val();
        var active_app = $modal.find('.right').find('.active').attr('data-app-id');

        $modules.show();
        var pattern = new RegExp(text);

        if (active_app) {
            $modules.each(function() {
                var name = $(this).attr('data-name');
                if ($(this).attr('data-app-id') != active_app || !pattern.exec(name)) {
                    $(this).hide();
                }
            });
        } else {
            $modules.each(function() {
                var name = $(this).attr('data-name');
                if (!pattern.exec(name)) {
                    $(this).hide();
                }
            });
        }
    };

    var __loadModule = function($modal, applications) {
        var modules = [];
        for (var i = 0; i < applications.length; i++) {
            for (var j = 0; j < applications[i].modules.length; j++) {
                var module = applications[i].modules[j];
                module.app_id = applications[i].id;
                modules.push(module);
            }
        }

        var $modalList = $modal.find('.app_list').empty();
        for (var i = 0; i < modules.length; i++) {
            var img = modules[i].img ? modules[i].img : '/doc/images/64x64.jpg';
            //var img = modules[i].img ? modules[i].img : '/xyTeach/image/xtgl.png';
            $(
                '<a href="#" class="app-item" data-id="' + modules[i].id + '" data-name="' + modules[i].name + '" data-url="' + modules[i].url + '" data-app-id="' + modules[i].app_id + '">' +
                    '<img src="' + window.UI_BASE_PATH + img + '" class="img-polaroid">' +
                    '<label class="label label-info"><strong>' + modules[i].name + '</strong></label>' +
                    '</a>'
            ).click(function() {
                    var $module = $(this);
                    $('body').desktop('addApplication', {
                        id: $module.attr('data-id'),
                        name: $module.attr('data-name'),
                        url: $module.attr('data-url'),
                        img: $module.find('img').attr('src')
                    });
                    __hideModal($modal);
                }).appendTo($modalList);
        }
        __filter($modal);
    }

    $.fn.modals = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods._init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.modal');
        }
    };
})(jQuery);
