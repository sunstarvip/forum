//star
window.onload = function() {

	var oStar = document.getElementById("star");
	var aLi = oStar.getElementsByTagName("li");
	var oUl = oStar.getElementsByTagName("ul")[0];
	var oSpan = oStar.getElementsByTagName("span")[1];
	var oP = oStar.getElementsByTagName("p")[0];
	var i = iScore = iStar = 0;
	var mark = '${xqlc:i18n("ui.base.evaluation.mark", locale)}';
	var satisfactionE = '${xqlc:i18n("ui.base.evaluation.satisfactionE", locale)}';
	var satisfactionD = '${xqlc:i18n("ui.base.evaluation.satisfactionD", locale)}';
	var satisfactionC = '${xqlc:i18n("ui.base.evaluation.satisfactionC", locale)}';
	var satisfactionB = '${xqlc:i18n("ui.base.evaluation.satisfactionB", locale)}';
	var satisfactionA = '${xqlc:i18n("ui.base.evaluation.satisfactionA", locale)}';
	var aMsg = [ satisfactionE, satisfactionD, satisfactionC, satisfactionB,
			satisfactionA ]

	for (i = 1; i <= aLi.length; i++) {
		aLi[i - 1].index = i;
		// 鼠标移过显示分数
		aLi[i - 1].onmouseover = function() {
			fnPoint(this.index);
			// 浮动层显示
			oP.style.display = "block";
			// 计算浮动层位置
			oP.style.left = oUl.offsetLeft + this.index * this.offsetWidth
					- 104 + "px";
			// 匹配浮动层文字内容
			$('#satisfaction').val(this.index);

			oP.innerHTML = "<em><b>" + this.index + "</b>" + mark
					+ aMsg[this.index - 1].match(/(.+)\|/)[1] + "</em>"
					+ aMsg[this.index - 1].match(/\|(.+)/)[1];
		};
		// 鼠标离开后恢复上次评分
		aLi[i - 1].onmouseout = function() {
			fnPoint();
			// 关闭浮动层
			oP.style.display = "none";
		};

		// 点击后进行评分处理
		aLi[i - 1].onclick = function() {
			iStar = this.index;
			oP.style.display = "none";
			oSpan.innerHTML = "<strong>" + (this.index) + mark + "</strong> ("
					+ aMsg[this.index - 1].match(/\|(.+)/)[1] + ")";
		};
	}

	// 评分处理
	function fnPoint(iArg) {
		// 分数赋值
		iScore = iArg || iStar;
		for (i = 0; i < aLi.length; i++)
			aLi[i].className = i < iScore ? "on" : "";
	}

};