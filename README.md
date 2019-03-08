# vue-lazyload-widget

基于浏览器['IntersectionObserver'](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)接口，实现的`Vue`懒加载组件，初步计划是有实现图片懒加载以及模块的懒加载两种内容，分别以指令和组件的形式来使用

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
<img v-lazy-img="path">
// or
<img dat-src="path" v-lazy-img> 
```
> 图片路径需要设置绝对路径

### 模块懒加载
> in progress

### 关于配置项
目前包括以下配置项
- `root`  视图窗口viewport的dom对象，默认为当前浏览器窗口
- `rootMargin` 触发懒加载的视图外边距，默认值为"0px 0px 0px 0px"，例如设置为"10px"时，会在距离视图`10px`时开始加载

目前设计的有三种配置方式，按优先级从低到高来看
- 在注册时直接传入
```javascript
const options  = {};
Vue.use(vueLazyloadWidget, options)
```
- 组件中修改配置项，会优先读取组件中的`lazyOptions`属性
```javascript
data () {
  lazyOptions: {
    root: null,
    rootMargin: '0px'
  }
}
```
- 组件注册时传入(暂未生效)

### 兼容性
由于主要依赖于['IntersectionObserver'](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)接口，目前只适用于部分高版本浏览器，如果要兼容低版本，需要额外安装['IntersectionObserver Polyfill'](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)
```
npm install intersection-observer
```
### 参考
- ['hilongjw/vue-lazyload'](https://github.com/hilongjw/vue-lazyload)
- ['xunleif2e/vue-lazy-component'](https://github.com/xunleif2e/vue-lazy-component)
