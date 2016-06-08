package com.jm.authc;

import java.security.GeneralSecurityException;
import java.util.Map;

import javax.security.auth.login.FailedLoginException;
import javax.security.auth.login.LoginException;

import org.jasig.cas.authentication.BasicCredentialMetaData;
import org.jasig.cas.authentication.Credential;
import org.jasig.cas.authentication.HandlerResult;
import org.jasig.cas.authentication.PreventedException;
import org.jasig.cas.authentication.UsernamePasswordCredential;
import org.jasig.cas.authentication.handler.support.AbstractUsernamePasswordAuthenticationHandler;
import org.jasig.cas.authentication.principal.Principal;
import org.jasig.cas.authentication.principal.SimplePrincipal;

import com.google.common.collect.Maps;
import com.jm.casserver.util.SecurityHelper;
import com.jm.mybatis.Entity;
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
		Entity entity = new Entity();
		entity.put("NAME", username);
		entity.put("PASSWORD", SecurityHelper.Md5(pwd));
		try {
			Entity user = (Entity) baseDao.findForObject("VUserMapper.getUserInfo", entity);
			if(user==null){
				throw new FailedLoginException("用户名或密码不正确");
			}
			Map<String, Object> attributes = Maps.newHashMap();  
		    attributes.put("uid", user.get("VUSER_ID"));  
		    attributes.put("lasttime", user.get("LASTTIME"));  
		  
		    Principal principal = new SimplePrincipal(credential.getId(), attributes);  
		    return new HandlerResult(this, new BasicCredentialMetaData(credential), principal); 
		} catch (Exception e) {
			logger.error("查询用户信息失败", e);
			throw new LoginException("系统内部错误");
		}
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
