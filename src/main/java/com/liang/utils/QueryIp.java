package com.liang.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@PropertySource({"classpath:tokenconfig.properties"})
@Component
public class QueryIp {
    // ip解析的token
    @Value("${token}")
    private String token;

	// txt|jsonp|xml
    private static final String DATATYPE="text";
	
    public Map<String, Object> get(String urlString,String token) {
        return null;
    }

    /**
     * 通过ip获取地域信息
     * @param ip
     * @return
     */
    public Map<String, Object> queryIP(String ip){
        String url="http://api.ip138.com/query/?ip=" + ip + "&datatype=" + DATATYPE;
        return get(url, token);
    }

    /**
     * 一个或多个空格分割字符串
     * @param str
     * @return
     */
    public Map<String, Object> trim(String str)
    {
        //正则表达式\s表示匹配任何空白字符，+表示匹配一次或多次。
        String [] arr = str.split("\\s+");
        Map<String, Object> map=new HashMap<>();
        for (int i=0;i<arr.length;i++){
            switch (i){
                case 0:map.put("ip",arr[i]);break;
                case 1:map.put("country",arr[i]);break;
                case 2:map.put("region",arr[i]);break;
                case 3:map.put("city",arr[i]);break;
                case 4:map.put("communication",arr[i]);break;
                default:break;
            }
        }

        return map;
    }
}
