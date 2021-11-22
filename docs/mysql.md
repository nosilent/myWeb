```mysql
//启动服务
net start mysql

//修改root登录密码
mysqladmin -uroot -p password 123

//登录服务
mysql -u root -p

//数据库列表
SHOW DATABASES;

//选择要操作的Mysql数据库
USE 数据库名;

//创建数据库
CREATE DATABASE 数据库名;
//删除数据库
drop database <数据库名>;

//显示数据库中的数据表
show tables;

//显示数据表的属性，属性类型，主键信息 ，是否为 NULL，默认值等其他信息
SHOW COLUMNS FROM 数据表;

//创建数据表
CREATE TABLE table_name (column_name column_type);
//删除数据表
DROP TABLE table_name ;

//插入数据
INSERT INTO table_name ( field1, field2,...fieldN )  VALUES ( value1, value2,...valueN );

//查询数据
SELECT column_name,column_name FROM table_name [WHERE Clause] [LIMIT N][ OFFSET M]；
//从0开始查询前10条记录,
select * from table_name limit 0,10
//like 匹配/模糊匹配， %表示多个，_表示一个，用 AND 或者 OR 指定一个或多个条件
SELECT field FROM table_name WHERE field LIKE condition1 [AND [OR]] filed2 ='somevalue'；
//查询除了id为1，3，5的其他数据
select * from news where id not in(1,3,5)
SELECT * from runoob_tbl  WHERE field1 LIKE '%COM';
SELECT * from runoob_tbl  WHERE field1 LIKE '%COM%';
%：表示任意 0 个或多个字符。可匹配任意类型和长度的字符，有些情况下若是中文，请使用两个百分号（%%）表示。
_：表示任意单个字符。匹配单个任意字符，它常用来限制表达式的字符长度语句。
[]：表示括号内所列字符中的一个（类似正则表达式）。指定一个字符、字符串或范围，要求所匹配对象为它们中的任一个。
[^] ：表示不在括号所列之内的单个字符。其取值和 [] 相同，但它要求所匹配对象为指定字符以外的任一个字符。
查询内容包含通配符时,由于通配符的缘故，导致我们查询特殊字符 “%”、“_”、“[” 的语句无法正常实现，而把特殊字符用 “[ ]” 括起便可正常查询

//更新数据
UPDATE table_name SET field1=new-value1, field2=new-value2 [WHERE Clause]；

//删除数据
DELETE FROM table_name [WHERE Clause]；

// 排序,ORDER BY 子句将查询数据排序后再返回数据,ASC升序，DESC降序
SELECT field1, field2,...fieldN table_name1, table_name2...
ORDER BY field1 [ASC [DESC][默认 ASC]], [field2...] [ASC [DESC][默认 ASC]]

//数据分组， GROUP BY 语句 将数据表按field进行分组
SELECT name, COUNT(*) FROM   table_name GROUP BY field;


//表连接
// 1. INNER JOIN, 获取两个表中字段匹配关系的记录
SELECT 别名1.field1, 别名1.field2, 别名2.field1 FROM table_name1 别名1 INNER JOIN table_name2 别名2 ON 别名1.field3 = 别名2.field3;
等价于=>
SELECT 别名1.field1, 别名1.field2, 别名2.field1 FROM table_name1 别名1, table_name2 别名2 WHERE 别名1.field3 = 别名2.field3;

// 2. LEFT JOIN ,会读取左边数据表的全部数据，即便右边表无对应数据
SELECT 别名1.field1, 别名1.field2, 别名2.field1 FROM table_name1 别名1(左表) LEFT JOIN table_name2 别名2（右表） ON 别名1.field3 = 别名2.field3;

// 3. RIGHT JOIN 会读取右边数据表的全部数据，即便左边边表无对应数据。
SELECT 别名1.field1, 别名1.field2, 别名2.field1 FROM table_name1 别名1(左表) RIGHT JOIN table_name2 别名2（右表） ON 别名1.field3 = 别名2.field3;
```

### 修改json类型字段值

使用json_set进行操作

```mysql
#对id = 1的行的address的键值进行修改.
update tab_json set data = json_set(data,"$.address","Guangzhou") where id = 1; 

#对id为1的passcode字段进行修改,发现没有这个键值,就增加了一个键值对.
update tab_json set data = json_set(data,"$.passcode","654567") where id = 1;
#设置表中每条数据中的data字段的age，有就修改，没有则添加
update tab_json set data = json_set(data,"$.age","33");
```

### 集合查询

```mysql
#colName符合条件值集合，colName=value1或者colName=value2
WHERE colName in（value1,value2...）、
#查询id为1，2，5的所有数据
select * from user where id in (1，2，5)
```

### 结果排序

    使用ORDER BY 子句将查询记录进行排序
    ASC:升序，缺省
    DESC:降序
    ORDER BY 子句在SELECT子句的最后
```mysql
#按单列排序
SELECT * FROM tName ORDER BY colName [DESC\ASC]  
#按多列排序（先后）
SELECT * FROM tName ORDER BY colName1 [DESC\ASC],colName2 [DESC\ASC]
```

### 聚合函数

聚合函数作用于一组数据，并且对一组数据返回一个值

​    统计结果记录数：COUNT
​    统计计算最大值：MAX
​    统计计算最小值：MIN
​    统计计算求和：   SUM
​    统计计算平均值：AVG

```mysql
#查询所有员工每个月支付的平均工资及总工资
select AVG(sal),sum(sal) from emp;
#查询月薪在2000以上的员工总人数.
select COUNT(*) from emp where sal > 2000;
#查询员工最高工资和最低工资差距
select MAX(sal),MIN(sal) from emp;
```

### 单行函数

三、单行函数
1.字符函数

    (1).字符串大小写转换
    
    LOWER(str)：返回字符串str变为小写字母的字符




    UPPER(str)：返回字符串str变为大写字母的字符
    --------------------------------------------------------
    把HelloWorld转换为全大写,全小写.
    select LOWER('HelloWorld');
    select UPPER('HelloWorld');
    
    (2).字符串拼接
    
    CONCAT(str1,str2,...)：

 


    1，返回结果为连接参数产生的字符串。
    2，如有任何一个参数为NULL ，则返回值为 NULL
    3，允许有一个或多个参数
    -------------------------------------------------------
    1，查询所有员工的全名
    select CONCAT('查询出',ename,'的全名') from emp;
    2，查询得到输出结果：某某's'的月薪是：xx
    select CONCAT(ename,'的月薪是',sal) from emp;
    
    (3).查看字符串长度
    
    CHAR_LENGTH：字符串长度；

 


    LENGTH：字符串长度（单位为字节）；
    
    对比试验：
    SELECT CHAR_LENGTH('龙哥17岁') FROM DUAL；
    SELECT LENGTH('龙哥17岁') FROM DUAL；


    (4).字符串填补
    
    LPAD(str,len,padstr)

 


    1，返回字符串str, 其左边由字符串padstr 填补到len字符长度。
    2，假如str 的长度大于len, 则返回值被缩短至len 字符。
    SELECT LPAD('ABC',7,'X'),LPAD('ABC',5,'X'),LPAD('ABC',3,'X'),LPAD('ABC',1,'X') FROM DUAL;
    返回的结果是XXXXABC             XXABC             ABC                A
    
    RPAD(str,len,padstr)

 


    1，返回字符串str, 其右边被字符串padstr填补至len 字符长度。
    2，假如字符串str 的长度大于 len,则返回值被缩短到与len 字符相同长度。


    (5).字符串去空格
    
    LTRIM（str）：左边空格被trim掉；
    RTRIM（str）：右边空格被trim掉；
    
    TRIM(str)=LTRIM+RTRIM
    TRIM([{BOTH | LEADING | TRAILING} [remstr] FROM] str)：高级用法，从str中按照指定方式截取remstr；
    TRIM(remstr FROM] str)：相当于TRIM(BOTH remstr FROM str)；
    
    SELECT LTRIM(' A B C '),RTRIM(' A B C '),TRIM(' A B C ') FROM DUAL;
    返回的结果是   A B C_          _A B C           A B C


​    

     (6).字符串替换
    
    REPLACE(str,from_str,to_str)：

 


    1，在str中把from_str全部替换为to_str；
    2，大小写敏感；
    
    SELECT REPLACE('ABCDaBCABA','A','X') FROM DUAL;
                                XBCDaBCXBX

   


    (7).字符串截取
    
    SUBSTRING(str,pos)：

 


    从字符串str返回一个子字符串，起始于位置pos
    SELECT SUBSTRING('asdfghijkl', 3);         [0,3)       dfghijkl

   


    SUBSTRING(str,pos,len)：
    
    从字符串str返回一个长度同len字符相同的子字符串，起始于位置pos
    SELECT SUBSTRING('asdfghjkl', 3, 2);                df
    
    如果pos是负数，从字符串尾部开始计算；
    SELECT SUBSTRING('ABCDEF',-3),SUBSTRING('ABCDEF',-3,3) FROM DUAL;
    
                                    def                                                def

2.数字函数

    (1).取绝对值
    
        ABS（x）：返回一个数字的绝对值；
    
        SELECT ABS(-17),ABS(17) FROM DUAL;
    
        17       17
    
    (2).取模 
    
        MOD(N,M)：返回N 被 M除后的余数；
        SELECT MOD(10,5),MOD(10,3) FROM DUAL;
        0         1
    
    (3).取天花板
    
        CEIL(x)：返回不小于X 的最小整数值；
    
        SELECT CEIL(0.5),CEIL(-1.5),CEIL(1.5) FROM DUAL;
                          1         -1        2
    
    (4).取地板
    
        FLOOR(x)：返回不大于X的最大整数值；
        SELECT FLOOR(0.5),FLOOR(-1.5),FLOOR(1.5) FROM DUAL;
                                0              -2         1
    
    (5).四舍五入
    
        ROUND(X) /ROUND(X,D)：
    
        1，返回参数X, 其值接近于最近似的整数。  
        2，在有两个参数的情况下，返回X ，其值保留到小数点后D位，而第D位的保留方式为四舍五入。
        3，若要接保留X值小数点左边的D 位，可将 D 设为负值。
        select ROUND(1.5);
        select ROUND(1.49);
        SELECT ROUND(3.1465926,2);            3.15
        SELECT ROUND(321.1415926,-2);
        TRUNCATE(X,D)
    
        (6).截去函数
    
        1，返回被舍去至小数点后D位的数字X。
    
            select TRUNCATE(3.1415926,2);
        2，若D 的值为 0, 则结果不带有小数点或不带有小数部分。可以将D设为负数,若要截去(归零) X小数点左起  第D位开始后面所有低位的值.
            select TRUNCATE(3.1415926,0);
            select TRUNCATE(312.1415926,-1);

 

3.日期函数

获取当前系统时间
select NOW();

DATE_ADD(date,INTERVAL expr type)/DATE_SUB(date,INTERVAL expr type)向日期添加指定的时间间隔
1，执行日期运算；
2，date 是一个 DATETIME 或DATE值，用来指定起始时间；
3，expr 是一个字符串表达式，用来指定从起始日期添加或减去的时间间隔值；
4，type 为关键词，它指示了表达式被解释的方式

SELECT DATE_ADD('2016-10-13',INTERVAL 22 DAY) FROM DUAL;        2016-11-4
SELECT DATE_ADD(NOW(),INTERVAL 100 DAY) FROM DUAL;



使用方法参考MYSQL 5.5中文参考手册547页：

type 参数可以是下列值：
Type 值
MICROSECOND
SECOND
MINUTE
HOUR
DAY
WEEK
MONTH
QUARTER
YEAR
SECOND_MICROSECOND
MINUTE_MICROSECOND
MINUTE_SECOND
HOUR_MICROSECOND
HOUR_SECOND
HOUR_MINUTE
DAY_MICROSECOND
DAY_SECOND
DAY_MINUTE
DAY_HOUR
YEAR_MONTH

SELECT CURRENT_DATE(),CURRENT_TIME() FROM DUAL;

DATEDIFF(expr,expr2)：返回起始时间expr和结束时间expr2之间的天数

SELECT DATEDIFF('2016-05-08','2016-11-04')'天数' FROM DUAL;

DAY(date)：获取日期中的天数（DAYOFMONTH）
select DAY(NOW());
HOUR(time)
返回time 对应的小时数。对于日时值的返回值范围是从 0 到 23
select HOUR(NOW());
MINUTE(time)
返回 time 对应的分钟数,范围是从 0 到 59
select MINUTE(NOW());
MONTH(date)
返回date 对应的月份，范围时从 1 到 12。
select MONTH(NOW());
YEAR(date)
返回date 对应的年份,范围是从1000到9999。
select YEAR(NOW());
LAST_DAY(date)
获取一个日期或日期时间值，返回该月最后一天对应的值
select LAST_DAY(NOW());
UNIX_TIMESTAMP(date)：它会将参数值以'1970-01-01 00:00:00' GMT后的秒数的形式返回
FROM_UNIXTIME(unix_timestamp) , FROM_UNIXTIME(unix_timestamp,format)：返回'YYYY-MM-DD HH:MM:SS'或指定format的日期

SELECT UNIX_TIMESTAMP(NOW()) FROM DUAL;

SELECT FROM_UNIXTIME(UNIX_TIMESTAMP(NOW())) FROM DUAL;

 

 

4.转换

FORMAT(X,D)
将数字X 的格式写为'#,###,###.##',以四舍五入的方式保留小数点后D 位， 并将结果以字符串的形式返
回。若D 为 0, 则返回结果不带有小数点，或不含小数部分。
SELECT FORMAT(123456.789,2) FROM DUAL;

格式：DATE_FORMAT(date,format):把日期转换为字符串.

SELECT DATE_FORMAT(NOW(),'%Y-%m-%d') FROM DUAL;

STR_TO_DATE(str,format):把字符串转换为日期。
SELECT STR_TO_DATE('2015/11/29','%Y/%m/%d') FROM DUAL;


单行函数可被嵌入到任何层在嵌套的时候，最内层的函数最先被执行，执行的结果被传递到它的外层函数，作为参数使用，然后依次从内向外执行，直到所有的函数执行完。




三、分页查询
    MySQL的分页设计：
    假分页（逻辑分页，内存分页）：
        一次性查询出所有的数据存放在内存中，每次翻页的时候，都从内存中取出
        指定的条数
        特点：翻页比较快，如果数据量过大，可能造成内存溢出，不推荐
    
    真分页（物理分页，数据库分页）（推荐）：
        每次翻页都从数据库中截取指定的条数
        假设每页十条数据，第一页0~9，第二页重新查询10~19条数据
        特点：翻页比较慢，不会造成内存溢出
    
    设计：
        int pageSize=3:表示每页最多显示3条数据
        第一页：SELECT * FROM tName LIMIT 0,3
        第二页：                                                3,3
        第三页:                                                   6,3    
    
        分页查询结果集的SQL



SELECT * FROM tName LIMIT ?,?;

第一个？：(currentPage-1)*pageSize

第二个？：pageSize
