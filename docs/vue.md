<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-23 17:38:29
 * @LastEditTime: 2019-09-23 18:00:56
 * @LastEditors: Please set LastEditors
 -->
## 指令

### 常用指令

v-bind: 动态绑定一个属性，使其值可以接受一个变量，简写为`：`

v-model: 双向数据绑定，只适用于Input元素

v-if: 判断是否渲染一个元素，渲染则创建到父元素中

v-show: 判断是否渲染一个元素，渲染则设置元素display:block，否则为display:none

v-for: 循环

v-on: 监听事件，简写为@

v-slot: 指定插槽名，简写#

### 自定义指令

- 全局指令

```jsx
Vue.directive('my-directive', {
  //指令第一次绑定到元素时调用,el：指令所绑定的元素,
  //binding：{name：指令名,value：指令的绑定值,oldValue：指令绑定的前一个值,expression：字符串	//形式的指令表达式,arg：传给指令的参数,modifiers：一个包含修饰符的对象}
  bind: function (el,binding,vnode,oldVnode){},
  //被绑定元素插入父节点时调用(仅保证父节点存在，但不一定已被插入文档中)
  inserted: function (el,binding,vnode,oldVnode) {},
  //所在组件的 VNode 更新时调用,可能发生在其子 VNode 更新之前
  update: function (el,binding,vnode,oldVnode) {},
  //指令所在组件的 VNode 及其子 VNode 全部更新后调用
  componentUpdated: function (el,binding,vnode,oldVnode) {},
  //指令与元素解绑时调用
  unbind: function (el,binding,vnode,oldVnode) {} 
})
```

- 局部指令,需要在组件的directives属性中注册

  ```jsx
  //局部指令，在组件的directives属性中注册
  directives:{
    focus:{
      bind: function () {},
    	inserted: function () {}, 
   	 	update: function () {},
    	componentUpdated: function () {},
    	unbind: function () {}
    }
  }
  //使用
  <input v-focus/>
  ```

- 动态指令参数：可以用方括号括起来的 JavaScript 表达式作为一个指令的参数

  ```jsx
  //attributeName 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。
  //attributeName其实就是一个变量
  <a v-bind:[attributeName]="url"> ... </a>
  ```

## 样式

1. 一个对象

   ```jsx
   //class
   <div v-bind:class="{ active: isActive }"></div>
   data: {
     isActive: true,
     hasError: false
   }
   //style
   <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
   data: {
     activeColor: 'red',
     fontSize: 30
   }
   ```

2. 一个数组

   ```jsx
   <div v-bind:class="[activeClass, errorClass]"></div>
   data: {
     activeClass: 'active',
     errorClass: 'text-danger'
   }
   ```

## 计算属性和侦听属性

### 计算属性

通过一系的操作，返回一个值作为指定属性的属性值，相关响应式**依赖数据发生改变**时才会重新求值

```jsx
data:{
    firstName: 'Foo',
    lastName: 'Bar'
},
computed:{
	fullname(){
     return this.firstName + this.lastName
  }
}
```

### 计算属性设置值

在计算属性内部指定set方法

```js
computed:{
	fullname:{
		get(){   //获取该计算属性值时，调用该方法
			return '....'
    },
    set(value){  //当为该计算属性设置值时，调用该方法
			//value设置值
			//.....                                          
    }
  }
}
```

### 侦听属性

通过监听指定属性，当该属性值改变时，可以进行一系列的数据操作

```js
data:{
  value:''，
  name: ''
}
watch:{
  value(newvalue,oldvalue){  //监听data中的value，当其改变时执行其他操作
		console.log(newvalue)
		console.log(oldvalue)
		this.name = '33'                      
  }
}
```

## 组件

### 定义组件

```jsx
//全局组件,组件内容与vue实例一样，只是没有el属性
//全局组件不用在父组件中注册，可以直接使用
Vue.component(组件名,{
    template:
})

//局部组件，必须在父组件components中注册
let componentA = {}
let componentB = {}
//在父组件中注册
components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }

//使用Vue.extend
let component = Vue.extend({
    template: `ddd`,
    data(){
	}
})
```

### 组件传值

1. 使用公共数据仓库vuex

2. 在组件上设置ref，通过$.ref获取该组件上的数据

3. - 父组件向子组件传值，在子组件中使用props

   ```js
   //在父组件中
   <children v-bind:name='username' title='cccc'/>
   data:{
   	username: '张三'
   }
   //在子组件中
   {
   props: ['name','title']  //name:张三，title:cccc
   }
   ```

   - 子组件向父组件传值，在子组件中使用$.emit()，在父组件中使用v-on或$.on()

   ```js
   //在子组件中
   <button @click='send'/>
     methods:{
   		send(){
         //$.emit('监听名'，数据)
         $.emit('dispath','haha')
       }
     }
   //在父组件中
   <children @dispath='res'/>
     methods:{
   		res(data){
   			console.log(data)  //'haha'
       }
     }
   ```

### 动态组件

使用v-bind:is

```jsx
<component v-bind:is="组件名"></component>
```

### 异步组件

- 创建组件时，使用一个函数

```jsx
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // 向 `resolve` 回调传递组件定义
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
//返回一个promise
Vue.component(
  'async-webpack-example',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
```

- 处理加载状态

  ```jsx
  const AsyncComponent = () => ({
    // 需要加载的组件 (应该是一个 `Promise` 对象)
    component: import('./MyComponent.vue'),
    // 异步组件加载时使用的组件
    loading: LoadingComponent,
    // 加载失败时使用的组件
    error: ErrorComponent,
    // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    delay: 200,
    // 如果提供了超时时间且组件加载也超时了，
    // 则使用加载失败时使用的组件。默认值是：`Infinity`
    timeout: 3000
  })
  ```

## 插槽

### 使用插槽

1. 在组件中需要定义插槽的地方使用<slot>
2. 在使用该组件时，在其标签内部定义插槽内容或其他组件

```jsx
//father组件,定义
<div>
下面是插槽内容<br/>
<slot/>
</div>
//使用
<father>这是插槽内容</father>
```

### 插槽默认值

在组件中定义插槽是，在<slot>标签中添加默认内容，在使用组件时若给出了插槽内容，则渲染给定的内容，否则渲染默认内容

```jsx
//father组件中定义
<div>
下面是插槽内容<br/>
<slot>这是默认插槽内容</slot>
</div>

//使用
<father/>  //下面是插槽内容 这是默认插槽内容
<father>这是插槽内容</father> //下面是插槽内容 这是插槽内容
```

### 具名插槽

为使组件中多个插槽与指定内容匹配，为每个插槽使用name属性命名，使用时用`v-slot:插槽名`，简写`#插槽名`

```jsx
//定义插槽，father组件
<div>
 <slot name='slot1'></slot>
下面是插槽内容<br/>
<slot name='slot2'></slot>
</div>
//使用
<father>
  <template v-slot:slot2> 这是插槽1内容</template>
  <template v-slot:slot1> 这是插槽1内容</template>
</father>
```

> 具名插槽内容位置在组件中定义插槽时就确定了，不会因为填充内容先后不同而改变
>
> v-slot只能添加在一个 `<template>`

### 作用域插槽

- 就是在组件中定义插槽时使用v-bind绑定一个变量，在`<slot>`标签内可以使用该变量；

  ```jsx
  <span>
    <slot v-bind:user="user">
      {{ user.lastName }}
    </slot>
  </span>
  ```

- 在使用v-slot时指定插槽名并绑定一个变量，该变量具有定义插槽时的所有属性

  ```jsx
  <current-user>
    <template v-slot:default="slotProps">
      {{ slotProps.user.firstName }}
    </template>
  </current-user>
  ```

## 过滤器

过滤器可以用在两个地方：**双花括号插值和 v-bind 表达式** 。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示

### 定义和使用

- 局部过滤器

  ```jsx
  //在组件中filters中定义
  filters: {
    fliterA(arg){
            ...
    }
  }
  //使用  
  {{ message|fliterA }}
  ```

- 全局过滤器

  ```jsx
  //Vue.filter(过滤器名，function(arg){})
  Vue.filter('filterA',(arg)=>{...})
  //使用  
  {{ message|fliterA }} //此时参数arg为message
  ```

### 过滤器函数

- 过滤器函数总接收表达式的值 (之前的操作链的结果) 作为第一个参数

- 过滤器可以串联

  ```jsx
  {{ message | filterA | filterB }}
  ```

- 过滤器是 JavaScript 函数，可以接收参数：

  ```js
  {{ message | filterA('arg1', arg2) }}
  //filterA 被定义为接收三个参数的过滤器函数。
  //其中 message 的值作为第一个参数，
  //普通字符串 'arg1' 作为第二个参数，
  //表达式 arg2 的值作为第三个参数。
  ```

## 过度和动画

### 使用过渡

通过使用`<transtion/>`组件将需要过渡的任意内容（包括组件）包裹起来,

```jsx
<transtion>
  <p>...</p>
  <ComponentA/>
</transtion>
```

### 定义过渡样式

通过`<transtion/>`的name属性指定名称，过渡的css将以该名称开头，样式包括进入和离开两个阶段，每个阶段分为3步

```jsx
<transtion name='cc'>...</transtion>
//v表示name属性值
//1. v-enter:定义进入过渡的开始状态
//2. v-enter-active:定义进入过渡生效时的状态
//3. v-enter-to:定义进入过渡的结束状态
//4. v-leave:定义离开过渡的开始状态
//5. v-leave-active:定义离开过渡生效时的状态
//6. v-leave-to:定义离开过渡的结束状态
.cc-enter-active {
  transition: all .3s ease;
}
.cc-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.cc-enter, .cc-leave-to
{
  transform: translateX(10px);
  opacity: 0;
}
```

### 自定义过渡样式

`enter-class` `enter-active-class`  `enter-to-class` 

`leave-class` `leave-active-class` `leave-to-class`

可以通过以上6个属性在`<transtion/>`标签上指定每个阶段的一个或多个过渡样式,

```jsx
  <transition
    name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight"
  >
    <p v-if="show">hello</p>
  </transition>
```

### 监听过渡事件

过渡事件有：

before-enter，enter，after-enter，enter-cancelled，before-leave，leave，after-leave，leave-cancelled

使用v-on可以监听每个事件，在执行该事件的设置css内容

上述事件都接受过渡内容el做为第一个参数，其中enter和leave接受done作为第二个参数,

> 当只用 JavaScript 过渡的时候，**在 enter 和 leave 中必须使用 done 进行回调**。否则，它们将被同步调用，过渡会立即完成
>
> 当只用 JavaScript 过渡的时候，添加 `v-bind:css="false"`，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响

```jsx
  <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave"
    v-bind:css="false"
  >
    <p v-if="show">
      Demo
    </p>
  </transition>
//在vue实例中
methods: {
  // 进入
  beforeEnter: function (el) {
    // ...
  },
  // 当与 CSS 结合使用时
  // 回调函数 done 是可选的
  enter: function (el, done) {
    // ...
    done()
  },
  afterEnter: function (el) {
    // ...
  },
  enterCancelled: function (el) {
    // ...
  },
  // 离开时
  beforeLeave: function (el) {
    // ...
  },
  // 当与 CSS 结合使用时
  // 回调函数 done 是可选的
  leave: function (el, done) {
    // ...
    done()
  },
  afterLeave: function (el) {
    // ...
  },
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {
    // ...
  }
}
```

### 初始渲染过渡

在`<transtion/>`标签添加appear属性，指定每个阶段的css样式或监听每个阶段的钩子函数

```jsx
//指定css样式
<transition
  appear
  appear-class="custom-appear-class"
  appear-to-class="custom-appear-to-class" (2.1.8+)
  appear-active-class="custom-appear-active-class"
>
  <!-- ... -->
</transition>

//监听每个阶段的钩子函数，在vue实例methods中定义每个阶段绑定的函数
<transition
  appear
  v-on:before-appear="customBeforeAppearHook"
  v-on:appear="customAppearHook"
  v-on:after-appear="customAfterAppearHook"
  v-on:appear-cancelled="customAppearCancelledHook"
>
  <!-- ... -->
</transition>
```

### 过渡模式

通过在过渡标签上指定mode属性的值为`out-in`或`in-out`

`in-out`：新元素先进行过渡，完成之后当前元素过渡离开。（先进再出）

`out-in`：当前元素先进行过渡，完成之后新元素过渡进入。（先出再进）

```jsx
<transtion mode='in-out'></transtion>
```

## 混入mixin

一个混入对象可以包含任意组件选项(比如data,methods,生命周期函数...)，当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

### 使用mixin

定义一个mixin，与定义局部组件类似，在vue实例中使用mixins属性（一个数组），传入定义好的mixin

```jsx
let mixin = {data:{message:'hellow'}}
new Vue({
  mixins:[mixin],
  ....
})
```

### 同项合并

- 当组件和混入对象含有同名选项时,这些选项将以恰当的方式进行“合并”,发生冲突时以组件数据优先.

```jsx
var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}
new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    console.log(this.$data)
    // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})
```

- 同名钩子函数将合并为一个数组,都将被调用,而且混入对象的钩子将在组件自身钩子**之前**调用。

```jsx
var mixin = {
  created: function () {
    console.log('混入对象的钩子被调用')  //1
  }
}
new Vue({
  mixins: [mixin],
  created: function () {
    console.log('组件钩子被调用')  //2
  }
})
```

- 值为对象的选项，例如 `methods`、`components` 和 `directives`，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

```jsx
var mixin = {
  methods: {
    foo: function () {
      console.log('foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}
var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log('bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  }
})
vm.foo() // => "foo"
vm.bar() // => "bar"
vm.conflicting() // => "from self"
```

### 全局混入

全局混入使用`Vue.mixin()`定义，一旦使用全局混入，将影响**每一个**之后创建的 Vue 实例

```jsx
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})
new Vue({
  myOption: 'hello!'
})
// => "hello!"
```

### 自定义选项合并策略

通过使用 `Vue.config.optionMergeStrategies[prop]`将其定义为一个函数，返回合并后的值

```jsx
Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // 返回合并后的值
}
```

## 生命周期

## 路由

### 定义路由

使用VueRouter

```js
import VueRouter from 'vue-router'
import Vue from 'vue'
vue.user(VueRouter)
const router = new VueRouter({
  routes:[
     {path: '/a',component:ComponentA },
     {path: '/b',component: ComponentB}
  ]
})
//注入到Vue实例中，
//可以在任何组件内通过 this.$router 访问路由器，也可以通过 this.$route 访问当前路由
new Vue({
	...,
  router: router
})
```

### 使用路由

通过router-link链接对应路由，view-router渲染对应路由组件内容

```jsx
//在html中
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/a">Go to a</router-link>
    <router-link to="/b">Go to b</router-link>
  </p>
	<!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
```

> 当 `<router-link>` 对应的路由匹配成功，将自动设置 class 属性值 `.router-link-active`

### 动态路由

路由参数不确定，动态路径参数以冒号开头

```js
routes:[
  {path:'/root/:id',component:Component1}
]
```

当匹配到一个路由时，参数值会被设置到 `this.$route.params`，可以在每个组件内使用

```jsx
<div>{{this.$route.params.id}}</div>
```

可以在一个路由中设置多段“路径参数”

```js
routes:[
  {path:'/root/:username/:id',...}
]
```

动态路由跳转可传递参数

```jsx
<router-link :to="{ name: 'user', params: { d: 123 }}">User</router-link>

this.$router.push({ name:'user',params:{ id:123 } })
```

### 嵌套路由

在一条路由中定义子路由,子路由通过children属性添加

```js
routes:[
  {	path:'/user',
   	component: User,
  	children:[
				//当路由匹配/user/name时，Name会被渲染在 User 的 <router-view> 中                                       
        {path:'name',component: Name},
				//当路由匹配/user/id时, Id会被渲染在 User 的 <router-view> 中                                          
        {path: 'id',component: Id},
        ...
    ]
  }
]
```

### 命名路由和命名视图

- **命名路由**是在定义路由时，使用name属性为该条路由命名

  ```jsx
  routes:[
    {path:'/user',component: User, name: 'user'}
  ]
  //在<router-link>中
  <router-link :to="{ name: 'user'}">User</router-link>
  //使用this.$router.push
  this.$router.push({name:'user'})
  ```

- **命名视图**是使用name属性为`<router-view>`命名，如果 `router-view` 没有设置名字，那么默认为 `default`

  ```jsx
  <router-view class="view one"></router-view>
  <router-view class="view two" name="a"></router-view>
  <router-view class="view three" name="b"></router-view>
  //一个视图使用一个组件渲染，因此对于同一个路由，多个视图就需要多个组件。
  //确保正确使用 components配置 (带上 s)
  const router = new VueRouter({
    routes: [
      {
        path: '/',
        components: {
          default: Foo,
          a: Bar,
          b: Baz
        }
      }
    ]
  })
  ```

`<router-link>`标签上的属性

```jsx
//tag:将router-link渲染为指定标签，默认为a
<router-link path='/b' tag = 'p'/>
//exact匹配模式，当前的url包含router-link中的url时，会处于激活状态，也会添加对应的css
//若当前url为'/root/a' router-link的url为'/root'，则会为router-link添加激活的css
<router-link path='/root' exact>
```



### 编程式路由导航（跳转）

导航方法 (`push`、 `replace`、 `go`)

通过调用 `this.$router.push(url)`跳转到指定路由，`<router-link>`内部也是调用该方法

```jsx
//普通路由
this.$router.push('/user')
//命名路由
this.$router.push({name:'user'})
//动态路由
this.$router.push({ name:'user',params:{ id:123 } })
this.$router.push({ path:'/user',params:{ id:123 } })
```

### 路由重定向和别名

在定义路由时，在需要重定向的单条路由使用`redirect`指定到对应的url或name，使用alias定义别名只能是url,可以通过数组定义多个别名，别名和path具有相同效果

```js
  routes: [
    { path: '/a', redirect: '/b' },              
    { path: '/a', redirect: to => {...}}，//动态返回重定向目标,方法接收目标路由作为参数,return 重定向的 字符串路径/路径对象
    { path: '/user', redirect: { name: 'foo' }},
    { path: '/root', component: Root, alias: '/c' },
    { path: '/music', component: Music, alias: ['/music','/cc'] } //定义多个别名
  ]
```

### 路由参数解耦

在组件中使用 `$route` 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性，使用 `props` 将组件和路由解耦

```jsx
<div>User {{ $route.params.id }}</div>
routes: [
    { path: '/user/:id', component: User }
  ]
//使用Props
{
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
 routes: [
    { path: '/user/:id', component: User, props: true },
    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    },
    { path: '/search', component:SearchUser,props:(route)=>({ query: route.query.q })}
 ]
```

> 路由中的props可以是一个布尔值，一个对象，或者是一个函数

### history模式

`vue-router` 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。可以用路由的 **history 模式**改变

```js
const router = new VueRouter({
	mode: 'history',
  routes: [....]
})
```

### 导航守卫

导航守卫主要用来通过跳转或取消的方式守卫导航，分为全局的, 单个路由独享的, 或者组件级的

- 全局前置守卫：当一个导航触发时，全局前置守卫按照创建顺序调用

  ```jsx
  const router = new VueRouter({ ... })
  //使用router.beforeEach定义一个前置守卫                              
  router.beforeEach((to：Route, from: Route, next: function) => {
    //to:即将进入的路由，from:将要离开的路由
    //next():正常进行下一步
    //next(false):中断当前的跳转
    //next(url) 或者 next({ path: url }):中断当前的跳转，执行新的url跳转
    //next(error)终止跳转，该错误会被传递给 router.onError() 注册过的回调
    // ...
  })
  ```

- 全局后置钩子：

  ```jsx
  router.afterEach((to, from) => {
    // ...
  })
  ```

- 单条路由守卫：

  ```js
    routes: [
      {
        path: '/foo',
        component: Foo,
        beforeEnter: (to, from, next) => {
          // ...
        }
      }
    ]
  ```

- 组件内守卫：

  ```jsx
  const A = {
    template: `...`,
    beforeRouteEnter (to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
      // 通过传一个回调给 next来访问组件实例
         next(vm => {
      		// 通过 `vm` 访问组件实例
    			})
    },
    beforeRouteUpdate (to, from, next) {
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
    },
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
    }
  }
  ```

### 路由导航后滚动

当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样，当创建一个 Router 实例，提供一个 `scrollBehavior` 方法

```js
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    //return { x: 0, y: 0 } 滚动到顶部
    //return savedPosition 在按下 后退/前进 按钮时，就会像浏览器的原生表现那样
    //return {selector: to.hash} 滚动到锚点
    //return new Promise(...)  异步滚动到指定位置
  }
})
```

### 路由懒加载

```js
//第一种：使用函数返回一个import
const Foo = () => import('./Foo.vue')
const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo },
		//第二种：使用异步组件返回promise
    {path: '/baz', conponent: ()=> new promise((res,jec)=>{
			setTimeout(()=>{
					res({
            template: '...',
						.....                                                                                                      
          })                                                              
      },200)
    })}
  ]
})
```



## vuex

### 创建store

```js
//创建仓库
const store = new Vuex.Store({
  state:{}
})
//将store注入vue实例中
new Vue({
	el: '.root',
  store:store,
  data:{},
  ...
})
```

> 在使用模块化的打包系统中，在引入Vue和Vuex时需要调用vue.use(vuex)
>
> 当使用全局 script 标签引用 Vuex 时，则不需要

### state

state与Vue中data相似，用于存储数据

- 在各组件中组件中可以通过`this.$store.state[prop]`来访问state中的数据
- 可以通过`mapState`函数将需要state数据添加为组件的一个或多个**计算属性**

```js
import { mapState } from 'vuex'

{
  ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}

//当计算属性的名称与 state 的子节点名称相同时，可以给 mapState 传一个字符串数组
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
//局部计算属性和mapState（）返回的对象一起使用时，使用对象展开符；
//（组件中定义了自己的计算属性并需要使用store中的数据时）
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```

### getter

在store中定义类似于vue中的计算属性

- Getter 中的属性接受 state 作为第一个参数,Getter自身作为第二个参数,可以通过第二个参数访问其他属性

```js
const store = new Vuex.Store({
	state:{...},
  getters:{
      name: state=>{
           return ...
      }，
      otherName: (state,getter)=>{
					return getter.name+'--'
      }
  }
})
```

- 在组件中通过 `this.$store.getters[prop] ` 来访问计算属性

- 在定义getters可以返回一个函数，用于调用时传递参数

  ```js
  getters: {
    // ...
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    }
  //在组件中使用
   this.$store.getters.getTodoById('id') 
   
  ```

- `mapGetters` 辅助函数可以将 store 中的 getter 映射到组件的局部计算属性

  ```js
  import { mapGetters } from 'vuex'
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中，属性名不改变
      ...mapGetters([
        'doneTodosCount',
        'anotherGetter',
        // ...
      ])
    }
  //将一个 getter 属性另取一个名字，使用对象形式
  compoted:{
    ...mapGetters({
    // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
    doneCount: 'doneTodosCount'
  })
  }
  ```

### Mutation

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation,每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**（必须是同步函数），事件类型就是回调函数名，回调函数接受state作为第一个参数。

```js
// ...
mutations: {
  increment (state, n) {
    state.count += n
  }
}
//使用时不能直接调用，而是使用commit
store.commit('increment', 10)
//以对象形式提交，整个对象会作为第二个参数
store.commit({
  type: 'increment',
  amount: 10
})
```

- 使用常量代替事件类型

  ```js
  const SOME_MUTATION = 'SOME_MUTATION'
    
  mutations: {
      // 可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
      [SOME_MUTATION] (state) {
        // mutate state
      }
    }
  ```

- 操作state在对象上添加一个不存在的属性时，以赋值的形式添加则该属性不具有响应式状态，应该这样操作

```js
mutations:{
	//1. 使用Vue.set(obj,prop,value),
    //为state中的info对象添加一个不存在的age属性
    info_change(state,value){
        Vue.set(state.info,'age',value)
    }，
    //2. 整体替换该对象
    //为state中data对象添加一个不存在的info属性
    data_change(state,value){
		state.data = {...state.data,info:value}
    }
}
```

- 在组件中提交mutation使用this.$store.commit('xxx')，或者使用 `mapMutations` 辅助函数将组件中的 methods 映射为 `store.commit` 调用

  ```js
  //使用this.$store.commit('xxx')
  methods:{
  	commit(){
         this.$store.commit('xxx')               
    }
  }
  //mapMutations,将mutation中的回调函数直接添加到methods中，可改变调用名
    methods: {
      ...mapMutations([
        'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
  
        // `mapMutations` 也支持载荷：
        'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
      ]),
      ...mapMutations({
        add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
      })
    }
  ```

### Action

Action 提交的是 mutation，而不是直接变更状态;Action 可以包含任意异步操作,

- Action 函数接受一个与 store 实例具有相同方法和属性的 **context**  对象作为第一个参数

  可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters

```js
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    },
     //使用参数解构   
    increment ({ commit ，state, getters，dispatch }) {
    commit('increment')
  }
  }
```

- Action 通过 `store.dispatch` 方法触发

  ```js
  store.dispatch('increment')
  // 以载荷形式分发
  store.dispatch('incrementAsync', {
    amount: 10
  })
  // 以对象形式分发
  store.dispatch({
    type: 'incrementAsync',
    amount: 10
  })
  ```

- 在组件中使用 `this.$store.dispatch('xxx')` 分发 action，或者使用 `mapActions` 辅助函数将组件的 methods 映射为 `store.dispatch` 调用

  ```js
    methods: {
  	// mapActions函数将Action中的方法添加到methods中，
    // 使得Vue可以直接像使用methods中定义的方法那样使用Action中的方法                     
      ...mapActions([
        'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
  
        // `mapActions` 也支持载荷：
        'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
      ]),
      ...mapActions({
        add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      }),
       //组件自己定义的方法用于触发Action中的increment方法  
      costom(){
         this.$store.dispath('increment') 
      }
    }
  ```

- 组合Action

  ```js
  // 假设 getData() 和 getOtherData() 返回的是 Promise
  actions: {
    async actionA ({ commit }) {
      commit('gotData', await getData())
    },
    async actionB ({ dispatch, commit }) {
      await dispatch('actionA') // 等待 actionA 完成
      commit('gotOtherData', await getOtherData())  //再提交mutation
    }
  }
  ```

### Module

Vuex 允许将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割，*类似于Redux中的多个reducer*

```js
const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

在各个模块内部：

- 在getter中：接收的第一个参数是**模块的局部状态对象state**，第二个参数为**模块内部getter**自身，第三个参数为**根节点状态rootState**

  ```js
  const moduleA = {
    // ...
    getters: {
      sumWithRootCount (state, getters, rootState) {
        return state.count + rootState.count
      }
    }
  }
  ```

- 在mutation中：接收的第一个参数是**模块的局部状态对象state**

  ```js
  const moduleA = {
    state: { count: 0 },
    mutations: {
      increment (state) {
        // 这里的 `state` 对象是模块的局部状态
        state.count++
      }
    }}
  ```

- 在Action中：局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`

  ```js
  const moduleA = {
    // ...
    actions: {
      incrementIfOddOnRootSum ({ state, commit, rootState }) {
        if ((state.count + rootState.count) % 2 === 1) {
          commit('increment')
        }
      }
    }
  }
  ```

- 使用命名空间：在定义模块时使用`namespaced=true`

  ```js
  const store = new Vuex.Store({
    modules: {
      account: {
        namespaced: true,
        state: { ... },
        ...
               }
  //使用全局 state 和 getter，rootState 和 rootGetter 会作为第三和第四参数传入 getter，
  //也会通过 context 对象的属性传入 action。
     foo:{namespaced: true,
      getters: {
        // 在这个模块的 getter 中，`getters` 被局部化了
        // 你可以使用 getter 的第四个参数来调用 `rootGetters`
        someGetter (state, getters, rootState, rootGetters) {
          getters.someOtherGetter // -> 'foo/someOtherGetter'
          rootGetters.someOtherGetter // -> 'someOtherGetter'
        }}           
  //在全局命名空间内分发 action 或提交 mutation，
  //将 { root: true } 作为第三参数传给 dispatch 或 commit 即可
    foo:{actions: {
        // 在这个模块中， dispatch 和 commit 也被局部化了
        // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
        someAction ({ dispatch, commit, getters, rootGetters }) {
          getters.someGetter // -> 'foo/someGetter'
          rootGetters.someGetter // -> 'someGetter'
  
          dispatch('someOtherAction') // -> 'foo/someOtherAction'
          dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'
  
          commit('someMutation') // -> 'foo/someMutation'
          commit('someMutation', null, { root: true }) // -> 'someMutation'
        }}
  ```

- 在带命名空间的模块注册全局 action:添加 `root: true`，并将这个 action 的定义放在函数 `handler` 中

  ```js
  modules: {
      foo: {
        namespaced: true,
        actions: {
          someAction: {
            root: true,
            handler (namespacedContext, payload) { ... } // -> 'someAction'
          }
        }
      }}
  ```

- 命名空间模块使用`mapState`, `mapGetters`, `mapActions` 和 `mapMutations`

  ```js
  computed: {
    ...mapState({
      a: state => state.some.nested.module.a,
      b: state => state.some.nested.module.b
    })
  },
  methods: {
    ...mapActions([
      'some/nested/module/foo', // -> this['some/nested/module/foo']()
      'some/nested/module/bar' // -> this['some/nested/module/bar']()
    ])
  }
  //可以将模块的空间名称字符串作为第一个参数传递给上述函数,自动将该模块作为上下文
  computed: {
    ...mapState('some/nested/module', {
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    ...mapActions('some/nested/module', [
      'foo', // -> this.foo()
      'bar' // -> this.bar()
    ])
  }
  //可以通过使用 createNamespacedHelpers 创建基于某个命名空间辅助函数
  //减少了在辅助函数中写 模块的空间名称字符串
  import { createNamespacedHelpers } from 'vuex'
  const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')
    computed: {
      // 在 `some/nested/module` 中查找
      ...mapState({
        a: state => state.a,
        b: state => state.b
      })
    },
    methods: {
      // 在 `some/nested/module` 中查找
      ...mapActions([
        'foo',
        'bar'
      ])}
  ```

- 模块动态组成：在 store 创建**之后**，可以使用 `store.registerModule` 方法注册模块,

  可以使用 `store.unregisterModule(moduleName)` 来动态卸载模块,不能使用此方法卸载创建 store 时声明的模块

  ```js
  // 注册模块 `myModule`
  store.registerModule('myModule', {
    // ...
  })
  // 注册嵌套模块 `nested/myModule`
  store.registerModule(['nested', 'myModule'], {
    // ...
  })
  //可以通过 store.state.myModule 和 store.state.nested.myModule 访问模块的状态
  
  //注册一个新 module 时,保留过去的 state,通过设置 preserveState = true
  store.registerModule('a', module, { preserveState: true })
  ```

  > 在使用同一模块时，为了时模块内部的state数据不被污染，state应为一个函数，与vue中的data同理

### 使用vuex处理表单双向数据绑定

必须使用计算属性computed中的setter

```jsx
<input v-model="message">
//在store中  
 state:{
		message: ''
 },
 mutation:{
		updateMessage(state,value){
			state.message = value
    }
 } 
//在组件中
 computed:{
		message:{
			get(){
				this.$store.state.message	
      },
      set(value){
        this.$store.commit('updateMessage',value)                                                   
      }                                                        
    }
 }
```

## vue3.0

## vue-router源码解析

### 构造函数说明

```tsx
constructor (options: RouterOptions = {}) {
  this.app = null
  this.apps = []
  this.options = options
  this.beforeHooks = []     //收集beforeEach中添加的方法
  this.resolveHooks = []   //收集beforeResolve中添加的方法
  this.afterHooks = []    //收集afterEach中添加的方法
  //createMatcher生产路由表
  this.matcher = createMatcher(options.routes || [], this)

  let mode = options.mode || 'hash'
  
  //supportsPushState判断是否存在window.history和window.history.pushState类型为funntion
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false
  if (this.fallback) {
    mode = 'hash'
  }
  //inBrowser = typeof window !== 'undefined'，判断是否在浏览器中运行
  if (!inBrowser) {
    mode = 'abstract'
  }
  this.mode = mode

  //根据不同的mode生产不同的history。HTML5History,HashHistory,AbstractHistory都继承于History类
  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base)
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback)
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base)
      break
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, `invalid mode: ${mode}`)
      }
  }
}
```

#### 初始化路由表

初始化路由表是在构造函数中`this.matcher = createMatcher(options.routes || [], this)`完成

##### createMatcher

```tsx
export function createMatcher (
  routes: Array<RouteConfig>,
  router: VueRouter
): Matcher {
  //pathList:[]  添加各路由的url   ['/'.'/home']
  //pathMap:{} 将各路由的url于路由信息对应  {'/':{path:'/',name:'..',...},'/home':{...}}
  //nameMap:{} 为路由中定义了name数据，则将name和路由信息对应 {'home':{path:'/home',...}}
  const { pathList, pathMap, nameMap } = createRouteMap(routes)
  
  //将新路由添加的已存在的路由表中
  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap)
  }
  function match (
    raw: RawLocation,
    currentRoute?: Route,
    redirectedFrom?: Location
  ){...}
    
  return {
    match,
    addRoutes
  }
}
```

##### createRouteMap

```tsx
export function createRouteMap (
  routes: Array<RouteConfig>,
  oldPathList?: Array<string>,
  oldPathMap?: Dictionary<RouteRecord>,
  oldNameMap?: Dictionary<RouteRecord>
): {
  pathList: Array<string>,
  pathMap: Dictionary<RouteRecord>,
  nameMap: Dictionary<RouteRecord>
} {
  // the path list is used to control path matching priority
  const pathList: Array<string> = oldPathList || []
  // $flow-disable-line
  const pathMap: Dictionary<RouteRecord> = oldPathMap || Object.create(null)
  // $flow-disable-line
  const nameMap: Dictionary<RouteRecord> = oldNameMap || Object.create(null)

  routes.forEach(route => {
    //循环路由表，生产对应的pathList, pathMap, nameMap
    addRouteRecord(pathList, pathMap, nameMap, route)
  })

  // ensure wildcard routes are always at the end
  for (let i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0])
      l--
      i--
    }
  }

  if (process.env.NODE_ENV === 'development') {
    // warn if routes do not include leading slashes
    const found = pathList
    // check for missing leading slash
      .filter(path => path && path.charAt(0) !== '*' && path.charAt(0) !== '/')

    if (found.length > 0) {
      const pathNames = found.map(path => `- ${path}`).join('\n')
      warn(false, `Non-nested routes must include a leading slash character. Fix the following routes: \n${pathNames}`)
    }
  }

  return {
    pathList,
    pathMap,
    nameMap
  }
}
```

##### addRouteRecord

解析单条路由：

1. 若存在子路由`children`，则将子路由信息添加到`pathList`,`pathMap`,`nameMap`

2. 若`pathMap`不存在当前路由，则将路由信息添加到`pathList`，`pathMap`
3. 若路由的`alias`属性存在，则循环`alias`生产`{path: alias,childrend:router.children}`,将路由信息添加到`pathList`，`pathMap`
4. 若路由存在`name`属性并且`nameMap`中没有对应的路由信息，则将路由信息添加到`nameMap`

```tsx
function addRouteRecord (
  pathList: Array<string>,
  pathMap: Dictionary<RouteRecord>,
  nameMap: Dictionary<RouteRecord>,
  route: RouteConfig,
  parent?: RouteRecord,
  matchAs?: string
) {
  const { path, name } = route
  const pathToRegexpOptions: PathToRegexpOptions =
    route.pathToRegexpOptions || {}
  //normalizePath去掉路由url末尾的'/'，将url中的'//'变为'/'
  const normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict)

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive
  }

  const record: RouteRecord = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name,
    parent,
    matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props:
      route.props == null
        ? {}
        : route.components
          ? route.props
          : { default: route.props }
  }
//将存在的子路由表添加到pathList, pathMap, nameMap
  if (route.children) {
    route.children.forEach(child => {
      const childMatchAs = matchAs
        ? cleanPath(`${matchAs}/${child.path}`)
        : undefined
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs)
    })
  }
//添加不存的路由信息到pathList, pathMap中
  if (!pathMap[record.path]) {
    pathList.push(record.path)
    pathMap[record.path] = record
  }
//将存在的路由别名添加到pathList, pathMap, nameMap
  if (route.alias !== undefined) {
    const aliases = Array.isArray(route.alias) ? route.alias : [route.alias]
    for (let i = 0; i < aliases.length; ++i) {
      const alias = aliases[i]
      if (process.env.NODE_ENV !== 'production' && alias === path) {
        warn(
          false,
          `Found an alias with the same value as the path: "${path}". You have to remove that alias. It will be ignored in development.`
        )
        // skip in dev to make it work
        continue
      }

      const aliasRoute = {
        path: alias,
        children: route.children
      }
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      )
    }
  }
//将具名的路由添加到对应的nameMap中
  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(
        false,
        `Duplicate named routes definition: ` +
          `{ name: "${name}", path: "${record.path}" }`
      )
    }
  }
}
```

