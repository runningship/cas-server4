package com.jm.authc;

import java.security.GeneralSecurityException;
import java.util.Map;

import javax.annotation.Resource;
import javax.security.auth.login.FailedLoginException;

import org.jasig.cas.authentication.BasicCredentialMetaData;
import org.jasig.cas.authentication.Credential;
import org.jasig.cas.authentication.HandlerResult;
import org.jasig.cas.authentication.PreventedException;
import org.jasig.cas.authentication.UsernamePasswordCredential;
import org.jasig.cas.authentication.handler.support.AbstractUsernamePasswordAuthenticationHandler;
import org.jasig.cas.authentication.principal.Principal;
import org.jasig.cas.authentication.principal.SimplePrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.common.collect.Maps;
import com.jm.mybatis.dao.DaoSupport;

public class SSOUsersAuthenticationHandler extends AbstractUsernamePasswordAuthenticationHandler{

	private DaoSupport baseDao;
	
	@Override
	protected HandlerResult authenticateUsernamePasswordInternal(
			UsernamePasswordCredential credential)
			throws GeneralSecurityException, PreventedException {
		String username = credential.getUsername();
		String pwd = credential.getPassword();
		System.out.println("You are login as "+ username+"/"+pwd);
		logger.info("You are login as "+ username+"/"+pwd);
		if("xzye".equals(username) && "xzye".equals(pwd)){
			
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

	public void setBaseDao(DaoSupport baseDao) {
		this.baseDao = baseDao;
	}
	
}
