const inquirer = require("inquirer");
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const question = [
    {
    name: "isCreateDir" /* key */,
    type: "confirm" /* 确认 */,
    message: "是否创建文件夹？" /* 提示 */,
  },
];

const create = (options) => {
  const { name } = options;
  inquirer.prompt(question).then((answer) => {
    const { isCreateDir } = answer;
    // 输入命令所在文件夹
    const CMD_PATH = process.cwd();
    // 当前template文件夹
    const TEMPLATE_DIR = path.resolve(__dirname, '../template');
    // 创建文件夹
    if (isCreateDir) {
      // 创建目录
      execSync(`mkdir ${CMD_PATH}/${name}`);
      // 读取template文件
      const data = fs.readFileSync(`${TEMPLATE_DIR}/template.tsx`, 'utf8');
      // 替换占位符
      const resplaceData = data.replace(/\$APP_NAME/ig, name);
      // 写入文件
      fs.writeFileSync(`${CMD_PATH}/${name}/index.tsx`, resplaceData, 'utf8');
      // 复制less文件
      fs.copyFileSync(`${TEMPLATE_DIR}/index.less`, `${CMD_PATH}/${name}/index.less`)
    } else {
      const data = fs.readFileSync(`${TEMPLATE_DIR}/notDirTemplate.tsx`, 'utf8');
      const resplaceData = data.replace(/\$APP_NAME/ig, name);
      fs.writeFileSync(`${CMD_PATH}/${name}.tsx`, resplaceData, 'utf8');
    }
  });
};

module.exports = create;
