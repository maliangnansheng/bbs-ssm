package com.liang.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpSession;

import com.liang.bean.impl.UserImpl;
import com.liang.code.ReturnT;
import com.liang.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.liang.bean.User;
import com.liang.service.ArticleService;
import com.liang.service.AttentionService;
import com.liang.service.CollectService;
import com.liang.service.CommentService;
import com.liang.service.UserService;
import com.liang.service.ViaService;
import org.springframework.web.bind.support.SessionStatus;

@RequestMapping("/api/rest/nanshengbbs/v3.0/user")
@SessionAttributes(value = {"userid", "username", "email", "userPhoto"})
@Controller
public class UserController {
	@Autowired
	UserService userService;
	@Autowired
	ArticleService articleService;
	@Autowired
	CommentService commentService;
	@Autowired
	ViaService viaService;
	@Autowired
	AttentionService attentionService;
	@Autowired
	CollectService collectService;
	@Autowired
	PageUtil pageUtil;

	// 管理系统-用户追加条数（出第一页外）
	private  int adminUserDefaultPageSize;

	@PostConstruct
	private void init(){
		adminUserDefaultPageSize = pageUtil.getAdminUserDefaultPageSize();
	}

	/**
	 * 用户注册
	 * @param user
	 * @param model
	 * @return
	 */
	@PostMapping("/setSignUp")
	@ResponseBody
	public ReturnT<?> setSignUp(User user, Model model) {
		try {
			if (userService.getUserName(user.getName()) == null) {	// 该用户不存在
				if (userService.getEmail(user.getEmail()) == null) {	// 该Email不存在
					user.setUserid(UUIDUtil.getRandomUUID());
					userService.setUser(user);
					model.addAttribute("userid", userService.getUserName(user.getName()).getUserid());
					model.addAttribute("username", user.getName());
					model.addAttribute("email", user.getEmail());
					return ReturnT.success("注册成功");
				} else {
					return ReturnT.fail(HttpStatus.NOT_FOUND, "该Email已被其他用户使用");
				}
			} else {
				return ReturnT.fail(HttpStatus.METHOD_NOT_ALLOWED, "该用户名已被使用");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("注册失败");
		}
	}

	/**
	 * 删除用户
	 * @param userid
	 * @param session
	 * @return
	 * @throws IOException
	 */
	@DeleteMapping("/deleteUser/{userid}")
	@ResponseBody
	public ReturnT<?> deleteUser(@PathVariable String userid, HttpSession session, Model model) {
		try {
			// 删除用户信息
			userService.deleteUser(userid);

			// 如果删除的是当前登录用户，则清空对应的session
			if(session.getAttribute("userid") != null && session.getAttribute("userid").equals(userid)) {
				model.addAttribute("userid", "");
				model.addAttribute("username", "");
			}
			return ReturnT.success("删除用户数据成功");
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("删除用户数据失败");
		}
	}

	/**
	 * 编辑个人资料（修改user表）
	 * @param user
	 * @return
	 * @return
	 */
	@PutMapping("/updateUser")
	@ResponseBody
	public ReturnT<?> UpdateUser(User user, HttpSession session) {
		try {
			user.setUserid((String) session.getAttribute("userid"));
			userService.updateUser(user);
			return ReturnT.success("修改用户信息成功");
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("修改用户信息失败");
		}
	}

	/**
	 * 修改用户名
	 * @param username
	 * @param session
	 * @return
	 */
	@PutMapping("/updateUsername")
	@ResponseBody
	public ReturnT<?> updateUsername(String username, HttpSession session, Model model) {
		try {
			if (userService.getUserName(username) == null) {	// 用户名不存在-可以修改
				User user = new User();
				user.setUserid((String) session.getAttribute("userid"));
				user.setName(username);
				userService.updateUsername(user);
				model.addAttribute("username", username);
				return ReturnT.success("用户名修改成功");
			} else {
				return ReturnT.fail(HttpStatus.NOT_FOUND, "用户名已被使用");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("用户名修改失败");
		}
	}

	/**
	 * 修改密码
	 * @param passOld	// 旧密码
	 * @param passNew	// 新密码
	 * @param session
	 * @return
	 */
	@PostMapping("/updatePassword")
	@ResponseBody
	public ReturnT<?> updatePassword(String passOld, String passNew, HttpSession session) {
		String userid = (String) session.getAttribute("userid");
		try {
			User user = new User();
			user.setUserid(userid);
			user.setPassword(passOld);
			if (userService.getIdPass(user) != null) {	// 旧密码正确
				user.setPassword(passNew);
				userService.updatePassword(user);
				return ReturnT.success("密码修改成功");
			} else {	// 旧密码不正确
				return ReturnT.fail(HttpStatus.NOT_FOUND, "原密码不正确");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("修改密码失败");
		}
	}

	/**
	 * 修改Email
	 * @param email
	 * @param session
	 * @return
	 */
	@PutMapping("/updateEmail")
	@ResponseBody
	public ReturnT<?> updateEmail(String email, HttpSession session, Model model) {
		try {
			if (userService.getEmail(email) == null) {	// Email不存在-可以修改
				User user = new User();
				user.setUserid((String) session.getAttribute("userid"));
				user.setEmail(email);
				userService.updateEmail(user);
				model.addAttribute("email", email);
				return ReturnT.success("Email修改成功");
			} else {
				return ReturnT.fail(HttpStatus.NOT_FOUND, "该Email已被其他用户绑定");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("Email修改失败");
		}
	}

	/**
	 * 用户登录
	 * @param user
	 * @param model
	 * @return
	 */
	@PostMapping(value="/getLogin")
	@ResponseBody
	public ReturnT<?> getLogin(User user, Model model) {
		try {
			UserImpl userImpl = userService.getNameEmailPass(user);
			if (user !=  null) {
				model.addAttribute("userid", userImpl.getUserid());
				model.addAttribute("username", userImpl.getName());
				model.addAttribute("email", userImpl.getEmail());
				if (userImpl.getPhoto() != null){	// null放入model有bug
					model.addAttribute("userPhoto", userImpl.getPhoto());
				}
				return ReturnT.success("登录成功");
			} else {
				return ReturnT.fail(HttpStatus.NOT_FOUND, "用户名/邮箱或密码错误");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail(HttpStatus.NOT_FOUND, "登录失败");
		}
	}

	/**
	 * 退出登录
	 * @param session
	 * @param sessionStatus
	 * @return
	 */
	@GetMapping("/userExit")
	@ResponseBody
	public ReturnT<?> userExit(HttpSession session, SessionStatus sessionStatus) {
		try {
			session.removeAttribute("userid");
			session.removeAttribute("username");
			session.removeAttribute("email");
			session.removeAttribute("userPhoto");
			// 只清除@SessionAttributes的session，不会清除HttpSession的数据
			sessionStatus.setComplete();
			return ReturnT.success("退出登录成功");
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("退出登录失败");
		}
	}

	/**
	 * 按userid获取用户信息
	 * @param userid
	 * @return
	 */
	@GetMapping("/getUserId/{userid}")
	@ResponseBody
	public ReturnT<?> getUserId(@PathVariable String userid) {
		try {
			// 按userid查询处理用户信息
			User user = userService.getUserKey(userid);
			// 实体类转Map
			Map<String, Object> map = EntityMapUtils.entityToMap(user);
			// 通过文章创建者ID查询用户头像信息
			map.put("via", viaService.getVia(user.getUserid()));
			return new ReturnT<>(HttpStatus.OK, "获取用户信息成功", map);
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("获取用户信息失败");
		}
	}

	/**
	 * 按userid获取关注和被关注的用户信息
	 * @param userid
	 * @return
	 */
	@GetMapping("/getAttentionUserId/{userid}")
	@ResponseBody
	public ReturnT<?> getAttentionUserId(@PathVariable String userid) {
		Map<String, Object> map = new HashMap<>();
		try {
			// 按userid查询关注信息（你关注了谁）
			map.put("listUser", userService.getUserImpl(userid, true));
			// 按userid查询关注信息（谁关注了你）
			map.put("listUser_be", userService.getUserImpl(userid, false));
			return new ReturnT<>(HttpStatus.OK, "获取用户数据成功", map);
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("获取用户数据失败");
		}
	}

	/**
	 * 按userid获取动态、回答、关注、收藏总数
	 * @param userid
	 * @return
	 */
	@GetMapping("/getDynamicAnswerAttentionCollectSum/{userid}")
	@ResponseBody
	public ReturnT<?> getDynamicAnswerAttentionCollectSum(@PathVariable String userid, HttpSession session) {
		Map<String, Object> map = new HashMap<>();
		try {
			if (userid.equals(session.getAttribute("userid"))) {
				map.put("userid", userid);
			} else {
				map.put("userid", userid);
				map.put("status", true);
			}
			// 动态数
			map.put("dynamicCount", articleService.getArticleCountByUserid(map));
			map.put("status", true);
			// 回答数
			map.put("answerCount", articleService.getAnswerArticleCountByUserid(map));
			// 关注数
			map.put("attentionCount", attentionService.getCountByUserid(userid) + attentionService.getCountByBeuserid(userid));
			// 收藏数
			map.put("collectCount", articleService.getCollectCountByUserid(map));
			map.remove("userid");
			map.remove("status");
			return new ReturnT<>(HttpStatus.OK, "获取动态、回答、关注、收藏总数成功", map);
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("获取动态、回答、关注、收藏总数失败");
		}
	}

	/**
	 * 个人主页-用户信息
	 *
	 * @return
	 */
	@GetMapping("/getMyselfUser")
	@ResponseBody
	public ReturnT<?> getMyselfUser(HttpSession session) {
		Map<String, Object> resMap = new HashMap<>();
		try {
			// 按userid查询用户信息
			User user = userService.getUserKey((String) session.getAttribute("userid"));
			// 实体类转Map
			Map<String, Object> map = EntityMapUtils.entityToMap(user);
			// 通过文章创建者ID查询用户头像信息
			map.put("via", viaService.getVia(user.getUserid()));
			resMap.put("user", map);
			return new ReturnT<>(HttpStatus.OK, "获取用户数据成功", resMap);
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("获取用户数据失败");
		}
	}

	/**
	 * 他（本）人主页
	 * @param userid
	 * @param session
	 * @return
	 */
	@GetMapping("/getOther/{userid}")
	@ResponseBody
	public ReturnT<?> getOther(@PathVariable String userid, HttpSession session) {
		Map<String, Object> map = new HashMap<>();
		try {
			//如果该用户是登录用户，则回到“个人主页”
			if(session.getAttribute("userid") != null && session.getAttribute("userid").equals(userid)) {
				map.put("url", "/myself.jsp");
			} else {
				map.put("url", "/other.jsp");
			}
			return new ReturnT<>(HttpStatus.OK, "处理跳转成功", map);
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("处理跳转失败");
		}
	}
	
	/**
	 * 查询用户信息（分页）
	 * @param pageStart
	 */
	@GetMapping("/getUser")
	@ResponseBody
	public ReturnT<?> getUser(@RequestParam(required=true,defaultValue="1") int pageStart) {
		Map<String, Object> map = new HashMap<>();
		try {
			// 尾页
			int tail = 1;
			// 用户总数
			int total = userService.getCount();
			map.put("listUser", userService.getUserImplPaging(pageStart, adminUserDefaultPageSize));
			map.put("total",total);
			map.put("pageStart", pageStart);
			map.put("pageSize", adminUserDefaultPageSize);
			if (total % adminUserDefaultPageSize == 0){
				tail = total / adminUserDefaultPageSize;
				map.put("tail",tail);
			} else {
				tail = (total / adminUserDefaultPageSize) +1;
				map.put("tail",tail);
			}
			return new ReturnT<>(HttpStatus.OK, "获取用户数据成功", map);
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("获取用户数据失败");
		}
	}

	/**
	 * 获取用户排名（按文章数）
	 * @return
	 */
	@GetMapping("/getUserRankByArticleSum")
	@ResponseBody
	public ReturnT<?> getUserRankByArticleSum() {
		try {
			return new ReturnT<>(HttpStatus.OK, "获取排行榜数据成功", userService.getUserRankByArticleSum());
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("获取排行榜数据失败");
		}
	}

	/**
	 * 获取新注册用户
	 * @return
	 */
	@GetMapping("/getNewUser")
	@ResponseBody
	public ReturnT<?> getNewUser() {
		try {
			return new ReturnT<>(HttpStatus.OK, "获取新注册用户数据成功", userService.getNewUser());
		} catch (Exception e) {
			e.printStackTrace();
			return ReturnT.fail("获取新注册用户数据失败");
		}
	}
}
