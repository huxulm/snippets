---
title: "HTTP 服务器"
date: 2024-01-10T13:01:22+08:00
toc: true
tags: ["Go", "Web"]
featured_image: ""
description: ""
params:
  description: ""
---
如何用 Go 创建一个基本的 HTTP 服务器。首先，让我们来谈谈 HTTP 服务器应该具备哪些能力。
基本 HTTP 服务器有几项关键工作需要处理。
- 处理动态请求：处理来自浏览网站、登录账户或发布图片的用户的传入请求。
- 提供静态资产：向浏览器提供 JavaScript、CSS 和图片，为用户创造动态体验。
- 接受连接：HTTP 服务器必须监听特定端口，才能接受来自互联网的连接。

## 处理动态请求
`net/http` 包含接受请求和动态处理请求所需的所有实用程序。我们可以使用 `http.HandleFunc` 函数注册一个新的 `handler`。它的第一个参数是匹配路径，第二个参数是要执行的函数。
```go
http.HandleFunc("/", func (w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Welcome to my website!")
})
```
`http.Request` 包含请求及其参数的所有信息。
### 读取 GET 请求查询参数
```go
r.URL.Query().Get("token")
```
### 读取 POST 请求表单参数
```go
r.FormValue("username")
```
