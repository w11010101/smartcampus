更新内容：
============ 2018.4.27 ============

------------ 2018.4.27 v1
1、本地浏览请打开 old-index.html
2、如内置nodejs，运行node server.js

------------ 2018.4.27 v1.1
1、修改nav的vue循环问题添加 相关组建（待整合）
2、修改有子集的点击 展开子集问题

============ 2018.5.8 ============
1、修改点击没有nodes的选项闪烁和active问题
2、修改container-1，-2的dom
3、修改data.js结构，注意href前面要加“#”

============ 2018.5.9 ============
1、修改所有字段dome 改名为 demo；涉及文件：data.js、
2、修改container.css和v-container.js 改名为 demo.css和v-demo.js；涉及到的文件有（index.html、local-index.html、demo.html、demo-Doc.html）；
3、同步v-nav.js中jumpPage方法：并对Vue.component中的template a标签href="#"；另绑定v-bind:action=todo.href;
	3.1对组件（Vue.component）中的 .dropdown-menu 添加v-if="subtodo.nodes&&subtodo.nodes.length" 判断条件（还有nav.html中页存在）；
4、另外添加新的demo的文档形式；
5、删除了改名文件；

============ 2018.5.10 ============
1、修改 demo.css样式整合
2、修复右侧导航收起时，原位置无法点击问题（nav-style.css）
3、删除data.js数据里的部分假数据
4、重大修改：要想本地查看dome文档，就打开local-index.html，取消了之前访问地址的形式；
5、重大提示：想查看如果组合右侧结构，可以看views/container/modules.html
5、文件忽略：忽略views/test.html、views/index.html

============ 2018.5.11 ============
1、修改css
2、同步个HTML文件内的dom和css
3、新增 views/container/modules.html 使用参考；

============ 2018.5.15 ============
1、删除modules.html,并改名为test.html(用于查看实例)；
2、修改boostrap.js中的dropdown部分；
3、修改h1、h2 标题的结构；相应修改css
4、修改表单结构，删除class名.form-line；
5、修改表格，增加排序功能；
6、删除my-dropdown.js
7、新增form-inline.html(内联表单)
============ 2018.5.25 ============
1、修改自己的form表单的部分css和dom
2、删除index.html和nva-index.html
3、新增图表（local-index.html查看）
4、新增highcharts.js
============ 2018.5.30 ============
1、删除demo-Doc.html和demo.html
2、修改form.html部分css
3、添加signIn.html 登录页
4、新增层级多选功能
5、修改之前表单的多选js，并封装js与checkbox.js
============ 2018.6.1 ============
1、添加requirejs，来实现前端模块开发；详细使用参考test.html