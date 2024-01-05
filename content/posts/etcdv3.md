---
date: "2023-12-25T17:42:09+08:00"
draft: false
params: {}
tags:
    - go
    - 编程
title: etcdv3
---
```go
package etcdv3

import (
	"context"
	"fmt"
	"log"
	"strings"

	. "gitlab.xaotos.cn/xulingming/go-dyconf/common/types/api"
	clientv3 "go.etcd.io/etcd/client/v3"
)

var PREFFIX = "__GO_DYCONF"

func KeyGen(key, namespace, filename string) string {
	return fmt.Sprintf("/%s/%s/%s", key, namespace, filename)
}

func KeyGenWithPreffix(key, namespace, filename string) string {
	return fmt.Sprintf("/%s/%s/%s/%s", PREFFIX, key, namespace, filename)
}

// Put config
func Put(ctx context.Context, cli *clientv3.Client, c *AppConfig) error {
	var key = KeyGenWithPreffix(c.Key, c.NameSpace, c.FileName)
	if len(c.Fullpath) == 0 {
		c.Fullpath = key
	} else {
		key = c.Fullpath
	}
	value := c.Body
	log.Println("put:", key)
	_, err := cli.Put(ctx, key, value)
	return err
}

// Delete config
func Delete(ctx context.Context, cli *clientv3.Client, key string) error {
	log.Println("delete:", key)
	_, err := cli.Delete(ctx, key)
	return err
}

// Get config
func Get(ctx context.Context, cli *clientv3.Client, key string) (kv *KeyValue, err error) {
	log.Println("get:", key)
	defer func() {
		if v := recover(); v != nil {
			kv, err = nil, v.(error)
		}
	}()
	resp, err := cli.Get(ctx, key)
	if err == nil {
		return &KeyValue{
			Value:          string(resp.Kvs[0].Value),
			Version:        resp.Kvs[0].Version,
			CreateRevision: resp.Kvs[0].CreateRevision,
			ModRevision:    resp.Kvs[0].ModRevision,
		}, nil
	}
	return nil, err
}
func GetWithRev(ctx context.Context, cli *clientv3.Client, key string, rev int64) (kv *KeyValue, err error) {
	log.Println("get:", key)
	defer func() {
		if v := recover(); v != nil {
			kv, err = nil, v.(error)
		}
	}()
	resp, err := cli.Get(ctx, key, clientv3.WithRev(rev))
	if err == nil {
		return &KeyValue{
			Value:          string(resp.Kvs[0].Value),
			Version:        resp.Kvs[0].Version,
			CreateRevision: resp.Kvs[0].CreateRevision,
			ModRevision:    resp.Kvs[0].ModRevision,
		}, nil
	}
	return nil, err
}

type KeyValue struct {
	Key            string `protobuf:"bytes,1,opt,name=key,proto3" json:"key,omitempty"`
	CreateRevision int64  `protobuf:"varint,2,opt,name=create_revision,json=createRevision,proto3" json:"create_revision,omitempty"`
	ModRevision    int64  `protobuf:"varint,3,opt,name=mod_revision,json=modRevision,proto3" json:"mod_revision,omitempty"`
	Version        int64  `protobuf:"varint,4,opt,name=version,proto3" json:"version,omitempty"`
	Value          string `protobuf:"bytes,5,opt,name=value,proto3" json:"value"`
	Lease          int64  `protobuf:"varint,6,opt,name=lease,proto3" json:"lease,omitempty"`
}
type PageResponse struct {
	clientv3.GetResponse
	More bool        `json:"more"`
	Kvs  []*KeyValue `json:"kvs,omitempty"`
}

// Page config
func PageKeys(ctx context.Context, cli *clientv3.Client, page, limit int, fromKey string) (d interface{}, err error) {
	log.Println("get:", fromKey)
	defer func() {
		if v := recover(); v != nil {
			d, err = []byte{}, v.(error)
		}
	}()
	if limit <= 0 {
		limit = 20
	}
	opts := []clientv3.OpOption{clientv3.WithLimit(int64(limit)), clientv3.WithSort(clientv3.SortByKey, clientv3.SortAscend)}
	var key string
	if page == 1 {
		opts = append(opts, clientv3.WithPrefix())
		key = PREFFIX
	} else {
		key = fmt.Sprintf("%s/%s", PREFFIX, fromKey)
		opts = append(opts, clientv3.WithFromKey())
	}
	resp, err := cli.Get(ctx, key, opts...)
	pr := new(PageResponse)
	pr.Header = resp.Header
	pr.More = resp.More
	pr.Count = resp.Count
	pr.Kvs = make([]*KeyValue, len(resp.Kvs))
	for i, kv := range resp.Kvs {
		pr.Kvs[i] = &KeyValue{
			Key:            strings.TrimPrefix(string(kv.Key), PREFFIX+"/"),
			Value:          string(kv.Value),
			Version:        kv.Version,
			CreateRevision: kv.CreateRevision,
		}
	}
	if err == nil {
		return pr, nil
	}
	return nil, err
}
```