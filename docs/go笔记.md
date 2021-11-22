## flag包使用

### 获取命令行参数

1. 定义

2. 解析

```go
//第一种
func main(){
    //1. 使用flag.String函数定义一个命令行参数"one",默认值为"default",描述为"one value"
    one := flag.String("one","default","one value")
    //2. 使用flag.Parse函数转化
    flag.Parse()
    flag.Usage()  //显示参数信息  -one 参数类型  描述
    fmt.Println(*one)
}

//第二种
func mian(){
	var one string
    
    flag.StringVar(&one,"one","default","one value")
    flag.Parse()
    fmt.Println(one)
}
```

### 模拟文件拷贝

```go
var force, show bool

func mycopy(src, targetName string) {
	fmt.Println(src, targetName)
	file, err := os.Open(src)
	if err != nil {
		fmt.Println("err1", err)
		return
	}
	defer file.Close()

	_, err2 := os.Stat(targetName)
	if err2 != nil {
		file2, _ := os.Create(targetName)
		io.Copy(file2, file)
		return
	}

	if !force {
		fmt.Printf("%v文件已存在, 是否覆盖？y/n\n", targetName)
		read := bufio.NewReader(os.Stdin)
		data, _, _ := read.ReadLine()
		if data[0] != 'y' {
			return
		}
		file2, _ := os.Create(targetName)
		io.Copy(file2, file)
	}

}
func main() {
	flag.BoolVar(&force, "f", false, "是否强制执行操作")
	flag.BoolVar(&show, "show", false, "是否显示复制路径")
	flag.Parse()
	if flag.NArg() < 2 {
		flag.Usage()
		return
	}
	mycopy(flag.Arg(0), flag.Arg(1))
}
```

## 数据库连接

### 数据库基本使用

#### 引入库

```go
import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"  //驱动
)
```

#### 连接数据库

```go
//第一个参数：mysql， 数据库类型
//第二个参数：root:0000@tcp(127.0.0.1:3306)/go_sql，用户名：密码@协议(ip:端口)/数据库名
db, err := sql.Open("mysql","root:0000@tcp(127.0.0.1:3306)/go_sql")
```

#### 操作数据库

```go
rows, err := db.Query("select * from users")
if err != nil {
    fmt.Print("数据查询失败 \n", err)
}
```

#### 数据操作

```go
type User struct {
	username string
	age      int
	id       int
}
for rows.Next() {
    user := User{}
    rows.Scan(&user.username, &user.age, &user.id)
    fmt.Printf("name=%v \t age=%v \t id=%v;\n", user.username, user.age, user.id)
}
```

#### 完整代码

```go
package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", "root:0000@tcp(127.0.0.1:3306)/go_sql")
	if err != nil {
		fmt.Println("数据库出错了")
	}
	if Err := db.Ping(); Err != nil {
		fmt.Println("Err", Err)
	}
    
    //db.Query：查询数据
	rows, err := db.Query("select * from users")
	if err != nil {
		fmt.Print("数据查询失败 \n", err)
	}
	for rows.Next() {
		user := User{}
		rows.Scan(&user.username, &user.age, &user.id)
		fmt.Printf("name=%v \t age=%v \t id=%v;\n", user.username, user.age, user.id)
	}
    
    //db.Exec可以 增删改查 操作
	res, err := db.Exec("insert into users (username,age) values (?,?)", "王五", 39)
	if err != nil {
		fmt.Print("err", err)
	}
}
type User struct {
	username string
	age      int
	id       int
}
```

### type DB

#### sql.Open

```go
//参数1：数据库类型，如 mysql
//参数2：数据库信息，如 用户名:密码@tcp(ip:端口)/数据库名名称
func Open(driverName, dataSourceName string) (*DB, error)
```

数据库连接方法。

#### func (*DB) [Driver](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#1031)(https://studygolang.com/static/pkgdoc/pkg/database_sql.htm#pkg-index)

```
func (db *DB) Driver() driver.Driver
```

Driver方法返回数据库下层驱动。

#### func (*DB) [Ping](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#448)

```
func (db *DB) Ping() error
```

Ping检查与数据库的连接是否仍有效，如果需要会创建连接。

#### func (*DB) [Close](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#464)

```
func (db *DB) Close() error
```

Close关闭数据库，释放任何打开的资源。一般不会关闭DB，因为DB句柄通常被多个go程共享，并长期活跃。

#### func (*DB) [SetMaxOpenConns](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#550)

```
func (db *DB) SetMaxOpenConns(n int)
```

SetMaxOpenConns设置与数据库建立连接的最大数目。

如果n大于0且小于最大闲置连接数，会将最大闲置连接数减小到匹配最大开启连接数的限制。

如果n <= 0，不会限制最大开启连接数，默认为0（无限制）。

#### func (*DB) [SetMaxIdleConns](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#517)

```
func (db *DB) SetMaxIdleConns(n int)
```

SetMaxIdleConns设置连接池中的最大闲置连接数。

如果n大于最大开启连接数，则新的最大闲置连接数会减小到匹配最大开启连接数的限制。

如果n <= 0，不会保留闲置连接。

#### func (*DB) [Exec](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#862)

```go
func (db *DB) Exec(query string, args ...interface{}) (Result, error)
```

Exec执行一次命令（包括查询、删除、更新、插入等），不返回任何执行结果。参数args表示query中的占位参数。

#### func (*DB) [Query](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#911)

```go
func (db *DB) Query(query string, args ...interface{}) (*Rows, error)
```

Query执行一次查询，返回多行结果（即Rows），一般用于执行select命令。参数args表示query中的占位参数。

Example

#### func (*DB) [QueryRow](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#992)

```go
func (db *DB) QueryRow(query string, args ...interface{}) *Row
```

QueryRow执行一次查询，并期望返回最多一行结果（即Row）。QueryRow总是返回非nil的值，直到返回值的Scan方法被调用时，才会返回被延迟的错误。（如：未找到结果）

Example

#### func (*DB) [Prepare](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#820)

```go
func (db *DB) Prepare(query string) (*Stmt, error)
```

Prepare创建一个准备好的状态用于之后的查询和命令。返回值可以同时执行多个查询和命令。

#### func (*DB) [Begin](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#999)

```go
func (db *DB) Begin() (*Tx, error)
```

Begin开始一个事务。隔离水平由数据库驱动决定。

### type [Rows](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#1518)

```go
type Rows struct {
    // 内含隐藏或非导出字段
}
```

Rows是查询的结果。它的游标指向结果集的第零行，使用Next方法来遍历各行结果：

```go
rows, err := db.Query("SELECT ...")
...
defer rows.Close()
for rows.Next() {
    var id int
    var name string
    err = rows.Scan(&id, &name)
    ...
}
err = rows.Err() // get any error encountered during iteration
...
```

#### func (*Rows) [Columns](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#1562)

```go
func (rs *Rows) Columns() ([]string, error)
```

Columns返回列名。如果Rows已经关闭会返回错误。

#### func (*Rows) [Scan](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#1584)

```go
func (rs *Rows) Scan(dest ...interface{}) error
```

Scan将当前行各列结果填充进dest指定的各个值中。

如果某个参数的类型为*[]byte，Scan会保存对应数据的拷贝，该拷贝为调用者所有，可以安全的,修改或无限期的保存。如果参数类型为*RawBytes可以避免拷贝；参见RawBytes的文档获取其使用的约束。

如果某个参数的类型为*interface{}，Scan会不做转换的拷贝底层驱动提供的值。如果值的类型为[]byte，会进行数据的拷贝，调用者可以安全使用该值。

#### func (*Rows) [Next](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#1535)

```go
func (rs *Rows) Next() bool
```

Next准备用于Scan方法的下一行结果。如果成功会返回真，如果没有下一行或者出现错误会返回假。Err应该被调用以区分这两种情况。

每一次调用Scan方法，甚至包括第一次调用该方法，都必须在前面先调用Next方法。

#### func (*Rows) [Close](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#1608)

```go
func (rs *Rows) Close() error
```

Close关闭Rows，阻止对其更多的列举。 如果Next方法返回假，Rows会自动关闭，满足。检查Err方法结果的条件。Close方法时幂等的（多次调用无效的成功），不影响Err方法的结果。

### type [Stmt](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#1237)

```go
type Stmt struct {
    // 内含隐藏或非导出字段
}
```

Stmt是准备好的状态。Stmt可以安全的被多个go程同时使用。

#### func (*Stmt) [Exec](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#1261)

```go
func (s *Stmt) Exec(args ...interface{}) (Result, error)
```

Exec使用提供的参数执行准备好的命令状态，返回Result类型的该状态执行结果的总结。

#### func (*Stmt) [Query](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#1382)

```go
func (s *Stmt) Query(args ...interface{}) (*Rows, error)
```

Query使用提供的参数执行准备好的查询状态，返回Rows类型查询结果。

#### func (*Stmt) [QueryRow](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#1458)

```go
func (s *Stmt) QueryRow(args ...interface{}) *Row
```

QueryRow使用提供的参数执行准备好的查询状态。如果在执行时遇到了错误，该错误会被延迟，直到返回值的Scan方法被调用时才释放。返回值总是非nil的。如果没有查询到结果，*Row类型返回值的Scan方法会返回ErrNoRows；否则，Scan方法会扫描结果第一行并丢弃其余行。

示例用法：

```go
var name string
err := nameByUseridStmt.QueryRow(id).Scan(&name)
```

#### func (*Stmt) [Close](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#1467)

```go
func (s *Stmt) Close() error
```

Close关闭状态。

### type [Tx](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#1041)

```go
type Tx struct {
    // 内含隐藏或非导出字段
}
```

Tx代表一个进行中的数据库事务。

一次事务必须以对Commit或Rollback的调用结束。(使用commit后对数据库的操作才生效)

调用Commit或Rollback后，所有对事务的操作都会失败并返回错误值ErrTxDone。

#### func (*Tx) [Exec](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#1179)

```go
func (tx *Tx) Exec(query string, args ...interface{}) (Result, error)
```

Exec执行命令，但不返回结果。例如执行insert和update。

#### func (*Tx) [Query](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#1213)

```go
func (tx *Tx) Query(query string, args ...interface{}) (*Rows, error)
```

Query执行查询并返回零到多行结果（Rows），一般执行select命令。

#### func (*Tx) [QueryRow](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#1225)

```go
func (tx *Tx) QueryRow(query string, args ...interface{}) *Row
```

QueryRow执行查询并期望返回最多一行结果（Row）。QueryRow总是返回非nil的结果，查询失败的错误会延迟到在调用该结果的Scan方法时释放。

#### func (*Tx) [Prepare](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#1102)

```go
func (tx *Tx) Prepare(query string) (*Stmt, error)
```

Prepare准备一个专用于该事务的状态。返回的该事务专属状态操作在Tx递交会回滚后不能再使用。要在该事务中使用已存在的状态，参见Tx.Stmt方法。

#### func (*Tx) [Stmt](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#1149)

```go
func (tx *Tx) Stmt(stmt *Stmt) *Stmt
```

Stmt使用已存在的状态生成一个该事务特定的状态。

示例：

```go
updateMoney, err := db.Prepare("UPDATE balance SET money=money+? WHERE id=?")
...
tx, err := db.Begin()
...
res, err := tx.Stmt(updateMoney).Exec(123.45, 98293203)
```

#### func (*Tx) [Commit](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#1075)

```go
func (tx *Tx) Commit() error
```

Commit递交事务。

#### func (*Tx) [Rollback](https://github.com/golang/go/blob/master/src/database/sql/sql.go?name=release#1086)

```go
func (tx *Tx) Rollback() error
```

Rollback放弃并回滚事务。

## 赋值类型

- 数组传参：值传递
- 切片传参：地址传递
- map传参：地址传递

结构体传参或赋值时，根据赋值或参数定义的类型来确定参数值是传递地址还是传递值。

```go
type People struct {
	Name string
	Age  int
}

func setProp(p *People) {
	p.Name = "world"
	p.Age = 19
}
func (p People) say() {
	fmt.Printf("this.Name=%v this.Age=%v \n", p.Name, p.Age)
}
func main() {
	p := People{
		Name: "hello",
		Age:  18,
	}

	p.say()   //this.Name=hello this.Age=18
    
    //传递地址
	setProp(&p)
    
	p.say()   //this.Name=world this.Age=19
    
    //传递值
	p1 := p
	p1.Name = "aaa"
	p.say()    //this.Name=world this.Age=19
	p1.say()   //this.Name=aaa this.Age=19
    
    //传递地址
    p2 := &p
	(*p2).Name = "p2"
	p.say()       //this.Name=p2 this.Age=19
	(*p2).say()  //this.Name=p2 this.Age=19
}
```

