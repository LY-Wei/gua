const log = console.log.bind(console)

const ensure = function(condition, message) {
    if (!condition) {
        log('测试失败', message)
    } else {
        log('测试成功')
    }
}

// isArray 函数用来判断变量 o 是不是数组
// 如果 o 是数组, isArray 返回 true, 否则返回 false
const isArray = function(o) {
    return Array.isArray(o)
}

const arrayEquals = function(a, b) {
    if (a.length !== b.length) {
        return false
    } else {
        for (let i = 0;  i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false
            }
        }
    }
    return true
}

const testArrayEquals = function() {
    ensure(arrayEquals([], []), 'test array equals 1')
    ensure(arrayEquals([1], [1]), 'test array equals 2')
    ensure(arrayEquals([1, 2], [1, 2]), 'test array equals 3')
    ensure(!arrayEquals([1, 2, 3], [1, 3, 2]), 'test array equals 4')
}

const arrayDeepEquals = function(a, b) {
    // 实现 arrayEquals, a 和 b 都是数组, 判断是否相等
    // a 和 b 的元素要么是普通类型, 要么是数组类型, 不会是对象类型

    // 如果 a 和 b 的长度不相等, 直接返回 false
    // 如果 a 和 b 的长度相等, 遍历数组
    // 如果遍历出来的元素是数组类型, 那么递归调用 arrayDeepEquals, 如果返回值是 false, 那么数组不相等
    // 如果遍历出来的元素是普通类型, 直接判断元素是否相等, 如果不相等, 说明两个数组不相等
    // 如果遍历结束后都没有碰到不相等的情况, 说明两个数组是相等的

    // 如果 a 和 b 的长度不相等, 直接返回 false
    if (a.length !== b.length) {
        return false
    } else {
        for (let i = 0; i < a.length; i++) {
            let a1 = a[i]
            let b1 = b[i]
            if (isArray(a1) && isArray(b1)) {
                arrayDeepEquals(a1, b1)
                let res = arrayDeepEquals(a1, b1)
                if (!res) {
                    return false
                }
            } else {
                if (a1 !== b1) {
                    return false
                }
            }
        }
        return true
    }
}

const testArrayDeepEquals = function() {
    let a1 = []
    let b1 = []
    let a2 = [[1]]
    let b2 = [[1]]
    let a3 = [[[1]], [[1]]]
    let b3 = [[[1]], [[1]]]
    let a4 = [[1, 2]]
    let b4 = [[1, 2]]
    let a5 = [[1, 2], [3, 4]]
    let b5 = [[1, 2], [4, 3]]

    ensure(arrayDeepEquals(a1, b1), 'test array deep equals 1')
    ensure(arrayDeepEquals(a2, b2), 'test array deep equals 2')
    ensure(arrayDeepEquals(a3, b3), 'test array deep equals 3')
    ensure(arrayDeepEquals(a4, b4), 'test array deep equals 4')
    ensure(!arrayDeepEquals(a5, b5), 'test array deep equals 5')
}

const __main = function() {
    testArrayEquals()
    testArrayDeepEquals()
}

__main()