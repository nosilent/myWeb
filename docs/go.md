## 变量

### 声明变量

```go
//标准声明
var 变量名 变量类型

// 批量声明
var (
    a int
    b string
    c []float32
    d func() bool
    e struct {
        x int
    }
)

// 简短声明
名字 := 表达式
i, j := 0, 1
```

 变量声明以关键字 var 开头，后置变量类型，行尾无须分号。 

**简短模式**有以下限制：

- 定义变量，同时显式初始化。
- 不能提供数据类型。
- 只能用在函数内部。

### 初始化

```go
//标准形式
var 变量名 类型 = 表达式
var hp int = 100

// 推导类型的格式
// 将类型省略，编译器会尝试根据等号右边的表达式推导变量的类型。
var hp = 100

//简短形式
hp := 100
```

> 由于使用了`:=`，而不是赋值的`=`，因此推导声明写法的左值变量必须是没有定义过的变量。若定义过，将会发生编译错误。 

> 在多个短变量声明和赋值中，至少有一个新声明的变量出现在左值中，即便其他变量名可能是重复声明的，编译器也不会报错， 

###  多重赋值 

```go
var a int = 100
var b int = 200
b, a = a, b
```

 多重赋值时，变量的左值和右值按从左到右的顺序赋值。 

### 匿名变量

 匿名变量是一个下画线`_`， “_”本身就是一个特殊的标识符，被称为空白标识符 , 可以像其他标识符那样用于变量的声明或赋值（任何类型都可以赋值给它），但任何赋给这个标识符的值都将被抛弃 。

 不可以使用这个标识符作为变量对其它变量进行赋值或运算 

 匿名变量不占用内存空间，不会分配内存。匿名变量与匿名变量之间也不会因为多次声明而无法使用。 

## 常量

 常量使用关键字 const 定义，用于存储不会改变的数据，常量是在编译时被创建的，即使定义在函数内部也是如此，并且只能是布尔型、数字型（整数型、浮点型和复数）和字符串型 。

### 常量声明

 一个常量的声明也可以包含一个类型和一个值，但是如果没有显式指明类型，那么将从右边的表达式推断类型 

```go
const name [type] = value
//批量声明多个常量
const (
    e  = 2.7182818
    pi = 3.1415926
)
```

 批量声明的常量，除了第一个外其它的常量右边的初始化表达式都可以省略，如果省略初始化表达式则表示使用前面常量的初始化表达式，对应的常量类型也是一样的 

```go
const (
    a = 1
    b
    c = 2
    d
)
fmt.Println(a, b, c, d) // "1 1 2 2"
```

### iota常量生成器

 常量声明可以使用 iota 常量生成器初始化，它用于生成一组以相似规则初始化的常量，但是不用每行都写一遍初始化表达式。在一个 const 声明语句中，在第一个声明的常量所在的行，iota 将会被置为 0，然后在每一个有常量声明的行加一 。

```go
type Weekday int
const (
    Sunday Weekday = iota
    Monday
    Tuesday
    Wednesday
    Thursday
    Friday
    Saturday
)
```

#### 模拟枚举

 iota 不仅可以生成每次增加 1 的枚举值。还可以利用 iota 来做一些强大的枚举常量值生成器 。

```go
const (
    FlagNone = 1 << iota
    FlagRed
    FlagGreen
    FlagBlue
)
fmt.Printf("%d %d %d\n", FlagRed, FlagGreen, FlagBlue)   //2 4 8 十进制输出
fmt.Printf("%b %b %b\n", FlagRed, FlagGreen, FlagBlue)   //10 100 1000 二进制输出
```

### 无类型常量

 六种未明确类型的常量类型，分别是无类型的布尔型、无类型的整数、无类型的字符、无类型的浮点数、无类型的复数、无类型的字符串。 

## 数据类型

基本类型有：

- bool
- string
- int、int8、int16、int32、int64
- uint、uint8、uint16、uint32、uint64、uintptr
- byte // uint8 的别名
- rune // int32 的别名 代表一个 Unicode 码
- float32、float64
- complex64、complex128

### 数值类型

 数值类型分为以下几种：整数、浮点数、复数，有存在有符号和无符号之分。

 例如有符号整数包含 int8、int16、int32、int64 等 ， 无符号 uint8、uint16、uint32 和 uint64 等。

#### 复数声明

 复数是由两个浮点数表示的，其中一个表示实部（real），一个表示虚部（imag）

 复数的类型有两种，分别是 complex128（64 位实数和虚数）和 complex64（32 位实数和虚数），其中 complex128 为复数的默认类型。  

 声明复数的语法格式 :

```go
name := complex(x, y)
```

 x、y 分别表示构成该复数的两个 float64 类型的数值，x 为实部，y 为虚部 

### 布尔类型

 Go语言对于值之间的比较有非常严格的限制，只有两个相同类型的值才可以进行比较 

 布尔值并不会隐式转换为数字值 0 或 1 

 Go语言中不允许将整型强制转换为布尔型 

 布尔型无法参与数值运算，也无法与其他类型进行转换。 

声明一个布尔类型：

```go
var n bool
```

### 字符类型

字符有以下两种：

- 一种是 uint8 类型，或者叫 byte 型，代表了 ASCII 码的一个字符。 

- 另一种是 rune 类型，代表一个 UTF-8 字符，  rune 类型等价于 int32 类型 

#### 字符拼接

使用`+`或 `+=`拼接字符串

```go
str := "Beginning of the string " +
"second part of the string"

s := "hel" + "lo,"
s += "world!"
```

> go语言中必须使用双引号`""`来定义字符串 

#### 定义多行字符串

使用"`"反引号定义一个多行字符串， 在反引号间的所有代码均不会被编译器识别，而只是作为字符串的一部分 

```go
const str = `第一行
第二行
第三行
\r\n
`
```

### 类型转换

 Go语言不存在隐式类型转换，因此所有的类型转换都必须显式的声明 

```go
valueOfTypeB = typeB(valueOfTypeA)
类型 B 的值 = 类型 B(类型 A 的值)
```

#### string与Int类型转换

 Go语言中的 `strconv` 包提供了字符串和基本数据类型之间的转换功能 。

##### Itoa()

函数定义：

```go
func Itoa(i int) string
```

 `Itoa()` 函数用于将 int 类型数据转换为对应的字符串类型 

```go
num := 100
    str := strconv.Itoa(num)
    fmt.Printf("type:%T value:%#v\n", str, str)  //type:string value:"100"
```

##### Atoi()

函数定义：

```go
func Atoi(s string) (i int, err error)
```

` Atoi() `函数用于将字符串类型的整数转换为 int 类型 ,  Atoi() 函数有两个返回值(转换成功的整型， 转换成功为空转换失败为相应的错误信息 )

```go
str1 := "110"
str2 := "s100"
num1, err := strconv.Atoi(str1)
if err != nil {
  fmt.Printf("%v 转换失败！", str1)
} else {
  fmt.Printf("type:%T value:%#v\n", num1, num1) //type:int value:110
}
num2, err := strconv.Atoi(str2)
if err != nil {
  fmt.Printf("%v 转换失败！", str2)
} else {
  fmt.Printf("type:%T value:%#v\n", num2, num2) //s100 转换失败！
}
```

#### Parse系列函数

 Parse 系列函数用于将字符串转换为指定类型的值，其中包括 ParseBool()、ParseFloat()、ParseInt()、ParseUint()。 

 Parse 系列函数都有两个返回值，第一个返回值是转换后的值，第二个返回值为转化失败的错误信息。 

##### ParseBool()

 ParseBool() 函数用于将字符串转换为 bool 类型的值，它只能接受 1、0、t、f、T、F、true、false、True、False、TRUE、FALSE，其它的值均返回错误 。

该函数定义为：

```go
func ParseBool(str string) (value bool, err error)
```

示例：

```go
str1 := "110"
boo1, err := strconv.ParseBool(str1)
```

##### ParseInt()

 ParseInt() 函数用于返回字符串表示的整数值（可以包含正负号） 

函数定义：

```go
func ParseInt(s string, base int, bitSize int) (i int64, err error)
```

- base 指定进制，取值范围是 2 到 36。如果 base 为 0，则会从字符串前置判断，“0x”是 16 进制，“0”是 8 进制，否则是 10 进制 
- bitSize 指定结果必须能无溢出赋值的整数类型，0、8、16、32、64 分别代表 int、int8、int16、int32、int64 
- 返回的 err 是 *NumErr 类型的，如果语法有误，err.Error = ErrSyntax，如果结果超出类型范围 err.Error = ErrRange。 

示例：

```go
str := "-11"
num, err := strconv.ParseInt(str, 10, 0)
```

##### ParseUint()

 ParseUint() 函数的功能类似于 ParseInt() 函数，但 ParseUint() 函数不接受正负号，用于无符号整型 .

函数定义：

```go
func ParseUint(s string, base int, bitSize int) (n uint64, err error)
```

##### ParseFloat()

 ParseFloat() 函数用于将一个表示浮点数的字符串转换为 float 类型 

函数定义：

```go
func ParseFloat(s string, bitSize int) (f float64, err error)
```

-  如果 s 合乎语法规则，函数会返回最为接近 s 表示值的一个浮点数（使用 IEEE754 规范舍入） 
-  bitSize 指定了返回值的类型，32 表示 float32，64 表示 float64； 
-  返回值 err 是 *NumErr 类型的，如果语法有误 err.Error=ErrSyntax，如果返回值超出表示范围，返回值 f 为 ±Inf，err.Error= ErrRange。 

示例：

```go
str := "3.1415926"
num, err := strconv.ParseFloat(str, 64)
```

#### Format系列函数

 Format 系列函数实现了将给定类型数据格式化为字符串类型的功能，其中包括 FormatBool()、FormatInt()、FormatUint()、FormatFloat()。 

#####  FormatBool()

 FormatBool() 函数可以一个 bool 类型的值转换为对应的字符串类型 

函数定义： 

```go
func FormatBool(b bool) string
```

示例：

```go
num := true
str := strconv.FormatBool(num)
fmt.Printf("type:%T,value:%v\n ", str, str)  //type:string,value:true
```

##### FormatInt()

 FormatInt() 函数用于将整型数据转换成指定进制并以字符串的形式返回， 

函数定义：

```go
func FormatInt(i int64, base int) string
```

 其中，参数 i 必须是 int64 类型，参数 base 必须在 2 到 36 之间，返回结果中会使用小写字母“a”到“z”表示大于 10 的数字。 

示例：

```go
var num int64 = 100
str := strconv.FormatInt(num, 16)
fmt.Printf("type:%T,value:%v\n ", str, str)  //type:string,value:64
```

##### FormatUint()

 FormatUint() 函数与 FormatInt() 函数的功能类似，但是参数 i 必须是无符号的 uint64 类型， 

函数定义：

```go
func FormatUint(i uint64, base int) string
```

示例：

```go
var num uint64 = 110
str := strconv.FormatUint(num, 16)
fmt.Printf("type:%T,value:%v\n ", str, str)  //type:string,value:6e
```

##### FormatFloat()

 FormatFloat() 函数用于将浮点数转换为字符串类型 

函数定义：

```go
func FormatFloat(f float64, fmt byte, prec, bitSize int) string
```

-  bitSize 表示参数 f 的来源类型（32 表示 float32、64 表示 float64），会据此进行舍入 
-  fmt 表示格式，可以设置为“f”表示 -ddd.dddd、“b”表示 -ddddp±ddd，指数为二进制、“e”表示 -d.dddde±dd 十进制指数、“E”表示 -d.ddddE±dd 十进制指数、“g”表示指数很大时用“e”格式，否则“f”格式、“G”表示指数很大时用“E”格式，否则“f”格式。 
-  prec 控制精度（排除指数部分）：当参数 fmt 为“f”、“e”、“E”时，它表示小数点后的数字个数；当参数 fmt 为“g”、“G”时，它控制总的数字个数。如果 prec 为 -1，则代表使用最少数量的、但又必需的数字来表示 f。 

示例：

```go
var num float64 = 3.1415926
str := strconv.FormatFloat(num, 'E', -1, 64)
fmt.Printf("type:%T,value:%v\n ", str, str)  //type:string,value:3.1415926E+00
```

#### Append系列函数

 Append 系列函数用于将指定类型转换成字符串后追加到一个切片中，其中包含 AppendBool()、AppendFloat()、AppendInt()、AppendUint()。 

 Append 系列函数和 Format 系列函数的使用方法类似，只不过是将转换后的结果追加到一个切片中。 

### 类型别名

#### 类型别名与类型定义

`类型别名`写法 ：

```go
type newName = Type
```

 `newName`只是 Type 的别名，本质上 `newName`与 Type 是同一个类型 ,使用`newName`和`Type`等效。

类型别名只在代码中存在，编译完成时不会再存在。

`类型定义`写法：

```go
// 将NewInt定义为int类型
type NewInt int
```

 定义类型的方法，通过 type 关键字的定义，`NewInt` 会形成一种新的类型，`NewInt `本身依然具备 int 类型的特性 

### 空值/零值

 在Go语言中，布尔类型的零值（初始值）为 false，数值类型的零值为 0，字符串类型的零值为空字符串`""`，而指针、切片、映射、通道、函数和接口的零值则是 nil。 

**nil特性**：

- nil 标识符是不能比较的

```go
fmt.Println(nil==nil)  // invalid operation: nil == nil (operator == not defined on nil)
```

- nil不是关键字或保留字

- nil没有默认类型

```go
fmt.Printf("%T", nil)  //use of untyped nil
print(nil)
```

- 不同类型nil的指针是一样的

```go
var arr []int
var num *int
fmt.Printf("%p\n", arr)  // 0x0
fmt.Printf("%p", num)  //0x0
```

- 不同类型的nil是不能比较的

```go
var m map[int]string
var ptr *int
fmt.Printf(m == ptr) //invalid operation: arr == ptr (mismatched types []int and *int)
```

- 相同类型的nil值也是不能比较的

```go
var s1 []int
var s2 []int
fmt.Printf(s1 == s2) // invalid operation: s1 == s2 (slice can only be compared to nil)

var s3 []int
fmt.Println(s3 == nil) //true
```

- 不同类型的nil值占用的内存大小可能是不一样的

## 指针

 一个指针变量可以指向任何一个值的内存地址，它所指向的值的内存地址在 32 和 64 位机器上分别占用 4 或 8 个字节，占用字节的大小与所指向的值的大小无关。当一个指针被定义后没有分配到任何变量时，它的默认值为 nil。指针变量通常缩写为 ptr。 

 Go语言中使用在变量名前面添加`&`操作符（前缀）来获取变量的内存地址（取地址操作） 

```go
ptr := &v    // v 的类型为 T
```

 v 代表被取地址的变量，变量 v 的地址使用变量 ptr 进行接收，ptr 的类型为`*T`，称做 T 的指针类型，`*`代表指针 。

### 获取指定指向值

 使用`&`操作符对普通变量进行取地址操作并得到变量的指针后，可以对指针使用`*`操作符，也就是指针取值 。

```go
// 准备一个字符串类型
var house = "Malibu Point 10880, 90265"
// 对字符串取地址, ptr类型为*string
ptr := &house
// 打印ptr的类型
fmt.Printf("ptr type: %T\n", ptr)
// 打印ptr的指针地址
fmt.Printf("address: %p\n", ptr)
// 对指针进行取值操作
value := *ptr
// 取值后的类型
fmt.Printf("value type: %T\n", value)
// 指针取值后就是指向变量的值
fmt.Printf("value: %s\n", value)
```

### 使用指针修改值

```go
// 交换函数
func swap(a, b *int) {
    // 取a指针的值, 赋给临时变量t
    t := *a
    // 取b指针的值, 赋给a指针指向的变量
    *a = *b
    // 将a指针的值赋给b指针指向的变量
    *b = t
}
func main() {
// 准备两个变量, 赋值1和2
    x, y := 1, 2
    // 交换变量值
    swap(&x, &y)
    // 输出变量值
    fmt.Println(x, y)
}
```

 **`*`操作符作为右值时，意义是取指针的值，作为左值时，也就是放在赋值操作符的左边时，表示 指针指向的变量**

**当`*`操作在右值时，就是取指向变量的值，当`*`操作在左值时，就是将值设置给指向的变量。 **

### 创建指针

使用`new`关键词可以创建指针变量

```go
new(类型)

str := new(string)
*str = "Go语言教程"
fmt.Println(*str)
```

## 容器

### 数组

数组是一个由固定长度的特定类型元素组成的序列，一个数组可以由零个或多个元素组成

#### 数组声明

```go
var 数组变量名 [元素数量]Type
```

- 数组变量名：数组声明及使用时的变量名。
- 元素数量：数组的元素数量，可以是一个表达式，但最终通过编译期计算的结果必须是整型数值，元素数量不能含有到运行时才能确认大小的数值。
- Type：可以是任意基本类型，包括数组本身，类型为数组本身时，可以实现多维数组。
  数组的每个元素都可以通过索引下标来访问，索引下标的范围是从 0 开始到数组长度减 1 的位置，内置函数 len() 可以返回数组中元素的个数。
  示例：

```go
var a [3]int             // 定义三个整数的数组
fmt.Println(a[0])        // 打印第一个元素
fmt.Println(a[len(a)-1]) // 打印最后一个元素
```

默认情况下，数组的每个元素都会被初始化为元素类型对应的零值，对于数字类型来说就是 0,同时也可以使用数组字面值语法，用一组值来初始化数组：

```go
var q [3]int = [3]int{1, 2, 3}
var r [3]int = [3]int{1, 2}
fmt.Println(r[2]) // "0"
```

在数组的定义中，如果在数组长度的位置出现“...”省略号，则表示数组的长度是根据初始化值的个数来计算.
**数组的长度需要在编译阶段确定**

#### 数组比较

如果两个数组类型相同（包括数组的长度，数组中元素的类型）的情况下，可以直接通过较运算符（== 和!=）来判断两个数组是否相等，只有当两个数组的所有元素都是相等的时候数组才是相等的，不能比较两个类型不同的数组，否则程序将无法完成编译。

```go
a := [2]int{1, 2}
b := [...]int{1, 2}
c := [2]int{1, 3}
fmt.Println(a == b, a == c, b == c) // "true false false"
d := [3]int{1, 2}
fmt.Println(a == d) // 编译错误：无法比较 [2]int == [3]int
```

#### 多维数组

 声明多维数组 ：

```go
var array_name [size1][size2]...[sizen] array_type
```

 array_name 为数组的名字，array_type 为数组的类型，size1、size2 等等为数组每一维度的长度 。

示例：

```go
// 声明一个二维整型数组，两个维度的长度分别是 4 和 2
var array [4][2]int
// 使用数组字面量来声明并初始化一个二维整型数组
array = [4][2]int{ {10, 11}, {20, 21}, {30, 31}, {40, 41} }
// 声明并初始化数组中索引为 1 和 3 的元素
array = [4][2]int{1: {20, 21}, 3: {40, 41}}
// 声明并初始化数组中指定的元素
array = [4][2]int{1: {0: 20}, 3: {1: 41}}
```

赋值, 只要类型一致，就可以将多维数组互相赋值 

```go
// 声明两个二维整型数组
var array1 [2][2]int
var array2 [2][2]int
// 为array2的每个元素赋值
array2[0][0] = 10
array2[0][1] = 20
array2[1][0] = 30
array2[1][1] = 40
// 将 array2 的值复制给 array1
array1 = array2
```

### 切片

 切片（slice）是对数组的一个连续片段的引用，所以切片是一个引用类型，这个片段可以是整个数组，也可以是由起始和终止索引标识的一些项的子集，需要注意的是，终止索引标识的项不包括在切片内。 

 切片的内部结构包含地址、大小和容量 。

#### 直接声明切片

 每一种类型都可以拥有其切片类型，表示多个相同类型元素的连续集合 

```go
var name []Type
```

 其中 name 表示切片的变量名，Type 表示切片对应的元素类型。 

示例：

``` go
// 声明字符串切片
var strList []string
// 声明整型切片
var numList []int
// 声明一个空切片
var numListEmpty = []int{}
// 输出3个切片
fmt.Println(strList, numList, numListEmpty)  // [] [] []
// 输出3个切片大小
fmt.Println(len(strList), len(numList), len(numListEmpty)) // 0 0 0 
// 切片判定空的结果
fmt.Println(strList == nil)  //true
fmt.Println(numList == nil)   // true
fmt.Println(numListEmpty == nil)  //false
```

 **切片是动态结构，只能与 nil 判定相等，不能互相判定相等。 **

 声明新的切片后，可以使用 `append()`函数向切片中添加元素。

####  从数组或切片生成新的切片

 切片默认指向一段连续内存区域，可以是数组，也可以是切片本身 。

 从连续内存区域生成切片是常见的操作 ：

```go
slice [开始位置 : 结束位置]
```

-  slice：表示目标切片对象； 
-  开始位置：对应目标切片对象的索引； 
-  结束位置：对应目标切片的结束索引。 

从数组生成切片，示例：

```go
var a  = [3]int{1, 2, 3}
fmt.Println(a, a[1:2])  // [1,2,3] [2]
```

 从数组或切片生成新的切片拥有如下**特性** ：

-  取出的元素数量为：结束位置 - 开始位置 
-  取出元素不包含结束位置对应的索引，切片最后一个元素使用 slice[len(slice)] 获取 。
-  当缺省开始位置时，表示从连续区域开头到结束位置 
-  当缺省结束位置时，表示从开始位置到整个连续区域末尾； 
-  两者同时缺省时，与切片本身等效； 
-  两者同时为 0 时，等效于空切片，一般用于切片复位。 

 根据索引位置取切片 slice 元素值时，取值范围是（0～len(slice)-1），超界会报运行时错误，生成切片时，结束位置可以填写 len(slice) 但不会报错。 

#### 使用make()函数构造切片

 如果需要动态地创建一个切片，可以使用 make() 内建函数 

```go
make( []Type, size, cap )
```

 其中 Type 是指切片的元素类型，size 指的是为这个类型分配多少个元素，cap 为预分配的元素数量，这个值设定后不影响 size，只是能提前分配空间，降低多次分配空间造成的性能问题。 

示例：

```go
a := make([]int, 2)
b := make([]int, 2, 10)
fmt.Println(a, b)  //[0 0] [0 0]
fmt.Println(len(a), len(b))  // 2 2
```

使用 make() 函数生成的切片一定发生了内存分配操作。

给定开始与结束位置（包括切片复位）的切片只是将新的切片结构指向已经分配好的内存区域，设定开始与结束位置，不会发生内存分配操作。 

#### 使用append()添加元素

 Go语言的内建函数 append() 可以为切片动态添加元素 

```go
var a []int
a = append(a, 1) // 追加1个元素
a = append(a, 1, 2, 3) // 追加多个元素, 手写解包方式
a = append(a, []int{1,2,3}...) // 追加一个切片, 切片需要解包
```

 在使用 append() 函数为切片动态添加元素时，如果空间不足以容纳足够多的元素，切片就会进行“扩容”，此时新切片的长度会发生改变。 

除了在切片的尾部追加，还可以在切片的开头添加元素 

示例：

```go
var a = []int{1,2,3}
a = append([]int{0}, a...) // 在开头添加1个元素
a = append([]int{-3,-2,-1}, a...) // 在开头添加1个切片
```

 在切片开头添加元素一般都会导致内存的重新分配，而且会导致已有元素全部被复制 1 次，因此，从切片的开头添加元素的性能要比从尾部追加元素的性能差很多 .

#### 切片复制

 内置函数 `copy()` 可以将一个数组切片复制到另一个数组切片中，如果加入的两个数组切片不一样大，就会按照其中较小的那个数组切片的元素个数进行复制 

```go
copy( destSlice, srcSlice []T) int
```

 其中 srcSlice 为数据来源切片，destSlice 为复制的目标（也就是将 srcSlice 复制到 destSlice），目标切片必须分配过空间且足够承载复制的元素个数，并且来源和目标的类型必须一致，copy() 函数的返回值表示实际发生复制的元素个数 

示例：

```go
slice1 := []int{1, 2, 3, 4, 5}
slice2 := []int{5, 4, 3}
copy(slice2, slice1) // 只会复制slice1的前3个元素到slice2中
copy(slice1, slice2) // 只会复制slice2的3个元素到slice1的前3个位置
```

#### 删除切片中的元素

 Go语言并没有对删除切片元素提供专用的语法或者接口，需要使用切片本身的特性来删除元素，根据要删除元素的位置有三种情况，分别是从开头位置删除、从中间位置删除和从尾部删除，其中删除切片尾部的元素速度最快 

```go
a = []int{1, 2, 3}
a = a[1:] // 删除开头1个元素
a = a[N:] // 删除开头N个元素

a = append(a[:0], a[1:]...) // 删除开头1个元素
a = append(a[:0], a[N:]...) // 删除开头N个元素

a = append(a[:i], a[i+1:]...) // 删除中间1个元素
a = append(a[:i], a[i+N:]...) // 删除中间N个元素
a = a[:i+copy(a[i:], a[i+1:])] // 删除中间1个元素
a = a[:i+copy(a[i:], a[i+N:])] // 删除中间N个元素

a = a[:len(a)-1] // 删除尾部1个元素
a = a[:len(a)-N] // 删除尾部N个元素
```

#### 多维切片

语法：

```go
var sliceName [][]...[]sliceType
```

 sliceName 为切片的名字，sliceType为切片的类型，每个`[ ]`代表着一个维度，切片有几个维度就需要几个`[ ]` 

```go
// 声明一个二维整型切片并赋值
slice := [][]int{ {10}, {100, 200} }
```

### map映射

 map 是引用类型，声明 如下

```go
var mapname map[keytype]valuetype
```

 mapname 为 map 的变量名, keytype 为键类型, valuetype 是键对应的值类型 .

>  [keytype] 和 valuetype 之间允许有空格。 

 在声明的时候不需要知道 map 的长度，因为 map 是可以动态增长的，未初始化的 map 的值是 nil，使用函数 len() 可以获取 map 中 pair 的数目。 

示例：

```go
var mapLit map[string]int
var mapAssigned map[string]int
mapLit = map[string]int{"one": 1, "two": 2}
mapAssigned = mapLit
// mapAssigned 是 mapList 的引用，对 mapAssigned 的修改也会影响到 mapLit 的值。 
mapAssigned["two"] = 3

fmt.Printf("Map literal at \"one\" is: %d\n", mapLit["one"]) //1
fmt.Printf("Map assigned at \"two\" is: %d\n", mapLit["two"]) //3
fmt.Printf("Map literal at \"ten\" is: %d\n", mapLit["ten"])  //0

```

#### map容量

 和数组不同，map 可以根据新增的 key-value 动态的伸缩，因此它不存在固定长度或者最大限制，但是也可以选择标明 map 的初始容量 capacity，格式如下： 

```go
make(map[keytype]valuetype, cap)
map2 := make(map[string]float, 100)
```

 当 map 增长到容量上限的时候，如果再增加新的 key-value，map 的大小会自动加 1 

#### 用切片作为map的值

```go
mp1 := make(map[int][]int)
mp2 := make(map[int]*[]int)
```

#### 遍历map

 map 的遍历过程使用 for range 循环完成 

```go
scene := make(map[string]int)
scene["route"] = 66
scene["brazil"] = 4
scene["china"] = 960
for k, v := range scene {
    fmt.Println(k, v)
}
```

#### 删除键值对

 使用 delete() 内建函数从 map 中删除一组键值对，delete() 函数的格式如下 

```go
delete(map, 键)
```

 map 为要删除的 map 实例，键为要删除的 map 中键值对的键。 

示例:

```go
scene := make(map[string]int)
// 准备map数据
scene["route"] = 66
scene["brazil"] = 4
scene["china"] = 960
delete(scene, "brazil")
```

#### 清空map

 Go语言中并没有为 map 提供任何清空所有元素的函数、方法，清空 map 的唯一办法就是重新 make 一个新的 map 

#### sync.map

 sync.Map 和 map 不同，不是以语言原生形态提供，而是在 sync 包下的特殊结构。 

 sync.Map 特性： 

-  无须初始化，直接声明即可 
-  sync.Map 不能使用 map 的方式进行取值和设置等操作，而是使用 sync.Map 的方法进行调用，Store 表示存储，Load 表示获取，Delete 表示删除 
-  使用 Range 配合一个回调函数进行遍历操作，通过回调函数返回内部遍历出来的值，Range 参数中回调函数的返回值在需要继续迭代遍历时，返回 true，终止迭代遍历时，返回 false 

示例：

```go
var scene sync.Map
// 将键值对保存到sync.Map
scene.Store("greece", 97)
scene.Store("london", 100)
scene.Store("egypt", 200)
// 从sync.Map中根据键取值
fmt.Println(scene.Load("london"))
// 根据键删除对应的键值对
scene.Delete("london")
// 遍历所有sync.Map中的键值对
scene.Range(func(k, v interface{}) bool {
  fmt.Println("iterate:", k, v)
  return true
})
```

> sync.Map 没有提供获取 map 数量的方法，替代方法是在获取 sync.Map 时遍历自行计算数量，sync.Map 为了保证并发安全有一些性能损失，因此在非并发情况下，使用 map 相比使用 sync.Map 会有更好的性能。 

### list列表

 列表是一种非连续的存储容器，由多个节点组成，节点通过一些变量记录彼此之间的关系，列表有多种实现方法，如单链表、双链表等。 

 在Go语言中，列表使用 container/list 包来实现，内部的实现原理是双链表，列表能够高效地进行任意位置的元素插入和删除操作。 

#### 初始化列表

 list 的初始化有两种方法：分别是使用 New() 函数和 var 关键字声明，两种方法的初始化效果都是一致的。 

```go
//通过 container/list 包的 New() 函数初始化 list
变量名 := list.New()

//通过 var 关键字声明初始化 list
var 变量名 list.List
```

 列表并没有具体元素类型的限制 .

#### 插入值

 双链表支持从队列前方或后方插入元素，分别对应的方法是` PushFront `和` PushBack `

```go
l := list.New()
l.PushBack("fist")  //从尾部插入
l.PushFront(67)  //从头部插入
```

插值方法：

| 方  法                                                | 功  能                                            |
| ----------------------------------------------------- | ------------------------------------------------- |
| InsertAfter(v interface {}, mark * Element) * Element | 在 mark 点之后插入元素，mark 点由其他插入函数提供 |
| InsertBefore(v interface {}, mark * Element) *Element | 在 mark 点之前插入元素，mark 点由其他插入函数提供 |
| PushBackList(other *List)                             | 添加 other 列表元素到尾部                         |
| PushFrontList(other *List)                            | 添加 other 列表元素到头部                         |

#### 删除值

 列表插入函数的返回值会提供一个 *list.Element 结构，这个结构记录着列表元素的值以及与其他节点之间的关系等信息，从列表中删除元素时，需要用到这个结构进行快速删除。 

使用remove()删除值

```go
l := list.New()
// 尾部添加
l.PushBack("canon")
// 头部添加
l.PushFront(67)
// 尾部添加后保存元素句柄
element := l.PushBack("fist")
// 使用remove删除列表中对应的元素
l.Remove(element)
```

#### 遍历

 遍历双链表需要配合 **Front() 函数获取头元素**，遍历时只要元素不为空就可以继续进行，每一次遍历都会调用元素的 Next() 函数 

```go
l := list.New()
// 尾部添加
l.PushBack("canon")
// 头部添加
l.PushFront(67)
for i := l.Front(); i != nil; i = i.Next() {
    fmt.Println(i.Value) //67 canon
}
```

## 流程控制

### 分支结构if else

关键字 if 是用于测试某个条件（布尔型或逻辑型）的语句，如果该条件成立，则会执行 if 后由大括号{}括起来的代码块，否则就忽略该代码块继续执行后续的代码,如果存在第二个分支，则可以在上面代码的基础上添加 else 关键字以及另一代码块，
关键字 if 和 else 之后的左大括号{必须和关键字在同一行，如果使用了 else if 结构，则前段代码块的右大括号}必须和 else if 关键字在同一行，这两条规则都是被编译器强制规定的。
在有些情况下，**条件语句**两侧的括号是可以被省略的，当条件比较复杂时，则可以使用括号让代码更易读，在使用 &&、|| 或 ! 时可以使用括号来提升某个表达式的运算优先级，并提高代码的可读性。
特性写法：可以在 if 表达式之前添加一个执行语句，再根据变量值进行判断

```go
if err := Connect(); err != nil {
    fmt.Println(err)
    return
}
```

Connect 是一个带有返回值的函数，err:=Connect() 是一个语句，执行 Connect 后，将错误保存到 err 变量中。
这种写法可以将返回值与判断放在一行进行处理，而且返回值的作用范围被限制在 if、else 语句组合中。

### 循环结构

Go语言中的循环语句只支持 for 关键字, for 后面的条件表达式不需要用圆括号()括起来

```go
sum := 0
for i := 0; i < 10; i++ {
    sum += i
}
```

考虑到无限循环的场景,直接简化为:

```go
sum := 0
for {
    sum++
    if sum > 100 {
        break
    }
}
```

使用循环语句时，需要注意的有以下几点：

- 左花括号{必须与 for 处于同一行。
- 允许在循环条件中定义和初始化变量
- 支持 continue 和 break 来控制循环，但是它提供了一个更高级的 break，可以选择中断哪一个循环

```go
for j := 0; j < 5; j++ {
    for i := 0; i < 10; i++ {
        if i > 5 {
            break JLoop
        }
        fmt.Println(i)
    }
}
JLoop:
// ...
```

break 语句终止的是 JLoop 标签处的外层循环。

#### 初始语句

初始语句是在第一次循环前执行的语句，一般使用初始语句执行变量初始化，如果变量在此处被声明，其作用域将被局限在这个 for 的范围内。
初始语句可以被忽略，但是初始语句之后的分号必须要写，

```go
step := 2
for ; step > 0; step-- {
    fmt.Println(step)
}
```

#### 条件表达式

- 结束循环时带可执行语句的无限循环

```go
var i int
// 忽略条件表达式，但是保留结束语句
for ; ; i++ {
    if i > 10 {
        break
    }
}
```

- 无限循环

```go
var i int
// 忽略 for 的所有语句，此时 for 执行无限循环。
for {
    if i > 10 {
        break
    }
    i++
}
```

无限循环在收发处理中较为常见，但需要无限循环有可控的退出方式来结束循环。

-  只有一个循环条件的循环

```go
var i int
//进一步简化代码，将 if 判断整合到 for 中
//类似于其他编程语言中的 while，在 while 后添加一个条件表达式，满足条件表达式时持续循环，否则结束循环。
for i <= 10 {
    i++
}
```

#### 键值循环

for range 结构是Go语言特有的一种的迭代结构，for range 可以遍历数组、切片、字符串、map 及通道（channel），for range 语法上类似于其它语言中的 foreach 语句，
语法如下：

```go
for key, val := range coll {
    ...
}
```

val 始终为集合中对应索引的值拷贝，因此它一般只具有只读性质，对它所做的任何修改都不会影响到集合中原有的值
for range 遍历的返回值规律：

- 数组、切片、字符串返回索引和值。
- map 返回键和值。
- 通道（channel）只返回通道内的值。

##### 遍历数组、切片

```go
for key, value := range []int{1, 2, 3, 4} {
    fmt.Printf("key:%d  value:%d\n", key, value)
}
```

key 和 value 分别代表切片的下标及下标对应的值

##### 遍历字符串

通过 for range 的组合，对字符串进行遍历，遍历时，key 和 value 分别代表字符串的索引和字符串中的每一个字符。

```go
var str = "hello 你好"
for key, value := range str {
    fmt.Printf("key:%d value:0x%x\n", key, value)
}
```

变量 value，实际类型是 rune 类型，以十六进制打印出来就是字符的编码。

#### 遍历map

map 类型来说，for range 遍历时，key 和 value 分别代表 map 的索引键 key 和索引对应的值，一般被称为 map 的键值对

```go
m := map[string]int{
    "hello": 100,
    "world": 200,
}
for key, value := range m {
    fmt.Println(key, value)
}
```

对 map 遍历时，遍历输出的键值是无序的，如果需要有序的键值对输出，需要对结果进行排序。

#### 遍历通道

for range 可以遍历通道（channel），但是通道在遍历时，只输出一个值，即管道内的类型对应的数据。

```go
//创建了一个整型类型的通道
c := make(chan int)
go func() {
//往通道中推送数据 1、2、3，然后结束并关闭通道
    c <- 1
    c <- 2
    c <- 3
    close(c)
}()
for v := range c {
    fmt.Println(v)
}
```

### switch

Go语言改进了 switch 的语法设计，case 与 case 之间是独立的代码块，不需要通过 break 语句跳出当前 case 代码块以避免执行到下一行

```go
var a = "hello"
switch a {
case "hello":
    fmt.Println(1)
case "world":
    fmt.Println(2)
default:
    fmt.Println(0)
}
```

#### 一分支多值

将多个case放在一起,不同的 case 表达式使用逗号分隔。

```go
var a = "mum"
switch a {
case "mum", "daddy":
    fmt.Println("family")
}
```

#### 分支表达式

case 后不仅仅只是常量，还可以和 if 一样添加表达式,这种情况的 switch 后面不再需要跟判断变量

```go
var r int = 11
switch {
case r > 10 && r < 20:
    fmt.Println(r)
}
```

#### fallthrough

在Go语言中 case 是一个独立的代码块，执行完毕后不会像C语言那样紧接着执行下一个 case,为了兼容一些移植代码，依然加入了 fallthrough 关键字来实现这一功能

```go
var s = "hello"
switch {
case s == "hello":
    fmt.Println("hello")
    fallthrough
case s != "world":
    fmt.Println("world")
}
```

### 退出循环(goto,break,continue)

#### goto

goto 语句通过标签进行代码间的无条件跳转，同时 goto 语句在快速跳出循环、避免重复退出上也有一定的帮助

- 退出多层循环
  在多层循环中，使用传统的编码方式需要连续退出多层循环，goto 语句可以进行优化

```go
for x := 0; x < 10; x++ {
    for y := 0; y < 10; y++ {
        if y == 2 {
            // 跳转到标签
            goto breakHere
        }
    }
}
// 手动返回, 避免执行进入标签,
return
// 标签,如果不手动返回，在不满足条件时，也会执行下列代码
breakHere:
    fmt.Println("done")
```

- 集中处理错误
  多处错误处理存在代码重复时是非常棘手的

```go
err := firstCheckError()
if err != nil {
    fmt.Println(err)
    exitProcess()
    return
}
err = secondCheckError()
if err != nil {
    fmt.Println(err)
    exitProcess()
    return
}

// 使用goto
err := firstCheckError()
if err != nil {
    goto onExit
}
err = secondCheckError()
if err != nil {
    goto onExit
}
fmt.Println("done")
return
onExit:
    fmt.Println(err)
    exitProcess()
```

#### break

Go语言中 break 语句可以结束 for、switch 和 select 的代码块，另外 break 语句还可以在语句后面添加标签，表示退出某个标签对应的代码块，标签要求必须定义在对应的 for、switch 和 select 的代码块上。

```go
OuterLoop:
    for i := 0; i < 2; i++ {
        for j := 0; j < 5; j++ {
            switch j {
            case 2:
                fmt.Println(i, j)
                break OuterLoop
            case 3:
                fmt.Println(i, j)
                break OuterLoop  //退出 OuterLoop 对应的循环之外
            }
        }
    }
}
```

#### continue

Go语言中 continue 语句可以结束当前循环，开始下一次的循环迭代过程，仅限在 for 循环内使用，在 continue 语句后添加标签时，表示开始标签对应的循环

```go
OuterLoop:
    for i := 0; i < 2; i++ {
        for j := 0; j < 5; j++ {
            switch j {
            case 2:
                fmt.Println(i, j)
                continue OuterLoop  //结束当前循环，开启下一次的外层循环
            }
        }
    }
```

## 函数

在Go语言中，函数的基本组成为：关键字 func、函数名、参数列表、返回值、函数体和返回语句
Go语言里面拥三种类型的函数：

- 普通的带有名字的函数
- 匿名函数或者 lambda 函数
- 方法

### 函数定义

函数声明包括函数名、形式参数列表、返回值列表（可省略）以及函数体。

```go
func 函数名(形式参数列表)(返回值列表){
    函数体
}
```

形式参数列表描述了函数的参数名以及参数类型，这些参数作为局部变量，其值由参数调用者提供，返回值列表描述了函数返回值的变量名以及类型，如果函数返回一个无名变量或者没有返回值，返回值列表的括号是可以省略的。
一个函数声明不包括返回值列表，那么函数体执行完毕后，不会返回任何值
一个函数在声明时，包含返回值列表，那么该函数必须以 return 语句结尾，除非函数明显无法运行到结尾处，如调用了 panic 异常或函数中存在无限循环
在函数调用时，Go语言没有默认参数值，也没有任何方法可以通过参数名指定形参，
在函数中，实参通过值传递的方式进行传递，因此函数的形参是实参的拷贝，对形参进行修改不会影响实参，如果实参包括引用类型，实参可能会由于函数的间接引用被修改

### 返回值

Go语言支持多返回值，多返回值能方便地获得函数执行后的多个返回参数，

- 同一类型
  如果返回值是同一种类型，则用括号将多个返回值类型括起来，用逗号分隔每个返回值的类型。
  使用 return 语句返回时，值列表的顺序需要与函数声明的返回值类型一致

```go
func typedTwoValues() (int, int) {
    return 1, 2
}
func main() {
    a, b := typedTwoValues()
    fmt.Println(a, b)
}
```

- 带有变量名的返回值
  Go语言支持对返回值进行命名，这样返回值就和参数一样拥有参数变量名和类型,命名的返回值变量的默认值为类型的默认值。

```go
func namedRetValues() (a, b int) {
    a = 1
    b = 2
    //可以在 return 中不填写返回值列表,如果填写也是可行的
    return
}
```

同一种类型返回值和命名返回值两种形式只能二选一，混用时将会发生编译错误。

### 函数调用

函数调用格式

```go
返回值变量列表 = 函数名(参数列表)
result := add(1,1)
```

### 匿名函数

匿名函数没有函数名只有函数体，函数可以作为一种类型被赋值给函数类型的变量，匿名函数也往往以变量方式传递
匿名函数是指不需要定义函数名的一种函数实现方式，由一个不带函数名的函数声明和函数体组成

#### 定义匿名函数

格式如下：

```go
func(参数列表)(返回参数列表){
    函数体
}
```

- 定义时调用匿名函数
  匿名函数可以在声明后调用

```go
func(data int) {
    fmt.Println("hello", data)
}(100)
```

- 将匿名函数赋值给变量
  匿名函数可以用于赋值

```go
// 将匿名函数体保存到f()中
f := func(data int) {
    fmt.Println("hello", data)
}
// 使用f()调用
f(100)
```

#### 作为回调函数

```go
// 遍历切片的每个元素, 通过给定函数进行元素访问
func visit(list []int, f func(int)) {
    for _, v := range list {
        f(v)
    }
}
// 使用匿名函数打印切片内容
visit([]int{1, 2, 3, 4}, func(v int) {
    fmt.Println(v)
})
```

### 实现接口

```go
// 调用器接口
type Invoker interface {
    // 需要实现一个Call()方法
    Call(interface{})
}
```

这个接口需要实现 Call() 方法，调用时会传入一个 interface{} 类型的变量，这种类型的变量表示任意类型的值

#### 结构体实现接口

```go
// 结构体类型
type Struct struct {
}
// 实现Invoker的Call
func (s *Struct) Call(p interface{}) {
    fmt.Println("from struct", p)
}

// 声明接口变量
var invoker Invoker
// 实例化结构体
s := new(Struct)
// 将实例化的结构体赋值到接口
invoker = s
// 使用接口调用实例化结构体的方法Struct.Call
invoker.Call("hello")
```

#### 函数实现接口

函数的声明不能直接实现接口，需要将函数定义为类型后，使用类型实现结构体，当类型方法被调用时，还需要调用函数本体。

```go
// 函数定义为类型
type FuncCaller func(interface{})
// 实现Invoker的Call
func (f FuncCaller) Call(p interface{}) {
    // 调用f()函数本体
    f(p)
}

// 声明接口变量
var invoker Invoker
// 将匿名函数转为FuncCaller类型, 再赋值给接口
invoker = FuncCaller(func(v interface{}) {
    fmt.Println("from function", v)
})
// 使用接口调用FuncCaller.Call, 内部会调用函数本体
invoker.Call("hello")
```

### 闭包

闭包是引用了自由变量的函数，被引用的自由变量和函数一同存在，即使已经离开了自由变量的环境也不会被释放或者删除，在闭包中可以继续使用这个自由变量。

```go
函数 + 引用环境 = 闭包
```

函数是编译期静态的概念，而闭包是运行期动态的概念。

#### 在闭包内部修改引用的变量

闭包对它作用域上部的变量可以进行修改，修改引用的变量会对变量进行实际修改。

```go
// 准备一个字符串
str := "hello world"
// 创建一个匿名函数
foo := func() {
   
    // 匿名函数中访问str
    str = "hello dude"
}
// 调用匿名函数
foo()
```

### 可变参数

可变参数是指函数传入的参数个数是可变的，需要将函数定义为可以接受可变参数的类型

```go
//函数 myfunc() 接受不定数量的参数，这些参数的类型全部是 int
func myfunc(args ...int) {
    for _, arg := range args {
        fmt.Println(arg)
    }
}
```

形如...type格式的类型只能作为函数的参数类型存在，并且必须是最后一个参数。类型`...type`本质上是一个数组切片，也就是[]type

#### 任一类型的可变参数

如果希望传任意类型，可以指定类型为 interface{}

```go
func MyPrintf(args ...interface{}) {
    for _, arg := range args {
        switch arg.(type) {
            case int:
                fmt.Println(arg, "is an int value.")
            case string:
                fmt.Println(arg, "is a string value.")
            case int64:
                fmt.Println(arg, "is an int64 value.")
            default:
                fmt.Println(arg, "is an unknown type.")
        }
    }
}
func main() {
    var v1 int = 1
    var v2 int64 = 234
    var v3 string = "hello"
    var v4 float32 = 1.234
    MyPrintf(v1, v2, v3, v4)
}
```

#### 在多个可变参数函数中传递参数

可变参数变量是一个包含所有参数的切片，如果要将这个含有可变参数的变量传递给下一个可变参数函数，可以在传递时给可变参数变量后面添加`...`，这样就可以将切片中的元素进行传递，而不是传递可变参数变量本身。

```go
func print(slist ...interface{}) {
    // 将slist可变参数切片完整传递给下一个函数
    rawPrint(slist...)
}
```

可变参数使用...进行传递与切片间使用 append 连接是同一个特性。

### defer

Go语言的 defer 语句会将其后面跟随的语句进行延迟处理，在 defer 归属的函数即将返回时，将延迟处理的语句按 defer 的逆序进行执行，也就是说，先被 defer 的语句最后被执行，最后被 defer 的语句，最先被执行。

#### 多个延迟执行语句的处理顺序

当有多个 defer 行为被注册时，它们会以逆序执行（类似栈，即后进先出）

```go
fmt.Println("defer begin")
// 将defer放入延迟调用栈
defer fmt.Println(1)
defer fmt.Println(2)
// 最后一个放入, 位于栈顶, 最先调用
defer fmt.Println(3)
fmt.Println("defer end")

//输出
defer begin
defer end
3
2
1
```

代码的延迟顺序与最终的执行顺序是反向的

#### 释放资源

- 使用延迟并发解锁

```go
var (
    // 一个演示用的映射
    valueByKey      = make(map[string]int)
    // 保证使用映射时的并发安全的互斥锁
    valueByKeyGuard sync.Mutex
)
//不使用defer
// 根据键读取值
func readValue(key string) int {
    // 对共享资源加锁
    valueByKeyGuard.Lock()
    // 取值
    v := valueByKey[key]
    // 对共享资源解锁
    valueByKeyGuard.Unlock()
    // 返回值
    return v
}

//使用defer
func readValue(key string) int {
    valueByKeyGuard.Lock()
    // defer后面的语句不会马上调用, 而是延迟到函数结束时调用
    defer valueByKeyGuard.Unlock()
    return valueByKey[key]
}
```

#### 使用延迟释放文件句柄

```go
// 根据文件名查询其大小
func fileSize(filename string) int64 {
    // 根据文件名打开文件, 返回文件句柄和错误
    f, err := os.Open(filename)
    // 如果打开时发生错误, 返回文件大小为0
    if err != nil {
        return 0
    }
    // 取文件状态信息
    info, err := f.Stat()
    // 如果获取信息时发生错误, 关闭文件并返回文件大小为0
    if err != nil {
        f.Close()
        return 0
    }
    // 取文件大小
    size := info.Size()
    // 关闭文件
    f.Close()
    // 返回文件大小
    return size
}
//使用defer
func fileSize(filename string) int64 {
    f, err := os.Open(filename)
    if err != nil {
        return 0
    }
    // 延迟调用Close, 此时Close不会被调用
    defer f.Close()
    info, err := f.Stat()
    if err != nil {
        // defer机制触发, 调用Close关闭文件
        return 0
    }
    size := info.Size()
    // defer机制触发, 调用Close关闭文件
    return size
}
```

### test功能测试函数

Go语言自带了 testing 测试包，可以进行自动化的单元测试，输出结果验证，并且可以测试性能。

#### 测试规则

要开始一个单元测试，需要准备一个 go 源码文件，在命名文件时文件名必须以_test.go结尾，单元测试源码文件可以由多个测试用例（可以理解为函数）组成，每个测试用例的名称需要以 Test 为前缀，如：

```go
func TestXxx( t *testing.T ){
    //......
}
```

注意:

- 测试用例文件不会参与正常源码的编译，不会被包含到可执行文件中
- 测试用例的文件名必须以_test.go结尾
- 需要使用 import 导入 testing 包
- 测试函数的名称要以Test或Benchmark开头，后面可以跟任意字母组成的字符串，但第一个字母必须大写,一个测试用例文件中可以包含多个测试函数
- 单元测试则以(t `*testing.T`)作为参数，性能测试以(t `*testing.B`)做为参数
- 测试用例文件使用go test命令来执行，源码中不需要 main() 函数作为入口，所有以_test.go结尾的源码文件内以Test开头的函数都会自动执行
  Go语言的 testing 包提供了三种测试方式，分别是单元（功能）测试、性能（压力）测试和覆盖率测试。

#### 单元（功能）测试

在同一文件夹下创建两个Go语言文件，分别命名为 demo.go 和 demo_test.go

```go
//demo.go
package demo
// 根据长宽获取面积
func GetArea(weight int, height int) int {
    return weight * height
}

//demo_test.go
package demo
import "testing"
func TestGetArea(t *testing.T) {
    area := GetArea(40, 50)
    if area != 2000 {
        t.Error("测试失败")
    }
}

//执行
PS D:\code> go test -v
```

#### 性能（压力）测试

```go
//demo_test.go
package demo
import "testing"
func BenchmarkGetArea(t *testing.B) {
    for i := 0; i < t.N; i++ {
        GetArea(40, 50)
    }
}

//执行:
PS D:\code> go test -bench="."
```

#### 覆盖率测试

覆盖率测试能知道测试程序总共覆盖了多少业务代码,可以的话最好是覆盖100%。

```go
// demo_test.go
package demo
import "testing"
func TestGetArea(t *testing.T) {
    area := GetArea(40, 50)
    if area != 2000 {
        t.Error("测试失败")
    }
}
func BenchmarkGetArea(t *testing.B) {
    for i := 0; i < t.N; i++ {
        GetArea(40, 50)
    }
}

//执行：
PS D:\code> go test -cover
```

## 结构体

成员(字段)特性: 

- 字段拥有自己的类型和值；
- 字段名必须唯一；
- 字段的类型也可以是结构体，甚至是字段所在结构体的类型。

### 声明

使用关键字 **type** 可以将各种基本类型定义为自定义类型，基本类型包括整型、字符串、布尔等。结构体是一种复合的基本类型，通过 type 定义为自定义类型后，使结构体更便于使用。

```go
type 类型名 struct {
    字段1 字段1类型
    字段2 字段2类型
    …
}
```

示例：

```go
type Point struct {
    X int
    Y int
}
//同类型的变量也可以写在一行
type Color struct {
    R, G, B byte
}
```

### 实例化

#### 基本实例化

结构体本身是一种类型，可以像整型、字符串等类型一样，以 var 的方式声明结构体即可完成实例化。

基本示例化格式：

```go
var ins T
```

示例：

```go
type Point struct {
    X int
    Y int
}
var p Point
p.X = 10
p.Y = 20
```

#### 使用new实例化

使用 new 关键字对类型（包括结构体、整型、浮点数、字符串等）进行实例化，结构体在实例化后会形成指针类型的结构体。

格式：

```go
ins := new(T)
```

示例： 

```go
type Player struct{
    Name string
    HealthPoint int
    MagicPoint int
}
tank := new(Player)
tank.Name = "Canon"
tank.HealthPoint = 300
```

经过 new 实例化的结构体实例在成员赋值上与基本实例化的写法一致。

#### 使用&实例化

对结构体进行`&`取地址操作时，视为对该类型进行一次 new 的实例化操作。

格式： 

```go
ins := &T{}
```

示例： 

```go
type Command struct {
    Name    string    // 指令名称
    Var     *int      // 指令绑定的变量
    Comment string    // 指令的注释
}
var version int = 1
cmd := &Command{}
cmd.Name = "version"
cmd.Var = &version
cmd.Comment = "show version"
```

### 初始化

#### 使用键值对初始化

结构体可以使用“键值对”（Key value pair）初始化字段，每个“键”（Key）对应结构体中的一个字段，键的“值”（Value）对应字段需要初始化的值。

键值对的填充是可选的，不需要初始化的字段可以不填入初始化列表中。

结构体实例化后字段的默认值是字段类型的默认值，例如 ，数值为 0、字符串为 ""（空字符串）、布尔为 false、指针为 nil 等。

格式：

```go
ins := 结构体类型名{
    字段1: 字段1的值,
    字段2: 字段2的值,
    …
}
```

键值之间以`:`分隔，键值对之间以`,`分隔。

示例：

```go
type People struct {
    name  string
    child *People
}
relation := &People{
    name: "爷爷",
    child: &People{
        name: "爸爸",
        child: &People{
                name: "我",
        },
    },
}
```

#### 使用列表初始化

在“键值对”初始化的基础上忽略“键”，也就是说，可以使用多个值的列表初始化结构体的字段。

格式:

```go
ins := 结构体类型名{
    字段1的值,
    字段2的值,
    …
}
```

使用这种格式初始化时，需要注意：

- 必须初始化结构体的所有字段。
- 每一个初始值的填充顺序必须与字段在结构体中的声明顺序一致。
- 键值对与值列表的初始化形式不能混用。

示例：

```go
type Address struct {
    Province    string
    City        string
    ZipCode     int
    PhoneNumber string
}
addr := Address{
    "四川",
    "成都",
    610000,
    "0",
}
fmt.Println(addr)
```

#### 匿名结构体初始化

匿名结构体没有类型名称，无须通过 type 关键字定义就可以直接使用。

匿名结构体的初始化写法由结构体定义和键值对初始化两部分组成，结构体定义时没有结构体类型名，只有字段和类型定义，键值对初始化部分由可选的多个键值对组成

格式：

```go
ins := struct {
    // 匿名结构体字段定义
    字段1 字段类型1
    字段2 字段类型2
    …
}{
    // 字段值初始化
    初始化字段1: 字段1的值,
    初始化字段2: 字段2的值,
    …
}
```

示例：

```go
// 实例化一个匿名结构体
msg := &struct {  // 定义部分
    id   int
    data string
}{  // 值初始化部分
    1024,
    "hello",
}
```

### 接收器

Go 方法是作用在接收器（receiver）上的一个函数，接收器是某种类型的变量，因此方法是一种特殊类型的函数。

接收器根据接收器类型分为指针接收器和非指针接收器。

接收器的类型可以是任何类型，不仅仅是结构体，任何类型都可以拥有方法，但必须是通过type定义的类型。

格式：

```go
func (接收器变量 接收器类型) 方法名(参数列表) (返回参数) {
    函数体
}
```

示例：

```go
// 定义结构体
type Property struct {
    value int  // 属性值
}
// 设置属性值
//指针类型接收器
func (p *Property) SetValue(v int) {
    // 修改p的成员变量
    p.value = v
}
// 取属性值
//指针类型接收器
func (p *Property) Value() int {
    return p.value
}
func main() {
    // 实例化属性
    p := new(Property)
    // 设置值
    p.SetValue(100)
    // 打印值
    fmt.Println(p.Value())
}
```

### 结构体内嵌模拟继承

在结构体内嵌入其他结构体变量，使该结构体实例也具有嵌入的结构体中的属性。

```go
// 可飞行的
type Flying struct{}
func (f *Flying) Fly() {
    fmt.Println("can fly")
}
// 可行走的
type Walkable struct{}
func (f *Walkable) Walk() {
    fmt.Println("can calk")
}
// 人类
type Human struct {
    Walkable // 人类能行走
}
// 鸟类
type Bird struct {
    Walkable // 鸟类能行走
    Flying   // 鸟类能飞行
}

// 实例化鸟类
b := new(Bird)
fmt.Println("Bird: ")
b.Fly()
b.Walk()
// 实例化人类
h := new(Human)
fmt.Println("Human: ")
h.Walk()
```

## 程序崩溃

### 宕机

宕机不是一件很好的事情，可能造成体验停止、服务中断

#### 手动触发宕机

Go语言可以在程序中手动触发宕机，让程序崩溃，这样开发者可以及时地发现错误，同时减少可能的损失。在宕机时，会将堆栈和 goroutine 信息输出到控制台

```go
func main() {
//一个内建的函数 panic() 就可以造成崩溃,参数可以是任意类型的。
    panic("crash")
}
```

#### 在宕机时触发延迟执行语句

当 panic() 触发的宕机发生时，panic() 后面的代码将不会被运行，但是在 panic() 函数前面已经运行过的 defer 语句依然会在宕机发生时发生作用

```go
defer fmt.Println("宕机后要做的事情1")
defer fmt.Println("宕机后要做的事情2")
panic("宕机")
```

#### 宕机恢复

Recover 是一个Go语言的内建函数，可以让进入宕机流程中的 goroutine 恢复过来，recover 仅在延迟函数 defer 中有效。
在正常的执行过程中，调用 recover 会返回 nil 并且没有其他任何效果，如果当前的 goroutine 陷入恐慌，调用 recover 可以捕获到 panic 的输入值，并且恢复正常的执行。
Go语言没有异常系统，其使用 panic 触发宕机类似于其他语言的抛出异常，recover 的宕机恢复机制就对应其他语言中的 try/catch 机制。

```go
// 崩溃时需要传递的上下文信息
type panicContext struct {
    function string // 所在函数
}
// 保护方式允许一个函数
func ProtectRun(entry func()) {
    // 延迟处理的函数
    defer func() {
        // 发生宕机时，获取panic传递的上下文并打印
        err := recover()
        switch err.(type) {
        case runtime.Error: // 运行时错误
            fmt.Println("runtime error:", err)
        default: // 非运行时错误
            fmt.Println("error:", err)
        }
    }()
    entry()
}
// 允许一段手动触发的错误
ProtectRun(func() {
    fmt.Println("手动宕机前")
    // 使用panic传递上下文
    panic(&panicContext{
        "手动触发panic",
    })
    fmt.Println("手动宕机后")
})
```

panic 和 recover 的组合有如下特性:

- 有 panic 没 recover，程序宕机。
- panic 也有 recover，程序不会宕机，执行完对应的 defer 后，从宕机点退出当前函数后继续执行。

## 接口

### 接口声明

格式：

```go
type 接口类型名 interface{
    方法名1( 参数列表1 ) 返回值列表1
    方法名2( 参数列表2 ) 返回值列表2
    …
}
```

接口类型名：使用 type 将接口定义为自定义的类型名。

方法名：当方法名首字母是大写时，且这个接口类型名首字母也是大写时，这个方法可以被接口所在的包（package）之外的代码访问。

参数列表、返回值列表：参数列表和返回值列表中的参数变量名可以被忽略

示例：

```go
type Writer interface {
    Write(p []byte) (n int, err error)
}

type Stringer interface {
    String() string
}
```

### 接口实现

实现关系在Go语言中是隐式的。两个类型之间的实现关系不需要在代码中显式地表示出来。Go语言中没有类似于 implements 的关键字。 Go编译器将自动在需要的时候检查两个类型之间的实现关系。

#### 接口的方法与实现接口的类型方法格式一致

在类型中添加与接口签名一致的方法就可以实现该方法。签名包括方法中的名称、参数列表、返回参数列表。

```go
// 定义一个数据写入器
type DataWriter interface {
    WriteData(data interface{}) error
}
// 定义文件结构，用于实现DataWriter
type file struct {
}
// 实现DataWriter接口的WriteData方法
func (d *file) WriteData(data interface{}) error {
    // 模拟写入数据
    fmt.Println("WriteData:", data)
    return nil
}

func main() {
    // 实例化file
    f := new(file)
    // 声明一个DataWriter的接口
    var writer DataWriter
    // 将接口赋值f，也就是*file类型
    writer = f
    // 使用DataWriter接口进行数据写入
    writer.WriteData("data")
}
```

#### 接口中所有方法均被实现

当一个接口中有多个方法时，只有这些方法都被实现了，接口才能被正确编译并使用。

```go
// 定义一个数据写入器
type DataWriter interface {
    WriteData(data interface{}) error
    // 能否写入
    CanWrite() bool
    
// 定义文件结构，用于实现DataWriter
type file struct {
}
// 实现DataWriter接口的WriteData方法
func (d *file) WriteData(data interface{}) error {
    // 模拟写入数据
    fmt.Println("WriteData:", data)
    return nil
}

func main() {
    // 实例化file
    f := new(file)
    // 声明一个DataWriter的接口
    var writer DataWriter
    // 将接口赋值f，也就是*file类型
    writer = f
    // 使用DataWriter接口进行数据写入
    writer.WriteData("data")
}
```

新增 CanWrite() 方法，返回 bool。需要在 file 中实现 CanWrite() 方法才能正常使用 DataWriter()。

### 类型与接口关系

在Go语言中类型和接口之间有一对多和多对一的关系。

#### 一个类型可以实现多个接口

一个类型可以同时实现多个接口，而接口间彼此独立，不知道对方的实现。

```go
type Writer interface {
    Write(p []byte) (n int, err error)
}
type Closer interface {
    Close() error
}

type Socket struct {
}
func (s *Socket) Write(p []byte) (n int, err error) {
    return 0, nil
}
func (s *Socket) Close() error {
    return nil
}
```

#### 多个类型实现相同接口

```go
// 一个服务需要满足能够开启和写日志的功能
type Service interface {
    Start()  // 开启服务
    Log(string)  // 日志输出
}
// 日志器
type Logger struct {
}
// 实现Service的Log()方法
func (g *Logger) Log(l string) {
}
// 游戏服务
type GameService struct {
    Logger  // 嵌入日志器
}
// 实现Service的Start()方法
func (g *GameService) Start() {
}
```

### 类型断言

类型断言（Type Assertion）是一个使用在接口值上的操作，用于检查接口类型变量所持有的值是否实现了期望的接口或者具体的类型。

格式：

```go
value, ok := x.(T)
```

x 表示一个接口的类型，T 表示一个具体的类型（也可为接口类型）。

示例：

```go
var x interface{}
x = "Hello"
value := x.(int)
fmt.Println(value)
```

### 接口嵌套

一个接口可以包含一个或多个其他的接口，这相当于直接将这些内嵌接口的方法列举在外层接口中一样。只要接口的所有方法被实现，则这个接口中的所有嵌套接口的方法均可以被调用。

```go
type Writer interface {
    Write(p []byte) (n int, err error)
}
type Closer interface {
    Close() error
}
type WriteCloser interface {
    Writer
    Closer
}
```

### 接口与类型间的转换

Go语言中使用接口断言（type assertions）将接口转换成另外一个接口，也可以将接口转换为另外的类型。

实现某个接口的类型同时实现了另外一个接口，此时可以在两个接口间转换。

```go
// 定义飞行动物接口
type Flyer interface {
    Fly()
}
// 定义行走动物接口
type Walker interface {
    Walk()
}
// 定义鸟类
type bird struct {
}
// 实现飞行动物接口
func (b *bird) Fly() {
    fmt.Println("bird: fly")
}
// 为鸟添加Walk()方法, 实现行走动物接口
func (b *bird) Walk() {
    fmt.Println("bird: walk")
}
// 定义猪
type pig struct {
}
// 为猪添加Walk()方法, 实现行走动物接口
func (p *pig) Walk() {
    fmt.Println("pig: walk")
}
func main() {
// 创建动物的名字到实例的映射
    animals := map[string]interface{}{
        "bird": new(bird),
        "pig":  new(pig),
    }
    // 遍历映射
    for name, obj := range animals {
        // 判断对象是否为飞行动物
        f, isFlyer := obj.(Flyer)
        // 判断对象是否为行走动物
        w, isWalker := obj.(Walker)
        fmt.Printf("name: %s isFlyer: %v isWalker: %v\n", name, isFlyer, isWalker)
        // 如果是飞行动物则调用飞行动物接口
        if isFlyer {
            f.Fly()
        }
        // 如果是行走动物则调用行走动物接口
        if isWalker {
            w.Walk()
        }
    }
}
```

### 空接口

空接口是接口类型的特殊形式，空接口没有任何方法，因此任何类型都无须实现空接口。

空接口的内部实现保存了对象的类型和指针。使用空接口保存一个数据的过程会比直接用数据对应类型的变量保存稍慢。

#### 将值保存到空接口中

```go
var any interface{}
any = 1
fmt.Println(any)   //1
any = "hello"
fmt.Println(any)   //hello
any = false
fmt.Println(any)   //false
```

#### 从空接口获取值

保存到空接口的值，如果直接取出指定类型的值时，会发生编译错误。

```go
// 声明a变量, 类型int, 初始值为1
var a int = 1
// 声明i变量, 类型为interface{}, 初始值为a, 此时i的值变为1
var i interface{} = a
// 声明b变量, 尝试赋值i
var b int = i   //报错
var b int = i.(int)   //使用断言的形式获取值
```

#### 空接口值比较

特性：

1. 类型不同的空接口间的比较结果不相同

2. 不能比较空接口中的动态值

保存有类型不同的值的空接口进行比较时，Go语言会优先比较值的类型。因此类型不同，比较结果也是不相同的

```go
// a保存整型
var a interface{} = 100
// b保存字符串
var b interface{} = "hi"
// 两个空接口不相等
fmt.Println(a == b)   //false
```

当接口中保存有动态类型的值时，运行时将触发错误

```go
// c保存包含10的整型切片
var c interface{} = []int{10}
// d保存包含20的整型切片
var d interface{} = []int{20}
// 这里会发生崩溃
fmt.Println(c == d)
```

### error接口

#### 基本用法

 创建一个 error 最简单的方法就是调用 `errors.New` 函数，它会根据传入的错误信息返回一个新的 error 。

```go
import (
    "errors"
    "fmt"
    "math"
)
func Sqrt(f float64) (float64, error) {
    if f < 0 {
        return -1, errors.New("math: square root of negative number")
    }
    return math.Sqrt(f), nil
}
func main() {
    result, err := Sqrt(-13)
    if err != nil {
        fmt.Println(err)
    } else {
        fmt.Println(result)
    }
}
```

#### 自定义错误类型

 使用 error 接口自定义一个 Error() 方法，来返回自定义的错误信息。 

```go
import (
    "fmt"
    "math"
)
type dualError struct {
    Num     float64
    problem string
}
func (e dualError) Error() string {
    return fmt.Sprintf("Wrong!!!,because \"%f\" is a negative number", e.Num)
}
func Sqrt(f float64) (float64, error) {
    if f < 0 {
        return -1, dualError{Num: f}
    }
    return math.Sqrt(f), nil
}
func main() {
    result, err := Sqrt(-13)
    if err != nil {
        fmt.Println(err)
    } else {
        fmt.Println(result)
    }
}
```

## package

### 基本概念

任何源代码文件必须属于某个包，同时源码文件的第一行有效代码必须是`package pacakgeName `语句，通过该语句声明自己所在的包。 

 Go语言的包借助了目录树的组织形式，一般包的名称就是其源文件所在目录的名称，不强制要求包名必须和其所在的目录名同名。

包可以定义在很深的目录中，包名的定义是不包括目录路径的，但是包在引用时一般使用全路径引用。

比如在`GOPATH/src/a/b/ `下定义一个包 c。在包 c 的源码中只需声明为`package c`，而不是声明为`package a/b/c`，但是在导入 c 包时，需要带上路径，例如`import "a/b/c"`。 

习惯用法：

- 包名一般是小写的，使用一个简短且有意义的名称。
- 包名一般要和所在的目录同名，也可以不同，包名中不能包含`- `等特殊符号。
- 包一般使用域名作为目录名称，这样能保证包名的唯一性，比如 GitHub 项目的包一般会放到`GOPATH/src/github.com/userName/projectName `目录下。
- 包名为 main 的包为应用程序的入口包，编译不包含 main 包的源码文件时不会得到可执行文件。
- 一个文件夹下的所有源码文件只能属于同一个包，同样属于同一个包的源码文件不能放在多个文件夹下。

### 导入

 要在代码中引用其他包的内容，需要使用 import 关键字导入使用的包。 

语法：

```go
import "包的路径"
```

说明：

import 导入语句通常放在源码文件开头包声明语句的下面；

导入的包名需要使用双引号包裹起来；

包名是从`GOPATH/src/ `后开始计算的，使用`/ `进行路径分隔。



包的导入有两种写法，分别是单行导入和多行导入。 

```go
//单行导入
import "包 1 的路径"
import "包 2 的路径"

//导入
import (
    "包 1 的路径"
    "包 2 的路径"
)
```

### 导入路径

 包的引用路径有两种写法，分别是全路径导入和相对路径导入。 

#### 全路径导入

 包的绝对路径就是`GOROOT/src/`或`GOPATH/src/`后面包的存放路径 

```go
import "lab/test"    //其源码位于GOPATH/src/lab/test 目录下
import "database/sql/driver"  //源码位于GOROOT/src/database/sql/driver 目录下
import "database/sql"  //源码位于GOROOT/src/database/sql 目录下
```

#### 相对路径导入

相对路径只能用于导入`GOPATH `下的包，标准包的导入只能使用全路径导入。 

例如包 a 的所在路径是`GOPATH/src/lab/a`，包 b 的所在路径为`GOPATH/src/lab/b`，如果在包 b 中导入包 a ，则可以使用相对路径导入方式 

```go
// 相对路径导入
import "../a"

// 全路径导入
import "lab/a"
```

### 引用格式

 包的引用有四种格式：标准引用格式，自定义别名引用格式，省略引用格式，匿名引用格式

#### 标准引用格式

```go
import "fmt"
```

#### 自定义别名引用格式

 在导入包的时候，可以为导入的包设置别名

```go
import F "fmt"
```

 其中 F 就是` fmt` 包的别名，使用时可以使用`F.`来代替标准引用格式的`fmt.`来作为前缀使用 fmt 包中的方法。 

示例：

```go
package main
import F "fmt"
func main() {
    F.Println("go语言")
}
```

#### 省略引用格式

```go
import . "fmt"
```

 这种格式相当于把 fmt 包直接合并到当前程序中，在使用 fmt 包内的方法是可以不用加前缀`fmt.`，直接引用。 

示例：

```go
package main
import . "fmt"
func main() {
    //不需要加前缀 fmt.
    Println("go语言")
}
```

####  匿名引用格式

在引用某个包时，如果只是希望执行包初始化的 init 函数，而不使用包内部的数据时，可以使用匿名引用格式。

```go
import _ "fmt"
```

使用标准格式引用包，但是代码中却没有使用包，编译器会报错。如果包中有 init 初始化函数，则通过`import _ "包的路径" `这种方式引用包，仅执行包的初始化函数，即使包没有 init 初始化函数，也不会引发编译器报错。 

一个包可以有多个 init 函数，包加载时会执行全部的 init 函数，但并不能保证执行顺序。

### 包加载

在执行 main 包的 mian 函数之前， Go 引导程序会先对整个程序的包进行初始化。 

初始化特点：

- 包初始化程序从 main 函数引用的包开始，逐级查找包的引用，直到找到没有引用其他包的包，最终生成一个包引用的有向无环图。 

- Go 编译器会将有向无环图转换为一棵树，然后从树的叶子节点开始逐层向上对包进行初始化。
- 单个包的初始化过程如上图所示，先初始化常量，然后是全局变量，最后执行包的 init 函数。

### 封装

封装就是把抽象出来的字段和对字段的操作封装在一起，数据被保护在内部，程序的其它包只能通过被授权的方法，才能对字段进行操作。 

封装的好处：

- 隐藏实现细节；
- 可以对数据进行验证，保证数据安全合理。

如何体现封装： 

- 对结构体中的属性进行封装；
- 通过方法，包，实现封装。

封装的实现步骤： 

- 将结构体、字段的首字母小写；
- 给结构体所在的包提供一个工厂模式的函数，首字母大写，类似一个构造函数；
- 提供一个首字母大写的 Set 方法（类似其它语言的 public），用于对属性判断并赋值；
- 提供一个首字母大写的 Get 方法（类似其它语言的 public），用于获取属性的值。

### 常见内置包

####  fmt

fmt 包实现了格式化的标准输入输出，这与C语言中的 printf 和 scanf 类似。其中的 fmt.Printf() 和 fmt.Println() 是开发者使用最为频繁的函数。
格式化短语派生于C语言，一些短语（%- 序列）是这样使用：

####  io

这个包提供了原始的 I/O 操作界面。它主要的任务是对 os 包这样的原始的 I/O 进行封装，增加一些其他相关，使其具有抽象功能用在公共的接口上。

#### bufio

bufio 包通过对 io 包的封装，提供了数据缓冲功能，能够一定程度减少大块数据读写带来的开销。

#### sort

sort 包提供了用于对切片和用户定义的集合进行排序的功能。

####  strconv

strconv 包提供了将字符串转换成基本数据类型，或者从基本数据类型转换为字符串的功能。

#### os

os 包提供了不依赖平台的操作系统函数接口，设计像 Unix 风格，但错误处理是 go 风格，当 os 包使用时，如果失败后返回错误类型而不是错误数量。

####  sync

sync 包实现多线程中锁机制以及其他同步互斥机制。

#### flag

flag 包提供命令行参数的规则定义和传入参数解析的功能。绝大部分的命令行程序都需要用到这个包。

####  encoding/json

JSON 目前广泛用做网络程序中的通信格式。encoding/json 包提供了对 JSON 的基本支持，比如从一个对象序列化为 JSON 字符串，或者从 JSON 字符串反序列化出一个具体的对象等。

#### html/template

主要实现了 web 开发中生成 html 的 template 的一些函数。

####  net/http

net/http 包提供 HTTP 相关服务，主要包括 http 请求、响应和 URL 的解析，以及基本的 http 客户端和扩展的 http 服务。
通过 net/http 包，只需要数行代码，即可实现一个爬虫或者一个 Web 服务器，这在传统语言中是无法想象的。

####  reflect

reflect 包实现了运行时反射，允许程序通过抽象类型操作对象。通常用于处理静态类型 interface{} 的值，并且通过 Typeof 解析出其动态类型信息，通常会返回一个有接口类型 Type 的对象。

#### os/exec

os/exec 包提供了执行自定义 linux 命令的相关实现。

#### strings 

strings 包主要是处理字符串的一些函数集合，包括合并、查找、分割、比较、后缀检查、索引、大小写处理等等。

#### bytes 

bytes 包提供了对字节切片进行读写操作的一系列函数。字节切片处理的函数比较多，分为基本处理函数、比较函数、后缀检查函数、索引函数、分割函数、大小写处理函数和子切片处理函数等。

####  log

log 包主要用于在程序中输出日志。

### 自定义包

自定义的包需要将其放在 GOPATH 的 src 目录下（也可以是 src 目录下的某个子目录），而且两个不同的包不能放在同一目录下，这样会引起编译错误。 

一个包中可以有任意多个文件，文件的名字也没有任何规定（但后缀必须是 .go），假设包名就是 .go 的文件名（如果一个包有多个 .go 文件，则其中会有一个 .go 文件的文件名和包名相同）。 

示例：

1 在 GOPATH 下的 src 目录中新建一个 demo 文件夹 ，并在 demo 文件夹下创建 demo.go 文件 

```go
package demo
import (
    "fmt"
)
func PrintStr() {
    fmt.Println("go语言")
}
```

2  在 GOPATH 下的 src 目录中新建一个 main 文件夹，并在 main 文件夹下创建 mian.go 文件 

```go
package main
import (
    "demo"
)
func main() {
    demo.PrintStr()
}
```

注意事项：

- 如果项目的目录不在 GOPATH 环境变量中，则需要把项目移到 GOPATH 所在的目录中，或者将项目所在的目录设置到 GOPATH 环境变量中，否则无法完成编译；
- 使用 import 语句导入包时，使用的是包所属文件夹的名称；
- 包中的函数名第一个字母要大写，否则无法在外部调用；
- 自定义包的包名不必与其所在文件夹的名称保持一致，但为了便于维护，建议保持一致；
- 调用自定义包时使用 `包名 . 函数名` 的方式，如上例：demo.PrintStr()。

### init函数

每个包可以有`init`函数，包在使用时会自动调用改函数，

Go 语言包会从 main 包开始检查其引用的所有包，每个包也可能包含其他的包。Go 编译器由此构建出一个树状的包引用关系，再根据引用顺序决定编译顺序，依次编译这些包的代码。

在运行时，被最后导入的包会最先初始化并调用 init() 函数。 

 特性 ：

- 每个源码可以使用 1 个 init() 函数。
- init() 函数会在程序执行前（main() 函数执行前）被自动调用。
- 调用顺序为 main() 中引用的包，以深度优先顺序初始化。

 假设有这样的包引用关系：main→A→B→C，那么这些包的 init() 函数调用顺序为： 

```go
C.init→B.init→A.init→main
```

说明：

- 同一个包中的多个 init() 函数的调用顺序不可预期。
- init() 函数不能被其他函数调用。

### sync包与锁

sync 包里提供了互斥锁 Mutex 和读写锁 RWMutex 用于处理并发过程中可能出现同时两个或多个协程（或线程）读或写同一个变量的情况。 

锁是 sync 包中的核心，它主要有两个方法，分别是加锁（Lock）和解锁（Unlock）。 

在并发的情况下，多个线程或协程同时其修改一个变量，使用锁能保证在某一时间内，只有一个协程或线程修改这一变量。 

#### 互斥锁

互斥锁中其有两个方法可以调用 ：

```gp
func (m *Mutex) Lock()
func (m *Mutex) Unlock()
```

示例：

```go
import (
    "fmt"
    "sync"
    "time"
)
func main() {
    var a = 0
    var lock sync.Mutex
    for i := 0; i < 1000; i++ {
        go func(idx int) {
            lock.Lock()
            defer lock.Unlock()
            a += 1
            fmt.Printf("goroutine %d, a=%d\n", idx, a)
        }(i)
    }
    // 等待 1s 结束主程序
    // 确保所有协程执行完
    time.Sleep(time.Second)
}
```

一个互斥锁只能同时被一个 goroutine 锁定，其它 goroutine 将阻塞直到互斥锁被解锁（重新争抢对互斥锁的锁定） 。

#### 读写锁

读写锁有如下四个方法 ：

- 写操作的锁定和解锁分别是`func (*RWMutex) Lock`和`func (*RWMutex) Unlock`；

- 读操作的锁定和解锁分别是`func (*RWMutex) Rlock`和`func (*RWMutex) RUnlock`。

读写锁的区别 ：

- 当有一个 goroutine 获得写锁定，其它无论是读锁定还是写锁定都将阻塞直到写解锁；
- 当有一个 goroutine 获得读锁定，其它读锁定仍然可以继续；
- 当有一个或任意多个读锁定，写锁定将等待所有读锁定解锁之后才能够进行写锁定。

总结：

- 同时只能有一个 goroutine 能够获得写锁定；
- 同时可以有任意多个 gorouinte 获得读锁定；
- 同时只能存在写锁定或读锁定（读和写互斥）。



### 正则表达式包

正则表达式是由普通字符（例如字符 a 到 z）以及特殊字符（称为"元字符"）构成的文字序列，可以是单个的字符、字符集合、字符范围、字符间的选择或者所有这些组件的任意组合。

#### 字符

| 语法     | 说明                                                         | 表达式示例 | 匹配结果          |
| -------- | ------------------------------------------------------------ | ---------- | ----------------- |
| 一般字符 | 匹配自身                                                     | abc        | abc               |
| .        | 匹配任意除换行符"\n"外的字符， 在 DOTALL 模式中也能匹配换行符 | a.c        | abc               |
| \        | 转义字符，使后一个字符改变原来的意思； 如果字符串中有字符 * 需要匹配，可以使用 \* 或者字符集［*]。 | a\.c a\\c  | a.c a\c           |
| [...]    | 字符集（字符类），对应的位置可以是字符集中任意字符。 字符集中的字符可以逐个列出，也可以给出范围，如 [abc] 或 [a-c]， 第一个字符如果是 ^ 则表示取反，如 [^abc] 表示除了abc之外的其他字符。 | a[bcd]e    | abe 或 ace 或 ade |
| \d       | 数字：[0-9]                                                  | a\dc       | a1c               |
| \D       | 非数字：[^\d]                                                | a\Dc       | abc               |
| \s       | 空白字符：[<空格>\t\r\n\f\v]                                 | a\sc       | a c               |
| \S       | 非空白字符：[^\s]                                            | a\Sc       | abc               |
| \w       | 单词字符：[A-Za-z0-9]                                        | a\wc       | abc               |
| \W       | 非单词字符：[^\w]                                            | a\Wc       | a c               |

#### 数量词

| 语法  | 说明                                                         | 表达式示例 | 匹配结果     |
| ----- | ------------------------------------------------------------ | ---------- | ------------ |
| *     | 匹配前一个字符 0 或无限次                                    | abc*       | ab 或 abccc  |
| +     | 匹配前一个字符 1 次或无限次                                  | abc+       | abc 或 abccc |
| ?     | 匹配前一个字符 0 次或 1 次                                   | abc?       | ab 或 abc    |
| {m}   | 匹配前一个字符 m 次                                          | ab{2}c     | abbc         |
| {m,n} | 匹配前一个字符 m 至 n 次，m 和 n 可以省略，若省略 m，则匹配 0 至 n 次； 若省略 n，则匹配 m 至无限次 | ab{1,2}c   | abc 或 abbc  |

#### 边界匹配

| 语法 | 说明                                         | 表达式示例 | 匹配结果 |
| ---- | -------------------------------------------- | ---------- | -------- |
| ^    | 匹配字符串开头，在多行模式中匹配每一行的开头 | ^abc       | abc      |
| $    | 匹配字符串末尾，在多行模式中匹配每一行的末尾 | abc$       | abc      |
| \A   | 仅匹配字符串开头                             | \Aabc      | abc      |
| \Z   | 仅匹配字符串末尾                             | abc\Z      | abc      |
| \b   | 匹配 \w 和 \W 之间                           | a\b!bc     | a!bc     |
| \B   | [^\b]                                        | a\Bbc      | abc      |

#### 逻辑分组

| 语法            | 说明                                                         | 表达式示例             | 匹配结果       |
| --------------- | ------------------------------------------------------------ | ---------------------- | -------------- |
| \|              | \| 代表左右表达式任意匹配一个，优先匹配左边的表达式          | abc\|def               | abc 或 def     |
| (...)           | 括起来的表达式将作为分组，分组将作为一个整体，可以后接数量词 | (abc){2}               | abcabc         |
| (?P`<name>`...) | 分组，功能与 (...) 相同，但会指定一个额外的别名              | (?P`<id>`abc){2}       | abcabc         |
| \<number>       | 引用编号为 `<number>` 的分组匹配到的字符串                   | (\d)abc\1              | 1abe1 或 5abc5 |
| (?P=name)       | 引用别名为` <name>` 的分组匹配到的字符串                     | (?P`<id>`\d)abc(?P=id) | 1abe1 或 5abc5 |

#### 特殊构造

| 语法      | 说明                                                         | 表达式示例        | 匹配结果         |
| --------- | ------------------------------------------------------------ | ----------------- | ---------------- |
| (?:...)   | (…) 的不分组版本，用于使用 "\|" 或后接数量词                 | (?:abc){2}        | abcabc           |
| (?iLmsux) | iLmsux 中的每个字符代表一种匹配模式，只能用在正则表达式的开头，可选多个 | (?i)abc           | AbC              |
| (?#...)   | # 后的内容将作为注释被忽略。                                 | abc(?#comment)123 | abc123           |
| (?=...)   | 之后的字符串内容需要匹配表达式才能成功匹配                   | a(?=\d)           | 后面是数字的 a   |
| (?!...)   | 之后的字符串内容需要不匹配表达式才能成功匹配                 | a(?!\d)           | 后面不是数字的 a |
| (?<=...)  | 之前的字符串内容需要匹配表达式才能成功匹配                   | (?<=\d)a          | 前面是数字的a    |
| (?<!...)  | 之前的字符串内容需要不匹配表达式才能成功匹配                 | (?<!\d)a          | 前面不是数字的a  |

#### 示例

匹配指定类型的字符串

```go
import (
    "fmt"
    "regexp"
)
func main() {
    buf := "abc azc a7c aac 888 a9c  tac"
    //解析正则表达式，如果成功返回解释器
    reg1 := regexp.MustCompile(`a.c`)
    if reg1 == nil {
        fmt.Println("regexp err")
        return
    }
    //根据规则提取关键信息
    result1 := reg1.FindAllStringSubmatch(buf, -1)
    fmt.Println("result1 = ", result1)  //result1 =  [[abc] [azc] [a7c] [aac] [a9c]]　
}
```

### time包

时间一般包含时间值和时区， time 包的源码：

```go
type Time struct {
    wall uint64  //表示距离公元 1 年 1 月 1 日 00:00:00UTC 的秒数；
    ext  int64   //表示纳秒
    loc *Location  //代表时区，主要处理偏移量，不同的时区，对应的时间不一样
}
```

`time.UTC：UTC`: 时间

`time.Local`：本地时间

#### 时间获取

通过` time.Now() `函数来获取当前的时间对象

```go
package main
import (
    "fmt"
    "time"
)
func main() {
    now := time.Now() //获取当前时间
    fmt.Printf("current time:%v\n", now)
    year := now.Year()     //年
    month := now.Month()   //月
    day := now.Day()       //日
    hour := now.Hour()     //小时
    minute := now.Minute() //分钟
    second := now.Second() //秒
    fmt.Printf("%d-%02d-%02d %02d:%02d:%02d\n", year, month, day, hour, minute, second)
    
    timestamp1 := now.Unix()     //时间戳
    timestamp2 := now.UnixNano() //纳秒时间戳
    fmt.Printf("现在的时间戳：%v\n", timestamp1)
    fmt.Printf("现在的纳秒时间戳：%v\n", timestamp2)
    
    week := now.Weekday().String()    //获取星期几
    fmt.Printf("现在是：%v\n", week)
}
```

 `time.Unix()` 函数可以将时间戳转为时间格式

#### 时间操作函数

- `add`: 返回时间点 t + 时间间隔 d 的值

```go
now := time.Now()
later := now.Add(time.Hour) // 当前时间加1小时后的时间
fmt.Println(later)
```

- `Sub`: 求两个时间之间的差值

```go
func (t Time) Sub(u Time) Duration
```

- `equal`: 判断两个时间是否相同,该函数会考虑时区的影响，因此不同时区标准的时间也可以正确比较，还会比较地点和时区信息

```go
func (t Time) Equal(u Time) bool
```

- `before`:判断一个时间点是否在另一个时间点之前,如果 t 代表的时间点在 u 之前，则返回真，否则返回假

```go
func (t Time) Before(u Time) bool
```

- `After`：判断一个时间点是否在另一个时间点之后,如果 t 代表的时间点在 u 之后，则返回真，否则返回假。

```go
func (t Time) After(u Time) bool
```

#### 定时器

使用 `time.Tick`(时间间隔) 可以设置定时器，定时器的本质上是一个通道（channel）

```go
package main
import (
    "fmt"
    "time"
)
func main() {
    ticker := time.Tick(time.Second) //定义一个1秒间隔的定时器
    for i := range ticker {
        fmt.Println(i) //每秒都会执行的任务
    }
}
```

#### 时间格式化

时间类型有一个自带的 Format 方法进行格式化，Go语言中格式化时间模板不是常见的`Y-m-d H:M:S `，而是使用Go语言的诞生时间 2006 年 1 月 2 号 15 点 04 分 05 秒。

```go
package main
import (
    "fmt"
    "time"
)
func main() {
    now := time.Now()
    // 格式化的模板为Go的出生时间2006年1月2号15点04分 Mon Jan
    // 24小时制
    fmt.Println(now.Format("2006-01-02 15:04:05.000 Mon Jan"))
    // 12小时制
    fmt.Println(now.Format("2006-01-02 03:04:05.000 PM Mon Jan"))
    fmt.Println(now.Format("2006/01/02 15:04"))
    fmt.Println(now.Format("15:04 2006/01/02"))
    fmt.Println(now.Format("2006/01/02"))
}
```

#### 解析字符串格式时间

Parse 函数可以解析一个格式化的时间字符串并返回它代表的时间

```go
func Parse(layout, value string) (Time, error)
```

与 Parse 函数类似的还有`ParseInLocation`函数

```go
func ParseInLocation(layout, value string, loc *Location) (Time, error)
```

区别：

- 当缺少时区信息时，Parse 将时间解释为 UTC 时间，而 ParseInLocation 将返回值的 Location 设置为 loc；
- 当时间字符串提供了时区偏移量信息时，Parse 会尝试去匹配本地时区，而 ParseInLocation 会去匹配 loc。

```go
var layout string = "2006-01-02 15:04:05"
var timeStr string = "2019-12-12 15:22:12"
timeObj1, _ := time.Parse(layout, timeStr)
fmt.Println(timeObj1)   //2019-12-12 15:22:12 +0000 UTC
timeObj2, _ := time.ParseInLocation(layout, timeStr, time.Local)
fmt.Println(timeObj2)   //2019-12-12 15:22:12 +0800 CST
```

### os包

`os `包的作用主要是在服务器上进行系统的基本操作，如文件操作、目录操作、执行命令、信号与中断、进程、系统状态等等。

#### 常用函数

- `Hostname`:返回内核提供的主机名

```go
func Hostname() (name string, err error)
```

- `Environ`:返回所有的环境变量，返回值格式为“key=value”的字符串的切片拷贝

```go
func Environ() []string
```

- `Getenv`:检索并返回名为 key 的环境变量的值,不存在该环境变量则会返回空字符串

```go
func Getenv(key string) string
```

- `Setenv`:设置名为 key 的环境变量，如果出错会返回该错误。

```go
func Setenv(key, value string) error
```

- `Exit`: 让当前程序以给出的状态码 code 退出,一般来说，状态码 0 表示成功，非 0 表示出错。程序会立刻终止，并且 defer 的函数不会被执行。

```go
func Exit(code int)
```

- `Getuid`:返回调用者的用户 ID

```go
func Getuid() int
```

- `Getgid`:返回调用者的组 ID

```go
func Getgid() int
```

- `Getpid`:返回调用者所在进程的进程 ID

```go
func Getpid() int
```

- `Getwd`:返回一个对应当前工作目录的根路径,如果当前目录可以经过多条路径抵达（因为硬链接），Getwd 会返回其中一个

```go
func Getwd() (dir string, err error)
```

- `Mkdir`:使用指定的权限和名称创建一个目录,如果出错，会返回 *PathError 底层类型的错误。

```go
func Mkdir(name string, perm FileMode) error
```

- `MkdirAll`: 可以使用指定的权限和名称创建一个目录，包括任何必要的上级目录，并返回 nil，否则返回错误。

```go
func MkdirAll(path string, perm FileMode) error
```

- `Remove`:会删除 name 指定的文件或目录。如果出错，会返回 *PathError 底层类型的错误。
- `RemoveAll `:会递归的删除所有子目录和文件

```go
func Remove(name string) error
```

#### exec执行外部命令

exec 包可以执行外部命令，它包装了 os.StartProcess 函数以便更容易的修正输入和输出，使用管道连接 I/O，以及作其它的一些调整。

`LookPath`:在环境变量 PATH 指定的目录中搜索可执行文件，如果 file 中有斜杠，则只在当前目录搜索。返回完整路径或者相对于当前目录的一个相对路径。

```go
func LookPath(file string) (string, error)
```

示例：

```go
import (
    "fmt"
    "os/exec"
)
func main() {
    f, err := exec.LookPath("main")
    if err != nil {
        fmt.Println(err)
    }
    fmt.Println(f)
}
```

#### user获取当前用户信息

通过 os/user 包中的 Current() 函数来获取当前用户信息，该函数会返回一个 User 结构体，结构体中的 Username、Uid、HomeDir、Gid 分别表示当前用户的名称、用户 id、用户主目录和用户所属组 id，

```go
func Current() (*User, error)
```

示例：

```go
import (
    "log"
    "os/user"
)
func main() {
    u, _ := user.Current()
    log.Println("用户名：", u.Username)
    log.Println("用户id", u.Uid)
    log.Println("用户主目录：", u.HomeDir)
    log.Println("主组id：", u.Gid)
    // 用户所在的所有的组的id
    s, _ := u.GroupIds()
    log.Println("用户所在的所有组：", s)
}
```

#### signal 信号处理

程序在退出（正常退出或者强制退出，如 Ctrl+C，kill 等）时是可以执行一段清理代码的，将收尾工作做完后再真正退出。

go语言中对信号的处理主要使用 os/signal 包中的两个方法，一个是 Notify 方法用来监听收到的信号，一个是 stop 方法用来取消监听。

```go
//第一个参数表示接收信号的 channel，第二个及后面的参数表示设置要监听的信号，如果不设置表示监听所有的信号。
func Notify(c chan<- os.Signal, sig ...os.Signal) 
```

监听收到的信号：

```go
import (
    "fmt"
    "os"
    "os/signal"
)
func main() {
    c := make(chan os.Signal, 0)
    signal.Notify(c)
    // Block until a signal is received.
    s := <-c
    fmt.Println("Got signal:", s)
}
```

使用 stop 方法来取消监听:

```go
import (
    "fmt"
    "os"
    "os/signal"
)
func main() {
    c := make(chan os.Signal, 0)
    signal.Notify(c)
    signal.Stop(c) //不允许继续往c中存入内容  
    //使用 Stop 方法取消了 Notify 方法的监听，所以运行程序没有输出结果。
    s := <-c       //c无内容，此处阻塞，所以不会执行下面的语句，也就没有输出
    fmt.Println("Got signal:", s)
}
```

### 

## 并发

### 基本概念

#### 进程和线程

进程是程序在操作系统中的一次执行过程，系统进行资源分配和调度的一个独立单位。

线程是进程的一个执行实体，是 CPU 调度和分派的基本单位，它是比进程更小的能独立运行的基本单位。

#### 并发和并行

多线程程序在单核心的 cpu 上运行，称为并发；

多线程程序在多核心的 cpu 上运行，称为并行。

并发主要由切换时间片来实现“同时”运行，并行则是直接利用多核实现多线程的运行。

#### 协程和线程

协程：独立的栈空间，共享堆空间，调度由用户自己控制，本质上有点类似于用户级线程，这些用户级线程的调度也是自己实现的。

线程：一个线程上可以跑多个协程，协程是轻量级的线程。

### goroutine

goroutine是一种非常轻量级的实现，可在单个进程里执行成千上万的并发任务，

goroutine 其实就是线程，但是它比线程更小，十几个 goroutine 可能体现在底层就是五六个线程

使用 go 关键字就可以创建 goroutine，将 go 声明放到一个需调用的函数之前，在相同地址空间调用运行这个函数，这样该函数执行时便会作为一个独立的并发线程，这种线程在Go语言中则被称为 goroutine。

示例：

```go
//go 关键字放在方法调用前新建一个 goroutine 并执行方法体
go GetThingDone(param1, param2);
//新建一个匿名方法并执行
go func(param1, param2) {
}(val1, val2)
//直接新建一个 goroutine 并在 goroutine 中执行代码块
go {
    //do someting...
}
```

 goroutine 在多核 cpu 环境下是并行的，如果代码块在多个 goroutine 中执行，那么我们就实现了代码的并行。

### channel

channel 是Go语言在语言级别提供的 goroutine 间的通信方式，可以使用 channel 在两个或多个 goroutine 之间传递消息。

channel 是进程内的通信方式，因此通过 channel 传递对象的过程和调用函数时的参数传递行为比较一致。

channel 是类型相关的，一个 channel 只能传递一种类型的值，这个类型需要在声明 channel 时指定。

定义一个 channel 时，也需要定义发送到 channel 的值的类型，示例：

```go
ci := make(chan int)
cs := make(chan string)
cf := make(chan interface{})
```

### 轻量级线程

使用 **go** 关键字为一个函数创建一个 goroutine。一个函数可以被创建多个 goroutine，一个 goroutine 必定对应一个函数。

格式：

```go
go 函数名( 参数列表 )

//使用匿名函数创建goroutine
go func( 参数列表 ){
    函数体
}( 调用参数列表 )
```

使用 go 关键字创建 goroutine 时，被调用函数的返回值会被忽略。

需要在 goroutine 中返回数据，通过通道把数据从 goroutine 中作为返回值传出。

所有 goroutine 在 main() 函数结束时会一同结束。

### 并发

两种最常见的并发通信模型：共享数据和消息

共享数据是指多个并发单元分别保持对同一个数据的引用，实现对该数据的共享，

Go语言提供的是另一种通信模型，即以消息机制而非共享内存作为通信方式。Go语言提供的消息通信机制被称为 channel。

### 竞争状态

有并发，就有资源竞争，如果两个或者多个 goroutine 在没有相互同步的情况下，访问某个共享的资源，比如同时对该资源进行读写时，就会处于相互竞争的状态，这就是并发中的资源竞争。

对于同一个资源的读写必须是原子化的，也就是说，同一时间只能允许有一个 goroutine 对共享资源进行读写操作。

#### 锁住共享资源

Go语言提供了传统的同步 goroutine 的机制，就是对共享资源加锁。atomic 和 sync 包里的一些函数就可以对共享的资源进行加锁操作。

##### 原子函数

原子函数能够以很底层的加锁机制来同步访问整型变量和指针。

示例：

```go
import (
    "fmt"
    "runtime"
    "sync"
    "sync/atomic"
)
var (
    counter int64
    wg      sync.WaitGroup
)
func main() {
    wg.Add(2)
    go incCounter(1)
    go incCounter(2)
    wg.Wait() //等待goroutine结束
    fmt.Println(counter)
}
func incCounter(id int) {
    defer wg.Done()
    for count := 0; count < 2; count++ {
        atomic.AddInt64(&counter, 1) //安全的对counter加1
        runtime.Gosched()
    }
}
```

atmoic 包的 AddInt64 函数，这个函数会同步整型值的加法，方法是强制同一时刻只能有一个 gorountie 运行并完成这个加法操作,当 goroutine 试图去调用任何原子函数时，这些 goroutine 都会自动根据所引用的变量做同步处理。

原子函数是 LoadInt64 和 StoreInt64。这两个函数提供了一种安全地读和写一个整型值的方式。

##### 互斥锁

另一种同步访问共享资源的方式是使用互斥锁，互斥锁这个名字来自互斥的概念。互斥锁用于在代码上创建一个临界区，保证同一时间只有一个 goroutine 可以执行这个临界代码。

示例：

```go
import (
    "fmt"
    "runtime"
    "sync"
)
var (
    counter int64
    wg      sync.WaitGroup
    mutex   sync.Mutex
)
func main() {
    wg.Add(2)
    go incCounter(1)
    go incCounter(2)
    wg.Wait()
    fmt.Println(counter)
}
func incCounter(id int) {
    defer wg.Done()
    for count := 0; count < 2; count++ {
        //同一时刻只允许一个goroutine进入这个临界区
        mutex.Lock()
        {
            value := counter
            runtime.Gosched()
            value++
            counter = value
        }
        mutex.Unlock() //释放锁，允许其他正在等待的goroutine进入临界区
    }
}
```

## 通道

当一个资源需要在 goroutine 之间共享时，通道在 goroutine 之间架起了一个管道，并提供了确保同步交换数据的机制。

声明通道时，需要指定将要被共享的数据的类型。可以通过通道共享内置类型、命名类型、结构类型和引用类型的值或者指针。

在任何时候，同时只能有一个 goroutine 访问通道进行发送和获取数据。

### 声明格式

```go
var 通道变量 chan 通道类型
```

### 创建格式

```go
通道实例 := make(chan 数据类型)
```

### 收发数据

#### 发送数据

```go
//使用特殊的操作符<-,将数据发送到通道
通道变量 <- 值
```

#### 接受数据

使用`<-`操作符从通道中获取数据。

```go
//阻塞接受数据，该语句时将会阻塞，直到接收到数据并赋值给 data 变量
data := <-ch

//非阻塞接受数据，使用非阻塞方式从通道接收数据时，语句不会发生阻塞
data, ok := <-ch

//忽略接受数据，阻塞接收数据后，忽略从通道返回的数据
<-ch

//循环接受，借用 for range 语句进行多个元素的接收操作
for data := range ch {
}
```

### 单向通道

声明格式：

```go
var 通道实例 chan<- 元素类型    // 只能发送通道
var 通道实例 <-chan 元素类型    // 只能接收通道
```

示例：

```go
ch := make(chan int)
// 声明一个只能发送的通道类型, 并赋值为ch
var chSendOnly chan<- int = ch
//声明一个只能接收的通道类型, 并赋值为ch
var chRecvOnly <-chan int = ch

//直接创建一个单向通道
ch := make(<-chan int)
```

### 关闭通道

使用 Go语言内置的 close() 函数关闭通道：

```go
close(ch)
```

检查通道是否关闭：

```go
x, ok := <-ch
```

如果`ok`为`false`则表示通道已经关闭。

### 无缓冲通道

无缓冲的通道是指在接收前没有能力保存任何值的通道，这种类型的通道要求发送 goroutine 和接收 goroutine 同时准备好，才能完成发送和接收操作。两个 goroutine 没有同时准备好，通道会导致先执行发送或接收操作的 goroutine 阻塞等待。

阻塞指的是由于某种原因数据没有到达，当前协程（线程）持续处于等待状态，直到条件满足才解除阻塞。

### 缓存通道

有缓冲的通道是一种在被接收前能存储一个或者多个值的通道，

只有在通道中没有要接收的值时，接收动作才会阻塞。

只有在通道没有可用缓冲区容纳被发送的值时，发送动作才会阻塞。

声明：

```go
通道实例 := make(chan 通道类型, 缓冲大小)
```

缓冲大小：决定通道最多可以保存的元素数量。

### 互斥锁和读写互斥锁

sync 包提供了两种锁类型：sync.Mutex 和 sync.RWMutex

对于这两种锁类型，任何一个 Lock() 或 RLock() 均需要保证对应有 Unlock() 或 RUnlock() 调用与之对应，否则可能导致等待该锁的所有 goroutine 处于饥饿状态，甚至可能导致死锁。

```go
import (
    "fmt"
    "sync"
)
var (
    // 逻辑中使用的某个变量
    count int
    // 与变量对应的使用互斥锁
    countGuard sync.Mutex
)
func GetCount() int {
    // 锁定
    countGuard.Lock()
    // 在函数退出时解除锁定
    defer countGuard.Unlock()
    return count
}
func SetCount(c int) {
    countGuard.Lock()
    count = c
    countGuard.Unlock()
}
func main() {
    // 可以进行并发安全的设置
    SetCount(1)
    // 可以进行并发安全的获取
    fmt.Println(GetCount())
}
```

### 等待组（sync.WaitGroup）

使用等待组进行多个任务的同步，等待组可以保证在并发环境中完成指定数量的任务。

在 sync.WaitGroup（等待组）类型中，每个 sync.WaitGroup 值在内部维护着一个计数，此计数的初始默认值为零。



| 方法名                          | 功能                                    |
| ------------------------------- | --------------------------------------- |
| (wg * WaitGroup) Add(delta int) | 等待组的计数器 +1                       |
| (wg * WaitGroup) Done()         | 等待组的计数器 -1                       |
| (wg * WaitGroup) Wait()         | 当等待组计数器不等于 0 时阻塞直到变 0。 |

等待组内部拥有一个计数器，计数器的值可以通过方法调用实现计数器的增加和减少。

```go
import (
    "fmt"
    "net/http"
    "sync"
)
func main() {
    // 声明一个等待组
    var wg sync.WaitGroup
    // 准备一系列的网站地址
    var urls = []string{
        "http://www.github.com/",
        "https://www.qiniu.com/",
        "https://www.golangtc.com/",
    }
    // 遍历这些地址
    for _, url := range urls {
        // 每一个任务开始时, 将等待组增加1
        wg.Add(1)
        // 开启一个并发
        go func(url string) {
            // 使用defer, 表示函数完成时将等待组值减1
            defer wg.Done()
            // 使用http访问提供的地址
            _, err := http.Get(url)
            // 访问完成后, 打印地址和可能发生的错误
            fmt.Println(url, err)
            // 通过参数传递url地址
        }(url)
    }
    // 等待所有的任务完成
    wg.Wait()
    fmt.Println("over")
}
```

### 死锁、活锁和饥饿

#### 死锁

死锁是指两个或两个以上的进程（或线程）在执行过程中，因争夺资源而造成的一种互相等待的现象，若无外力作用，它们都将无法推进下去

死锁发生的条件有如下几种：

- 互斥条件

线程对资源的访问是排他性的，如果一个线程对占用了某资源，那么其他线程必须处于等待状态，直到该资源被释放。

- 请求和保持条件

线程 T1 至少已经保持了一个资源 R1 占用，但又提出使用另一个资源 R2 请求，而此时，资源 R2 被其他线程 T2 占用，于是该线程 T1 也必须等待，但又对自己保持的资源 R1 不释放。

- 不剥夺条件

线程已获得的资源，在未使用完之前，不能被其他线程剥夺，只能在使用完以后由自己释放。

-  环路等待条件

在死锁发生时，必然存在一个“进程 - 资源环形链”，即：{p0,p1,p2,...pn}，进程 p0（或线程）等待 p1 占用的资源，p1 等待 p2 占用的资源，pn 等待 p0 占用的资源。



死锁解决办法：

- 如果并发查询多个表，约定访问顺序；
- 在同一个事务中，尽可能做到一次锁定获取所需要的资源；
- 对于容易产生死锁的业务场景，尝试升级锁颗粒度，使用表级锁；
- 采用分布式事务锁或者使用乐观锁。

#### 活锁

活锁是另一种形式的活跃性问题，该问题尽管不会阻塞线程，但也不能继续执行，因为线程将不断重复同样的操作，而且总会失败。

活锁通常发生在处理事务消息中，如果不能成功处理某个消息，那么消息处理机制将回滚事务，并将它重新放到队列的开头。这样，错误的事务被一直回滚重复执行，这种形式的活锁通常是由过度的错误恢复代码造成的，因为它错误地将不可修复的错误认为是可修复的错误。

当多个相互协作的线程都对彼此进行相应而修改自己的状态，并使得任何一个线程都无法继续执行时，就导致了活锁。



活锁和死锁的区别在于，处于活锁的实体是在不断的改变状态，所谓的“活”，而处于死锁的实体表现为等待，活锁有可能自行解开，死锁则不能。

#### 饥饿

饥饿是指一个可运行的进程尽管能继续执行，但被调度器无限期地忽视，而不能被调度执行的情况。

与死锁不同的是，饥饿锁在一段时间内，优先级低的线程最终还是会执行的，比如高优先级的线程执行完之后释放了资源。

饥饿通常意味着有一个或多个贪婪的并发进程，它们不公平地阻止一个或多个并发进程，以尽可能有效地完成工作，或者阻止全部并发进程。



- 死锁：是因为错误的使用了锁，导致异常；
- 活锁：是饥饿的一种特殊情况，逻辑上感觉对，程序也一直在正常的跑，但就是效率低，逻辑上进行不下去；
- 饥饿：与锁使用的粒度有关，通过计数取样，可以判断进程的工作效率。

## 反射

反射是指在程序运行期对程序本身进行访问和修改的能力。

Go语言提供了一种机制在运行时更新和检查变量的值、调用变量的方法和变量支持的内在操作，但是在编译时并不知道这些变量的具体类型，这种机制被称为反射。

Go语言中的反射是由 reflect 包提供支持的，它定义了两个重要的类型 Type 和 Value 任意接口值在反射中都可以理解为由 reflect.Type 和 reflect.Value 两部分组成，并且 reflect 包提供了 reflect.TypeOf 和 reflect.ValueOf 两个函数来获取任意对象的 Value 和 Type。

### TypeOf

使用` reflect.TypeOf() `函数可以获得任意值的类型对象，程序通过类型对象可以访问任意值的类型信息。

```go
package main
import (
    "fmt"
    "reflect"
)
func main() {
    var a int
    typeOfA := reflect.TypeOf(a)
    fmt.Println(typeOfA.Name(), typeOfA.Kind())
}
```

在使用反射时，需要首先理解类型（Type）和种类（Kind）的区别。编程中，使用最多的是类型，但在反射中，当需要区分一个大品种的类型时，就会用到种类（Kind）。

#### TypeOf对象方法

- TypeOf对象获取结构体成员访问的方法列表

| 方法                                                         | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Field(i int) StructField                                     | 根据索引，返回索引对应的结构体字段的信息。当值不是结构体或索引超界时发生宕机 |
| NumField() int                                               | 返回结构体成员字段数量。当类型不是结构体或索引超界时发生宕机 |
| FieldByName(name string) (StructField, bool)                 | 根据给定字符串返回字符串对应的结构体字段的信息。没有找到时 bool 返回 false，当类型不是结构体或索引超界时发生宕机 |
| FieldByIndex(index []int) StructField                        | 多层成员访问时，根据 []int 提供的每个结构体的字段索引，返回字段的信息。没有找到时返回零值。当类型不是结构体或索引超界时 发生宕机 |
| FieldByNameFunc( match func(string) bool) (StructField,bool) | 根据匹配函数匹配需要的字段。当值不是结构体或索引超界时发生宕机 |



#### 类型（Name）与种类（Kind）

Go语言程序中的类型指的是系统原生数据类型，如 int、string、bool、float32 等类型，以及使用 type 关键字定义的类型，这些类型的名称就是其类型本身的名称。

种类（Kind）指的是对象归属的品种。

`Name()` 方法获取Go语言中的类型名称，返回表示类型名称的字符串；

`Kind() `方法获取类型归属的种类，返回类型的常量。

```go
import (
    "fmt"
    "reflect"
)
// 定义一个Enum类型
type Enum int
const (
    Zero Enum = 0
)
func main() {
    // 声明一个空结构体
    type cat struct {
    }
    // 获取结构体实例的反射类型对象
    typeOfCat := reflect.TypeOf(cat{})
    // 显示反射类型对象的名称和种类
    fmt.Println(typeOfCat.Name(), typeOfCat.Kind())  //cat struct
    // 获取Zero常量的反射类型对象
    typeOfA := reflect.TypeOf(Zero)
    // 显示反射类型对象的名称和种类
    fmt.Println(typeOfA.Name(), typeOfA.Kind()) //Enum int
}
```

#### Elem()

`reflect.Elem() `方法获取这个指针指向的元素类型，这个获取过程被称为取元素，等效于对指针类型变量做了一个`*`操作。

```go
import (
    "fmt"
    "reflect"
)
func main() {
    // 声明一个空结构体
    type cat struct {
    }
    // 创建cat的实例
    ins := &cat{}
    // 获取结构体实例的反射类型对象
    typeOfCat := reflect.TypeOf(ins)
    // 显示反射类型对象的名称和种类
    fmt.Printf("name:'%v' kind:'%v'\n", typeOfCat.Name(), typeOfCat.Kind())
    //name:'' kind:'ptr'
    
    // 取类型的元素
    typeOfCat = typeOfCat.Elem()
    // 显示反射类型对象的名称和种类
    fmt.Printf("element name: '%v', element kind: '%v'\n", typeOfCat.Name(), typeOfCat.Kind())
    //element name: 'cat', element kind: 'struct'
}
```

#### 获取成员信息

任意值通过 reflect.TypeOf() 获得反射对象信息后，如果它的类型是结构体，可以通过反射值对象 reflect.Type 的 `NumField() `和` Field()` 方法获得结构体成员的详细信息。

`Field()` 方法返回 StructField 结构，这个结构描述结构体的成员信息，通过这个信息可以获取成员与结构体的关系。

`FieldByName()` 方法查找结构体中指定名称的字段，直接获取其类型信息。

```go
import (
    "fmt"
    "reflect"
)
func main() {
    // 声明一个空结构体
    type cat struct {
        Name string
        // 带有结构体tag的字段
        Type int `json:"type" id:"100"`
    }
    // 创建cat的实例
    ins := cat{Name: "mimi", Type: 1}
    // 获取结构体实例的反射类型对象
    typeOfCat := reflect.TypeOf(ins)
    // 遍历结构体所有成员
    for i := 0; i < typeOfCat.NumField(); i++ {
        // 获取每个成员的结构体字段类型
        fieldType := typeOfCat.Field(i)
        // 输出成员名和tag
        fmt.Printf("name: %v  tag: '%v'\n", fieldType.Name, fieldType.Tag)
        //name: Name  tag: ''
        //name: Type  tag: 'json:"type" id:"100"'
    }
    // 通过字段名, 找到字段类型信息
    if catType, ok := typeOfCat.FieldByName("Type"); ok {
        // 从tag中取出需要的tag
        fmt.Println(catType.Tag.Get("json"), catType.Tag.Get("id"))
        //type 100
    }
}
```

通过 reflect.Type 获取结构体成员信息 reflect.StructField 结构中的 Tag 被称为结构体标签（StructTag）。结构体标签是对结构体字段的额外信息标签。

使用tag的Get和Lookup 获取或查找对应键的值。

###  ValueOf 

函数 reflect.ValueOf 也会对底层的值进行恢复,

类型 reflect.Value 有一个方法 Type()，它会返回一个 reflect.Type 类型的对象。

```go
import (
    "fmt"
    "reflect"
)
func main() {
    var x float64 = 3.4
    
    fmt.Println("type:", reflect.TypeOf(x)) //type: float64
    fmt.Println("value:", reflect.ValueOf(x)) //value: 3.4
    fmt.Println("value:", reflect.ValueOf(x).type())////type: float64
}
```

#### ValueOf 对象方法

- ValueOf反射值获取原始值的方法

| 方法名                   | 说  明                                                       |
| ------------------------ | ------------------------------------------------------------ |
| Interface() interface {} | 将值以 interface{} 类型返回，可以通过类型断言转换为指定类型  |
| Int() int64              | 将值以 int 类型返回，所有有符号整型均可以此方式返回          |
| Uint() uint64            | 将值以 uint 类型返回，所有无符号整型均可以此方式返回         |
| Float() float64          | 将值以双精度（float64）类型返回，所有浮点数（float32、float64）均可以此方式返回 |
| Bool() bool              | 将值以 bool 类型返回                                         |
| Bytes() []bytes          | 将值以字节数组 []bytes 类型返回                              |
| String() string          | 将值以字符串类型返回                                         |



- ValueOf反射值对象的成员访问方法

| Field(i int) Value                             | 根据索引，返回索引对应的结构体成员字段的反射值对象。当值不是结构体或索引超界时发生宕机 |
| ---------------------------------------------- | ------------------------------------------------------------ |
| NumField() int                                 | 返回结构体成员字段数量。当值不是结构体或索引超界时发生宕机   |
| FieldByName(name string) Value                 | 根据给定字符串返回字符串对应的结构体字段。没有找到时返回零值，当值不是结构体或索引超界时发生宕机 |
| FieldByIndex(index []int) Value                | 多层成员访问时，根据 []int 提供的每个结构体的字段索引，返回字段的值。 没有找到时返回零值，当值不是结构体或索引超界时发生宕机 |
| FieldByNameFunc(match func(string) bool) Value | 根据匹配函数匹配需要的字段。找到时返回零值，当值不是结构体或索引超界时发生宕机 |



- ValueOf反射值对象的零值和有效性判断方法

| 方 法          | 说 明                                                        |
| -------------- | ------------------------------------------------------------ |
| IsNil() bool   | 返回值是否为 nil。如果值类型不是通道（channel）、函数、接口、map、指针或 切片时发生 panic，类似于语言层的`v== nil`操作 |
| IsValid() bool | 判断值是否有效。 当值本身非法时，返回 false，例如 reflect Value不包含任何值，值为 nil 等。 |



- ValueOf反射值对象的判定及获取元素的方法

| 方法名         | 备注                                                         |
| -------------- | ------------------------------------------------------------ |
| Elem() Value   | 取值指向的元素值，类似于语言层`*`操作。当值类型不是指针或接口时发生宕 机，空指针时返回 nil 的 Value |
| Addr() Value   | 对可寻址的值返回其地址，类似于语言层`&`操作。当值不可寻址时发生宕机 |
| CanAddr() bool | 表示值是否可寻址                                             |
| CanSet() bool  | 返回值能否被修改。要求值可寻址且是导出的字段                 |



- ValueOf反射值对象修改值的方法

| Set(x Value)        | 将值设置为传入的反射值对象的值                               |
| ------------------- | ------------------------------------------------------------ |
| Setlnt(x int64)     | 使用 int64 设置值。当值的类型不是 int、int8、int16、 int32、int64 时会发生宕机 |
| SetUint(x uint64)   | 使用 uint64 设置值。当值的类型不是 uint、uint8、uint16、uint32、uint64 时会发生宕机 |
| SetFloat(x float64) | 使用 float64 设置值。当值的类型不是 float32、float64 时会发生宕机 |
| SetBool(x bool)     | 使用 bool 设置值。当值的类型不是 bod 时会发生宕机            |
| SetBytes(x []byte)  | 设置字节数组 []bytes值。当值的类型不是 []byte 时会发生宕机   |
| SetString(x string) | 设置字符串值。当值的类型不是 string 时会发生宕机             |

### 通过反射修改变量值

```go
// 声明整型变量a并赋初值
var a int = 1024
// 获取变量a的反射值对象
valueOfA := reflect.ValueOf(a)
// 尝试将a修改为1(此处会发生崩溃)
valueOfA.SetInt(1)
```

### 通过反射调用函数

如果反射值对象（reflect.Value）中值的类型为函数时，可以通过 reflect.Value 调用该函数。

使用反射调用函数时，需要将参数使用反射值对象的切片 []reflect.Value 构造后传入 Call() 方法中，调用完成时，函数的返回值通过 []reflect.Value 返回。

```go
import (
    "fmt"
    "reflect"
)
// 普通函数
func add(a, b int) int {
    return a + b
}
func main() {
    // 将函数包装为反射值对象
    funcValue := reflect.ValueOf(add)
    // 构造函数参数, 传入两个整型值
    paramList := []reflect.Value{reflect.ValueOf(10), reflect.ValueOf(20)}
    // 反射调用函数
    retList := funcValue.Call(paramList)
    // 获取第一个返回值, 取整数值
    fmt.Println(retList[0].Int())
}
```



## 文件处理



## FQ

### make和new区别

`make`用于内建类型（`map`、`slice` 和`channel`）的内存分配。`new`用于各种类型的内存分配。

#### new

`new(T)`分配了零值填充的`T`类型的内存空间，并且返回其地址，即一个`*T`类型的值。用Go的术语说，它返回了一个指针，指向新分配的类型`T`的零值

#### make

内建函数`make(T, args)`只能创建`slice`、`map`和`channel`，并且返回一个有初始值(非零)的`T`类型，而不是`*T`。