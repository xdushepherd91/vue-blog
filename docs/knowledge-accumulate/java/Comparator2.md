---
title: Comparator接口之default方法使用
lang: zh-CN
navbar: true
contributors: false
lastUpdated: false
---

### 前言

上一篇文章，主要研究Comparator接口提供的一些静态类方法的使用技巧，本片则主要关注Comparator提供的各个default方法的使用技巧

### reversed

````java
package com.sankuai.xdushepherd.apache.common.lang.compare.comparator;

import java.util.Comparator;
public class ComparatorReversedTest extends BaseComparatorTest {

    public static void main(String[] args) {
        Comparator<Parent> personNameComparator = Comparator.comparing(Parent::getName);
        int compare = personNameComparator.compare(wang, yu);

        System.out.println("wang 和 yu 的自然序比较结果为" + compare);

        int compare1 = personNameComparator.reversed().compare(wang, yu);

        System.out.println("wang 和 yu 的逆序比较结果为" + compare1 );

    }
}
/** output
 * wang 和 yu 的自然序比较结果为-2
 * wang 和 yu 的逆序比较结果为2
 */
````

### thenComparing、thenComparingInt、thenComparingLong 和 thenComparingDouble

```java
package com.sankuai.xdushepherd.apache.common.lang.compare.comparator;

import java.util.Comparator;

public class ComparatorThenComparingTest extends BaseComparatorTest{

    public static void main(String[] args) {
        Parent wang14 = new Parent("wang", 14);
        Parent wang18 = new Parent("wang", 18);
        Comparator<Parent> personNameComparator = Comparator.comparing(Parent::getName);
        Comparator<Parent> personNameAgeComparator = personNameComparator.thenComparing(Parent::getAge);

        int compare = personNameComparator.compare(wang14, wang18);

        System.out.println("name 比较器的结果是" + compare);

        int compare1 = personNameAgeComparator.compare(wang14, wang18);
        System.out.println("personNameAgeComparator 的比较结果是 " + compare1);

    }
/**
 * name 比较器的结果是0
 * personNameAgeComparator 的比较结果是 -1
 */
}
```