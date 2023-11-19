---
layout: post
title: SAXParser解析XML时抛出ArrayIndexOutOfBoundsException异常
date: '2015-11-27 21:05:47'
categories:
  - 问题麻烦
tags:
  - java
  - xml
---

今天在使用`SAXParser`解析XML时会抛出一个`ArrayIndexOutOfBoundsException`异常。只测试了在CDATA标签中，如果字符多余1033个就会出现异常。

# 问题

写了一个小的样例重现这个问题：

XML文件：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<a>
    <b>
        <c>
            <![CDATA[
1111111111111111111111111111111111111111111111111111111111111111111
1111111111111111111111111111111111111111111111111111111111111111111
1111111111111111111111111111111111111111111111111111111111111111111
1111111111111111111111111111111111111111111111111111111111111111111
1111111111111111111111111111111111111111111111111111111111111111111
1111111111111111111111111111111111111111111111111111111111111111111
1111111111111111111111111111111111111111111111111111111111111111111
1111111111111111111111111111111111111111111111111111111111111111111
1111111111111111111111111111111111111111111111111111111111111111111
1111111111111111111111111111111111111111111111111111111111111111111
1111111111111111111111111111111111111111111111111111111111111111111
1111111111111111111111111111111111111111111111111111111111111111111
1111111111111111111111111111111111111111111111111111111111111111111
1111111111111111111111111111111111111111111111111111111111111111111
111111111111111111111111111111111111111111
]]>
        </c>
    </b>
</a>

```
几个测试类：

{% codeblock lang:java DatabaseParserHandler.java %}
package com.sumy.xmlwikimanager.dao;

import com.sumy.xmlwikimanager.bean.WikiItem;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

/**
 * Created by Sumy on 2015/11/27 0027.
 */
public class DatabaseParserHandler extends DefaultHandler {

    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
        System.out.println("startElement: uri[" + uri + "] localName[" + localName + "] qName[" + qName + "]"); 
    }

    @Override
    public void characters(char[] ch, int start, int length) throws SAXException {
        super.characters(ch, start, length);
        System.out.println(length);
    }
}
{% endcodeblock %}

{% codeblock lang:java XMLUtil.java %}
package com.sumy.xmlwikimanager.dao;

import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import java.io.File;
import java.io.IOException;
/**
 * Created by Sumy on 2015/11/27 0027.
 */
public class XMLUtil {
    public static void parserXML(File file) {
        try {

            SAXParserFactory factory = SAXParserFactory.newInstance();
            SAXParser parser = factory.newSAXParser();
            parser.parse(file, new DatabaseParserHandler());
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        } catch (SAXException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public static void main(String[] args) {

        parserXML(new File("Category.xml"));

    }
}
{% endcodeblock %}

运行之后抛出的异常：

```
java.lang.ArrayIndexOutOfBoundsException
    at java.lang.System.arraycopy(Native Method)
    at org.gjt.xpp.impl.tokenizer.Tokenizer.next(Tokenizer.java:1274)
    at org.gjt.xpp.impl.pullparser.PullParser.next(PullParser.java:392)
    at org.gjt.xpp.sax2.Driver.parseSubTree(Driver.java:415)
    at org.gjt.xpp.sax2.Driver.parse(Driver.java:310)
    at javax.xml.parsers.SAXParser.parse(SAXParser.java:392)
    at javax.xml.parsers.SAXParser.parse(SAXParser.java:328)
    at com.sumy.xmlwikimanager.dao.XMLUtil.parserXML(XMLUtil.java:28)
    at com.sumy.xmlwikimanager.dao.XMLUtil.main(XMLUtil.java:68)
    at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
    at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
    at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
    at java.lang.reflect.Method.invoke(Method.java:497)
    at com.intellij.rt.execution.application.AppMain.main(AppMain.java:144)
```

疑似是一个bug，暂时还没有找到解决方法。考虑换其它的XML解析引擎试一下。

# 临时解决

对于`javax.xml.parsers.SAXParser`有多重实现方式，应当避免选中`pull-parser-xx.jar`包下的实现方式，在工程中可以删除该包。确定当前的实现方式可以参考[stackoverflow.com/a/1804281/3215527](http://stackoverflow.com/a/1804281/3215527)上面的方法。

由于工程需要使用`DOM4j`来解析，采取了一种折衷的方式。首先使用JDK默认的实现方式，将XML解析成`org.w3c.dom.Document`，然后使用`org.dom4j.io.DOMReader`将其转换成`import org.dom4j.Document`。

这样做临时避免了上面的问题，但是不知道问题的原因还是有点不爽。