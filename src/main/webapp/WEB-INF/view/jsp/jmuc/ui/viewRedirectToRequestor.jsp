<%@ page contentType="text/html; charset=UTF-8"%>  
<%  
    String ajax = request.getParameter("n");  
    //当执行Ajax自<strong><strong>定义</strong></strong><strong><strong>页面</strong></strong>时执行以下操作  
    if(ajax!=null && ajax.length()>0){  
        response.getWriter().print(request.getAttribute("loginTicket")+"&"+request.getAttribute("flowExecutionKey"));  
    } else {  
      
    //正常cas执行  
%>         
     <script>window.location.href = "/cas/login";</script>  
<%         
    }  
%> 