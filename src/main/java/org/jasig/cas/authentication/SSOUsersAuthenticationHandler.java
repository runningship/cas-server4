package org.jasig.cas.authentication;

import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.security.auth.login.FailedLoginException;

import org.jasig.cas.Message;
import org.jasig.cas.authentication.HandlerResult;
import org.jasig.cas.authentication.PreventedException;
import org.jasig.cas.authentication.UsernamePasswordCredential;
import org.jasig.cas.authentication.handler.support.AbstractUsernamePasswordAuthenticationHandler;
import org.jasig.cas.authentication.principal.Principal;
import org.jasig.cas.authentication.principal.SimplePrincipal;
import org.springframework.stereotype.Component;

import com.google.common.collect.Maps;

@Component("ssoUsersAuthenticationHandler")
public class SSOUsersAuthenticationHandler extends AbstractUsernamePasswordAuthenticationHandler{

	@Override
	protected HandlerResult authenticateUsernamePasswordInternal(
			UsernamePasswordCredential credential)
			throws GeneralSecurityException, PreventedException {
		String username = credential.getUsername();
		String pwd = credential.getPassword();
		System.out.println("You are login as "+ username+"/"+pwd);
		logger.info("You are login as "+ username+"/"+pwd);
		if("xzye".equals(username) && "xzye".equals(pwd)){
			
			//4.2.2做法
//			return createHandlerResult(credential, this.principalFactory.createPrincipal(username), null);
			
			//4.0.0做法
//			SimplePrincipal principal = new SimplePrincipal(username);
//			return createHandlerResult(credential, principal, null);
			
			Map<String, Object> attributes = Maps.newHashMap();  
		    attributes.put("uid", "123456");  
		    attributes.put("lasttime", System.nanoTime());  
		  
		    Principal principal = new SimplePrincipal(credential.getId(), attributes);  
		    return new HandlerResult(this, new BasicCredentialMetaData(credential), principal); 
		}
		throw new FailedLoginException("用户名或密码不正确");
		//TODO authenticate from database code here
	}

	@Override
	public boolean supports(Credential credential) {
		return super.supports(credential);
	}

	@Override
	public String getName() {
		return super.getName();
	}
}
