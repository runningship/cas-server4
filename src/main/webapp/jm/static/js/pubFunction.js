//语言包
var langData = {
	cn: {
		msg: "提示信息",
		btnName: "确认"
	},
	en: {
		msg: "Prompting message",
		btnName: "Confirm"
	},
	rus: {
		msg: "Напоминание",
		btnName: "Подтверждение"
	},
	span: {
		msg: "sugerencias de Información",
		btnName: "confirmar"
	}
};
var language = language || "cn";
var lang = langData[language];
//改写alert
window.alert = function (txt) {

	layer.alert(txt, {
		icon: 0,
		title: lang.msg || '标题',
        btn:[lang.btnName]
	});
}


//改写confirm
/*window.confirm=function(text)
 {
 layer.confirm(text,{
 })
 }*/


/**
 * dsw项目前端全局变量
 */
var WEBSITE_COMMON_OBJECT = {
		industryId : -1
};

/**
 * @name zyMaskLayer jQuery-plugin v-1.0
 * @author by ccc 20150410
 * @param {String} eventTarget 弹出的那个DIV
 * @param {String} eventTargetClose 关闭按钮
 * @param {String} eventType 关闭的方式
 * @param {String} eventMask 指定背景层
 * @param {String} eventBool 背景层是否可以关闭,默认false.
 */
(function($) {
    var methods = {
        init: function(options) {
            var opts = $.extend({}, $.fn.zyMaskLayer.defaults, options);
            return this.each(function() {
                var mask = "<div id=" + opts.eventMask + "></div>";
                var _thisTop = 0;
                var _this = $(this).find(opts.eventTarget);

                $("body").append(mask);

                var $msakLayer = $("#" + opts.eventMask);

                $msakLayer.css({
                    "height": $(document).height() + "px"
                }).show();

                if (parseInt(_this.css("height")) >= parseInt($(window).height(), 10)) {
                    _thisTop = 0;
                } else {
                    if(opts.eventPos="absolute"){
                        _thisTop = (parseInt($(window).height(), 10) / 2 - parseInt(_this.outerHeight(), 10) / 2 + $(window).scrollTop());
                    }
                    if(opts.eventPos="fixed"){
                        _thisTop = (parseInt($(window).height(), 10) / 2 - parseInt(_this.outerHeight(), 10) / 2);
                    }
                }
                _this.css({
                    "left": "50%",
                    "margin-left": -(parseInt(_this.outerWidth(), 10) / 2),
                    "top": _thisTop,
                    "z-index": parseInt($msakLayer.css("z-index"), 10) + 10
                }).fadeIn(500);

                _this.find(opts.eventTargetClose).on(opts.eventType, function() {
                    _this.hide(100);
                    $msakLayer.remove();
                    return false;
                });

                if (opts.eventBool) {
                    $msakLayer.on(opts.eventType, function() {
                        _this.hide(100);
                        $msakLayer.remove();
                        return false;
                    });
                }
                return false;
            });
        },
        hide: function(options) {
            var opts = $.extend({}, $.fn.zyMaskLayer.defaults, options);
            return this.each(function() {
                var _this = $(this).find(opts.eventTarget);
                var $msakLayer = $("#" + opts.eventMask);
                _this.hide(100);
                $msakLayer.remove();
            });
        }
    };
    $.fn.zyMaskLayer = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " + method + " does not exist on jQuery.zyMaskLayer");
        }
    };
    $.fn.zyMaskLayer.defaults = {
        eventTarget: ".global-mask",
        eventTargetClose: ".global-maskClose",
        eventType: "click",
        eventMask: "global-maskLayer",
        eventPos:"absolute",
        eventBool: false
    };
})(jQuery);
/**检查Email输入是否合法*/
function isEmail(strEmail) {
   if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
       return true;
   else
     return false;
}

function getCheckBox(theform, boxName) {
	var i = 0;
	var checkValue = "";

	for (i = 0; i < theform.length; i++) {
		if (theform.elements[i].name == boxName
				&& theform.elements[i].checked == true) {
			if (checkValue == "") {
				if (theform.elements[i].value != "")
					checkValue = theform.elements[i].value;
			} else {
				checkValue = checkValue + "," + theform.elements[i].value;
			}
		}
	}
	return checkValue;
}

/**
 *替代普通select控件
 */
function toChosen(width){
	var dSelect = $(".d-select");
	if(width < 50)
		width = 140;
	for(var i = 0; i < dSelect.length; i++){
		var sel = dSelect.get(i);
		if(sel.getAttribute("multiple") != null){
			continue;
		}
		var max = 0;
		for(var j = 0; j < sel.options.length; j++){
			if(sel.options[j].text.length > max) max = sel.options[j].text.length;
		}
		$(sel).css("width",width);
		//$(sel).css("width",max*14+25);
	}
	if(dSelect.length > 0){
		dSelect.chosen(
			{
				no_results_text: "没有匹配选项",
				search_contains: true //支持模糊搜索
			}
		);
	}
}
 

/*
 * 全选表单中的复选框 form 表单对象
 */
function checkAllBox(form, name, checkedValue) {
	for ( var i = 0; i < form.elements.length; i++) {
		var e = form.elements[i];
		if (e.id != 'template_checkbox' && e.name == name
				&& form.elements[i].type.toLowerCase() == 'checkbox'
				&& form.elements[i].style.display != 'none')
			e.checked = checkedValue;
	}
}


function GetCurrentTimeSeconds(){
    // 获取当前时间表示的秒数
    var d=new Date();

    var hour=d.getHours();

    var minute=d.getMinutes();

    var second=d.getSeconds();

    return hour * 60 * 60 + minute * 60 + second;
}
/*
 * 休眠功能 WaitTime(5,10) 等待5秒，超时为10秒
 */       
function WaitTime(sec, timeout)
{
    // 让程序等待指定的秒数
    // sec:等待秒数
    // timeout:超时秒数
   
    var startPos = GetCurrentTimeSeconds();
   
    var pass;
    while(true)
    {
        pass = GetCurrentTimeSeconds() - startPos;
       
        if (pass >= sec)
        {
            break;
        }
       
        if ( pass >= timeout)
        {
            break;
        }
    }
   
}

/* 字符串转date对象 */
function StringToDate(DateStr){
	if(typeof DateStr=="undefined")return new Date();
	if(typeof DateStr=="date")return DateStr;
	var converted = Date.parse(DateStr);
	var myDate = new Date(converted);
	if(isNaN(myDate)){
		DateStr=DateStr.replace(/:/g,"-");
		DateStr=DateStr.replace(" ","-");
		DateStr=DateStr.replace(".","-");
		var arys= DateStr.split('-');
		switch(arys.length){
			case 7 : myDate = new Date(arys[0],--arys[1],arys[2],arys[3],arys[4],arys[5],arys[6]);
			break;
			case 6 : myDate = new Date(arys[0],--arys[1],arys[2],arys[3],arys[4],arys[5]);
			break;
			default: myDate = new Date(arys[0],--arys[1],arys[2]);
			break;
		}
	}
	return myDate;
}
/* 显示加载图片 */
function loading(type){
	if(type == 'show'){
		$("#ok-task-loading").show();
	}else if(type == 'hide'){
		$("#ok-task-loading").hide();
	}
	
}

/**
 * 升贴水显示信息
 */
function showPriceStopAgio(value){
	if(value == ""){
		return "";
	}
	if(isNaN(value)){
		return "数字格式不正确";
	}
	if(value > 0){
		return "+"+value;
	}
	return value;
	
}

/**
 * 升贴水显示信息。不带正负号的升贴水价格
 */
function showUnsignedPriceStopAgio(value){
	if(value == ""){
		return "";
	}
	if(isNaN(value)){
		return 0;
	}
	if(value > 0){
		return value;
	}
	return -value;
	
}

/**
 * 升贴水显示信息。显示升贴水正负号下拉框
 * @param value 升贴水价格值
 */
function showSigned(value){
	if(value == ""){
		return 0;
	}
	if(isNaN(value)){
		return 0;
	}
	if(value > 0){
		return 0; //正号
	}
	return 1; //负号
	
}

/**
 * 升贴水显示信息。显示升贴水正负号下拉框
 * @param value 升贴水价格值
 */
function showPriceStopAgioSigned(value){
	if(value == ""){
		return "+";
	}
	if(isNaN(value)){
		return "+";
	}
	if(value > 0){
		return "+";
	}
	return "-";
	
}

/**
 * 升贴水显示信息。不带正负号的升贴水价格
 * @param value 升贴水价格值
 */
function showSigned(value){
	if(value == ""){
		return "";
	}
	if(isNaN(value)){
		return "数字格式不正确";
	}
	if(value > 0){
		return 0;
	}
	return 1;
	
}

/* 替换textarea的换行符 */
function replaceEnter(str){
	return str.replace(/\n/g,'<br>');
}


/* 转化日期 
 * 
 *  parseDate('2006-1-1') return new Date(2006,0,1)
 *  parseDate(' 2006-1-1 ') return new Date(2006,0,1)
 *  parseDate('2006-1-1 15:14:16') return new Date(2006,0,1,15,14,16)
 *  parseDate(' 2006-1-1 15:14:16 ') return new Date(2006,0,1,15,14,16);
 *  parseDate('2006-1-1 15:14:16.254') return new Date(2006,0,1,15,14,16,254)
 *  parseDate(' 2006-1-1 15:14:16.254 ') return new Date(2006,0,1,15,14,16,254)
 *  parseDate('不正确的格式') retrun null
 * 
 * */
function parseDate(str){  
	if(typeof str == 'string'){
	var results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);  
	if(results && results.length>3)  
    	return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3]));
	
	results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);  
	if(results && results.length>6)  
    	return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3]),parseInt(results[4]),parseInt(results[5]),parseInt(results[6]));   

	results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);  
	if(results && results.length>7)  
    	return new Date(parseInt(results[1]),parseInt(results[2]) -1,parseInt(results[3]),parseInt(results[4]),parseInt(results[5]),parseInt(results[6]),parseInt(results[7]));   
	}  
	return null;  
}

/**
 * 格式化日期
 * @param v
 * @return
 */
function formatDate(v){
	if(typeof v == 'string') 
		return v;  
	if(v instanceof Date){  
		var y = v.getFullYear();  
		var m = v.getMonth() + 1;  
		var d = v.getDate();
		return y + '-' + m + '-' + d;  
	}  
	return '';
} 

function getCurrentDate(){
	var today = new Date();
	return formatDate(today);
}
/**毫秒数转换为时间格式
 * @param sec
 * @returns
 */
function secondToFormatDate(sec){
	if(sec && sec != null && sec != undefined){
		return formatDate(new Date(sec));
	}else{
		return "";
	}
}
/**
 * get event
 * 获取操作事件
 */
function getEvent() {
	if(document.all)  return window.event;
	
	func = getEvent.caller;
	while(func != null) {
		var arg0 = func.arguments[0];
		if (arg0) {
			if ((arg0.constructor == Event || arg0.constructor == MouseEvent)
					|| (typeof (arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
				return arg0;
			}
		}
		func = func.caller;
	}
	
	return null;
}

/**
 * key check
 */
function isEnterKey() {
	return getEvent().keyCode == 13;
}

/**
 * 阻止事件冒泡
 * @return
 */
function preventBubble() {
	var e = getEvent();
	if(event.stopPropagation){
		e.stopPropagation();
		e.preventDefault();
	}else if (window.event) {
		window.event.cancelBubble = true;
	}
}

function checkPoints(obj){
	  var point = obj.value;
	  if(point == '00')
		  obj.value = "0";
	  if(parseInt(point) > 100)
		  obj.value = point.substring(0,2);
}

//自动登录
function iframeToLogin(username,password,webList,guanLoginWebList){
	/*var iframe = document.createElement("iframe"); //创建iframe
	iframe.src="http://192.168.20.203/adminDswlogin.do?action=brandChkLogin&username="+username+"&passWord="+password+"&checkcode=8888";
	document.getElementsByTagName("head")[0].appendChild(iframe);*/
	
	if(webList != null && webList != "" && webList != "undefined"){
		//当前网站域名
		var host = window.location.host;
		//支持IE浏览器
		guanLoginWebList=guanLoginWebList.join("");
		
		//遍历集合
		for(var i=0;i<webList.length;i++){
			if("http://"+host != webList[i]){
				if(guanLoginWebList.indexOf(webList[i]) > -1){	////三馆项目登陆:国家馆、省馆、品牌馆
					var iframe = document.createElement("iframe"); //创建iframe
					iframe.src=webList[i]+"/adminDswlogin.do?action=brandChkLogin&username="+username+"&passWord="+password+"&checkcode=8888";
					document.getElementsByTagName("head")[0].appendChild(iframe);
				}else{
					var iframe = document.createElement("iframe"); //创建iframe
					iframe.src=webList[i]+"/login.do?action=chkLogin&username="+username+"&passWord="+password;
					document.getElementsByTagName("head")[0].appendChild(iframe);
				}
			}
		}
		
	}
	
}

function iframeTicketLogin(ticket,webList,guanLoginWebList){
	if(webList != null && webList != "" && webList != "undefined"){
		//当前网站域名
		var host = window.location.host;
		//支持IE浏览器
		guanLoginWebList=guanLoginWebList.join("");
		//遍历集合
		for(var i=0;i<webList.length;i++){
			if("http://"+host != webList[i]){
				if(guanLoginWebList.indexOf(webList[i]) > -1){	////三馆项目登陆:国家馆、省馆、品牌馆
					var iframe = document.createElement("iframe"); //创建iframe
					iframe.src=webList[i]+"/adminDswlogin.do?action=brandChkLogin&sso_ticket="+ticket+"&checkcode=8888";
					document.getElementsByTagName("head")[0].appendChild(iframe);
				}else{
					var iframe = document.createElement("iframe"); //创建iframe
					iframe.src=webList[i]+"/login.do?action=chkLogin&sso_ticket="+ticket;
					document.getElementsByTagName("head")[0].appendChild(iframe);
				}
			}
		}
		
	}
	
}

/**
 * 刷新主页面(自动刷新)
 */
function refreshIframeLogin(){
//	window.location.href= url;
	/*var refreshUrl ="http://192.168.20.246"; //TODO 待优化 
	var src = document.createElement("iframe"); //创建iframe
	src.src=refreshUrl;
	document.getElementsByTagName("head")[0].appendChild(src);*/
	
	//当前网站域名
	var host = window.location.host;
	
	//发送ajax请求获取后台参数
	$.ajax({
		cache: true,
		type: "POST",
		url:"../login.do?action=getIframeLogin",
//		data:{"username":username,"passWord":password},//提交参数
		async: true,//是否同步,默认异步
	 	dataType:"json",
		error: function(request) {
//			setErrorAlert("超时或系统异常");
		},
		success: function(data) {
			if(data && data.resultCode != 0){	 
				var webList = data.autoLoginList;
				if(webList != null && webList != "" && webList != "undefined"){
					for(var i=0;i<webList.length;i++){
						if("http://"+host != webList[i]){
							var iframe = document.createElement("iframe"); //创建iframe
							iframe.src=webList[i];
							iframe.wigth="1px";
							iframe.height="1px";
							document.getElementsByTagName("head")[0].appendChild(iframe);
						}
					}
				}
			}
		}
	});
	
}

//定时刷新
function timeRefreshHttp(){
	/*var httpIds=["http://192.168.20.246"];
	setInterval(function(){
		refreshLogin(httpIds[0]);
	},1000*60*1); //设置时间=60秒 */
	
	setInterval(function(){
		refreshIframeLogin(); //打开页面,自动加载
	},1000*60*5); //设置时间=5*60秒

}

//调用定时刷新函数
//timeRefreshHttp();

/**
 * iframe 退出 
 */
function iframeTologout(){
	//当前网站域名
	var host = window.location.host;
	
	$.ajax({
		cache: true,
		type: "POST",
		url:"../login.do?action=getIframeLogin",
//		data:{"username":username,"passWord":password},//提交参数
		async: false,//是否同步,默认异步
	 	dataType:"json",
		error: function(request) {
//			setErrorAlert("超时或系统异常");
		},
		success: function(data) {
			if(data && data.resultCode != 0){	 
				var webList = data.autoLoginList;
				var guanLoginWebList = data.guanLoginWebList;
				//支持IE浏览器
				guanLoginWebList=guanLoginWebList.join("");
				
				if(webList != null && webList != "" && webList != "undefined"){
					for(var i=0;i<webList.length;i++){
						if("http://"+host != webList[i]){
							if(guanLoginWebList.indexOf(webList[i]) > -1){	////三馆项目登陆:国家馆、省馆、品牌馆
								var iframe = document.createElement("iframe"); //创建iframe
								iframe.src=webList[i]+"/adminDswlogin.do?action=logout";
								document.getElementsByTagName("head")[0].appendChild(iframe);
							}else{
								var iframe = document.createElement("iframe"); //创建iframe
								iframe.src=webList[i]+"/login.do?action=logout";
								document.getElementsByTagName("head")[0].appendChild(iframe);
							}
						}
						
					}
				}
			}
		}
	})
}

//兼容ie8的textarea自适应高度
function changeTextareaHeight(obj) {
	var theight = 0;
	if(typeof(obj.scrollHeight) == "undefined" || obj.scrollHeight < 100)
		theight = 100;
	else
		theight = obj.scrollHeight;
	obj.style.posHeight=theight;
}

function printDiv(id,hideId){
	if(id == "")
		return ;
	if(typeof(hideId) != "undefined" && hideId != "")
		$("#"+hideId).hide();
	$("#"+id).printArea();
	if(typeof(hideId) != "undefined" && hideId != "")
		$("#"+hideId).show();
}


//输入小数
function clearNoNum(event,obj){
    //响应鼠标事件，允许左右方向键移动
    event = window.event||event;
    if(event.keyCode == 37 | event.keyCode == 39){
        return;
    }
    //先把非数字的都替换掉，除了数字和.
    obj.value = obj.value.replace(/[^-\d.]/g,"");
    //必须保证第一个为数字而不是.
    obj.value = obj.value.replace(/^\./g,"");
    //保证只有出现一个.而没有多个.
    obj.value = obj.value.replace(/\.{2,}/g,".");
  //保证只有出现一个-而没有多个.
    obj.value = obj.value.replace(/\-{2,}/g,"-");
    //保证.只出现一次，而不能出现两次以上
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
}

//输入整数
function clearNoNumAndInteger(event,obj){
    //响应鼠标事件，允许左右方向键移动
    event = window.event||event;
    if(event.keyCode == 37 | event.keyCode == 39){
        return;
    }
    //先把非数字的都替换掉，除了数字和.
    obj.value = obj.value.replace(/[^\d]/g,"");
}

function checkNum(obj){
    //为了去除最后一个.
    obj.value = obj.value.replace(/\.$/g,"");
}

function DigitInput(obj,event) {
//响应鼠标事件，允许左右方向键移动
event = window.event||event;
    if(event.keyCode == 37 | event.keyCode == 39){
        return;
    }
    obj.value = obj.value.replace(/\D/g,"");      
}

//函数节流，用于优化window.resize或拖拽事件
var throttleV2 = function(fn, delay, mustRunDelay){
    var timer = null;
    var t_start;
    return function(){
        var context = this, args = arguments, t_curr = +new Date();
        clearTimeout(timer);
        if(!t_start){
            t_start = t_curr;
        }
        if(t_curr - t_start >= mustRunDelay){
            fn.apply(context, args);
            t_start = t_curr;
        }
        else {
            timer = setTimeout(function(){
                fn.apply(context, args);
            }, delay);
        }
    };
};

function isWecharBrowser(){
	var ua = navigator.userAgent.toLowerCase();
	var wechatFlag = false;
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		wechatFlag = true;
	} else {
		wechatFlag = false;
	}
	if(1>2 && !wechatFlag){
		window.location.href="/";
	}
}

function getCurrentDateyyyyMMddHHmmss(){
	var d = new Date();
	var vYear = d.getFullYear();
	var vMon = d.getMonth() + 1;
	var vDay = d.getDate();
	var h = d.getHours(); 
	var m = d.getMinutes(); 
	var se = d.getSeconds(); 
	return vYear+"-"+vMon+"-"+vDay+" "+h+":"+m+":"+se;
}

/**
 * 日期时间
 * yzh
 * 2015-03-20
 */
function formatFullDate(dt) {
    var d ;
    if (dt == null || dt == '' || typeof dt == 'undefined') {
        d = new Date();
    } else {
        d = new Date(dt);
    }
    var vYear = d.getFullYear();
    var vMon = d.getMonth() + 1;
    var vDay = d.getDate();
    var h = d.getHours();
    var m = d.getMinutes();
    var se = d.getSeconds();
    return vYear+"-"+vMon+"-"+vDay+" "+h+":"+m+":"+se;
}

function comptime(beginTime, endTime) {
    var a = (parseDate(endTime) - parseDate(beginTime)) / 3600 / 1000;
    if (a < 0) {
    	return false;
    } else if (a > 0) {
    	return true;
    } else if (a == 0) {
    	return false;
    } else {
    	return false;
    }
}

/**
 * 清除表单
 * @param objE 表单元素
 */
function clearForm(objE){//objE为form表单
    $(objE).find(':input').each(  
        function(){  
            switch(this.type){  
                case 'passsword':  
                case 'select-multiple':  
                case 'select-one':  
                case 'hidden':
                case 'text':  
                case 'textarea':  
                    $(this).val('');  
                    break;  
                case 'checkbox':  
                case 'radio':  
                    this.checked = false;  
            }  
        }     
    );  
}


/**
 * 表单赋值
 * @param data 单个bean数据
 */
function loadFormData(data,form){
	$(form).find(':input').each(
        function(){
        	var name = $(this).attr("name");
            switch(this.type){
                //case 'passsword':  
                case 'select-multiple':
                case 'select-one':
                case 'hidden':
                case 'text':  
                case 'textarea':
                	(data[name] != undefined) && $(this).val(data[name]).trigger('change');  
                	break;
                case 'checkbox':  
                case 'radio':
                	(data[name] != undefined) && data[name] == 1 && (this.checked = true) && $(this).trigger('change');
            }
        }
    );
}

/**
 * 表单取query condition
 * @param data 单个bean数据
 */
function getFormQryCond(queryCond,form){
	$(form).find(':input').each(
        function(){
        	var name = $(this).attr("name");
            switch(this.type){
                //case 'passsword':  
                case 'select-multiple':  
                case 'select-one':
                case 'hidden':
                case 'text':  
                case 'textarea':  
                	queryCond+="&"+name+"="+encodeURIComponent($(this).val());  
                	break;
                case 'checkbox':  
                case 'radio':
                	queryCond+="&"+name+"="+ (this.checked == true); 
            }
        }
    );
	return queryCond;
}

/**
 * 加载牌号(商品)数据
 * @param goodsName 牌号(商品)名称搜索字段
 * @param id 牌号(商品)ID搜索字段
 * @param cate_id 类别ID搜索字段
 * @param selectDom 对应的select选择框 把获取到的数据注入对应的select选择框内
 * @param async 是否异步传输 如需要返回获取到的数据 则需要同步返回 async=false 反之异步
 * @param defaultGoodsId  默认选中的牌号
 * 
 * */
function loadGoodsData(async,selectDom,goodsName,id,cate_id, defaultGoodsId){
	if(async == undefined || async == null){
		async = true;
	}
    var timestamp = (new Date()).valueOf();  
	var list = [];
	$(selectDom).empty();
	var ajax = $.ajax({
			        cache: true,
			        type: "POST",
			        url:"/GoodsList.do?action=query&t="+timestamp,
			        data:{"goodsName":goodsName||'',"id":id || '',"cateId":cate_id || '',pageSize:300},
			        async: async,//是否同步,默认异步
			        dataType:"json",
			        error: function(request,info,e) {
			        	if(request && request.readyState != 0)
			        		setErrorAlert("loadGoodsData超时或系统异常"+info+","+e);
			        },
			        success: function(data) {
			        	if(data && data.total){
			        		list = data.rows;
			        		if(selectDom){
				        		var selectDomList = [];
				        		if(typeof(selectDom) == 'string' && selectDom.indexOf(",")!=-1){
				        			selectDomList = selectDom.split(",");
				        		}
				        		if(selectDomList.length > 0){
				        			$.each(data.rows,function(i,o){
				        				for(var x = 0;x < selectDomList.length ;x ++){
				        					if(i == 0){
				        						$(selectDomList[x]).append("<option value=''>请选择.....</option>");
				        					}
				        					if(o.id == defaultGoodsId){
				        						
				        						$(selectDomList[x]).append("<option value='"+o.id+"' cateId='"+o.cateId+"' selected>"+o.goodsName+"</option>");
				        					}else{
				        						
				        						$(selectDomList[x]).append("<option value='"+o.id+"' cateId='"+o.cateId+"'>"+o.goodsName+"</option>");
				        					}
				        				}
					        	    });
				        		}else{
				        			$.each(data.rows,function(i,o){
				        				if(i == 0){
				        					$(selectDom).append("<option value=''>请选择.....</option>");
				        				} 
				        				if(o.id == defaultGoodsId){
			        						
			        						$(selectDom).append("<option value='"+o.id+"' cateId='"+o.cateId+"' selected>"+o.goodsName+"</option>");
			        					}else{
			        						
			        						$(selectDom).append("<option value='"+o.id+"' cateId='"+o.cateId+"'>"+o.goodsName+"</option>");
			        					}
					        	    });
				        		}
			        		}
			    		}
			        }
			    });
	
//	if(ajax && ajax.responseJSON && ajax.responseJSON.rows){
//		list = ajax.responseJSON.rows;
//	}
	return list;
}

/**
 * 加载公司数据
 * @param companyName 公司名称搜索字段
 * @param companyId 公司ID搜索字段
 * @param selectDom 对应的select选择框 把获取到的数据注入对应的select选择框内
 * @param async 是否异步传输 如需要返回获取到的数据 则需要同步返回 async=false 反之异步
 * */
function loadCompanyData(async,selectDom,companyName,companyId){
	if(async == undefined || async == null){
		async = true;
	}
    var timestamp = (new Date()).valueOf();  
	var list = [];
	var ajax = $.ajax({
			        cache: true,
			        type: "POST",
			        url:"/Company.do?action=query&t="+timestamp,
			        data:{"companyName":companyName||'',"id":companyId||'',pageSize:9999999},
			        async: async,//是否同步,默认异步
			        dataType:"json",
			        error: function(request,info,e) {
			        	if(request && request.readyState != 0)
			        		setErrorAlert("loadCompanyData超时或系统异常"+info+","+e);
			        },
			        success: function(data) {
			        	if(data  && data.total){
			        		list = data.rows;
			        		if(selectDom){
				        		var selectDomList = [];
				        		if(typeof(selectDom) == 'string' && selectDom.indexOf(",")!=-1){
				        			selectDomList = selectDom.split(",");
				        		}
				        		if(selectDomList.length > 0){
				        			$.each(data.rows,function(i,o){
				        				for(var x = 0;x < selectDomList.length ;x ++){
				        					$(selectDomList[x]).append("<option value='"+o.companyId+"'>"+o.companyName+"</option>");
				        				}
					        	    });
				        		}else{
				        			$.each(data.rows,function(i,o){
					        	    	$(selectDom).append("<option value='"+o.companyId+"'>"+o.companyName+"</option>");
					        	    });
				        		}
			        		}
			    		}
			        }
			    });
	
//	if(ajax && ajax.responseJSON && ajax.responseJSON.rows){
//		list = ajax.responseJSON.rows;
//	}
	return list;
}
/**
 * 加载公司数据,check u...
 * @param companyName 公司名称搜索字段
 * @param companyId 公司ID搜索字段
 * @param selectDom 对应的select选择框 把获取到的数据注入对应的select选择框内
 * @param async 是否异步传输 如需要返回获取到的数据 则需要同步返回 async=false 反之异步
 * @param defaultCompanyId 默认选中的公司id
 * */
function loadCompanyData4U(async,selectDom,companyName,companyId, defaultCompanyId){
	if(async == undefined || async == null){
		async = true;
	}
    var timestamp = (new Date()).valueOf();  
	var list = [];
	var ajax = $.ajax({
			        cache: true,
			        type: "POST",
			        url:"/LinkCompanyUser.do?action=query4u&t="+timestamp+"&status=2",
			        data:{"companyName":companyName||'',"id":companyId||'',pageSize:9999999},
			        async: async,//是否同步,默认异步
			        dataType:"json",
			        error: function(request,info,e) {
			        	if(request && request.readyState != 0)
			        		setErrorAlert("loadCompanyData4U超时或系统异常"+info+","+e);
			        },
			        success: function(data) {
			        	if(data  && data.total){
			        		list = data.rows;
			        		if(selectDom){
			        			var selectDomList = [];
				        		if(typeof(selectDom) == 'string' && selectDom.indexOf(",")!=-1){
				        			selectDomList = selectDom.split(",");
				        		}
				        		if(selectDomList.length > 0){
				        			$.each(data.rows,function(i,o){
				        				for(var x = 0;x < selectDomList.length ;x ++){
				        					if(o.companyId == defaultCompanyId){
				        						
				        						$(selectDomList[x]).append("<option value='"+o.companyId+"' selected>"+o.companyName+"</option>");
				        					}else{
				        						
				        						$(selectDomList[x]).append("<option value='"+o.companyId+"'>"+o.companyName+"</option>");
				        					}
				        				}
					        	    });
				        		}else{
				        			$.each(data.rows,function(i,o){
				        				if(o.companyId == defaultCompanyId){
				        					
				        					$(selectDom).append("<option value='"+o.companyId+"' selected>"+o.companyName+"</option>");
				        				}else{
				        					
				        					$(selectDom).append("<option value='"+o.companyId+"'>"+o.companyName+"</option>");
				        				}
					        	    });
				        		}
			        		}
			    		}
			        }
			    });
	
//	if(ajax && ajax.responseJSON && ajax.responseJSON.rows){
//		list = ajax.responseJSON.rows;
//	}
	return list;
}

/**
 * 加载仓库数据
 * @param storeName 公司名称搜索字段
 * @param storeId 公司ID搜索字段
 * @param selectDom 对应的select选择框 把获取到的数据注入对应的select选择框内
 * @param async 是否异步传输 如需要返回获取到的数据 则需要同步返回 async=false 反之异步
 * */	
function loadStoreData(async,selectDom,storeName,storeId){
	if(async == undefined || async == null){
		async = true;
	}
	var timestamp = (new Date()).valueOf();  
	var list = [];
	var ajax = $.ajax({
			        cache: true,
			        type: "POST",
			        url:"/GoodsStockHouse.do?action=query&t="+timestamp,
			        data:{"houseName":storeName||'',"id":storeId||'',pageSize:9999999},
			        async: async,//是否同步,默认异步
			        dataType:"json",
			        error: function(request,info,e) {
			        	if(request && request.readyState != 0)
			        		setErrorAlert("loadStoreData超时或系统异常"+info+","+e);
			        },
			        success: function(data) {
			        	if(data && data.total){
			        		list = data.rows;
			        		if(selectDom){
				        		var selectDomList = [];
				        		if(typeof(selectDom) == 'string' && selectDom.indexOf(",")!=-1){
				        			selectDomList = selectDom.split(",");
				        		}
				        		if(selectDomList.length > 0){
				        			$.each(data.rows,function(i,o){
				        				for(var x = 0;x < selectDomList.length ;x ++){
				        					$(selectDomList[x]).append("<option value='"+o.id+"'>"+o.houseName+"</option>");
				        				}
					        	    });
				        		}else{
				        			$.each(data.rows,function(i,o){
					        	    	$(selectDom).append("<option value='"+o.id+"'>"+o.houseName+"</option>");
					        	    });
				        		}
			        		}
			    		}
			        }
			    });
	
//	if(ajax && ajax.responseJSON && ajax.responseJSON.rows){
//		list = ajax.responseJSON.rows;
//	}
	return list;
}

/**
 * 加载地区数据.
 * @param async 是否异步传输 如需要返回获取到的数据 则需要同步返回 async=false 反之异步
 * @param selectDom 对应的select选择框 把获取到的数据注入对应的select选择框内
 * @param areaCode 区域编辑
 * @param areaName 区域名称
 * */	
function loadAreaData(async,selectDom,areaCode,areaName,defaultAreaCode,callback){
	if(async == undefined || async == null){
		async = true;
	}
	var timestamp = (new Date()).valueOf();
	var url = "/Area.do?action=queryStockArea&t="+timestamp;
	var params = {"areaCode":areaCode||'',"areaName":areaName||'',pageSize:9999999};
	var list = [];
	var ajax = $.ajax({
		cache: true,
        type: "POST",
        url: url,
        data: params,
        async: async,//是否同步,默认异步
        dataType:"json",
        error: function(request,info,e) {
        	if(request && request.readyState != 0)
        		setErrorAlert("loadAreaData超时或系统异常"+info+","+e);
        },
        success: function(data) {
        	if(data && data.total){
        		list = data.rows;
        		if(selectDom){
	        		var selectDomList = [];
	        		if(typeof(selectDom) == 'string' && selectDom.indexOf(",")!=-1){
	        			selectDomList = selectDom.split(",");
	        		}
	        		if(selectDomList.length > 0){
	        			$.each(data.rows,function(i,o){
	        				for(var x = 0;x < selectDomList.length ;x ++){
	        					if(defaultAreaCode == o.areaCode){
	        						
	        						$(selectDomList[x]).append("<option value='"+o.areaCode+"' selected>"+o.areaName+"</option>");
	        					}else{
	        						
	        						$(selectDomList[x]).append("<option value='"+o.areaCode+"'>"+o.areaName+"</option>");
	        					}
	        				}
		        	    });
	        		}else{
	        			$.each(data.rows,function(i,o){
	        				if(defaultAreaCode == o.areaCode){
        						
        						$(selectDom).append("<option value='"+o.areaCode+"' selected>"+o.areaName+"</option>");
        					}else{
        						
        						$(selectDom).append("<option value='"+o.areaCode+"'>"+o.areaName+"</option>");
        					}
		        	    });
	        		}
					callback && callback();
        		}
    		}
        }
    });
	return list;
}
/**
 * 加载地区数据.
 * @param async 是否异步传输 如需要返回获取到的数据 则需要同步返回 async=false 反之异步
 * @param selectDom 对应的select选择框 把获取到的数据注入对应的select选择框内
 * @param areaCode 区域编辑
 * @param areaName 区域名称
 * */	
function loadAreaDataBySelect2(selectDom,defaultAreaCode, defaultAreaName,areaCode,areaName){
	$(selectDom).val('');
	$(selectDom).select2({
		placeholder: defaultAreaName || '请选择地区',  //默认显示的数据
		allowClear: true,
		id: function (e) { 
			return e.areaCode;
		},
		formatResult: function(result, container, query, escapeMarkup){ //返回结果时做的操作
			return result.areaName;
		},
		formatSelection: function(item){//选择下拉框值时做的操作
			$(selectDom).val(item.areaCode);
			return item.areaName; //当前的输入框赋值
		},
		ajax:{
			url:"/Area.do?action=query",
			dataType: 'json',
			data: function(params, pageNo){
				//请求时，加入的参数
				return{
					areaName: params,
					pageSize: 10,
					t: (new Date()).valueOf()
				}
			},
			results: function(data, page){
				if(data.rows){
					/*$.each(data.rows, function(i, row){
						row.id = 0;
					});*/
					data.rows.splice(0,0,{id:0, areaName:'全部', areaCode:''});
					
					//请求后返回的结果
					return{
						results: data.rows
					};
				}else{
					return{
						results: {id:0, areaName:'全部', areaCode:''}
					};
				}
			}
		}
	});
	$(selectDom).val(defaultAreaCode);
}

/**
 * 加载地区与仓库级联列表数据
 * @param async 是否异步传输 如需要返回获取到的数据 则需要同步返回 async=false 反之异步
 * @param areaSelectDom 地区编码对应的select选择框 把获取到的数据注入对应的select选择框内
 * @param houseSelectDom 仓库编码对应的select选择框 把获取到的数据注入对应的select选择框内
 * @param isLoadHouse 是否在初始化时加载仓库信息，默认会加载
 * @param areaCode 地区编码
 * @param houseId 仓库id
 * @param areaName 地区名称
 * @param houseName 仓库名称 是否异步传输 如需要返回获取到的数据 则需要同步返回 async=false 反之异步
 * */	
function loadAreaHouseData(async, areaSelectDom, houseSelectDom, isLoadHouse, areaCode, houseId, areaName, houseName, defaultAreaCode, defaultHouseId){
	if(async == undefined || async == null){
		async = true;
	}
	if(isLoadHouse == undefined || isLoadHouse == null){
		isLoadHouse = true;
	}
	var timestamp = (new Date()).valueOf();  
	var list = [];
	//加载地区
	var ajax = $.ajax({
        cache: true,
        type: "POST",
        url:"/Area.do?action=queryStockArea&t="+timestamp,
        data:{"areaCode":areaCode||'',"areaName":areaName||'',pageSize:9999999},
        async: async,//是否同步,默认异步
        dataType:"json",
        error: function(request,info,e) {
        	if(request && request.readyState != 0)
        		setErrorAlert("loadAreaHouseData超时或系统异常"+info+","+e);
        },
        success: function(data) {
        	if(data && data.total){
        		list = data.rows;
        		$.each(data.rows,function(i,o){
        			if(i == 0 && isLoadHouse){
        				areaCode = defaultAreaCode || o.areaCode;
        				//根据选择的地区加载仓库
        				loadHouseData(async, houseSelectDom, areaCode, houseId, areaName, houseName, defaultHouseId);
        			}
        			if(o.areaCode == defaultAreaCode){
        				
        				$(areaSelectDom).append("<option value='"+o.areaCode+"' selected>"+o.areaName+"</option>");
        			}else{
        				$(areaSelectDom).append("<option value='"+o.areaCode+"'>"+o.areaName+"</option>");
        			}
        			
        	    });		
    		}
        }
    });
	
	//仓库根据区域的变动重新加载
	$(areaSelectDom).change(function(){
		var tempAreaCode =  this.value;
		//数据先清空
		$(houseSelectDom).empty();
		//根据选择的地区加载仓库
		loadHouseData(false, houseSelectDom, tempAreaCode, houseId, areaName, houseName);
	});
	return list;
}

/**
 * 加载地区与仓库级联列表数据
 * @param async 是否异步传输 如需要返回获取到的数据 则需要同步返回 async=false 反之异步
 * @param houseSelectDom 仓库编码对应的select选择框 把获取到的数据注入对应的select选择框内
 * @param areaCode 地区编码
 * @param houseId 仓库id
 * @param areaName 地区名称
 * @param houseName 仓库名称 是否异步传输 如需要返回获取到的数据 则需要同步返回 async=false 反之异步
 * */
function loadHouseData(async, houseSelectDom, areaCode, houseId, areaName, houseName, defaultHouseId){
	var timestamp = (new Date()).valueOf();
	var list = [];
	//根据选择的地区加载仓库
	var ajax = $.ajax({
		cache: true,
        type: "POST",
        url:"/GoodsStockHouse.do?action=query&t="+timestamp,
        data:{"houseName":houseName||'',"id":houseId||'',"areaCode":areaCode||'',"areaName":areaName||'',pageSize:9999999},
        async: async,//是否同步,默认异步
        dataType:"json",
        error: function(request,info,e) {
        	if(request && request.readyState != 0){
        		setErrorAlert("loadHouseData超时或系统异常"+info+","+e);
        	}
        },
        success: function(data) {
        	if(data && data.total){
        		list = data.rows;
        		$.each(data.rows,function(i,o){
        			if(o.id == defaultHouseId){
        				
        				$(houseSelectDom).append("<option value='"+o.id+"' selected>"+o.houseName+"</option>");
        			}else{
        				
        				$(houseSelectDom).append("<option value='"+o.id+"'>"+o.houseName+"</option>");
        			}
        	    });		
    		}
        }
    });
	return list;
}

function cateSelect(dom, defaultName, defaultValue, remark,remarkValue){
	$(dom).val('');
	$(dom).select2({
		placeholder: defaultName || '请选择品种',  //默认显示的数据
		allowClear: true,
		formatResult: function(result, container, query, escapeMarkup){ //返回结果时做的操作
			return result.cateName;
		},
		formatSelection: function(item){//选择下拉框值时做的操作
			$("#mainForm input[name='parentCateCode']").val(item.cateCode);
			return item.cateName; //当前的输入框赋值
		},
		ajax:{
			url:"/GoodsCategory.do?action=query",
			dataType: 'json',
			data: function(params, pageNo){
				//请求时，加入的参数
				return{
					cateName: params,
					pageSize: 10,
					t: (new Date()).valueOf()
				}
			},
			results: function(data, page){
				if(data.rows){
					
					data.rows.splice(0,0,{cateName: remark || '全部', id: remarkValue || ''});
					
					//请求后返回的结果
					return{
						results: data.rows
					};
				}else{
					return{
						results: {cateName:remark || '全部', id:''}
					};
				}
			}
		}
	});
	
	$(dom).val(defaultValue);
}

/**
 * 加载类别数据
 * @param cateName 类别名称搜索字段
 * @param cateId 类别ID搜索字段
 * @param selectDom 对应的select选择框 把获取到的数据注入对应的select选择框内
 * @param async 是否异步传输 如需要返回获取到的数据 则需要同步返回 async=false 反之异步
 * */	
function loadCateData(async,selectDom,cateName,cateId){
	if(async == undefined || async == null){
		async = true;
	}
	 
	var timestamp = (new Date()).valueOf();  
 	var list = [];
	var ajax = $.ajax({
			        cache: true,
			        type: "POST",
			        url:"/GoodsCategory.do?action=query&t="+timestamp,
			        data:{"cateName":cateName||'',"id":cateId||'',pageSize:9999999},
			        async: async,//是否同步,默认异步
			        dataType:"json",
			        error: function(request,info,e) {
			        	if(request && request.readyState != 0)
			        		setErrorAlert("loadCateData超时或系统异常"+info+","+e);
			        },
			        success: function(data) {
			        	if(data && data.total){
			        		list = data.rows;
			        		if(selectDom){
				        		var selectDomList = [];
				        		if(typeof(selectDom) == 'string' && selectDom.indexOf(",")!=-1){
				        			selectDomList = selectDom.split(",");
				        		}
				        		if(selectDomList.length > 0){
				        			$.each(data.rows,function(i,o){
				        				for(var x = 0;x < selectDomList.length ;x ++){
				        					$(selectDomList[x]).append("<option value='"+o.id+"'>"+o.cateName+"</option>");
				        				}
					        	    });
				        		}else{
				        			$.each(data.rows,function(i,o){
					        	    	$(selectDom).append("<option value='"+o.id+"'>"+o.cateName+"</option>");
					        	    });
				        		}
			        		}
			    		}
			        }
			    });
	
	return list;
}

/**
 * 加载类别牌号数据.具有级联功能
 * @param async 是否异步传输 如需要返回获取到的数据 则需要同步返回 async=false 反之异步
 * @param cateSelectDom 品类对应的select选择框 把获取到的数据注入对应的select选择框内
 * @param goodsSelectDom 牌号对应的select选择框 把获取到的数据注入对应的select选择框内
 * @param isLoadGoods 是否在仓库数据初始化时就加载牌号数据，为true时加载，否则只有在改动品类时，再会加载
 * @param cateId 类别ID搜索字段
 * @param cateName 类别名称搜索字段
 * @param defaultCateId 默认选中的品种
 * @param defaultGoodsId 默认选中的牌号
 * 
 * */	
function loadCateGoodsData(async,cateSelectDom, goodsSelectDom, isLoadGoods,cateId, cateName, defaultCateId, defaultGoodsId){
	if(async == undefined || async == null){
		async = true;
	}
	if(isLoadGoods == undefined || isLoadGoods == null){
		isLoadGoods = true;
	}
	 
	var timestamp = (new Date()).valueOf();  
 	var list = [];
 	var cateSelectDomList = [];
	if(typeof(cateSelectDom) == 'string' && cateSelectDom.indexOf(",")!=-1){
		cateSelectDomList = cateSelectDom.split(",");
	}else{
		cateSelectDomList = [cateSelectDom];
	}
	var goodsSelectDomList = [];
	if(typeof(goodsSelectDom) == 'string' && goodsSelectDom.indexOf(",")!=-1){
		goodsSelectDomList = goodsSelectDom.split(",");
	}else{
		goodsSelectDomList = [goodsSelectDom];
	}
	if(cateSelectDomList.length > 0){
		$.each(cateSelectDomList,function(index, cateSelect){
			//品种改变，牌号跟着改变
			$(cateSelect).change(function(){
				cateId = this.value;
				$(goodsSelectDomList[index]).empty();
				loadGoodsData(false, goodsSelectDomList[index], null, null,cateId, defaultGoodsId);
			});
		});
	}
	
	var ajax = $.ajax({
		cache: true,
        type: "POST",
        url:"/GoodsCategory.do?action=query&t="+timestamp,
        data:{"cateName":cateName||'',"id":cateId||'',pageSize:300},
        async: async,//是否同步,默认异步
        dataType:"json",
        error: function(request,info,e) {
        	if(request && request.readyState != 0)
        		setErrorAlert("loadCateGoodsData超时或系统异常"+info+","+e);
        },
        success: function(data) {
        	if(data && data.total){
        		list = data.rows;
        		if(cateSelectDom){
	        		if(cateSelectDomList.length > 0){
	        			$.each(data.rows,function(i,o){
	        				if(i == 0){
	        					cateId = o.id;
	        					//根据品种加载牌号
	        					if(defaultCateId){
		        					//根据品种加载牌号
		        					loadGoodsData(true,goodsSelectDom, null, null,defaultCateId, defaultGoodsId);
		        				}else{
		        					loadGoodsData(true,goodsSelectDom, null, null,cateId, defaultGoodsId);
		        				}
	        				}
	        				for(var x = 0;x < cateSelectDomList.length ;x ++){
	        					
	        					if(i == 0){
	        						$(cateSelectDomList[x]).append("<option value=''>请选择.....</option>");
	        					}
	        					
	        					if(defaultCateId == o.id){
	        						
	        						$(cateSelectDomList[x]).append("<option value='"+o.id+"' selected>"+o.cateName+"</option>");
	        					}else{
	        						
	        						$(cateSelectDomList[x]).append("<option value='"+o.id+"'>"+o.cateName+"</option>");
	        					}
	        						
	        				}
		        	    });
	        		}else{
	        			$.each(data.rows,function(i,o){
	        				if(i == 0){
	        					$(cateSelectDom).append("<option value=''>请选择.....</option>");
	        					if( defaultCateId){
	        						//根据品种加载牌号
	        						loadGoodsData(true,goodsSelectDom, null, null,defaultCateId, defaultGoodsId);
	        					}else if( isLoadGoods){
	        						cateId = o.id;
	        						//根据品种加载牌号
	        						loadGoodsData(true,goodsSelectDom, null, null,cateId, defaultGoodsId);
	        					}
	        				}
	            			if(defaultCateId == o.id){
	            				
	            				$(cateSelectDom).append("<option value='"+o.id+"' selected>"+o.cateName+"</option>");
	            			}else{
	            				
	            				$(cateSelectDom).append("<option value='"+o.id+"'>"+o.cateName+"</option>");
	            			}
	            				
	            	    });	
	        		}
        		}
    		}
        }
    });
	
	return list;
}

/**
 * 加载类别牌号数据.具有级联功能
 * @param async 是否异步传输 如需要返回获取到的数据 则需要同步返回 async=false 反之异步
 * @param cateSelectDom 品类对应的select选择框 把获取到的数据注入对应的select选择框内
 * @param goodsIdDom 牌号id对应的input输入框 
 * @param goodsSelectDom 牌号对应的input输入框
 * @param defaultCateId 默认选中的品种
 * @param defaultGoodsId 默认显示的品牌id
 * @param defaultGoodsName 默认显示的牌号
 * 
 * */	
function loadCateGoodsDataBySelect2(async,cateSelectDom, goodsIdDom, goodsSelectDom,  defaultCateId, defaultGoodsId, defaultGoodsName,defaultCateName,cateNameDom,en,industryId){
	if(async == undefined || async == null){
		async = true;
	}
	
	var timestamp = (new Date()).valueOf();  
 	var list = [];
 	var cateSelectDomList = [];
	if(typeof(cateSelectDom) == 'string' && cateSelectDom.indexOf(",")!=-1){
		cateSelectDomList = cateSelectDom.split(",");
	}else{
		cateSelectDomList = [cateSelectDom];
	}
	//品种名称输入框处理
	var cateNameDomList = [];
	if(typeof(cateNameDom) == 'string' && cateNameDom.indexOf(",")!=-1){
		cateNameDomList = cateNameDom.split(",");
	}else{
		cateNameDomList = [cateNameDom];
	}
	
	//牌号名称输入框处理
	var goodsSelectDomList = [];
	if(typeof(goodsSelectDom) == 'string' && goodsSelectDom.indexOf(",")!=-1){
		goodsSelectDomList = goodsSelectDom.split(",");
	}else{
		goodsSelectDomList = [goodsSelectDom];
	}
	
	//牌号id输入框处理
	var goodsIdDomList = [];
	if(typeof(goodsIdDom) == 'string' && goodsIdDom.indexOf(",")!=-1){
		goodsIdDomList = goodsIdDom.split(",");
	}else{
		goodsIdDomList = [goodsIdDom];
	}
	
	var selectedCateId = defaultCateId || '';
	if(cateSelectDomList.length > 0){
		$.each(cateSelectDomList,function(index, cateSelect){
			$(goodsIdDomList[index]).val('');
			//让每一个牌号都具有select2功能
			$(goodsIdDomList[index]).select2({
				placeholder: defaultGoodsName || (en=='en'?'Please select Goods':'请选择...'),  //默认显示的数据
				allowClear: true,
				formatResult: function(result, container, query, escapeMarkup){ //返回结果时做的操作
					$(goodsIdDomList[index]).blur();
					return result.goodsName;
				},
				formatSelection: function(item){//选择下拉框值时做的操作
					$(goodsIdDomList[index]).val(item.goodsId); 
					if(goodsSelectDomList.length > 0){
						$(goodsSelectDomList[index]).val(item.goodsName == (en=='en'?'All':'全部') ? '' : item.goodsName);
					}
					$(goodsIdDomList[index]).blur();
					return item.goodsName; //当前的输入框赋值
				},
				ajax:{
					url:"/GoodsList.do?action=query",
					dataType: 'json',
					data: function(params, pageNo){
						//请求时，加入的参数
						return{
							cateId: selectedCateId,
							goodsName: params,
							pageSize: 10,
							industryId : industryId || '',
							t: (new Date()).valueOf()
						}
					},
					results: function(data, page){
						if(data.rows){
							
							data.rows.splice(0,0,{goodsName:(en=='en'?'All':'全部'), id:''});
							
							//请求后返回的结果
							return{
								results: data.rows
							};
						}else{
							return{
								results: {goodsName:(en=='en'?'All':'全部'), id:''}
							};
						}
					}
				}
			});
			if($(goodsSelectDomList[index])){
				$(goodsSelectDomList[index]).val(defaultGoodsName);
			}
			$(goodsIdDomList[index]).val(defaultGoodsId);
			
			//让每一个品种框都具有select2功能
			$(cateSelectDomList[index]).val('');
			$(cateSelectDomList[index]).select2({
				placeholder: defaultCateName || (en=='en'?'Please select Types':'请选择...'),  //默认显示的数据
				allowClear: true,
				formatResult: function(result, container, query, escapeMarkup){ //返回结果时做的操作
					$(cateSelect).blur();
					return result.cateName;
				},
				formatSelection: function(item){//选择下拉框值时做的操作
					$(cateSelect).val(item.id); 
					if(cateNameDomList.length > 0){
						$(cateNameDomList[index]).val(item.cateName == (en=='en'?'All':'全部') ? '' : item.cateName);
					}
					//品种改变，牌号跟着改变
					selectedCateId =item.id;
					if(goodsSelectDomList.length > 0){
						$(goodsSelectDomList[index]).val("");
					}
					$(goodsIdDomList[index]).val("");
					$(goodsIdDomList[index]).siblings(".select2-container").children("a").children(".select2-chosen").text("");
					$(cateSelect).blur();
					
					return item.cateName; //当前的输入框赋值
				},
				ajax:{
					url:"/GoodsCategory.do?action=query&t="+timestamp,
					dataType: 'json',
					data: function(params, pageNo){
						//请求时，加入的参数
						return{
							cateId: selectedCateId,
							cateName: params,
							pageSize: 10,
							industryId : typeof industryId != 'undefined'? industryId: '',
							t: (new Date()).valueOf()
						}
					},
					results: function(data, page){
						if(data.rows){
							
							data.rows.splice(0,0,{cateName:(en=='en'?'All':'全部'), id:''});
							
							//请求后返回的结果
							return{
								results: data.rows
							};
						}else{
							return{
								results: {cateName:(en=='en'?'All':'全部'), id:''}
							};
						}
					}
				}
			});
			$(cateSelectDomList[index]).val(defaultCateId);
			if($(cateNameDomList[index])){
				$(cateNameDomList[index]).val(defaultGoodsName);
			}
		});
	}
	
	return list;
}

/**
 * 加载牌号(商品)数据
 * @param goodsName 牌号(商品)名称搜索字段
 * @param id 牌号(商品)ID搜索字段
 * @param cate_id 类别ID搜索字段
 * @param selectDom 对应的select选择框 把获取到的数据注入对应的select选择框内
 * @param async 是否异步传输 如需要返回获取到的数据 则需要同步返回 async=false 反之异步
 * @param defaultGoodsName  默认显示的牌号
 * 
 * */
function loadGoodsDataBySelect2(async,selectDom,goodsIdDom,cateId, defaultGoodsName){
	$(selectDom).select2({
		placeholder: defaultGoodsName,  //默认显示的数据
		allowClear: true,
		formatResult: function(result, container, query, escapeMarkup){ //返回结果时做的操作
			return result.goodsName;
		},
		formatSelection: function(item){//选择下拉框值时做的操作
			$("#goodsId").val(item.goodsId); 
			$(selectDom).val(item.goodsName);
			return item.goodsName; //当前的输入框赋值
		},
		ajax:{
			url:"/GoodsList.do?action=query",
			dataType: 'json',
			data: function(params, pageNo){
				//请求时，加入的参数
				return{
					cateId: $("#cateId").val(),
					goodsName: params,
					pageSize: 10,
					t: (new Date()).valueOf()
				}
			},
			results: function(data, page){
				//请求后返回的结果
				return{
					results: data.rows
				};
			}
		}
	});
	$(selectDom).val(defaultGoodsName);
}

/**
 * 通过select2组件加载公司数据
 * @param selectDom 需要加载select2的dom
 * @param isLink 是否查询用户所属公司
 * @param defaultCompanyName
 * @param defaultCompanyId
 * @param companyName
 * @param isNeedAll 是否需要提供全部公司选项 方便查询
 * @param unNeedIndustryId 是否过滤行业ID查询 值为1则过滤
 * @param lang
 */
function loadCompanyDataBySelect2(selectDom,isLink,defaultCompanyName,defaultCompanyId, companyName,isNeedAll,unNeedIndustryId,lang){
	if(selectDom && selectDom != undefined){
		var url = "/Company.do?action=query";
		var resMsg="没有找到匹配项";
		if(isLink){
			resMsg="未查到您代理的公司，请查询我的公司是否上传三证并审核通过！";
			url = "/LinkCompanyUser.do?action=query4u&status=2";
		}
		selectDom.val('');
		selectDom.select2({
			placeholder: defaultCompanyName || showCompanyTip(lang),
			allowClear: false,
			setDefaultVal : [selectDom.siblings("input.companyName")],
			formatResult: function(result, container, query, escapeMarkup){ //返回结果时做的操作
				selectDom.blur();
				return result.companyName || result.placeholder;
			},
			formatNoMatches: function () { return resMsg; },
			formatSelection: function(item){//选择下拉框值时做的操作
				selectDom.siblings("input.companyName").val(item.companyName);
				
				var tempName = $(companyName);
				if(tempName){
					$(tempName).val(item.companyName);
				}
				if(isLink){
					selectDom.val(item.companyId);
				}
				selectDom.blur();
				return item.companyName; //当前的输入框赋值
			},
			ajax:{
				url:url,
				dataType: 'json',
				data: function(params, pageNo){
					if(params){
						isNeedAll = false;
					}else{
						isNeedAll = true;
					}
					//请求时，加入的参数
					return{
						companyName: params,
						pageSize: 20,
						unNeedIndustryId : unNeedIndustryId || -1,
						t: (new Date()).valueOf()
					}
				},
				results: function(data, page){
					var list = [];
					if(isNeedAll){
						list.push({id : '',companyName:'',placeholder:showCompanyTipAll(lang)});
					}
					//请求后返回的结果
					if(data&&data.rows&&data.rows.length > 0){
						$.each(data.rows,function(i,o){
							list.push(o);
						});
						return{
							results: list
						};
					}else{
						//alert("未查到您代理的公司，请查询我的公司是否上传三证并审核通过！");
						return {};
					}
				}
			}
		});
		selectDom.val(defaultCompanyId);
		if(!isLink){
			selectDom.siblings("input.companyName").val(defaultCompanyName);
		}
		var tempName = $(companyName);
		if(tempName){
			$(tempName).val(defaultCompanyName);
		}
	}
}


/**
 * 通过select2组件加载公司数据
 * @param selectDom 需要加载select2的dom
 * @param isLink 是否查询用户所属公司
 * @param defaultCompanyName
 * @param defaultCompanyId
 * @param companyName
 * @param isNeedAll 是否需要提供全部公司选项 方便查询
 * @param unNeedIndustryId 是否过滤行业ID查询 值为1则过滤
 * @param lang
 */
function loadCompanyDataBySelect2Forpt(selectDom,isLink,defaultCompanyName,defaultCompanyId, companyName,isNeedAll,unNeedIndustryId,lang){
	if(selectDom && selectDom != undefined){
		var url = "/Company.do?action=query&deleteFlag=0";
		var resMsg="没有找到匹配项";
		if(isLink){
			resMsg="未查到您代理的公司，请查询我的公司是否上传三证并审核通过！";
			url = "/LinkCompanyUser.do?action=query4u&status=2";
		}
		selectDom.val('');
		selectDom.select2({
			placeholder: defaultCompanyName || showCompanyTip(lang),
			allowClear: false,
			setDefaultVal : [selectDom.siblings("input.companyName")],
			formatResult: function(result, container, query, escapeMarkup){ //返回结果时做的操作
				selectDom.blur();
				return result.companyName || result.placeholder;
			},
			formatNoMatches: function () { return resMsg; },
			formatSelection: function(item){//选择下拉框值时做的操作
				selectDom.siblings("input.companyName").val(item.companyName);
				
				var tempName = $(companyName);
				if(tempName){
					$(tempName).val(item.companyName);
				}
				if(isLink){
					selectDom.val(item.companyId);
				}
				selectDom.blur();
				return item.companyName; //当前的输入框赋值
			},
			ajax:{
				url:url,
				dataType: 'json',
				data: function(params, pageNo){
					if(params){
						isNeedAll = false;
					}else{
						isNeedAll = true;
					}
					//请求时，加入的参数
					return{
						companyName: params,
						pageSize: 20,
						unNeedIndustryId : unNeedIndustryId || -1,
						t: (new Date()).valueOf()
					}
				},
				results: function(data, page){
					var list = [];
					if(isNeedAll){
						list.push({id : '',companyName:'',placeholder:showCompanyTipAll(lang)});
					}
					//请求后返回的结果
					if(data&&data.rows&&data.rows.length > 0){
						$.each(data.rows,function(i,o){
							list.push(o);
						});
						return{
							results: list
						};
					}else{
						//alert("未查到您代理的公司，请查询我的公司是否上传三证并审核通过！");
						return {};
					}
				}
			}
		});
		selectDom.val(defaultCompanyId);
		if(!isLink){
			selectDom.siblings("input.companyName").val(defaultCompanyName);
		}
		var tempName = $(companyName);
		if(tempName){
			$(tempName).val(defaultCompanyName);
		}
	}
}

// 公司提示
// TODO
function showCompanyTip(lang) {
	if (lang == 'en') return 'Please select';
	if (lang == 'rus') return 'Выберите';
	if (lang == 'span') return 'Por favor, seleccione';
	return '请选择公司';
}
function showCompanyTipAll(lang) {
	if (lang == 'en') return 'All companies';
	if (lang == 'rus') return 'Все компаний';
	if (lang == 'span') return 'Todas las empresas';
	return '全部公司';
}

/**
 * 加载字典表数据
 * @param columnName 列名称搜索字段
 * @param tableName 表名搜索字段
 * @param id 字典ID搜索字段
 * @param columnValueEnum 数据库表列常量枚举值搜索
 * @param selectDom 对应的select选择框 把获取到的数据注入对应的select选择框内
 * @param async 是否异步传输 如需要返回获取到的数据 则需要同步返回 async=false 反之异步
 * */	
function loadDictionaryData(async,selectDom,columnName,tableName,id,columnValueEnum){
	if(async == undefined || async == null){
		async = true;
	}
	
	var timestamp = (new Date()).valueOf();  
	var list = [];
	var ajax = $.ajax({
			        cache: true,
			        type: "POST",
			        url:"/AdminWorkDictionary.do?action=query&t="+timestamp,
			        data:{"columnName":columnName||'',"tableName":tableName,"id":id||'','columnValueEnum':columnValueEnum || '',pageSize:9999999},
			        async: async,//是否同步,默认异步
			        dataType:"json",
			        error: function(request,info,e) {
			        	if(request && request.readyState != 0)
			        		setErrorAlert("loadDictionaryData超时或系统异常"+info+","+e);
			        },
			        success: function(data) {
			        	if(data && data.total){
			        		list = data.rows;
			        		if(selectDom){
				        	    $.each(data.rows,function(i,o){
				        	    	$(selectDom).append("<option value='"+o.id+"'>"+o.columnValueEnum+"</option>");
				        	    });
			        		}
			    		}
			        }
			    });
	
	return list;
}

/**
 * 加载字典表数据,显示下拉列表时,value=columnValueEnum 显示的是columnValueDesc
 * @param columnName 列名称搜索字段
 * @param tableName 表名搜索字段
 * @param id 字典ID搜索字段
 * @param columnValueEnum 数据库表列常量枚举值搜索
 * @param selectDom 对应的select选择框 把获取到的数据注入对应的select选择框内
 * @param async 是否异步传输 如需要返回获取到的数据 则需要同步返回 async=false 反之异步
 * */	
function loadDictionaryData2(async,selectDom,columnName,tableName,id,columnValueEnum, defaultValue){
	if(async == undefined || async == null){
		async = true;
	}
	
	var timestamp = (new Date()).valueOf();  
	var list = [];
	var selectDomList = [];
	if(typeof(selectDom) == 'string' && selectDom.indexOf(",")!=-1){
		selectDomList = selectDom.split(",");
	}
	var ajax = $.ajax({
			        cache: true,
			        type: "POST",
			        url:"/WorkDictionary.do?action=query&t="+timestamp,
			        data:{"columnName":columnName||'',"tableName":tableName,"id":id||'','columnValueEnum':columnValueEnum || '',pageSize:9999999},
			        async: async,//是否同步,默认异步
			        dataType:"json",
			        error: function(request,info,e) {
			        	if(request && request.readyState != 0)
			        		setErrorAlert("loadDictionaryData2超时或系统异常"+info+","+e);
			        },
			        success: function(data) {
			        	if(data && data.total){
			        		list = data.rows;
			        		if(selectDom){
			        			if(selectDomList.length > 0){
			        				$.each(data.rows,function(i,o){
			        					for(var x = 0; x < selectDomList.length; x++){
			        						if(defaultValue == o.columnValueEnum){
			        							
			        							$(selectDomList[x]).append("<option value='"+o.columnValueEnum+"' selected>"+o.columnValueDesc+"</option>");
			        						}else{
			        							
			        							$(selectDomList[x]).append("<option value='"+o.columnValueEnum+"'>"+o.columnValueDesc+"</option>");
			        						}
			        					}
			        				});
			        			}else{
			        				$.each(data.rows,function(i,o){
			        					if(defaultValue == o.columnValueEnum){
			        						
			        						$(selectDom).append("<option value='"+o.columnValueEnum+"' selected>"+o.columnValueDesc+"</option>");
			        					}else{
			        						
			        						$(selectDom).append("<option value='"+o.columnValueEnum+"'>"+o.columnValueDesc+"</option>");
			        					}
			        				});
			        				
			        			}
			        			
			        		}
			    		}
			        }
			    });
	
	return list;
}


/**
 * 加载字典表数据,显示下拉列表时,value=columnValueEnum 显示的是columnValueDesc
 * @param selectDom 对应的select选择框 把获取到的数据注入对应的select选择框内
 * @param async 是否异步传输 如需要返回获取到的数据 则需要同步返回 async=false 反之异步
 * */	
function loadCustomerManager(async, selectDom, selectNameDom, defaultValue, defaultName){
	if(async == undefined || async == null){
		async = true;
	}
	var timestamp = (new Date()).valueOf();  
	$(selectDom).val('');
	$(selectDom).select2({
		placeholder: defaultName || '请选择客户经理',
		allowClear: false,
		formatResult: function(result, container, query, escapeMarkup){ //返回结果时做的操作
			$(selectDom).blur();
			return result.name;
		},
		formatSelection: function(item){//选择下拉框值时做的操作
			
			$(selectDom).blur();
			return item.name; //当前的输入框赋值
		},
		ajax:{
			url: '/CustomerManager.do?action=query',
			dataType: 'json',
			data: function(params, pageNo){
				if(params){
					isNeedAll = false;
				}else{
					isNeedAll = true;
				}
				//请求时，加入的参数
				return{
					name: params,
					pageSize: 10,
					t: (new Date()).valueOf()
				}
			},
			results: function(data, page){
				var list = [];
				list.push({id : '',name:'全部',placeholder:'全部客户经理'});
				//请求后返回的结果
				if(data&&data.rows&&data.rows.length > 0){
					$.each(data.rows,function(i,o){
						list.push(o);
					});
					return{
						results: list
					};
				}else{
					return {};
				}
			}
		}
	});
	$(selectDom).val(defaultValue);
}

/**
 * 06-02 19:27:56
 * 毫秒数转换成日前
 */
function toMDHMSDate(value){

	if(value == "" || value == undefined){
		return "";
	}
	var d = new Date(value);
	
	var hours = (d.getHours()<=9?'0'+d.getHours() : d.getHours());
	var minutes = (d.getMinutes()<=9?'0'+d.getMinutes() : d.getMinutes());
	var seconds = (d.getSeconds()<=9?'0'+d.getSeconds() : d.getSeconds());
    return (d.getMonth() + 1) + "-" + d.getDate() + " " + hours + ":" + minutes + ":" + seconds;  
	
}

/**
 * 毫秒数转换成日前
 */
function toDate(value){

	if(value == "" || value == undefined){
		return "";
	}
	var time = new Date(value);
	return formatDate2(time);
	
}

function toDate2(value){

	if(value == "" || value == undefined){
		return "";
	}
	var time = new Date(value);
	return formatDate4(time);
}

function formatDate4(d) {
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();  
} 

/**
 * 显示时分
 */
function toDateTime(value){

	if(value == "" || value == undefined){
		return "";
	}
	var time = new Date(value);
	return formatDate3(time);
	
}


function formatDate3(d) {
	var hours = (d.getHours()<=9?'0'+d.getHours() : d.getHours());
	var minutes = (d.getMinutes()<=9?'0'+d.getMinutes() : d.getMinutes());
    return  hours + ":" + minutes ;  
} 




function formatDate2(d) {
	var hours = (d.getHours()<=9?'0'+d.getHours() : d.getHours());
	var minutes = (d.getMinutes()<=9?'0'+d.getMinutes() : d.getMinutes());
	var seconds = (d.getSeconds()<=9?'0'+d.getSeconds() : d.getSeconds());
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + hours + ":" + minutes + ":" + seconds;  
} 
/**
 * 时间与当前时间比较： 
 * <p>
 * <li>对于未来时间 -》显示前一天的月-天
 * <li>1 分钟内 -》显示多少秒前
 * <li>1小时内 ->显示多少分钟前
 * <li>1天内 -> 显示小时和分钟
 * <li>多于1天 ->显示月和天
 * </p>
 * @param value
 * @returns {String}
 */
function newToDate(value,lan){
	if(value == "" || value == undefined){
		return "";
	}
	var time = new Date(value);
	var now = new Date();
	var hours = (time.getHours()<=9?'0'+time.getHours() : time.getHours());
	var minutes = (time.getMinutes()<=9?'0'+time.getMinutes() : time.getMinutes());
	var seconds = (time.getSeconds()<=9?'0'+time.getSeconds() : time.getSeconds());
	
	var difference = now.getTime() - time.getTime();
	if(difference < 0){ //是未来时间，显示前一天的月-天
		
		var yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
		
		return (yesterday.getMonth() + 1) + "-" + yesterday.getDate();
	}
	
	//1分钟内
	if(difference < 60 * 1000){
		if(lan == "en"){
			return Math.floor(difference / (1000)) + " seconds ago";
		}else if(lan == "rus"){
			return Math.floor(difference / (1000)) + " секунды назад";
		}
		return Math.floor(difference / (1000)) + "秒前";
	}
	//1小时内
	if(difference < 60 * 60 * 1000){
		if(lan == "en"){
			return Math.floor(difference / (60*1000))  + " minutes ago";
		}else if(lan == "rus"){
			return Math.floor(difference / (60*1000))  + " минуты назад";
		}
		return Math.floor(difference / (60*1000))  + "分钟前";
	}
	//1天内
	if((now.getDate() == time.getDate()) && difference < 24 * 60 * 60 * 1000){
		
		
		return hours + ":" + minutes;
	}
	
	//超过1天
	var month = time.getMonth() + 1;
	var day = time.getDate();
	if (month < 10) {
		month = '0' + month;
	}
	if (day < 10) {
		day = '0' + day;
	}

	return month + "-" + day;
	
	
}

/**
 * 时间与当前时间比较： 
 * <p>
 * <li>对于未来时间 -》显示前一天的月-天
 * <li>1 分钟内 -》显示多少秒前
 * <li>1小时内 ->显示多少分钟前
 * <li>1天内 -> 显示小时和分钟
 * <li>多于1天 ->显示月和天
 * </p>
 * @param value
 * @returns {String}
 */
function newToDate3(value,lan){
	if(value == "" || value == undefined){
		return "";
	}
	var time = new Date(value);
	var now = new Date();
	var hours = (time.getHours()<=9?'0'+time.getHours() : time.getHours());
	var minutes = (time.getMinutes()<=9?'0'+time.getMinutes() : time.getMinutes());
	var seconds = (time.getSeconds()<=9?'0'+time.getSeconds() : time.getSeconds());
	
	var difference = now.getTime() - time.getTime();
	if(difference < 0){ //是未来时间，显示前一天的月-天
		
		var yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
		
		return (yesterday.getMonth() + 1) + "-" + yesterday.getDate();
	}
	
	//1分钟内
	if(difference < 60 * 1000){
		if(lan == "en"){
			return Math.floor(difference / (1000)) + " seconds ago";
		}else if(lan == "rus"){
			return Math.floor(difference / (1000)) + " секунды назад";
		}
		return Math.floor(difference / (1000)) + "秒前";
	}
	//1小时内
	if(difference < 60 * 60 * 1000){
		if(lan == "en"){
			return Math.floor(difference / (60*1000))  + " minutes ago";
		}else if(lan == "rus"){
			return Math.floor(difference / (60*1000))  + " минуты назад";
		}
		return Math.floor(difference / (60*1000))  + "分钟前";
	}
	//1天内
	if((now.getDate() == time.getDate()) && difference < 24 * 60 * 60 * 1000){
		
		
		return hours + ":" + minutes;
	}
	
	//超过1天
	var month = time.getMonth() + 1;
	var day = time.getDate();
	var year = time.getYear()+1900;
	if (month < 10) {
		month = '0' + month;
	}
	if (day < 10) {
		day = '0' + day;
	}

	return year+"-"+month + "-" + day;
	
	
}

/**
 * <p>
 * <li>1 分钟内 -》显示多少秒前
 * <li>1小时内 ->显示多少分钟前
 * <li>1天内 -> 显示小时和分钟
 * <li>多于1天 ->显示月和天
 * </p>
 * @param value
 * @returns {String}
 */
function newToDate2(value){
	if(value == "" || value == undefined){
		return "";
	}
	var time = new Date(value);
	var now = new Date();
	var hours = (time.getHours()<=9?'0'+time.getHours() : time.getHours());
	var minutes = (time.getMinutes()<=9?'0'+time.getMinutes() : time.getMinutes());
	var seconds = (time.getSeconds()<=9?'0'+time.getSeconds() : time.getSeconds());
	
	var difference = now.getTime() - time.getTime();
	if(difference < 0){ //是未来时间，显示前一天的月-天
		
		//var yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
		var month=time.getMonth() + 1;
		var day=time.getDate();
		if (month < 10) {
			month = '0' + month;
		}
		if (day < 10) {
			day = '0' + day;
		}
		return month + "-" + day;
	}
	
	//1分钟内
	if(difference < 60 * 1000){
		
		return Math.floor(difference / (1000)) + "秒前";
	}
	//1小时内
	if(difference < 60 * 60 * 1000){
		
		return Math.floor(difference / (60*1000))  + "分钟前";
	}
	//1天内
	if((now.getDate() == time.getDate()) && difference < 24 * 60 * 60 * 1000){
		
		
		return hours + ":" + minutes;
	}
	
	//超过1天
	var month = time.getMonth() + 1;
	var day = time.getDate();
	if (month < 10) {
		month = '0' + month;
	}
	if (day < 10) {
		day = '0' + day;
	}

	return month + "-" + day;
	
	
}

/**
 * 交货时间处理，只显示月天
 * @param value
 */
function deliveryDate(value){
	if(value == "" || value == undefined){
		return "";
	}
	var time = new Date(value);
	return (time.getMonth() + 1) + "-" + time.getDate();
}


/**
 * 页面跳转到登录页
 */
function pageToRelogin(str){
	if(str && str !=null && str != '' && str !=undefined && str == 'relogin'){
		location.href = '/login.do?action=init';
	}
}
/**
 * 刷新页面
 */
function refreshPage(){
	var url = location.href;
	window.location.href = url.replace(new RegExp(/&t=\S*&*/g),"") + "&t="+new Date().getTime();
}
/**
 * 判断是否为空 
 * @return true 不为空
 */
function isNotNull(str){
	if(str && str != undefined && str != null && str != ''){
		return true;
	}
}

/**
 * 判断是否为数字
 */
function isNumber(str){
	var reg = /^\d+$/;
	if(isNotNull(str)&&reg.exec(str)){
		return true;
	}
	return false;

}

/** 
* 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。 
* 结果只保留两位小数
* @param num1被乘数 | num2乘数 
*/ 

function numMulti(num1, num2) {
	var baseNum = 0;
	num1 = num1 || 0;
	num2 = num2 || 0;
	try {
		baseNum += num1.toString().split(".")[1].length;
	} catch (e) {
	}
	try {
		baseNum += num2.toString().split(".")[1].length;
	} catch (e) {
	}
	var result =  Number(num1.toString().replace(".", ""))	* Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
	return result.toFixed(2);
};
/** 
* 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。 
* 结果不保留任何小数点
* @param num1被乘数 | num2乘数 
*/
function numMulti2(num1, num2) {
	var baseNum = 0;
	num1 = num1 || 0;
	num2 = num2 || 0;
	try {
		baseNum += num1.toString().split(".")[1].length;
	} catch (e) {
	}
	try {
		baseNum += num2.toString().split(".")[1].length;
	} catch (e) {
	}
	var result =  Number(num1.toString().replace(".", ""))	* Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
	return result.toFixed(0);
};

/**
 * 判断是否为小数.而且小数最多为两位小数点
 * @param str
 */
function isDecimal(str){
	var reg = /^[0-9]+(.[0-9]{1,2})?$/;
	if(isNotNull(str)&&reg.exec(str)){
		return true;
	}
	return false;
}

/**
 * 判断是否为小数.而且小数最多为两位小数点
 * @param str
 */
function isInteger(str){
	var reg = /^[0-9]*$/;
	if(isNotNull(str)&&reg.exec(str)){
		return true;
	}
	return false;
}

/**
 * 将数据显示两位小数。如果原始数据是整数的，不会加入小数点.如果原始数据带小数的，会将其转换成只显示两位小数点.<br/>
 * 小数点不足两位的会补齐，超过两位的会四舍五入
 * @param str
 */
function showTwoDecimal(str){
	var baseNum = str + '';
	try {
		var strArr = baseNum.split(".");
		if(strArr.length > 1){
			//就代表是小数，需要处理小数点
			var num = new Number(baseNum);
			baseNum = num.toFixed(2);
		}
	} catch (e) {
	}
	return baseNum;
}


function isTelPhone(str){
	var reg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
	if(isNotNull(str) && reg.exec(str)){
		return true;
	}
	return false;
}

function isMobile(str){
	var reg = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/;
	if(isNotNull(str) && reg.exec(str)){
		return true;
	}
	return false;
}
/**
 * 判断是否为字母组成
 */
function isLetter(str){
	var reg = /^[A-Za-z]+$/;
	if(isNotNull(str) && reg.exec(str)){
		return true;
	}
	return false;
}

/**
 * 是否为卖铜郎
 */
var isMaiTonglang=false;
/**
 * 前端检查 是否
 */
function onQueryOk(data) {  
	if(isMaiTonglang)
		return;
    $("[controller]").each(function () { 
    	// $(this).attr("disabled","true"); 	 
		var ccKey=$(this).attr("controller")+""; 
	    if(map.containsKey(ccKey)){
	    	
	    }else{  
//	      $(this).css('display','none'); 	
//	      $(this)[0].style.display = 'none';  
//	       $(this).attr("disabled","true"); 	 
	     //$(this).removeAttribute('href'); 
	      //$(this).setAttribute("disabled",true);
	      $(this).hide();
	      $(this).removeAttr('onClick');//去掉a标签中的onclick事件
	      $(this).unbind('click');
	     
	    } 
	  
	});
    
}  




function HashMap(){  
    //定义长度  
    this.length = 0;  
    //创建一个对象  
    this.obj = new Object();  
  
    /** 
    * 判断Map是否为空 
    */  
    this.isEmpty = function(){  
        return this.length == 0;  
    };  
  
    /** 
    * 判断对象中是否包含给定Key 
    */  
    this.containsKey=function(key){  
        return (key in this.obj);  
    };  
  
    /** 
    * 判断对象中是否包含给定的Value 
    */  
    this.containsValue=function(value){  
        for(var key in this.obj){  
            if(this.obj[key] == value){  
                return true;  
            }  
        }  
        return false;  
    };  
  
    /** 
    *向map中添加数据 
    */  
    this.put=function(key,value){  
        if(!this.containsKey(key)){  
            this.length++;  
        }  
        this.obj[key] = value;  
    };  
  
    /** 
    * 根据给定的Key获得Value 
    */  
    this.get=function(key){  
        return this.containsKey(key)?this.obj[key]:null;  
    };  
  
    /** 
    * 根据给定的Key删除一个值 
    */  
    this.remove=function(key){  
        if(this.containsKey(key)&&(delete obj[key])){  
        	this.length--;  
        }  
    };  
  
    /** 
    * 获得Map中的所有Value 
    */  
    this.values=function(){  
        var _values= new Array();  
        for(var key in this.obj){  
            _values.push(this.obj[key]);  
        }  
        return _values;  
    };  
  
    /** 
    * 获得Map中的所有Key 
    */  
    this.keySet=function(){  
        var _keys = new Array();  
        for(var key in this.obj){  
            _keys.push(key);  
        }  
        return _keys;  
    };  
  
    /** 
    * 获得Map的长度 
    */  
    this.size = function(){  
        return this.length;  
    };  
  
    /** 
    * 清空Map 
    */  
    this.clear = function(){  
    	this.length = 0;  
    	this.obj = new Object();  
    };  
}  

function loginout(){
	   $.cookie('userName','',{ expires: -1 });
	   $.cookie('userType','',{ expires: -1 });
	   //退出 
	   $.ajaxSetup({async:false});
	   if(typeof iframeTologout == "function")
		   iframeTologout();
	   //延时
	   setTimeout(function(){
		   window.location.href="login.do?action=logout";
	   },500);
}

/**
 * 关闭fancybox
 */
function closeFancyBox(){
	if($.fancybox){
		$.fancybox.close();
	}
}

function setImgPath(idStr,pathIdStr,url,filePath){
	if($("#"+idStr)){
		$("#"+idStr).attr("src",url);
		$("#"+idStr).show();
	}
	if($("#"+pathIdStr)){
		$("#"+pathIdStr).val(filePath);
	}
}

function showUploadFancybox(url,width,height,size,type){
	 $.fancybox.open({
		 href: url,
		 type: 'iframe',
		 padding:0,
		 margin:0,
		 height:180,
	 });
}

/**
 * 清除验证组件的错误样式
 */
function clearValidErrorStyle(){
	var wrongMsg = $(".Validform_wrong");
	var errorMsg = $(".Validform_error");
	if(wrongMsg){
		wrongMsg.text('');
		wrongMsg.removeClass("Validform_wrong");
	}
	if(errorMsg){
		errorMsg.removeClass("Validform_error");
	}
}

/**
 * ajax 请求统一返回方法
 * */
function ajaxCallbackFunc(data){
	if(data && data.resultCode > 0){
		setSucecessAlert(data.resultMsg);
	}else if(data && data.resultCode <= 0){
		setErrorAlert(data.resultMsg);
		pageToRelogin(data.relogin);
	}else{
		setErrorAlert("系统异常");
	}
}

var mydatatype = {
	"price1-3": /^([0-9]\d{1,3}|\d)(\.[\d]{1,2})?$/,//匹配金额类型
	"price" : /^([0-9]\d*|\d)(\.[\d]{1,4})?$/, //匹配金额类型 不限制长度
	"date" : /^((?:19|20)\d\d)-(0[1-9]|1[012]|[1-9])-(0[1-9]|[12][0-9]|3[01])$/,  //匹配日期
	"num99" : /^([1-9]\d|\d)$/, //大于0小于99的数字
	"num90" : /^([1-8]\d|\d|90)$/, //不超过90的整数
	"zstr":/^[\u4E00-\u9FA5\uf900-\ufa2d\w\.]+$/,//只包含汉字,字符,数字的字符串
	"zstr6-20":/^[\u4E00-\u9FA5\uf900-\ufa2d\w\.]{6,20}$/, ////只包含汉字,字符,数字6-20字符串
	"str":/^[\w\.]+$/,//只包含字符,数字的字符串
	"str6-20":/^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/, ////只包含字符,数字6-20字符串组合
	"tel" : /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/, //电话号码010-819202312-001
	"mobile":/^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/,
	"priceSpotAgio" : /^(-*[0-9]\d*|\d)(\.[\d]{1,4})?$/,
	"integer1-3": /^([0-9]\d{1,2}|\d)?$/, //匹配金额类型
	"integer1-6": /^([0-9]\d{1,5}|\d)?$/, //匹配金额类型
	"gt0":/^[1-9]\d*$/ // 大于0
}
$.Tipmsg.w = {
	"price1-5" : "请输入1000000以内的数字并且最多有两位小数",
	"price1-9" : "请输入1000000000以内的数字并且最多有两位小数",
	"price" : "输入非法，只能包含数字和小数点",
	"num99" : "请输入不大于99的数字",
	"num90" : "付款时间为数字0-90之间的整数",
	"priceMsg" : "价格必须1000000以内并且最多有两位小数",
	"numMsg" : "数量必须1000000以内并且最多有两位小数",
	"payDaysMsg": "付款时间必须为0~90之间的整数",
	"zstr": "请填写汉字,字符,数字",
	"zstr6-20" : "请填写6到20位的汉字,字符,数字",
	"str": "请填写字符,数字",
	"str6-20":"请填写6到20位的字符,数字",
	"tel" : "请输入正确的电话号码",
	"mobile" : "请输入正确的手机号码",
	"priceSpotAgio" : "请输入符合类型的升贴水",
	"integer1-3" : "请输入1000以内的正整数",
	"integer1-6" : "请输入1000000以内的正整数",
	"gt0":"请输入大于0的数"
}

var tipMsgEn_w = {
	"price1-5" : "The input value should be less than or equals to 1000000, and contains two decimals at most",
	"price1-9" : "The input value should be less than or equals to1000000, and contains two decimals at most",
	"price" : "Incorrect input, numbers and decimal places only",
	"num99" : "Please input a number no greater than 99",
	"num90" : "Payment time must be an integer ranging from 0 to 99",
	"priceMsg" : "The price  must be less than or equal to1,000,000 and contains two decimals at most",
	"numMsg" : "The umber must be less than or equal to1,000,000 and contains two decimals at most",
	"payDaysMsg": "Payment time must be an integer ranging from 0 to 99",
	"zstr": "Please fill in the Chinese characters, letters, and numbers",
	"zstr6-20" : "Please fill in 6-20 characters, consisting of Chinese characters, letters and numbers",
	"str": "Please fill in characters and number",
	"str6-20":"Please fill in 6-20 characters, consisting of Chinese characters, letters and numbers",
	"tel" : "Please input the correct telephone number",
	"mobile" : "Please input the correct mobile number",
	"priceSpotAgio" : "Please input the correct premiums or discounts price",
	"integer1-3" : "Please input a positive integer less than or equals to 1,000",
	"integer1-6" : "Please input a positive integer less than or equals to 1,000,000",
	"gt0":"Please input a positive number"
}

var tipmsgEn={//默认提示文字;
	tit:"Prompt Message",
	w:tipMsgEn_w,
	def:"Please type in the right information！",
	undef:"Datatype undefined！",
	reck:"Inconsistent input！",
	r:"Information verification succeeded！",
	c:"Information is under verification…",
	s:"Please {fill in |select} {0|message}!",
	v:"Verification of input information failed , please wait for a second…",
	p:"The data is under submitting…"
}

// 计算长度
// oracle 汉字占3个字节
function getLength(str) {
    var len = 0;
    for (var i=0; i<str.length; i++) {
        if (str.charCodeAt(i)>127 || str.charCodeAt(i)==94) {
            len += 3;
        } else {
            len ++;
        }
    }
    return len;
}


//datastrap列表数据显示
function stringSubPub(value){
	
	if(value == "" || typeof(value) == 'undefined'){
		return;
	}
	if(value.length<=10){
		
		return value;
	}
	return "<span title='"+value+"'>"+value.substr(0,10)+"...</sapn>";
}


/**
 * 字符串空处理。如果为空或者undefined就返回""
 * @param str
 */
function nullProcess(str){
	if (str == "" || str == undefined) {
		return "";
	}
	return str;
}
function nullProcess1(str){
	if (str == undefined) {
		return "-";
	}
	return str;
}

/**
 * 价格处理。默认为0
 * @param str
 * @returns {String}
 */
function priceProcess(str){
	var value = nullProcess(str); 
    if(value==null|| value=='') {
		
		value='0';
	}
    
    return value;
}

/**
* 价格处理，在价格前面加上相应钱的符号，并且保留两位小数点
*/
function priceFormatter(value, row, index){
	
	value = nullProcess(value); 
    if(value==null|| value=='') {
		
		value='0';
	}
	
	
	if(row.currencyType == 1000){
		
		return "￥" + showTwoDecimal(value);
	}else if(row.currencyType == 2000){
		
		return "$" + showTwoDecimal(value);
	}else  {
		
		return "￥" + showTwoDecimal(value);
	}
	return "";
}


/**
 * 升贴水 js
 * @param value
 * @param row
 * @param index
 * @returns {String}
 */
function priceSpotFormatter(value, row, index){
	if (row && row.industryId != 0) {
		return '-';
	}

	value = nullProcess(value); 
    if(value==null|| value=='') {
		value='0';
	}
	
    if(isNumber(value)){
		if(value > 0){
			return "+"+value;
		}
	}
	
	return showTwoDecimal(value);

}

// 提货方式
function deliveryByFormatter(value,row,index) {
	switch (value) {
		case 0:
			return '买家自提';
		case 1:
			return '卖家送货';
		case 2:
			return '平仓价';
		case 3:
			return '坑口价';
		case 4:
			return '车板价';
		case 5:
			return '到厂价';
		case 6:
			return '出厂价';
		default:
			return '-';
	}
}
// 提货方式
function deliveryByFormatterEn(value,row,index) {
	switch (value) {
		case 0:
			return 'In-store Pickup';
		case 1:
			return 'Supplier Delivery Service';
		case 2:
			return 'Coal price after loaded on ship';
		case 3:
			return 'Coal price along pits';
		case 4:
			return 'Coal price after delivered to railway station';
		case 5:
			return 'Factory Arrival Price';
		case 6:
			return 'Ex Factory Price';
		default:
			return '-';
	}
}

//提货方式
function deliveryByFormatterRus(value,row,index) {
	switch (value) {
		case 0:
			return 'Самовывоз покупателей';
		case 1:
			return 'Доставка продавцом';
		case 2:
			return 'Цена после перегрузки на судно';
		case 3:
			return 'Цена из шахты';
		case 4:
			return 'Цена после перегрузки до вокзала';
		case 5:
			return 'Цена до завода';
		case 6:
			return 'Цена с завода';
		default:
			return '-';
	}
}
//品种名称
function cateNameFormatter(industryId){
	if(industryId=='980'){
		return '品类';
	}else{
		return '品种';
	}
}
// 牌号名称
function goodsNameFormatter(industryId,en){
	if (typeof industryId == 'undefined') {
		return en?"Identification Code":"牌号";
	}
	if (String(industryId).charAt(0) == "7") {
		return en?"Spec":"规格";
	}
	if (String(industryId).charAt(0) == '6') {
		return en?"LHV":"低位热值";
	}
	if (String(industryId).charAt(0) == '5') {
		return en?"Material":"材质";
	}
	if (String(industryId).charAt(0) == '4') {
		return en?"Tenor of Ore":"品位";
	}
	if (industryId == '980') {
		return en?"pm":"品名";
	}
	return en?"Identification Code":"牌号";
}


/**
 * 品种，牌号，工厂级联功能
 * lcgf 全称:loadCateGoodsFactory
 */
(function(lcgf){
	
	var LoadCateGoodsFactory = function(doms, opts){
		
		var args = lcgf.extend(LoadCateGoodsFactory.DEFAULTS, opts);
		
		this.options = args;
		
		this.initParams(args);
		
		this.cateSelect2(args);
		
		this.goodsSelect2(args);
		
		this.factorySelect2(args);
		
		
		
	}
	
			/**
			 * 初始化参数
			 */
	LoadCateGoodsFactory.prototype.initParams = function(){
				
		var args = this.options;
		
		if(typeof(args.cateSelectDom) == 'string' && args.cateSelectDom.indexOf(",")!=-1){
			args.cateSelectDomList = args.cateSelectDom.split(",");
		}else{
			args.cateSelectDomList = [args.cateSelectDom];
		}
		
		//品种名称输入框处理
		if(typeof(args.cateNameDom) == 'string' && args.cateNameDom.indexOf(",")!=-1){
			args.cateNameDomList = args.cateNameDom.split(",");
		}else{
			args.cateNameDomList = [args.cateNameDom];
		}
		
		//牌号id输入框处理
		if(typeof(args.goodsSelectDom) == 'string' && args.goodsSelectDom.indexOf(",")!=-1){
			args.goodsSelectDomList = args.goodsSelectDom.split(",");
		}else{
			args.goodsSelectDomList = [args.goodsSelectDom];
		}
		
		//牌号名称输入框处理
		if(typeof(args.goodsNameDom) == 'string' && args.goodsNameDom.indexOf(",")!=-1){
			args.goodsNameDomList = args.goodsNameDom.split(",");
		}else{
			args.goodsNameDomList = [args.goodsNameDom];
		}
	},
	
	/**
	 * 品种select2功能
	 */
	LoadCateGoodsFactory.prototype.cateSelect2 = function(){
		var args = this.options;
		$.each(args.cateSelectDomList, function(index, cateSelect){
			//让每一个品种框都具有select2功能
			$(args.cateSelectDomList[index]).val('');
			$(args.cateSelectDomList[index]).select2({
				placeholder: args.defaultCateName || showSelect(args.lang),  //默认显示的数据
				allowClear: true,
				formatNoMatches: function () { return showNodata(args.lang); },
				formatSearching: function () { return showSearching(args.lang); },
				formatResult: function(result, container, query, escapeMarkup){ //返回结果时做的操作
					$(args.cateSelectDomList[index]).blur();
					return result.cateName;
				},
				formatSelection: function(item){//选择下拉框值时做的操作
					$(args.cateSelectDomList[index]).val(item.id); 
					if(args.cateNameDomList.length > 0){
						$(args.cateNameDomList[index]).val(item.cateName == showAllType(args.lang) ? '' : item.cateName);
					}
					//品种改变，牌号跟着改变
					args.defaultCateId =item.id;
					/*if(args.goodsNameDomList.length > 0){
						$(args.goodsNameDomList[index]).val("");
					}*/
					$(args.goodsSelectDomList[index]).val("");
					$(args.goodsSelectDomList[index]).siblings(".select2-container").children("a").children(".select2-chosen").text("");
					
					if(args.factorySelectDom){
						$(args.factorySelectDom).val("");
						$(args.factorySelectDom).siblings(".select2-container").children("a").children(".select2-chosen").text("");
					}
					
					/*if($(args.factoryInputDom)){
						$(args.factoryInputDom).val('');
						$(args.factoryInputDom).focus();
						$(args.factoryInputDom).blur();
					}*/
					
					$(args.cateSelectDomList[index]).blur();
					return item.cateName; //当前的输入框赋值
				},
				ajax:{
					url:"/GoodsCategory.do?action=query",
					dataType: 'json',
					data: function(params, pageNo){
						//请求时，加入的参数
						return{
							cateName: params,
							pageSize: 10,
							unNeedIndustryId : args.unNeedIndustryId,
							industryId : WEBSITE_COMMON_OBJECT.industryId == '900' ? '-1':WEBSITE_COMMON_OBJECT.industryId,
							t: (new Date()).valueOf()
						}
					},
					results: function(data, page){
						if(data.rows){
							
							data.rows.splice(0,0,{cateName:showAllType(args.lang), id:''});
							
							//请求后返回的结果
							return{
								results: data.rows
							};
						}else{
							return{
								results: {cateName: showAllType(args.lang), id:''}
							};
						}
					}
				}
			});
			$(args.cateSelectDomList[index]).val(args.defaultCateId);
			if($(args.cateNameDomList[index])){
				$(args.cateNameDomList[index]).val(args.defaultCateName);
			}
		});
	},
	
	/**
	 * 牌号select2功能
	 */
	LoadCateGoodsFactory.prototype.goodsSelect2 = function(){
		var args = this.options;
		$.each(args.goodsSelectDomList, function(index, goodsSelectDom){
			$(args.goodsSelectDomList[index]).val('');
			//让每一个牌号都具有select2功能
			$(args.goodsSelectDomList[index]).select2({
				placeholder: args.defaultGoodsName || showSelect(args.lang),  //默认显示的数据
				allowClear: true,
				dropdownAutoWidth: true,
				formatNoMatches: function () { return showNodata(args.lang); },
				formatSearching: function () { return showSearching(args.lang); },
				formatResult: function(result, container, query, escapeMarkup){ //返回结果时做的操作
					$(args.goodsSelectDomList[index]).blur();
					return result.goodsName;
				},
				formatSelection: function(item){//选择下拉框值时做的操作
					$(args.goodsSelectDomList[index]).val(item.goodsId); 
					if(args.goodsNameDomList.length > 0){
						$(args.goodsNameDomList[index]).val(item.goodsName == showAllType(args.lang) ? '' : item.goodsName);
						$(args.goodsNameDomList[index]).blur();
					}
					$(args.goodsSelectDomList[index]).blur();
					
					args.defaultGoodsId = item.id;
					
					if(args.factorySelectDom){
						$(args.factorySelectDom).val("");
						$(args.factorySelectDom).siblings(".select2-container").children("a").children(".select2-chosen").text("");
					}
					
					return item.goodsName; //当前的输入框赋值
				},
				ajax:{
					url:"/GoodsList.do?action=query",
					dataType: 'json',
					data: function(params, pageNo){
						//请求时，加入的参数
						return{
							cateId: args.defaultCateId,
							goodsName: params,
							pageSize: 10,
							unNeedIndustryId : args.unNeedIndustryId,
							industryId : WEBSITE_COMMON_OBJECT.industryId == '900' ? '-1':WEBSITE_COMMON_OBJECT.industryId,
							t: (new Date()).valueOf()
						}
					},
					results: function(data, page){
						if(data.rows){
							
							data.rows.splice(0,0,{goodsName:showAllType(args.lang), id:''});
							
							//请求后返回的结果
							return{
								results: data.rows
							};
						}else{
							return{
								results: {goodsName: showAllType(args.lang), id:''}
							};
						}
					}
				}
			});
			if($(args.goodsNameDomList[index])){
				$(args.goodsNameDomList[index]).val(args.defaultGoodsName);
			}
			$(args.goodsSelectDomList[index]).val(args.defaultGoodsId);
		});
		
	},
	
	/**
	 * 工厂select2功能
	 */
	LoadCateGoodsFactory.prototype.factorySelect2 = function(){
		var args = this.options;
		if(!args.factorySelectDom){
			return;
		}
		$(args.factorySelectDom).val('');
		//让每一个牌号都具有select2功能
		$(args.factorySelectDom).select2({
			placeholder: args.defaultFactory || showSelect(args.lang),  //默认显示的数据
			allowClear: true,
			dropdownAutoWidth: true,
			formatNoMatches: function () { return showNodata(args.lang); },
			formatSearching: function () { return showSearching(args.lang); },
			formatResult: function(result, container, query, escapeMarkup){ //返回结果时做的操作
				$(args.factorySelectDom).blur();
				return result.factory;
			},
			formatSelection: function(item){//选择下拉框值时做的操作
				$(args.factorySelectDom).val(item.factory); 
				if($(args.factoryInputDom)){
					$(args.factoryInputDom).val(item.factory);
					$(args.factoryInputDom).focus();
					$(args.factoryInputDom).blur();
				}
				return item.factory; //当前的输入框赋值
			},
			ajax:{
				url:"/GoodsTechSummary.do?action=queryFactory",
				dataType: 'json',
				data: function(params, pageNo){
					//请求时，加入的参数
					return{
						goodsId: args.defaultGoodsId,
						factory: params,
						pageSize: 10,
						t: (new Date()).valueOf()
					}
				},
				results: function(data, page){
					if(data.rows){
						//请求后返回的结果
						$.each(data.rows, function(i, row){
							row.id = 0;
						});
						return{
							results: data.rows
						};
					}
				}
			}
		});
		
		$(args.factorySelectDom).val(args.defaultFactory);
		if($(args.factoryInputDom)){
			$(args.factoryInputDom).val(args.defaultFactory);
		}
	};
			
	// 提示
	// TODO
	var showSelect = function(lang) {
		if (lang == 'en') return 'Please select';
		if (lang == 'rus') return '';
		if (lang == 'span') return '';
		return '请选择...';
	};
	var showNodata = function(lang) {
		if (lang == 'en') return 'No matches found';
		if (lang == 'rus') return '';
		if (lang == 'span') return '';
		return '没有数据';
	};
	var showSearching = function(lang) {
		if (lang == 'en') return 'Searching...';
		if (lang == 'rus') return '';
		if (lang == 'span') return '';
		return '查询中...';
	};
	var showAllType = function(lang) {
		if (lang == 'en') return 'All Types';
		if (lang == 'rus') return '';
		if (lang == 'span') return '';
		return '全部';
	};
	
	/**
	 * 默认参数
	 */
	LoadCateGoodsFactory.DEFAULTS = {
			async: true, //是否是异步加载数据
			cateSelectDom: null, //品类对应的select选择框 把获取到的数据注入对应的input框内
			cateNameDom: null, //品种名称select输入框
			goodsSelectDom: null, //牌号id对应的select输入框
			goodsNameDom: null, // 牌号对应的input输入框
			factorySelectDom: null, //厂家对应的select输入框
			factoryInputDom: null, //厂家对应的文本输入框
			
			//=============默认值设置======================================
			defaultCateId: null, //默认选中的品种
			defaultGoodsId: null, //默认显示的品牌id
			defaultGoodsName: null, //默认显示的牌号
			defaultCateName: null, //默认显示的品种
			defaultFactory: null,
			unNeedIndustryId : null,//默认需要行业ID 值为1时 后台查询全部行业的分类与牌号 只在聚贸平台下作用
			//=============================================================
			cateSelectDomList: [],
			cateNameDomList: [],
			goodsSelectDomList: [],
			goodsNameDomList: [],

			lang:false // 语言
			
	};
	
	/**
	 * 控制调用入口
	 */
	lcgf.fn.loadCateGoodsFactory = function(opts){
		return new LoadCateGoodsFactory(this, opts);
	}
	
	
})(jQuery);

// 判断是否有快速找货权限
function hasRightZhaoHuo() {
    var result = true;
    $.ajax({
        url:'/purchase.do?action=ifHasRight',
        type:'post',
        data:{'rdm':Math.random()},
        dataType:'json',
        async:false,
        success:function(data){
            if (data && data.resultCode == 0) {
                setErrorAlert(data.resultMsg);
                result = false;
            }
        }
    });
    return result;
}

//显示创建人信息
function showCreaterInfo(value,row,index){
	if(typeof(value) == "undefined"){
		return "";
	}
    var infos = value.split("@");
    if(typeof(infos[2]) == "undefined"){
    	infos[2] ="";
    }
    if(typeof(infos[3]) == "undefined"){
    	infos[3] ="";
    }
    var result = infos[0]+" "+infos[2]+" "+infos[3];
	result = '<div style="width:100px;">' + result + "</div>";
    return result;
}

function setDomain(domain){
	if(isNotNull(domain))
		document.domain=domain;
}


//生存随机数
function MathRand() { 
   var Num=""; 
   for(var i=0;i<6;i++) {
	 Num+=Math.floor(Math.random()*10); 
   } 
   return Num;
}


//绑定升贴水 处理 正负
function priceSpotAgio(_select,_price){
	var val = Number($(_price).val());
	if(isNaN(val)){
		return;
	}
	
	if(val > 0){
		$(_select).val("+");
	}else if(val < 0){
		$(_select).val("-");
		$(_price).val(-val);
	}
	var selectVal = $(_select).val();
	/*$(_select).change(function(){
		var price = Number($(_price).val());
		if($(_price).val() == '' || $(_price).val() == '-'){
			if($(this).val() == '-'){
				$(_price).val('-');
			}else{
				$(_price).val('');
			}
		}
		if(isNaN(price)){
			return;
		}
		if($(this).val() == "+"){
			$(_price).val(Math.abs(price));
		}else{
			if(price > 0 ){
				$(_price).val(-price);
			}
			
		}
	});*/
	$(_price).on("keyup",function(e){
		clearNoNum(e,this);
//		var val = Number(this.value);
	});
	/*$(_price).on("change",function(e){
		var val = Number(this.value);
		if(val > 0){
			$(_select).val("+");
		}else if(val < 0){
			$(_select).val("-");
		}
	});*/
}
/**
 * 绑定升贴水 处理 正负 绑定多个
 * @param selectArr 升贴水正负选择框 数组形式 如[select1,select2]
 * @param priceArr 价格输入框 如 [price1,price2]
 */
function bingPriceSpotAgio(selectArr,priceArr){
	if(selectArr != null && selectArr.length > 0 && priceArr != null && priceArr.length > 0
			&& selectArr.length == priceArr.length){
		$.each(selectArr,function(i,o){
			$(o).empty();
			$(o).append('<option value="+">+</option><option value="-">-</option>');
			priceSpotAgio(o,priceArr[i]);
		})
	}
	
}


//提交按钮
function changeButton(url,buttonType){
	$.getJSON("/buttonCount.do?action=count&t=" + Math.random(), {"buttonType":buttonType},
			function(data) {
		window.location.href=url;
	});
}

/**
 * 获取开票信息
 */
function getInvoiceType(invoiceType){
	 	var invType = '-';
	    if (typeof invoiceType != 'undefined' && invoiceType == 0) {
	        invType = '当月票';
	    } else if (typeof invoiceType != 'undefined' && invoiceType == 1) {
	        invType = '下月票';
	    } 
	    return invType;
}
/**
 * 获取开票信息
 */
function getInvoiceTypeEn(invoiceType){
	 	var invType = '-';
	    if (typeof invoiceType != 'undefined' && invoiceType == 0) {
	        invType = 'Invoice of this Month';
	    } else if (typeof invoiceType != 'undefined' && invoiceType == 1) {
	        invType = 'Invoice of next Month';
	    } 
	    return invType;
}

function getInvoiceTypeRus(invoiceType){
 	var invType = '-';
    if (typeof invoiceType != 'undefined' && invoiceType == 0) {
        invType = 'Вексель текущего месяца';
    } else if (typeof invoiceType != 'undefined' && invoiceType == 1) {
        invType = 'Вексель следующего месяца';
    } 
    return invType;
}

/**
 * 根据父级行业ID 获取子行业列表
 * @param parentId
 * @param industryList
 * @returns {Array}
 */
function getChildIndustryId4Parent(parentId,industryList){
	var arr= new Array();
	if(parentId && industryList){
		for(var i = 0;i<industryList.length;i++){
			if(industryList[i].parentId == parentId){
				arr.push(industryList[i]);
			}
		}
	}
	return arr;
}

// 根据子级行业ID 获取父级行业名称
function getParentNameForIndustryId(childId,childList,parentList) {
	var parentId = '';
	if (childList) {
		for(var i = 0;i<childList.length;i++){
			if(childList[i].val == childId){
				parentId = childList[i].parentId;
				break;
			}
		}
	}
	if (parentId != '' && parentList) {
		for(var i = 0;i<parentList.length;i++){
			if(parentList[i].val == parentId){
				return parentList[i].desc;
			}
		}
	}
	return '';
}

// 根据行业ID 获取行业名称
function getNameForIndustryId(industryId,industryList,pindustryList) {
	if (industryList) {
		for(var i = 0;i<industryList.length;i++){
			if(industryList[i].val == industryId){
				return industryList[i].desc;
			}
		}
	}
	if (pindustryList) {
		for(var i = 0;i<pindustryList.length;i++){
			if(pindustryList[i].val == industryId){
				return pindustryList[i].desc;
			}
		}
	}
	if(industryId==980){
		return "普通类";
	}
	return '';
}


/**
 * 是否是有色分类
 * @return
 */
function isColorCate(industryId) {
	if (typeof industryId == 'undefined') {
		return false;
	}
	if (industryId == 0 || String(industryId).charAt(0) == "2") {
		return true;
	}
	return false;
}

/**
 * 是否是电解铜分类
 * @return
 */
function isColorTong(industryId) {
	if (typeof industryId == 'undefined') {
		return false;
	}
	if (industryId == 0) {
		return true;
	}
	return false;
}

// 判断是否是父级行业
function isParentIndustry(industryId,parentList) {
	if (typeof industryId == 'undefined') {
		return false;
	}
	if (parentList) {
		for(var i = 0;i<parentList.length;i++){
			if(parentList[i].parentId == -2 && parentList[i].val == industryId){
				return true;
			}
		}
	}
	return false;
}

/**
 * 查询表单重置
 * @param searchDOM 表单dom
 * @param cateDOM 品种dom
 * @param goodsDOM 牌号dom
 * @param companyDOM 公司dom1
 * @param companyDOM2 公司dom2
 */
function clearSearchForm(searchDOM,cateDOM,goodsDOM,companyDOM1,companyDOM2){
	//reset表单
	document.getElementById(searchDOM).reset();

	//重新加载品种级联查询条件
	if(typeof (cateDOM) != "undefined" && cateDOM != null && cateDOM != ""){
		$("#"+cateDOM).loadCateGoodsFactory({
			cateSelectDom: '#'+cateDOM, //品类对应的select选择框 把获取到的数据注入对应的input框内
			goodsSelectDom: '#'+goodsDOM, //牌号对应的input输入框
			//goodsNameDom: '#mainForm input[name=goodsName]', // 牌号id对应的input输入框
			defaultCateId: null, //默认选中的品种
			defaultGoodsId: null, //默认显示的品牌id
			defaultGoodsName: null, //默认显示的牌号
			defaultCateName: null, //默认显示的品种
			defaultFactory: null
		});
	}

	//重新加载公司条件
	if(typeof (companyDOM1) != "undefined" && companyDOM1 !=null && companyDOM1 !=""){
		loadCompanyDataBySelect2($("#"+searchDOM).find("input[name="+companyDOM1+"]"));
	}

	//重新加载公司条件
	if(typeof (companyDOM2) != "undefined" && companyDOM2 !=null && companyDOM2 !=""){
		loadCompanyDataBySelect2($("#"+searchDOM).find("input[name="+companyDOM2+"]"));
	}

}