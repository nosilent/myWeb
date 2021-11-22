<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-23 17:38:29
 * @LastEditTime: 2019-09-23 17:38:29
 * @LastEditors: your name
 -->
## 属性/css

### 属性

- .attr()：获取匹配的元素集合中的第一个元素的属性的值  或 设置每一个匹配元素的一个或多个属性。

  ```js
  $('img').attr('alt')  //获取属性alt的值
  $('img').attr('alt','设置值')  //设置alt的值
  $('img').attr('alt',function(index,value){
  	//index当前元素的索引，value匹配属性的原来值
    //返回值用于设置当前匹配属性
    return 'dd'
  })
  $('img').attr({
    alt:'设置值',
    title:'dd'
  })   //设置多个属性值
  ```

- .prop()：获取匹配的元素集中第一个元素的属性值或设置每一个匹配元素的一个或多个属性

  ```jsx
  $('button').prop('checked')  //获取匹配元素中第一个元素的属性值
  $('input').prop('checked',true)  //设置所有匹配元素属性值
  $('input').prop({checked: true,disabled:true}) //设置多个属性
  $('input').prop('checked',function(index,oldValue){
    //index 当前匹配元素的索引，oldValue当前匹配元素匹配属性的值
    //返回值作为当前属性值，没有返回值则属性值不变
    return false
  })
  ```

- .removeAttr()：为匹配的元素集合中每个元素移除一个属性

- .removeProp()：为集合中匹配的元素删除一个属性

- .val()：获取匹配的元素集合中第一个元素的当前值或设置匹配的元素集合中每个元素的值,主要用于表单元素

  ```js
  $('input:checked').val()  //不带参数，获取匹配的元素集合中第一个元素的当前值。
  $('input').val('text')  //设置匹配的input内容为text,参数可以是字符串，数组，数字。该方法不会触发change事件，需要调用.trigger( "change" )
  $('input').val(function(index,value){
    //设置匹配的input
    //index当前元素索引，value当前元素值
    //返回新值作为当前元素的值
    return newvalue
  })
  ```

### css

- .addClass():每个匹配的元素添加指定的样式类名

  ```js
  $('p').addClass('myClass yourClass') //为每个匹配元素所要增加的一个或多个样式名
  $('p').addClass(function(index,currentClass){
    //index当前元素索引，currentClass当前元素样式名
    //返回一个或更多用空格隔开的要增加的样式名
    return 'myClass yourClass'
  })
  ```

- .css():获取匹配元素集合中的第一个元素的样式属性的计算值  或  设置每个匹配元素的一个或多个CSS属性

  ```js
  $('div').css('height')  //获取一个值
  $('div').css(['width','height'])  //获取一个或多个值，返回一个数组
  $('div').css('height','300px') //设置每个匹配元素的一个属性值
  $('div').css('height',function(index,value){
  	//index当前元素索引，value当前元素匹配的属性值
    //返回一个值改变当前元素匹配的属性值
    return '200px'
  })
  $('div').css({'height':'200px',width:'300px'})  //设置多个值
  $('div').css({
    height: function(index,value){
           //index当前元素索引，value当前元素匹配的属性值
         return newvalue               
  	},
    width: function(index,value){
          return newvalue             
    }
  })  //以函数返回值来设置对应值
  ```

- jQuery.cssHooks：标准化浏览器前缀,通过定义函数来获取和设置特定的CSS值的方法

  ```js
  $.cssHooks['borderRadius']= {
    get:function(elem,computed,extra){
     //elem表示当前属性borderRadius
         return ...
    },
    set:function(elem,value){
       //elem表示当前属性borderRadius
         elem.style['borderRadius'] = value
    }
  }
  ```

- jQuery.cssNumber:一个对象，这个包含所有可以不使用单位的CSS属性。用于.css()，可以阻止.css()自动添加px单位到css属性

  ```js
  $.cssNumber['zIndex'] = true
  $.cssNumber['opacity']  = true
  ```

- jQuery.escapeSelector():转义CSS选择器中任何具有特殊的含义字符

  ```js
  $.escapeSelector( "#target" ); // "\#target"
  //选择在一个div内，所有类名为.box的元素
  $( "div" ).find( "." + $.escapeSelector( ".box" ) );
  ```

- .hasClass():确定任何一个匹配元素是否有被分配给定的（样式）类,返回true和false

  ```js
  $('p').hasClass('myClass')
  ```

- .removeClass():移除集合中每个匹配元素一个，多个或全部样式

  ```js
  $('div').removeClass('myClass yourClass')//移除一个或多个样式
  $('div').removeClass()  //移除所有样式
  $('div').removeClass(function(index,class){
  	//index当前匹配元素的索引，class当前元素的样式名
    //返回一个或多个被移除的样式名
    return 'myClass yourClass'
  })
  ```

- .toggleClass():为匹配的元素集合中的每个元素上添加或删除一个或多个样式类（class）,如果存在（不存在）就删除（添加）一个类

  ```js
  $('div').toggleClass() //第一次执行移除所有样式，第二次执行添加之前移除的所有样式
  $('div').toggleClass('myClass')  //反复移除和添加对应样式
  $('div').toggleClass('myclass',tag) //tag为true则添加样式，false则移除样式
  $('div').toggleClass(function(index,ClassName,state){
  	//index当前元素索引，className原先的样式名,state布尔值判断样式类添加还是移除
    //返回元素切换的样式类
    return 'myClass'
  })
  ```

### 尺寸

- .height():获取匹配元素集合中的第一个元素的当前计算高度值 或 设置每一个匹配元素的高度值

  ```js
  $('div').height()  //返回匹配的第一个元素的height值，不带单位
  $('div').height(300)  //设置所有匹配元素的height值，可自动添加单位
  $('div').height(function(index,height){
    //index当前元素在匹配集合中的索引，height原来的高度
  	//返回值用于设置当前匹配元素的height
  	return 300
  })
  ```

- .innerHeight()：用于获得匹配集合中第一个元素的当前计算的内部高度（包括padding，但不包括border），或 设置每一个匹配元素的内部高度,用法与height相同

- .innerWidth():用于获得匹配集合中第一个元素的当前计算的内部宽度（包括padding，但不包括border），或 设置每一个匹配元素的内部宽度,用法与height相同

- .outerHeight()：获取匹配元素集合中第一个元素的当前计算外部高度（包括padding，border和可选的margin） 或设置每个匹配元素的外部高度。

  ```js
  $('div').outerHeight(boolean)  //获取匹配元素集合中第一个元素的当前计算外部高度,boolean表明是否在计算时包含元素的margin值
  $('div').outerHeight(value) //设置每个元素外部高度
  $('div').outerHeight(function(index,height){
    //height原来的外部高度值
    //返回值用来设置外部高度值
    return 300
  })
  ```

- .outerWidth():获取匹配元素集合中第一个元素的当前计算外部宽度（包括padding，border和可选的margin） 或设置每个匹配元素的外部高度。用法与outerHeight相似

- .width()：为匹配的元素集合中获取第一个元素的当前计算宽度值或给每个匹配的元素设置宽度。用法与height相似

### 位置

- .offset()：在匹配的元素集合中，获取的第一个元素的当前坐标，或设置每一个元素的坐标，坐标相对于文档。

  ```js
  $('div').offset()   //不带参数获取值，返回一个包含top 和 left属性的对象
  $('div').offset({top:10,left:30})  //设置值，参数只能是包含top 和 left属性的对象
  $('div').offset(function(index,coords){
    //index当前元素索引，coords当前元素坐标
    //返回一个包含top 和 left属性的对象，设置值
    return {top:30,left:30}
  })
  ```

- .offsetParent():取得离指定元素最近的含有定位信息的祖先元素,不接受参数

- .position()：获取匹配元素中第一个元素的当前坐标，相对于离该元素最近的而且被定位过的祖先元素的坐标。不接受参数，返回一个包含 `top` 和 `left`属性的对象

- .scrollLeft()：获取匹配的元素集合中第一个元素的当前水平滚动条的位置或设置每个匹配元素的水平滚动条位置。

  ```js
  $('div').scrollLeft()   //获取值
  $('div').scrollLeft(300)  //设置值
  ```

- .scrollTop()：获取匹配的元素集合中第一个元素的当前垂直滚动条的位置或设置每个匹配元素的垂直滚动条位置。

### 数据

- jQuery.data()：存储任意数据到指定的元素或者返回设置的值

  ```js
  //element设置数据的元素，key设置的键，value设置的值
  jQuery.data(element,key,value)  
  jQuery.data(document.body, 'bar', 'test') //为body设置一个bar数据，值为test
  
  //获取element上的key值
  jQuery.data(element,key)
  jQuery.data( document.body, 'foo' )//获取body上foo数据的值
  jQuery.data(element)  //获取element上所有的数据，一个js对象
  
  ```

- .data()：在匹配元素上存储任意相关数据 或 返回匹配的元素集合中的第一个元素的给定名称的数据存储的值

  ```js
  $("body").data("foo", 52)  //设置数据
  $("body").data({ baz: [ 1, 2, 3 ] }) //设置数据
  $('body').data('foo')  //获取值
  $('body').data()  //获取所有数据，一个js对象
  ```

- jQuery.hasData()：确定一个元素有无使用jQuery.data()设置的数据，返回true或false

  ```js
  jQuery.hasData($('p')[0]) //确定匹配元素是否有数据
  ```

- jQuery.removeData():移除用`jQuery.data()`绑定的值

  ```js
  jQuery.removeData($('p')[0],'name')  //移除匹配元素上的匹配数据'name'
  jQuery.removeData($('p')[0]） //移除匹配元素上的所有数据
  ```

- .removeData()：移除用`.data()`绑定的值

  ```js
  $('p').removeData('cc')  //移除匹配集合中所有元素的cc数据
  $('p').removeData(['cc','dd']) //移除匹配集合中所有元素的cc和dd数据
  $('p').removeData('cc dd') //移除匹配集合中所有元素的cc和dd数据
  $('p').removeData( )  //移除匹配集合中所有元素的所有数据
  ```

## DOM操作

### 拷贝

- .clone（）

### 包裹

- .wrap()
- .wrapAll()
- .wrapInner()

### 内部插入

- .append()
- .appendTo()
- .html()
- .prepend()
- .prependTo()
- .text()

### 外部插入

- .after()
- .before()
- .insertAfter()
- .insertBefore()

### 移除

- .detach()
- .empty()
- .remove()
- .unwrap()

### 替换

- .replaceAll()
- .replaceWith()

## 遍历

### 筛选

- .eq()
- .filter()
- .first()
- .has()
- .is()
- .last()
- .map()
- .not()
- .slice()

### 遍历

- .add()
- .contents()
- .each()
- .end()

### 树遍历

- .addBack()
- .children()
- .closest()
- .find()
- .next()
- .nextAll()
- .nextUntil()
- .parent()
- .parents()
- .parentsUntil()
- .prev()
- .prevAll()
- .prevUntil()
- .siblings()

## 事件

### 浏览器事件

- .resize()
- .scoll()

### 文档加载

- .holdReady()
- .ready()

### 事件绑定

- .bind()
- .delegate()
- .off()
- .on()
- .one()
- .trigger()
- .triggerHandler()
- .unbind()
- .undelegate()

### 表单事件

- .blur()
- .change()
- .focus()
- .select()
- .submit()

### 键盘事件

- .keydown()
- .keypress()
- .keyup()

### 鼠标事件

- .click()
- .contextmenu()
- .dblclick()
- .focusin()
- focusout()
- .hover()
- .mousedown()
- .mouseenter()
- .mouseleave()
- .mouseout()
- .mouseover()
- .mouseup()

## 效果

### 基础

- .hide()
- .show()
- .toggle()

### 自定义

- .animate()
- .clearQueue()
- .delay()
- .dequeue()
- jQuery.dequeue()
- .finish()
- jQuery.fx.interval
- jQuery.fx.off
- .queue()
- jQuery.queue()
- .stop()

### 渐变

- .fadeIn()
- .fadeOut()
- .fadeTo()
- .fadeToggle()

### 滑动

- .slideDown()
- .slideToggle()
- .slideUp()

## Ajax

### 全局事件处理

- .ajaxComplete()
- .ajaxError()
- .ajaxSend()
- .ajaxStart()
- .ajaxStop()
- .ajaxSuccess()

### 辅助函数

- jQuery.param()
- .serialize()
- serializeArray()

### 底层接口

- jQuery.ajax()
- jQuery.ajaxSetup()

### 快捷方法

- jQuery.get()
- jQuery.getJSON()
- jQuery.getScript()
- .load()
- jQuery.post()