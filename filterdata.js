const log = console.log.bind(console)
const filters = [12, 21, 22, 42]
const source = [{
    filterId: 1,
    title: '筛选名称一',
    type: 'radio',
    items: [{ id: 11, text: '选项一'}, {id: 12, text: '选项二'}] // 选项一与选项二不可以同时选择
}, {
    filterId: 2,
    title: '筛选名称二',
    type: 'checkbox',  // 默认
    items: [{id: 21, text: '选项一'}, {id: 22, text: '选项二'}] // 选项一与选项二可以同时选择
}, {
    filterId: 3,
    title: '筛选名称三',
    type: 'radio',  // 默认
    items: [{id: 31, text: '选项一'}, {id: 32, text: '选项二'}] // 选项一与选项二不可以同时选择
}, {
    filterId: 4,
    title: '筛选名称四',
    type: 'checkbox',
    items: [{id: 41, text: '选项一'}, {id: 42, text: '选项二'}] // 选项一与选项二可以同时选择
}]
/*得到以下数据结构：
filterData: [{
    filterId: 1,
    value: [ 12 ]
}, {
    filterId: 2,
    value: [ 21, 22 ]
}, {
    filterId: 4,
    value: [ 42 ]
}]
*/

//用 map 和 filter 实现：

let result = []
source.map(s => {
    let o = {}
    o.filterId = s.filterId
    o.value = s.items.filter((item) => filters.includes(item.id))
    if (o.value.length > 0) {
        result.push(o)
    }
})
log(result)