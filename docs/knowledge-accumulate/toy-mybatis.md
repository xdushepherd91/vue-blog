---
title: 简易版mybatis的开发过程记录——其一
lang: zh-CN
navbar: true
contributors: false
lastUpdated: false
---

### 背景

在mybatis的入门网站中，我们可以看到如下的示例语句:
```java
class Test {
    public static void main(String[] args) {
        BlogMapper mapper = session.getMapper(BlogMapper.class);
        Blog blog = mapper.selectBlog(101);
    }
}
```
如上，是mybatis框架最核心的特性。
### 目标
本次，笔者计划实现一个最简版的实现，达到和上文中mybatis语句类似的效果，不同之处，本次不实现其中的参数解析部分，最终效果如下:
```java
class Test {
    public static void main(String[] args) {
        BlogMapper mapper = ToyMytabis.getMapper(BlogMapper.class);
        Blog blog = mapper.selectBlog();
    }
}
```

在实现上述目标时，需要我们有一些前置准备动作，首当其冲的是，jdbc的相关知识，其次是Java动态代理的相关知识储备，对于这两处知识不甚了解或有遗忘的同学，可以参考下文实现及网络资源自行学习巩固。

### toy-mybatis-v1

忽略jdbc相关操作，首先熟悉一下Java动态代理在mybatis框架使用方式。[代码地址](https://github.com/xdushepherd91/toy-mapper/tree/toy-mybatis-v1)

#### 核心实现
```java
public class MapperMethodInvocationHandler implements InvocationHandler {
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        return new Blog("toy-mybatis的第一篇博客");
    }
}

public class ToyMybatis {

    public static Object getMapper(Class<?> t) {
        return Proxy.newProxyInstance(t.getClassLoader(), new Class[]{t}, new MapperMethodInvocationHandler());
    }
}
```

#### 测试验证

```java

@Data
@AllArgsConstructor
public class Blog {
    private String title;
}

public interface BlogMapper {
    Blog getFirstBlog();
}

class ToyMybatisTest {
    @Test
    void testGetMapper() {
        BlogMapper mapper = (BlogMapper) ToyMybatis.getMapper(BlogMapper.class);
        Blog firstBlog = mapper.getFirstBlog();
        assertEquals("toy-mybatis的第一篇博客", firstBlog.getTitle());
    }
}
```

### toy-mybatis-v2

在v1的基础上，我们增加一些最简单的jdbc操作。除此之外，本次对用户自定义的sql语句进行提取，对返回参数类型进行识别。[代码地址](https://github.com/xdushepherd91/toy-mapper/tree/toy-mybatis-v2)

#### 数据库链接管理实现

一个给定配置的h2数据库链接生成类

```java
public class SqlSession {
    private static final String DB_DRIVER = "org.h2.Driver";
    private static final String DB_CONNECTION = "jdbc:h2:tcp://localhost/~/test";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "root";

    public static Connection getDBConnection() throws ClassNotFoundException, SQLException {
        Connection dbConnection = null;
        Class.forName(DB_DRIVER);
        return DriverManager.getConnection(DB_CONNECTION, DB_USER, DB_PASSWORD);
    }

}
```

#### MapperMethodInvocationHandler类升级

1. 识别用户传递的sql语句
2. 自动基于返回类型生成实体对象并赋值

````java
public class MapperMethodInvocationHandler implements InvocationHandler {
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        Select select = method.getAnnotation(Select.class);
        if (select == null) {
            return null;
        }

        String sqlCommand = select.value();

        Connection dbConnection = SqlSession.getDBConnection();
        PreparedStatement preparedStatement = dbConnection.prepareStatement(sqlCommand);
        ResultSet resultSet = preparedStatement.executeQuery();
        if (resultSet.next()) {
            Class<?> returnType = method.getReturnType();
            Object result = returnType.newInstance();
            Field[] declaredFields = returnType.getDeclaredFields();
            for (Field declaredField : declaredFields) {
                Method setMethod = returnType.getDeclaredMethod("set" + StringUtils.capitalize(declaredField.getName()), declaredField.getType());
                setMethod.invoke(result, resultSet.getString(declaredField.getName()));
            }
            return result;
        }

        return null;
    }
}

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Select {
    String value() default "";
}
````

### 总结

以上为本文基于Java动态代理、注解等实现的toy mybatis框架。可以看到，当前的实现有很多不足，比如
1. InvocationHandler实现类中对各种异常类型未进行判断，比如Select注解缺失，Object类相关方法实现代理排除等
2. 仅仅实现了最初级的select实现，不支持参数传递, 不支持Insert，Delete和Update等基本的操作方法
4. 等等...

这些会在后续的文章中进行实现和演进。












