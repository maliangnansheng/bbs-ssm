package com.liang.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

/**
 * @author maliang
 * @create 2019-12-28 17:03
 */
public class UUIDUtil {
    private static final DateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");

    /**
     * 构造uuid（当前时间+uuid）
     * @return
     */
    public static String getRandomUUID(){
        String uuid = format.format(new Date()) + "-" + UUID.randomUUID().toString().replace("-","");

        return uuid;
    }
}
