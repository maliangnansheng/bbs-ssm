package com.liang.utils;

public class StringUtil {
    /**
     * 字符串为空
     * @param data
     * @return
     */
    public static boolean isEmpty(String data){
        return data == null || "".equals(data);
    }

    /**
     * 字符串不为空
     * @param data
     * @return
     */
    public static boolean isNotEmpty(String data){
        return !isEmpty(data);
    }
}
