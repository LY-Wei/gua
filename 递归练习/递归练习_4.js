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

const arrayClone = (array) => {
    // clone 一个数组并且返回
    // 注意, 要求实现浅拷贝

    return array.slice()
}

const testArrayClone = () => {
    let a1 = [1]
    let b1 = arrayClone(a1)
    ensure(equals(a1, b1), 'test array clone 1')

    let a2 = [[1]]
    let b2 = arrayClone(a2)
    ensure(equals(a2, b2), 'test array clone 2')
    a2[0].push(200)
    ensure(equals(b2[0], [1, 200]), 'test array clone 3')


    let a3 = [1, [2]]
    let b3 = arrayClone(a3)
    ensure(equals(a3, b3), 'test3')
    a3[1].push(300)
    ensure(b3[1][1] === 300, 'test4')
}

const arrayDeepClone = (array) => {
    // clone 一个数组并且返回
    // 注意, 要求实现深拷贝

    // 新建一个空数组 l
    let l = []
    // 遍历 array 得到元素
    for (let i = 0; i < array.length; i++) {
        let e = array[i]
        // 如果元素是数组, 递归调用 arrayDeepClone 函数并把元素作为参数, 将得到的返回值添加到 l 中
        if (isArray(e)) {
            let res = arrayDeepClone(e)
            l.push(res)
        } else {
            // 如果元素不是数组, 直接把元素添加到 l 中
            l.push(e)
        }
    }
    return l
}

const testArrayDeepClone = () => {
    let a1 = [1]
    let b1 = arrayDeepClone(a1)
    ensure(equals(a1, b1), 'test array deep clone 1')

    let a2 = [[1]]
    let b2 = arrayDeepClone(a2)
    ensure(equals(a2, b2), 'test array deep clone 2')
    a2[0].push(200)
    ensure(equals(b2[0], [1]) && equals(a2[0], [1, 200]), 'test array deep clone 3')

    let a3 = [1, [2]]
    let b3 = arrayDeepClone(a3)
    ensure(equals(a3, b3), 'test array deep clone 4')
    a3[1].push(300)
    ensure(equals(b3[1], [2]) && equals(a3[1], [2, 300]), 'test array deep clone 5')
}

testArrayClone()
testArrayDeepClone()