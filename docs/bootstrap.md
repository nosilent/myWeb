<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-23 17:39:36
 * @LastEditTime: 2019-09-23 17:39:36
 * @LastEditors: your name
 -->
## text

### 文本颜色

.text-xx: （xx： primary蓝   secondary灰   success绿    danger红    warning黄    info浅蓝      light白     dark黑       							muted灰    white白 ）

### 背景颜色

.bg-xx：（xx： primary蓝   secondary灰   success绿    danger红    warning黄    info浅蓝      light白     dark黑       							muted灰    white白 ）

.bg-gradient-xx: 背景渐变（xx： primary蓝   secondary灰   success绿    danger红    warning黄    info浅蓝      							light白     dark黑       muted灰    white白 ）

### 文本对齐

.text-(sm|md|lg|xl)-xx: (xx: justify  left  right  center)

### 文本溢出

.text-nowrap: 防止文本溢出换行

.text-truncate： 文本溢出用省略号替代移除内容

### 文本大小写转换

.text-lowercase: 转换为小写

.text-uppercase: 转换为大写

.text-capitalize: 首字母转换为大写

### 文本粗细和样式

.font-weight-xx: (xx: bold  normal  light)

.font-italic: 斜体

## border

### border颜色

 .border-xx: (xx： primary蓝   secondary灰   success绿    danger红    warning黄    info浅蓝      light白     dark黑       							muted灰    white白 ）

### border有无

- .border：边框都存在
- .border-top: 上边框存在
- .border-left: 左边框存在
- .border-right:右边框存在
- .border-bottom: 下边框存在
- .border-0: 边框**不**存在
- .border-top-0: 上边框**不**存在
- .border-left-0: 左边框**不**存在
- .border-right-0:右边框**不**存在
- .border-bottom-0: 下边**不**存在

### 圆角

- .rounded: 四个角为圆角
- .rounded-top: 底部两个角为圆角
- .rounded-left: 左边两个角为圆角
- .rounded-right: 右边两个角为圆角
- .rounded-bottom: 底部两个角为圆角
- .rounder-circle: 形成一个圆
- .rounder-0: 圆角不存在

## 按钮

button元素或a链接添加 .btn .btn-xx(xx: primary secondary success danger warning info light dark link),若为a链接则添加属性role="button"。

- .btn-outline-xx: 设置按钮边框色（xx: primary secondary success danger warning info light dark）
- .btn-lg|sm: 设置按钮大小
- .btn-block： 将按钮设置为块元素，独占一行100%宽度显示，
- aria-disabled="true"： 禁用按钮，用于a链接
- .btn-group: 按钮组，使第一个按钮左边和最后一个按钮右边出现圆角，用于外层父元素
- .btn-group-lg|sm：统一设置按钮大小
- .btn-group-vertical: 竖直方向按钮组
- .btn-toolbar: 用于带有.btn-group的父元素

## height和width

- w - 25|50|75|100 ： （width：25%|50%|75%|100%）
- h-25|50|75|100 ：（height：25%|50%|75%|100%）
- mw-100: （max-width: 100%）
- mh-100: (max-height: 100%)

## 竖直方向对齐

.align-xx: （xx: baseline top middle bottom text-top text-bottom）

## padding和margin

.{property}{sides}-{size} | .{property}{sides}-{breakpoint}-{size}: 

- property :   
  - m: margin 
  - p: padding
- sides:
  - t:  *-top
  - b: *-bottom
  - l: *-left
  - r: *-right
  - x: *-right 和 *-left
  - y: *-top 和 *-bottom
- size: 0-5|auto
- breakpoint: `sm`, `md`, `lg`, `xl`

## display属性

.d-xx:  ( xx:  none  inline   inline-block   block  table  table-cell   table-row   flex   inline-flex )

.d-xx1-xx2: (xx1:  sm  md   lg   xl ) 

​					( xx2:  none  inline   inline-block   block  table  table-cell   table-row   flex   inline-flex )

## badge 徽章

同时添加 .badge  .badge-xx ( xx:  secondary  primary  light  success  danger  warning  info  dark)

.badge-pill： 添加圆角

## float

.float-xx: (xx: right left none)

.float-xx1-xx:    ( xx1: sm  md   lg   xl  )   ,    ( xx: right    left    none )

## flex布局

父元素使用.d-flex

- .flex-row:  `flex-direction: row;`
- .flex-row-reverse：`flex-direction: row-reverse;`
- .flex-column: `flex-direction: column;`
- .flex-column-reverse: `flex-direction: column-reverse;`
- .justify-content-xx1-xx:   (xx1: sm md lg xl)，  ( xx：start end center between around)
- .align-items-xx1-xx：(xx1: sm md lg xl)   （xx：start   end  center  baseline  stretch）
- .align-self-xx1-xx：(xx1: sm md lg xl)   （xx：start   end  center  baseline  stretch）
- .flex-xx-wrap|nowrap|wrap-reverse: (xx: sm md lg xl) 
- .order-xx-yy: （xx：sm md lg xl） (yy：0-12)越小越在前
- .align-content-xx-yy：（xx：sm md lg xl）   （yy：start    end   center   around  stretch）子元素产生换行才有效果，若只有一行则没有效果

## 定位

- .position-xx: (xx：static  relative  absolute   fixed   sticky)
- .fixed-top|bottom：固定定位在视口顶部|顶部
- .sticky-top：滚动后固定在视口顶部

## 表格

- .table: 用于table元素
- .table-striped： 表格各行变色， 用于table元素
- .table-bordered： 添加表格表框，用于table元素
- .table-borderless:  清除所有边框，用于table元素
- .table-hover：鼠标移入过渡效果，用于table元素
- .table-sm: 减少了表格中td的上下padding，用于table元素
- .table-dark: 表格背景为黑色，用于table元素
- .table-xx:  ( xx : active primary secondary success danger warning info light dark) ,用于tr或td
- .table-responsive{-sm|-md|-lg|-xl}: 超出宽度范围，表格水平方向出现滚动条，用于table元素
- .thead-light | dark： 表头背景为黑色或白色，用于thead元素

## 表单

- input内容和label内容水平排列：需要使用栅格布局(如.col-2、.col-10)

- .form-control-lg|sm：改变Input框大小

- .col-form-label-lg|sm：改变label内容大小

- 单选和多选：父元素添加.form-check，input添加.form-check-input，label添加.form-check-label

- 自适应宽度：栅格布局，父元素添加.row或.form-row，子元素添加.col-auto

- 隐藏label内容：label元素添加.sr-only

- 表单帮助信息：元素添加.form-text 和.text-muted，一般用small标签。

- 表单验证样式：在验证元素上添加.invalid或.valid。

- 表单验证提示信息样式： 1.在提示信息元素添加.valid-feedback或.invalid-feedback  

  ​											2.在提示元素上添加.valid-tooltip或.invalid-tooltip

- 自定义checkbox|radio：

  1. 父元素添加.custom-control 和.custom-checkbox|.custom-radio

  2. input元素添加.custom-control-input，label元素添加.custom-control-label
  
  3. .custom-control-inline:一行显示

- 自定义下拉select：在select元素上添加.custom-select，.custom-select-lg|sm用于改变大小

- 自定义inputfile: 在父元素上添加.custom-file,input元素上添加.custom-file-input,label上添加.custom-file-label

## 列表

父元素添加`.list-group` 子元素添加` .list-group-item `  

- .active ：当前激活元素样式
- ` .list-group-item-action` : 列表点击或鼠标移入过度样式
- `.list-group-flush`：移除列表父元素外围border和border-radius
- 列表样式：.list-group-item-xx  { xx：primary secondary  success  danger  warning  info light light dark }

ul，ol，li列表：

- .list-unstyled: 去除li前小点，list-style:none
- .list-inline:父元素使用
  - list-inline-item：子元素使用，内容将横向显示

## 轮播图

最外层父元素添加.carousel  .slide ,内容容器添加 .carousel-inner,单个内容添加.carousel-item,

*首个显示添加.active，不然轮播没效果

*前后按钮元素添加`.carousel-control-prev|next` 样式和属性`data-slide="prev|next"`，若为button则添加属性`data-target="#带有.carousel的元素的id"`,若为a链接则`href="#带有.carousel的元素的id"`，**没有data-target或href则无前后切换效果**

*下方小原点父元素添加`.carousel-indicators`；子元素添加属性`data-target="#带有.carousel的元素的id"`（没有无点击效果）和`data-slide-to=“关联图片索引（从0开始）”`，首个活动小点添加.active（所有子元素都没有则无点击效果）

- .carousel-control-prev|next : 前后控制按钮样式，用于带有.carousel的子元素
- .carousel-control-prev|next-icon : 前后控制按钮图标样式
- data-slide="prev|next"：用于带有.carousel-control-prev|next的元素，没有则无前后切换效果
- .carousel-indicators : 轮播图下方控制点，用于带有.carousel的子元素
- .carousel-caption： 当前轮播图内容信息,用于带有.carousel-item元素的子元素

## modal 弹出框

最外层父元素添加.modal 父元素添加.modal-dialog 子元素添加.modal-content

点击按钮添加属性data-toggle="modal"  和data-target="#最外层父元素id"

- .modal-header > .modal-title
- .modal-body
- .modal-footer
- .modal-dialog-centered: 居中，添加到带有.modal-dialog的元素中
- .bd-example-modal-xx：弹出框的大小，xx: lg 、sm
- .fade：内容出场滚动效果，添加到带有.modal的元素中

## 面包屑路径显示

最外层使用nav元素，并添加 属性aria-label="breadcrumb"，

内层元素添加 .breadcrumb, 每个子元素添加.breadcrumb-item ，最后一个子元素添加属性aria-current="page"

## 下列菜单

最外层父元素添加.dropdown（可有可无） ,

菜单内容父元素添加.dropdown-menu，单个内容添加.dropdown-item，

触发按钮添加.dropdown-toggle（三角图标，可有可无）和属性data-toggle="dropdown"

- .dropdown-divider：内容分割线
- .dropup|.dropright|.dropleft: 三角图标向上|右|左显示
- .dropdown-menu-right：内容右侧与按钮右侧对齐，添加到带有.dropdown-menu元素中
- .dropdown-header：内容头部，与.dropdown-item并列使用
- .active: 当前激活菜单
- .disabled：禁用菜单

## 鼠标移入提示信息

若为按钮元素添加属性data-toggle="tooltip" 和data-placement="top|bottom|left|right"(提示信息显示位置)

若为关联显示,则关联按钮添加属性data-toggle="tooltip" ,关联内容父元素添加.tooltip,子元素添加.tooltip-inner

> 必须添加 Popper.js在bootstrap.js之前，并使用  **$**('[data-toggle="tooltip"]').**tooltip**()

## 导航

父元素添加.nav 子元素添加.nav-item或.nav-link

- .nav-tabs: 选项卡， 添加到带有.nav的元素中
- .nav-pills：与.nav-tabs类似，删除了活动元素的border, 添加到带有.nav的元素中
- .nav-fill: 子元素等宽并完全填充父元素宽度（子元素上必须有.nav-item否则该子元素无效果），并不能保证完全等宽，添加到带有.nav的元素中
- .nav-justified:与.nav-fill类似，能保证子元素完全等宽（子元素上必须有.nav-item否则该子元素无效果）
- 竖向导航需要添加.flex-column到带有.nav的元素中

## 导航条

最外层父元素添加.navbar

- .navbar-expand{-sm|-md|-lg|-xl}:折叠内容默认展开，对外层复原使用
- .navbar-brand：导航名称
- .navbar-nav ： 导航内容，子元素添加.nav-item或.nav-link
- .navbar-toggler：用于折叠按钮,在带有该样式的按钮中添加`data-toggle="collapse"`和`target="#折叠内容id"`（若是a链接则添加href = "#折叠内容id"）
- .navbar-toggler-icon：折叠按钮图标

```html
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" >
  <span class="navbar-toggler-icon"></span>
</button>
```

- .navbar-text：调整水平间距和垂直居中文本
- .collapse .navbar-collapse：折叠内容，同时使用。

## 折叠

在触发元素上添加data-toggle="collapse"，若为按钮则添加data-target="#折叠内容id"，若为a链接则添加href = "#折叠内容id"

- .collapse ： 折叠内容
- .collapsing：过度效果
- .collapse .show：显示折叠内容

## 卡片

父元素添加.card

- .card-img-top: 卡片顶部图片
- .card-img-bottom：卡片底部图片
- .card-img-overlay:将.card-body替换成此样式，图片元素使用.card-img，可将图片作为内容的背景
- .card-header:卡片头部
  - 与选项卡结合使用时:
    - .card-header-tabs: 减少选项卡底部边距
    - .card-header-pills: 减少选项卡左右边距
- .card-body：内容部分
- .card-title: 内容标题，用于标题元素
- .card-subtitle：内容子标题，用于标题元素
- .card-text: 内容信息
- .card-link： 用于a链接
- .card-footer
- .card-group：将多个开片放一起，使用了display:flex；
- .card-deck：将多个开片放一起,卡片间有间距，开片组超过宽度将在下一行显示
- .card-columns: 将多个开片放一起,卡片等宽, 瀑布流效果显示

## 其他

### 图片

- .img-fluid： `max-width: 100%;` and `height: auto;` 
- .img-thumbnail：图片四周有1px圆角边框

### figure 

figure元素添加.figure,子元素Img添加.figure-img,子元素figcaption 添加.figure-caption

### 关闭按钮图标

按钮元素添加.close样式和aria-label="Close"（可无）属性,子元素（可无）添加属性aria-hidden="true"（可无），内容为`&times;`（必须）

```jsx
<button type="button" class="close" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
```

### 屏幕阅读器

- .sr-only：在非屏幕阅读器下，带有该样式的元素将会隐藏
- .sr-only-focusable：在聚焦时显示