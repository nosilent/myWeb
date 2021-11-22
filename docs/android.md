## 导航

### 文件创建

#### 创建页面

右击java文件，选择`new/Frament/fragment(blan)`,新建两个java文件并选择创建对应的xml文件。

```xml
//fragment_detail.xml    
<TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/detail"
        android:textSize="40dp"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintBottom_toBottomOf="@id/guideline4"
        app:layout_constraintLeft_toLeftOf="parent"
        />
<Button
        android:id="@+id/detail"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintTop_toTopOf="@id/guideline4"
        app:layout_constraintBottom_toBottomOf="parent"
        android:text="@string/toHome"
        android:textSize="40dp"
        app:layout_constraintRight_toRightOf="parent"
        />

//fragment_home.xml
<TextView
          android:id="@+id/textView"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:text="@string/home"
          android:textSize="40dp"
          app:layout_constraintBottom_toTopOf="@+id/guideline3"
          app:layout_constraintEnd_toEndOf="parent"
          app:layout_constraintStart_toStartOf="parent"
          app:layout_constraintTop_toTopOf="parent" />

<Button
        android:id="@+id/home"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/toDetail"
        android:textStyle="bold"
        android:textSize="40dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="@id/guideline3" />
```

#### 创建导航页面

右击res文件，选择`new/android resource file`, 新建一个文件，`resource type`选择`Navigetion`。

在`Navigation`类型文件中添加导航资源xml文件。

`Navigation`xml文件：

```xml
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/router"
    app:startDestination="@id/home2">
    <fragment
        android:id="@+id/detail"
        android:name="com.example.world.detail"
        android:label="fragment_detail"
        tools:layout="@layout/fragment_detail" >
        <action
            android:id="@+id/action_detail_to_home2"
            app:destination="@id/home2" />
    </fragment>
    <fragment
        android:id="@+id/home2"
        android:name="com.example.world.home"
        android:label="fragment_home"
        tools:layout="@layout/fragment_home" >
        <action
            android:id="@+id/action_home2_to_detail"
            app:destination="@id/detail" />
    </fragment>
</navigation>
```

#### 添加到显示

在`activity_main.xml`中添加`NavHostFragment`,选择上一步创建的`Navigetion`类型文件。

`activity_main.xml`添加代码：

```xml
<fragment
   android:id="@+id/fragment"
   android:name="androidx.navigation.fragment.NavHostFragment"
   android:layout_width="match_parent"
   android:layout_height="match_parent"
   app:defaultNavHost="true"
   app:layout_constraintLeft_toLeftOf="parent"
   app:layout_constraintRight_toRightOf="parent"
   app:layout_constraintTop_toTopOf="parent"
   app:layout_constraintBottom_toBottomOf="parent"
   app:navGraph="@navigation/router" />
```

### 导航

在对应java文件中对两个导航页进行操作。

```java
@Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        Button button;
        button = getView().findViewById(R.id.home);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                NavController controller = Navigation.findNavController(v);
                controller.navigate(R.id.action_home2_to_detail);
            }
        });
    }
```

