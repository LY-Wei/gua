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

const objectClone = (object) => {
    // clone 一个对象并且返回
    // 注意, 要求实现浅拷贝
    return Object.assign({}, object)
}

const testObjectClone = () => {
    let a1 = {
        x: 1,
    }
    let b1 = objectClone(a1)
    ensure(equals(a1, b1), 'test object clone 1')
    a1.y = 100
    ensure(b1.y === undefined, 'test object clone 2')

    let a2 = {
        x: 1,
        y: {},
    }
    let b2 = objectClone(a2)
    ensure(equals(a2, b2), 'test object clone 3')
    b2.y.z = 200
    ensure(a2.y.z === 200, 'test object clone 4')
}

const objectDeepClone = (object) => {
    // clone 一个数组并且返回
    // 注意, 要求实现深拷贝

    // 新建一个空对象 o
    // 遍历 object 得到 key 和 value
    // 如果 value 是对象, 递归调用 objectDeepClone 函数并把 value 作为参数, 将得到的返回值添加到 o 中, 作为 key 对应的 value
    // 如果 value 不是对象, 直接把 value 作为 key 的值

    let o = {}
    let keys = Object.keys(object)
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        let value = object[key]
        if (isObject(value)) {
            let res = objectDeepClone(value)
            o[key] = res
        } else {
            o[key] = value
        }
    }
    return o
}

const testObjectDeepClone = () => {
    let a1 = {
        x: 1,
    }
    let b1 = objectDeepClone(a1)
    ensure(equals(a1, b1), 'test object deep clone 1')
    a1.y = 100
    ensure(b1.y === undefined && a1.y === 100, 'test object deep clone 2')

    let a2 = {
        x: 1,
        y: {},
    }
    let b2 = objectDeepClone(a2)
    ensure(equals(a2, b2), 'test object deep clone 3')
    b2.y.z = 200
    ensure(equals(a2.y, {}) && b2.y.z === 200, 'test object deep clone 4')
}

testObjectClone()
testObjectDeepClone()