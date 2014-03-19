;(function($) {
    var methods ={
        _init: function(options) {
            var settings = $.extend({
                currentSpace: '空间',
                userInfo: {
                    name:'匿名用户',
                    img: window.UI_BASE_PATH + '/doc/images/20x20.jpg'
                },
                workSpace: [],
                deptSpace: [],
								
                switchSpace: function() {}
            }, options);

            return this.each(function() {
                var $this = $(this);

                // 空间名
                $this.find('.current_space').html(settings.currentSpace);

                // 工作空间菜单
                var workSpaceItem = '';
                for (var i = 0; i < settings.workSpace.length; i++) {
                    workSpaceItem += '<li id="' + settings.workSpace[i].id + '" class="space_item"><a href="#">' + settings.workSpace[i].name + '</a></li>';
                }
                workSpaceItem += '<li class="divider"></li><li><a href="#">新增</a></li>';
                $this.find('.work_space_item').empty().append($(workSpaceItem));

                // 部门空间菜单
                var departmentSpaceItem = '';
                for (var i = 0; i < settings.deptSpace.length; i++) {
                    departmentSpaceItem += '<li id="' + settings.deptSpace[i].id + '" class="space_item"><a href="#">' + settings.deptSpace[i].name + '</a></li>';
                }
                $this.find('.department_space_item').empty().append($(departmentSpaceItem));

                // 登录人
                $this.find('.user_info').html($('<a><i class="icon-user"></i>' + settings.userInfo.name + '</a>'));

                $('.space_item').click(function() {
                    var id = $(this).attr('id');
                    var name = $(this).find('a').text();
                    settings.switchSpace.apply(this, [id, name]);
                });

            });
        },

        change: function(options) {
            var settings = $.extend({
                currentSpace: '',
                userInfo: '',
                workSpace: [],
                deptSpace: []
            }, options);

            return this.each(function() {
                var $this = $(this);

                // 空间名
                if (!!settings.currentSpace) {
                    $this.find('.current_space').html(settings.currentSpace);
                }

                // 工作空间菜单
                if (settings.workSpace.length > 0) {
                    var workSpaceItem = '';
                    for (var i = 0; i < settings.workSpace.length; i++) {
                        workSpaceItem += '<li id="' + settings.workSpace[i].id + '" class="space_item"><a href="#">' + settings.workSpace[i].name + '</a></li>';
                    }
                    workSpaceItem += '<li class="divider"></li><li><a href="#">新增</a></li>';
                    $this.find('.work_space_item').empty().append($(workSpaceItem));
                }

                // 部门空间菜单
                if (settings.deptSpace.length > 0) {
                    var departmentSpaceItem = '';
                    for (var i = 0; i < settings.deptSpace.length; i++) {
                        departmentSpaceItem += '<li id="' + settings.deptSpace[i].id + '" class="space_item"><a href="#">' + settings.deptSpace[i].name + '</a></li>';
                    }
                    $this.find('.department_space_item').empty().append($(departmentSpaceItem));
                }

                $('.space_item').click(function() {
                    var id = $(this).attr('id');
                    var name = $(this).find('a').text();
                    settings.switchSpace.apply(this, [id, name]);
                });

                if (!!settings.userInfo) {
                    $this.find('.user_info').html($('<a><img src="' + settings.userInfo.img + '">' + settings.userInfo.name + '</a>'));
                }
            });
        }
    };

    $.fn.topbar = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods._init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.topbar');
        }

    };
})(jQuery);