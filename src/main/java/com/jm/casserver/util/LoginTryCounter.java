package com.jm.casserver.util;

import java.util.HashMap;
import java.util.Map;

public class LoginTryCounter {

	private static Map<String ,Integer> loginTryConter = new HashMap<String, Integer>();
	
	public static void add(String username){
		if(!loginTryConter.containsKey(username)){
			loginTryConter.put(username , 0);
		}
	}
	
	public static boolean hasTry(String username){
		if(!loginTryConter.containsKey(username)){
			return false;
		}
		if(loginTryConter.get(username)==0){
			return false;
		}else{
			return true;
		}
	}
	
	public static void addTryCount(String username){
		if(!hasTry(username)){
			return;
		}
		Integer count = loginTryConter.get(username);
		count++;
		loginTryConter.put(username, count);
	}
}
