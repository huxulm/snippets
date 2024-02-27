---
title: "kubernetes 中 ETCD 数据备份与恢复"
date: 2024-02-28T01:44:12+08:00
tags: []
featured_image: ""
description: ""
keywords:
- kubernetes
- etcd
- 备份
- 恢复
---
日常使用 etcd 容器进行备份&恢复数据相对比较方便。。

## 备份
```shell
docker run --rm -e ETCDCTL_API=3 && \ 
  quay.io/coreos/etcd:v3.5.5 /usr/local/bin/etcdctl && \
  --endpoints=https://x.x.x.x:2379 && \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt && \
  --cert=/etc/kubernetes/pki/etcd/healthcheck-client.crt && \
  --key=/etc/kubernetes/pki/etcd/healthcheck-client.key snapshot save && \
  /backup/etcd-snapshot_$(date +%Y%m%d).db
```
## 恢复
```shell
docker run --rm -e ETCDCTL_API=3  -v ./snap:/snap && \
  -v /var/lib/etcd:/var/lib/etcd quay.io/coreos/etcd:v3.5.5 && \
  /usr/local/bin/etcdctl --data-dir /var/lib/etcd && \
  snapshot restore /snap/etcd-snapshot_20231025.db
```
