<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-23 17:15:00
 * @LastEditTime: 2019-09-26 18:04:37
 * @LastEditors: Please set LastEditors
 -->
## 样式定义的方法

- 通过`<link/>`元素包含外部样式表
- 使用`<style/>`元素第一嵌入式样式
- 使用style属性定义特定元素样式

## 浏览器如何解析CSS选择器

CSS选择器的解析是从右向左解析的。

> 两种匹配规则的性能差别很大，是因为从右向左的匹配在第一步就筛选掉了大量的不符合条件的最右节点（叶子节点），而从左向右的匹配规则的性能都浪费在了失败的查找上面。

## margin及外边距折叠

顶部和底部边距对行内元素无效。

**margin值若为百分比，则相对于containing block的宽度值。**

> 何时使用margin: 需要在border外侧添加空白，空白处不需要背景色

**外边距折叠**：块元素的顶部或底部发生折叠。浮动和绝对定位元素不会发生边距折叠

- 若边距都为正边距，则折叠边距大小为最大边距值。
- 若存在负边距，则折叠边距大小为最大正边距和最小负边距之和。
- 若都为负边距，则折叠边距大小为最小边距值（最负边距值）

产生情况：

- 相邻的兄弟元素，*后者通过清除浮动消除边距折叠*
- 父元素和第一个或最后一个子元素
  - 没有border、padding、内联部分、块级内容将父元素margin-top和第一个子元素margin-top分开
  - 没有间隙将父元素margin-top和第一个子元素margin-top分开
  - 没有border、padding、内联内容、height、min-height、max-height将父元素margin-bottom和最后一个子元素margin-bottom分开
- 空的块元素： 如果没有border、padding、内联内容、height、min-height将其自身的margin-top和margin-bottom分开

## padding

元素的填充区域是其内容与其边框之间的空间。padding值若为百分比，则相对于containing block的宽度值

> 何时使用padding：需要在border内侧添加空白,空白处需要背景颜色

## 选择器

- 1.id选择器（ # myid）
- 2.类选择器（.myclassname）
- 3.标签选择器（div, h1, p）
- 4.相邻选择器（h1 + p）
- 5.子选择器（ul > li）
- 6.后代选择器（li a）
- 7.通配符选择器（ * ）
- 8.属性选择器（a[rel = "external"]）
- 9.伪类选择器（a:hover, li:nth-child）

| 类型           | 描述                                                         |
| :------------- | :----------------------------------------------------------- |
| `[foo~="bar"]` | 选择所有带有`foo`属性、且`foo`属性被空白分隔的单词列表中含有单词`bar`的元素。 |
| `[foo*="bar"]` | 选择所有带有`foo`属性、且`foo`属性值中含有子串`bar`的元素。  |
| `[foo^="bar"]` | 选择所有带有`foo`属性、且`foo`属性值以`bar`开头的元素。      |
| `[foo$="bar"]` | 选择所有带有`foo`属性、且`foo`属性值以`bar`结束的元素。      |
| `[foo|="bar"]` | 选择所有带有`foo`属性、且`foo`属性值以`bar`开头或者属性值是`bar`的元素。 |

## display:none和visibility:hidden

`display：none `：不显示对应的元素，在文档布局中不再分配空间（回流+重绘）

`visibility：hidden` ：隐藏对应元素，在文档布局中仍保留原来的空间（重绘）

## display:none和hidden属性



## a链接伪类顺序

`:link/:visited`->`:hover`->`:active`

## 文字超出超出显示省略号

### 单行文本溢出

```css
.text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

### 多行文本溢出

```css
.text {
	display: -webkit-box;
	overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;  /* 设置对齐模式 */
  -webkit-line-clamp: 2;  /* 设置行数 */
}
```



## 可继承的样式和不可继承的样式

- 可继承的样式： font-size font-family color, 
- 不可继承的样式：border padding margin width height ;

## css3新增伪类和伪元素，伪类和伪元素的区别

伪类存在的意义是为了通过选择器找到那些不存在与DOM树中的信息以及不能被常规CSS选择器获取到的信息。

伪元素在DOM树中创建了一些抽象元素，这些抽象元素是不存在于文档语言里的（可以理解为html源码）。

伪类和伪元素的语法不同

## 浮动

浮动元素碰到包含它的边框或者浮动元素的边框停留。

影响：

- 父元素的高度无法被撑开，影响与父元素同级的元素
- 与浮动元素同级的非浮动元素（内联元素）会跟随其后
- 若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构。

清除浮动：

- 父级div定义height
- 最后一个浮动元素后加空div标签 并添加样式`clear:both`。
- 包含浮动元素的父标签添加样式overflow为hidden或auto。
- 父级div定义zoom

## CSS Sprites

将一个页面涉及到的所有图片都包含到一张大图中去，然后利用CSS的 background-image，background- repeat，background-position 的组合进行背景定位。利用CSS Sprites能很好地减少网页的http请求，从而大大的提高页面的性能；CSS Sprites能减少图片的字节。

## 全屏滚动的原理

原理： 类似于轮播，整体的元素一直排列下去，假设有5个需要展示的全屏页面，那么高度是500%，只是展示100%，剩下的可以通过transform进行y轴定位，也可以通过margin-top实现

css属性：`overflow：hidden`；`transition：all 1000ms ease`；

## 响应式设计

响应式网站设计(Responsive Web design)是一个网站能够兼容多个终端，而不是为每一个终端做一个特定的版本。

**原理**：通过媒体查询检测不同的设备屏幕尺寸做处理。

## 视差滚动效果

视差滚动（Parallax Scrolling）通过在网页向下滚动的时候，控制背景的移动速度比前景的移动速度慢来创建出令人惊叹的3D效果。

## 图片格式 **png、jpg、gif** 

- **png**：是便携式网络图片（Portable Network Graphics）是一种无损数据压缩位图文件格式.优点是：压缩比高，色彩好。 大多数地方都可以用。
- **jpg**：是一种针对相片使用的一种失真压缩方法，是一种破坏性的压缩，在色调及颜色平滑变化做的不错。在www上，被用来储存和传输照片的格式。
- **gif**：是一种位图文件格式，以8位色重现真色彩的图像。可以实现动画效果.

## css3新特性

- 新增各种CSS选择器（: not(.input)：所有 class 不是“input”的节点）
- 圆角 （border-radius:8px）
- 多列布局 （multi-column layout）
- 阴影和反射（Shadow\Reflect）
- 文字特效（text-shadow、）
- 文字渲染 （Text-decoration）
- 线性渐变（gradient）
- 旋转（transform）
- 缩放,定位,倾斜,动画,多背景

## transition和animation的区别

- transition 不能自行触发，通过hover等动作，或者结合js进行触发。animation可以自行运行
- transition可控性相对较弱，只能够指定起始和结束的状态，而animation可以定义多个关键帧
- transition不能循环，而animation可设置循环次数

## 定位

属性值：static 、relative、absolute、fixed、sticky

- static: 元素在文档常规流中当前的布局位置。
- relative: 元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置（因此会在此元素未添加定位时所在位置留下空白）,**相对于自身定位**。
- absolute: 不为元素预留空间，**通过指定元素相对于最近的非 static 定位祖先元素的偏移**，来确定元素位置。绝对定位的元素可以设置外边距（margins），且不会与其他边距合并。
- fixed: 不为元素预留空间，而是通过指定元素**相对于屏幕视口（viewport）的位置**来指定元素位置。元素的位置在屏幕滚动时不会改变。
- sticky: 在发生滚动时，会在container中滚动至顶部或指定位置。相当于相对定位和固定定位的混合，元素在跨越特定阈值前为相对定位，之后为固定定位。须指定 left、right、top或bottom 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。IE10和IE11将渲染为相对定位。

## 图片3px解决

三种解决方法：

1. 父元素设置 font-size: 0
2. 图片元素设置 display: block;
3. 图片元素设置 vertical-align: top|middle|bottom

## 弹性盒子flex

在一个元素上使用`display`属性的值：`flex`或`inline-flex`。

属性：

- flex： 简写flex-grow、flex-shrink、flex-basis属性
- flex-direction：定义主轴
- flex-grow: 定义子元素伸长比例，**子元素属性**
- flex-flow: 同时定义flex-direction和flex-wrap属性

```css
flex-flow: <'flex-direction'> <'flex-wrap'>
flex-flow: row nowrap;
```

- flex-basis：子元素的基础大小。
- flex-shrink：定义子元素收缩比例，**子元素属性**
- flex-wrap：超出容器大小是否允许换行。
- justify-content： 子元素在父元素主轴的对齐方式，**父元素属性**
- justify-items: 统一设置直接子元素的justify-self属性，**父元素属性**
- justify-self: 子元素相对于自身容器范围在主轴上的对齐方式，**子元素属性**
- align-content: 子元素在父元素侧轴方向的对齐方式，**父元素属性**
  - center、start、end、flex-end、flex-start 、space-between 、space-around、stretch
- align-items： 统一设置直接子元素的align-self属性，**父元素属性**
- align-self：子元素相对于自身容器范围在侧轴上的对齐方式，**子元素属性**
- order：子元素排列顺序，初始为0,值越小越排在前。可以为负

## 初始化样式

CSS初始化为了解决不同浏览器对有些标签的默认值不同引起的页面显示差异。

## 居中

### 文本居中

- 水平居中： text-align: center
- 竖直居中： line-height和height相等

### 块元素居中

- 水平居中： 

  1. 使用margin: 0 auto
2. 使用定位

```css
  /*块元素宽度已知*/
  {
      position:relative|absolute;
      left: 50%;
      margin-left: -width/2
  }
  
  /* 块元素宽度未知 */
  {
      position:relative|absolute;
      left: 50%;
      transform: translateX(-50%);
  }
```

3. 父元素使用 `display:flex` 和 `justify-content: center`

```css
  {
      display: flex;
      justify-content: center;
  }
```

- 竖直居中

  1. 使用定位

  ```css
  /*块元素高度已知*/
  {
      position:relative|absolute;
      top: 50%;
      margin-left: -height/2
  }
  
  /* 块元素宽度未知 */
  {
      position:relative|absolute;
      top: 50%;
      transform: translateY(-50%);
  }
  ```

  2. 父元素使用 `display:flex ` 

  ```css
  /*使用align-items*/
  {
      display: flex;
      align-items: center
  }
  
  /*使用align-content*/
  {
  	display: flex;
      align-content: center;
      flex-wrap: wrap;
  }
  ```

## 盒模型

- 标准盒子模型：宽度=内容的宽度content
- IE盒子模型：宽度=内容宽度content+border+padding

> 标准盒模型设置宽高时，设置的是内容的宽高，border和padding不包含在内，
> 而IE盒模型设置宽高时，border和padding包含在内



