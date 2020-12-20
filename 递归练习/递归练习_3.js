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

const testEquals = () => {
    let a1 = 100
    let b1 = 100
    let a2 = 'gua'
    let b2 = 'gua'
    let a3 = {}
    let b3 = {}
    let a4 = []
    let b4 = []
    let a5 = {
        x: [1],
    }
    let b5 = {
        x: [1],
    }
    let a6 = [
        {
            x: 1,
        }
    ]
    let b6 = [
        {
            x: 1,
        }
    ]
    let a7 = {
        x: [1],
        y: {
            z: [1],
        }
    }
    let b7 = {
        x: [1],
        y: {
            z: [1],
        }
    }
    let a8 = {
        x: [1],
        y: {
            z: [1, {
                x1: 10,
            }],
        }
    }
    let b8 = {
        x: [1],
        y: {
            z: [1, {
                x1: 10,
            }],
        }
    }
    let a9 = {
        x: [1],
        y: {
            z: [1, {
                x1: 10,
            }],
        }
    }
    let b9 = {
        x: [1],
        y: {
            z: [1, {
                x1: 20,
            }],
        }
    }
    let a10 = [
        100,
        {
            x: 1,
            y: [200]
        },
        [
            {
                z: 300,
            },
        ]
    ]
    let b10 = [
        100,
        {
            x: 1,
            y: [200]
        },
        [
            {
                z: 300,
            },
        ]
    ]

    ensure(equals(a1, b1), 'test equals 1')
    ensure(equals(a2, b2), 'test equals 2')
    ensure(equals(a3, b3), 'test equals 3')
    ensure(equals(a4, b4), 'test equals 4')
    ensure(equals(a5, b5), 'test equals 5')
    ensure(equals(a6, b6), 'test equals 6')
    ensure(equals(a7, b7), 'test equals 7')
    ensure(equals(a8, b8), 'test equals 8')
    ensure(!equals(a9, b9), 'test equals 9')
    ensure(equals(a10, b10), 'test equals 10')
}

testEquals()
