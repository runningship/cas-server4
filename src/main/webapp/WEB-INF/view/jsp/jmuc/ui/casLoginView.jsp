<%@ page pageEncoding="UTF-8" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%
	String path = request.getContextPath();
	request.setAttribute("projectName", path);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!-- saved from url=(0049)http://jmv3.jmdev.com/login.do?action=loginPageV2 -->
<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>-登录</title>
    <link rel="stylesheet" href="${projectName}/jm/static/css/css.css">
    <link rel="stylesheet" href="${projectName}/jm/static/css/css_w.css">
    <script type="text/javascript" src="${projectName}/jm/static/js/jquery-1.11.2.min.js"></script>
    <script src="${projectName}/jm/static/js/jquery.js"></script>
    <script src="${projectName}/jm/static/js/layer.js" type="text/javascript"></script><link rel="stylesheet" href="${projectName}/jm/static/css/layer.css" id="layui_layer_skinlayercss">
    <script type="text/javascript" src="${projectName}/jm/static/js/placeholder.js"></script>
    <script type="text/javascript" src="${projectName}/jm/static/js/Validform_v5.3.2.js"></script>
    <script type="text/javascript" src="${projectName}/jm/static/js/jquery.cookie.js"></script>
    <script> var language = "";</script>
    <script type="text/javascript" src="${projectName}/jm/static/js/pubFunction.js"></script>
    <script type="text/javascript" src="${projectName}/jm/static/js/pubFunctionFront.js"></script>
</head>
<body>
<div class="login-box">
    <form action="/cas/login" id="Member-login" method="post">
  			<input type="hidden" name="lt" value="${loginTicket}" />
	      	<input type="hidden" name="execution" value="${flowExecutionKey}" />
	      	<input type="hidden" name="_eventId" value="submit" />
        <input type="hidden" name="pagefrom" id="pagefrom" value="">
        <input type="hidden" name="pathId" id="pathId" value="">
        <span class="title">会员登录</span>
        <div class="wrong" style="display: none;">
            你输入的密码和账号不匹配，是否<span>忘记密码</span>或<span>忘记会员名</span>
        </div>
        <div class="border-blue">
            <p class="name">
                <i></i><input type="text" id="userId" name="username" onchange="checkUserName()" placeholder="请输入您的账号或手机">
                <span class="tipMsg J-tipMsg"></span>
                <em class="ok"></em>
            </p>
        </div>
        <div class="border-blue" style="margin-bottom: 34px;">
            <p class="key">
                <i></i><input type="password" altercss="#ddd" id="psw" name="password" datatype="*6-20" nullmsg="密码不能为空" errormsg="6~20位数字、字母组合" placeholder="请输入您的密码" class="Validform_error">
                <span class="tipMsg J-tipMsg Validform_checktip Validform_wrong">密码不能为空</span>
                <em class="del"></em>
            </p>
        </div>
        <div class="border-blue verify-code-div" style="display:none;">
        	<p class="verify-code">
                <i></i><input type="text" altercss="#ddd" id="checkcode" name="checkcode" placeholder="请输入验证码" nullmsg="验证码不能为空" errormsg="验证码错误">
                    <img src="${projectName}/jm/static/VerifyCode.do" class="verifyCode" id="VerifyCode" onclick="this.src=&#39;/VerifyCode.do?action=init&amp;t=&#39;+new Date().getTime()">
                    <span class="tipMsg J-tipMsg"></span>
            </p>
        </div>
        <p class="check">
            <label> <input type="checkbox" id="Ml-aotoLogin" name="Ml-aotoLogin" value="1"> 两周内自动登录
            </label> <a href="http://jmv3.jmdev.com/pwd.do?action=findPwd" target="_blank">忘记密码？</a>
        </p>
        <p class="btns">
            <input class="login-btn"  name="submit" type="submit" id="loginBtn" value="登 录">
            <a class="register-btn" href="http://jmv3.jmdev.com/UserAccount.do?action=registerInit" target="_blank">注 册</a>
        </p>
    </form>
</div>
<script type="text/javascript">
    if ('' == '101') {
        document.domain = location.hostname.split('.').slice(-2).join('.');
    }
    //登录是否需要验证码
    var isNeedVerifyCode = false;
    $(function () {
        //登录弹框
        $(".name input").placeholder();
        $(".nverify-codeame input").placeholder();
        $(".key input").placeholder({
            isUseSpan: true
        });
        //判断密码是否有值
        $(".key input").keyup(function () {
            if ($(this).val() == "") {
                $(".key em").hide();
            } else {
                $(".key em").show();
            }
        });
        $(".key em").on("click", function () {
            $(".key input").val("");
            $(".key em").hide();
        });
        $('#userId').keydown(function (e) {
            if (e.keyCode == 13) {
                $('#psw').focus();
            }
        });
        $('#psw').keydown(function (e) {
            if (e.keyCode == 13) {
                $("#Member-login").submit();
            }
        });
        //用户表单验证
        $("#Member-login").Validform({
            tiptype: function (msg, o, cssctl) {
                $(".login-box .wrong").hide();
                if (!o.obj.is('form')) {
                    var objtip = o.obj.siblings(".J-tipMsg");
                    var blue = o.obj.parents(".border-blue");
                    cssctl(objtip, o.type);
                    blue.css("margin-bottom","18px")
                    if (o.type == 2) {
                        //原始 弹窗高度
                        if($(".verify-code-div").is(":hidden")){
                            $(".fancybox-inner", window.parent.document).height(301);
                        }else{
                            $(".fancybox-inner", window.parent.document).height(369);
                        }
                        objtip.hide();
                    } else {
                        objtip.text(msg);
                        blue.css("margin-bottom","34px");
                        //为空错误 弹窗高度(没有验证码)
                        if($(".verify-code-div").is(":hidden")){
                            $(".fancybox-inner", window.parent.document).height(317);
                        }else{
                            $(".fancybox-inner", window.parent.document).height(385);
                        }
                        objtip.show();
                    }
                }
            },
            beforeCheck: function (curform) {
                var cValue = $("#checkcode").val();
                if (isNeedVerifyCode && cValue == "") {
                    var nullmsg = $("#checkcode").attr("nullmsg");
                    setErrorAlert("请输入验证码");
                    return false;
                }
            },
            ajaxPost: true,
            callback: function (dataObj) {
                var loginOK = dataObj.loginOK;
                if (loginOK == 'checkcode_error') {
                    setErrorAlert('用户验证码输入错误,请重新操作');
                    //用户验证码输入错误 弹窗高度
                    $(".fancybox-inner", window.parent.document).height(350);
                    $(".verify-code-div").show();
                    $(".loginBox dl,a.register-btn,#loginBtn").css("margin-bottom", "10px");
                    isNeedVerifyCode = true;
                    $("#loginImg").attr("src", "/images/Kaptcha.jpg");
                } else if (loginOK == 'OK') {
                    var value = $("#Ml-aotoLogin:checked").val();
                    if (value == 1) {
                        $.cookie("userName", $('#userId').val(), {expires: 30});
                        $.cookie("userType", 0, {expires: 30});
                    }
                    var pagefrom = $('#pagefrom').val();
                    if (pagefrom == 'icomet') {
                        parent.closeLogin("/chat.do?action=matchCustomerAndUser");
                        return;
                    }
                    //自动登录
                    var autoLoginList = dataObj.autoLoginList;
                    var guanLoginWebList = dataObj.guanLoginWebList;
                    if (autoLoginList != null && autoLoginList != "" && autoLoginList != "undefined") {
                        var username = document.getElementById("userId").value;
                        var passWord = document.getElementById("psw").value;
                        parent.iframeTicketLogin(dataObj.sso_ticket, autoLoginList, guanLoginWebList);
                    }
                    parent.closeLoginIndex($("#pathId").val());
                } else if (loginOK == 'FAULT') {
                    $(".login-box .wrong").show();
                    //账号密码不匹配 弹窗高度
                    if($(".verify-code-div").is(":hidden")){
                        $(".fancybox-inner", window.parent.document).height(353);
                    }else{
                        $(".fancybox-inner", window.parent.document).height(421);
                    }
                    if (dataObj.LOGIN_NEED_VERIFYCODE && dataObj.LOGIN_NEED_VERIFYCODE == true) {
                        $(".fancybox-inner", window.parent.document).height(421);
                        $(".verify-code-div").show();
                        $(".loginBox dl,#loginBtn").css("margin-bottom", "10px");
                        $('#checkcode').focus();
                        var verSrc = $("#VerifyCode").attr("src");
                        $("#VerifyCode").attr("src", verSrc + "&time=" + new Date().getTime());
                        isNeedVerifyCode = true;
                    }
                } else if (loginOK == 'FAULT1') {
                    setErrorAlert('您好，当前浏览器有客户登陆，请先退出当前用户，再切换其他用户！')
                }
            }
        });
        
      //用户名 绑定鼠标移开 检查该帐号是否有错误次数过多
  	  $("#userId").blur(function(){
  		  var val = $(this).val();
  		  if(val && val != null && val != "" && val != '请输入11位手机号码'){
  			  $.ajax({
  				  url:"/cas/c/loginController?action=checkLoginNeedVerifyCode",
  				  type : 'post',
  				  data : {username : val},
  				  dataType : "json",
  				  success : function(data){
  					  if(data && data.LOGIN_NEED_VERIFYCODE){
  						//输入错误次数过多,显示出验证码
  						  $(".verify-code-div").show();
  						  var verSrc = $("#VerifyCode").attr("src");
  		    			  $("#VerifyCode").attr("src",verSrc + "&time="+new Date().getTime());
  		    			  isNeedVerifyCode = true;
  		    			  $(".fancybox-inner", window.parent.document).height(369);
  					  }else{
  						  $(".verify-code-div").hide();
  						  $(".fancybox-inner", window.parent.document).height(301);
  						  isNeedVerifyCode = false;
  					  }
  				  }
  			  });
  		  }
  	  });
    });
    //忘记密码
    function forgetPsw() {
        var url = 'pwd.do?action=findPwd';
        if ('' == '101') {
            closeLogin(url);
        } else {
            parent.closeLogin(url);
        }
    }
    //注册
    function register() {
        var url = 'UserAccount.do?action=registerInit';
        if ('' == '101') {
            closeLogin22(url);
        } else {
            parent.closeLogin(url);
        }
    }
    function closeLogin22(loc) {
        if ($.fancybox) {
            $.fancybox.close();
        }
        if (!location) {
            loc = "/";
        }
        window.location = loc
    }
    //验证用户名是否正确
    function checkUserName(){
    	var userId = $("#userId").val();
    	$.ajax({
	        cache: true,
	        type: "POST",
	        url:"/login.do?action=queryAdminByUserName",
	        data:{"username": userId},
	        //async: false, //同步
	        dataType:"json",
	        error: function(request) {
	        	setErrorAlert("超时或系统异常");
	        },
	        success: function(data) {
	        	if(data.resultCode != 0){
	        		$(".name em").show();
	    		}else{
	    			$(".name em").hide();
	    		}
	        }
	    });
    }
</script>

</body></html>