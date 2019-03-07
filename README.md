# vue-lazyload-widget

基于浏览器['IntersectionObserver'](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)接口，实现的`Vue`懒加载组件

安装
```javascript
npm i vue-lazyload-widget
```
在`main.js`中引入
```javascript
import vueLazyloadWidget from 'vue-lazyload-widget'

Vue.use(vueLazyloadWidget)
```
### 图片懒加载
```apple js
<img v-lazy-img="imgUrl">
```
### 模块懒加载
> in progress

### 关于配置项
目前包括以下配置项
- `root`  视图窗口viewport的dom对象，默认为当前浏览器窗口
- `rootMargin` 触发懒加载的视图外边距，默认值为"0px 0px 0px 0px"，例如设置为"10px"时，会在距离视图`10px`时开始加载

目前设计的有两种配置方式，首先是在注册时直接传入
```javascript
const options  = {};
Vue.use(vueLazyloadWidget, options)
```
另一种方式是修改全局配置，配置项是优先读取`Vue`原型上的配置项(该方法暂未生效)
```javascript
const options  = {};
Vue.prototype.lazyOptions = options;
```
