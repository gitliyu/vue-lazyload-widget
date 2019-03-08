// 合并配置项
export function merge (target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  return target;
}

// 判断是否是有效img标签
export function isLazyImage (el) {
  return el.tagName === 'IMG' && el.dataset.src; 
}

// 判断是否是空对象
export function isEmptyObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]' ? JSON.stringify(obj) === '{}' : false;
}
