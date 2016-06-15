package com.jm.casserver.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.springframework.web.context.support.WebApplicationContextUtils;

import com.jm.casserver.util.Const;

public class WebAppContextListener implements ServletContextListener{

	public void contextInitialized(ServletContextEvent event) {
		Const.WEB_APP_CONTEXT = WebApplicationContextUtils.getWebApplicationContext(event.getServletContext());
		//System.out.println("========获取Spring WebApplicationContext");
	}

	public void contextDestroyed(ServletContextEvent sce) {
		Const.WEB_APP_CONTEXT = null;
	}
}
