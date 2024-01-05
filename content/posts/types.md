---
date: "2023-12-25T17:42:09+08:00"
draft: false
params: {}
tags:
    - go
    - 编程
title: types
---
```go
package api

// AppConfig is a model of config post form
type AppConfig struct {
	Key string `json:"key" form:"key"`
	// will be used as a preffix of store path in etcd
	NameSpace string `json:"namespace" form:"namespace"`
	// will be used as a suffix of store path in etcd
	FileName string `json:"file_name" form:"file_name"`
	// yaml content
	Body     string `json:"body" form:"body"`
	Fullpath string `json:"full_path" form:"full_path"`
}

type Message struct {
	Status int         `json:"status"`
	Msg    string      `json:"msg"`
	Data   interface{} `json:"data,omitempty"`
}
```