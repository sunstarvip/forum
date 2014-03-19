;(function($) {
    xqlc_flow = {};
    xqlc_flow.config = {
        editable: true,
        lineHeight: 15,
        basePath: "",
        // 矩形
        rect: {
            attr: {
                x: 10,
                y: 10,
                width: 100,
                height: 50,
                r: 5,
                fill : "90-#fff-#C0C0C0",
                stroke : "#000",
                "stroke-width" : 1
            },
            showType : "image&text",
            type : "state",
            name : {
                text : "state",
                "font-style" : "italic"
            },
            text : {
                text : "状态",
                "font-size" : 13
            },
            margin : 5,
            props : [],
            img : {}
        }
    }
})(jQuery);