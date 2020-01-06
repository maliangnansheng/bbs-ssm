package com.liang.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * @author maliang
 * @create 2019-11-27 22:30
 */
public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {
        //获取请求的RUi:去除http:localhost:8080这部分剩下的
        String uri = request.getRequestURI();
        //获取session
        HttpSession session = request.getSession();
        Object adminList = session.getAttribute("adminList");
        // 管理员登录情况下拥有所有权限
        if (adminList != null && adminList != "") {
            return true;
        }

        //UTL:除了login.jsp是可以公开访问的，其他的URL都进行拦截控制
        boolean interfaceBoolean = uri.contains("/userController/getLoginAjax")         // 用户系统-登录验证
                || uri.contains("/userController/setSignUp")                            // 用户系统-注册
                || uri.contains("/common/getAll")                                       // 用户系统-首页
                || uri.contains("/common/appendMore")                                   // 用户系统-加载更多
                || uri.contains("/articleController/getArticleFid")                     // 用户系统-文章详情
                || uri.contains("/common/getArticleBid")                              // 用户系统-通过板块检索文章
                || uri.contains("/common/getArticleTitle")                              // 用户系统-搜索
                || uri.contains("/userController/getOthers")                            // 用户系统-他人主页
                || uri.endsWith("/admin")                                               // 管理系统
                || uri.contains("/adminController/getLogin")                            // 管理系统-登录
                || uri.contains("/common/getAll_Admin")                                 // 管理系统-首页
                || uri.contains("/userController/getUser")                              // 管理系统-分页获取用户
                || uri.contains("/articleController/getArticleManagement")              // 管理系统-分页获取文章
                || uri.contains("/visitController/getVisit");                           // 管理系统-分页获取访问信息
        if (interfaceBoolean) {
            return true;
        }

        String username = (String) session.getAttribute("username");
        //普通用户登录情况下拥有大部分权限（管理员的某些权限没有）
        if (username != null && !username.equals("")) {
            boolean interfaceBoolean2 = uri.contains("/userController/deleteUser")      // 管理系统-删除用户
                    || uri.contains("/articleController/articleStatus")                 // 管理系统-文章审核
                    || uri.contains("/plateController/setPlate")                        // 管理系统-板块新增
                    || uri.contains("/plateController/updatePlate")                     // 管理系统-板块修改
                    || uri.contains("/plateController/deletePlate");                    // 管理系统-板块删除
            if (!interfaceBoolean2) {    // 以上是管理员才有的权限，普通用户无权操作
                return true;
            }
        }

        //不符合条件的给出提示信息，并转发到登录页面
        request.setAttribute("msg", "您还没有登录，请先登录！");
        //说明就是ajax请求，需要特殊处理
        if("XMLHttpRequest".equals(request.getHeader("X-Requested-With"))){
            //告诉ajax我是重定向
            response.setHeader("redirect", "redirect");
            //告诉ajax我重定向的路径
            response.setHeader("url", "/notLogin.jsp");
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        }else{  // 非ajax请求直接转发
            request.getRequestDispatcher("/notLogin.jsp").forward(request, response);
        }

        return false;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
