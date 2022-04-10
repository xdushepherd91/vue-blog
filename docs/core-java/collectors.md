---
title: Collectors理解
lang: zh-CN
navbar: true
contributors: false
lastUpdated: false
---

### 背景

Java8开始，jdk中提供了stream操作流，给日常开发带来了极大地便利。比如, 将一个字符串数组用逗号连起来，可以通过如下方式完成
```java
public class CollectorsTest {

    public static void main(String[] args) {
        List<String> demoList = new ArrayList<String>() {
            {
                add("a");
                add("b");
                add("c");
                add("d");
                add("e");
                add("f");
            }
        };
        String result = demoList.stream().collect(Collectors.joining(","));
        System.out.println(result);
    }
}

//output a,b,c,d,e,f
```
### 问题: collect方法运行的逻辑是什么呢?

带着这个问题，我特意看下jdk中接口的定义，可以看到collect方法的主要职责是由Collector接口来完成的。
```java
interface Stream {
    <R, A> R collect(Collector<? super T, A, R> collector);
}

public interface Collector<T, A, R> {
    Supplier<A> supplier();
    BiConsumer<A, T> accumulator();
    BinaryOperator<A> combiner();
    Function<A, R> finisher();
    Set<Characteristics> characteristics();
}
```

根据jdk注释，可以得到Collector接口的几个主要方法的用法和关系如下：
1. supplier()方法负责在生成一个容器，该容器的类型是A，属于一个中间类型
2. accumulator()方法负责聚合数据。
3. finisher()负责accumulator()的返回值聚合在一起（处理数据分片的事情）

上述三者的配合逻辑如下。supplier用于初始化，accumulator()用于把传入的每个数据都聚合起来
```java
class Test {
    public static void main(String[] args) {
        R container = collector.supplier().get();
        for (T t : data)
            collector.accumulator().accept(container, t);
        return collector.finisher().apply(container);
    }
}
```

### 验证

对于Collectors.join(",")而言：
1. supplier()方法对应的是new StringJoiner(delimiter, prefix, suffix);
2. accumulator()方法对应的是StringJoiner::add。将每个字符串都放入1中生成的StringJoiner实例中
3. finisher()方法对应StringJoiner::toString。用于生成返回值。将StringJoiner转换为返回值类型实例。

```java
class Collectors {
    public static Collector<CharSequence, ?, String> joining(CharSequence delimiter) {
        return joining(delimiter, "", "");
    }
    public static Collector<CharSequence, ?, String> joining(CharSequence delimiter,
                                                             CharSequence prefix,
                                                             CharSequence suffix) {
        return new CollectorImpl<>(
                () -> new StringJoiner(delimiter, prefix, suffix),
                StringJoiner::add, StringJoiner::merge,
                StringJoiner::toString, CH_NOID);
    }
}
```


