# logicsim（改造版）

> 原项目：https://gitlab.com/kuangdash/logicsim（2021） · 在线演示：https://kuangdash.gitlab.io/logicsim
> 本仓库为课程作业改造版：在原「逆波兰逻辑表达式 → 逻辑电路图」基础上，新增**量词算子**与**现代化 UI**。

## 改造内容

### 1. 功能：新增逻辑量词 ∀ / ∃
- 新增两个后缀一元算子：**∀**（全称量词，别名 `!`）与 **∃**（存在量词，别名 `?`）。
- 用法（逆波兰式）：`a ∀` 即对变量 a 施加全称量词，记作 ∀a；`a ∃` 记作 ∃a。
- 支持与原有五算子自由组合，例如 `a b . c ∀ =` 表示「(a 与 b) 等价于 ∀c」，可一键出图。
- 语法校验：量词作用于表达式时报 `quantifier must be applied to a variable`；
  变量重复量化时报 `variable already quantified`；孤立量词报 `arguments less than needed`。
- 视图区分：量词变量节点按类型着色——**∀ 紫色**、**∃ 橙色**，普通变量仍为红色，一眼可辨。

### 2. UI：现代化组件与暗色模式
- 前端样式由 w3.css 升级为 **Bootstrap 5**（本地化，无外部 CDN，可离线运行）。
- 新增 **暗色模式**：点击右上角「🌙 暗色模式」按钮切换，选择自动记忆（localStorage），
  亦可通过 URL 参数 `?dark=1` / `?dark=0` 强制指定。
- 布局响应式：窄屏自动压缩右侧检查面板与顶部小地图，移动端可用。
- 电路画布、连线、输入框颜色全部随主题联动切换。

## 使用说明

在「解析文本」上方的文本框输入逆波兰逻辑表达式：

| 算子 | 含义 | 示例 |
|------|------|------|
| `.` | 逻辑与 | `a b .` |
| `,` | 逻辑或 | `a b ,` |
| `<` | 逻辑非 | `a <` |
| `>` | 逻辑推出 | `a b >` |
| `=` | 逻辑等价/同或 | `a b =` |
| `∀`（或 `!`） | 全称量词 | `a ∀` → ∀a |
| `∃`（或 `?`） | 存在量词 | `a ∃` → ∃a |

点击「解析文本」将表达式转为 JSON，再点击「文本转图」生成电路图；反之可用「图转文本」回写表达式。

## 本地运行

```bash
# 方式一：直接双击 public/index.html 打开
# 方式二：起一个本地静态服务器
cd public
python -m http.server 8080
# 浏览器访问 http://localhost:8080
```

## 部署到静态托管

站点根目录为 `public/`（仓库根自带 `.gitlab-ci.yml`，GitLab Pages 可直接用）。

- **GitHub Pages**：新建仓库 → 上传全部文件 → Settings → Pages → Source 选 `main` 分支 + `/public` 目录 → 保存后访问 `https://<用户名>.github.io/<仓库名>/`。
- **GitLab Pages**：直接 `git push` 到新建 GitLab 仓库，自带 CI 自动部署。
- **Cloudflare Pages / Vercel**：导入仓库或直接拖拽上传 `public` 目录，构建命令留空、输出目录填 `public`。
- **Gitee Pages**：上传到 Gitee 仓库后在服务页开通（需实名认证）。

## 文件结构

```
├── public/                 # 站点根（部署目录）
│   ├── index.html          # 主页面（Bootstrap 5）
│   ├── style.css           # 亮/暗双主题 + 响应式
│   ├── darkmode.js         # 暗色模式切换
│   ├── LogicParser.js      # 解析器（新增 ∀/∃ 量词）
│   ├── ViewGen.js          # 视图生成（量词节点配色）
│   ├── lib/                # 本地化依赖（jQuery/JointJS/Bootstrap 5 等）
│   └── assets/             # 图标资源
└── .gitlab-ci.yml          # GitLab Pages CI 配置
```

## 测试

- 解析管线 Node 单元测试：原版 8 条表达式回归（输出逐字节一致）+ 量词功能/错误场景 10 条，共 **18/18 通过**。
- 无头浏览器功能测试：`a b .`、`a ∀`、`a ∃`、`a b . c ∀ =` 均正常出图，错误场景正确报错。
- 明/暗双主题渲染截图验证通过。
