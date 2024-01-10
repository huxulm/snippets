# code_snippets
[Live Demo](https://huxulm.github.io/snippets/)
## 特性
- 响应式布局
- 集成 [algolia] 搜索引擎
- 30+ 代码主题
- hugo: HUGO_ENV, scss, css, Partials
- 自定义分类标签
- Layouts 模板

## 安装
> 需求 `npm` `hugo >= 0.110.0` [(extended版)](https://github.com/gohugoio/hugo/releases/tag/v0.110.0)
```
npm i
hugo server -D
```
## 样式
参考 [`assets/scss`](assets/scss) 目录

## 代码块主题
配置文件 [`hugo.yaml`](hugo.yaml) 中修改 `.params.prism_theme` 值为列表提供值
```
a11y-dark
atom-dark
base16-ateliersulphurpool.light.cs
cb
coldark-cold
coldark-dark
coy-without-shadows
darcula
dracula
duotone-dark
duotone-earth
duotone-forest
duotone-light
duotone-sea
duotone-space
ghcolors
gruvbox-dark
gruvbox-light
holi-theme
hopscotch
lucario
material-dark
material-light
material-oceanic
night-owl
nord
one-dark
one-light
pojoaque
shades-of-purple
solarized-dark-atom
synthwave84
vs
vsc-dark-plus
xonokai
z-touch
```
