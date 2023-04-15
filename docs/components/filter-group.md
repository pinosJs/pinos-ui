---
outline: deep
---

# filter-group

## 介绍

该组件常用于一些筛选条件。可以配合不同的UI组件库，采取配置的形式进行渲染如： select， date-picker 等。并转换出用户想要的格式

## 背景

在我们开发一个后台管理系统的时候，会遇到许多对table列表进行过滤或条件筛选的场景。通常来说，我们往往需要再template中分别写对应的过滤组件如： input， select， date-picker 等，并且还要搜集每个组件的 modelValue，然后组合出一个 object，最后将这个 object 最作为过滤条件传入对应的接口。该组件用配置形式去渲染对应的组件，这样，你只需要维护一个配置项即可。

## 代码示例 (UI库：element-plus)

### select

#### select（基础）

<demo src="./demos/filter-group/element-plus/select/select.vue" ></demo>

#### select（基础-绑定change事件）

<demo src="./demos/filter-group/element-plus/select/event-select.vue" ></demo>

#### select（多选）

<demo src="./demos/filter-group/element-plus/select/multiple-select.vue" ></demo>


#### select（自定义）

<demo src="./demos/filter-group/element-plus/select/custom-select.vue" ></demo>

#### select（分组）

<demo src="./demos/filter-group/element-plus/select/group-select.vue" ></demo>

#### select（远程搜索）

<demo src="./demos/filter-group/element-plus/select/remote-select.vue" ></demo>

### checkbox

::: tip
radio 与 checkbox 配置类似
:::

#### checkbox（基础）

<demo src="./demos/filter-group/element-plus/checkbox/checkbox.vue" ></demo>

#### checkbox（基础-事件绑定）

<demo src="./demos/filter-group/element-plus/checkbox/event-checkbox.vue" ></demo>

#### checkbox（自定义）

<demo src="./demos/filter-group/element-plus/checkbox/custom-checkbox.vue" ></demo>

### auto-complete

#### auto-complete（基础）

<demo src="./demos/filter-group/element-plus/auto-complete/auto-complete.vue" ></demo>

#### auto-complete（自定义）

<demo src="./demos/filter-group/element-plus/auto-complete/custom-auto-complete.vue" ></demo>

### cascader 级联选择器

#### cascader（基础）

<demo src="./demos/filter-group/element-plus/cascader/cascader.vue" ></demo>

#### cascader（多选）

<demo src="./demos/filter-group/element-plus/cascader/multiple-cascader.vue" ></demo>

### date-picker

::: tip
el-time-picker 配置类似
:::

#### date-picker(基础)

<demo src="./demos/filter-group/element-plus/date-picker/basic.vue" ></demo>

#### date-picker(时间范围)

<demo src="./demos/filter-group/element-plus/date-picker/range.vue" ></demo>

#### date-picker(时间范围-设置别名)

<demo src="./demos/filter-group/element-plus/date-picker/alias-range.vue" ></demo>

#### date-picker(自定义)

<demo src="./demos/filter-group/element-plus/date-picker/custom.vue" ></demo>

### input

#### input(基础)

<demo src="./demos/filter-group/element-plus/input/basic.vue" ></demo>

### select-v2

#### select-v2(基础)

<demo src="./demos/filter-group/element-plus/select-v2/basic.vue" ></demo>

#### select-v2(多选)

<demo src="./demos/filter-group/element-plus/select-v2/multiple-select.vue" ></demo>

#### select-v2(分组)

<demo src="./demos/filter-group/element-plus/select-v2/group.vue" ></demo>

#### select-v2(自定义)

<demo src="./demos/filter-group/element-plus/select-v2/custom.vue" ></demo>


## 代码示例 (UI库：naive-ui)

### select

:::tip
树型选择 Tree Select 配置类似
:::

#### select（基础）

<demo src="./demos/filter-group/naive-ui/select/select.vue" ></demo>

#### select（基础-绑定blur事件）

<demo src="./demos/filter-group/naive-ui/select/event-select.vue" ></demo>

#### select（多选）

<demo src="./demos/filter-group/naive-ui/select/multiple-select.vue" ></demo>


#### select（自定义）

<demo src="./demos/filter-group/naive-ui/select/custom-select.vue" ></demo>

#### select（分组）

<demo src="./demos/filter-group/naive-ui/select/group-select.vue" ></demo>

### checkbox

::: tip
radio 与 checkbox 配置类似
:::

#### checkbox（基础）

<demo src="./demos/filter-group/naive-ui/checkbox/checkbox.vue" ></demo>

### auto-complete

#### auto-complete（基础）

<demo src="./demos/filter-group/naive-ui/auto-complete/auto-complete.vue" ></demo>

#### auto-complete（自定义）

<demo src="./demos/filter-group/naive-ui/auto-complete/custom-auto-complete.vue" ></demo>

### cascader 级联选择器

#### cascader（基础）

<demo src="./demos/filter-group/naive-ui/cascader/cascader.vue" ></demo>

#### cascader（多选）

<demo src="./demos/filter-group/naive-ui/cascader/multiple-cascader.vue" ></demo>

### date-picker

::: tip
time-picker 配置类似
:::

#### date-picker(基础)

<demo src="./demos/filter-group/naive-ui/date-picker/basic.vue" ></demo>

#### date-picker(时间范围)

<demo src="./demos/filter-group/naive-ui/date-picker/range.vue" ></demo>

#### date-picker(时间范围-设置别名)

<demo src="./demos/filter-group/naive-ui/date-picker/alias-range.vue" ></demo>

### input

#### input(基础)

<demo src="./demos/filter-group/naive-ui/input/basic.vue" ></demo>


## 数据联动

<demo src="./demos/filter-group/associate/index.vue" ></demo>

## 自定义插槽

<demo src="./demos/filter-group/slot/index.vue" ></demo>

## filterGroup 属性

| 属性名    | 说明   | 类型   | 必传   | 默认值  | 是否可以全局配置 |
| ---- | ---- | ------ |  ------- |  ------- | ------- |
| modelValue / v-model | 绑定值   | object   | 是 | - | 否 |
| option | 配置项   | FilterGroupOption[]   | 是 | - | 否 |

### FilterGroupOption 属性

| 属性名    | 说明   | 类型   | 必传   | 默认值  | 是否可以全局配置 |
| ---- | ---- | ------ |  ------- |  ------- | ------- |
| element | 组件名（如果是插槽则传入 'slot'） | string |  是 |  - | 否 |
| bindingArg | v-model的arg(指令的参数) | string |  否 |  modelValue | 否 |
| modelKey | 组件双向绑定的key值 | string |  否 |  - | 否 |
| hidden | 是否隐藏该组件 | boolean |  否 |  - | 否 |
| slotName | 命名插槽的名字（当 element 为 slot 时必传） | string[] |  否 |  - | 否 |
| events | 绑定组件的事件 | object |  否 |  - | 否 |
| props | 绑定组件的props（style样式也可在这里添加） | object 或  (data: any) => object |  否 |  - | 否 |
| renderList | 嵌套组件的渲染数据 | any[] 或 (data: any, index: number) => any[]|  否 |  - | 否 |
| alias | 别名（在时间组件时候可用） | object |  否 |  - | 否 |
| children | 绑定的组件内部含有子组件时可配置 | FilterGroupConfig |  否 |  - | 否 |
