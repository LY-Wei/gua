const log = console.log.bind(console)

const ensure = function (condition, message) {
    if (!condition) {
        log('测试失败', message)
    } else {
        log('测试成功')
    }
}

const isArray = function(o) {
    return Array.isArray(o)
}

const isObject = function(o) {
    return Object.prototype.toString.call(o) === '[object Object]'
}

const equals = function(a, b) {
    // 1. 如果 a 和 b 都是数组, 就参考 arrayDeepEquals 的方式来判断
    // 2. 如果 a 和 b 都是对象, 就参考 objectDeepEquals 的方式来判断
    // 3. 否则, 直接判断 a 与 b 是否相等
}

const testEquals = function() {
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
        },
    ]
    let b6 = [
        {
            x: 1,
        },
    ]
    let a7 = {
        x: [1],
        y: {
            z: [1],
        },
    }
    let b7 = {
        x: [1],
        y: {
            z: [1],
        },
    }
    let a8 = {
        x: [1],
        y: {
            z: [1, {
                x1: 10,
            }],
        },
    }
    let b8 = {
        x: [1],
        y: {
            z: [1, {
                x1: 10,
            }],
        },
    }
    let a9 = {
        x: [1],
        y: {
            z: [1, {
                x1: 10,
            }],
        },
    }
    let b9 = {
        x: [1],
        y: {
            z: [1, {
                x1: 20,
            }],
        },
    }
    let a10 = [
        100,
        {
            x: 1,
            y: [200],
        },
        [
            {
                z: 300,
            },
        ],
    ]
    let b10 = [
        100,
        {
            x: 1,
            y: [200],
        },
        [
            {
                z: 300,
            },
        ],
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

    log('equals 测试成功')
}

const __main = function() {
    testEquals()
}

__main()
