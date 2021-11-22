## svn

- checkout：获取仓库数据

- commit：提交数据
- update：更新数据

### 在linux下搭建svn服务器

1. 安装svn服务器（subversion）

```shell
yum install subversion -y
```

2. 创建目录
3. 初始化目录

```shell
svnadmin create 目录
```

4. 配置

config/passwd  用户、密码

config/svnserve.conf  服务器配置

5. 启动服务

```
svnserve -d -r 启动目录

//查看指定进程
ps -ef:grep svn 
```

6. 关闭防火墙

```shell
//清除防火墙规则
iptables -F

//查看
iptables -L
```

## git

### 配置

#### 用户信息

```bash
//配置用户名
$ git config --global user.name "name"
//配置用户邮箱
$ git config --global user.email "gg@example.com"
```

#### 文本编辑器

可以配置默认文本编辑器，如果未配置，Git 会使用操作系统默认的文本编辑器，通常是 Vim。

```bash
$ git config --global core.editor otherEditor
```

#### 检查配置信息

可以使用 `git config --list` 命令来列出所有 Git 当时能找到的配置。通过输入` git config <key>` 来检查 Git 的某一项配置

```bash
$ git config --list
```

### 获取仓库

有两种取得 Git 项目仓库的方法。 第一种是在现有项目或目录下导入所有文件到 Git 中； 第二种是从一个服务器克隆一个现有的 Git 仓库。

本地文件使用`git init`初始化仓库，远程使用`git clone 文件地址`克隆仓库

### 文件操作

检查当前文件状态：` git status`

跟踪新文件：`git add 文件名`，再运行`git status`命令，会看到该文件已被跟踪，并处于暂存状态。

状态简览：`git status -s`

忽略文件：创建一个名为`.gitignore`的文件

`.gitignore` 的格式规范：

- 所有空行或者以 `＃` 开头的行都会被 Git 忽略
- 可以使用标准的 glob 模式匹配（指 shell 所使用的简化了的正则表达式）
- 匹配模式可以以（`/`）开头防止递归
- 匹配模式可以以（`/`）结尾指定目录
- 要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（`!`）取反

#### 查看已暂存和未暂存的修改

查看尚未暂存的文件更新了哪些部分，不加参数直接输入 `git diff`

查看已暂存的将要添加到下次提交里的内容，可以用 `git diff --cached` 或`git diff --staged`(Git 1.6.1)命令,两者效果相同。

#### 提交更新

不带参数使用`git commit`，这种方式会启动文本编辑器以便输入本次提交的备注信息

可以在 `commit` 命令后添加 `-m` 选项，将提交备注信息与命令放在同一行

```bash
git commit
git commit -m 'example'
```

#### 跳过使用暂存区

在提交的时候，给 `git commit` 加上 `-a` 选项，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 `git add` 步骤

```bash
git commit -a -m 'example'
```

#### 移除文件

用 `git rm` 命令，并连带从工作目录中删除指定的文件。

如果只是简单地从工作目录中手工删除文件，暂存区还存在。

如果删除之前修改过并且已经放到暂存区域的话，则必须要用强制删除选项 `-f`（译注：即 force 的首字母）

```bash
git rm name.md
git rm -f name.md
```

让文件保留在磁盘，但是并不想让 Git 继续跟踪(把文件从暂存区域移除),添加 `.gitignore` 文件或使用`--cached`

`git rm` 命令后面可以列出文件或者目录的名字，也可以使用 `glob` 模式

```bash
git rm --cached name.md
git rm log/\*.log
```

#### 移动文件

在 Git 中对文件改名，使用`git mv old_name new_name`

运行 `git mv` 就相当于运行了下面三条命令:

```bash
$ mv old_name new_name
$ git rm old_name
$ git add new_name
```

### 查看提交历史

使用命名：`git log`

| git log常用选项 | 说明                                            |
| --------------- | ----------------------------------------------- |
| -p              | 按补丁格式显示每个更新之间的差异。              |
| --stat          | 显示每次更新的文件修改统计信息                  |
| --shortstat     | 只显示 --stat 中最后的行数修改添加移除统计      |
| --name-only     | 仅在提交信息后显示已修改的文件清单。            |
| --name-status   | 显示新增、修改、删除的文件清单                  |
| --abbrev-commit | 仅显示 SHA-1 的前几个字符，而非所有的 40 个字符 |
| --relative-date | 使用较短的相对时间显示                          |
| --graph         | 显示 ASCII 图形表示的分支合并历史               |
| --pretty        | 使用其他格式显示历史提交信息                    |

不用任何参数,会按提交时间列出所有的更新，最近的更新排在最上面

- 选项 `-p`，显示每次提交的内容差异,还附带了每次 commit 的变化，也可以加上 `-2` 来仅显示最近两次提交。

- 选项`--stat`，显示每次提交的简略的统计信息。

- 选项是`--pretty`，可以指定的方式展示提交历史，这个选项有一些内建的子选项供使用
  + `oneline`：将每个提交放在一行显示
  + `short`
  + `full` 
  + `fuller` 
  + `format`：可以定制要显示的记录格式

```bash
git log
git log -p -2
git log --stat
git log --pretty=oneline
git log --pretty=format:"%h - %an, %ar : %s"
```

| `pretty=format` 常用的选项 | 说明                                        |
| -------------------------- | ------------------------------------------- |
| %H                         | 提交对象（commit）的完整哈希字串            |
| %h                         | 提交对象的简短哈希字串                      |
| %T                         | 树对象（tree）的完整哈希字串                |
| %t                         | 树对象的简短哈希字串                        |
| %P                         | 父对象（parent）的完整哈希字串              |
| %p                         | 父对象的简短哈希字串                        |
| %an                        | 作者（author）的名字                        |
| %ae                        | 作者的电子邮件地址                          |
| %ad                        | 作者修订日期（可以用 --date= 选项定制格式） |
| %ar                        | 作者修订日期，按多久以前的方式显示          |
| %cn                        | 提交者（committer）的名字                   |
| %ce                        | 提交者的电子邮件地址                        |
| %cd                        | 提交日期                                    |
| %cr                        | 提交日期，按多久以前的方式显示              |
| %s                         | 提交说明                                    |

#### 限制输出长度

除了定制输出格式的选项之外，`git log` 还有许多非常实用的限制输出长度的选项，也就是只输出部分提交信息

| 限制输出选项          | 说明                               |
| --------------------- | ---------------------------------- |
| -(n)                  | 仅显示最近的 n 条提交              |
| `--since`, `--after`  | 仅显示指定时间之后的提交           |
| `--until`, `--before` | 仅显示指定时间之前的提交           |
| --author              | 仅显示指定作者相关的提交           |
| --committer           | 仅显示指定提交者相关的提交         |
| --grep                | 仅显示含指定关键字的提交           |
| -S                    | 仅显示添加或移除了某个关键字的提交 |

```bash
git log --pretty="%h - %s" --author=gitster --since="2008-10-01" \
   --before="2008-11-01" --no-merges -- t/
//列出那些添加或移除了某些字符串的提交 
git log -Sfunction_name
```

### 撤销操作

提交完了才发现漏掉了几个文件没有添加，或者提交信息写错了，可以运行带有 `--amend` 选项的提交命令尝试重新提交。

例如：提交后发现忘记了暂存某些需要的修改

```bash
$ git commit -m 'initial commit'
$ git add forgotten_file
$ git commit --amend
```

第二次提交将代替第一次提交的结果

#### 取消暂存文件

对使用`git add `后的文件,使用命令`git reset HEAD filename`，会取消暂存

#### 撤销文件修改

对修改后的文件使用命令`git checkout -- filename`

危险命令，对那个文件做的任何修改都会消失。

### 远程仓库操作

#### 查看远程仓库

使用 `git remote` 命令。 会列出指定的每一个远程服务器的简写。

指定选项 `-v`，会显示需要读写远程仓库使用的 Git 保存的简写与其对应的 URL，远程仓库不止一个，该命令会将它们全部列出

```bash
git remote
git remote -v
```

#### 添加远程仓库

运行 `git remote add <shortname> <url>` 添加一个新的远程 Git 仓库，同时指定一个你可以轻松引用的简写，使用`shortname`是`url`的别名

```bash
git remote add pb https://github.com/paulboone/ticgit
```

#### 从远程仓库抓取和拉取

从远程仓库中获得数据使用` git fetch [remote-name]`,这个命令会访问远程仓库，从中拉取所有你还没有的数据。`git fetch` 命令会将数据拉取到你的本地仓库，并不会自动合并或修改当前的工作，必须手动将其合并。

如果有一个分支设置为跟踪一个远程分支，可以使用 `git pull` 命令来自动的抓取然后合并远程分支到当前分支。

#### 推送到远程仓库

分享项目时，必须将其推送出去，使用`git push [remote-name] [branch-name]`

例如：将 master 分支推送到 `origin` 服务器时

```bash
 git push origin master
```

#### 查看某个远程仓库

想要查看某一个远程仓库的更多信息，可以使用 `git remote show [remote-name]` 命令。

#### 远程仓库的移除和重命名

重命名引用的名字可以运行 `git remote rename` 去修改一个远程仓库的简写名,同样也会修改远程分支名字。

例如，想要将 `pb` 重命名为 `paul`

```bash
git remote rename pb paul
```

移除一个远程仓库，可以使用 `git remote rm`

```bash
git remote rm paul
```

### 打标签

Git 可以给历史中的某一个提交打上标签，以示重要。比较有代表性的是使用这个功能来标记发布结点。

#### 列出标签

使用命令：`git tag`

使用特定的模式查找标签，例如，只对 1.8.5 系列感兴趣

```bash
git tag
git tag -l 'v1.8.5*'
```

#### 创建标签

##### 附注标签

运行 `tag` 命令时指定 `-a` 选项,使用 `git show` 命令可以看到标签信息与对应的提交信息

```bash
git tag -a v1.4 -m "my version 1.4"
git show v1.4
```

`-m` 选项指定了一条将会存储在标签中的信息

##### 轻量标签

轻量标签本质上是将提交校验和存储到一个文件中——没有保存任何其他信息。

创建轻量标签，不需要使用 `-a`、`-s` 或 `-m` 选项，只需要提供标签名字,

运行 `git show`，不会看到额外的标签信息, 命令只会显示出提交信息

```bash
git tag v1.4-lw
```

##### 后期打标签

结合提交编码

```bash
git tag -a v1.2 9fceb02
```

##### 共享标签

`git push` 命令并不会传送标签到远程仓库服务器上。 在创建完标签后必须显式地推送标签到共享服务器上

使用`git push origin [tagname]`

```bash
git push origin v1.5
```

如果想要一次性推送很多标签，也可以使用带有 `--tags` 选项的 `git push` 命令。 这将会把所有不在远程仓库服务器上的标签全部传送到那里。

```bash
git push origin --tags
```

##### 删除标签

要删除掉本地仓库上的标签，可以使用命令 `git tag -d <tagname>`，该命令并不会从任何远程仓库中移除这个标签，必须使用 `git push <remote> :refs/tags/<tagname>` 来更新远程仓库

```bash
git tag -d v1.4-lw
git push origin :refs/tags/v1.4-lw
```

##### 检出标签

想查看某个标签所指向的文件版本，可以使用 `git checkout` 命令，

```bash
git checkout 2.0.0
```

如果做了某些更改然后提交它们，标签不会发生变化，但新提交将不属于任何分支，并且将无法访问。

如果需要进行更改，比如说正在修复旧版本的错误——这通常需要创建一个新分支

```bash
 git checkout -b version2 v2.0.0
```

`version2` 分支会因为这个改动向前移动

### 命令别名

Git 并不会在输入部分命令时自动推断出你想要的命令，不想每次都输入完整的 Git 命令，

可以通过`git config --global alias.别名 命令`文件来轻松地为每一个命令设置一个别名、

```bash
git config --global alias.co checkout
git config --global alias.ci commit
//使用时
git co
git ci -m 'dd'
```

### 分支

#### 获取分支

- 获取所有分支列表

```bash
git branch
```

- 获取包含所有分支最后一次提交的分支列表

```bash
git branch -v
```

- 获取已经合并到当前分支的分支列表

```bash
git branch --merged
```

- 获取尚未合并到当前分支的分支 

```bash
git branch --no-merged
```

#### 创建分支

```bash
git branch branchName
```

 新建一个分支并同时切换到该分支上，可以运行一个带有 `-b` 参数

```bash
git checkout -b branchName
```

#### 分支切换

```bash
git checkout branchName
```

#### 分支合并

将当前分支`branchName`合并到当前使用的分支中去。

```bash
git merge branchName
```

#### 删除分支

 使用带 `-d` 选项命令来删除分支 ,当分支中包含未合并的内容时会删除失败，可以使用`-D`选项强制删除分支。

```bash
git branch -d branchName
```

#### 获取远程分支数据

 抓取远程仓库`remoteBranchName`有而本地没有的数据 

```bash
git fetch remoteBranchName
```

#### 跟着远程分支

当克隆一个仓库时，它通常会自动地创建一个跟踪 `origin/master` 的 `master` 分支 。

设置其他的跟踪分支 

```bash
git checkout --track origin/branchName
```

 本地分支与远程分支设置为不同名字 

```bash
git checkout -b newName origin/branchName
```

 查看设置的所有跟踪分支 

```bash
git branch -vv
```

#### 删除远程分支

```bash
git push origin --delete remoteBranchName
```

#### 变基

 使用 `rebase` 命令将提交到某一分支上的所有修改都移至另一分支上，就好像“重新播放”一样 

```bash
git rebase master
```

 使用  `--onto` 选项，选中在 `oneBranch` 分支里但不在 `twoBranch`分支里的修改，将它们在 `master` 分支上重放 

```bash
git rebase --onto master oneBranch twoBranch
```

 使用 `git rebase [basebranch] [topicbranch]` 命令可以直接将特性分支变基到目标分支上 

将`oneBranch`变基到`master`上

```bash
git rebase master oneBrach
```



### 选择版本

#### 查看提交记录

```bash
//查看提交记录
git log
//分支引用
git show 提交记录编码 
```

#### 查看引用日志

```bash
//查看引用日志(提交时备注信息)
git reflog
//引用指定日志
git show HEAD@{5}
//查看某个分支在一定时间前的位置
git show master@{yesterday}
//查看引用日志信息
git log -g master
```

#### 祖先引用

一种指明一个提交的方式,在引用的尾部加上一个 `^`,Git 会将其解析为该引用的上一个提交。

可以在 `^` 后面添加一个数字，表示第n父提交，只适用于合并（merge）的提交

```bash
//查看上一个提交
$ git show HEAD^
//查看指定日志的第二父提交
$ git show d921970^2
```

另一种指明祖先提交的方法是 `~`。 同样是指向第一父提交，`HEAD~` 和 `HEAD^` 是等价的。`HEAD~2` 代表“第一父提交的第一父提交”等价于`HEAD^^^`

#### 提交区间

- 双点

最常用的指明提交区间语法是双点，可以让 Git 选出在一个分支中而不在另一个分支中的提交。

```bash
//查看在 experiment 分支中而不在 master 分支中的提交
$ git log master..experiment
//查看在 master 分支中而不在 experiment 分支中的提交
$ git log experiment..master

//查看即将推送到远端的内容,在当前分支而不在远程origin 的提交
$ git log origin/master..HEAD
```

- 多点

在任意引用前加上 `^` 字符或者 `--not` 来指明不希望提交被包含其中的分支。

```bash
$ git log refA..refB
$ git log ^refA refB
$ git log refB --not refA
```

可以在查询中指定超过两个的引用,比如想查看所有被 `refA` 或 `refB` 包含的但是不被 `refC` 包含的提交

```bash
$ git log refA refB ^refC
$ git log refA refB --not refC
```

- 三点

可以选择出被两个引用中的一个包含但又不被两者同时包含的提交。

比如：看 `master` 或者 `experiment` 中包含的但不是两者共有的提交

```bash
$ git log master...experiment
//log 命令的一个常用参数是 --left-right,显示每个提交到底处于哪一侧的分支
$ git log --left-right master...experiment
```

### 交互式暂存

运行 `git add` 时使用 `-i` 或者 `--interactive` 选项，Git 将会进入一个交互式终端模式,这个命令以非常不同的视图显示了暂存区。

#### 暂存与取消暂存文件

- 如果在 `What now>` 提示符后键入 列表命令数字2 或 `u`，脚本将会提示想要暂存哪个文件。

每个文件前面的 `*` 意味着选中的文件将会被暂存，如果在 `Update>>` 提示符后不输入任何东西并直接按回车，Git 将会暂存之前选择的文件。

- 想要取消暂存 文件，使用 `3` 或 `r`（撤消）选项
- 再次查看 Git 状态,使用`1`或`s`
- 想要查看已暂存内容的区别，可以使用 `6` 或 `d`（区别）命令

#### 暂存补丁

Git 也可以暂存文件的特定部分，比如在一个文件中做了两处修改，但只想要暂存其中的一个而不是另一个。

从交互式提示符中，输入 `5` 或 `p`（补丁），这时有很多选项。 输入 `?` 显示所有可以使用的命令列表，通常情况下可以输入 y 或 n 来选择是否要暂存每一个区块。

可以不必在交互式添加模式中做部分文件暂存——可以在命令行中使用 `git add -p` 或 `git add --patch` 来启动同样的脚本

>`git reset --patch`:部分重置文件,`git checkout --patch` :部分检出文件,
>
>`git stash save --patch`:部分暂存文件

### 在linux下安装git

1. 安装git

```bash
sudo  yum install git -y
```

2. 初始化仓库

```bash
git init --bare 仓库名.git
```

3. 添加系统用户

```bash
useradd 用户名
passwd 用户名 //设置指定用户密码
```

4. 修改目录所有者

```bash
chown -R <name>:<name> 目录
```

5. clone

```bash
git clone 用户名@服务器:/目录/仓库名.git 文件目录
```

