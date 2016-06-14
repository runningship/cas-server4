package com.jm.authc;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;
import org.springframework.webflow.execution.Event;
import org.springframework.webflow.execution.RequestContext;

public class LoginController extends AbstractController{

	@Override
	protected ModelAndView handleRequestInternal(HttpServletRequest req, HttpServletResponse resp) throws Exception {
		String path = req.getRequestURI();
		path = path.replace(req.getContextPath()+req.getServletPath()+"/", "");
		String username = (String)req.getParameter("username");
		ModelAndView mv = new ModelAndView();
		MappingJacksonJsonView view = new MappingJacksonJsonView();
		Map<String,Object> attrs = new HashMap<String, Object>();
		attrs.put("LOGIN_NEED_VERIFYCODE", false);
		view.setAttributesMap(attrs);
		mv.setView(view);
		return mv;
	}
}
