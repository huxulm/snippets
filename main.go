package main

import (
	"fmt"
	"io/fs"
	"math/rand"
	"os"
	fp "path/filepath"
	"strings"
	"time"

	"gopkg.in/yaml.v3"
)

type Article struct {
	Header  map[string]interface{}
	Content string
}

func main() {
	root := `C:\Users\bx\gitlab\go-dyconf`
	out := `C:\Users\bx\gitlab\code_snippets\content\posts`
	var fn fp.WalkFunc
	var excludsDirs = map[string]bool{
		"node_modules/": true,
		".git":          true,
		".next":         true,
		"out":           true,
		"web":           true,
		"assets":        true,
	}
	var includsExts = map[string]bool{
		".go":  true,
		".jsx": true,
		".js":  true,
	}
	_ = includsExts
	fn = func(path string, info fs.FileInfo, err error) error {
		if info == nil {
			return nil
		}
		if info.IsDir() {
			if checkSuffixNotIn(info.Name(), excludsDirs) {
				fp.Walk(info.Name(), fn)
			}
		} else if checkSuffixIn(path, includsExts) {
			a := generate(path, info)
			writeTo(out, a)
		}
		return nil
	}
	fp.Walk(root, fn)
}

func generate(path string, info fs.FileInfo) *Article {
	a := &Article{}
	a.Header = generateHeaders(strings.Split(fp.Base(info.Name()), ".")[0], info.ModTime().Format(time.RFC3339), false, "huxulm", nil, []string{"go", "编程"})
	data, err := os.ReadFile(path)
	if err == nil {
		a.Content = string(data)
	}
	return a
}

func generateHeaders(title, date string, draft bool, author string, params map[string]interface{}, tags []string) map[string]interface{} {
	return map[string]interface{}{
		"title":  title,
		"date":   date,
		"draft":  draft,
		"params": params,
		"tags":   tags,
	}
}
func checkSuffixNotIn(s string, mp map[string]bool) bool {
	for k := range mp {
		if strings.Contains(s, k) {
			return false
		}
	}
	return true
}

func checkSuffixIn(s string, mp map[string]bool) bool {
	for k := range mp {
		if strings.HasSuffix(s, k) {
			return true
		}
	}
	return false
}

func writeTo(out string, art *Article) bool {
	tmpl := "---\n%s---\n```go\n%s```"
	hd, _ := yaml.Marshal(art.Header)
	result, err := os.Create(fp.Join(out, art.Header["title"].(string)) + ".md")
	if err == nil {
		defer result.Close()
	}
	_, err = fmt.Fprintf(result, tmpl, string(hd), art.Content)
	return err == nil
}

func randomTime() string {
	now := time.Now()
	y, m, d := now.Date()
	return fmt.Sprintf("%d-%d-%d %02d:%02d:%02d", y, m, d, randNum(24), randNum(60), randNum(60))
}

func randNum(lim int) int {
	return rand.Intn(lim + 1)
}
