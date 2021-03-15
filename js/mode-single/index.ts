
/**
 * @description 单例模式
 *              利用闭包缓存需要被多次调用的单例
 *              单例只会被创建一次
 * @template A 回调函数接受的参数类型（数组）
 * @template R 回调函数返回的参数类型
 * @param {(...args: A) => R} callback 回调函数
 * @return {(...args: A) => R} fn 经过单例模式处理有的回调函数
 */
function getSingle<A extends Array<any> = [], R = any>(callback: (...args: A) => R): (...args: A) => R {
  let resoults = null
  return function (...args: A) {
    if (!resoults) {
      resoults = callback.apply(this, args)
    }
    return resoults
  }
}
