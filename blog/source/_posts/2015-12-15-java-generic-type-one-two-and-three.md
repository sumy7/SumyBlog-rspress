---
layout: post
title: Java泛型二三事
date: '2015-12-15 23:01:14'
categories:
  - 编程语言
tags:
  - java
  - 泛型
---

# Java泛型二三事

泛型（Generic Type）是Java中重要的一部分。在使用Java标准库中的内容的时候，经常会遇到泛型。这里将知道的泛型部分内容总结一下。以后遇到新的内容还会继续补充。

## 什么是泛型

讨论一个内容的时候，首先会来说什么是什么。在官方的文档中说到
> A *generic type* is a generic class or interface that is parameterized over types.

泛型又可以称作参数化类型，这是在Java SE新增添的特性。一对尖括号，中间包含类型信息。将类型独立成参数，在使用的时候才指定实际的类型。

如果没有泛型会怎么样？我们考虑以下几种情况：

1. 你实现了一个存储整数类型（Integer）的列表，这时候你又需要存储字符串（String）的列表，两种列表逻辑行为完全一样，只是存储的类型不同。
2. 为了保证列表的通用性，你将列表的类型改为了Object，这样就不用为类型修改代码了。但是每次从列表中取对象的时候都需要强制转换，而且很很容易出错。

有了泛型之后，可以将逻辑相同类型不同的代码独立出来，由编译器负责进行类型转换。

## 泛型的声明

### 泛型方法（Generic Method）

泛型方法是在普通方法声明上加入了泛型。

```java
public static < E > void printArray( E[] inputArray )
{
    for ( E element : inputArray ){
        System.out.printf( "%s ", element );
    }
    System.out.println();
}
```

调用：

```java
    // Create arrays of Integer, Double and Character
    Integer[] intArray = { 1, 2, 3, 4, 5 };
    Double[] doubleArray = { 1.1, 2.2, 3.3, 4.4 };
    Character[] charArray = { 'H', 'E', 'L', 'L', 'O' };

    System.out.println( "Array integerArray contains:" );
    printArray( intArray  ); // pass an Integer array

    System.out.println( "\nArray doubleArray contains:" );
    printArray( doubleArray ); // pass a Double array

    System.out.println( "\nArray characterArray contains:" );
    printArray( charArray ); // pass a Character array
```

输出：

```
Array integerArray contains:
1 2 3 4 5 6

Array doubleArray contains:
1.1 2.2 3.3 4.4 

Array characterArray contains:
H E L L O
```

Java泛型方法的声明格式如下：

```
[权限] [修饰符] [泛型] [返回值] [方法名]  (    [参数列表]   ) {}
public static  < E >   void   printArray( E[] inputArray ) {}
```

泛型的声明，必须在方法的修饰符（public,static,final,abstract等）之后，返回值声明之前。可以声明多个泛型，用逗号隔开。泛型的声明要用`<>`包裹。

泛型方法的使用有两种：

**类型推导**
以声明键值对的例子来说，通常的写法会有一长串，不免有些痛苦。

```java
Map<String, List<String>> m = new HashMap<String, List<String>>();
```

我们可以构造一个泛型方法作为静态工厂，来完成这一操作。

```java
public static <K, V> HashMap<K, V> newInstance() {
    return new HashMap<K, V>();
}
Map<String, List<String>> m = newInstance();
```

编译器在编译代码的时候推导出了`K, V`分别对应的类型。当然，编译器的推导能力也是有限的，这里也就不过多讨论了。
**~~指定类型~~**

### 泛型类（Generic Class）

泛型类和普通类的声明一样，只是在类名后面加上了类型表示。就像泛型方法，泛型类可以有一个或多个类型表示，用逗号进行分隔。

```java
public class Box<T> {

  private T t;

  public void add(T t) {
    this.t = t;
  }

  public T get() {
    return t;
  }

  public static void main(String[] args) {
     Box<Integer> integerBox = new Box<Integer>();
     Box<String> stringBox = new Box<String>();

     integerBox.add(new Integer(10));
     stringBox.add(new String("Hello World"));

     System.out.printf("Integer Value :%d\n\n", integerBox.get());
     System.out.printf("String Value :%s\n", stringBox.get());
  }
}
```

输出：

```
Integer Value :10
String Value :Hello World
```

在泛型类上声明的类型，可以被用到类中任何表示类型的地方。
泛型类只能通过以指定类型的方式进行使用。在之后的Java版本中，加入了类型推导功能，可以将后面的泛型类型省略，但是还是需要保留尖括号。

```java
List<String> list = new ArrayList<String>(); // 普通的写法
List<String> list = new ArrayList<>(); // 省略的写法
```

### 泛型接口（Generic Interface）

泛型接口是在声明接口的时候指定，类在继承接口的时候需要补充泛型类型。

```java
public interface Info<T> {
    public T getInfo();
}
```

然后定义一个类实现这个接口

```java
public InfoImp implements Info<String> {
    public String getInfo() {
        return "Hello World!";
    }
}
```

可以发现实现接口里的方法需要使用具体的类型。
泛型接口的一般格式：

```
[访问权限] interface [接口名] <泛型标识> {}
```

当然，我们可以实现泛型接口的时候不指名泛型类型，这样这个类就需要定义为泛型类。

```java
public InfoImp<T> implements Info<T> {
    public T getInfo() {
        return null;
    }
}
```

## 泛型标识与泛型通配符

理论上泛型标识可以使用任意的字母或字母序列，可以考虑以下的例子，但是不推荐这样使用

```java
public static <STRING> STRING sayHello(STRING word){
    System.out.println("Hello " + word);
    return a;
}
```

但是Java内部有一套自己的规范，这样在阅读JDK代码的时候会更加明确泛型标识的含义。
```
E - Element (在集合中使用，因为集合中存放的是元素)
T - Type（Java 类）
K - Key（键）
V - Value（值）
N - Number（数值类型）
? -  表示不确定的java类型
S、U、V - 2nd、3rd、4th types
```

说到泛型标识符，再说一说泛型通配符。常用的泛型通配符有三种。

**任意类型 - <?>**
`<?>` 可以理解为泛型中的 `Object`，为什么这么说呢？因为任意类型的通配符可以接受任意类型的泛型。下面的例子表示出了这种关系

```java
Box<?> box = new Box<String>();
```

类似于将后面的类型转换到前面的类型。但是`<?>`只能用作接收，不能用来定义，下面的例子是错误的

```java
class Box<?> {} //错误的泛型类定义
public static <?> void sayHello(? helloString) {} //错误的泛型方法定义
interface Box<?> {} //错误的泛型接口定义
```

**上限类型 - &lt;? extends 类>**
`<? extends 类>` 表示泛型只能使用这个`类`或这个`类`的**子类**。举个例子

```java
public static <T extends String> void sayHello(T helloString) {}
```

在该方法中调用`sayHello("xiaoming");`是正确的，但是调用`sayHello(2333);`就是错误的。
考虑一种更通用的情况

```java
public static void printList(List<? extends String> list){
    for(String str:list){
        System.out.println(str);
    }
}
```

这个例子指定了泛型类的具体类型的范围。在JDK中经常可以看到这样的使用方法。

**下限类型 - &lt;? super 类>**
同上限方法，`<? super 类>` 表示泛型只能使用这个`类`或这个`类`的**父类**。
这里就不再举例子了。

## 泛型二三事

### 类型擦除

泛型只在编译时有效，编译成字节码的过程中会进行**类型擦除**的操作。当然并不是所有的泛型类型都被擦除，有些也会保留下来。
一个简单的类型擦除的例子：

```java
List<String> list = new ArrayList<>();
Iterator<String> it = list.iterator();
while (it.hasNext()) {
   String s = it.next();
}
```

我们对其编译，然后再反编译，反编译引擎用的CFR：

```java
ArrayList arrayList = new ArrayList();
Iterator iterator = arrayList.iterator();
while (iterator.hasNext()) {
    String string = (String)iterator.next();
}
```

从上面的结果可以看出，泛型类上面的类型被去掉了，但是增加了一个类型强制转换。解释器默认认为里面的类型都会是`String`。这是因为在编译的时候会进行类型检查，如果发现使用的类型与泛型声明类型不符，编译是不会通过的。
那能不能绕过这个检查呢？这个时候就需要使用**反射**来进行操作了。就上面的例子来说，`ArrayList`可以放入任意类型，所以使用反射只要保证类型强制转换不出问题，程序还是可以使用的。

在[Java文档](https://docs.oracle.com/javase/tutorial/java/generics/erasure.html)中提到，类型擦除主要进行以下工作：

+ 将泛型中的所有类型参数更换成类型界限，或者无界的类型替换成Object。所以生成的字节码只包含普通类、接口和方法。
+ 为了确保类型安全，必要时插入强制类型转换
+ 生成桥接方法保持扩展泛型类型中的多态性

### 可变参数

使用泛型方法可以使用可变参数：

```java
public class Main {

    public static <T> void out(T... args) {
        for (T t : args) {
            System.out.println(t);
        }
    }

    public static void main(String[] args) {
        out("findingsea", 123, 11.11, true);
    }
}
```

可以发现编译器很好的处理了这些，里面的具体原理还有待继续研究。

### new T()?

你可能会很好奇，能不能在泛型方法（类）中创建泛型类型的实例呢？
答案是不可以的

```java
public static <E> void append(List<E> list) {
    E elem = new E();  // 编译错误
    list.add(elem);
}
```

不过可以使用反射来创建实例

```java
public static <E> void append(List<E> list, Class<E> cls) throws Exception {
    E elem = cls.newInstance();   // OK
    list.add(elem);
}

List<String> ls = new ArrayList<>();
append(ls, String.class);
```

因为类型擦除的缘故，部分类型信息会丢失，我们在运行时不会获取到相应的类型，所以也就无法将该类型实例化成对象。

### 泛型和数组

在Java中，直接创建泛型数组是非法的。泛型设计的初衷是为了简化程序员类型转换的操作，保证类型安全。数组是**协变**的，如果Sub为Super的子类型，那么数组Sub[]就是Super[]的子类型。这样做就很难保证存储上的安全。

但在实际使用过程中，往往需要创建泛型数组：

```java
public static <E> E[] newArray(int n) {
    return new E[n];
}
```

这个时候运行程序，会抛出异常

```
Exception in thread "main" java.lang.Error: Unresolved compilation problem: 
	Cannot create a generic array of E
```

在这种情况下，可以使用列表来代替数组

```java
public static <E> List<E> newList() {
    return new ArrayList<E>();
```

但是，Java不是生来就有List的，如果遇到必须使用数组的情况该怎么办？

在这里可以参考Java里聚合类型的实现，以一个简单的例子说明

```java
public class Stack<E> {
    private E[] elements;
    private int size = 0;

    public Stack() {
        elements = new E[10];
    }

    public void push(E e) {
        elements[size++] = e;
    }

    public E pop() {
        E result = elements[--size];
        elements[size] = null;
        return result;
    }
}
```

上面的例子和`java.util.Stack`还是有区别的，只是为了说明如何处理泛型数组问题。

同样运行的时候会出错

```
Exception in thread "main" java.lang.Error: Unresolved compilation problem: 
	Cannot create a generic array of E
```

一种方法是在创建泛型数组的时候创建一个Object数组，然后转换成E数组。

```
elements = (E[]) new Object[10];
```

第二种方法将数组类型改为Object，在弹出元素的时候进行转换

```java
public class Stack<E> {
    private Object[] elements;
    ...
    public E pop() {
        E result = (E) elements[--size];
        ...
    }
}
```

数组和泛型有着不同的规则和特性，一般来说不能很好的混用。如果混合起来的时候，请注意编译器的警告和错误，保证在类型问题上不要出现问题。

## 参考内容

+ [Java总结篇系列：Java泛型](http://www.cnblogs.com/lwbqqyumidi/p/3837629.html)
+ [Java泛型详解](http://blog.csdn.net/jinuxwu/article/details/6771121)
+ [Java - Generics](http://www.tutorialspoint.com/java/java_generics.htm)
+ [学习：Java泛型之二（泛型方法）](http://www.cnblogs.com/anrainie/archive/2012/03/09/2387272.html)
+ [Lesson: Generics](https://docs.oracle.com/javase/tutorial/java/generics/index.html)
+ [Java泛型：泛型类、泛型接口和泛型方法](http://segmentfault.com/a/1190000002646193)
+ [Java泛型中E、T、K、V等的含义](http://blog.csdn.net/chenlycly/article/details/25561029)
+ [Java泛型与类型擦除](http://www.importnew.com/13907.html)
+ [Restrictions on Generics](http://docs.oracle.com/javase/tutorial/java/generics/restrictions.html)
