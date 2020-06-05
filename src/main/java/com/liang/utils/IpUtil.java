package com.liang.utils;

import java.net.*;
import java.util.Map;
import java.util.StringTokenizer;

import com.liang.bean.Visit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import javax.servlet.http.HttpServletRequest;

@Component
public class IpUtil {
	@Autowired
	QueryIp queryIp;

	/**
	 * 构造Visit
	 * @param ip
	 * @param os 操作系统
	 * @return
	 */
	public Visit getVisit(String ip, String os){
		// 区域信息
		Map<String, Object> map;
		Visit visit = new Visit();
		visit.setVisitip(ip);
		visit.setVisitos(os);
		// 主机名
		String hostName;
		try {
			hostName = InetAddress.getLocalHost().getHostName();
			visit.setVisithostname(hostName);
		} catch (UnknownHostException e1) {
			e1.printStackTrace();
		}
        map = queryIp.queryIP(ip);
        if (map.get("country") != null) {
        	visit.setVisitcountry(map.get("country").toString());
		}
        if (map.get("region") != null) {
        	visit.setVisitprovince(map.get("region").toString());
		}
        if (map.get("city") != null) {
        	visit.setVisitcity(map.get("city").toString());
		}

        return visit;
	}

	/**
	 * 获取访问者操作系统
	 * @param request
	 * @return
	 */
	public String getOS(HttpServletRequest request){
		return null;
	}

	/**
	 * 获取访问者ip
	 * @param request
	 * @return
	 */
	public String getIP(HttpServletRequest request){
		return null;
	}
}
