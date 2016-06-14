package com.jm.authc;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.webflow.execution.Event;
import org.springframework.webflow.execution.RequestContext;

public class LoginValidateAction {

	private static Map<String ,Integer> loginTryConter = new HashMap<String, Integer>();
	
	public Event checkLoginNeedVerifyCode(final RequestContext requestContext){
		String username = (String) requestContext.getRequestScope().get("username");
		if(StringUtils.isEmpty(username)){
			return new Event(this, "NeedNoVerifyCode");
		}
		if(!loginTryConter.containsKey(username)){
			return new Event(this, "NeedNoVerifyCode");
		}
		Integer count = loginTryConter.get(username);
		
		return new Event(this, "NeedVerifyCode");
	}
}
