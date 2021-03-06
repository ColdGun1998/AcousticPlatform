# acousticplatform

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### issues
1. Echarts自适应，Map组件自适应
2. 后端开接口，从服务器拉取用户和场景信息
3. 请求的location保存在本地，新增接口
4. 支持同一个场景选择多个用户
5. echarts响应式隐藏/显示轨迹图
6. 切换组件时，store中的数据和页面设置的默认数据不符合
7. vue3 computed数据（依赖vuex中的数据）如果不在模板中使用，则不会触发
8. 具名插槽和作用域插槽的具体用法
9. 自己实现首页flex布局有问题，高度不能自适应，改成用element
10. vue2和vue3选择
11. 列表懒加载load
12. 买 OSS 服务，将图片等静态资源上传至 CDN，通过内容分发的形式，让使用的用户就近获取在线资源。
13. 上传图片的地址前后端怎么统一
14. PATCH请求，删除请求
15. 删除场景要不要删除后台的图片资源
16. 将场景配置导出
17. 基站配置怎么设计
18. 基站坐标:表单嵌套表格，输入个数怎么判断空字符
19. 布局相同的页面做组件的抽离，包括获取列表的方法，筛选条件等
20. addScene作为二级路由
22. 列表翻页后，自动滚动到顶部
23. 级联选择器懒加载
24. fengmap npm安装后找不到依赖
25. fengmap和echart获取dom元素应该用ref，却用了getElement
26. fengmap加载动画
27. 路由懒加载
28. 路由常量抽离
29. 父子组件传递对象
30. 父组件改变场景后，子组件没有响应式改变；
31. 没有选择场景时，应该有错误提示
32. watchEffect优化watch
33. 地图加载中显示动画
34. location初始化时,sceneID和userID可能为空值