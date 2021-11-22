## 变量

### 使用关键字声明

通过使用`var`、`final`、`const`关键字声明变量，声明的变量类型会根据变量值自动推断。

```dart
var num = 1;
final name = 'string';
const age = 18;
```

`final` 声明的变量只能赋值一次，`const`声明的变量为编译时常量，也就是说该变量在编译阶段值就确定了，`const`变量也是特殊的`final`变量，只能赋值一次。

### 使用类型声明

通过使用类型关键字如`num`、`int`、`double`、`String`、`bool`、`List`、`Map`、`Set`等或自定义类型来声明变量。声明的变量类型是确定的，但值类型和变量指定类型不一致的时候会出错。

```dart
num number = 1;
int age = 18;
double height = 178.0;
String str = 'String';
bool tag = false;
List list = [];
Map map = {'key': 'value'};
Set set = {1,23,};
```

> 使用var关键字声明变量时不能同时使用类型关键字，final和const可以同时使用类型关键字声明变量。未初始化的变量值未null

### 在字符串中使用变量

在字符串中需要使用变量值时，使用`${表达式}`的形式来引用变量值，在`{}`可以进行其他操作，若表达式只是一个变量可以省略`{}`。 若表达式是一个对象，则会调用对象的toString()方法获取一个字符串 ;

```dart
var s3 = '3+3=${3+3}';
String s = '$s3';
Map map = {'key': 'value'};
print('${map["key"]}');
```

## 内置类型

###  num

数值类型又可以分为`int`和`double`

```dart
num number = 1;
int num1 = 23;
double num2 = 23.0;
```

###  String

字符串拼接可以使用`+`或相邻的字符串来实现。多行字符串使用3重单引号或双引号来实现。在字符串前加`r`表示原始字符串。

```dart
//使用+连接
var s1 = 'this'+'is';
//使用相邻字符串
var s2 = 'String '
    'concatenation'
    " works even over line breaks.";
// 多行字符串

var s3 = '''
You can create
multi-line strings like this one.
''';

var s4 = """This is also a
multi-line string.""";

//原始字符串
var s5 = r'In a raw string, not even \n gets special treatment.';
```

### bool

只有`true`和`false`两个值，在条件循环时只有`true` 对象才被认为是 true，其他的非`bool`类型值都是 `false` 。

### List

数组，通过字面量的声明一个数组时，可以使用展开运算符`...`或`...?`、条件判断`if()`、循环`for in`来填充值。

```dart
var list = [1, 2, 3];
var list2 = [0, ...list];

var list;
//list不为null则使用list填充
var list2 = [0, ...?list];

//使用if
var nav = [
  'Home',
  'Furniture',
  'Plants',
  if (promoActive) 'Outlet'
];

//使用for in
var listOfInts = [1, 2, 3];
var listOfStrings = [
  '#0',
  for (var i in listOfInts) '#$i'
];
```

### Set

一个值不重复的集合。

```dart
var set = {'red','yellow','green'};
var set = Set();
```

在定义`Set`空集合时，使用类型定义或则使用泛型限制值，若两者都不存在会被当成`Map`空集合。

```dart
Set set = {};
var set1 = <int>{};
var tag = {};   //会推断成map<dynamic,dynamic> 
```

### Map

一个键值对的集合。

```dart
var gifts = {
  // Key:    Value
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings'
};

Map<int,String> map = {
  2: 'helium',
  10: 'neon',
  18: 'argon',
}; 
```

### Runes

### Symbol

## 操作符

### 运算符

| 运算符      | 说明                         |
| ----------- | ---------------------------- |
| ==          | 判断两个数字是否相等         |
| +           | 两个数相加                   |
| -           | 两个数相减或取反             |
| *           | 两个数相乘                   |
| /           | 两个数相除                   |
| %           | 两个数相除取余数             |
| ~/          | 两个数相除取整               |
| `>,<,>=,<=` | 比较两个数大小，返回bool类型 |

### 类型检测

| 类型检测 | 说明                               |
| -------- | ---------------------------------- |
| as       | 将该对象转换成指定类型的对象       |
| is       | 如果指定对象是指定类型则返回true   |
| is!      | 如果指定对象不是指定类型则返回true |

```dart
(emp as Person).firstName = 'Bob';

if (emp is Person) {
  // Type check
  emp.firstName = 'Bob';
}
```

使用`object`的`runtimeType`获取对象类型。

```dart
int number = 0;
number.runtimeType   //int
```



### 分配符

`??=`当变量值为`null`时赋值。

```dart
b ??= value;
```

### 条件判断

| 操作符                                  | 说明                                           |
| --------------------------------------- | ---------------------------------------------- |
| *condition* **?** *expr1* **:** *expr2* | 为`condition`为true，则返回expr1,否则返回expr2 |
| *expr1* **??** *expr2*                  | 如果expr1不为null，则返回expr1，否则返回expr2  |

### 级联 

操作符`..`允许对同一对象进行一系列链式操作。

```dart
querySelector('#confirm') // Get an object.
  ..text = 'Confirm' // Use its members.
  ..classes.add('important')
  ..onClick.listen((e) => window.alert('Confirmed!'));
```

### 成员操作符

| 操作符 | 说明                                                 | 使用         |
| ------ | ---------------------------------------------------- | ------------ |
| **.**  | 用于访问一个对象中的成员                             | object.prop  |
| **?.** | 若访问的对象不为null，则访问指定成员，否则结果为null | object?.prop |

## 流程控制

### if else

```dart
if (isRaining()) {
  you.bringRainCoat();
} else if (isSnowing()) {
  you.wearJacket();
} else {
  car.putTopDown();
}
```

> 不同于JavaScript，条件必须是布尔值。

### for和for-in

```dart
var callbacks = [];
for (var i = 0; i < 2; i++) {
  callbacks.add(() => print(i));
}
callbacks.forEach((c) => c());
```

在dart中for循环都会正确输出当前次数的值，不同于JavaScript。

对于可迭代对象，如List,Set等可以使用for-in循环。

```dart
var collection = [0, 1, 2];
for (var x in collection) {
  print(x); // 0 1 2
}
```

### while和do-while

```dart
while (!isDone()) {
  doSomething();
}

do {
  printLine();
} while (!atEndOfPage());
```

### break和continue

使用break结束循环。

```dart
while (true) {
  if (shutDownRequested()) break;
  processIncomingRequests();
}
```

使用continue跳过当前次循环，进入下一次循环。

```dart
for (int i = 0; i < candidates.length; i++) {
  var candidate = candidates[i];
  if (candidate.yearsExperience < 5) {
    continue;
  }
  candidate.interview();
}
```

### switch和case

 被比较的对象必须全部是同一类的实例 。 每个非空case子句都以break语句结尾 ， 当没有case子句匹配时，使用default子句执行代码 。

```dart
var command = 'OPEN';
switch (command) {
  case 'CLOSED':
    executeClosed();
    break;
  case 'PENDING':
    executePending();
    break;
  case 'APPROVED':
    executeApproved();
    break;
  case 'DENIED':
    executeDenied();
    break;
  case 'OPEN':
    executeOpen();
    break;
  default:
    executeUnknown();
}
```

### try、catch、throw

## num数值

### 基础方法和属性

| 方法名                        | 说明                                                         | 用法                            | 返回类型 |
| ----------------------------- | ------------------------------------------------------------ | ------------------------------- | -------- |
| compareTo(arg)                | 比较两个数的大小                                             | a.compareTo(b)                  | a-b      |
| remainder(arg)                | 对另一个数求余数                                             | a.remainder(b)                  | int      |
| abs()                         | 取绝对值                                                     | a.abs()                         | num      |
| round()                       | 对一个数四舍五入                                             | a.round()                       | int      |
| floor()                       | 返回不大与当前数的最大整数                                   | a.floor()                       | int      |
| ceil()                        | 返回不小与当前数的最小整数                                   | a.ceil()                        | int      |
| truncate()                    | 返回当前数的整数部分                                         | a.truncate()                    | int      |
| roundToDouble()               | 对一个数四舍五入为double类型                                 | a.roundToDouble()               | double   |
| floorToDouble()               | 返回不大与当前数的最大整数为double类型                       | a.floorToDouble()               | double   |
| ceilToDouble()                | 返回不小与当前数的最小整数为double类型                       | a.ceilToDouble()                | double   |
| truncateToDouble()            | 返回当前数的整数部分为double类型                             | a.truncateToDouble()            | double   |
| clamp(min,max)                | 若当前数字在该范围内则返回该数字，否则返回该范围内最接近该数的数字 | a.clamp(min,max)                | num      |
| toInt()                       | 返回当前数字的整数部分                                       | a.toInt()                       | int      |
| toDouble()                    | 将当前数转换成double类型                                     | a.toDouble()                    | double   |
| toStringAsFixed(length)       | 返回当前数字的固定小数位长度的数字字符串                     | a.toStringAsFixed(length)       | String   |
| toStringAsExponential(length) | 返回当前数字固定小数位长度的以科学计数法表示的数字字符串     | a.toStringAsExponential(length) | String   |
| toStringAsPrecision(length)   | 返回当前数字固定有效数字长度的数字字符串                     | a.toStringAsPrecision()         | String   |
| toString()                    | 将当前数字转换成数字字符串                                   | a.toString()                    | String   |



| 静态方法   | 说明                             | 用法                                                       |
| ---------- | -------------------------------- | ---------------------------------------------------------- |
| parse()    | 将字符串转换成数字,失败抛出异常  | int.parse(string), double.parse(string), num.parse(string) |
| tryParse() | 将字符串转换成数字，失败返回null | 与parse()类似                                              |



| get属性    | 说明                                 | 用法         | 返回类型 |
| ---------- | ------------------------------------ | ------------ | -------- |
| hashCode   | 返回数字的哈希码                     | a.hashCode   | int      |
| isNaN      | 如果数字是非数字的双精度值，则为true | a.isNaN      | bool     |
| isNegative | 判断数字是否为负数                   | a.isNegative | bool     |
| isInfinite | 判断数字是否无穷大                   | a.isInfinite | bool     |
| isFinite   | 判断数字是否有限（非有限数包括NaN）  | a.isFinite   | bool     |
| sign       | 根据数字正负返回`-1`,`0`,`+1`        | a.sign       | num      |

### 子类

子类继承父类中的`基础所有方法`和`计算属性`，子类中特有的方法和计算属性只能在当前类型的变量中使用，

也就是说`int`和`double`类型的数字可以访问`num`中的方法与属性

#### int

| 特有方法          | 说明                             | 用法                | 返回类型 |
| ----------------- | -------------------------------- | ------------------- | -------- |
| modPow(e,m)       | 返回该整数已e为指数，m为模的幂   | a.modPow(e,m)       | int      |
| modInverse(m)     | 返回该整数已m为模的逆运算        | a.modInverse(m)     | int      |
| gcd(b)            | 返回该整数与另一个数的最大公约数 | a.gcd(b)            | int      |
| toUnsigned(width) |                                  | a.toUnsigned(8)     | int      |
| toSigned(width)   |                                  | a.toSigned(8)       | int      |
| toRadixString     | 将该整数转换成对应进制(2~35)的数 | a.toRadixString(10) | int      |



| 计算属性  | 说明                         | 用法        | 返回类型 |
| --------- | ---------------------------- | ----------- | -------- |
| isEven    | 判断该整数是否为偶数         | a.isEven    | bool     |
| isOdd     | 判断该整数是否为奇数         | a.isOdd     | bool     |
| bitLength | 返回存储此整数所需的最小位数 | a.bitLength | int      |

#### double

无特有方法与计算属性

## String字符串

### 方法

- codeUnitAt(index)：返回当前字符串对应索引index的字符的16位UTF-16编码,返回类型为int

```dart
var str = 'string';
print(str.codeUnitAt(3)); //105
```

- compareTo(str):  将该字符串与other比较，按每个字符的uncode编码比较,当前字符串大于比较的字符则返回1，否则返回-1，相等返回0

```dart
var str = 'string';
print(str.compareTo('s')); // 1
print(str.compareTo('t')); // -1
```

- endsWith(str): 判断该字符串是否已`str`结尾

```dart
'Dart'.endsWith('t'); // true 
```

- startsWith(pattern,[index]):  返回匹配字符串在当前字符串中第一次出现的索引，若传递了开始位置，则从开始位置开始检查，匹配字符串可以使用正则。不存在则返回-1

```dart
var string = 'Dart';
string.startsWith('D');                       // true
string.startsWith('art', 1);                  // true
string.startsWith(new RegExp(r'[A-Z][a-z]')); // true
string.startsWith(new RegExp(r'art'), 1);     // true
```

- indexOf(pattern,[start]):返回匹配字符串在当前字符串中第一次出现的索引，若传递了开始位置，则从开始位置开始检查，匹配字符串可以使用正则。不存在则返回-1

```dart
var string = 'Dartisans';
string.indexOf('art');                     // 1
string.indexOf(new RegExp(r'[A-Z][a-z]')); // 0
string.indexOf('art',5); // -1
```

- lastIndexOf(pattern,[start]): 与indexOf()相反，该方法字符串后向前检查

```dart
var string = 'Dartisans';
string.lastIndexOf('a');                    // 6
string.lastIndexOf(new RegExp(r'a(r|n)'));  // 6
```

- substring(startIndex,[endIndex]): 返回从开始到结束位置的子字符串

```dart
var string = 'dartlang';
string.substring(1);    // 'artlang'
string.substring(1, 4); // 'art'
```

- trim():  返回没有任何前导和尾随空格的字符串
- trimLeft(): 返回没有任何前导空格的字符串
- trimRight(): 返回没有尾随空格的字符串

```dart
var str = ' dart ';
str.trim();  //'dart'
str.trimLeft(); // 'dart '
str.trimRight();  // ' dart'
```

- padLeft(width,[padding = ' ']):  若字符串长度小于`width`,则从`左侧`用`padding`填充到指定长度
- padRight(width,[padding = ' ']):  若字符串长度小于`width`,则从`右侧`用`padding`填充到指定长度

```dart
var str = 'string';
print(str.padLeft(10,'1'));  //1111string
print(str.padRight(10,'1')); //string1111
```

- contains(other, [startIndex = 0]):  判断字符串是否包含匹配的字符，可以使用正则

```dart
var string = 'Dart strings';
string.contains('D');                     // true
string.contains(new RegExp(r'[A-Z]'));    // true
string.contains('X', 1);                  // false
string.contains(new RegExp(r'[A-Z]'), 1); // false
```

- replaceFirst(from,to.[index=0]) :  从开始位置将第一个`from`用`to`替换，返回替换后的字符串

```dart
'0.0001'.replaceFirst(new RegExp(r'0'), ''); // '.0001'
'0.0001'.replaceFirst(new RegExp(r'0'), '7', 1); // '0.7001'
```

- replaceFirstMapped(from,fn(match),[index=0]): 从开始位置将第一个`from`用`fn`的返回值替换，返回替换后的字符串

```dart
var str = 'string';
var temp = str.replaceFirstMapped(new RegExp(r'r'),(str){
  print(str[0]); // 'r'
  return '22';
});
temp   // st22ing
```

- replaceAll(from,to): 将所有的`from`用`to`替换，返回替换后的字符串

```dart
'resume'.replaceAll(new RegExp(r'e'), 'é'); // 'résumé'
```

- replaceAllMapped(from, fn(match)): 将所有的`from`用`fn`返回值替换，返回替换后的字符串

- replaceRange(start,end,replacement):  返回用`replacement`替换从`start`到`end`的子字符串

- split(pattern) : 用`pattern`将字符串分割，返回分割后的字符串列表，返回类型为`List`

```dart
var string = 'Pub';
string.split('');                       // ['P', 'u', 'b']
```

- splitMapJoin(pattern,{onMatch(match),onNonMatch(nonMatch)}): 用`pattern`分割字符串，用`onMatch`的返回值替换`pattern`,用`onNonMatch`的返回值替换`pattern`分隔符以外的内容。

```dart
var str = 'stringr';
var temp = str.splitMapJoin(new RegExp(r'tri'),
                            onMatch:(str){
                              return '_1_';
                            },
                            onNonMatch:(str){
                              return '2';
                            }
                           );
print(temp);  /// '2_1_2'
```

- toLowerCase() :  将字符串转换成小写字符
- toUpperCase():  将字符串转换成大写字符

```dart
'ALPHABET'.toLowerCase(); // 'alphabet'
'alphabet'.toUpperCase(); // 'ALPHABET'
```



### 属性

| get属性    | 说明                               | 用法           | 返回类型 |
| ---------- | ---------------------------------- | -------------- | -------- |
| length     | 返回字符串长度                     | str.length     | int      |
| hashCode   | 返回字符串的哈希码                 | str.hashCode   | int      |
| isEmpty    | 字符串是否为空字符串               | str.isEmpty    | bool     |
| isNotEmpty | 字符串是否不为空字符串             | str.isNotEmpty | bool     |
| codeUnits  | 返回此字符串的UTF-16代码单元的列表 | str.codeUnits  | List     |
| runes      | 返回此字符串可迭代的Unicode        | str.runes      | Runes    |

```dart
  var str = 'dart';
  print(str.length); //4
  print(str.hashCode); //530770249
  print(str.isEmpty); //false
  print(str.isNotEmpty); //true
  print(str.codeUnits);  //[100, 97, 114, 116]
  print(str.runes);  //(100, 97, 114, 116)
```

## Iterable可迭代对象

### 构造函数

```dart
Iterable.generate(int count, [E generator(int index)])
  
```

### 方法

- `cast<R>`()： 
- `followedBy(Iterable<E> other)`:  返回此iterable和[other]的组合

```dart
var list = [1.2, 2, 3, 4, 5];
var temp = list.map((item){
  return item*2;
});
print(temp);  //(2.4, 4, 6, 8, 10)
print(list.followedBy(temp)); //(1.2, 2, 3, 4, 5, 2.4, 4, 6, 8, 10)
```

- `map<T>(f(e))`: 返回此iterable所有元素执行后`f()`新的iterable

```dart
var list = [1.2, 2, 3, 4, 5];
var temp = list.map((item){
  return item*2;
});
print(temp); //(2.4, 4, 6, 8, 10)
```

- `where(bool test(E element))`:  返回此iterable中所有符合`test`的元素组成的新的iterable

```dart
var list = [1.2, 2, 3, 4, 5];
  var temp = list.where((e){
    return e>3;
  });
print(temp); //(4,5)
```

- `whereType<T>()`； 返回此iterable元素中类型为`T`的元素组成的iterable

```dart
var list = [1.2, 2, 3, 4, 5];
print(list.whereType<int>());  //(2, 3, 4, 5)
print(list.whereType<double>()); //(1.2)
```

- `expand<T>(Iterable<T> f(E element))`: 将iterable中的元素使用`f`扩展成多个或0个元素，并返回扩展后的iterable

```dart
var list = [1.2, 2, 3, 4, 5];
var temp = list.expand((item){
  return [item,1];
});
print(temp);  //(1.2, 1, 2, 1, 3, 1, 4, 1, 5, 1)
```

- contains(element): 检测iterable中是否包含指定元素，包含则返回true，否则返回false。
- forEach(void f(E element))：对iterable中所有元素执行`f`，无返回值。

```dart\
var list = [1.2, 2, 3, 4, 5];
list.forEach((item){
print(item);// 1.2   2  3 4 5
});
```

- reduce(E f(E value, E element)) : 对iterable中的元素逐一执行`f`,上一次`f`返回值做为当前次的`value`,`element`为当前元素。`value`默认为第一个元素。返回最后一次`f`的返回值。

```dart
var list = [1.2, 2, 3, 4, 5];
var temp = list.reduce((sum,item){
  return sum + item;
});
print(temp);  // 15.2
```

- `fold<T>(T initialValue, T combine(T previousValue, E element))`: 与reduce类似，只是提供了一个初始值。

```dart
var list = [1.2, 2, 3, 4, 5];
var temp = list.fold(2,(sum,item){
  return sum+item;
});
print(temp); //17.2
```

- every(bool test(E element))：所有元素满足`test`则返回true,否则返回false。
- join([String separator = ""])： 使用分割符`separator `将所有元素合成一个字符串。

```dart
var list = [1.2, 2, 3, 4, 5];
print(list.join('|')); //1.2|2|3|4|5
```

- any(bool test(E element))： 任意元素满足`test`则返回true,否则返回false
- toList({bool growable = true}): 将可迭代对象转换成List，内部调用`List.from`
- toSet():将可迭代对象转换成Set,内部调用`Set.from`
- take(int count): 从当前Iterable中返回指定个数的Iterable.

```dart
var list = [1.2, 2, 3, 4, 5];
print(list.take(3)); //(1.2, 2, 3)
```

- takeWhile(bool test(E value)): 返回满足`test`的元素组成的Iterable

- skip(int count): 返回该Iterable除去前`count`个元素组成的Iterable

```dart
var list = [1.2, 2, 3, 4, 5];
print(list.skip(3));  //(4,5)
```

- skipWhile(bool test(E value)): 返回该Iterable除去满足`test`的元素组成的Iterable

- firstWhere(bool test(E element), {E orElse()}): 返回第一个满足`test`的元素，若不存在满足`test`的元素，则返回`orElse`的返回结果

- lastWhere(bool test(E element), {E orElse()})：返回最后一个满足`test`的元素，若不存在满足`test`的元素，则返回`orElse`的返回结果

```dart
var list = [1.2, 2, 3, 4, 5];
print(list.firstWhere((item){
  return item>2;
})); // 3
print(list.lastWhere((item){
  return item<5;
}));  // 4
```

- singleWhere(bool test(E element), {E orElse()}): 如果一个元素满足`test`，则返回该元素，多个元素满足则报错，没有元素满足则返回`orElse`返回的结果

```dart
var list = [1.2, 2, 3, 4, 5];
var temp = list.singleWhere((item){
  return item>5;
},orElse:(){
  return 6;
});
print(temp);  //6
```

- elementAt(index): 返回索引为index的元素。

```dart
var list = [1.2, 2, 3, 4, 5];
print(list.elementAt(0));  // 1.2
```

- toString(): 对每个元素执行自身的`toString`方法。

### 属性

| get属性    | 说明                                               | 用法           | 返回类型 |
| ---------- | -------------------------------------------------- | -------------- | -------- |
| length     | 返回可迭代对象的长度                               | ite.length     | int      |
| isEmpty    | 可迭代对象是否为空                                 | ite.isEmpty    | bool     |
| isNotEmpty | 可迭代对象是否`不`为空                             | ite.isNotEmpty | bool     |
| first      | 返回第一个元素                                     | ite.first      | E        |
| last       | 返回最后一个元素                                   | ite.last       | E        |
| single     | 检测该对象是否只有一个元素，是返回该元素，否则报错 | ite.single     | E        |



## List

由于List是可迭代对象的字类，具有可迭代对象的方法和属性。

>  **注**：不能通过 '[]'中括号直接访问List中的元素，只能通过 arr.elementAt(index)来访问对应位置的元素。

### 构造函数

```dart
external factory List([int length])

//声明一个长度为length,每个元素用fill填充的List,growable为false表示该List长度固定不可增长
external factory List.filled(int length, E fill, {bool growable = false})

//将一个可迭代的对象转换成一个List，growable为true表示该list长度可增长
external factory List.from(Iterable elements, {bool growable = true})
  
factory List.of(Iterable<E> elements, {bool growable = true}) =>
      List<E>.from(elements, growable: growable)  
//返回一个指定长度的generator返回值组成的list
factory List.generate(int length, E generator(int index),
      {bool growable = true}) {
    List<E> result;
    if (growable) {
      result = <E>[]..length = length;
    } else {
      result = List<E>(length);
    }
    for (int i = 0; i < length; i++) {
      result[i] = generator(i);
    }
    return result;
  }

//创建一个包含所有迭代元素elements的不可修改List，长度和元素都不可改变
external factory List.unmodifiable(Iterable elements)
```



### 声明list

```dart
var list = new List()    //声明一个长度为0的list
var list2 = new List(2)   // 声明一个长度为2的list
var list3 = []   // 字面量声明一个长度为0的list
var list4 = new List<int>.filled(3, 0, growable: true); // [0, 0, 0]  
var list5 = new List<int>.generate(3, (int index) => index * index); // [0, 1, 4]
```

声明一个List时，若指明了长度，则该List长度是只读属性，不能重新赋值。

```dart
List fixedLengthList = new List(3);
fixedLengthList.length;     // 3
fixedLengthList.length = 1; // Error

List growableList = new List();
growableList.length; // 0;
growableList.length = 3;
```

### 方法

- add(value): 在list末尾添加值，无返回值
- addAll(iterable): 将可迭代的iterable所有元素添加到list末尾，无返回值
- sort([compare(a, b)]):  根据compare功能指定的顺序对该列表进行排序，无返回值。

```dart
numbers = ['two', 'three', 'four']
numbers.sort((a, b) => a.length.compareTo(b.length))  
print(numbers);  // [two, four, three]
```

- shuffle([Random random]):  随机调整此列表的元素。无返回值。
- indexOf(element, [int start = 0]):  从索引start开始，返回此列表中element的第一个索引,不存在返回-1。
- lastIndexOf(E element, [int start])：从索引start开始,向列表头部方向检测，返回此列表中element的第一个索引,不存在返回-1

```dart
List<String> notes = ['do', 're', 'mi', 're'];
notes.indexOf('re');    // 1
notes.indexOf('re', 2); // 3
notes.lastIndexOf('re');  // 3
```

- indexWhere(bool test(E element), [int start = 0]): 从索引start开始,返回满足提供的`test`的列表中的第一个索引,不存在返回-1

- lastIndexWhere(bool test(E element), [int start])：从索引start开始,向列表头部方向检测，返回满足提供的`test`的列表中的第一个索引,不存在返回-1

```dart
List<String> notes = ['do', 're', 'mi', 're'];
notes.indexWhere((note) => note.startsWith('r'));       // 1
notes.indexWhere((note) => note.startsWith('r'), 2);    // 3

notes.lastIndexWhere((note) => note.startsWith('r'));       // 3
notes.lastIndexWhere((note) => note.startsWith('r'), 2);    // 1
```

- clear(): 清空列表，无返回值。若列表长度是固定的则会抛出异常。无返回值
- insert(int index, E element)： 从索引位置向列表中插入元素，列表长度必须是可增长的。无返回值
- insertAll(int index, Iterable  iterable)： 从索引位置向列表中插入`iterable`中的元素，列表长度必须是可增长的。无返回值

```dart
List<String> list = ['a', 'b', 'c'];
list.insert(1,'dd');
print(list); //[a, dd, b, c]
list.insertAll(1, ['bee', 'sea']);
print(list); //[a, bee, sea, dd, b, c]
```

- `setAll(int index, Iterable<E> iterable)`: 从索引位置开始，用`iterable`中的元素设置List中的元素值。无返回值

```dart
List<String> list = ['a', 'b', 'c'];
list.setAll(1, ['bee', 'sea']);
list.join(', '); // 'a, bee, sea'
```

- remove(Object value): 从列表中删除第一次出现的`value`，成功返回true,否则返回false。

```dart
List<String> parts = ['head', 'shoulders', 'knees', 'toes'];
parts.remove('head'); // true
```

- removeAt(int index)： 从列表中删除对应索引上的元素。返回删除的元素。
- removeLast(): 删除列表中的最后一个元素，并返回。
- removeWhere(bool test(E element))： 从列表中删除所有符合`test`的元素。无返回值。

```dart
List<String> numbers = ['one', 'two', 'three', 'four'];
numbers.removeWhere((item) => item.length == 3);
numbers.join(', '); // 'three, four'
```

- retainWhere(bool test(E element))： 从列表中删除所有`不`符合`test`的元素。无返回值。

```dart
List<String> numbers = ['one', 'two', 'three', 'four'];
numbers.retainWhere((item) => item.length == 3);
numbers.join(', '); // 'one, two'
```

- sublist(int start, [int end])： 返回一个从索引`start`到`end`元素的新列表。

```dart
var colors = ["red", "green", "blue", "orange", "pink"];
print(colors.sublist(1, 3)); // [green, blue]
```

- getRange(int start, int end): 返回一个从索引`start`到`end`元素的可迭代对象。

```dart
List<String> colors = ['red', 'green', 'blue', 'orange', 'pink'];
Iterable<String> range = colors.getRange(1, 4);
pring(range);   //(green, blue, orange)
```

- `setRange(int start, int end, Iterable<E> iterable, [int skipCount = 0])`: 使用`iterable`中的元素设置从`start`到`end`的元素，`skipCount `表示跳过`iterable`中头部元素个数，无返回值。

```dart
List<int> list1 = [1, 2, 3, 4];
List<int> list2 = [5, 6, 7, 8, 9];
list1.setRange(1, 3, list2, 3);
print(list1);  //[1, 8, 9, 4]
```

- removeRange(int start, int end)： 删除[index]到[end]范围内的对象。无返回值

```dart
List<int> list1 = [1, 2, 3, 4];
list1.removeRange(1, 3);
print(list1); //[1,4]
```

- fillRange(int start, int end, [E fillValue])： 使用`fillValue`填充[index]到[end]范围内的对象，无返回值

```dart
List<int> list1 = [1, 2, 3, 4];
list1.fillRange(1, 3, 0);
print(list1);  //[1, 0, 0, 4]

List<int> list = new List(3);
list.fillRange(0, 2, 1);
print(list); //  [1, 1, null]
```

- `replaceRange(int start, int end, Iterable<E> replacement)`: 使用`replacement`替换从`start`到`end`的元素，无返回值

```dart
List<int> list = [1, 2, 3, 4, 5];
list.replaceRange(1, 4, [6, 7]);
print(list);  //[1, 6, 7, 5]
```

- asMap(): 返回一个不可变的map。

```dart
List<int> list = [1, 2, 3, 4, 5];
print(list.asMap()); //{0: 1, 1: 2, 2: 3, 3: 4, 4: 5}
```

**对于能增删列表元素的方法，要求列表必须是能增长的，也就是为指定列表长度。否则会出错**

### 静态方法

- `castFrom<S,T>(List<S> source)`： 将列表元素类型`S`转换成另一种类似`T`，元素类型`S`必须是转换后类型`T`的字类，否则会出错，返回类型转换后的列表。
- copyRange:(List target, int at, List source,[int start, int end]): 将一个列表的范围复制到另一个列表

```dart
var list = [1.2, 2, 3, 4, 5];
var lis2 = [2,9,8,7,6,5];
List.copyRange(list, 1, lis2,2,5);
print(list);  //[1.2, 8, 7, 6, 5]
```

- `writeIterable<T>(List<T> target, int at, Iterable<T> source)`:  将可迭代的元素写入列表

### 操作符

`+`：将两个list合并后返回一个可增长的列表。

```dart
List<String> list = ['a', 'b', 'c'];
var list2 = list + ['12','11'];
print(list2);  //[a, b, c, 12, 11]
print(list);  //[a, b, c]
```

`==`： 比较两个list是否相等，比较内存指向。

```dart
List<int> list = [1, 2, 3, 4, 5];
var list2 = list;
print(list==list2);  //true
print(list==[1,2,3,4,5]);  //false
```



### 属性

| set属性 | 说明                                         | 用法                | 返回类型 |
| ------- | -------------------------------------------- | ------------------- | -------- |
| first   | 设置list的第一个值，第一个值必须存在否则出错 | list.first=value    | void     |
| last    | 设置list的最后一个值                         | list.last=value     | void     |
| length  | 设置list的长度                               | list.length = value | ints     |



| get属性  | 说明                           | 用法          | 返回类型 |
| -------- | ------------------------------ | ------------- | -------- |
| length   | 获取list的长度                 | list.length   | int      |
| reversed | 以相反的顺序返回此列表中的对象 | list.reversed | Iterable |

## set

### 构造函数

```dart
factory Set()
factory Set.identity()
  
factory Set.from(Iterable elements)
factory Set.of(Iterable<E> elements)
```

### 声明方式

```dart
var set = new Set()
Set one = {2,3}
```

### 方法

- `cast<R>`: 若所有值都是`R`的实例则正常进行，否则报错，返回`Set`集合
- contains(Object value)：若当前`set`集合中包含该值则返回true,否则返回false
- add(E value): 向当前`set`集合中添加值，若当前添加值不在集合中，则返回true，否则返回false。
- `addAll(Iterable<E> elements)`: 将`elements`中所有值添加到当前`set`集合，无返回值。
- remove(Object value): 移除`set`集合中的值，若值在集合中则移除成功返回true,否则返回false
- lookup(Object object): 查找指定值并返回，不存在则返回null
- `removeAll(Iterable<Object> elements)`: 移除集合中的所有值，无返回值。
- `retainAll(Iterable<Object> elements)`: 移除集合中不在`elements`集合中的所有值。无返回值
- removeWhere(bool test(E element))：移除集合中满足`test`的所有值，无返回值
- retainWhere(bool test(E element))：移除集合中不满足`test`的所有值，无返回值
- `containsAll(Iterable<Object> other)`:  若集合中包含`other`中的所有值，则返回true,否则返回false
- `intersection(Set<Object> other)`: 返回此集合与`other`都有的值组成的新`set`集合
- `union(Set<E> other)`：返回此集合与`other`集合的所有值组成的新`set`集合
- `difference(Set<Object> other)`: 返回集合中不在`other`集合中的所有值组成的新`set`集合
- clear()：清除集合中的所有值，无返回值
- toSet()： 转换成`set`集合

### 属性

| get属性  | 说明                      | 用法         | 返回类型 |
| -------- | ------------------------- | ------------ | -------- |
| iterator | 提供一个迭代此set的迭代器 | set.iterator | Iterator |

## map

### 构造函数

```dart
external factory Map()
  
factory Map.from(Map other)
 
factory Map.of(Map<K, V> other)
  
external factory Map.unmodifiable(Map other)

factory Map.identity()
  
factory Map.fromIterable(Iterable iterable,{K key(element), V value(element)})

factory Map.fromIterables(Iterable<K> keys, Iterable<V> values)

factory Map.fromEntries(Iterable<MapEntry<K, V>> entries)
```

### 声明方式

```dart
Map map = new Map()
Map map = {}

List<int> list = [1, 2, 3];
Map<String, int> map = new Map.fromIterable(list,
    key: (item) => item.toString(),
    value: (item) => item * item);
print(map);  //{1: 1, 2: 4, 3: 9}
```

### 方法

- forEach(void f(K key, V value))：每个键值对执行`f`方法，无返回值。
- clear()：清除map中的所有键值对。无返回值。
- remove(Object key)： 删除map中指定的键和对应值并返回对应的值，否则返回null

```dart
var m = {'login': 123};
var temp = m.remove('login');
print(temp);  // 123
```

- addAll(Map<K, V> other): 将另一个map中的键值对全部添加到当前map中，对于已存在的键值对直接覆盖。无返回值。

```dart
var m = {'login': 123};
m.addAll({'login': 0,'password': 123});
print(m);  //{login: 0, password: 123}
```

- putIfAbsent(K key, V ifAbsent()): 返回指定键的值，若不存在指定键，则用`ifAbsent`返回值设置键值对，返回新的值。

```dart
var m = {'login': 123};
print(m.putIfAbsent('login', ()=>789));  //123
print(m.putIfAbsent('password', ()=>111)); //111
print(m); //{login: 123, password: 111}
```

- removeWhere(bool predicate(K key, V value)): 删除所有满足`predicate`的键值对，无返回值。

```dart
var m = {'login': 123,'password': 0};
m.removeWhere((key,value){
  return key == 'login';
});
print(m);  //{password: 0}
```

- updateAll(V update(K key, V value))：对所有键值对执行`update`，用`update`返回值设置当前键的对应值。

```dart
var m = {'login': 123,'password': 0};
m.updateAll((key,value){
  return value+=1;
});
print(m); //{login: 124, password: 1}
```

- update(K key, V update(V value), {V ifAbsent()}): 用`update`返回值设置指定键的值，若不存在该键，则用`ifAbsent`的返回值设置键值对，若不存在该键也未提供`ifAbsent`,则报错。返回对应值。

```dart
var m = {'login': 123,'password': 0};
var temp =m.update('login', (value){
  print(value); //123
  return 345;
});
print(temp); //345
print(m); //{login: 345, password: 0}
```

- addEntries(Iterable<MapEntry<K, V>> newEntries)： 将`newEntries`中所有键值对添加到当前map中，若键值对已存在，则覆盖对应的值。无返回值。
- map<K2, V2>(MapEntry<K2, V2> f(K key, V value))： 将所有键值对执行`f`,返回值组成一个新的map并返回

```dart 
var m = {'login': 123,'password': 0};
var temp = m.map((key,value){
  return MapEntry(key+'dd',++value);
});
print(temp); //{logindd: 124, passworddd: 1}
print(m); //{login: 123, password: 0}
```

- containsKey(Object key)：包含指定键则返回true。
- containsValue(Object value)： 包含指定键值则返回true。
- cast<RK, RV>()：map键/值类型符合`rk`和`rv`则返回当前map，若存在不符合的键值对则报错。

### 属性

| get属性    | 说明                                                       | 返回类型 |
| ---------- | ---------------------------------------------------------- | -------- |
| isNotEmpty | 有至少一个键值对则返回true                                 | bool     |
| isEmpty    | 没有键值对则返回true                                       | bool     |
| length     | 返回键值对的个数                                           | int      |
| values     | 获取键值对中的值，按键的顺序迭代                           | Iterable |
| keys       | 获取键值对中的的键                                         | Iterable |
| entries    | 获取map的entries,每个键值对变成`MapEntry(key:value)`的形式 | Iterable |



### 操作符

| 操作符                | 说明     | 用法             | 返回类型 |
| --------------------- | -------- | ---------------- | -------- |
| `[]=(K key, V value)` | 设置键值 | map[key] = value | void     |
| `[](Object key)`      | 获取键值 | map[key]         | value    |

## 函数

函数类型为`Function`。

### 声明

声明形式：

```dart
返回值类型 函数名(){};
```

```dart
bool isNoble(int atomicNumber) {
  return _nobleGases[atomicNumber] != null;
}
```

若函数体是一个表达式，可以省略`{}`使用`=>`来表示。

```dart
boll isNoble(int atomicNumber)=>_nobleGases[atomicNumber] != null;
```

### 参数

函数有两种类型参数：必需和可选。

>  可选参数只能在必需参数之后定义，可选参数可以是命名参数或位置参数。

#### 命名参数

定义时使用`{}`包装的参数是**可选**的命名参数，调用时使用`参数名：值`的形式传参。

```dart
//定义
void enableFlags({bool bold, bool hidden}) {...}

//调用
enableFlags(bold: true, hidden: false);
```

虽然命名参数时可选参数，但是可以使用`@required`限制参数，使其调用时必须传递该参数值。

```dart
const Scrollbar({Key key, @required Widget child})
```

#### 位置参数

使用`[]`包装的参数是**可选**的位置参数。

```dart
String say(String from, String msg, [String device]) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  return result;
}

say('Bob', 'Howdy') == 'Bob says Howdy';

say('Bob', 'Howdy', 'smoke signal') ==
    'Bob says Howdy with a smoke signal'
```

#### 默认参数值

命名参数和位置参数在定义时可以使用`=`设置默认值，默认值必须是编译时常量，若未指定默认值则默认值为null。

```dart
//命名参数指定默认值
void enableFlags({bool bold = false, bool hidden = false}) {...}

//位置参数指定默认值
String say(String from, String msg,[String device = 'carrier pigeon', String mood]) {}
```

### 匿名函数

匿名参数定义形式:

```dart
([[Type] param1[, …]]) {
  codeBlock;
};
```

### 函数作为参数

```dart
//1 未明确定义参数，但可以接受参数
int test1(Function callback){
    callback()
}
test1((){
    print('callback')
})
    
//2 定义指定参数
int test2(int callback(int a,int b)){
    callback(1,2)
}
test2((int a,int b){
    print(a);
    print(b);
})

//3 
typedef Callback = int Function(int a, int b)
int test3(Callback cb){
	cb(1,2)
}
test3((a,b){
    print(a);
    print(b);
})
```

### 词法作用域

### 闭包

闭包是一个函数对象，可以在其词法作用域内访问变量，即使该函数在初始作用域外调用。

```dart
Function makeAdder(num addBy) {
  return (num i) => addBy + i;
}

void main() {
  // Create a function that adds 2.
  var add2 = makeAdder(2);

  // Create a function that adds 4.
  var add4 = makeAdder(4);

  assert(add2(3) == 5);
  assert(add4(3) == 7);
}
```

### 返回值

每个函数都有返回值，若函数没有明确指定返回值，则会隐式添加`return null`到函数体中。

## 类

 每个对象都是一个类的实例，并且所有类都来自Object 。

使用关键字`class`声明一个类。一个类大体上可以归结为由`构造函数`、`实例方法`、`实例变量`组成。

### 构造函数

 创建一个与其类具有相同名称的函数来声明一个构造函数 ，实例化时调用，初始化实例对象。

```dart
class Point {
  num x, y;

  Point(num x, num y) {
    // There's a better way to do this, stay tuned.
    this.x = x;
    this.y = y;
  }
}
```

**this关键字引用当前实例 **

#### 默认构造函数

如果不声明构造函数，系统会提供默认的构造函数。默认构造函数没有参数，并在超类中调用无参数构造函数。 

#### 命名构造函数

 使用命名构造函数可为一个类实现多个构造函数 。

```dart
class Point {
  num x, y;

  Point(this.x, this.y);

  //命名构造函数
  Point.origin() {
    x = 0;
    y = 0;
  }
}
```

#### 构造函数重定向

有时，构造函数的唯一目的是重定向到同一类中的另一个构造函数。重定向构造函数的主体为空，构造函数调用出现在冒号`:`后面 

```dart
class Point {
  num x, y;

  // The main constructor for this class.
  Point(this.x, this.y);

  // Delegates to the main constructor.
  Point.alongXAxis(num x) : this(x, 0);
}
```

#### 工厂构造函数

 使用`factory`关键字实现一个(不总是创建该类新实例的)构造函数。

 例如，工厂构造函数可能会从缓存返回一个实例，或者可能会返回一个子类型的实例。

```dart
class Logger {
  final String name;
  bool mute = false;

  // _cache is library-private, thanks to
  // the _ in front of its name.
  static final Map<String, Logger> _cache =
      <String, Logger>{};

  factory Logger(String name) {
    return _cache.putIfAbsent(
        name, () => Logger._internal(name));
  }

  Logger._internal(this.name);

  void log(String msg) {
    if (!mute) print(msg);
  }
}
```

> 工厂构造函数不能使用this关键字

### Getters和Setters

getters: 根据其他值来返回出一个属性值。

setters: 根据对该属性设置值时进行一系列操作。

```dart
class Rectangle {
  num left, top, width, height;
  Rectangle(this.left, this.top, this.width, this.height);
  
  //定义一个get属性
  num get right => left + width;
  
  //定义一个set属性
  set right(num value) => left = value - width;
}

void main() {
  var rect = Rectangle(3, 4, 20, 15);
  print(rect.right)  //获取计算后的值left + width
  rect.right = 12;   //设置值，执行 left = 12 - width
  
}
```

### 实例化

通过调用构造函数来实例化对象。 使用常量构造函数创建编译时常量，将const关键字放在构造函数名称之前 。

```dart
var p1 = Point(2, 2);
var p2 = new Point.fromJson({'x': 1, 'y': 2}); //dart2.0以后 new 关键字变为可选
var p = const ImmutablePoint(2, 2);
```

如果在声明了实例变量的位置（而不是在构造函数或方法中）初始化实例变量，则在创建实例时（即在构造函数及其初始化程序列表执行之前）设置值。 

```dart
class Point {
  num x; // Declare instance variable x, initially null.
  num y; // Declare y, initially null.
  num z = 0; //实例化时会在构造函数之前执行。
}
```

 所有实例变量都会生成一个隐式的getter方法。非最终实例变量也会生成隐式的setter方法。 可以用于获取或设置实例化对象指定变量的值。

```dart
class Point {
  num x;
  num y;
}

void main() {
  var point = Point();
  point.x = 4; // Use the setter method for x.
  assert(point.x == 4); // Use the getter method for x.
  assert(point.y == null); // Values default to null.
}
```

### 继承

通过关键字`extend`来继承一个类，使得当前子类能使用父类中的方法和变量。

```dart
class subclass extends superclass{ ...}
```

继承时默认调用的是父类的默认构造函数，要调用符类的其他构造函数需要使用`super`关键字。

```dart
class Employee extends Person {
  Employee() : super.fromJson(defaultData);
  // ···
}
```

 除了调用超类构造函数外，还可以在构造函数主体运行之前初始化实例变量。用逗号分隔初始化程序。 

```dart
Point.fromJson(Map<String, num> json)
    : x = json['x'],
      y = json['y'] {
  print('In Point.fromJson(): ($x, $y)');
}
```

#### 重写成员

在成员变量之前使用`@override`，子类可以重写父类中的继承的方法、getter、setters.

```dart
class SmartTelevision extends Television {
  @override
  void turnOn() {...}
  // ···
}
```

若要缩小方法参数类型和实例变量类型,在其之前使用`covariant`关键字

```dart
class Animal {
  void chase(Animal x) { ... }
}

class Mouse extends Animal { ... }

class Cat extends Animal {
  void chase(covariant Mouse x) { ... }
}
```

#### noSuchMethod()

 尝试使用不存在的方法或实例变量时进行检测或作出反应，可以重写`noSuchMethod（）` 

```dart
class A {
  // Unless you override noSuchMethod, using a
  // non-existent member results in a NoSuchMethodError.
  @override
  void noSuchMethod(Invocation invocation) {
    print('You tried to use a non-existent member: ' +
        '${invocation.memberName}');
  }
}
```

### extension

通过借用其他类的方法或变量来实现自身方法和变量。

语法：

```dart
extension <extension name> on <type> {
  (<member definition>)*
}
```

示例：

```dart
extension NumberParsing on String {
  int parseInt() {
    return int.parse(this);
  }

  double parseDouble() {
    return double.parse(this);
  }
}
```

### 枚举类

 枚举类型（通常称为枚举）是一种特殊的类，用于表示固定数量的常量值 。

**枚举类不能有子类，混合，接口和实例化行为。**

#### 声明枚举类

使用关键字`enum`定义一个枚举类

```dart
enum Color { red, green, blue }
```

 枚举中的每个值都有一个索引，它返回该值在枚举声明中从零开始的位置 

```dart
assert(Color.red.index == 0);
assert(Color.green.index == 1);
assert(Color.blue.index == 2);
```

#### 访问值

使用`values`可以获取枚举成员列表,使用`.`直接访问成员。

```dart
List<Color> colors = Color.values;  //获取成员列表
assert(colors[2] == Color.blue); //使用. 访问成员
```

### 混合继承

混合继承是在不更改类或创建子类的情况下向类添加功能的方法 。使用`with`关键字后跟一个或多个类名称实现混合继承。

```dart
class Maestro extends Person with Musical, Aggressive, Demented {
  Maestro(String maestroName) {
    name = maestroName;
    canConduct = true;
  }
}
```

#### 定义混合

使用关键字`mixin`定义一个混合。

```dart
mixin M {
  String toString() => "Magnificent!";
}
class C with M {
  ...
}
```

使用关键字`on`指定混合的父类，与`class`继承中的`extend`功能类似

```dart
mixin MusicalPerformer on Musician {
  // ···
}
```

### 抽象类

使用`abstract`关键字声明一个抽象类。

```dart
abstract class AbstractContainer {
  // Define constructors, fields, methods...
}
```

#### 抽象方法

定义一个抽象方法，使用分号`;`代替方法主体 ;抽象方法在子类继承时实现。

```dart
abstract class Doer {
  void doSomething(); //定义一个抽象方法
}

class EffectiveDoer extends Doer {
  //在子类中实现父类中的抽象方法
  void doSomething() {
   ...
  }
}
```

### 接口

 每个类都隐式定义一个接口，其中包含该类及其实现的所有接口的所有实例成员 。

 想创建一个支持B类API的A类而不继承B的实现，则A类应实现B接口 。

使用关键字`implements `实现一个或多个接口。

```dart
// A person. The implicit interface contains greet().
class Person {
  // In the interface, but visible only in this library.
  final _name;

  // Not in the interface, since this is a constructor.
  Person(this._name);

  // In the interface.
  String greet(String who) => 'Hello, $who. I am $_name.';
}

// An implementation of the Person interface.
class Impostor implements Person {
  get _name => '';

  String greet(String who) => 'Hi $who. Do you know who I am?';
}
//实现多个接口
class Point implements Comparable, Location {...}
```

### 静态方法和变量

使用关键字`static`定义静态方法和静态变量。

```dart
class Queue {
  //定义一个静态变量
  static const initialCapacity = 16;
  // ···
}

void main() {
  assert(Queue.initialCapacity == 16);  //类名直接访问静态变量
}

class Point {
  num x, y;
  Point(this.x, this.y);
	//定义一个静态方法
  static num distanceBetween(Point a, Point b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return sqrt(dx * dx + dy * dy);
  }
}
void main() {
  var a = Point(2, 2);
  var b = Point(4, 4);
  var distance = Point.distanceBetween(a, b); //类名直接访问静态方法
  assert(2.8 < distance && distance < 2.9);
  print(distance);
}
```

实例成员不能方法静态方法和静态变量，只能通过类名直接返回。

## 泛型

使用`<...>`的形式对变量值类型进行限制。

```dart
var names = List<String>();
Map<String,int> map = {};

//泛型参数T相当于一个占位符，
abstract class Cache<T> {
  T getByKey(String key);
  void setByKey(String key, T value);
}
```

### 限制参数类型

但实现一个泛型时，使用`extends`关键字限制参数类型。

```dart
class Foo<T extends SomeBaseClass> {
  // Implementation goes here...
  String toString() => "Instance of 'Foo<$T>'";
}
```

### 泛型方法

 通用方法的类型参数在方法或函数名称后的尖括号内列出 。

```dart
T first<T>(List<T> ts) {
  // Do some initial work or error checking, then...
  T tmp = ts[0];
  // Do some additional checking or processing...
  return tmp;
}
```

## 文件引入

使用`import`关键字引入文件。

```dart
import 'dart:html';
```

### 别名

为了避免在使用引入文件时变量名重复，可使用`as`关键字给引入的文件一个别名，可通过别名来访问该文件中的数据。

```dart
import 'package:lib1/lib1.dart';
import 'package:lib2/lib2.dart' as lib2;

// Uses Element from lib1.
Element element1 = Element();

// Uses Element from lib2.
lib2.Element element2 = lib2.Element();
```

### 部分引入

使用关键字`show`跟变量名表示只引入当前变量。

使用关键字`hide`跟变量名表示引入排除当前变量的其他所有变量。

```dart
// Import only foo.
import 'package:lib1/lib1.dart' show foo;

// Import all names EXCEPT foo.
import 'package:lib2/lib2.dart' hide foo;
```

### 延迟加载

使用关键字`deferred as `延迟引入一个文件

```dart
import 'package:greetings/hello.dart' deferred as hello;
```

在使用延迟引入文件时，必须使用异步的形式。比如：

```dart
Future greet() async {
  await hello.loadLibrary();  //此处使用延迟加载的文件
  hello.printGreeting();
}
```

## 异步

### Futures

类似于javascript中的promise

#### 构造函数

```dart
//创建一个包含computation返回值的future,
//若computation出错，则最终返回一个包含出错信息的future
//若computation返回值的是一个future,则最终返回结果将等待该future完成的结果返回一个future。 ？
//若computation返回值不是一个future,则直接返回一个关于该值的future
factory Future(FutureOr<T> computation());

//解释同上
factory Future.microtask(FutureOr<T> computation());

//返回一个包含computation返回值的future
//若computation出错，返回一个错误信息的future
//若computation返回一个future,则直接返回该future
//若computation返回值不是一个future,则返回一个包含该值的完成状态的future
factory Future.sync(FutureOr<T> computation());

//创建一个关于value的完成状态的future
//若value是一个future，则返回一个（关于该future且返回值相同的）等待状态的future
//若value不是一个future,则返回一个(关于value的)完成状态的future
factory Future.value([FutureOr<T> value]);

//返回一个状态为状态的future
factory Future.error(Object error, [StackTrace stackTrace]);

//创建一个在延时后运行的future
factory Future.delayed(Duration duration, [FutureOr<T> computation()])
```

#### 方法

- **wait**：返回一个所有`future`完成结果组成的`list`

```dart
//若eagerError为true,所有future中出现第一个错误状态的future就立刻返回一个该状态的future,若没错正常返回
//若提供了cleanUp，每个错误状态的future都会都用该方法，返回一个成功的future,若cleanUp出错是无法捕获的
static Future<List<T>> wait<T>(Iterable<Future<T>> futures,
                               {bool eagerError: false, void cleanUp(T successValue)})
```

- **any**: 返回一个最先完成的future,无论该future结果如何，其他future结果将被忽略。

```dart
//若futures为null或者不存在完成的future，最终返回一个用不完成的future
static Future<T> any<T>(Iterable<Future<T>> futures)
```

- **forEach**: 对每个元素执行`action`

```dart
//若action返回一个future,等待该future完成后再进行执行下一个元素
//若所有元素都执行了action后，返回一个null状态的future
//若action出错，则停止迭代返回该future
static Future forEach<T>(Iterable<T> elements, FutureOr action(T element))
```

- **doWhile**： 重复执行一个操作，直到返回false

```dart
static Future doWhile(FutureOr<bool> action())
```

- **then**:当future完成时，调用回调函数,若该future有结果则返回该结果。

```dart
//若提供了onError，当future错误状态时调用该方法。
Future<R> then<R>(FutureOr<R> onValue(T value), {Function onError})
```

- **catchError**：future出错时执行

```dart
//若future未出错，则正常返回结果。
//若future出错，则test先调用，返回false则直接返回该future信息，返回true则onError函数被调用。
//若test被省略则默认返回true
Future<T> catchError(Function onError, {bool test(Object error)})
```

- **whenComplete**：不关错误或成功，当future完成时调用回调函数。

```dart
Future<T> whenComplete(FutureOr action());
```

- **asStream**：将future结果转换为`Stream`。

```dart
Stream<T> asStream();
```

- **timeout**：future在规定时间内完成则返回对应结果。 若未完成则使用回调函数`onTimeout`返回值返回一个future

```dart
Future<T> timeout(Duration timeLimit, {FutureOr<T> onTimeout()});
```

### Stream

文件传输或读取等可以表示为数据序列，统称为Stream。

#### 构造函数

```dart
//创建一个空的Stream对象
const factory Stream.empty();

//创建一个在完成前发出单个数据事件的Stream
factory Stream.value(T value);
 
//创建一个在完成前发出单个错误事件的Stream
factory Stream.error(Object error, [StackTrace stackTrace]);

//根据future创建一个单一的Stream
factory Stream.fromFuture(Future<T> future);

//根据一组future创建一个Stream
factory Stream.fromFutures(Iterable<Future<T>> futures);

//根据可迭代对象创建一个单一的Stream
factory Stream.fromIterable(Iterable<T> elements);

//创建一个根据时间间隔重复触发事件的Stream
factory Stream.periodic(Duration period,[T computation(int computationCount)]);

//创建一个Stream，将现有流的所有事件通过sink转换
factory Stream.eventTransformed(Stream source, EventSink mapSink(EventSink<T> sink))
```

#### 方法

- **castFrom**：将Stream对象转换成其他类型,新类型必须是原类型的子类。

```dart
static Stream<T> castFrom<S, T>(Stream<S> source)
```

- **asBroadcastStream**：返回多个监听同一事件的Stream.

```dart
Stream<T> asBroadcastStream(
      {void onListen(StreamSubscription<T> subscription),
      void onCancel(StreamSubscription<T> subscription)})
```

- **listen**: 为Stream添加订阅

```dart
//stream中的数据都会调用onData,若stream出错则调用onError
//若stream关闭或发送完成则调用onDone
//如果cancelOnError为true，订阅将自动取消传递第一个错误事件时
StreamSubscription<T> listen(void onData(T event),
      {Function onError, void onDone(), bool cancelOnError});
```

- **where**: 创建一个(丢弃当前Stream中的个别元素的)Stream

```dart
Stream<T> where(bool test(T event))
```

- **map**:将Stream中的元素转换成新的Stream.

```dart
//使用convert转换每个元素，并发送转换后的结果
Stream<S> map<S>(S convert(T event))
```

- **asyncMap**：异步形式的map

```dart
//转换后的结果可能是一个future
Stream<E> asyncMap<E>(FutureOr<E> convert(T event))
```

- **asyncExpand**: 将元素转换成异步事件

```dart
Stream<E> asyncExpand<E>(Stream<E> convert(T event))
```

- **handleError**: 处理Stream中的一些错误

```dart
//若stream发送一个错误于test匹配返回true,则调用onError
//若省略test则每个都会调用onError
Stream<T> handleError(Function onError, {bool test(error)})
```

- **expand**: 将Stream中的元素成一系列元素。

```dart
Stream<S> expand<S>(Iterable<S> convert(T element))
```

- **pipe**:

### async 和await

异步函数仅在遇到第一个await表达式（详细信息）之前执行。然后，它返回Future对象，仅在await表达式完成后才恢复执行。 

## 文件操作

## 网络编程

### http

### socket



