---
outline: deep
---

# table

## 介绍

以 element-plus 为例，该组件将其 table 组件，pagination组件进行了整合, 并扩展了一些slot，如：cellSlot（单元格插槽）、columnSlot（列插槽）、customHeaderSlot（自定义表头插槽），可以让开发者灵活的定义。除此之外，该组件还提供了一个 deleteRow 实例方法，用于删除某一行并更新 table 数据。

::: tip
使用该组件时，请确保在项目中已经安装并配置好 element-plus 库，当然如果还有其他库也是和 element-plus 有着类似的问题，也可以用该组件让其以配置的方式去渲染，你只需要配置 componentsConfig 即可。
:::

## 解决痛点

在多数的组件库，如：[naiveui](https://www.naiveui.com/zh-CN/light/components/data-table)、[vexipui](https://www.vexipui.com/zh-CN/components/table)、[antdv](https://next.antdv.com/components/table) 中都有 table 组件，且它们都有一个共同点，都是通过配置的方式去渲染的。但是 [element-plus](https://element-plus.org/zh-CN/component/table.html) 中的 table 组件则是通过 el-table-column 组件去渲染每一列，这也就意味着，我们需要写许多次 el-table-column，这样我感觉代码不够简洁和直观。因此封装了这该组件用于解决这个问题。

## 应用

### 自定义表头

<demo src="./demos/table/element-plus/header.vue" title="提示" desc="配置 customHeaderSlot 属性" ></demo>

### 展开行

<demo src="./demos/table/element-plus/expand.vue" ></demo>

### 树形数据与懒加载

<demo src="./demos/table/element-plus/tree.vue" ></demo>

### 合并行或列

<demo src="./demos/table/element-plus/merge.vue" ></demo>

### 多级表头并自定义某个单元格的内容

<demo src="./demos/table/element-plus/multi-header.vue" title="提示" desc="通过配置嵌套 tableColumnProps 和 cellSlot 来实现" ></demo>

### 索引（默认会根据分页自动累加）

<demo src="./demos/table/element-plus/index-type.vue" title="提示" desc="组件内部已经默认配置了相关逻辑，因此用户无需额外配置index属性" ></demo>

### 事件绑定

<demo src="./demos/table/element-plus/event.vue" title="提示" desc="配置tableEvent" ></demo>

### 空插槽

<demo src="./demos/table/element-plus/empty-slot.vue"></demo>

### 空插槽(prop配置的形式)，该配置的应用场景一般配合 config-provide 使用，用于配置全局的空状态

<demo src="./demos/table/element-plus/empty-render.vue" title="提示" desc="empty 插槽的优先级会比该选项高"></demo>

### 删除某一列

当总页数小于等于 1 时，不会调用刷新函数，而是直接删除当前列。当总页数大于 1 且非最后一页时，则会自动请求接口来更新列表

<demo src="./demos/table/element-plus/delete.vue"></demo>

### config-provide 全局配置table组件

<demo src="./demos/table/element-plus/config-provide.vue" title="提示" desc="该用例全局配置了table的border属性和数据为空时的渲染组件"></demo>

### 综合使用

如果配置了 update-methods 属性，在分页触发 size-change 和 current-change 时会自动调用 table 的更新数据方法

<demo src="./demos/table/element-plus/default.vue" title="提示" desc="该事例包含了列插槽和单元格插槽的用例"></demo>


## Table 属性

| 属性名    | 说明   | 类型   | 必传   | 默认值  | 是否可以全局配置 |
| ---- | ---- | ------ |  ------- |  ------- | ------- |
| tableData | table绑定的数据   | any[]   | 是 | [] | 否 |
| tableProps | table组件的props [以 elementPlus 配置为例](https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7) | object | 否 | {} | 是 |
| tableEvents | table组件的事件配置 [以 elementPlus 配置为例](https://element-plus.org/zh-CN/component/table.html#table-%E4%BA%8B%E4%BB%B6)| object | 否 | {} |  否 |
| tableColumnKey | 渲染列表的key默认是数组下标，但是如果存在对列的新增和删除，为了有良好的性能，可以传入一个基于 tableData 的唯一的key值   | string  | 否 |'' | 否 |
| tableColumnProps | table列的props [以 elementPlus 配置为例](https://element-plus.org/zh-CN/component/table.html#table-column-%E5%B1%9E%E6%80%A7)   | TableColumnProps[]   | 是 | [] | 否 |
| showPagination | 是否展示分页   | boolean   | 否 | true | 否 |
| currentPage /  v-model:current-page  | 分页的 currentPage  | number   | 否 | 1 | 否 |
| pageSize /  v-model:page-size | 分页的 pageSize  | number   | 否 | 20 | 是 |
| total  /  v-model:total | 分页的 total  | number   | 否 | 0 | 否 |
| paginationOptions | pagination的props [以 elementPlus 配置为例](https://element-plus.org/zh-CN/component/pagination.html#%E5%B1%9E%E6%80%A7)   | object   | 否 | {} | 是 |
| updateMethods | 分页触发的更新table数据的函数 | function   | 否 | - | 否 |
| emptyRender | 数据为空时的渲染函数， empty 插槽的优先级会比该选项高（即empty插槽会覆盖该选项） | () => VNode[]   | 否 | h('span', '暂无数据') | 是 |
| componentsConfig | 配置 table 组件，tableColumn 组件，pagination 组件的组件名  | object   | 否 | pagination: 'el-pagination', table: 'el-table', tableColumn: 'el-table-column' | 否 | 是 |

### TableColumnProps

该属性在 tableColumn 的 props 配置的基础上扩展了以下几个属性：

| 属性名    | 说明   | 类型   | 必传   | 默认值  |
| ---- | ---- | ------ |  ------- |  ------- |
| cellSlot | 单元格的插槽名   | string   | 否 | - |
| columnSlot | table列的插槽名   | string   | 否 | - |
| customHeaderSlot | 自定义表头的插槽名   | string   | 否 | - |
| tableColumnProps | 嵌套 tableColumn 的配置项（多用于多级表头）  | TableColumnProps[]   | 否 | - |

## Table 插槽

| 插槽名    | 说明   |
| ---- | ---- |
| empty | 当数据为空时自定义的内容 |


## Table 组件实例方法

| 方法名    | 说明   |  参数 | 默认值 | 返回值 |
| ---- | ---- |  ---- | ---- |  ---- |
| deleteRow | 删除某一行 | list: MaybeRef<T[]>, index: number | - | void |
