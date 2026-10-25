# 随手清单：手机网页测试项目

使用 HTML、CSS 和原生 JavaScript，无需安装依赖。支持手机和电脑浏览器、添加任务、完成切换、按状态筛选、删除任务及清除已完成任务。数据通过 localStorage 保存在当前浏览器。

## 本地运行

在仓库根目录执行 `python3 -m http.server 8000`，浏览器打开 `http://localhost:8000`。手机与电脑在同一 Wi-Fi 下时，可通过 `http://电脑的局域网IP:8000` 访问，需要电脑防火墙允许该端口。

## 在线发布

`.github/workflows/pages.yml` 在推送 main 后发布 GitHub Pages，仅上传 index.html 和 app.js。预期地址为 https://basco123.github.io/ai-test01/ ，以 Actions 实际部署结果为准。

如果首次运行提示 Pages 未启用或权限不足：进入仓库 Settings → Pages → Source，选择 GitHub Actions，然后在 Actions 中重新运行 Publish mobile website。

## 检查

`node --check app.js` 检查 JavaScript 语法。手机验证：添加中文任务、完成并筛选、刷新确认保存、删除和清除已完成。输入 HTML 应作为普通文字显示。无痕模式或存储禁用时，页面会显示保存失败提示。

原有 Python 命令行示例保留，可继续运行 `python3 -m unittest discover -s tests -v`。
