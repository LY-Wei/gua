const log = console.log.bind(console)

const ensure = function(condition, message) {
    if (!condition) {
        log('测试失败', message)
    } else {
        log('测试成功')
    }
}

const equals = function(array1, array2) {
    // 把递归三实现的 equals 函数复制过来
}

// 看懂下面三个例子，实现这个作业
//
// 1.
// 下面的例子演示了
// 数组直接赋值后  操作原数组  会同样改变新数组
// 因为他们是同一个数组对象
//
// let array = [1, 2, 3]
// let a1 = array
// array.push('ERR')
// log('直接赋值，不 clone', a1)
// // 直接赋值，不 clone [1, 2, 3, 'ERR']

// 2.
// 下面的例子演示了
// 浅拷贝后  原数组增加删除元素  不会改变新数组
// 因为新数组里面的元素都是复制进去的
// let array = [['a'], 1, 2, 3]
// let a2 = []
// for (let i = 0; i < array.length; i += 1) {
//     a2.push(array[i])
// }
// array.push('ERR2')
// log('浅拷贝 clone', a2)
// // 浅拷贝 clone [['a'], 1, 2, 3]

// 3.
// 但是
// 浅拷贝后  操作原数组里面的元素  会改变新数组
// 因为浅拷贝只是简单地复制元素
// 所以浅拷贝后的新数组里存储的和原数组中是同一个对象
// number string 类型的变量无法被修改所以没影响
// array 这类可以修改的对象就能体现出这种变化
//
// let array = [['a'], 1, 2, 3]
// let a2 = []
// for (let i = 0; i < array.length; i += 1) {
//     a2.push(array[i])
// }
// array[0].push('kbc')
// log('浅拷贝 clone', a2)
// // 浅拷贝 clone [['a', 'kbc'], 1, 2, 3]

const arrayClone = function(array) {
    // clone 一个数组并且返回
    // 注意, 要求实现浅拷贝
}

const testArrayClone = function() {
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

    log('arrayClone 测试成功')
}

const arrayDeepClone = function(array) {
    // deepClone 一个数组并且返回
    // 注意, 要求实现深拷贝

    // 新建一个空数组 l
    // 遍历 array 得到元素
    // 如果元素是数组
    //      递归调用 arrayDeepClone 函数并把元素作为参数
    //      将得到的返回值添加到 l 中
    // 如果元素不是空数组
    //      直接把元素添加到 l 中
}

const testArrayDeepClone = function() {
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

    log('arrayDeepClone 测试成功')
}

const __main = function() {
    testArrayClone()
    testArrayDeepClone()
}

__main()
