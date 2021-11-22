<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-18 09:45:25
 * @LastEditTime: 2019-09-23 18:29:48
 * @LastEditors: Please set LastEditors
 -->
## 引入方式
### 文件引入

使用`<script>`标签将文件引入到html中,babel.js主要用于编译jsx

```JSX
<script src="https://cdn.staticfile.org/react/16.4.0/umd/react.development.js"></script>
<script src="https://cdn.staticfile.org/react-dom/16.4.0/umd/react-dom.development.js"></script>
<!-- 生产环境中不建议使用 -->
<script src="https://cdn.staticfile.org/babel-standalone/6.26.0/babel.min.js"></script>
<script type='text/babel'>
class App extend React.Component {
   	render(){
				return (
        <> ...</>
        )
    	}                   
   }
ReactDOM.render(
    <App/>
    document.getElementById('root')
);
</script>

```

### import引入

在webpack环境下使用import引入

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
class App extends React.Component {
	render(){
		<>...</>
  }
}
ReactDOM.render(<App/>,document.querySelector(root))
```

## 创建jsx

- 使用 React.createElement

```jsx
const element = React.createElement(
  'h1', //标签名
  {className: 'greeting'},  //属性
  'Hello, world!'  //内容
);
```

- 使用表达式

```jsx
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

## 样式模块化



创建独立的以`.module.css`结尾的文件，在需要使用的文件中引入。

```jsx
//xx.module.css
.boder {
  border: 1px solid #ccc;
}

//xx.jsx
import style from './xx.module.css'

const App=()=>{
  return (<div className={style.border}>局部样式</div>)
}
```



## 组件

### 有状态组件（类组件）

内部可以保存自己的数据，继承于React.Component

#### 创建组件

```jsx
//1. 通过使用class 创建组件
class App extends React.Component {
  constructor(){
    super()
		this.state = {
         name: 'dd'
    }
  }
  render(){
		return null   //不渲染任何内容则返回null
  }
}
//2. 通过function 创建组件
function App(){
  return (<>...</>)
}
// 3. 通过使用createReactClass()创建组件
//需要在组件中定义 getDefaultProps() 函数
//需要提供一个单独的 getInitialState 方法，让其返回初始 state
//调用方法时，不需要像class创建组件那样绑定this
var createReactClass = require('create-react-class')
var App = createReactClass({
  getDefaultProps: function() {
    return {
      name: 'Mary'
    };
  },
  getInitialState: function() {
    return {count: this.props.initialCount};
  },
  
});
```

#### 更改数据

使用this.setState

```jsx
class App extends React.Component {
  constructor(){
    super()
		this.state = {
         name: 'dd'
    }
  }
  handler(){
    //1. 传入一个对象
		this.setState({name: 'cc' })
    //2. 传入对象和回调函数
    this.setState({name: 'cc'},()=>console.log(this.state.name))
  	//3. 传入一个函数,参数state可以获取state中的所有数据，props可以获取this.props上的数据和方法
    thissetState((state,props)=>({name:'cc'}))
  }
  render(){
		return (<>
  			<button onclick={e=>this.handler}/>                                        
    </>)
  }
}
```

### 无状态组件（函数组件）

通过创建一个函数（函数首字母大写），返回内容

```jsx
function App(props){
	return (<>
                      </>)
}
```

### 组件传值

## 事件机制

```jsx
//react中的事件需要解决this问题
//1. 使用bind绑定
//2. 使用箭头函数定义调用事件
//3. 在constructor中绑定
//4. 将事件调用写成箭头函数

class App extend React.Component {
  constructor(){
    super()
    this.fnByC = this.fnByC.bind(this)
  }
  fnByBind(){
			console.log(this)
  }
  fnByArrow=()=>{
    console.log(this)
  }
  fnByC(){
    console.log(this)
  }
  render(){
		return (
    	<>
      	<button	onClick={this.fnByBind.bind(this)}>使用bind绑定</button>
        <button	onClick={this.fnByArrow}>使用箭头函数定义调用事件</button>
      	<button	onClick={this.fnByC}>在constructor中绑定</button>
      	<button	onClick={()=>{console.log(this)}}>事件调用写成箭头函数</button>
      </>
    )
  }
}
```

### 事件传参

```jsx
//react中的事件调用不能加（）,否则就是直接执行该函数
//1.使用bind传参
//2.将事件调用写成箭头函数的形式，在其内容调用传参的函数
class App extend React.Component {
  constructor(){
    super()
  }
  fnByBind(arg){
			console.log(arg)
  }
  fnc(arg){
    console.log(arg)
  }
  render(){
		return (
    	<>
      	<button	onClick={this.fnByBind.bind(this,'这是一个参数')}>使用bind传参</button>
      	<button	onClick={()=>{this.fnc('传递的参数')}}>使用bind传参</button>
      </>
    )
  }
}
```



## props

在组件标签上添加的属性和方法都会通过对象的方式添加组件内部的props或this.props

```jsx
<App name='app' age = '16'>children content</App>
//在有状态组件中使用this.props获取标签上的属性和方法
class App extends React.Component {
	render(){
		<> name:{this.props.name}
       age:{this.props.age}
         {this.props.children}       //children content  
                    </>
  }
}
//在无状态组件中使用参数props
function App(props){
	return (
  	<>name:{props.name}
       age:{props.age}
				{props.children}  //children content
		</>
  )
}
```

> this.props.children或者props.children可以方法组件标签之间的内容

### 默认值设置

#### 函数组件Props默认值设置

```jsx
function App(props){
  return (
       <div> {props.name}</div>
  )
}
App.defaultPorps = {
  name: 'react'
}
```

#### 类组件Props默认值设置

```jsx
class App extend React.Component {
  //第一种设置默认值的方式
  static defaultProps ={
    name: 'react'
  }
  render(){
		return (
    	<div>{this.props.name}{this.props.age}</div>
    )
  }
}
//第二种设置默认值方式
App.defaultProps = {
	age: 18
}
```

### props类型校验

需要引入`prop-types`包，函数组件和类组件使用方式相同。[参考]( https://react.docschina.org/docs/typechecking-with-proptypes.html )

```jsx
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```

## 生命周期函数

### 常用声明周期

- constructor()
- render（）
- componentDidMount()
- componentDidUpdate()
- componentWillUnmount()

### 组件挂载

当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

- constructor()
- static getDerivedStateFromProps(props, state)：应返回一个对象来更新 state，如果返回 null 则不更新任何内容
- render()
- componentDidMount()

### 组件更新

组件的 props 或 state 发生变化时会触发更新，其生命周期调用顺序如下：

- static getDerivedStateFromProps(props, state)：应返回一个对象来更新 state，如果返回 null 则不更新任何内容
- shouldComponentUpdate(nextProps,nextState)：根据此函数的返回值，判断组件是否需要重新渲染
- render()
- getSnapshotBeforeUpdate(prevProps，prevState)：此函数的返回值会传递给componentDidUpdate
- componentDidUpdate(prevProps，prevState，snapshot)

### 组件卸载

当组件从 DOM 中移除时会调用 `componentWillUnmount()`

### 错误处理

当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：

- static getDerivedStateFromError(error)：将抛出的错误作为参数，并返回一个对象来更新 state

```jsx
this.state = { hasError: false }
static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染可以显降级 UI
    return { hasError: true };
  }
```

- componentDidCatch(`error`，`info` )

## 事件处理

在 JavaScript 中，class 的方法默认不会绑定`this`。定义的事件需要在constructor绑定this，或在使用或者定义时使用箭头函数，否则在调用事件时，this的值为undefined

```jsx
class App extends React.Component{
  constructor(){
       super()
       this.state={
				this.clickHandler = this.clickHandler.band(this)
       }
  }
  clickHandler(){
       
  }
	changeHandler(){
	}
	changeHandler2=()=>{

  }
	render(){
		<>
      <button onclick={this.clickHandler}/>    
      <input onChange = {e=>this.changeHandler}/>
      <input onChange = {this.changeHandler2}/>
   </>
  }
}
```

## 条件渲染

- if else
- 三目运算？：
- 与运算&&

## 骨架替换

1. 通过React.lazy(）异步加载一个组件
2. 通过Suspense组件上的fallback属性渲染异步组件未加载前的内容

```jsx
//React.lazy 接受一个函数，这个函数需要动态调用 import()
const OtherComponent = React.lazy(() => import('./OtherComponent'))

//在App组件渲染完成后，OtherComponent组件还没有加载完成，则渲染fallback中的内容
class App extends React.Component {
  render(){
        return (
        <>
    			<Suspense fallback={<div>Loading...</div>}>
        			<OtherComponent />
					</Suspense>
        </>
        )
  }
}
```

## context

使用 context, 可以避免通过中间元素传递 props，就能将值深入传递进组件树；Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据

```jsx
// 1. 创建context,React.createContext(值，操作该值的函数)
const ThemeContext = React.createContext('light')
class App extends React.Component {
	render(){
      //使用一个 Provider 来将当前的 theme 传递给以下的组件树
      return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
      )                
  } 
}
//中间的组件再也不必指明往下传递 theme 了
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}
//使用contextType获取context
class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
    //也可以通过Consumer基于 context 值进行渲染渲染，不需要static contextType = ThemeContext;
    return (
        <ThemeContext.Consumer>
         		{value=>(<Button theme={value} />) }
        </ThemeContext.Consumer>       
    )
  }
}
```

## refs

### 创建ref

#### 使用`React.createRef`

使用 `React.createRef()` 创建，并通过 `ref` 属性附加到 React 元素

```jsx
class App extends React.Component {
  constructor(){
    super(props)
    this.myRef = React.createRef()
	}
  render() {
    return <div ref={this.myRef} />
  }
}
```

通过ref的`current` 属性访问当前绑定的元素

```jsx
//获取ref
this.myRef.current
```

> **不能在函数组件上使用 ref 属性**，因为它们没有实例, 可以**在函数组件内部使用 ref 属性**只要它指向一个 DOM 元素或 class 组件

#### 使用回调函数

通过ref属性接受一个回调函数

```jsx
constructor(){
	this.setTextInputRef = element => {
      this.textInput = element;
    };
}
render(){
  return <input
    type="text"
    ref={this.setTextInputRef}   //this.textInput.current绑定到input
    ref= {el=>this.el = el}	     //this.el.current绑定到input
   />
}
```

#### 使用字符串

```jsx
render(){
  // console.log(this.ref.input)
  return <input
    type="text"
    ref='input'
   />
}
```



### refs转发

Ref 转发是一项将 ref自动地通过组件传递到其一子组件的技巧,使用 `React.forwardRef()`接受一个函数，该函数以props和ref作为参数

```jsx
//1. 调用 React.createRef 创建了一个 React ref 并将其赋值给 ref 变量
const ref = React.createRef();
//2. 指定 ref 为 JSX 属性，将其向下传递给 <FancyButton ref={ref}>
<FancyButton ref={ref}>Click me!</FancyButton>
//3. React 传递 ref 给 fowardRef 内函数 (props, ref) => ...，作为其第二个参数
//4. 向下转发该 ref 参数到 <button ref={ref}>，将其指定为 JSX 属性
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));
//5. 当 ref 挂载完成，ref.current 将指向 <button> DOM 节点
```

## portals

与ReactDOM类似，可以将内容渲染到其他节点中。

## 高阶组件

**高阶组件是参数为组件，返回值为新组件的函数。**（创建一个函数，返回一个组件）

```jsx
function HOC(OtherComponent){
	return class extends React.Component {
          ...
          render(){
						return (<>
                    <OtherComponent {...this.props}></OtherComponent>
                </>)
          }
  }
}
```

**HOC 不应该修改传入组件，而应该使用组合的方式，通过将组件包装在容器组件中实现功能

**不要在 render 方法中使用 HOC

**务必复制静态方法,使用 hoistNonReactStatic（co1,co2）将co2的静态方法复制到co1中

## 路由

### 使用路由

[参考]( https://reacttraining.com/react-router/web/guides/quick-start )

```jsx
// react-native
import { NativeRouter } from "react-router-native";
// react-dom (what we'll use here)
import { BrowserRouter } from "react-router-dom";
const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
    <div>
      <Route path="/dashboard" component={Dashboard} />
    </div>
  </div>
);
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  root
);
```

路由对应组件会在路由定义的位置展示，`<Route/>`同时完成了路由定义和视口展示，相当于Vue中的`router-view`和`router`结合体。

### 嵌套路由

在路由组件中定义子路由

```jsx
const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
    <div>
      <Route path="/dashboard" component={Dashboard} />
    </div>
  </div>
);
function Dashboard(){
  let match = useRouteMatch()
  return (
    <div>
      <Link to={`${match.path}/other`}>Other</Link>
      <Route path={`${match.path}/other`}>
        <Other/>
      </Route>
    </div>	
  )
}
```

### Route

#### Route渲染方式

可以使用`component`,`render`,`children`属性渲染相关内容，也可使用标签的形式。推荐使用标签形式。

```jsx
<Route path="/user/:username" component={User} />
<Route path="/home" render={() => <div>Home</div>} />
<Route path="/:id" children={(props)=><Child />} />
//其他写法
<Route path="/:id"> <Child/> </Route>
```

在行内渲染内容时，推荐使用`render`或者`children`

路由渲染优先级：`children`函数形式 > `component` > `render`函数形式

#### Route属性

##### path

 任何有效URL路径或路径数组 

```jsx
<Route path={["/users/:id", "/profile/:id"]}>
  <User />
</Route>
<Route path="/users/:id">
  <User />
</Route>
```

##### exact

 布尔值，当为`true`时仅在路径与`location.pathname`完全匹配时才匹配。 

|  path  | location.pathname |  exact  | matches? |
| :----: | :---------------: | :-----: | :------: |
| `/one` |    `/one/two`     | `true`  |    no    |
| `/one` |    `/one/two`     | `false` |   yes    |

##### strict

布尔值，当为`true`时 带有斜杠的路径将仅将location.pathname与斜杠相匹配 

|  path  | location.pathname | matches? |
| :----: | :---------------: | :------: |
| `/one` |      `/one`       |   yes    |
| `/one` |      `/one/`      |    no    |
| `/one` |    `/one/two`     |    no    |

##### location

 一个对象，`<Route>`元素尝试将其路径与当前历史记录位置（通常是当前浏览器URL）匹配 ,使用`location` 可以匹配不同路径名

##### sensitive

 布尔值,为true时，如果路径区分大小写，则将匹配。 

|  path  | location.pathname | sensitive | matches? |
| :----: | :---------------: | :-------: | :------: |
| `/one` |      `/one`       |  `true`   |   yes    |
| `/One` |      `/one`       |  `true`   |    no    |
| `/One` |      `/one`       |  `false`  |   yes    |

### Router

 所有路由器组件的通用底层接口。

hashRouter: 使用哈希导航，导航栏路径有`#`号；

browerRouter: 正常url导航，导航栏路径没有`#`号。

### Link

路由跳转组件。

Link:正常的跳转组件。

NavLink: 会这当前link上添加一个`active`类。

### 路由参数

#### params参数

```jsx
function Home(props){
	return (
    	<div>
            <Link to='/detail/1'> 详情</Link>
			<Route path='/detail/:id' component={Detail}></Route>
        </div>
    )
}

function Detail(props){
    let { id } = props.match.params
	return <div>detail {id} <div>
}
```

#### search参数

```jsx
function Home(props){
	return (
    	<div>
            <Link to='/detail/?id=1&name=haha'> 详情</Link>
			<Route path='/detail' component={Detail}></Route>
        </div>
    )
}
import qs from 'querystring'
function Detail(props){
    //将{id:1，age:18}转换id=1&age=18的形式
    //let str = qs.stringify({id:1，age:18})
    
    //将id=1&age=18的形式转换成{id:1，age:18}
    let { id } = qs.parse(props.location.search.slice(1))
	return <div>detail {id} <div>
}
```



#### state参数

页面刷新state参数也存在

```jsx
function Home(props){
	return (
    	<div>
            <Link to={{pathname: '/detail', state={id:1,age: 18} }}> 详情</Link>
			<Route path='/detail' component={Detail}></Route>
        </div>
    )
}
function Detail(props){
    let { id } = props.location.state||{}
	return <div>detail {id} <div>
}
```



### 路由跳转

```jsx
//search传参
props.history.push('/detail?id=1')
props.history.replace('/detail?id=1')

//params传参
props.history.push('/detail/1')
props.history.replace('/detail/1')

//state传参
props.history.push('/detail',{id:1})
props.history.replace('/detail',{id:1})
```



### 路由Hooks

#### [useHistory](https://reacttraining.com/react-router/web/api/Hooks/usehistory)

 可以访问用于导航的历史记录实例 

```jsx
import { useHistory } from "react-router-dom";
function HomeButton() {
  let history = useHistory();
  function handleClick() {
    history.push("/home");
  }
  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}
```

#### [useLocation](https://reacttraining.com/react-router/web/api/Hooks/uselocation)

 返回当前URL的`location`对象

```jsx
function usePageViews() {
  let location = useLocation();
  React.useEffect(() => {
    ga.send(["pageview", location.pathname]);
  }, [location]);
}
```

#### [useParams](https://reacttraining.com/react-router/web/api/Hooks/useparams)

 返回URL参数的键/值对的对象 , 使用它来访问当前`<Route>`的`match.params `

```jsx
function BlogPost() {
  let { slug } = useParams();
  return <div>Now showing post {slug}</div>;
}
```

#### [useRouteMatch](https://reacttraining.com/react-router/web/api/Hooks/useroutematch)



## Hooks

在不编写 class 的情况下使用 state 以及其他的 React 特性

Hook 是一些可以在函数组件里“钩入” React state 及生命周期等特性的函数。

Hook 不能在 class 组件中使用

> 只能在**函数最外层**调用 Hook。不要在循环、条件判断或者子函数中调用
>
> 只能在 **React 的函数组件**中调用 Hook。不要在其他 JavaScript 函数中调用

### useState

在函数组件里调用它来给组件添加一些内部 state。React 会在重复渲染时保留这个 state。

useState（）**定义**一个任意名称的变量和一个修改该变量的函数，传入**唯一参数**作为变量的初始值（任意类型值），**返回**当前定义的变量和修改该变量的函数

```jsx
import React, { useState } from 'react';
function com1(){
  const [data,setData] = useState(0)   //setData函数用于改变data
  return (<>
          	<p>{data}</p>
            <button onClick={e=>setData(99)}>点击改变</button>
          </>)
}
```

声明多个state

```jsx
function example(){
      // 声明多个 state 变量！、
  //使用es6解构
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
    //不使用解构声明state
  const ageState = useState(42);
  const age = ageState[0];
  const setAge = ageState[1]; 
  return null
}
```

### useEffect 

*Effect Hook* 可以在函数组件中执行副作用操作

跟 class 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途

useEffect()告诉 React 组件需要在**渲染后**执行某些操作，默认情况下，在第一次渲染之后*和*每次更新之后都会执行

```jsx
import React, { useState, useEffect } from 'react';
function Example() {
  const [count, setCount] = useState(0);
  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

使用useEffect（）返回一个函数时，该函数会在该组件卸载时执行

```jsx
useEffect(()=>{
 		.... //该部分内容组件每次更新后执行
	return ()=>{...}  //返回函数在组件卸载时执行，在组件卸载前需要执行的操作可以放在该函数内
})
```

> 在一个函数组件中使用多个`useEffect`时，React 将按照 effect 声明的顺序依次调用组件中的*每一个* effect。

向`useEffect（）`中传入一个数组做个第二个参数，`useEffect`会根据数组中指定的数据发生改变才执行

```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```

### 自定义`Hook`

 如果函数的名字以 “`use`” 开头并调用其他 Hook，这是一个自定义 Hook .

```jsx
import React, { useState, useEffect } from 'react';

//自定义Hooks
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}

function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

### 其他`Hook`

####  useContext

```jsx
const value = useContext(MyContext);
```

 接收一个 context 对象（`React.createContext` 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `MyContext` 的 `value` prop 决定。 

```jsx
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);  
  return ( 
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!    
    </button>  );
}
```

####  useReducer

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

 接收一个形如 `(state, action) => newState` 的 reducer，并返回当前的 state 以及与其配套的 `dispatch` 方法。 

```jsx
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

 选择惰性地创建初始 state , 需要将 `init` 函数作为 `useReducer` 的第三个参数传入，这样初始 state 将被设置为 `init(initialArg)`。 

```jsx
function init(initialCount) {  return {count: initialCount};}
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':      return init(action.payload);    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);  
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'reset', payload: initialCount})}>
  			Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

#### useCallback

#### useMemo

####  useRef

#### useImperativeHandle

#### useLayoutEffect

#### useDebugValue

## redux

### reducer

一个函数，用于存储数据

```jsx
const reducer = (state={},action)=>{
		switch(action.type){
      case "1":
        return state.count;
      case "2":
        return {...state,count:1};
      default:
        return state
    }
} 
```

### store

```jsx
import { createStore } from 'redux';
let store = createStore(reducer);
//获取数据
store.getState();
//更新数据
store.dispatch(action)
//监听数据变化，每次dispatch后都会执行
store.subscribe(()=>console.log(store.getState()))
```

### action

```jsx
let action = {
	type: 'count',
  value: 'ddd'
}
store.dispatch(action)
```
### react-redux
#### 使用`Provider`
引入`store`和`Provider`,在尽可能的顶层组件中使用`Provider`,使得该组件下的子组件都能使用`store`
```jsx
import store form 'store'
import { Provider } from 'react-redux'
  ...
ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, document.getElementById('root'));
```
#### 使用`connect`
这需要操作`store`中数据的子组件中，使用`connect`
```jsx
import { connect } from 'react-redux'
function MyApp(props){
  return (
    <>
    {props.name}
    <button onClick={props.changeName}>点击</button>
    </>	
  )
}
const mapState =state=>{
  return {
    name: state.name
  }
}
const mapAction = dispatch=>{
  return {
    changeName(){
      dispatch({
        type: 'changename',
        data: '改变后的值'
      })
    }  
  }
}
export default connect(mapState,mapAction)(MyApp)
```
`mapState`用于获取`store`中的数据,`mapAction`用于改变`store`中的数据,在子组件中使用`props`或`this.props`使用`mapState`和`mapAction`中返回的数据

### redux-thunk

**使dispatch可以发送一个函数,发送异步action**

```jsx
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose} from 'redux';

const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose; 
const enhancer = composeEnhancers(
    //在这里使用后dispatch可以发送一个函数
    applyMiddleware(thunk)
  );
const store = createStore(
  reducer,enhancer
)
export default store


//创建一个发送action的函数，可以发送异步请求，然后将请求数据dispatch
const function func(){
	return (dispatch)=>{
		axios.get('/api/data.json').then(res=>{
        	const action ={
            	type: '....',
            	data: res.data
        	}
			dispatch(action)
        }
    }
} 
    
//在组件中  
const mapDispatch = (dispatch)=>{
	return {
        func2(){
            //在此处发送一个func()
            dispatch(func())
        }
    }	    
}
export default connect(mapState，mapDispatch)(App)
```



## 服务端渲染

## 其他插件

- react-loadable
- xlsx
- react-app-rewired、customize-cra
- antd、antd-mobile
