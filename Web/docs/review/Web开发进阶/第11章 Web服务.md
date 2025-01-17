---
sidebar_position: 11
---


## 第11章 Web服务

### 一、WebService概念

- Web指的是web协议，例如Http、FTP、SMTP（web协议适用领域广，传递纯文本）不能用一些RPC远程调用的协议。使用Web协议的好处是突破访问的限制，让更广阔的区域的人能够访问得到。（所以，比如一个网络文件系统既可以通过http的协议，也可以通过ftp的协议访问）
- 服务：独立于具体的实现：Service解决的是异构的问题（操作系统、编程语言的差异），比如客户端是C#开发的，服务端是java开发的，那为了方便他们之间的交互，我们就要走纯文本的路线大家都能认识的。既然是纯文本，那需要一定的格式，SOAP传的数据里面包括了一系列的operation、参数的名称类型，但是数据驱动型的。

### 二、SOAP

- SOAP指的是简单对象访问协议，针对API纯文本化传递，例如规定传递XML的格式
- WSDL：一个自描述的文件，把接口描述成xml的形式（只能XML），这个文件不需要自己写，通过工具生成。会根据接口、参数类型、参数顺序、接口返回的参数类型，全部用xml来表述出来。此外会把operation、服务所在的URL接口的名字写出来。
- binding是什么呢？比如一个webService可以通过http和ftp，那就有两个binding，类比老师接受答疑，可以通过腾讯会议也可以通过电话。

举例：

- 一个Java程序访问一个c#扣款的服务：
- 那么这个java程序就需要把c#扣款的服务的wsdl文件给拿过来
- 根据wsdl文件生成java语言的接口
- java程序调用接口，里面有一些操作可以调用，调用之后就可以经过一个proxy代理，翻译成一个soap消息发送到c#扣款的服务
- c#扣款的服务接收到soap消息，也是先被一个proxy代理拦截，把soap消息翻译成c#然后调用具体的业务逻辑。产生结果后，又返回给proxy代理，组装成一个soap消息，作为调用结果返回
- java端的proxy接收到soap消息，翻译成java的返回结果。
- java端成功的获取到返回结果

### 三、SOAP的缺点

- 需要一个WSDL的文件，里面需要描述消息传递的格式，有一个外挂文件的方式总的来说是不好，需要额外的东西。
- 反复组装和解析SOAP需要消耗大量的时间，性能不太好，需要经过很多的翻译
- 客户端、服务端和API耦合，一旦API发生变化（比如下单参数从四个变成五个），那么WSDL文件就要发生变化，服务端客户端代码都需要重新生成，需要消耗时间资源（代码可维护性变差）
- 因此我们需要数据驱动型的方式来，Restful Web Service应运而生

### 四、Restful Web Service

- 含义：Representational表述性，State状态，Transfer转移，全名表述性状态转移
- 表述性：所有的数据都是资源(通过设计URL然后来表示数据，客户端用来展示数据)，每一个资源都有自己的表示方式，有自己的URI
- 状态：指的是客户端的状态，客户端维护自己的状态，服务器是无状态的（避免维护客户端的状态，需要消耗内存资源）客户端自己保存cookie或者localstorage，资源的表示就是客户端的状态
- 转移：客户端从一个页面跳到另一个页面，一种表示跳到另一种表示，客户端的表示可以发生迁移。迁移的过程中，客户端只把数据请求回来，然后呈现出来，客户端的页面然后就发生了变化，这就是所谓的表述性状态转移
- Restful Web Service特点：
  - 典型的客户端、服务端架构，但是是无状态的
  - 客户端和服务端之间传递的都是数据
  - 服务端只处理数据，数据的展示完全依赖于客户端
  - Rest是幂等的
  - 通过URL设计，Get方法对应读、POST代表创建、PUT代表更新、DELETE代表删除，四个HTTP方法严格对应增删改查
  - 通过Http的返回码表示返回的结果，比如201成功，404代表不存在，500代表服务器内部的错误。

### 五、WebService的优点缺点

- 优点是跨平台，基于XML，json等等
- 自描述：WSDL就是一个自描述文件，里面包括了一系列的操作，Restful的话就是完全基于URL
- 模块化好，封装的好，不需要关系具体的实现
- 区域访问性质广，可以穿透防火墙

- 缺点是：写代码的效率低，不适合stand-alone应用，soap显然比之间rpc效率低，rest因为传递的是纯数据，数据的解析需要消耗一定的资源
- 性能有一定的降低了：需要把java对象转化为一个纯文本的，或者解析文本作为一个java对象
- 安全性，因为webService的地域性广，就比较容易受到攻击，或者中间人截获了。

### 六、什么时候用web Service

- 支持跨防火墙的通讯、支持跨防火墙的通信、支持应用集成、支持B2B集成、鼓励重用软件
- 不应该使用WS时：独立应用程序、如MS Office、局域网中的同构应用：例如COM+或EJB之间的通信（再比如spring访问mysql、redis、kafka、elasticSearch）

### 七、SOA

- SOA指的是Service-oriented architecture （面向服务的架构）
- 假如我要构建一个电子书店、里面包括了认证登录系统、财务系统、统计系统、订单系统，这么多系统开发下来很复杂，而且假如我是卖家，卖给了1000个新华书店的用户，然后突然发现某个系统存在漏洞，就要告诉一千个用户，这很麻烦
- 所以就有一个新方法、登录系统用第三方的比如百度的，订单系统用第三方的，然后我自己就只做一个集成。如果发现登录系统有bug，就告诉百度的问题，这样就可以快速构建一个应用，节约开发成本
- 特点：1、 服务之间松散耦合，也就是是登录系统、财务系统、统计系统、订单系统这些系统通过我开发的中间件联系，而不是之间直接互相通信，这样的好处就是假如我发现登录系统不好或者太贵了，我可以换一下，换之后别的系统也不会受到影响。2、位置透明，中介者负责路由，3、协议独立，从http切换到ftp，但是不要让客户端来实现