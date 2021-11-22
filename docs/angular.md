## 准备

### 脚手架安装

```bash
npm install -g @angular/cli
```

### 创建新项目

```bash
ng new test
```

### 在项目中创建组件

在需要创建组件的文件夹下执行该命令。

```bash
ng generate component homeCom
```

### 创建服务

服务用户不同组件之间数据共享

```jsx
ng generate service store
```



## 插值

使用双大括号`{{ value }}`插入变量值

```jsx
<p>{{title}}</p>
<div><img src="{{itemImageUrl}}"></div>
```

## 绑定

### 属性绑定

在元素标签上某个属性需要动态绑定一个值时，使用`[prop]`或`bind-prop`绑定对应的变量值。

```jsx
<p [title]='value'></p>
<p bind-title='value'></p>
```

### 双向绑定

要使用双向绑定需要先引入`FormsModule`，再在表单元素中使用` [(ngMode)] `或`bindon-prop`实现双向绑定

```jsx
<input [(ngModel)]="hero.name" placeholder="name"/>
<input bindon-value="hero.name" placeholder="name"/>

//app.module.ts
import { FormsModule } from '@angular/forms';
@NgModule({
   imports: [
      BrowserModule,
      FormsModule
   ]
})
```

 该`ngModel`指令将详细信息隐藏在其自己的`ngModel`输入和`ngModelChange`输出属性后 

```jsx
<label for="example">(ngModelChange)="...name=$event":</label>
<input [ngModel]="current.name" (ngModelChange)="current.name=$event" id="example">
```



### 样式绑定

通过使用`[class.className]='condition'`，满足条件时使用对应的`className`

使用`[ngClass]='{className:true}'`，来显示对应的`className`,不推荐使用`[ngClass]`,直接使用`[class]`

使用` [style.prop]='condition' `,设置单个样式的属性值，也可以使用`[ngStyle]`(不推荐)绑定多个样式

```jsx
//当num>5时，div使用active样式
<div [class.active]='num>5'></div>
<div [ngClass]="{'special': isSpecial}"></div>
<div [class]="['foo', 'bar']"></div>
<div [style.color]="isSpecial ? 'red' : 'green'"></div>
<div [style]="{width: '100px', height: '100px'}"></div>
```

说明：样式绑定中`=`右边可以是字符串、组件、对象

## 事件

监听某一事件，在对应元素标签上使用`(event)`包裹需要监听的事件或使用`on-event`。绑定的触发函数后面必须加`()`

```jsx
<button (click)='onSave($event)'>on-click Save</button>
<button on-click="onSave($event)">on-click Save</button>
```

### 修饰符

在监听事件时使用修饰符来监听指定类型的事件,使用方法：`(event.type)='event()'`

```jsx
<input #box (keyup.enter)="onEnter(box.value)">
<p>{{value}}</p>
```



## 列表渲染

使用`*ngFor`进行列表渲染

```jsx
<p *ngFor='let item of items'>
	{{item.name}}
</p>
```

 使用`trackBy`来提高效率。向返回值`NgFor`应该跟踪的组件添加一个方法 ,

```jsx
//html
<div *ngFor="let item of items; trackBy: trackByItems">
  ({{item.id}}) {{item.name}}
</div>

//ts  根据id来创建元素
trackByItems(index: number, item: Item): number { return item.id; }
```



## 条件渲染

### `*ngIf`

使用`*ngIf`进行条件渲染,当条件为`true`时渲染该元素。

```jsx
<p *ngIf="product.description">
    Description: {{ product.description }}
</p>
```

### `ngSwitch`

显示满足条件的元素，配合指令 : `NgSwitch`，`NgSwitchCase`，和`NgSwitchDefault` 

```jsx
<div [ngSwitch]="currentItem.feature">
  <app-stout-item    *ngSwitchCase="'stout'"    [item]="currentItem"></app-stout-item>
  <app-device-item   *ngSwitchCase="'slim'"     [item]="currentItem"></app-device-item>
  <app-lost-item     *ngSwitchCase="'vintage'"  [item]="currentItem"></app-lost-item>
  <app-best-item     *ngSwitchCase="'bright'"   [item]="currentItem"></app-best-item>
<!-- . . . -->
  <app-unknown-item  *ngSwitchDefault     [item]="currentItem"></app-unknown-item>
</div>
```

## 模板引用变量 

类似于`vue`中的`ref`，使用`#name`的形式，通过`name`直接获取当前元素，可以在组件模板中的任何位置使用引用变量，只能用于`html`模板中， 使用`@viewChild(node)`装饰器后可以在组件中使用。

```jsx
<input #phone placeholder="phone number" />
<button (click)="callPhone(phone.value)">Call</button>

//xx.component.ts
@viewChild(phone) input;   //将其赋值给变量input
```

配合`ngForm`使用可以增强功能

```jsx
<form #itemForm="ngForm" (ngSubmit)="onSubmit(itemForm)">
  <label for="name"
    >Name <input class="form-control" name="name" ngModel required />
  </label>
  <button type="submit">Submit</button>
</form>

<div [hidden]="!itemForm.form.valid">
  <p>{{ submitMessage }}</p>
</div>
```

可以使用`ref-name`的形式代替`#name`

```jsx
<input ref-fax placeholder="fax number" />
<button (click)="callFax(fax.value)">Fax</button>
```

## 指令

### 属性指令

#### 创建指定文件

```bash
ng generate directive name
```

#### 编写指令

```jsx
import { Directive, ElementRef, HostListener } from '@angular/core';

//指令装饰器
@Directive({
  selector: '[appHighlight]' //指令使用时的名称
})
export class HighlightDirective {
  constructor(el: ElementRef) {
       el.nativeElement.style.backgroundColor = 'yellow';
    }
  //@HostListener监听指令插入元素对应事件
  @HostListener('mouseenter') onMouseEnter() {
  	this.highlight('yellow');
	}

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

#### 使用指令

```jsx
<p appHighlight>Highlight me!</p>
```

#### 使用`@Input`给指令传值

```jsx
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
//1. 内部定义接受值
@Input() highlightColor: string;
<p appHighlight highlightColor="yellow">Highlighted in yellow</p>
<p appHighlight [highlightColor]="'orange'">Highlighted in orange</p>

//2. 指令名和内部接收值名相同
@Input() appHighlight: string;
<p [appHighlight]="color">Highlight me!</p> 

//3. 给内部接受值定义一个别名为appHighlight，在外使用别名，内部使用原始名
@Input('appHighlight') highlightColor: string;

//@HostListener 装饰器订阅某个属性型指令所在的宿主 DOM 元素的事件
@HostListener('mouseenter') onMouseEnter() {
  this.highlight(this.highlightColor || 'red');
}
<p [appHighlight]="color">Highlight me!</p>
```

### 结构指令

 结构指令负责HTML布局。它们通常通过添加，删除或操纵元素来成形或重塑DOM的结构。

 指令名称的前缀 星号`*`是“句法糖”，代表更复杂的内容 

#### 创建指令

```jsx
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ 
  selector: '[appUnless]'      //指令使用名称
}) 
export class UnlessDirective {
  private hasView = false;
  constructor(
    private templateRef: TemplateRef<any>,  //用于访问绑定元素的内容
    private viewContainer: ViewContainerRef  //用于访问当前元素所在的容器
  ) { }

  //指令使用时设置条件
  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
```

#### 使用指令

```jsx
<p *appUnless="condition" class="unless a">
  (A) This paragraph is displayed because the condition is false.
</p>
```



## pipe

类似于`vue`中的过滤器， 将数据作为输入，并将其转换为所需的输出 ，在值绑定通过`|`使用`pipe`

```jsx
<p>The hero's birthday is {{ birthday | date }}</p>
```

### 内置pipe

内置的`pipe`可以在模板中直接使用

- date

- uppercase

- lowercase

- currency

- percent

### 接受参数

使用`pipe`时后跟`:`传递参数,多个参数也使用`:`分割。

```jsx
<p>The hero's birthday is {{ birthday | date:"MM/dd/yy" }} </p>
```

### 自定义pipe

```jsx
import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({
  name: 'exponentialStrength'，   //名称
  pure: false   //是否组件更新就调用
})
export class ExponentialStrengthPipe implements PipeTransform {
  //该方法接受参数，并转换成对应的值，第一个参数默认为使用|时左边的值
  transform(value: number, exponent?: number): number {
    return Math.pow(value, isNaN(exponent) ? 1 : exponent);
  }
}
```

## 组件

### 组件基础

使用装饰器`@Component`定义一个组件

使用`template`定义`html模板`内容或使用`templateUrl`定义`html模板路径`

使用`styles`定义样式或`styleUrls`引入样式

```jsx
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-alerts',  //在对应html模板中使用该组件时的标签名
  templateUrl: './product-alerts.component.html',  //该组件对应的html模板
  styleUrls: ['./product-alerts.component.css']   //该组件模板对应的css样式
})
export class ProductAlertsComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
```

### 组件样式

在style中定义样式或使用styleUrls引入样式或在模板中通过`link`标签引入样式

```jsx
@Component({
  selector: 'app-root',
  template: `
		<link rel="stylesheet" href="../assets/hero-team.component.css">
    <h1>Tour of Heroes</h1>
    <app-hero-main [hero]="hero"></app-hero-main>
  `,
  styles: ['h1 { font-weight: normal; }']
})
export class HeroAppComponent {
/* . . . */
}
```

#### 特殊选择器

##### :host

 host元素位于父组件的模板中，使样式只作用于该组件

```css
:host {
  display: block;
  border: 1px solid black;
}
```

##### :host-context

 选择器在组件宿主元素的任何祖先中查找CSS类， 直到文档根目录 。

##### /deep/

`/deep/`的别名为`>>>`和`::ng-deep`，任何样式使用该伪类都将变成全局样式。 如果使用:: ng-deep组合器而不使用：host伪类选择器，则样式可能会渗入其他组件 

```jsx
:host /deep/ h3 {
  font-style: italic;
}
```



### 组件传值

#### `@Input`

在组件内部通过装饰器`@Input`定义一个从外部接收的属性。在使用该组件时通过`[prop]`传递该属性值。

```jsx
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

export class ProductAlertsComponent implements OnInit {
  @Input() product;
  constructor() { }

  ngOnInit() {
  }
}

<app-product-alerts [product]="product"> </app-product-alerts>
```

#### @Output和自定义事件

可以使用`@Output`向父组件发送数据。

通过使用装饰器`@Output`和事件对象` EventEmitter `在组件中定义一个事件

```jsx
import { Output, EventEmitter } from '@angular/core';

export class ProductAlertsComponent {
  @Input() product;
  @Output() notify = new EventEmitter();
  send() {
    this.notify.emit();
  }
}
//在组件的html模板中触发自定义事件
<button (click)="send()">Notify Me</button>

//在对应组件标签上监听 组件中定义的notify事件
<app-product-alerts
  [product]="product" 
  (notify)="onNotify()">
</app-product-alerts>
```

#### 使用模板引用变量

在子组件标签上定义`引用变量`，使用该变量可以获取子组件中的数据和方法，通过子组件的方法来改变数据。

缺点：只能在父组件模板中使用，不能在父组件类中访问子组件的数据和方法。

#### @ViewChild

使用`@ViewChild`  将子组件作为``ViewChild``注入到父组件中 。

```jsx
import { ViewChild } from '@angular/core';
import { ChildComponent } from 'child.component'
@Component({
  selector: 'app-countdown-parent-vc',
  template: `
  <h3>Countdown to Liftoff (via ViewChild)</h3>
  <button (click)="start()">Start</button>
  <button (click)="stop()">Stop</button>
  <div class="seconds">{{ seconds() }}</div>
  <ChildComponentr></ChildComponent>
  `,
  styleUrls: ['../assets/demo.css']
})
export class CountdownViewChildParentComponent implements AfterViewInit {

  @ViewChild(ChildComponent)
  private childComponent: ChildComponent;

  seconds() { return 0; }

  ngAfterViewInit() {
    setTimeout(() => this.seconds = () => this.childComponent.seconds, 0);
  }

  start() { this.childComponent.start(); }

  stop() { this.childComponent.stop(); }
}
```

#### 使用服务

 父组件及其子组件共享一个服务，该服务的接口可以在该家族内进行双向通信 。

 服务实例的范围是父组件及其子组件。该组件子树之外的组件无法访问服务或其通信。 

创建一个服务

```jsx
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable()
export class MissionService {

  // Observable string sources
  private missionAnnouncedSource = new Subject<string>();
  private missionConfirmedSource = new Subject<string>();

  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();

  // Service message commands
  announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission);
  }

  confirmMission(astronaut: string) {
    this.missionConfirmedSource.next(astronaut);
  }
}
```

将其注入到父组件中

```jsx
//父组件
import { Component }          from '@angular/core';
//引入一个服务
import { MissionService }     from './mission.service';

@Component({
  selector: 'app-mission-control',
  template: `
    <h2>Mission Control</h2>
    <button (click)="announce()">Announce mission</button>
    <app-astronaut *ngFor="let astronaut of astronauts"
      [astronaut]="astronaut">
    </app-astronaut>
    <h3>History</h3>
    <ul>
      <li *ngFor="let event of history">{{event}}</li>
    </ul>	
  `,
  providers: [MissionService]  //注册服务
})
export class MissionControlComponent {
		//定义一个服务属性，通过该属性使用服务中的数据和方法，
  constructor(private missionService: MissionService) {}
  
  astronauts = ['Lovell', 'Swigert', 'Haise'];
  history: string[] = [];
  missions = ['Fly to the moon!',
              'Fly to mars!',
              'Fly to Vegas!'];
  nextMission = 0;
  announce() {
    let mission = this.missions[this.nextMission++];
    this.missionService.announceMission(mission);
    this.history.push(`Mission "${mission}" announced`);
    if (this.nextMission >= this.missions.length) { this.nextMission = 0; }
  }
}
```

在子组件中的构造函数中定义一个服务

```jsx
import { Component, Input, OnDestroy } from '@angular/core';

import { MissionService } from './mission.service';
import { Subscription }   from 'rxjs';

@Component({
  selector: 'app-astronaut',
  template: `
    <p>
      {{astronaut}}: <strong>{{mission}}</strong>
      <button
        (click)="confirm()"
        [disabled]="!announced || confirmed">
        Confirm
      </button>
    </p>
  `
})
export class AstronautComponent implements OnDestroy {
  @Input() astronaut: string;
  mission = '<no mission announced>';
  confirmed = false;
  announced = false;
  subscription: Subscription;

  constructor(private missionService: MissionService) {
    this.subscription = missionService.missionAnnounced$.subscribe(
      mission => {
        this.mission = mission;
        this.announced = true;
        this.confirmed = false;
    });
  }

  confirm() {
    this.confirmed = true;
    this.missionService.confirmMission(this.astronaut);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
```

### 动态组件

#### 添加组件位置

 在添加组件之前，您必须定义一个锚点，以告诉Angular在哪里插入组件

```jsx
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ad-host]',
})
export class AdDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
```

#### 加载组件

```jsx
template: `
            <div class="ad-banner-example">
              <h3>Advertisements</h3>
              <ng-template ad-host></ng-template>
            </div>
          `
```

#### 解析组件

```jsx
export class AdBannerComponent implements OnInit, OnDestroy {
  @Input() ads: AdItem[];
  currentAdIndex = -1;
//AdDirective将ViewContainerRef注入其构造函数。指令就是通过这种方式访问要用于承载动态组件的元素。
  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  interval: any;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const adItem = this.ads[this.currentAdIndex];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }
}
```

## 表单

操作表单元素除了使用`[(ngmodle)]`实现双向绑定外，还可以使用`formControl`来实现，表单操作：

- `FormControl`: 跟踪单个表单控件的值和验证状态 

- `FormGroup`: 跟踪表单控件集合的相同值和状态 

- `FormArray`: 跟踪一组表单控件的相同值和状态 

-  `ControlValueAccessor`:将`FormControl`实例和`DOM`元素链接

### 创建表单控件

在`  app.module.ts `中添加`FormMoule`

```jsx
// app.module.ts
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    // other imports ...
    ReactiveFormsModule
  ],
})
export class AppModule { }
```

创建和使用`FormControl`

```jsx
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  template: `<input type="text" [formControl]="name">`, //使用formControl
  styleUrls: ['./name-editor.component.css']
})
export class NameEditorComponent {
  name = new FormControl('');
	updateName(){
    this.name.setValue('Nancy');   //设置对应的formControl的值
  }
  getName(){
    return this.name.value      //获取对应的formControl的值
  }
}
```

### 表单分组

表单分组可以统一管理一组表单控件。使用`FormGroup`进行分组

#### 声明分组

```jsx
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {
  //定义分组
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
	getValue(){
    return this.profileForm.value    //获取表单组的值
  }
}
```

#### 关联表单元素

在模板中关联`form`表单

```jsx
<form [formGroup]="profileForm">
  
  <label>
    First Name:
    <input type="text" formControlName="firstName">
  </label>

  <label>
    Last Name:
    <input type="text" formControlName="lastName">
  </label>

</form>
```

  FormControlName指令提供的formControlName输入将每个单独的输入绑定到FormGroup中定义的表单控件 

#### 嵌套表单组

```jsx
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  template: `
    <div formGroupName="address">
      <h3>Address</h3>

      <label>
        Street:
        <input type="text" formControlName="street">
      </label>

      <label>
        City:
        <input type="text" formControlName="city">
      </label>

      <label>
        State:
        <input type="text" formControlName="state">
      </label>

      <label>
        Zip Code:
        <input type="text" formControlName="zip">
      </label>
    </div>
	`,
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    })
  });
}
```

#### 更新数据

 `setValue()`方法可以为表单组所有字段设置值，必须提供标红组中的所有字段。

 `patchValue()`方法可以指定修改表单组中的一个或多个值。

也可以通过调用`FormGroup`实例中的`controls`获取表单控件，从而修改其值。

```jsx
 this.profileForm.patchValue({
    firstName: 'Nancy',
    address: {
      street: '123 Drew Street'
    }
  });
```

### 快捷创建控件和分组

使用`FormBuilder`可以快速创建分组和控件

```jsx
import { FormBuilder } from '@angular/forms';

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {
  //定义一个FormBuilder
  constructor(private fb: FormBuilder) { }
  //每个控件名称的值是一个包含初始值作为数组第一项的数组
  //数组中的第二项和第三项可以提供验证器
  profileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
  });
}
```

### 表单验证

导入验证函数` Validators`,使用`Validators`内置验证器

```jsx
import { Validators } from '@angular/forms';
// 使用profileForm.status可以获取验证结果
profileForm = this.fb.group({
  firstName: ['', Validators.required],
  lastName: [''],
  address: this.fb.group({
    street: [''],
    city: [''],
    state: [''],
    zip: ['']
  }),
});

<input type="text" formControlName="firstName" required>
```

 **同步验证器**：采用控制实例并立即返回一组验证错误或的同步函数`null`。实例化`FormControl` 时，可以将它们作为第二个参数传递

 **异步验证器**：异步函数，接收控制实例并返回Promise或Observable，然后发出一组验证错误或`null`。实例化一个`FormControl`时，可以将它们作为第三个参数传入。 

#### [自定义验证器]( https://angular.io/guide/form-validation#defining-custom-validators )



### 动态生成表单

使用`FormBuilder.array`生产表单控件，并且可以动态向里面添加表单控件

```jsx
import { FormArray } from '@angular/forms';
export class ProfileEditorComponent {
  //定义一个FormBuilder
  constructor(private fb: FormBuilder) { }
  df = this.fb.group({
    lists:this.fb.array([
      this.fb.control('')
    ])
  })
	get liarr(){
    //将结果转为FormArray
    return this.df.get('lists') as FormArray
  }
  add(){
    this.liarr.push(this.fb.control(''))
  }
}

<form [formGroup]='df'>
  <div *ngFor='let item of liarr.controls;let i=index'>
    {{i}}: <input type="text" [formControlName]='i'>
  </div>
  <button (click)='add()'>添加</button>
</form>
```

### 表单类和指令

| 类                | 描述                                                         |
| :---------------- | :----------------------------------------------------------- |
| `AbstractControl` | 用于混凝土模板控件类的抽象基类`FormControl`，`FormGroup`和`FormArray`。它提供了它们的常见行为和属性。 |
| `FormControl`     | 管理单个表单控件的值和有效性状态。它对应于HTML表单控件，例如``或``。 |
| `FormGroup`       | 管理一组`AbstractControl`实例的值和有效性状态。该组的属性包括其子控件。组件中的顶级表单是`FormGroup`。 |
| `FormArray`       | 管理`AbstractControl`实例的数字索引数组的值和有效性状态。    |
| `FormBuilder`     | 可注入服务，提供用于创建控件实例的工厂方法。                 |

| 指示                   | 描述                                                        |
| :--------------------- | :---------------------------------------------------------- |
| `FormControlDirective` | 将独立`FormControl`实例同步到表单控件元素。                 |
| `FormControlName`      | 通过名称`FormControl`将现有`FormGroup`实例 同步到表单控件。 |
| `FormGroupDirective`   | 将现有`FormGroup`实例同步到DOM元素。                        |
| `FormGroupName`        | 将嵌套`FormGroup`实例同步到DOM元素。                        |
| `FormArrayName`        | 将嵌套`FormArray`实例同步到DOM元素。                        |

### 表单控件样式类

根据表单控件的不同状态会生成特殊的样式类，通过定义样式来操作样式

| State              | Class if true | Class if false |
| :----------------- | :------------ | :------------- |
| 该控件已被访问。   | `ng-touched`  | `ng-untouched` |
| 控件的值已更改。   | `ng-dirty`    | `ng-pristine`  |
| 控件的值是有效的。 | `ng-valid`    | `ng-invalid`   |

## ngModule

NgModule是由@NgModule装饰器标记的类。 @NgModule使用元数据对象，该元数据对象描述如何编译组件的模板以及如何在运行时创建注入器。

 NgModules将组件，指令和管道整合到功能紧密的模块中，每个模块专注于功能区域，应用程序业务领域，工作流或公用程序的通用集合 

 NgModule元数据执行以下操作 ：

-  声明哪些组件，指令和管道属于该模块 
-  将这些组件，指令和管道中的一些公开，以便其他模块的组件模板可以使用它们 
-  导入其他模块以及当前模块中组件所需的组件，指令和管道 
-  提供其他应用程序组件可以使用的服务 

 每个Angular应用都有至少一个模块，即根模块 ， 引导该模块以启动应用程序 。

### 配置说明

- **declarations**： 将组件、指令和管道注册到该模块，在该模块中使用未注册的组件会报错。

-  **imports** ：在该模块中引入其他模块功能，如操作DOM功能
-  **providers** ：引入数据管理
-  **bootstrap** ：引入页面渲染模板

### 常用模块

| NgModule              | 位置                        | 说明                                            |
| :-------------------- | :-------------------------- | :---------------------------------------------- |
| `BrowserModule`       | `@angular/platform-browser` | 在浏览器中运行应用程序时                        |
| `CommonModule`        | `@angular/common`           | 需要使用NgIf，NgFor时                           |
| `FormsModule`         | `@angular/forms`            | 想要构建模板驱动的表单（包括NgModel）时         |
| `ReactiveFormsModule` | `@angular/forms`            | 建立响应式表单                                  |
| `RouterModule`        | `@angular/router`           | 想使用RouterLink，.forRoot（）和.forChild（）时 |
| `HttpClientModule`    | `@angular/common/http`      | 与服务器通信时                                  |

### 入口组件

入口组件有两种类型：

- 定义在`bootstrap`中的根组件
- 定义在路由表中组件

### 自定义模块

通过使用`ng g module`创建模块以及对应组件和路由。

1. 定义模块

```jsx
// custom.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomComponent } from './custom.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CustomComponent],
  exports: [CustomComponent]   //暴露出去，使其他模块也能用该组件
})
export class CustomerDashboardModule { }
```

2. 在自定义模块的路由中配置路由表。

```jsx
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import {CustomComponent} from  './custom.component'

const routes: Routes = [
  {path: '',component: CustomComponent}，   //路径为空，默认加载该组件
  {path: '/one',component: CustomOneComponent} //访问根路由配置该模块url + 该路由path，加载该组件
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CustomRouterModule { }
```

3. 在根路由中配置对应路由表。

```jsx
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 

const routes: Routes = [
    //当url为custom时，懒加载custom.module下的custom组件
    {path: 'custom',loadChildren: './module/custom/custom.module#Custom'}
]; 


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```



## 网络请求

 `HttpClient` 是Angular通过HTTP与远程服务器通信的机制 ， 首先，`AppModule`通过导入将其添加到根目录中 ，再 添加`HttpClient`到`imports`数组中 

```jsx
//app.module.ts
import { HttpClientModule }    from '@angular/common/http';
@NgModule({
  imports: [
    HttpClientModule,
  ],
})
```

在组件中引入`httpClient`。

```jsx
import {HttpClient} from '@angular/common/http'
export class HomeComponent implements OnInit {
  id = ''
  constructor(private http:HttpClient) { }
  ngOnInit() {
    console.log(this.http) //使用this.http.get|post发送网络请求
  }  
}
```



## 数据共享

通过创建服务来实现数据共享

```jsx
ng generate service hero

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  constructor() { }

}
```

## 生命周期

每个生命周期函数都是以`ng`开头

### ngOnChanges

再`ngOnInit`之前调用一次或组件数据改变时调用，*多次执行*

### **ngOnInit**

 初始化指令或组件只调用一次，在`ngOnChanges`执行，*只执行一次*

### **ngDoCheck**

在组件或指令执行`ngOnInit`后立即执行一次，或者每次调用`ngOnChanges`执行，*多次执行*

### **ngAfterContentInit**

组件或指令插入到页面**前**执行一次，在**ngDoCheck**后执行，*执行一次*

### ngAfterContentChecked

组件或指令插入到页面**后**执行一次或每次`ngDoCheck`执行后执行，*多次执行*

### **ngAfterViewInit**

视图加载完成，类似于vue中的`mounted`,可以获取页面DOM元素， 在`ngAfterContentChecked`第一次调用时执行一次。*执行一次*

### ngAfterViewChecked 

在`ngAfterViewInit`后执行或每次`ngAfterContentChecked`执行后执行，*多次执行*

### **onDestroy**

在组件或指令销毁时执行一次。*执行一次*



## 路由

### 创建路由模型

```tsx
//生成app-routing.module.ts文件
ng generate module app-routing --flat --module=app 

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';

//配置路由表
const routes: Routes = [
  { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

`RouterModule.forRoot()`：添加根路由

### 创建路由视图

创建好路由表后，需要这`html`种添加路由视图`router-outlet`，用于显示对应路由的内容。

```jsx
//app.component.html

<router-outlet></router-outlet>
```

### 路由跳转

在`html`模板中使用`routerLink`属性跳转对应路由

```jsx
<a routerLink='/home'></a>
//路由传值使用queryParams，接受一个对象
<a routerLink='/news' [queryParams]='{value: 2}'></a>  


```

通过这组件中定义`Router`用于路由跳转

```jsx
import {Router，NavigationExtras} from '@angular/router'
export class HomeComponent implements OnInit {
  constructor(private router:Router) { }
  ngOnInit() {
  }
  to(){
    //普通路由或动态路由
    this.router.navigate(['/detail'])
    this.router.navigate(['/detail',value])
    
    //使用query传值需要引入NavigationExtras模块  
      let value: NavigationExtras = {
		queryParams: {id: 12}
      }
      this.router.navigate(['/detail'],value)
  }
}
```



### 动态路由和参数

```jsx
{ path: 'detail/:id', component: HeroDetailComponent },

//动态路由
<a [routerLink]='["/detail/",12]'></a>      
```

通过在对应组件中定义`ActivatedRoute`获取当前路由信息

```jsx
import {ActivatedRoute} from '@angular/router'

export class HomeComponent implements OnInit {
  constructor(private route:ActivatedRoute) { }
  ngOnInit() {
    console.log(this.route)
      // 路由使用了rxjs，需要使用subscribe,获取使用queryParams传值
      this.route.queryParams.subscribe((data)=>{
          console.log(data)
      })
      //动态路由传值
      this.route.params.subscribe((data)=>{
          console.log(data)
      })
  }
}
```

