---
outline: deep
---

# v-ellipsis

## 介绍

该指令是一个基于 JS 的省略文本的指令

## 背景

- 对于多行文本省略，我们通常用 css 处理，代码如下：

```css
overflow : hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
```
这样会遇到一个问题，就是在非 webkit 的浏览器不起作用。

- 有用html2canvas去生成海报的同学，肯定会遇到一个问题，就是它不能够转换css的换行。那么这个时候可以用这个指令去解决这个问题

## 代码示例

### 基本用法

<demo src="./demos/ellipsis/basic.vue" ></demo>

### flex 布局

<demo src="./demos/ellipsis/flex.vue" ></demo>

### 自定义配置

<demo src="./demos/ellipsis/custom.vue" ></demo>


### 动态更新内容

<demo src="./demos/ellipsis/dynamic.vue" ></demo>


## v-ellipsis 配置

| 属性名    | 说明   | 类型   | 必传   | 默认值  |
| ---- | ---- | ------ |  ------- |  ------- |
| content | 文本内容（只有在需要动态更新的情况下才需要设置该配置，一般情况下会默认取 el.textContent） | string |  否 |  el.textContent |
| lineClamp | 文本内容最大显示的行数 | number |  否 |  1 |
| fillText | 触发省略后填充的文本的内容 | string |  否 |  ... |
