# 测试项目

一个使用 Python 标准库编写的命令行问候程序，用于验证代码提交和测试流程。

## 环境

Python 3.10 或更新版本，无需安装第三方依赖。

## 运行

在项目根目录运行：

```bash
python main.py
python main.py 小明
```

默认输出 `你好，世界！`；传入姓名后输出对应问候语。姓名首尾空白会被移除，空姓名会返回错误和非零退出码。

如果系统的 Python 命令为 `python3`，将以上命令中的 `python` 换成 `python3` 即可。

## 测试

在项目根目录运行：

```bash
python -m unittest discover -s tests -v
```

测试覆盖默认问候语、空白处理、无效输入和命令行入口，共 5 项。
