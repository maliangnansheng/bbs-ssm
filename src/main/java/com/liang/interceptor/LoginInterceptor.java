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
        Object sessionAname = session.getAttribute("sessionAname");
        // 管理员登录情况下拥有所有权限
        if (sessionAname != null && sessionAname != "") {
            return true;
        }

        boolean interfaceBoolean = uri.contains("/user/getLogin")             // 用户系统-登录
                || uri.contains("/article/getArticle")                        // 获取文章信息-------------
                || uri.contains("/article/getAnswerArticleUserid")            // 回答
                || uri.contains("/user/getAttentionUserId")                   // 关注
                || uri.contains("/article/getCollectArticleUserid")           // 收藏
                || uri.contains("/plate/getPlate")                            // 获取所有版块信息-------------
                || uri.contains("/article/getHotArticle")                     // 获取热门文章信息-------------
                || uri.contains("/comment/getNewComment")                     // 获取最新评论信息-------------
                || uri.contains("/visit/getStatVisit")                        // 获取方无统计信息-------------
                || uri.contains("/visit/setVisit")                            // 记录访问信息-------------
                || uri.contains("/user/getUserRankByArticleSum")              // 排行榜信息-------------
                || uri.contains("/user/getNewUser")                           // 新注册用户信息-------------
                || uri.contains("/user/setSignUp")                            // 用户系统-注册
                || uri.contains("/user/userExit")                             // 用户系统-退出登录
                || uri.contains("/article/appendMore")                        // 用户系统-加载更多
                || uri.contains("/article/getArticleFid")                     // 用户系统-文章详情
                || uri.contains("/article/getArticleBid/")                    // 用户系统-通过板块检索文章
                || uri.contains("/user/getOther/")                            // 用户系统-他人主页
                || uri.contains("/user/getDynamicAnswerAttentionCollectSum")  // 用户系统-获取动态、回答、关注、收藏总数
                || uri.contains("/donateController/getDonateAll")             // 捐赠图表
                || uri.endsWith("/admin")                                     // 管理系统
                || uri.contains("/admin/getLogin")                            // 管理系统-登录
                || uri.contains("/admin/adminExit")                           // 管理系统-登出
                || uri.contains("/admin/getUserArticlePlateVisitSum")         // 管理系统-获取用户、文章、板块、访问总数
                || uri.contains("/user/getUser")                              // 管理系统-分页获取用户
                || uri.contains("/article/getArticleManagement")              // 管理系统-分页获取文章
                || uri.contains("/visit/getVisit")                            // 管理系统-分页获取访问信息
                || uri.contains("/visit/getVisitRecordDay/");                 // 管理系统-获取最近那天的访问信息访问信息
        if (interfaceBoolean) {
            return true;
        }

        String username = (String) session.getAttribute("username");
        // 普通用户登录情况下拥有大部分权限（管理员的某些权限没有）
        if (username != null && !username.equals("")) {
            boolean interfaceBoolean2 = uri.contains("/user/deleteUser")      // 管理系统-删除用户
                    || uri.contains("/article/updateArticleStatus")           // 管理系统-文章审核
                    || uri.contains("/plate/setPlate")                        // 管理系统-板块新增
                    || uri.contains("/plate/updatePlate")                     // 管理系统-板块修改
                    || uri.contains("/plate/deletePlate");                    // 管理系统-板块删除
            if (!interfaceBoolean2) {    // 以上是管理员才有的权限，普通用户无权操作
                return true;
            }
        }

        //不符合条件的给出提示信息，并转发到登录页面
        request.setAttribute("msg", "请先登录！");
        //说明就是ajax请求，需要特殊处理
        if("XMLHttpRequest".equals(request.getHeader("X-Requested-With"))) {
            //告诉ajax我是重定向
            response.setHeader("redirect", "redirect");
            //告诉ajax我重定向的路径
//            response.setHeader("url", "/notLogin.jsp");
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        } else {  // 非ajax请求直接转发
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
