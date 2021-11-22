## 状态组件

### InheriteWidget

可以将数据不经过中间组件传递到需要使用的组件

### Model

可以将数据不经过中间组件传递到需要使用的组件

## 布局组件

### 线性布局

 指沿水平或垂直方向排布子组件 

#### Row

将children中的内容水平展示，构造函数实现：

```dart
Row({
  Key key,
  MainAxisAlignment mainAxisAlignment = MainAxisAlignment.start, //子组件在Row所占用的水平空间内对齐方式
  MainAxisSize mainAxisSize = MainAxisSize.max, //表示Row在主轴(水平)方向占用的空间,类似块和行类块宽度显示方式
  CrossAxisAlignment crossAxisAlignment = CrossAxisAlignment.center, //子组件在纵轴方向的对齐方式
  TextDirection textDirection,  //水平方向子组件的布局顺序
  VerticalDirection verticalDirection = VerticalDirection.down, //表示Row纵轴（垂直）的对齐方向
  TextBaseline textBaseline,
  List<Widget> children = const <Widget>[], //子组件数组
}) : super(
  children: children,
  key: key,
  direction: Axis.horizontal,
  mainAxisAlignment: mainAxisAlignment,
  mainAxisSize: mainAxisSize,
  crossAxisAlignment: crossAxisAlignment,
  textDirection: textDirection,
  verticalDirection: verticalDirection,
  textBaseline: textBaseline,
);
```

```dart
Row(
  mainAxisAlignment: MainAxisAlignment.end,
  textDirection: TextDirection.rtl,
  verticalDirection: VerticalDirection.up,
  children: <Widget>[
    Text(" hello world "),
    Text(" I am Jack "),
  ],
)
```

#### Column

 在垂直方向排列其子组件 

```dart
Column({
  Key key,
  MainAxisAlignment mainAxisAlignment = MainAxisAlignment.start,
  MainAxisSize mainAxisSize = MainAxisSize.max,
  CrossAxisAlignment crossAxisAlignment = CrossAxisAlignment.center,
  TextDirection textDirection,
  VerticalDirection verticalDirection = VerticalDirection.down,
  TextBaseline textBaseline,
  List<Widget> children = const <Widget>[],
}) : super(
  children: children,
  key: key,
  direction: Axis.vertical,
  mainAxisAlignment: mainAxisAlignment,
  mainAxisSize: mainAxisSize,
  crossAxisAlignment: crossAxisAlignment,
  textDirection: textDirection,
  verticalDirection: verticalDirection,
  textBaseline: textBaseline,
);
```

### 流式布局

 在`Row`和`Colum`中，如果子`widget`超出屏幕范围，则会报溢出错误。使用流式布局，溢出部分则会自动折行 

#### Wrap

```dart
Wrap({
  Key key,
  this.direction = Axis.horizontal, 
  this.alignment = WrapAlignment.start,
  this.spacing = 0.0, //主轴方向子widget的间距
  this.runAlignment = WrapAlignment.start,  //纵轴方向的对齐方式
  this.runSpacing = 0.0, //纵轴方向的间距
  this.crossAxisAlignment = WrapCrossAlignment.start,
  this.textDirection,
  this.verticalDirection = VerticalDirection.down,
  List<Widget> children = const <Widget>[],
}) : super(key: key, children: children);
```

#### Flow

```dart
Flow({
  Key key,
  @required this.delegate,
  List<Widget> children = const <Widget>[],
}) : assert(delegate != null),
     super(key: key, children: RepaintBoundary.wrapAll(children));

Flow.unwrapped({
  Key key,
  @required this.delegate,
  List<Widget> children = const <Widget>[],
}) : assert(delegate != null),
     super(key: key, children: children);
```

### 弹性布局Flex

 弹性布局允许子组件按照一定比例来分配父容器空间 , `Flex`组件可以沿着水平或垂直方向排列子组件 ,

 `Row`和`Column`都继承自`Flex` 

#### flex

```dart
Flex({
  Key key,
  @required this.direction,
  this.mainAxisAlignment = MainAxisAlignment.start,
  this.mainAxisSize = MainAxisSize.max,
  this.crossAxisAlignment = CrossAxisAlignment.center,
  this.textDirection,
  this.verticalDirection = VerticalDirection.down,
  this.textBaseline,
  List<Widget> children = const <Widget>[],
}) : assert(direction != null),
     assert(mainAxisAlignment != null),
     assert(mainAxisSize != null),
     assert(crossAxisAlignment != null),
     assert(verticalDirection != null),
     assert(crossAxisAlignment != CrossAxisAlignment.baseline || textBaseline != null),
     super(key: key, children: children);
```

#### Expanded

 可以按比例“扩伸” `Row`、`Column`和`Flex`子组件所占用的空间 

```dart
const Expanded({
  Key key,
  int flex = 1,
  @required Widget child,
}) : super(key: key, flex: flex, fit: FlexFit.tight, child: child);
```

```dart
Flex(
  direction: Axis.horizontal,
  children: <Widget>[
    Expanded(
      flex: 1,
      child: Container(
        height: 30.0,
        color: Colors.red,
      ),
    ),
    Expanded(
      flex: 2,
      child: Container(
        height: 30.0,
        color: Colors.green,
      ),
    ),
  ],
)
```

### 层叠布局

层叠布局和Web中的绝对定位是相似的，子组件可以根据距父容器四个角的位置来确定自身的位置 , 

`Stack`允许子组件堆叠，而`Positioned`用于根据`Stack`的四个角来确定子组件的位置。 

#### Stack

```dart
Stack({
  Key key,
  this.alignment = AlignmentDirectional.topStart, //统一设置子元素对齐方式，可以被子元素设置覆盖
  this.textDirection,
  this.fit = StackFit.loose,
  this.overflow = Overflow.clip,
  List<Widget> children = const <Widget>[],
}) : super(key: key, children: children);
```

#### Positioned

```dart
const Positioned({
  Key key,
  this.left,
  this.top,
  this.right,
  this.bottom,
  this.width,
  this.height,
  @required Widget child,
}) : assert(left == null || right == null || width == null),
     assert(top == null || bottom == null || height == null),
     super(key: key, child: child);

Positioned.directional({
Key key,
@required TextDirection textDirection,
double start,
double top,
double end,
double bottom,
double width,
double height,
@required Widget child
}){
  assert(textDirection != null);
  double left;
  double right;
  switch (textDirection) {
    case TextDirection.rtl:
      left = end;
      right = start;
      break;
    case TextDirection.ltr:
      left = start;
      right = end;
      break;
  }
  return Positioned(
    key: key,
    left: left,
    top: top,
    right: right,
    bottom: bottom,
    width: width,
    height: height,
    child: child,
  );
}

const Positioned.fill({
  Key key,
  this.left = 0.0,
  this.top = 0.0,
  this.right = 0.0,
  this.bottom = 0.0,
  @required Widget child,
}) : width = null,
     height = null,
     super(key: key, child: child);

Positioned.fromRect({
  Key key,
  Rect rect,
  @required Widget child,
}) : left = rect.left,
     top = rect.top,
     width = rect.width,
     height = rect.height,
     right = null,
     bottom = null,
     super(key: key, child: child);

Positioned.fromRelativeRect({
  Key key,
  RelativeRect rect,
  @required Widget child,
}) : left = rect.left,
     top = rect.top,
     right = rect.right,
     bottom = rect.bottom,
     width = null,
     height = null,
     super(key: key, child: child);
```

### 对齐与定位

#### Align

 `Align` 组件可以调整子组件的位置，并且可以根据子组件的宽高来确定自身的的宽高 

```dart
const Align({
  Key key,
  this.alignment = Alignment.center, //表示子组件在父组件中的起始位置
  this.widthFactor,   //宽度缩放因子
  this.heightFactor,  //高度缩放因子
  Widget child,
}) : assert(alignment != null),
     assert(widthFactor == null || widthFactor >= 0.0),
     assert(heightFactor == null || heightFactor >= 0.0),
     super(key: key, child: child);
```

##### Alignment

```dart
const Alignment(
double x,
double y
)
```

 定目标位置,Alignment(double x, double y)表示点(x * w/2 + w/2, y * h/2 + h/2)，w、h为目标的宽高 

| 属性 | 范围 | 说明                                                         |
| ---- | ---- | ------------------------------------------------------------ |
| x    | -1~1 | 0为中心，-1为左边界，1为右边界，若值超出边界值则按边界值计算 |
| y    | -1~1 | 0为中心，-1为上边界，1为下边界，若值超出边界值则按边界值计算 |

| 常量属性     | 使用                   | 说明                                      |
| ------------ | ---------------------- | ----------------------------------------- |
| bottomCenter | Alignment.bottomCenter | 底部水平居中，相当于Alignment(0.0, 1.0)   |
| bottomLeft   | Alignment.bottomLeft   | 左下角，相当于Alignment(-1.0,-1.0)        |
| bottomRight  | Alignment.bottomRight  | 有下角，相当于Alignment(1.0,-1.0)         |
| center       | Alignment.center       | 水平和垂直居中，相当于Alignment(0.0,0.0)  |
| centerLeft   | Alignment.centerLeft   | 左边界垂直居中，相当于Alignment(-1.0,0.0) |
| centerRight  | Alignment.centerRight  | 右边界垂直居中，相当于Alignment(1.0,0.0)  |
| topCenter    | Alignment.topCenter    | 顶部居中，相当于Alignment(0.0,-1.0)       |
| topLeft      | Alignment.topLeft      | 左上角，相当于Alignment(0.0,-1.0)         |
| topRight     | Alignment.topRight     | 右上角，相当于Alignment(0.0,1.0)          |

#### Center

```dart
const Center({ Key key, 
              double widthFactor, 
              double heightFactor,
              Widget child 
     }): super(key: key,
          widthFactor: widthFactor,
          heightFactor: heightFactor, 
          child: child);
```

## 容器组件

### Scaffold

 `Scaffold`是一个路由页的骨架 

```dart
const Scaffold({
Key key,
PreferredSizeWidget appBar,  //顶部应用栏
Widget body, //内容主体
Widget floatingActionButton,  //浮在主体上方右下角的按钮显示
FloatingActionButtonLocation floatingActionButtonLocation, //右下角的浮动按钮显示位置
FloatingActionButtonAnimator floatingActionButtonAnimator, //将右下角的浮动按钮移动到新的位置
List<Widget> persistentFooterButtons,  //显示在Scaffold底部的一组按钮
Widget drawer,  //显示在Scaffold侧面的滑动块（可拉出）
Widget endDrawer, //显示在Scaffold侧面的滑动块
Widget bottomNavigationBar, //底部导航
Widget bottomSheet,  //底部固定展示表
Color backgroundColor, 
bool resizeToAvoidBottomPadding,
bool resizeToAvoidBottomInset,
bool primary: true,  //当前Scaffold是否在屏幕顶部显示
DragStartBehavior drawerDragStartBehavior: DragStartBehavior.start,
bool extendBody: false,
Color drawerScrimColor, //外部遮罩层颜色
double drawerEdgeDragWidth //滑动块打开的水平宽度
})
```

#### AppBar

```dart
AppBar({
Key key,
Widget leading, //标题之前显示的小部件
bool automaticallyImplyLeading: true,
Widget title,
List<Widget> actions, //在标题后显示的其他小部件
Widget flexibleSpace,
PreferredSizeWidget bottom, //appbar底部小部件
double elevation, //阴影
ShapeBorder shape,
Color backgroundColor,
Brightness brightness,  //appbar亮度
IconThemeData iconTheme,
IconThemeData actionsIconTheme, //在标题后显示的其他小部件主题（color,opacity,size）
TextTheme textTheme,
bool primary: true,  //该appbar是否显示在屏幕顶部
bool centerTitle, //标题是否据中
double titleSpacing: NavigationToolbar.kMiddleSpacing,
double toolbarOpacity: 1.0, //appbar透明度
double bottomOpacity: 1.0
})
```

##### TabBar 、TabBarView

`TabBar` 通常创建为`AppBar`的`AppBar.bottom`部分

`TabBarView`用于创建一个tab切换栏与对应内容联动，用于`body`部分，而`TabBar`创建的是静态的需要其他操作才能与对应内容联动。

```dart
const TabBar({
Key key,
@required List<Widget> tabs,  //可以使用Tab
TabController controller,
bool isScrollable: false,
Color indicatorColor,
double indicatorWeight: 2.0,
EdgeInsetsGeometry indicatorPadding: EdgeInsets.zero,
Decoration indicator,
TabBarIndicatorSize indicatorSize,
Color labelColor,
TextStyle labelStyle,
EdgeInsetsGeometry labelPadding,
Color unselectedLabelColor,
TextStyle unselectedLabelStyle,
DragStartBehavior dragStartBehavior: DragStartBehavior.start,
ValueChanged<int> onTap
})

const TabBarView({
Key key,
@required List<Widget> children,
TabController controller,
ScrollPhysics physics,
DragStartBehavior dragStartBehavior: DragStartBehavior.start
})
```

###### TabController

```dart
TabController({
int initialIndex: 0,
@required int length,
@required TickerProvider vsync
})
```



##### IconThemeData

```dart
const IconThemeData({
Color color,
double opacity,
double size
})
```

##### IconTheme

```dart
const IconTheme({
Key key,
@required IconThemeData data,
@required Widget child
})
```

##### Color

```dart
const Color(
int value  //Construct a color from the lower 32 bits of an int.
)
  
const Color.fromARGB(
int a,  //0 being transparent and 255 being fully opaque
int r,int g,int b //from 0 to 255
)  
  
const Color.fromRGBO(
int r,int g,int b, //from 0 to 255
double opacity  //0.0 being transparent and 1.0 being fully opaque.
)
```

 `Color(0xFFFF9000)` (`FF` for the alpha, `FF` for the red, `90` for the green, and `00` for the blue). 

| 静态方法                                                     | 说明                                       |
| ------------------------------------------------------------ | ------------------------------------------ |
| lerp ([Color](https://api.flutter.dev/flutter/dart-ui/Color-class.html) a,[Color](https://api.flutter.dev/flutter/dart-ui/Color-class.html) b,[double](https://api.flutter.dev/flutter/dart-core/double-class.html) t) | 在两种颜色间线性插值                       |
| alphaBlend(Color foreground, Color background)               | 将前景色透明在背景色上面，返回结合后的颜色 |



#### Drawer

```dart
const Drawer({
Key key,
double elevation: 16.0,
Widget child,
String semanticLabel
})
```

#### FloatingActionButtonLocation

| 常量         | 使用                                      | 说明                             |
| ------------ | ----------------------------------------- | -------------------------------- |
| centerDocked | FloatingActionButtonLocation.centerDocked | 浮动在底部导航栏上方中心         |
| centerFloat  |                                           | 浮动在屏幕底部中心               |
| endDocked    |                                           | 浮动在底部导航栏上方右对齐       |
| endFloat     |                                           | 浮动在屏幕底部右对齐             |
| endTop       |                                           | 浮动在底部应用栏和body之间右对齐 |
| miniStartTop | 小型按钮                                  | 浮动在底部应用栏和body之间左对齐 |
| startTop     |                                           | 浮动在底部应用栏和body之间左对齐 |

#### FloatingActionButton

```dart
const FloatingActionButton({
Key key,
Widget child,
String tooltip,
Color foregroundColor,
Color backgroundColor,
Color focusColor,
Color hoverColor,
Color splashColor,
Object heroTag: const _DefaultHeroTag(),
double elevation,
double focusElevation,
double hoverElevation,
double highlightElevation,
double disabledElevation,
@required VoidCallback onPressed,
bool mini: false,
ShapeBorder shape,
Clip clipBehavior: Clip.none,
FocusNode focusNode,
bool autofocus: false,
MaterialTapTargetSize materialTapTargetSize,
bool isExtended: false
})
```

#### BottomNavigationBar

```dart
BottomNavigationBar({
Key key,
@required List<BottomNavigationBarItem> items,
ValueChanged<int> onTap,
int currentIndex: 0,  //激活的bar的索引
double elevation: 8.0,
BottomNavigationBarType type,  //显示方式
Color fixedColor,
Color backgroundColor,
double iconSize: 24.0,
Color selectedItemColor,
Color unselectedItemColor,
IconThemeData selectedIconTheme: const IconThemeData(),
IconThemeData unselectedIconTheme: const IconThemeData(),
double selectedFontSize: 14.0,
double unselectedFontSize: 12.0,
TextStyle selectedLabelStyle,
TextStyle unselectedLabelStyle,
bool showSelectedLabels: true,
bool showUnselectedLabels
})

```

#####  BottomAppBar 

 通常与`Scaffold.bottomNavigationBar`一起使用的容器，并且在顶部可以有一个凹口，以便为重叠的`FloatingActionButton`腾出空间 

```dart
const BottomAppBar({
Key key,
Color color,
double elevation,
NotchedShape shape,
Clip clipBehavior: Clip.none,
double notchMargin: 4.0,
Widget child
})
```

##### BottomNavigationBarItem

```dart
const BottomNavigationBarItem({
@required Widget icon,
Widget title,
Widget activeIcon,
Color backgroundColor
})
```

##### BottomNavigationBarType

| 常量     | 使用                                 | 说明                                     |
| -------- | ------------------------------------ | ---------------------------------------- |
| fixed    | BottomNavigationBarType.fixed        | BottomNavigationBarItem具有固定宽度      |
| shifting |                                      | 底部导航栏内容位置和大小点击时有淡入动画 |
| values   | BottomNavigationBarType.values[0\|1] |                                          |

##### icon

```dart
const Icon(
IconData icon, {
Key key,
double size,
Color color,
String semanticLabel,
TextDirection textDirection
})
```

##### IconData

```dart
const IconData(
int codePoint, {
String fontFamily,
String fontPackage,
bool matchTextDirection: false
})
```

#### BottomSheet

```dart
const BottomSheet({
Key key,
AnimationController animationController,
bool enableDrag: true,
Color backgroundColor,
double elevation,
ShapeBorder shape,
@required VoidCallback onClosing,
@required WidgetBuilder builder
})
```

#### 

### Container

`Container `是`DecoratedBox`、`ConstrainedBox`、`Transform`、`Padding`、`Align`等组件组合的一个多功能容器 , 只需通过一个`Container`组件可以实现同时需要装饰、变换、限制的场景 

```dart
Container({
Key key,
AlignmentGeometry alignment,
EdgeInsetsGeometry padding,
Color color,
Decoration decoration, //设置盒子的形状颜色大小，使用BoxDecortion
Decoration foregroundDecoration,
double width,
double height,
BoxConstraints constraints,
EdgeInsetsGeometry margin,
Matrix4 transform,
Widget child
})
```

- 容器的大小可以通过`width`、`height`属性来指定，也可以通过`constraints`来指定；如果它们同时存在时，`width`、`height`优先。实际上Container内部会根据`width`、`height`来生成一个`constraints`。
- `color`和`decoration`是互斥的，如果同时设置它们则会报错！实际上，当指定`color`时，`Container`内会自动创建一个`decoration`。



### 装饰容器DecoratedBox

 `DecoratedBox`可以在其子组件绘制前(或后)绘制一些装饰（Decoration），如背景、边框、渐变等。 

```dart
const DecoratedBox({
Key key,
@required Decoration decoration,
DecorationPosition position: DecorationPosition.background,
Widget child
})
```

#### Decoration

| 方法                             | 使用                  |
| -------------------------------- | --------------------- |
| lerpFrom(Decoration a, double t) | Decoration.lerpFrom() |
| lerpTo(Decoration b, double t)   | Decoration.lerpTo()   |

#### DecorationPosition

| 常量       | 使用                            | 说明                             |
| ---------- | ------------------------------- | -------------------------------- |
| background | DecorationPosition.backgorund   | DecorationPosition(0)            |
| foreground | DecorationPosition.foreground   | DecorationPosition(1)            |
| values     | DecorationPosition.values[0\|1] | 0表示background，1表示foreground |

### 变换

#### Transform

 `Transform`可以在其子组件绘制时对其应用一些矩阵变换来实现一些特效 

```dart
const Transform({
Key key,
@required Matrix4 transform,
Offset origin,
AlignmentGeometry alignment,
bool transformHitTests: true,
Widget child
})
 
Transform.rotate({
  Key key,
  @required double angle,
  this.origin,
  this.alignment = Alignment.center,
  this.transformHitTests = true,
  Widget child,
}) : transform = Matrix4.rotationZ(angle),
     super(key: key, child: child);

Transform.scale({
  Key key,
  @required double scale,
  this.origin,
  this.alignment = Alignment.center,
  this.transformHitTests = true,
  Widget child,
}) : transform = Matrix4.diagonal3Values(scale, scale, 1.0),
     super(key: key, child: child);

Transform.translate({
  Key key,
  @required Offset offset,
  this.transformHitTests = true,
  Widget child,
}) : transform = Matrix4.translationValues(offset.dx, offset.dy, 0.0),
     origin = null,
     alignment = null,
     super(key: key, child: child);
```

##### Matrix4

```dart
//rotationX,y,z 类似，只是将setRotationX改变成了setRotationY,Z
factory Matrix4.rotationX(double radians) => new Matrix4.zero()
  .._m4storage[15] = 1.0
  ..setRotationX(radians);

factory Matrix4.skew(double alpha, double beta) {
  final Matrix4 m = new Matrix4.identity();
  m._m4storage[1] = math.tan(beta);
  m._m4storage[4] = math.tan(alpha);
  return m;
}
//skewX,skewY
factory Matrix4.skewX(double alpha) {
  final Matrix4 m = new Matrix4.identity();
  m._m4storage[4] = math.tan(alpha);
  return m;
}
factory Matrix4.skewY(double beta) {
  final Matrix4 m = new Matrix4.identity();
  m._m4storage[1] = math.tan(beta);
  return m;
}

factory Matrix4.translation(Vector3 translation) => new Matrix4.zero()
  ..setIdentity()
  ..setTranslation(translation);

factory Matrix4.translationValues(double x, double y, double z) =>
    new Matrix4.zero()
      ..setIdentity()
      ..setTranslationRaw(x, y, z);
```

更多构造函数[参考]( https://api.flutter.dev/flutter/vector_math_64/Matrix4-class.html )

#### RotatedBox

 `RotatedBox`的变换是在layout阶段，会影响在子组件的位置和大小 

```dart
const RotatedBox({
Key key,
@required int quarterTurns,
Widget child
})
```



### 尺寸限制类容器

 尺寸限制类容器用于限制容器大小 

#### ConstrainedBox

使用`constraints`对子元素添加约束

```dart
ConstrainedBox({
Key key,
@required BoxConstraints constraints,
Widget child
})
```

##### BoxConstraints

```dart
const BoxConstraints({
double minWidth: 0.0,
double maxWidth: double.infinity,
double minHeight: 0.0,
double maxHeight: double.infinity
})

const BoxConstraints.expand({
  double width,
  double height,
}) : minWidth = width ?? double.infinity,
     maxWidth = width ?? double.infinity,
     minHeight = height ?? double.infinity,
     maxHeight = height ?? double.infinity;  

BoxConstraints.loose(Size size)
  : minWidth = 0.0,
    maxWidth = size.width,
    minHeight = 0.0,
    maxHeight = size.height

BoxConstraints.tight(Size size)
  : minWidth = size.width,
    maxWidth = size.width,
    minHeight = size.height,
    maxHeight = size.height;

const BoxConstraints.tightFor({
  double width,
  double height,
}) : minWidth = width ?? 0.0,
     maxWidth = width ?? double.infinity,
     minHeight = height ?? 0.0,
     maxHeight = height ?? double.infinity;

const BoxConstraints.tightForFinite({
  double width = double.infinity,
  double height = double.infinity,
}) : minWidth = width != double.infinity ? width : 0.0,
     maxWidth = width != double.infinity ? width : double.infinity,
     minHeight = height != double.infinity ? height : 0.0,
     maxHeight = height != double.infinity ? height : double.infinity;
```

##### Size

```dart
const Size(double width, double height) : super(width, height);

Size.copy(Size source) : super(source.width, source.height);

const Size.fromHeight(double height) : super(double.infinity, height);

const Size.fromRadius(double radius) : super(radius * 2.0, radius * 2.0);

const Size.fromWidth(double width) : super(width, double.infinity);

const Size.square(double dimension) : super(dimension, dimension);
```

| 常量     | 用法          | 说明                                          |
| -------- | ------------- | --------------------------------------------- |
| infinite | Size.infinite | 等同于 Size(double.infinity, double.infinity) |
| zero     | Size.zero     | 等同于 Size(0.0，0.0)                         |

#### SizedBox

```dart
const SizedBox({
Key key,
double width,
double height,
Widget child
})

const SizedBox.expand({ Key key, Widget child })
  : width = double.infinity,
    height = double.infinity,
    super(key: key, child: child);

SizedBox.fromSize({ Key key, Widget child, Size size })
  : width = size?.width,
    height = size?.height,
    super(key: key, child: child);

const SizedBox.shrink({ Key key, Widget child })
  : width = 0.0,
    height = 0.0,
    super(key: key, child: child);
```

#### UnconstrainedBox

 `UnconstrainedBox`不会对子组件产生任何限制，它允许其子组件按照其本身大小绘制 

```dart
const UnconstrainedBox({
Key key,
Widget child,
TextDirection textDirection,
AlignmentGeometry alignment: Alignment.center,
Axis constrainedAxis
})
```

####  AspectRatio 

 可以指定子组件的长宽比 

```dart
const AspectRatio({
Key key,
@required double aspectRatio,
Widget child
})
```

#### LimitedBox

 用于指定最大宽高 

```dart
const LimitedBox({
  Key key,
  this.maxWidth = double.infinity,
  this.maxHeight = double.infinity,
  Widget child,
}) : assert(maxWidth != null && maxWidth >= 0.0),
     assert(maxHeight != null && maxHeight >= 0.0),
     super(key: key, child: child);
```

####  FractionallySizedBox

 可以根据父容器宽高的百分比来设置子组件宽高 

```dart
const FractionallySizedBox({
Key key,
AlignmentGeometry alignment: Alignment.center,
double widthFactor,
double heightFactor,
Widget child
})
```

#### OverflowBox 

子元素可以溢出父容器

```dart
const OverflowBox({
Key key,
AlignmentGeometry alignment: Alignment.center,
double minWidth,
double maxWidth,
double minHeight,
double maxHeight,
Widget child
})
```



### 剪裁Clip

 Flutter中提供了一些剪裁函数，用于对组件进行剪裁 

| 剪裁Widget | 作用                                                     |
| ---------- | -------------------------------------------------------- |
| ClipOval   | 子组件为正方形时剪裁为内贴圆形，为矩形时，剪裁为内贴椭圆 |
| ClipRRect  | 将子组件剪裁为圆角矩形                                   |
| ClipRect   | 剪裁子组件到实际占用的矩形大小（溢出部分剪裁）           |

```dart
const ClipOval({
Key key,
CustomClipper<Rect> clipper,
Clip clipBehavior: Clip.antiAlias,
Widget child
})
 
const ClipPath({
Key key,
CustomClipper<Path> clipper,
Clip clipBehavior: Clip.antiAlias,
Widget child
})

const ClipRect({
Key key,
CustomClipper<Rect> clipper,
Clip clipBehavior: Clip.hardEdge,
Widget child
})
```

```dart
 Column(
        children: <Widget>[
          avatar, //不剪裁
          ClipOval(child: avatar), //剪裁为圆形
          ClipRRect( //剪裁为圆角矩形
            borderRadius: BorderRadius.circular(5.0),
            child: avatar,
)
```



### 填充Padding

```dart
const Padding({
Key key,
@required EdgeInsetsGeometry padding,
Widget child
})
```

#### EdgeInsetsGeometry

 `EdgeInsetsGeometry`是一个抽象类，开发中一般都使用`EdgeInsets`类，它是`EdgeInsetsGeometry`的一个子类

```dart
const EdgeInsets.all(double value)
  : left = value,
    top = value,
    right = value,
    bottom = value;

const EdgeInsets.fromLTRB(this.left, this.top, this.right, this.bottom);
  
EdgeInsets.fromWindowPadding(ui.WindowPadding padding, double devicePixelRatio)
  : left = padding.left / devicePixelRatio,
    top = padding.top / devicePixelRatio,
    right = padding.right / devicePixelRatio,
    bottom = padding.bottom / devicePixelRatio;

const EdgeInsets.only({
  this.left = 0.0,
  this.top = 0.0,
  this.right = 0.0,
  this.bottom = 0.0,
});

const EdgeInsets.symmetric({
  double vertical = 0.0,
  double horizontal = 0.0,
}) : left = horizontal,
     top = vertical,
     right = horizontal,
     bottom = vertical;
```



## 基础组件

### 文本

### 按钮

### 图片

### 选择框

radioListTile

checkboxListTile

switchListTile

### 输入框

### 滑动条

Slider

### 表单

### 进度条

### 弹出框

#### SimpleDialog

##### SimpleDialogOption

#### ShowDialog

##### AlertDialog

### 收缩面板

#### ExpansionPanelList

##### ExpansionPanel

### 标签

#### Chip

#### ActionChip

#### ChoiceChip

### 表格

#### DataTable

##### DataColumn

##### DataRow

###### Datacell

#### PaginatedDataTable

分页表格

### 分割线

#### Divider

### 卡片

#### Card

### 步骤

#### Stepper

##### Step



## 滚动组件

### PageView

类似于轮播图，可手动滑动页面

### SingleChildScrollView

### ListView

### GridView

### CustomScrollView

### 滚动监听及控制



## 功能组件

## 事件

## 动画

## 自定义组件

## 文件操作

## 网络请求

## 插件