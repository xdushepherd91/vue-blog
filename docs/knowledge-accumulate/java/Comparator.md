---
title: Comparator接口
lang: zh-CN
navbar: true
contributors: false
lastUpdated: false
---

### 前言

Comparator接口是jdk提供的一个函数式接口，compare是该接口的核心方法。顾名思义，该接口的实现类是一个比较器，用来比较两个对象的大小。
```java
@FunctionalInterface
public interface Comparator<T> {
    int compare(T o1, T o2);
}
```
除了核心的compare方法之外，jdk在Comparator接口还定义了两种方法，一种是default方法，另一种是类方法。本篇主要关注类方法，研究其用法。

### comparing
如下，是comparing方法的使用示例，comparing方法是一个工厂方法，方法入参可以是某个类型T的方法引用，生成一个Comparator实例。 简单理解，该Comparator实例可以对两个T类型实例的某个属性的进行比较操作
````java
package com.sankuai.xdushepherd.apache.common.lang.compare.comparator;

import java.util.Comparator;

public class ComparingTest {

    public static void main(String[] args) {
        Person wang = new Person("wang");
        Person yu = new Person("yu");

        Comparator<Person> personNameComparator = Comparator.comparing(Person::getName);
        int result = personNameComparator.compare(wang, yu);
        System.out.println("wang和yu的比较结果是 " + result);
        //wang和yu的比较结果是 -2
        
        Comparator<Parent> comparing = Comparator.comparing(Parent::getName, Comparator.reverseOrder());
        int compare = comparing.compare(wang, yu);
        System.out.println("wang和yu的逆序比较结果是 " + compare);
        //wang和yu的逆序比较结果是 2
    }
}
````

### comparingInt、comparingLong和comparingDouble
如下是comparingInt方法的使用示例，方法入参可以是某个类型T的方法引用，该方法返回了一个Comparator示例。该实例可以对两个T类型实例的某个Integer类型属性的大小进行比较。comparingLong和comparingDouble也是类似的。
````java
package com.sankuai.xdushepherd.apache.common.lang.compare.comparator;

import java.util.Comparator;

public class ComparingIntTest {

    public static void main(String[] args) {
        Comparator<Parent> parentAgeComparator = Comparator.comparingInt(Parent::getAge);
        Parent wang = new Parent("wang", 31);
        Parent yu = new Parent("yu", 30);
        int result = parentAgeComparator.compare(wang, yu);
        System.out.println("wang 的年龄比yu大: " + (result > 0));
    }
}
````
### reverseOrder 和  naturalOrder

````java
package com.sankuai.xdushepherd.apache.common.lang.compare.comparator;

import java.util.Comparator;

public class ReversedOrderTest {

    public static void main(String[] args) {
        Integer a = 1;
        Integer b = 2;
        Comparator<Integer> integerComparator = Comparator.reverseOrder();
        int result = integerComparator.compare(a, b);
        System.out.println("1 和 2 的逆序比较结果是" + result);
        result = a.compareTo(b);
        System.out.println("1 和 2 的自然序比较结果是" + result);
        /*
            1 和 2 的逆序比较结果是1
            1 和 2 的自然序比较结果是-1
         */
    }
}
````

### nullFirst 和 nullLast

有了上面的经验，顾名思义，nullFirst返回一个Comparator实例，该实例在比较null和一个对象时，认为null是更小的一个。nullLast相反。





