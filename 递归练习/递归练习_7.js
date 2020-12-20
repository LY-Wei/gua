const log = console.log.bind(console)

const ensure = (condition, message) => {
    if (!condition) {
        log('测试失败', message)
    } else {
        log('测试成功')
    }
}

const isArray = o => Array.isArray(o)

const isObject = o => Object.prototype.toString.call(o) === '[object Object]'

const equals = (a, b) => {
    // 1. 如果 a 和 b 都是数组, 就参考 arrayDeepEquals 的方式来判断
    // 1.1 如果 a.length 与 b.length 不相等, 返回 false
    // 1.2 遍历数组 a, 用 equals 判断两个数组遍历出来的元素
    // 1.3 如果判断出来的结果不相等, 返回 false
    // 1.4 如果数组遍历结束都没有返回 false, 那么直接返回 true
    // 2. 如果 a 和 b 都是对象, 就参考 objectDeepEquals 的方式来判断
    // 2.1 如果对象 a 与 对象 b 的 key 长度不一样, 返回 false
    // 2.2 遍历对象 a, 用 equals 判断两个对象遍历出来的值
    // 2.3 如果判断出来的结果不相等, 返回 false
    // 2.4 如果对象遍历结束都没有返回 false, 那么直接返回 true
    // 3. 否则, 直接判断 a 与 b 是否相等
    if (isArray(a) && isArray(b)) {
        if (a.length !== b.length) {
            return false
        } else {
            for (let i = 0; i < a.length; i++) {
                let a1 = a[i]
                let b1 = b[i]
                let res = equals(a1, b1)
                if (!res) {
                    return false
                }
            }
            return true
        }
    } else if (isObject(a) && isObject(b)) {
        let keys1 = Object.keys(a)
        let keys2 = Object.keys(b)
        if (keys1.length !== keys2.length) {
            return false
        } else {
            for (let i = 0; i < keys1.length; i++) {
                let key1 = keys1[i]
                let key2 = keys2[i]
                let value1 = a[key1]
                let value2 = b[key2]
                let res = equals(value1, value2)
                if (!res) {
                    return false
                }
            }
            return true
        }
    }
    return (a === b)
}

const flat = (array) => {
    // 把数组 array 拍平
    // 注意, 只需要把层级减少一层
    // 如果 array 是一维数组, 那么返回一维数组
    // 如果 array 是二维数组, 那么返回一维数组
    // 如果 array 是三维数组, 那么返回二维数组

    // 提示
    // 新建一个空数组 l
    // 遍历数组 array 得到元素
    // 如果元素是数组, 继续遍历这个元素, 并且把得到的结果添加到 l 中
    // 如果元素不是数组, 直接把元素添加到 l 中

    let l = []
    if (isArray(array)) {
        for (let i = 0; i < array.length; i++) {
            let e = array[i]
            if (isArray(e)) {
                for (let j = 0; j < e.length; j++) {
                    l.push(e[j])
                }
            } else {
                l.push(e)
            }
        }
    }
    return l
}

const testFlat = () => {
    let test1 = []
    let test2 = [1]
    let test3 = [1, [2]]
    let test4 = [1, [2, [3]]]

    ensure(equals(flat(test1), []), 'flat test1')
    ensure(equals(flat(test2), [1]), 'flat test2')
    ensure(equals(flat(test3), [1, 2]), 'flat test3')
    ensure(equals(flat(test4), [1, 2, [3]]), 'flat test4')
}

const flatDeep = (array) => {
    // 把数组 array 拍平
    // 注意, 不管 array 嵌套多少层, 最终都返回一维数组

    // 提示
    // 新建一个空数组 l
    // 遍历数组 array 得到元素
    // 如果元素是数组, 递归调用 flatDeep 函数把元素作为参数, 并且把得到的返回值与 l 拼接在一起, 注意, 这一步需要用 concat 方法
    // 如果元素不是数组, 直接把元素添加到 l 中

    let l = []
    for (let i = 0; i < array.length; i++) {
        let e = array[i]
        if (isArray(e)) {
            let res = flatDeep(e)
            return l.concat(res)
        } else {
            l.push(e)
        }
    }
    return l
}

const testFlatDeep = () => {
    let test1 = []
    let test2 = [1]
    let test3 = [1, [2]]
    let test4 = [1, [2, [3]]]
    let test5 = [1, [2, [3, [4]]]]

    ensure(equals(flatDeep(test1), []), 'flat test1')
    ensure(equals(flatDeep(test2), [1]), 'flat test2')
    ensure(equals(flatDeep(test3), [1, 2]), 'flat test3')
    ensure(equals(flatDeep(test4), [1, 2, 3]), 'flat test4')
    ensure(equals(flatDeep(test5), [1, 2, 3, 4]), 'flat test5')
}

// testFlat()
testFlatDeep()
