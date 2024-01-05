---
date: "2023-12-27T19:35:39+08:00"
draft: false
params: {}
tags:
    - go
    - 编程
title: client
---
```go
package etcdv3

import (
	"bytes"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	. "gitlab.xaotos.cn/xulingming/go-dyconf/common/types/api"
	"gitlab.xaotos.cn/xulingming/go-dyconf/common/util"
	"gitlab.xaotos.cn/xulingming/go-dyconf/server/service"
	svc "gitlab.xaotos.cn/xulingming/go-dyconf/server/service"
	clientv3 "go.etcd.io/etcd/client/v3"
	"gopkg.in/yaml.v3"
)

// ClientOprator holds a set of api handlers to perform
// submit, query, update and delete app config
type ClientOprator struct {
	EtcdCli *clientv3.Client
}

func (co *ClientOprator) PostAppConfig(ctx *gin.Context) {
	var appConf = new(AppConfig)
	err := ctx.ShouldBind(appConf)
	if err == nil {
		// validate yaml
		fmt.Printf("%+v\n", appConf)
		dec := yaml.NewDecoder(bytes.NewReader([]byte(appConf.Body)))
		err := dec.Decode(make(map[string]interface{}))
		if err != nil {
			ctx.JSON(http.StatusOK, &Message{1, "yaml:" + err.Error(), nil})
			return
		} else {
			err := Put(ctx.Request.Context(), co.EtcdCli, appConf)
			if err == nil {
				_, err = svc.SaveAppConfig(ctx.Request.Context(), appConf)
				if err == nil {
					ctx.JSON(http.StatusOK, &Message{0, "put ok", nil})
					return
				}
			}
			ctx.JSON(http.StatusOK, &Message{1, err.Error(), nil})
			return
		}
	}
}

func (co *ClientOprator) DeleteAppConfig(ctx *gin.Context) {
	var appConf = new(AppConfig)
	var err = ctx.ShouldBind(appConf)
	if err == nil {
		err = Delete(ctx.Request.Context(), co.EtcdCli, appConf.Fullpath)
		if err == nil {
			err = service.DeleteAppConfig(ctx.Request.Context(), appConf)
			if err == nil {
				ctx.JSON(http.StatusOK, util.RespOk(nil, "delete ok"))
				return
			}
		}
	}
	ctx.JSON(http.StatusOK, util.RespFail(err.Error()))
	return
}

func (co *ClientOprator) GetAppConfig(ctx *gin.Context) {
	var appConf = new(AppConfig)
	var err error
	if ctx.Request.Method == "GET" {
		err = ctx.ShouldBindQuery(appConf)
	} else {
		err = ctx.ShouldBindJSON(appConf)
	}
	if err == nil {
		log.Printf("%v\n", appConf)
		var (
			v   *KeyValue
			err error
		)
		if appConf.Revision > 0 {
			v, err = GetWithRev(ctx.Request.Context(), co.EtcdCli, appConf.Fullpath, appConf.Revision)
		} else {
			v, err = Get(ctx.Request.Context(), co.EtcdCli, appConf.Fullpath)
		}
		if err == nil {
			ctx.JSON(http.StatusOK, util.RespOk(v, "get ok"))
			return
		} else {
			ctx.JSON(http.StatusOK, util.RespFail(err.Error()))
			return
		}
	} else {
		ctx.JSON(http.StatusOK, util.RespFail(err.Error()))
		return
	}
}
func (co *ClientOprator) UpdateAppConfig(ctx *gin.Context) {
	var appConf = new(AppConfig)
	var err error
	err = ctx.ShouldBind(appConf)
	if err == nil {
		log.Printf("%v\n", appConf)
		err := Put(ctx.Request.Context(), co.EtcdCli, appConf)
		if err == nil {
			ctx.JSON(http.StatusOK, util.RespOk(nil, "update ok"))
			return
		}
	}
	ctx.JSON(http.StatusOK, util.RespFail(err.Error()))
	return
}
func (co *ClientOprator) AppConfig(ctx *gin.Context) {
	var appConf = new(AppConfig)
	var err error
	err = ctx.ShouldBindJSON(appConf)
	if err == nil {
		log.Printf("%v\n", appConf)
		err := Put(ctx.Request.Context(), co.EtcdCli, appConf)
		if err == nil {
			ctx.JSON(http.StatusOK, util.RespOk(nil, "update ok"))
			return
		}
	}
	ctx.JSON(http.StatusOK, util.RespFail(err.Error()))
	return
}

type Paginator struct {
	Page    int    `json:"page" form:"page"`
	Limit   int    `json:"limit" form:"limit"`
	FromKey string `json:"from_key" form:"from_key"`
}

func (co *ClientOprator) PagingAppConfig(ctx *gin.Context) {
	page := util.Query2Intn(ctx.Query("page"), 1)
	limit := util.Query2Intn(ctx.Query("limit"), 200)
	p, err := service.PagingAppConfig(ctx.Request.Context(), page, limit)

	if err != nil {
		ctx.JSON(http.StatusOK, util.RespFail(err.Error()))
	} else {
		ctx.JSON(http.StatusOK, util.RespOk(p, ""))
	}
}
```