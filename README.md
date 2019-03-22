# vue-lazyload-widget

基于浏览器['IntersectionObserver'](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)接口，实现的`Vue`懒加载组件，初步计划是有实现图片懒加载以及模块的懒加载两种内容，分别以指令和组件的形式来使用

Demo: ['https://liyu.fun/demo/vue-lazyload-widget'](https://liyu.fun/demo/vue-lazyload-widget)

Demo源码示例： ['组件'](https://github.com/gitliyu/vue-lazyload-widget/blob/master/demo/Component.vue) ['图片'](https://github.com/gitliyu/vue-lazyload-widget/blob/master/demo/Directive.vue)

### 安装
使用npm
```
npm i vue-lazyload-widget
```
在`main.js`中引入
```javascript
import vueLazyloadWidget from 'vue-lazyload-widget'

Vue.use(vueLazyloadWidget)
```
直接引入文件
```
<script src="path/vue-lazyload-widget.js"></script> 
```

### 图片懒加载
设置图片路径时有两种可用方式，直接将路径设置为指令属性值或者设置为`data-src`属性
```
<img v-lazy-img="path">
// or
<img dat-src="path" v-lazy-img> 
```
> 图片路径需要设置绝对路径，或者提前引入图片，参考['Demo'](https://github.com/gitliyu/vue-lazyload-widget/blob/master/demo/Directive.vue)

### 组件懒加载
```
<lazy-widget>
  <!--组件内容-->
  <div slot="skeleton"><!--预加载内容，比如骨架--></div>
</lazy-widget>
```
没有设置骨架时，组件未加载之前默认显示loading图片
### 组件Event
接受唯一参数`el`,为当前组件dom实例
- `before-leave`: 预加载内容即将离开
- `after-leave`: 预加载内容已离开
- `before-enter`: 组件内容即将进入
- `after-enter`: 组件内容已进入
- `before-init`: 组件内容即将被渲染
- `after-enter`: 组件内容已渲染完成

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
- 组件注册时传入,如果父组件内有定义，会直接读取父级配置，只有需要单独对组件进行配置时需要传入
```
<lazy-widget :options="lazyOptions" :height="100"></lazy-widget>
```
组件上额外的配置
- `height`: 表示组件内容未加载时的高度，默认为`50px`
- `name`: 组件中`transition`过度组件的name，用于设置过渡动画，默认为`lazy-widget`

### 过渡动画
默认的过渡动画效果为
```css
.lazy-widget-enter-active {
  transition: opacity .5s;
}
.lazy-widget-enter{
  opacity: 0;
}
```
可以通过自定义样式和`name`来修改过渡动画

### 兼容性
由于主要依赖于['IntersectionObserver'](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)接口，目前只适用于部分高版本浏览器，如果要兼容低版本，需要额外安装['IntersectionObserver Polyfill'](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)
```
npm install intersection-observer
```
之后在文件内引入即可
```
require('intersection-observer');
```
or
```
<script src="path/intersection-observer.js"></script>
```
> 注意`intersection-observer`的引用要在本组件之前

### 参考
- ['IntersectionObserver'](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)
- ['hilongjw/vue-lazyload'](https://github.com/hilongjw/vue-lazyload)
- ['xunleif2e/vue-lazy-component'](https://github.com/xunleif2e/vue-lazy-component)
