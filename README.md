# 坦克大战

浏览器版坦克大战游戏，直接打开即可游玩。

## 在线游玩

部署 GitHub Pages 后，访问：

`https://<你的用户名>.github.io/tank-battle/`

## 本地运行

```bash
python3 -m http.server 8899
```

然后打开 http://localhost:8899

## 操作

- **移动**：↑↓←→ 或 WASD
- **射击**：鼠标左键
- **大招**：鼠标右键（每关开始可选激光 / 爆炸 / 乱喷）
- **开始/下一关**：空格键

## 文件说明

- `index.html` — 游戏页面
- `game.js` — 游戏逻辑
- `style.css` — 样式
