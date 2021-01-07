const log = console.log.bind(console)

const ensure = (condition, message) => {
    if (!condition) {
        log('测试失败', message)
    } else {
        log('测试成功')
    }
}

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

const isArray = o => Array.isArray(o)

const isObject = o => Object.prototype.toString.call(o) === '[object Object]'

// 生成单条数据
const clone = (object) => {
    let o = {}
    if (isObject(object)) {
        o.node_id = object.node_id
        o.parent = object.parent_id
        o.name = object.name
        o.children = []
    }
    return o
}

const handleChildren = (object, arr) => {
    log("object", object)
    let res = []
    for (let i = 0; i < arr.length; i++) {
        let l = arr[i]
        if (isObject(l)) {
            if (object.parent_id === l.node_id) {
                log("l", l)
                let o = clone(l)
                res.push(o)
            }
        }
    }
    return res
}

const tree = (arr) => {
    let o = {}
    if (arr.length === 0) {
        return o
    } else {
        for (let i = 0; i < arr.length; i++) {
            let e = arr[i]
            let node_id = e.node_id
            let children = arr.filter((e) => e.parent_id === node_id)
            e.children = children
        }
        return arr[0]
    }
}

const testTree = () => {
    let l1 = []
    let e1 = {}
    let l2 = [
        {
            node_id: 1,
            parent_id: 0,
            name: 'n1',
        },
    ]
    let e2 = {
        node_id: 1,
        parent: 0,
        name: 'n1',
        children: [],
    }
    let l3 = [
        {
            node_id: 1,
            parent_id: 0,
            name: 'n1',
        },
        {
            node_id: 2,
            parent_id: 1,
            name: 'n2',
        },
    ]
    let e3 = {
        node_id: 1,
        parent: 0,
        name: 'n1',
        children: [
            {
                node_id: 2,
                parent: 1,
                name: 'n2',
                children: [],
            },
        ],
    }
    let l4 = [
        {
            node_id: 1,
            parent_id: 0,
            name: 'n1',
        },
        {
            node_id: 2,
            parent_id: 1,
            name: 'n2',
        },
        {
            node_id: 3,
            parent_id: 1,
            name: 'n3',
        },
    ]
    let e4 = {
        node_id: 1,
        parent: 0,
        name: 'n1',
        children: [
            {
                node_id: 2,
                parent: 1,
                name: 'n2',
                children: [],
            },
            {
                node_id: 3,
                parent: 1,
                name: 'n3',
                children: [],
            },
        ],
    }
    let l5 = [
        {
            node_id: 1,
            parent_id: 0,
            name: 'n1',
        },
        {
            node_id: 2,
            parent_id: 1,
            name: 'n2',
        },
        {
            node_id: 3,
            parent_id: 1,
            name: 'n3',
        },
        {
            node_id: 4,
            parent_id: 2,
            name: 'n4',
        },
    ]
    let e5 = {
        node_id: 1,
        parent: 0,
        name: 'n1',
        children: [
            {
                node_id: 2,
                parent: 1,
                name: 'n2',
                children: [
                    {
                        node_id: 4,
                        parent: 2,
                        name: 'n4',
                        children: [],
                    }
                ],
            },
            {
                node_id: 3,
                parent: 1,
                name: 'n3',
                children: [],
            },
        ],
    }
    let l6 = [
        {
            node_id: 1,
            parent_id: 0,
            name: 'n1',
        },
        {
            node_id: 2,
            parent_id: 1,
            name: 'n2',
        },
        {
            node_id: 3,
            parent_id: 1,
            name: 'n3',
        },
        {
            node_id: 4,
            parent_id: 2,
            name: 'n4',
        },
        {
            node_id: 5,
            parent_id: 3,
            name: 'n5',
        },
    ]
    let e6 = {
        node_id: 1,
        parent: 0,
        name: 'n1',
        children: [
            {
                node_id: 2,
                parent: 1,
                name: 'n2',
                children: [
                    {
                        node_id: 4,
                        parent: 2,
                        name: 'n4',
                        children: [],
                    }
                ],
            },
            {
                node_id: 3,
                parent: 1,
                name: 'n3',
                children: [
                    {
                        node_id: 5,
                        parent: 3,
                        name: 'n5',
                        children: [],
                    }
                ],
            },
        ],
    }
    let l7 = [
        {
            node_id: 1,
            parent_id: 0,
            name: 'n1',
        },
        {
            node_id: 2,
            parent_id: 1,
            name: 'n2',
        },
        {
            node_id: 3,
            parent_id: 1,
            name: 'n3',
        },
        {
            node_id: 4,
            parent_id: 2,
            name: 'n4',
        },
        {
            node_id: 5,
            parent_id: 3,
            name: 'n5',
        },
        {
            node_id: 6,
            parent_id: 4,
            name: 'n6',
        },
    ]
    let e7 = {
        node_id: 1,
        parent: 0,
        name: 'n1',
        children: [
            {
                node_id: 2,
                parent: 1,
                name: 'n2',
                children: [
                    {
                        node_id: 4,
                        parent: 2,
                        name: 'n4',
                        children: [
                            {
                                node_id: 6,
                                parent: 4,
                                name: 'n6',
                                children: [],
                            }
                        ],
                    }
                ],
            },
            {
                node_id: 3,
                parent: 1,
                name: 'n3',
                children: [
                    {
                        node_id: 5,
                        parent: 3,
                        name: 'n5',
                        children: [],
                    }
                ],
            },
        ],
    }

    ensure(equals(tree(l1), e1), 'test tree 1')
    ensure(equals(tree(l2), e2), 'test tree 2')
    ensure(equals(tree(l3), e3), 'test tree 3')
    ensure(equals(tree(l4), e4), 'test tree 4')
    ensure(equals(tree(l5), e5), 'test tree 5')
    ensure(equals(tree(l6), e6), 'test tree 6')
    ensure(equals(tree(l7), e7), 'test tree 7')
}

testTree()
