> # 南生论坛基于SSM框架，自适应手机端和电脑端，界面简洁美观，功能完整。分为[用户系统](http://www.nanshengbbs.top)和[管理员系统](http://www.nanshengbbs.top/admin)两部分
> > - 用户系统功能结构图
> >   ![](picture/用户系统功能结构图.png)
> >
> > **注：发布的帖子需要管理员“审核通”过后才能在首页显示，可以在“我的主页”查看帖子状态**
>
> > - 管理员系统给你结构图
> >
> > ![](picture/管理员系统功能结构图.png)
>
> ### 数据库获取or疑问解答
> > 需要数据库或者有疑问的同学加作者`QQ：924818949`
> ### 版本更新
> > 1，整体更新为异步实现
> >
> > 2，增加和优化人机交互提示
> >
> > 3，实现分页，减少页面加载时间，提升效率
> ## 技术栈
> > **Spring** 、**SpringMVC** 、**MyBatis** 、**MySQL**  、**Bootstrap** 、**jQuery** 、**Ajax** 、**Layer**、**ECharts**
>
> > ### 我的环境
>
> > **jdk1.8** 、**tomcat9** 、**mysql5.7** 、**maven3.5.4** 、**eclipse4.7.1a**
> ## 在线演示：
> > [用户系统（手机上也有不错的展示效果）](http://www.nanshengbbs.top)
>
> > [管理员系统（用户名：admin密码：......）](http://www.nanshengbbs.top/admin) **↓↓↓**
>
> > > 由于总是有人随意删除他人用户信息，故暂不再开放管理员权限，望理解！
>
> > > 作者`QQ：924818949`
>
> ## 引用本项目流程：
>
> **推荐使用IDEA**
>
> #### 通用操作
>
> > - 通过git将该项目(bbs-ssm)`clone`到本地
> >
> > ![](picture/clone.png)
> >
> > - 将bbs_test.sql导入MySQL数据库：
> >   - 创建数据库bbs_test：`create database bbs_test;`
> >
> >   - 进入bbs_test数据库：`use bbs_test;`
> >
> >   - 将bbs_test.sql导入bbs_test数据库：`source 你的路径\bbs_test.sql;`
>
> #### 针对eclipse
>
> > - 使用eclipse将ssm-bbs以maven的方式导入
> >
> >   ![](picture/maven1.png)
> >
> >   ![](picture/maven2.png)
> >
> >   等待Maven下载依赖包完成...
> >
> > - 修改项目部署路径
> >
> >   ![](picture/tomcat.png)
> >
> > - 启动项目
> >
> >   ![](picture/run.png)可以正常访问与操作了...真好
>
> #### 针对idea
>
> > **注：对应的Tomcat配置、Maven配置等自己搞定...**
> >
> > - 使用idea将ssm-bbs导入
> >
> >   ![](picture/idea001.png)
> >
> >   点击“Enable Auto-Import”让其自动下载依赖包
> >
> >   ![](picture/idea002.png)
> >
> >   等待Maven下载依赖包完成...
> >
> > - 修改项目部署路径
> >
> >   ![](/picture/idea003.png)
> >
> >   ![](picture/idea004.png)
> >
> > - 启动项目
> >
> >   ![](picture/idea005.png)
> >
> >   可以正常访问与操作了...真好
>
> ## 静态展示：
> ### 用户系统
>
> - > #### 登录
>
> > ![image](picture/用户-登录2.png)
> >
> > - 手机上的效果：
> >
> > <img src="picture/手机-登录.jpg" alt="image" style="zoom:25%;" />
>
> - > #### 注册
>
> > ![image](picture/用户-注册.png)
> >
> > - 手机上的效果：
> >
> > <img src="picture/手机-注册.jpg" alt="image" style="zoom:25%;" />
>
> - > #### 首页-登录前
>
> > ![image](picture/用户-首页（登录前）.png)
> >
> > - 手机上的效果：
> >
> > <img src="picture/手机-首页（登录前）.jpg" alt="image" style="zoom:25%;" />
>
> - > #### 首页-登录后
>
> > ![image](picture/用户-首页（登陆后）.png)
> >
> > - 手机上的效果：
> >
> > <img src="picture/手机-首页（登录后）.jpg" alt="image" style="zoom: 25%;" />
>
> - > #### 发帖
>
> > ![image](picture/用户-发帖2.png)
> >
> > - 手机上的效果：
> >
> > <img src="picture/手机-发帖.jpg" alt="image" style="zoom: 25%;" />
>
> - > #### 个人主页
>
> > ![image](picture/用户-个人主页2.png)
> >
> > - 手机上的效果：
> >
> > <img src="picture/手机-个人主页.jpg" alt="image" style="zoom: 25%;" />
>
> - > #### 编辑个人资料
>
> > ![image](picture/用户-编辑个人资料2.png)
> >
> > - 手机上的效果：
> >
> > <img src="picture/手机-编辑个人资料.jpg" alt="image" style="zoom: 25%;" />
>
> - > #### 基本信息设置
>
> > ![image](picture/用户-基本信息设置2.png)
> >
> > - 手机上的效果：
> >
> > <img src="picture/手机-基本信息设置.jpg" alt="image" style="zoom: 25%;" />
>
> - > #### 修改头像（点击头像弹出模态框）
>
> > ![image](picture/用户-上传头像2.png)
> >
> > - 手机上的效果：
> >
> > <img src="picture/手机-修改头像.jpg" alt="image" style="zoom: 25%;" />
>
> - > #### 动态
>
> > ![image](picture/用户-动态.png)
> >
> > - 手机上的效果：
> >
> > <img src="picture/手机-动态.jpg" alt="image" style="zoom: 25%;" />
>
> - > #### 回答
>
> > ![image](picture/用户-回答.png)
> >
> > - 手机上的效果：
> >
> > <img src="picture/手机-回复.jpg" alt="image" style="zoom: 25%;" />
>
> - > #### 关注
>
> > ![image](picture/用户-关注.png)
> >
> > - 手机上的效果：
> >
> > <img src="picture/手机-关注.jpg" alt="image" style="zoom: 25%;" />
>
> - > #### 收藏
>
> > ![image](picture/用户-收藏.png)
> >
> > - 手机上的效果：
> >
> > <img src="picture/手机-收藏.jpg" alt="image" style="zoom: 25%;" />
>
> - > #### 相册
>
> > ![image](picture/用户-相册.png)
> >
> > - 手机上的效果：
> >
> > <img src="picture/手机-相册.jpg" alt="image" style="zoom: 25%;" />
>
> - > #### 有照片的相册
>
> > ![image](picture/用户-照片（有）.png)
> >
> > - 手机上的效果：
> >
> > <img src="picture/手机-有照片的相册.jpg" alt="image" style="zoom: 25%;" />
>
> - > #### 无照片的相册
>
> > ![image](picture/用户-照片（无）.png)
> >
> > - 手机上的效果：
> >
> > <img src="picture/手机-无照片的相册.jpg" alt="image" style="zoom: 25%;" />
>
> ### 管理员系统
>
> - > #### 登录
>
> > ![image](picture/管理员-登录2.png)
>
> - > #### 初始页面
>
> > ![image](picture/管理员-初始页面.png)
>
> - > #### 用户管理
>
> > ![image](picture/管理员-用户管理2.png)
>
> - > #### 帖子管理
>
> > ![image](picture/管理员-帖子管理2.png)
>
> - > #### 版块管理
>
> > ![image](picture/管理员-版块管理2.png)
>
> - > #### 访问记录
>
> > ![image](picture/管理员-访问记录.png)
