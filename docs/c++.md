## 扩展

### 文件导入

```c++
#include <string.h> //c语言风格
#include <cstring> //c++风格
```

### 作用域运算符

但局部作用域全局作用域同时声明一个同名变量时，要在局部作用域中使用该变量在全局作用域的值，在变量前使用`::`运算符

```c++
int a = 10;
void test(){
	int a = 20;
    cout<<a<<endl;  //20
    cout<<::a<<endl; //10
}
```

### 命名空间

为了避免变量名称冲突，可以使用关键字`namespace`创建一个命名空间，通过空间名和`::`来使用内部变量。

```c++
namespace A {
	int a = 10;
}
namespace B {
    int a = 20;
}
void test(){
	cout<<A::a<<B::a<<endl;
}
```

> 注：命名空间只能在全局作用域中定义。

#### 命名空间嵌套

```c++
namespace A {
    int a = 10;
    namespace B {
		int a = 20;
    }
}
void test(){
    cout<<A::a<<A::B::a<<endl;
}
```

#### 命名空间合并

同名的命名空间将会合并，适用场景：定义号一个命名空间后，需要再先该命名空间中追加值。

```c++
namespace A {
    int a = 10;
    int b = 20;
}
namespace A {
    int c = 30;
}
void test(){
	cout<<A::a<<A::b<<A::c<<endl;
}
```

#### 命名空间可声明变量和函数

```c++
namespace A {
	int a = 20;
    int test(){
        return 20;
    }
}
```

#### 在命名空间外部定义函数

在定义一个函数时，可以在函数名前使用`空间名::函数名`的形式说明该函数所属的命名空间。

```c++
namespace A {
	int a = 20;
}
void A::test(){
    cout<<a<<endl; //20  同命名空间访问数据不需要加作用域::
}
void run(){
	A::test()  //调用a空间的test函数
}
```

#### 无名空间

使用关键字声明空间时不声明空间名则为无名空间。

```c++
namespace {
    int a = 20;
}
```

#### 命名空间别名

定义一个命名空间后，可以使用关键字`namespace`将该命名空间赋值给一个变量，称为别名。

```c++
namespace A {
    int a = 20;
}
void test(){
	namespace B = A;
    cout<<B::a<<endl; //20
    cout<<A::a<<endl; //20
}
```

#### using

使用`using`时，接下来的代码所使用变量优先访问命名空间存在的，

```c++
namespace A {
	int a = 10;
    int b = 200;
}
void test(){
    int b = 100;
	using namespace A;
    //优先从A命名空间查找变量
    cout<<a<<endl; //10
    cout<<b<<endl; //100,局部变量优先级更高
}
```

> 注：但存在命名空间中的变量和局部变量同名时,局部变量的优先级更高

也可以使用具体的命名空间成员

```c++
namespace A {
	int a = 10;
    int b = 200;
}
void test(){
    int b = 100;
	using  A::a;
    cout<<a<<endl; //10
}
```

