/**
 * 前台公用js
 */

/**
 * 提示错误信息
 */
function setErrorAlert(info){
	alert(info);
}

/**
 * 提示正确信息
 */
function setSuccessAlert(info){
	alert(info);
}
/**
 * 遮挡名称
 */
function getKeepOutString(str){
	if(str && str!= null && str != ""&& $.trim(str).length > 0 && str != undefined){
		str = $.trim(str);
		if(str.length > 1){
			return str.substring(0,1)+"**";
		}else{
			return str + "**";
		}
	}else{
		return "";
	}
}

function formateDateString(date){
	if (null == date || date == undefined || date == '') {
        return "";
    }
    var now = new Date();
    var cdate = new Date(date);
    var onDayTime = 24 * 60 * 60 * 1000;
    if (now.getTime() - date >= onDayTime) {
        return dateToFormat(cdate, "MM-dd");
    } else if (now.getTime() - date < 0) { //未来时间，显示前一天的月-天
        var yesterday = new Date(now.getTime() - onDayTime);
        return dateToFormat(yesterday, "MM-dd");
    }
    if (date + onDayTime < now.getTime()) {
        return dateToFormat(cdate, "MM-dd");
    } else if (date + 60 * 60 * 1000 < now.getTime()) {
        return dateToFormat(cdate, "HH:mm");
    } else if (date + 60 * 1000 < now.getTime()) {
    	var min = Math.floor((now.getTime() - date) / (60 * 1000));
    	return min + "分钟前";
    } else {
    	var sec = Math.floor((now.getTime() - date) / 1000);
        return sec + "秒前";
    }
}

function dateToFormat(v,format){
	if(typeof v == 'string') 
		return v;  
	if(v instanceof Date){
		var y = v.getFullYear();  
		var m = v.getMonth() + 1;  
		var d = v.getDate();
		
		var hour=v.getHours();
	    var minute=v.getMinutes();
	    var second=v.getSeconds();
		if(format == 'MM-dd'){
			return m + '-' + d;
		}
		if(format == 'HH:mm'){
			return hour +':'+minute;
		}
	}  
	return '';
}

function dateToFormat1(date){
	if (null == date || date == undefined || date == '') {
        return "";
    }
    var now = new Date();
    var cdate = new Date(date);
    if (now.getTime() - date < 0) { //未来时间，显示前一天的月-天
        //var yesterday = new Date(now.getTime() - onDayTime);
        return dateToFormat(now, "MM-dd");
    }
    return dateToFormat(cdate, "MM-dd");
}

/* 滚动公用函数 */
$(function(){
	$.fn.scrollNew=function(interval)
	{
	    var $this=$(this);
	    var box=$this.parent("div");
	    var m=box.height();
	    var n=$this.height();            
	    if(n>=m)
	    {
	        $this.append($this.html());
	        var i=0;
	        var timer;
	        var start=function()
	        {
	            timer=setInterval(function()
	            {
	                box.scrollTop(i);
	                i===n ? i=0 : i++;
	            },interval);
	        }
	        var stop=function()
	        {
	            clearInterval(timer);
	        }
	        start();
	        box.on("mouseover",stop).on("mouseout",start);
	    }
	};

})