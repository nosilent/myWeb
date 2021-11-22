## 变量

### 定义变量

 变量以 $ 符号开始，后面跟着变量的名称 ， 变量名是区分大小写的 

```php
 <?php $txt="Hello world!"; $x=5; $y=10.5; ?> 
```

### 变量作用域

` PHP `有四种不同的变量作用域 

- local
- global
- static
- parameter

####  局部和全局作用域

`全局变量`可以被脚本中的任何部分访问，要在一个函数中访问一个全局变量，需要使用 global 关键字。 

```php
<?php
$x=5;
$y=10;
function myTest()
{
    global $x,$y;
    $y=$x+$y;
}
myTest();
echo $y; // 输出 15
?>
```

` PHP` 将所有全局变量存储在一个名为 `$GLOBALS[index]` 的数组中。 *index* 保存变量的名称。这个数组可以在函数内部访问，也可以直接用来更新全局变量。 

```php
<?php
$x=5;
$y=10;
function myTest()
{
    $GLOBALS['y']=$GLOBALS['x']+$GLOBALS['y'];
} 
myTest();
echo $y;
?>
```

#### Static 作用域

 一个函数完成时，它的所有变量通常都会被删除 , 有时候希望某个局部变量不要被删除 , 在第一次声明该变量时使用 **static** 关键字 

```php
function myTest()
{
    static $x=0;
    echo $x;
    $x++;
    echo PHP_EOL;    // 换行符
}
myTest()
myTest()
```

 每次调用该函数时，该变量将会保留着函数前一次被调用时的值 

#### 参数作用域

 参数是通过调用代码将值传递给函数的局部变量 

```php
<?php
function myTest($x)
{
    echo $x;
}
myTest(5);
?>
```

## 输出语句

 在 PHP 中有两个基本的输出方式： echo 和 print。 

 echo - 可以输出一个或多个字符串 ， print -只允许输出一个字符串， echo 输出的速度比 print 快， echo 没有返回值，print有返回值1 

### echo

 echo 是一个语言结构，使用的时候可以不用加括号，也可以加上括号： echo 或 echo()。 

 使用 echo 命令输出字符串（字符串可以包含 HTML 标签） 

```php
<?php
  $txt2 = "学习 PHP"
echo "<h2>PHP 很有趣!</h2>";
echo "Hello world!<br>";
echo "在 $txt2 学习 PHP ";
echo "这是一个", "字符串，", "使用了", "多个", "参数。";
?>
```

### print

 print 同样是一个语言结构，可以使用括号，也可以不使用括号： print 或 print()。 

```php
<?php
$txt1="学习 PHP";
$txt2="RUNOOB.COM";
print $txt1;
print "<h2>PHP 很有趣!</h2>";
print "在 $txt2 学习 PHP ";
?>
```

## EOF(heredoc) 

 EOF(heredoc)是一种在命令行shell和程序语言（像Perl、PHP、Python和Ruby）里定义一个字符串的方法。 

- 必须后接分号，否则编译通不过。
- **EOF** 可以用任意其它字符代替，只需保证结束标识与开始标识一致。
- 结束标识必须顶格独自占一行(即必须从行首开始，前后不能衔接任何空白和字符)。**
-  开始标识可以不带引号或带单双引号，不带引号与带双引号效果一致，解释内嵌的变量和转义符号，带单引号则不解释内嵌的变量和转义符号。
-  当内容需要内嵌引号（单引号或双引号）时，不需要加转义符，本身对单双引号转义，此处相当与q和qq的用法

```php
<?php
echo <<<EOF
    <h1>我的第一个标题</h1>
    <p>我的第一个段落。</p>
EOF;
// 结束需要独立一行且前后不能空格
?>
```

 在` heredoc` 中，变量不需要用连接符 **.** 或 **,** 来拼接 

```php
<?php
$name="runoob";
$a= <<<EOF
    "abc"$name
    "123"
EOF;
// 结束需要独立一行且前后不能空格
ech
```

## 数据类型

 String（字符串）, Integer（整型）, Float（浮点型）, Boolean（布尔型）, Array（数组）, Object（对象）, NULL（空值）。 

使用` var_dump()` 函数返回变量的数据类型和值 。 

 对象必须使用class关键字声明类对象 

## 常量

 一个常量由英文字母、下划线、和数字组成,但数字不能作为首字母出现。 (常量名不需要加 $ 修饰符) 

 设置常量，使用 define() 函数 。常量在定义后，默认是全局变量，可以在整个运行的脚本的任何地方使用 。

```php
bool define ( string $name , mixed $value [, bool $case_insensitive = false ] )
```

- **name：**必选参数，常量名称，即标志符。
- **value：**必选参数，常量的值。
- **case_insensitive** ：可选参数，如果设置为 TRUE，该常量则大小写不敏感。默认是大小写敏感的。

```php
<?php
// 区分大小写的常量名
define("GREETING", "欢迎访问");
echo GREETING;    // 输出 "欢迎访问"
echo '<br>';
echo greeting;   // 输出 "greeting"
?>
```

## 字符串变量

 字符串变量用于包含有字符的值 。

### 并置运算符

 在 PHP 中，只有一个字符串运算符 ，并置运算符 `. `用于把两个字符串值连接起来 

```php
<?php
$txt1="Hello world!";
$txt2="What a nice day!";
echo $txt1 . " " . $txt2;
?>
```

###  字符串长度

`strlen()` 函数返回字符串的长度（字符数） 

```php
<?php
echo strlen("Hello world!");
?>
```

###  字符串查找

` strpos() `函数用于在字符串内查找一个字符或一段指定的文本 ,

如果在字符串中找到匹配，该函数会返回第一个匹配的字符位置。如果未找到匹配，则返回 FALSE .

```php
<?php
echo strpos("Hello world!","world");
?>
```

## 数组

 数组是一个能在单个变量中存储多个值的特殊变量 ,`array()` 函数用于创建数组 

 在 PHP 中，有三种类型的数组 

- **数值数组** - 带有数字 ID 键的数组
- **关联数组** - 带有指定的键的数组，每个键关联一个值
- **多维数组** - 包含一个或多个数组的数组

### 数值数组

 有两种创建数值数组的方法 

```php
//自动分配id
$cars=array("Volvo","BMW","Toyota");
//手动分配id
$cars[0]="Volvo";
$cars[1]="BMW";
$cars[2]="Toyota";
```

### 数组的长度 

 count() 函数用于返回数组的长度（元素的数量） 

```php
<?php
$cars=array("Volvo","BMW","Toyota");
echo count($cars);
?>
```

### 遍历数值数组

 历并打印数值数组中的所有值，可以使用 for 循环 

```php
$cars=array("Volvo","BMW","Toyota");
$arrlength=count($cars);
for($x=0;$x<$arrlength;$x++)
{
    echo $cars[$x];
    echo "<br>";
}
```

### 关联数组

 关联数组是使用分配给数组的指定的键的数组 , 两种创建关联数组的方法 

```php
//一
$age=array("Peter"=>"35","Ben"=>"37","Joe"=>"43");
//二
$age['Peter']="35";
$age['Ben']="37";
$age['Joe']="43";
```

### 遍历关联数组

 遍历并打印关联数组中的所有值，可以使用 `foreach` 循环 

```php
$age=array("Peter"=>"35","Ben"=>"37","Joe"=>"43");
foreach($age as $x=>$x_value)
{
    echo "Key=" . $x . ", Value=" . $x_value;
    echo "<br>";
}
```

### 数组排序

 数组中的元素可以按字母或数字顺序进行降序或升序排列 ，  数组排序函数 ：

- `sort()` - 对数组进行升序排列
- `rsort()` - 对数组进行降序排列
- `asort() `- 根据关联数组的值，对数组进行升序排列
- `ksort() `- 根据关联数组的键，对数组进行升序排列
- `arsort()` - 根据关联数组的值，对数组进行降序排列
- `krsort() `- 根据关联数组的键，对数组进行降序排列

```php
$age=array("Peter"=>"35","Ben"=>"37","Joe"=>"43");
arsort($age);
```

## 超级全局变量

 系统中自带的变量，在一个脚本的全部作用域中都可用 

| 超级全局变量 | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| $GLOBALS     | 包含了全部变量的全局组合数组。变量的名字就是数组的键         |
| $_SERVER     | 一个包含了诸如头信息(header)、路径(path)、以及脚本位置等等信息的数组，数组中的项目由 Web 服务器创建 |
| $_REQUEST    | 用于收集HTML表单提交的数据                                   |
| $_POST       | 广泛应用于收集表单数据，在form标签的指定属性："method="post" |
| $_GET        | 广泛应用于收集表单数据，也可以收集URL中发送的数据            |
| $_FILES      |                                                              |
| $_ENV        |                                                              |
| $_COOKIE     |                                                              |
| $_SESSION    |                                                              |

```php
$x = 75; 
$y = 25;
$GLOBALS['z'] = $GLOBALS['x'] + $GLOBALS['y']; 
echo $_SERVER['PHP_SELF'];
$name = $_REQUEST['fname'];
```

## 循环

 在 PHP 中，提供了下列循环语句 

- **while** - 只要指定的条件成立，则循环执行代码块
- **do...while** - 首先执行一次代码块，然后在指定的条件成立时重复这个循环
- **for** - 循环执行代码块指定的次数
- **foreach** - 根据数组中每个元素来循环代码块

 ```php
$x=array("one","two","three");
foreach ($x as $value)
{
    echo $value . "<br>";
}
 ```

## 函数

```php
function writeName()
{
    echo "Kai Jim Refsnes";
}
echo "My name is ";
writeName();
```

##  魔术常量

 PHP 向它运行的任何脚本提供了大量的预定义常量 , 只有在加载了这些扩展库时才会出现，或者动态加载后，或者在编译时已经包括进去了 。

 有八个魔术常量它们的值随着它们在代码中的位置改变而改变 ,[参考]( https://www.runoob.com/php/php-magic-constant.html )

| 魔术常量        | 说明                                     |
| --------------- | ---------------------------------------- |
| `__LINE__`      | 当前魔术常量所在代码的行数               |
| `__FILE__`      | 文件的完整路径和文件名                   |
| `__DIR__`       | 文件所在的目录                           |
| `__FUNCTION__`  | 在函数体内使用，返回该函数被定义时的名字 |
| `__CLASS__`     | 在类中使用，返回该类被定义时的名字       |
| `__TRAIT__`     | 代码复用的一个方法                       |
| `__METHOD__`    | 返回该方法被定义时的名字                 |
| `__NAMESPACE__` | 当前命名空间的名称                       |

```php
<?php
namespace MyProject;
 
echo '命名空间为："', __NAMESPACE__, '"'; // 输出 "MyProject"
?>
```

## 面向对象

  面向对象的程序设计 (缩写：OOP ),



 

 



