## 开始使用
### 安装
```
npm i v-charts echarts -S
```
### 引入
#### 完整引入
```jsx
import Vue from 'vue'
import VCharts from 'v-charts'
import App from './App.vue'
Vue.use(VCharts)

new Vue({
  el: '#app',
  render: h => h(App)
})
```
#### 按需引入
```jsx
import Vue from 'vue'
import VeLine from 'v-charts/lib/line.common'
import App from './App.vue'
Vue.component(VeLine.name, VeLine)

new Vue({
  el: '#app',
  render: h => h(App)
})
```
### 使用
在vue组件中使用
```jsx
<ve-line :data="chartData" :settings="chartSettings"></ve-line>

data: function () {
      this.chartSettings = {
        metrics: ['下单用户']
      }
    return {
      chartData: {
        columns: ['日期', '销售额'],
        rows: [
          { '日期': '1月1日', '销售额': 123 },
          { '日期': '1月2日', '销售额': 1223 },
          { '日期': '1月3日', '销售额': 2123 },
          { '日期': '1月4日', '销售额': 4123 },
          { '日期': '1月5日', '销售额': 3123 },
          { '日期': '1月6日', '销售额': 7123 }
        ]
      }
    }
  }
```
### 数据
“维度” 指的是数据的属性,“指标” 是量化衡量标准
组件标签中`data`属性数据格式:
```jsx
{
  columns: ['日期', '访问用户', '下单用户'],
  rows: [
    { '日期': '2018-05-22', '访问用户': 32371, '下单用户': 19810 },
    { '日期': '2018-05-23', '访问用户': 12328, '下单用户': 4398 },
    { '日期': '2018-05-24', '访问用户': 92381, '下单用户': 52910 }
  ]
}
```
`columns` 中是维度和指标的集合,默认第一个值为 维度，剩余的值为指标.`rows` 中是数据的集合
组件标签中`settings`属性数据格式:
```jsx
{
  dimension: "item",
  metrics: ['下单用户']
}
```
`dimension` 用于指定维度,`metrics` 用于指定指标
#### 指标别名
在组件`settings`属性中添加属性`labelMap`
```jsx
data () {
      this.chartSettings = {
        labelMap: {
          PV: '访问用户',
          Order: '下单用户'
        }
      }
      return {
        chartData: {
        //使用别名PV,Order代替原来的指标名 访问用户 下单用户,图形展示时依旧显示的是原来的指标名
          columns: ['date', 'PV', 'Order'],
          rows: [
            { 'date': '2018-05-22', 'PV': 32371, 'Order': 19810 },
            { 'date': '2018-05-23', 'PV': 12328, 'Order': 4398 },
            { 'date': '2018-05-24', 'PV': 92381, 'Order': 52910 }
          ]
        }
      }
    }
```
#### 数据格式
每种图表组件对数据格式的设置方式略有不同,在组件`settings`属性中添加对应属性
如折线图使用 yAxisType, 饼图使用 dataType。基本的数据格式有 'normal' （千分位）、'KMB' （kmb 格式）、percent （百分比格式）
```jsx
this.chartSettings = {
  //根据组件data属性中的columns指标设置对应的类型
  dataType: {
    '访问用户': 'KMB',
    '年龄': 'percent',
    '下单用户': 'normal'
  },
  yAxisType: ['0,0a'],
  //使用回调函数
  dataType: function (v) {
    return v + ' ￥'
  }
}
return{
  chartData: {
    columns: ['日期', '访问用户', '下单用户', '年龄'],
    rows: {
      '上海': [
        { '日期': '1/1', '访问用户': 123, '年龄': 3, '下单用户': 1244 },
        { '日期': '1/2', '访问用户': 1223, '年龄': 6, '下单用户': 2344 },
        { '日期': '1/3', '访问用户': 7123, '年龄': 9, '下单用户': 3245 },
        { '日期': '1/4', '访问用户': 4123, '年龄': 12, '下单用户': 4355 },
        { '日期': '1/5', '访问用户': 3123, '年龄': 15, '下单用户': 4564 },
        { '日期': '1/6', '访问用户': 2323, '年龄': 20, '下单用户': 6537 }
      ]}
  }
```










