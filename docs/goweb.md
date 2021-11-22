

## 创建服务器

引入`net/http`包，使用`http.ListenAndServe`创建服务

```go
package main
import (
	"net/http"
)

func main(){
	err := http.ListenAndServe(":8080",nil)
	if err != nil {
		fmt.Print("err")
	}
}
```

## 添加路由

使用`http.HandleFunc`添加路由

```go
func main(){
    //添加路由
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request){
	})
	err := http.ListenAndServe(":8080",nil)
	if err != nil {
		fmt.Print("err")
	}
}
```

## 获取请求

### 使用FormValue()

通过使用请求对象中的`FormValue`方法获取对应的请求字段值，只会返回同名字段中的第一个，若字段不存在则返回空字符串。

```go
http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request){
    fmt.Println("username:", r.FormValue("username")) //username: username值
})
```

### 使用Form属性

通过使用请求对象的`Form`属性，可以根据对应`字段`获取与该字段对应的值组成的切片。再使用`Form`属性前必需调用请求对象的`ParseForm`方法。否则返回的是空切片。

```go
http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request){
    r.ParseForm()
    fmt.Println("username:", r.Form["username"])  // username: ["username"]
})
```

### 使用Form.Get()

使用请求对象属性`Form`的`Get`方法，用法和效果与`FormValue()`一致，不需要提前调用`ParseForm`方法。

通过`r.Form.Get()`只能获取单个的值，如果是map的值必须通过`Form[prop]`获取。

```go
http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request){
    fmt.Println("username:", r.FormValue("username")) //username: username值
    fmt.Println("password:", r.Form.Get("password")) //password: password值
})
```

### 获取上传文件

先调用`r.ParseMultipartForm`把上传的文件存储在内存和临时文件中，再调用`r.FormFile(name)`获取上传文件信息。

```go
http.HandleFunc("/upload", upload)

// 处理/upload 逻辑
func upload(w http.ResponseWriter, r *http.Request) {
        r.ParseMultipartForm(32 << 20)
        file, handler, err := r.FormFile("uploadfile")
    
        if err != nil {
            fmt.Println(err)
            return
        }
        defer file.Close()
        fmt.Fprintf(w, "%v", handler.Header)
        f, err := os.OpenFile("./test/"+handler.Filename, os.O_WRONLY|os.O_CREATE, 0666)  // 此处假设当前目录下已存在test目录
        if err != nil {
            fmt.Println(err)
            return
        }
        defer f.Close()
        io.Copy(f, file)
    }
}
```

## cookie

### 获取cookie

使用`r.Cookie(prop)`获取对应字段的值，或者使用`r.Cookies()`获取所有字段值。

```go
http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request){
    cookie1, _ := r.Cookie("username")
	fmt.Fprint(w, cookie1)
    
    for _, cookie := range r.Cookies() {
    fmt.Fprint(w, cookie.Name)
}
})
```

### 设置cookie

使用`http.SetCookie(w ResponseWriter, cookie *Cookie)`设置`cookie`

```go
//Cookie原型
type Cookie struct {
    Name       string
    Value      string
    Path       string
    Domain     string
    Expires    time.Time
    RawExpires string

// MaxAge=0 means no 'Max-Age' attribute specified.
// MaxAge<0 means delete cookie now, equivalently 'Max-Age: 0'
// MaxAge>0 means Max-Age attribute present and given in seconds
    MaxAge   int
    Secure   bool
    HttpOnly bool
    Raw      string
    Unparsed []string // Raw text of unparsed attribute-value pairs
}

//设置cookie
expiration := time.Now()
expiration = expiration.AddDate(1, 0, 0)
cookie := http.Cookie{Name: "username", Value: "astaxie", Expires: expiration}
http.SetCookie(w, &cookie)
```

