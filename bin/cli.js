#!/usr/bin/env node
var program = require("commander");
const { blue, green } = require("../utils/consoleColor");
const create = require("./create");

/**
 * version版本
 */
program
  .version("0.0.1")
  /**
   * option选项
   * 使用.option()方法定义commander的选项options,示例：.option('-n, --name [items2]', 'name description', 'default value')
   */
  .requiredOption("-n, --name <name>", "名称必填")


const options = program.opts();

program
  .command("create")
  .description("创建React模版文件或者文件夹")
  .action(function () {
    blue("创建React模版文件🚗");
    create(options);
  });

program
  .command("start")
  .description("start a project")
  .action(function () {
    blue("--------运行项目-------");
  });

/* mycli build 打包项目 */
program
  .command("build")
  .description("build a project")
  .action(function () {
    green("--------构建项目-------");
  });


program.parse(process.argv);
