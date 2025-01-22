# 介绍

用于生成开发者开发时需要的一些材料, 比如生成一个指定大小的图片/url, 生成一堆人名/邮箱等

[toc]

## 生成指定尺寸的图片/图片链接

```sh
# -w 图片的宽度 -h 图片的高度, --url 表示生成链接
# 其他选项使用 dhc image --help 可以查看
dhc image -w500 -h300 --url
```

## 开发命令行程序的流程

1. 指定 `package.json` 的 `bin` 字段

```jsonc
// 可以是对象 dhc 表示命令名
"bin": {
    "dhc": "./bin/index.js"
},

// 可以是字符串, 表示要执行的 js 文件
"bin": "./bin/index.js"
```

2. 如果是 ts, 需要编译:
   - 1. 编译的结果必须是 `bin/index.js`
   - 2. 需要注意编译后使用的模块规范, 如果是 ESM 需要指定 `package.json` 的 `type` 为 `module`
3. 需要指定 `shebang` 为 `node`

```sh
#!/usr/bin/env node
# 这个代码的意思是 使用 node 来执行这个文件
# 可以先手动地执行(node ./bin/index.js), 然后再修改为 `#!/usr/bin/env node`
```

4. 使用 `npm link` 命令, 将项目链接到全局, 然后就可以在终端中使用 `dhc` 命令了

```sh
# 链接当前项目到全局(如果是 mac 可能有权限问题, 需要 sudo)
npm link

# 取消链接
npm unlink
```

5. 使用测试

```sh
dhc --help
```

## 开发命令行程序好用的工具包

- 解析命令行参数: [commander.js](https://www.npmjs.com/package/commander) [yargs](https://www.npmjs.com/package/yargs) [cacjs](https://www.npmjs.com/package/cac)

- 命令行交互: [@inquirer/prompts](https://www.npmjs.com/package/@inquirer/prompts) [prompts](https://www.npmjs.com/package/prompts)

- 命令行进度条: [cli-progress](https://www.npmjs.com/package/cli-progress)

- 命令行 loading: [ora](https://www.npmjs.com/package/ora)
