---
title: ComparableUtils工具类
lang: zh-CN
navbar: true
contributors: false
lastUpdated: false
---

### 前言
ComparableUtils工具类是对Comparable#compareTo方法的一个翻译。比如下面例子中，显然，使用ComparableUtils进行比较更加直观易懂
```java
public class ComparableUtilsTest {
    public static void main(String[] args) {
        Integer a = 1;
        Integer b = 2;
        System.out.println("1 is less than 2： "  +  (a.compareTo(b) < 0));
        System.out.println("1 is less than 2: " + ComparableUtils.is(1).lessThan(2));
    }
}
```
### 更多

在函数式编程时代，ComparableUtils提供了一些便利的方法，方便我们生成一些比较类的predicate示例，比如
```java
package com.sankuai.xdushepherd.apache.common.lang.compare;

import org.apache.commons.lang3.compare.ComparableUtils;

import java.util.function.Predicate;

/**
 * @author wangqianyi03
 * @date 2022/2/15 22:14
 */
public class ComparableUtilsTest {


    public static void main(String[] args) {

        System.out.println("1 is greater than 0: " + ComparableUtils.is(1).greaterThan(0));
        Integer a = 1;
        Integer b = 2;
        System.out.println("1 is less than 2： "  +  (a.compareTo(b) < 0));
        /*
            1 is greater than 0: true
            1 is less than 2： true
         */
        System.out.println("ComparableUtils.betweenExclusive");
        testBetweenExclusive();
        /*
            ComparableUtils.betweenExclusive
            1 is in (1,10) : false
            2 is in (1,10) : true
            9 is in (1,10) : true
            10 is in (1,10) : false
         */

        System.out.println("ComparableUtils.between");
        testBetween();
        /*
            ComparableUtils.between
            0 is in [1,10] : false
            1 is in [1,10] : true
            2 is in [1,10] : true
            8 is in [1,10] : true
            9 is in [1,10] : true
            10 is in [1,10] : true
            11 is in [1,10] : false
        */
        System.out.println("ComparableUtils.ge");
        testGe();
        /*
            ComparableUtils.ge
            1 ge 1 is true
            0 ge 1 is false
            2 ge 1 is true
            100 ge 1 is true
         */
    }

    private static void testGe() {
        Predicate<Integer> greaterOrEqualsPredicate = ComparableUtils.ge(1);
        System.out.println("1 ge 1 is " + greaterOrEqualsPredicate.test(1));
        System.out.println("0 ge 1 is " + greaterOrEqualsPredicate.test(0));
        System.out.println("2 ge 1 is " + greaterOrEqualsPredicate.test(2));
        System.out.println("100 ge 1 is " + greaterOrEqualsPredicate.test(100));
    }


    /**
     * 生成一个左闭右开区间的predicate
     */
    private static void testBetweenExclusive() {
        Predicate<Integer> betweenExclusive = ComparableUtils.betweenExclusive(1, 10);
        System.out.printf("1 is in (1,10) : %s\n", betweenExclusive.test(1));
        System.out.printf("2 is in (1,10) : %s\n", betweenExclusive.test(2));
        System.out.printf("9 is in (1,10) : %s\n", betweenExclusive.test(9));
        System.out.printf("10 is in (1,10) : %s\n", betweenExclusive.test(10));
    }

    /**
     * 生成一个闭合的区间predicate
     */
    private static void testBetween() {
        Predicate<Integer> betweenExclusive = ComparableUtils.between(1, 10);
        System.out.printf("0 is in [1,10] : %s\n", betweenExclusive.test(0));
        System.out.printf("1 is in [1,10] : %s\n", betweenExclusive.test(1));
        System.out.printf("2 is in [1,10] : %s\n", betweenExclusive.test(2));
        System.out.printf("8 is in [1,10] : %s\n", betweenExclusive.test(8));
        System.out.printf("9 is in [1,10] : %s\n", betweenExclusive.test(9));
        System.out.printf("10 is in [1,10] : %s\n", betweenExclusive.test(10));
        System.out.printf("11 is in [1,10] : %s\n", betweenExclusive.test(11));
    }


}
```



