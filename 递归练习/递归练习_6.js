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

const deepClone = (value) => {
    // 首先判断 value 是数组还是字典还是其他普通类型
    // 如果 value 是对象, 新建空对象 o
    // 遍历 value 得到 k 和 v
    // 递归调用 deepClone 函数并把 v 作为参数, 将得到的返回值添加到 o 中, 作为 k 对应的 value
    // 遍历结束后返回 o
    // 如果 value 是数组, 新建空数组 l
    // 遍历 value 得到元素
    // 递归调用 deepClone 函数并把元素作为参数, 将得到的返回值添加到 l 中
    // 遍历结束后返回 l
    // 如果 value 是其他类型, 直接返回 value

    if (isObject(value)) {
        let o = {}
        let keys = Object.keys(value)
        for (let i = 0; i < keys.length; i++) {
            let k = keys[i]
            let v = value[k]
            let res = deepClone(v)
            o[k] = res
        }
        return o
    } else if (isArray(value)) {
        let l = []
        for (let i = 0; i < value.length; i++) {
            let e = value[i]
            let res = deepClone(e)
            l.push(res)
        }
        return l
    } else {
        return value
    }
}

const testDeepClone = () => {
    let a1 = [[1]]
    let b1 = deepClone(a1)
    a1[0].push(200)
    ensure(equals(a1, [[1, 200]]) && equals(b1, [[1]]), 'test deep clone 1')

    let a2 = {
        x: 1,
        y: {},
    }
    let b2 = deepClone(a2)
    b2.y.z = 200
    ensure(equals(a2.y, {}) && b2.y.z === 200, 'test deep clone 2')

    let a3 = [
        {
            x: 1,
            y: 2,
        }
    ]
    let b3 = deepClone(a3)
    a3[0].y = [2]
    ensure(equals(a3[0].y, [2]) && equals(b3[0].y, 2), 'test deep clone 3')

    let a4 = {
        x: 1,
        y: [2],
    }
    let b4 = deepClone(a4)
    b4.y.push(200)
    ensure(equals(a4.y, [2]) && equals(b4.y, [2, 200]), 'test deep clone 4')

    let a5 = 100
    let b5 = deepClone(a5)
    ensure(b5 === 100, 'test deep clone 5')
}

testDeepClone()
