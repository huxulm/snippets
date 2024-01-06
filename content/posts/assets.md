---
date: "2024-01-02T17:10:18+08:00"
draft: false
params: {}
tags:
    - go
    - 编程
title: assets
---
```go {title="assets.go"}
package assets

import (
	"embed"
	"io/fs"
)

//go:embed web/out
//go:embed web/out/_next
//go:embed web/out/_next/static/chunks/pages/*.js
//go:embed web/out/_next/static/chunks/app/*.js
//go:embed web/out/_next/static/*/*.js
var next embed.FS

func Assets() (fs.FS, error) {
	return fs.Sub(next, "web/out")
}
```