---
title: "C++ Cheatsheet"
date: 2024-01-11T13:00:59+08:00
tags: ["C++"]
toc: true
featured_image: ""
description: "C++ 基本语法"
params:
  description: "C++ 基本语法"
---
## 基础
C++ 编程语言的基本语法和函数用法指南。
### 模板
```cpp
#include <iostream>
using namespace std;

int main() {
  cout << "Welcome!";
  return 0;
}
```
### cout <<
向屏幕输出内容
```cpp
cout << "这是C++编程！";
```
### cin >>
从屏幕读取输入
```cpp
cin >> variable_name;
```
## 数据类型
### 字符型
通常是一个八位位组（一个字节）。它是一种整数类型。
```cpp
char variable_name;
```
### 整数型
机器默认整数大小
```cpp
int variable_name;
```
### Float
单精度浮点值
```cpp
float vraiable_name;
```
### Double 型
双精度浮点值
```cpp
double vraiable_name;
### void 型
表示没有类型
```cpp
void
```
### 布尔型
```cpp
bool varaible_name;
```
# 转义序列（Escape sequences）
它是以反斜线开头的字符序列，在字符串字面量中使用时不表示自身。
| 字符    | 功能 | 示例 |
| -------- | ------- |------- |
| `\a` |它会发出哔哔声(测试没有听到😓)|`cout << "\a";`|
| `\b` |Backspace|`cout << "\b";`|
| `\f` |Form Feed|`cout << "\f";`|
| `\n` |换行|`cout << "\n";`|
| `\r` |回车|`cout << "\r";`|
| `\t` |Tab|`cout << "\t";`|
| `\\` |反斜杠|`cout << "\\";`|
| `\'` |单引号|`cout << "\'";`|
| `\?'` |？号|`cout << "\?";`|
| `\nnn'` |表示八进制数的值|`cout << "\nnn";`|
| `\xhh'` |表示十六进制数的值|`cout << "\xhh";`|
| `\0'` |空字符通常用于终止字符串|`cout << "\0";`|

## 注释
### 单行注释
```cpp
// 这是一个单行注释
```
### 多行注释
```cpp
/* 这是
一个多行
注释
*/
```
## 字符串
### 声明字符串
```cpp
// 引入字符串库
#include <string>

// 字符串变量
string variable1 = "Hello World";
```
### append 函数
用于拼接两个字符串
```cpp
string firstname = "Harry ";
string lastname = "Potter";
cout << firstname.append(lastname) << endl;
return 0;
```
### length 函数
返回字符串长度
```cpp
string variable1 = "CodeWithHarry";
cout << "字符串长度为: " << variable1.length() << endl； // 字符串长度为: 13
```
### 访问和修改字符串
下标
```cpp
string variable1 = "Hello World";
variable1[1] = 'i';
cout << variable1;
```
## 数学
### 最大值
```cpp
cout << max(25, 100);
```
### 最小值
```cpp
cout << min(55, 50);
```
### 平方根
```cpp
#include <cmath>

cout << sqrt(144);
```
### 向上取整
```cpp
cout << ceil(1.9) << endl; // 输出 2
```
### 向下取整
```cpp
cout << floor(1.9) << endl; // 输出 1
```
### 幂函数
```cpp
cout << pow(2, 3) << endl; // 输出 8
```
## 条件语句
条件语句用于根据某些条件执行操作。
### if
```cpp
if (condition) {
  // 条件为真，会执行此处代码
}
```
### if-else
```cpp
if (condition) {
  // 条件为 True，会执行此处代码
} else {
  // 条件为 False，会执行此处代码
}
```
### if-else-if
```cpp
if (condition1) {
  // 语句1
} else if (condition2) {
  // 语句2
} else {
  // 语句3
}
```
### 三元运算符
```cpp
variable = (condition) ? expressionTrue : expressionFalse;
```
### switch-case
```cpp
### 三元运算符
```cpp
  int c = 2;
  switch (c) {
    case 1:
      cout << "the num is " << c;
      break;
    case 2:
      cout << "the num is " << c;
      break;
    default:
      break;
  }
  cout << endl; // the num is 2
```
## 迭代语句
### while-loop
```cpp
while (/* condition */) {
  /* 此处代码会被执行 */
}
```
### do-while
退出控制循环。与 while 循环非常相似，不同的是即使条件为 False，do-while 循环的主体也会至少执行一次。
```cpp
do {
  /* 代码 */
} while (/* condition */);
```
### for 循环
```cpp
for (int i = 0; i < count; i++) {
  /* 代码 */
}
```
### break
可以使用 `break` 关键字终止循环。
### continue
`continue` 关键字用于跳过当前循环的其余迭代，返回循环的起点。
