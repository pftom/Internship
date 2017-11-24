// by zhangxinxu welcome to visit my personal website http://www.zhangxinxu.com/
// zxx.drag v1.0 2010-03-23 元素的拖拽实现

var params = {
	left: 0,
	top: 0,
	currentX: 0,
	currentY: 0,
	flag: false,
	containerLeft: 0,
	containerTop: 0,
	rangeWidth: 0,
	rangeHeight: 0,
};
//获取相关CSS属性
var getCss = function(o,key){
	return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key]; 	
};

//拖拽的实现
var startDrag = function(bar, target, container, callback){
	if(getCss(target, "left") !== "auto"){
		params.left = getCss(target, "left");
	}
	if(getCss(target, "top") !== "auto"){
		params.top = getCss(target, "top");
	}
	//o是移动对象
	bar.onmousedown = function(event){
		params.flag = true;
		if(!event){
			event = window.event;
			//防止IE文字选中
			bar.onselectstart = function(){
				return false;
			}  
		}
		var e = event;
		params.currentX = e.clientX;
		params.currentY = e.clientY;

		params.containerLeft = parseInt(getCss(container, "left"));
		params.containerTop = parseInt(getCss(container, "top"));
		console.log('getCss(container, "width")', getCss(target, "width"));
		params.rangeWidth = Math.abs(parseInt(getCss(container, "width")) - parseInt(getCss(target, "width")));
		params.rangeHeight = Math.abs(parseInt(getCss(container, "height")) - parseInt(getCss(target, "height")));

		console.log('params.rangeWidth', params.rangeWidth, params.rangeHeight);
		// params.rangeHeight = ;
	};
	document.onmouseup = function(){
		params.flag = false;	
		if(getCss(target, "left") !== "auto"){
			params.left = getCss(target, "left");
		}
		if(getCss(target, "top") !== "auto"){
			params.top = getCss(target, "top");
		}
	};
	document.onmousemove = function(event){
		var e = event ? event: window.event;
		if(params.flag){
			var nowX = e.clientX, nowY = e.clientY;
			var disX = nowX - params.currentX, disY = nowY - params.currentY;

			// 理想上需要改变的
			var idealChangeLeft = parseInt(params.left) + disX;
			var idealChangeTop = parseInt(params.top) + disY;

			console.log('params.containerLeft - idealChangeLeft', params.containerLeft - idealChangeLeft);

			// 判断边界Left
			if ((params.containerLeft - idealChangeLeft) <= 0) {
				idealChangeLeft = params.containerLeft;
			} else if ((params.containerLeft - idealChangeLeft) >= params.rangeWidth) {
				idealChangeLeft = params.containerLeft - params.rangeWidth;
			}

			// 同理判断边界Top
			if ((params.containerTop - idealChangeTop) <= 0) {
				idealChangeTop = params.idealChangeTop;
			} else if ((params.containerTop - idealChangeTop) >= params.rangeHeight) {
				idealChangeTop = params.containerTop - params.rangeHeight;
			}
			
			target.style.left = idealChangeLeft + "px";
			target.style.top = idealChangeTop + "px";
			if (event.preventDefault) {
				event.preventDefault();
			}
			return false;
		}
		
		if (typeof callback == "function") {
			callback(parseInt(params.left) + disX, parseInt(params.top) + disY);
		}
	}	
};