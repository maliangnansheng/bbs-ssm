> 推荐：[我的另一个基于【SpringBoot+Vue】的企业级项目](https://github.com/maliangnansheng/bbs-springboot)

⚠️ 此版本已停止维护和运营

# 南生论坛SSM版本

[![](https://img.shields.io/badge/Author-马亮南生-orange.svg)](https://blog.nansin.top/)
[![](https://img.shields.io/badge/version-2.8.2-brightgreen.svg)](https://github.com/maliangnansheng/bbs-ssm)
[![GitHub stars](https://img.shields.io/github/stars/maliangnansheng/bbs-ssm.svg?style=social&label=Stars)](https://github.com/maliangnansheng/bbs-ssm)
[![GitHub forks](https://img.shields.io/github/forks/maliangnansheng/bbs-ssm.svg?style=social&label=Fork)](https://github.com/maliangnansheng/bbs-ssm)
- 本项目完全开源！如果觉得不错麻烦帮忙点一次Star⭐️

## 关于项目

- 南生论坛SSM版本基于`SSM`框架，自适应手机端和电脑端，界面简洁美观，功能完善。分为 **用户系统** 和 **管理系统** 两部分
- 该论坛适合`初学SSM`童鞋学习。主要涉及技术包括`Spring 、SpringMVC 、MyBatis 、Redis、MySQL 、Bootstrap 、jQuery 、Ajax 、Layer、ECharts、Editor.md`  

## 默认账号

用户系统 (`马亮南生/123456`)、管理系统 (`admin/admin`)

## 推荐理由

- 注释十分详细、逻辑清晰、界面简洁美观、功能较完善、代码冗余度低、命名规范
- 支持Markdown、Redis缓存技术、QQ分享文章
- 图片/视频文件上七牛云、专注阅读
- ECharts图表化展示、人机交互、异步加载、分页加载、
- 作者每天晚上统一解决你遇到的技术问题和困难
- ...

## 功能结构

- 用户系统-功能结构图

  ![](https://76.nansin.top/bbs_ssm/bbs-user2.8.2-3.png)

  `注：发布的帖子需要管理员“审核通”过后才能在首页显示，可以在“我的主页”查看帖子状态`

- 管理系统-功能结构图

  ![](https://76.nansin.top/bbs_ssm/bbs-管理系统功能结构图2.8.2.png)

## 项目源码

如果可以帮忙点一次`Star`和`Fork`

|   来源   |                   最新源码                   |
| :------: | :------------------------------------------: |
| `github` | <https://github.com/maliangnansheng/bbs-ssm> |
|  `码云`  | <https://gitee.com/maliangnansheng/bbs-ssm>  |

## 技术栈

> `Spring 、SpringMVC 、MyBatis 、Redis、MySQL 、Bootstrap 、jQuery 、Ajax 、Layer、ECharts、Editor.md`

## 运行环境

> `jdk1.8 、tomcat9 、mysql8.0 、maven3.6.0 、IntelliJ IDEA 2020.2.3 x64`

## 引用本项目流程

`推荐使用IDEA`

### 通用操作

- 下载自己需要的版本

- 将bbs_test.sql导入MySQL数据库：

  - 创建数据库bbs_test

    ```sql
    create database bbs_test;
    ```

  - 进入bbs_test数据库

    ```sql
    use bbs_test;
    ```

  - 将bbs_test.sql导入bbs_test数据库

    ```sql
    source 你的路径\bbs_test.sql;
    ```

### 针对eclipse

- 确保你安装了 Maven

  没有用过 `Maven` 的童鞋，赶快去学一下，安装一下；为了避免麻烦，请尽量使用`3.5.4 +`版本

- 使用eclipse将ssm-bbs以maven的方式导入

  ![](https://76.nansin.top/bbs_ssm/bbs-maven001.png)

  ![](https://76.nansin.top/bbs_ssm/bbs-maven2.png)

  等待Maven下载依赖包完成...

- 修改项目部署路径`（v2.8.2及其以上不用操作这一步）`

  ![](https://76.nansin.top/bbs_ssm/bbs-tomcat.png)

- 启动项目

  ![](https://76.nansin.top/bbs_ssm/bbs-run.png)

  可以正常访问与操作了...真好

### 针对idea

- IntelliJIDEA-tomcat在浏览器js乱码问题解决

  [IntelliJIDEA-tomcat在浏览器js乱码问题解决](https://blog.nansin.top/2019/04/28/IntelliJIDEA-tomcat%E5%9C%A8%E6%B5%8F%E8%A7%88%E5%99%A8js%E4%B9%B1%E7%A0%81%E9%97%AE%E9%A2%98%E8%A7%A3%E5%86%B3/)

- 确保你安装了 Maven

  没有用过 `Maven` 的童鞋，赶快去学一下，安装一下；为了避免麻烦，请尽量使用`3.5.4 +`版本

- 使用idea将ssm-bbs导入

  ![](https://76.nansin.top/bbs_ssm/bbs-idea001.png)

  点击“Enable Auto-Import”让其自动下载依赖包

  ![](https://76.nansin.top/bbs_ssm/bbs-idea002.png)

  等待Maven下载依赖包完成...

- 修改项目部署路径`（v2.8.2及其以上不用操作这一步）`

  ![](https://76.nansin.top/bbs_ssm/bbs-idea003.png)

  ![](https://76.nansin.top/bbs_ssm/bbs-idea004.png)

- 启动项目

  ![](https://76.nansin.top/bbs_ssm/bbs-idea005.png)

  可以正常访问与操作了...真好

## 静态展示

### 用户系统

- **首页**

  ![image](https://76.nansin.top/bbs_ssm/bbs-用户-首页v2.8.2.png)

- **文章详情**

  ![image](https://76.nansin.top/bbs_ssm/bbs-用户-文章详情v2.8.2.png)

- **闲聊**
  ![image](https://76.nansin.top/bbs_ssm/bbs-用户-闲聊v2.8.2.png)

- **毒鸡汤**
  ![image](https://76.nansin.top/bbs_ssm/bbs-用户-毒鸡汤v2.8.2.png)

### 管理系统

- **仪表盘**

  ![image](https://76.nansin.top/bbs_ssm/bbs-管理员-仪表盘v2.8.2.png)
