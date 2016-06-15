package com.jm.casserver.web;

import java.lang.reflect.Method;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import com.jm.casserver.util.Const;

public class BeanNameDispatcher extends AbstractController{

	@Override
	protected ModelAndView handleRequestInternal(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		String path = req.getRequestURI();
		path = path.replace(req.getContextPath()+req.getServletPath()+"/", "");
		//should be bean name now
		String beanName = path;
		Object bean = Const.WEB_APP_CONTEXT.getBean(beanName);
		String action = req.getParameter("action");
		bean.getClass().getDeclaredMethods();
		Method method = bean.getClass().getMethod(action , HttpServletRequest.class);
		method.invoke(bean, req);
		return null;
	}

}
