// ===== 常量 =====
const TILE = 24;
const COLS = 26;
const ROWS = 26;
const CANVAS_SIZE = COLS * TILE;

const DIR = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3 };
const DIR_VEC = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
];

const TILE_EMPTY = 0;
const TILE_BRICK = 1;
const TILE_STEEL = 2;
const TILE_WATER = 3;
const TILE_GRASS = 4;
const TILE_BASE = 5;

const STATE = { MENU: 0, SELECT_ULTIMATE: 1, PLAYING: 2, LEVEL_CLEAR: 3, GAME_OVER: 4 };
const ULTIMATE = { LASER: 'laser', EXPLOSION: 'explosion', SPRAY: 'spray' };
const SPRAY_DIRS = [
  { dx: 0, dy: -1 }, { dx: 1, dy: 0 }, { dx: 0, dy: 1 }, { dx: -1, dy: 0 },
  { dx: 0.707, dy: -0.707 }, { dx: 0.707, dy: 0.707 }, { dx: -0.707, dy: 0.707 }, { dx: -0.707, dy: -0.707 },
];
const MAX_LIVES = 20;
const ULTIMATE_COOLDOWN_MS = 10000;

// ===== 关卡地图 =====
// 0=空 1=砖墙 2=钢墙 3=水 4=草 5=基地
const LEVELS = [
  // 关卡 1
  [
    "00000000000000000000000000",
    "00000000000000000000000000",
    "00220022002200220022002200",
    "00110011001100110011001100",
    "00110011001100110011001100",
    "00110011001100110011001100",
    "00000000000000000000000000",
    "00110011000000000011001100",
    "00110011000000000011001100",
    "00000000000000000000000000",
    "00000011001100110011000000",
    "00000011001100110011000000",
    "00000000000000000000000000",
    "00110011000000000011001100",
    "00110011000000000011001100",
    "00000000000000000000000000",
    "00110011001100110011001100",
    "00110011001100110011001100",
    "00110011001100110011001100",
    "00220022002200220022002200",
    "00000000000000000000000000",
    "00000000000000000000000000",
    "00000000000000000000000000",
    "00000000000000000000000000",
    "00000000000000000000000000",
    "00000000000005050000000000",
  ],
  // 关卡 2
  [
    "00000000000000000000000000",
    "00220022002200220022002200",
    "00110011001100110011001100",
    "00000000000000000000000000",
    "00110011001100110011001100",
    "00110011001100110011001100",
    "00000000000000000000000000",
    "00000011001100110011000000",
    "00000011001100110011000000",
    "00000000000000000000000000",
    "00110000000000000000001100",
    "00110000003333000000001100",
    "00110000003333000000001100",
    "00000000000000000000000000",
    "00110011001100110011001100",
    "00110011001100110011001100",
    "00000000000000000000000000",
    "00220022002200220022002200",
    "00110011001100110011001100",
    "00110011001100110011001100",
    "00000000000000000000000000",
    "00110011000000000011001100",
    "00110011000000000011001100",
    "00000000000000000000000000",
    "00000000000000000000000000",
    "00000000000005050000000000",
  ],
  // 关卡 3
  [
    "00000000000000000000000000",
    "00220022002200220022002200",
    "00000000000000000000000000",
    "00110011001100110011001100",
    "00110011001100110011001100",
    "00000000000000000000000000",
    "00110000001100110000001100",
    "00110000001100110000001100",
    "00000000000000000000000000",
    "00000011001100110011000000",
    "00000011001100110011000000",
    "00000000000000000000000000",
    "00330033003300330033003300",
    "00330033003300330033003300",
    "00000000000000000000000000",
    "00110011001100110011001100",
    "00110011001100110011001100",
    "00000000000000000000000000",
    "00110011000000000011001100",
    "00110011000000000011001100",
    "00000000000000000000000000",
    "00220022002200220022002200",
    "00110011001100110011001100",
    "00110011001100110011001100",
    "00000000000000000000000000",
    "00000000000005050000000000",
  ],
  // 关卡 4
  [
    "00000000000000000000000000",
    "00220022002200220022002200",
    "00110011001100110011001100",
    "00000000000000000000000000",
    "00110000003333000000001100",
    "00110000003333000000001100",
    "00000011001100110011000000",
    "00110011001100110011001100",
    "00000000000000000000000000",
    "00220000001100110000002200",
    "00110000001100110000001100",
    "00000000000000000000000000",
    "00330033003300330033003300",
    "00000000000000000000000000",
    "00110011001100110011001100",
    "00110011001100110011001100",
    "00000000000000000000000000",
    "00220022002200220022002200",
    "00110011000000000011001100",
    "00110011000000000011001100",
    "00000000000000000000000000",
    "00000011001100110011000000",
    "00000011001100110011000000",
    "00000000000000000000000000",
    "00000000000000000000000000",
    "00000000000005050000000000",
  ],
  // 关卡 5
  [
    "00000000000000000000000000",
    "00220022002200220022002200",
    "00220022002200220022002200",
    "00110011001100110011001100",
    "00000000000000000000000000",
    "00330033003300330033003300",
    "00330033003300330033003300",
    "00000000000000000000000000",
    "00110011001100110011001100",
    "00110000004400000044001100",
    "00110000004400000044001100",
    "00000000000000000000000000",
    "00220000001100110000002200",
    "00220000001100110000002200",
    "00000000000000000000000000",
    "00110011001100110011001100",
    "00110011001100110011001100",
    "00000000000000000000000000",
    "00220022002200220022002200",
    "00110011001100110011001100",
    "00110011000000000011001100",
    "00000000000000000000000000",
    "00000011001100110011000000",
    "00000000000000000000000000",
    "00000000000000000000000000",
    "00000000000005050000000000",
  ],
  // 关卡 6
  [
    "00000000000000000000000000",
    "00220022002200220022002200",
    "00110011001100110011001100",
    "00110011001100110011001100",
    "00000000000000000000000000",
    "00330033003300330033003300",
    "00000000000000000000000000",
    "00110000001100110000001100",
    "00110000001100110000001100",
    "00000000000000000000000000",
    "00220000001100110000002200",
    "00220000001100110000002200",
    "00000000000000000000000000",
    "00110011001100110011001100",
    "00110011001100110011001100",
    "00000000000000000000000000",
    "00330033003300330033003300",
    "00000000000000000000000000",
    "00220022002200220022002200",
    "00110011001100110011001100",
    "00110011000000000011001100",
    "00000000000000000000000000",
    "00000011001100110011000000",
    "00000000000000000000000000",
    "00000000000000000000000000",
    "00000000000005050000000000",
  ],
  // 关卡 7
  [
    "00000000000000000000000000",
    "00220022002200220022002200",
    "00000000000000000000000000",
    "00110011001100110011001100",
    "00110011001100110011001100",
    "00110011001100110011001100",
    "00000000000000000000000000",
    "00000011001100110011000000",
    "00000011001100110011000000",
    "00000000000000000000000000",
    "00110000004400000044001100",
    "00110000004400000044001100",
    "00000000000000000000000000",
    "00330033003300330033003300",
    "00330033003300330033003300",
    "00000000000000000000000000",
    "00220000001100110000002200",
    "00110000001100110000001100",
    "00000000000000000000000000",
    "00110011001100110011001100",
    "00110011001100110011001100",
    "00000000000000000000000000",
    "00220022002200220022002200",
    "00000000000000000000000000",
    "00000000000000000000000000",
    "00000000000005050000000000",
  ],
  // 关卡 8
  [
    "00000000000000000000000000",
    "00000000000000000000000000",
    "00220022002200220022002200",
    "00000000000000000000000000",
    "00110011001100110011001100",
    "00110011001100110011001100",
    "00000000000000000000000000",
    "00330033003300330033003300",
    "00330033003300330033003300",
    "00000000000000000000000000",
    "00110000001100110000001100",
    "00110000001100110000001100",
    "00000000000000000000000000",
    "00000011001100110011000000",
    "00000011001100110011000000",
    "00000000000000000000000000",
    "00110011001100110011001100",
    "00110011001100110011001100",
    "00000000000000000000000000",
    "00220022002200220022002200",
    "00110011000000000011001100",
    "00110011000000000011001100",
    "00000000000000000000000000",
    "00000011001100110011000000",
    "00000000000000000000000000",
    "00000000000005050000000000",
  ],
  // 关卡 9
  [
    "00000000000000000000000000",
    "00220022002200220022002200",
    "00220022002200220022002200",
    "00110011001100110011001100",
    "00000000000000000000000000",
    "00110000003333000000001100",
    "00110000003333000000001100",
    "00000000000000000000000000",
    "00220000001100110000002200",
    "00220000001100110000002200",
    "00000000000000000000000000",
    "00330033003300330033003300",
    "00000000000000000000000000",
    "00110011001100110011001100",
    "00110011001100110011001100",
    "00000000000000000000000000",
    "00110000004400000044001100",
    "00110000004400000044001100",
    "00000000000000000000000000",
    "00220022002200220022002200",
    "00110011001100110011001100",
    "00110011000000000011001100",
    "00000000000000000000000000",
    "00000011001100110011000000",
    "00000000000000000000000000",
    "00000000000005050000000000",
  ],
  // 关卡 10
  [
    "00000000000000000000000000",
    "00220022002200220022002200",
    "00220022002200220022002200",
    "00220022002200220022002200",
    "00110011001100110011001100",
    "00110011001100110011001100",
    "00000000000000000000000000",
    "00330033003300330033003300",
    "00330033003300330033003300",
    "00000000000000000000000000",
    "00220000001100110000002200",
    "00220000001100110000002200",
    "00000000000000000000000000",
    "00110011001100110011001100",
    "00110011001100110011001100",
    "00000000000000000000000000",
    "00330033003300330033003300",
    "00330033003300330033003300",
    "00000000000000000000000000",
    "00220022002200220022002200",
    "00110011001100110011001100",
    "00110011000000000011001100",
    "00000000000000000000000000",
    "00000011001100110011000000",
    "00000000000000000000000000",
    "00000000000005050000000000",
  ],
];

// 每关敌人数量与生成位置（第1关4人，每关+1）
const ENEMY_SPAWNS = [
  { x: 0, y: 0 }, { x: 2, y: 0 }, { x: 4, y: 0 }, { x: 6, y: 0 }, { x: 8, y: 0 },
  { x: 10, y: 0 }, { x: 12, y: 0 }, { x: 14, y: 0 }, { x: 16, y: 0 }, { x: 18, y: 0 },
  { x: 20, y: 0 }, { x: 22, y: 0 }, { x: 24, y: 0 }, { x: 1, y: 0 }, { x: 23, y: 0 },
];
const LEVEL_ENEMIES = Array.from({ length: 10 }, (_, i) => ({
  count: 4 + i,
  spawns: ENEMY_SPAWNS,
}));

// ===== Canvas 初始化 =====
let canvas;
let ctx;
let overlay;
let overlayTitle;
let overlayMessage;
let overlayHint;
let errorBox;
let ultimateSelect;
let pickLaserBtn;
let pickExplosionBtn;
let pickSprayBtn;

// ===== 游戏状态 =====
let state = STATE.MENU;
let currentLevel = 0;
let score = 0;
let lives = MAX_LIVES;
let dodgeCount = 0;
let map = [];
let grassTiles = [];
let player = null;
let enemies = [];
let bullets = [];
let lasers = [];
let explosions = [];
let particles = [];
let floatingTexts = [];
let keys = {};
let frameCount = 0;
let enemySpawnQueue = [];
let spawnTimer = 0;
let screenShake = 0;
let ultimateAvailableAt = 0;
let selectedUltimate = ULTIMATE.LASER;

// ===== 输入 =====
document.addEventListener('keydown', (e) => {
  keys[e.code] = true;
  if (e.code === 'Space') {
    e.preventDefault();
    handleSpace();
  } else if (state === STATE.SELECT_ULTIMATE) {
    if (e.code === 'Digit1' || e.code === 'Numpad1') beginLevelWithUltimate(ULTIMATE.LASER);
    if (e.code === 'Digit2' || e.code === 'Numpad2') beginLevelWithUltimate(ULTIMATE.EXPLOSION);
    if (e.code === 'Digit3' || e.code === 'Numpad3') beginLevelWithUltimate(ULTIMATE.SPRAY);
  }
});
document.addEventListener('keyup', (e) => {
  keys[e.code] = false;
});

function handleSpace() {
  if (state === STATE.MENU) {
    startGame();
  } else if (state === STATE.LEVEL_CLEAR) {
    nextLevel();
  } else if (state === STATE.GAME_OVER) {
    restartGame();
  }
}

function setupMouseInput() {
  canvas.addEventListener('mousedown', (e) => {
    if (state !== STATE.PLAYING || !player || !player.alive) return;
    if (e.button === 0) {
      e.preventDefault();
      playerShoot(player);
    } else if (e.button === 2) {
      e.preventDefault();
      fireUltimate();
    }
  });
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
}

// ===== 地图 =====
function loadLevel(levelIndex) {
  const levelData = LEVELS[levelIndex % LEVELS.length];
  map = [];
  grassTiles = [];
  for (let y = 0; y < ROWS; y++) {
    map[y] = [];
    for (let x = 0; x < COLS; x++) {
      const ch = levelData[y] ? parseInt(levelData[y][x]) : 0;
      if (ch === TILE_GRASS) {
        map[y][x] = TILE_EMPTY;
        grassTiles.push({ x, y });
      } else {
        map[y][x] = ch;
      }
    }
  }
  fortifyBase();
}

function fortifyBase() {
  const bases = [];
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (map[y][x] === TILE_BASE) bases.push({ x, y });
    }
  }
  if (!bases.length) return;

  const minX = Math.min(...bases.map(p => p.x));
  const maxX = Math.max(...bases.map(p => p.x));
  const minY = Math.min(...bases.map(p => p.y));
  const maxY = Math.max(...bases.map(p => p.y));

  for (let ring = 1; ring <= 2; ring++) {
    const left = minX - ring;
    const right = maxX + ring;
    const top = minY - ring;
    const bottom = maxY + ring;
    const clampBottom = Math.min(ROWS - 1, bottom);

    for (let y = Math.max(0, top); y <= clampBottom; y++) {
      for (let x = Math.max(0, left); x <= Math.min(COLS - 1, right); x++) {
        if (map[y][x] === TILE_BASE) continue;
        const onBorder = x === left || x === right || y === top || y === bottom;
        const onBottomEdge = y === clampBottom && x > left && x < right;
        if ((onBorder || onBottomEdge) && map[y][x] === TILE_EMPTY) {
          map[y][x] = TILE_BRICK;
        }
      }
    }
  }
}

function isBlockingTile(tile) {
  return tile === TILE_BRICK || tile === TILE_STEEL || tile === TILE_WATER || tile === TILE_BASE;
}

function getTileAt(px, py) {
  const tx = Math.floor(px / TILE);
  const ty = Math.floor(py / TILE);
  if (tx < 0 || tx >= COLS || ty < 0 || ty >= ROWS) return TILE_STEEL;
  return map[ty][tx];
}

function setTileAt(px, py, value) {
  const tx = Math.floor(px / TILE);
  const ty = Math.floor(py / TILE);
  if (tx >= 0 && tx < COLS && ty >= 0 && ty < ROWS) {
    map[ty][tx] = value;
  }
}

// ===== 坦克 =====
function createTank(x, y, dir, isPlayer) {
  return {
    x, y, dir,
    speed: isPlayer ? 2 : 1.2,
    width: TILE - 4,
    height: TILE - 4,
    alive: true,
    isPlayer,
    shootCooldown: 0,
    moveTimer: 0,
    moveDir: dir,
    color: isPlayer ? '#4ecdc4' : '#e94560',
    flashTimer: 0,
    invincible: isPlayer ? 120 : 0,
  };
}

function tankRect(tank) {
  return {
    x: tank.x - tank.width / 2,
    y: tank.y - tank.height / 2,
    w: tank.width,
    h: tank.height,
  };
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function canTankMoveTo(tank, nx, ny, ignoreTank) {
  const half = tank.width / 2 - 1;
  const corners = [
    { x: nx - half, y: ny - half },
    { x: nx + half, y: ny - half },
    { x: nx - half, y: ny + half },
    { x: nx + half, y: ny + half },
  ];
  for (const c of corners) {
    if (isBlockingTile(getTileAt(c.x, c.y))) return false;
  }
  const rect = { x: nx - half, y: ny - half, w: tank.width, h: tank.height };
  const allTanks = [player, ...enemies].filter(t => t && t.alive && t !== ignoreTank);
  for (const other of allTanks) {
    if (rectsOverlap(rect, tankRect(other))) return false;
  }
  return true;
}

function moveTank(tank, dir) {
  if (!tank.alive) return;
  tank.dir = dir;
  const vec = DIR_VEC[dir];
  const nx = tank.x + vec.x * tank.speed;
  const ny = tank.y + vec.y * tank.speed;
  const half = tank.width / 2;
  if (nx - half < 0 || nx + half > CANVAS_SIZE || ny - half < 0 || ny + half > CANVAS_SIZE) return;

  if (canTankMoveTo(tank, nx, ny, tank)) {
    tank.x = nx;
    tank.y = ny;
  } else {
    // 贴墙滑动：尝试单轴移动
    if (canTankMoveTo(tank, nx, tank.y, tank)) tank.x = nx;
    else if (canTankMoveTo(tank, tank.x, ny, tank)) tank.y = ny;
  }
}

function playerShoot(tank) {
  if (!tank.alive || tank.shootCooldown > 0) return;
  const vec = DIR_VEC[tank.dir];
  const offset = TILE / 2;
  bullets.push({
    x: tank.x + vec.x * offset,
    y: tank.y + vec.y * offset,
    dir: tank.dir,
    speed: 5,
    owner: tank,
    alive: true,
  });
  tank.shootCooldown = 20;
}

function enemyShoot(tank) {
  if (!tank.alive || tank.shootCooldown > 0) return;
  const vec = DIR_VEC[tank.dir];
  const offset = TILE / 2;
  bullets.push({
    x: tank.x + vec.x * offset,
    y: tank.y + vec.y * offset,
    dir: tank.dir,
    speed: 4,
    owner: tank,
    alive: true,
  });
  tank.shootCooldown = 40 + Math.random() * 40;
}

function onBulletDestroyed(b) {
  if (b.nearPlayer && player && player.alive && b.owner && !b.owner.isPlayer) {
    dodgeCount++;
    floatingTexts.push({ x: player.x, y: player.y - 20, text: '躲避!', color: '#4ecdc4', life: 40 });
    updateHUD();
  }
}

function addFloatingText(x, y, text, color) {
  floatingTexts.push({ x, y, text, color, life: 45 });
}

function killEnemy(enemy) {
  if (!enemy.alive) return;
  enemy.alive = false;
  enemy.flashTimer = 10;
  spawnParticles(enemy.x, enemy.y, enemy.color, 12);
  spawnParticles(enemy.x, enemy.y, '#ff0', 6);
  score += 100;
  addFloatingText(enemy.x, enemy.y - 10, '+100', '#ffd700');
  shakeScreen(6);
  updateHUD();
  checkLevelClear();
}

function onPlayerHit() {
  if (!player || !player.alive || player.invincible > 0) return;
  lives--;
  spawnParticles(player.x, player.y, player.color, 12);
  shakeScreen(10);
  if (lives <= 0) {
    player.alive = false;
    gameOver('你被击中了！');
    return;
  }
  player.invincible = 120;
  player.x = 8 * TILE + TILE / 2;
  player.y = 24 * TILE + TILE / 2;
  player.dir = DIR.UP;
  addFloatingText(player.x, player.y - 20, `剩余 ${lives} 条命`, '#ff6b81');
  updateHUD();
}

function canUseUltimate() {
  if (!player || !player.alive) return false;
  const now = Date.now();
  if (now < ultimateAvailableAt) {
    const sec = Math.ceil((ultimateAvailableAt - now) / 1000);
    addFloatingText(player.x, player.y - 30, `冷却 ${sec}s`, '#8899aa');
    return false;
  }
  ultimateAvailableAt = now + ULTIMATE_COOLDOWN_MS;
  return true;
}

function getUltimateLabel() {
  if (selectedUltimate === ULTIMATE.EXPLOSION) return '爆炸';
  if (selectedUltimate === ULTIMATE.SPRAY) return '乱喷';
  return '激光';
}

function getUltimateColor() {
  if (selectedUltimate === ULTIMATE.EXPLOSION) return '#ff6600';
  if (selectedUltimate === ULTIMATE.SPRAY) return '#ffd700';
  return '#00ffff';
}

function fireUltimate() {
  if (selectedUltimate === ULTIMATE.EXPLOSION) fireExplosion();
  else if (selectedUltimate === ULTIMATE.SPRAY) fireSpray();
  else fireLaser();
}

function fireLaser() {
  if (!canUseUltimate()) return;
  const vec = DIR_VEC[player.dir];
  let tx = Math.floor(player.x / TILE) + vec.x;
  let ty = Math.floor(player.y / TILE) + vec.y;
  let endX = player.x + vec.x * TILE / 2;
  let endY = player.y + vec.y * TILE / 2;

  while (tx >= 0 && tx < COLS && ty >= 0 && ty < ROWS) {
    endX = tx * TILE + TILE / 2;
    endY = ty * TILE + TILE / 2;
    const tile = map[ty][tx];

    if (tile === TILE_BRICK) {
      map[ty][tx] = TILE_EMPTY;
      spawnParticles(endX, endY, '#c87941', 6);
    } else if (tile === TILE_STEEL) {
      map[ty][tx] = TILE_EMPTY;
      spawnParticles(endX, endY, '#aaa', 6);
    } else if (tile === TILE_WATER) {
      map[ty][tx] = TILE_EMPTY;
      spawnParticles(endX, endY, '#1e90ff', 4);
    } else if (tile === TILE_BASE) {
      map[ty][tx] = TILE_EMPTY;
      spawnParticles(endX, endY, '#ffd700', 10);
      gameOver('基地被摧毁了！');
    }

    for (const enemy of enemies) {
      if (!enemy.alive) continue;
      const etx = Math.floor(enemy.x / TILE);
      const ety = Math.floor(enemy.y / TILE);
      if (etx === tx && ety === ty) {
        killEnemy(enemy);
      }
    }

    tx += vec.x;
    ty += vec.y;
  }

  if (tx < 0 || tx >= COLS || ty < 0 || ty >= ROWS) {
    endX = Math.max(0, Math.min(CANVAS_SIZE, endX + vec.x * TILE / 2));
    endY = Math.max(0, Math.min(CANVAS_SIZE, endY + vec.y * TILE / 2));
  }

  lasers.push({ x1: player.x, y1: player.y, x2: endX, y2: endY, life: 25 });
  shakeScreen(12);
  addFloatingText(player.x, player.y - 35, '激光!', '#00ffff');
  updateHUD();
}

function fireExplosion() {
  if (!canUseUltimate()) return;

  const radius = TILE * 3.5;
  const px = player.x;
  const py = player.y;

  explosions.push({ x: px, y: py, maxRadius: radius, life: 30 });

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const cx = x * TILE + TILE / 2;
      const cy = y * TILE + TILE / 2;
      if (Math.hypot(cx - px, cy - py) > radius) continue;
      const tile = map[y][x];
      if (tile === TILE_BRICK || tile === TILE_STEEL) {
        map[y][x] = TILE_EMPTY;
        spawnParticles(cx, cy, tile === TILE_BRICK ? '#c87941' : '#aaa', 5);
      } else if (tile === TILE_WATER) {
        map[y][x] = TILE_EMPTY;
        spawnParticles(cx, cy, '#1e90ff', 4);
      }
    }
  }

  for (const enemy of enemies) {
    if (!enemy.alive) continue;
    if (Math.hypot(enemy.x - px, enemy.y - py) <= radius) {
      killEnemy(enemy);
    }
  }

  shakeScreen(15);
  spawnParticles(px, py, '#ff6600', 24);
  spawnParticles(px, py, '#ff0', 12);
  addFloatingText(px, py - 35, '爆炸!', '#ff6600');
  updateHUD();
}

function fireSpray() {
  if (!canUseUltimate()) return;

  const offset = TILE / 2;
  for (const d of SPRAY_DIRS) {
    bullets.push({
      x: player.x + d.dx * offset,
      y: player.y + d.dy * offset,
      dx: d.dx,
      dy: d.dy,
      dir: DIR.UP,
      speed: 6,
      owner: player,
      alive: true,
    });
  }

  shakeScreen(8);
  spawnParticles(player.x, player.y, '#ffd700', 16);
  addFloatingText(player.x, player.y - 35, '乱喷!', '#ffd700');
  updateHUD();
}

function shakeScreen(frames) {
  screenShake = Math.max(screenShake, frames);
}

// ===== 子弹 =====
function updateBullets() {
  for (const b of bullets) {
    if (!b.alive) continue;
    if (b.dx !== undefined) {
      b.x += b.dx * b.speed;
      b.y += b.dy * b.speed;
    } else {
      const vec = DIR_VEC[b.dir];
      b.x += vec.x * b.speed;
      b.y += vec.y * b.speed;
    }

    if (b.x < 0 || b.x > CANVAS_SIZE || b.y < 0 || b.y > CANVAS_SIZE) {
      b.alive = false;
      onBulletDestroyed(b);
      continue;
    }

    const tile = getTileAt(b.x, b.y);
    if (tile === TILE_BRICK) {
      setTileAt(b.x, b.y, TILE_EMPTY);
      b.alive = false;
      onBulletDestroyed(b);
      spawnParticles(b.x, b.y, '#c87941', 6);
      continue;
    }
    if (tile === TILE_STEEL || tile === TILE_WATER) {
      b.alive = false;
      onBulletDestroyed(b);
      spawnParticles(b.x, b.y, '#aaa', 3);
      continue;
    }
    if (tile === TILE_BASE) {
      setTileAt(b.x, b.y, TILE_EMPTY);
      b.alive = false;
      spawnParticles(b.x, b.y, '#ffd700', 10);
      gameOver('基地被摧毁了！');
      return;
    }

    // 玩家躲避检测：敌方子弹靠近玩家
    if (player && player.alive && b.owner && !b.owner.isPlayer) {
      const dist = Math.hypot(b.x - player.x, b.y - player.y);
      if (dist < TILE * 1.5) {
        b.nearPlayer = true;
      }
    }

    // 击中坦克
    const targets = [];
    if (player && player.alive && b.owner !== player) targets.push(player);
    for (const e of enemies) {
      if (e.alive && b.owner !== e) targets.push(e);
    }

    for (const target of targets) {
      const rect = tankRect(target);
      const bulletRect = { x: b.x - 3, y: b.y - 3, w: 6, h: 6 };
      if (rectsOverlap(bulletRect, rect)) {
        b.alive = false;
        if (target.invincible > 0) {
          spawnParticles(b.x, b.y, '#fff', 4);
          break;
        }

        if (target.isPlayer) {
          onPlayerHit();
          return;
        }
        killEnemy(target);
        break;
      }
    }
  }
  bullets = bullets.filter(b => b.alive);
}

// ===== 粒子效果 =====
function spawnParticles(x, y, color, count) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 3;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 20 + Math.random() * 15,
      color,
      size: 2 + Math.random() * 3,
    });
  }
}

function updateParticles() {
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    p.vx *= 0.95;
    p.vy *= 0.95;
  }
  particles = particles.filter(p => p.life > 0);
}

function updateFloatingTexts() {
  for (const t of floatingTexts) {
    t.y -= 0.6;
    t.life--;
  }
  floatingTexts = floatingTexts.filter(t => t.life > 0);
}

// ===== 敌人 AI =====
function updateEnemyAI(enemy) {
  if (!enemy.alive) return;

  enemy.moveTimer--;
  if (enemy.moveTimer <= 0) {
    enemy.moveTimer = 30 + Math.random() * 60;
    // 30% 概率朝向玩家
    if (player && player.alive && Math.random() < 0.3) {
      const dx = player.x - enemy.x;
      const dy = player.y - enemy.y;
      if (Math.abs(dx) > Math.abs(dy)) {
        enemy.moveDir = dx > 0 ? DIR.RIGHT : DIR.LEFT;
      } else {
        enemy.moveDir = dy > 0 ? DIR.DOWN : DIR.UP;
      }
    } else {
      enemy.moveDir = Math.floor(Math.random() * 4);
    }
  }

  moveTank(enemy, enemy.moveDir);

  // 射击：面向玩家时更可能开火
  if (player && player.alive) {
    const aligned =
      (enemy.dir === DIR.UP || enemy.dir === DIR.DOWN) && Math.abs(enemy.x - player.x) < TILE ||
      (enemy.dir === DIR.LEFT || enemy.dir === DIR.RIGHT) && Math.abs(enemy.y - player.y) < TILE;
    if (aligned && Math.random() < 0.03) {
      enemyShoot(enemy);
    }
  }
  if (Math.random() < 0.008) {
    enemyShoot(enemy);
  }
}

// ===== 游戏流程 =====
function startGame() {
  currentLevel = 0;
  score = 0;
  lives = MAX_LIVES;
  dodgeCount = 0;
  loadLevel(currentLevel);
  initLevel();
  showUltimateSelect();
}

function showUltimateSelect() {
  state = STATE.SELECT_ULTIMATE;
  overlayTitle.textContent = `第 ${currentLevel + 1} 关`;
  overlayMessage.textContent = '选择本关大招';
  overlayHint.textContent = '点击按钮或按 1 / 2 / 3 选择';
  document.getElementById('controls-info').classList.add('hidden');
  if (ultimateSelect) ultimateSelect.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function beginLevelWithUltimate(ultimate) {
  selectedUltimate = ultimate;
  ultimateAvailableAt = 0;
  state = STATE.PLAYING;
  overlay.classList.add('hidden');
  document.getElementById('controls-info').classList.remove('hidden');
  if (ultimateSelect) ultimateSelect.classList.add('hidden');
  updateHUD();
}

function initLevel() {
  bullets = [];
  lasers = [];
  explosions = [];
  particles = [];
  floatingTexts = [];
  enemies = [];
  player = createTank(8 * TILE + TILE / 2, 24 * TILE + TILE / 2, DIR.UP, true);

  const levelInfo = LEVEL_ENEMIES[currentLevel % LEVEL_ENEMIES.length];
  enemySpawnQueue = [];
  for (let i = 0; i < levelInfo.count; i++) {
    const spawn = levelInfo.spawns[i % levelInfo.spawns.length];
    enemySpawnQueue.push({ x: spawn.x * TILE + TILE / 2, y: spawn.y * TILE + TILE / 2 });
  }
  spawnTimer = 0;
  spawnNextEnemy();
}

function spawnNextEnemy() {
  if (enemySpawnQueue.length === 0) return;
  const spawn = enemySpawnQueue.shift();
  const dirs = [DIR.DOWN, DIR.RIGHT, DIR.LEFT];
  const enemy = createTank(spawn.x, spawn.y, dirs[Math.floor(Math.random() * dirs.length)], false);
  if (canTankMoveTo(enemy, enemy.x, enemy.y, enemy)) {
    enemies.push(enemy);
  } else {
    enemySpawnQueue.unshift(spawn);
  }
}

function checkLevelClear() {
  const aliveEnemies = enemies.filter(e => e.alive).length;
  if (aliveEnemies === 0 && enemySpawnQueue.length === 0) {
    state = STATE.LEVEL_CLEAR;
    score += 500;
    updateHUD();
    overlayTitle.textContent = '关卡通过！';
    overlayMessage.textContent = `得分: ${score}  躲避炮弹: ${dodgeCount} 次`;
    overlayHint.textContent = '按 空格键 进入下一关';
    document.getElementById('controls-info').classList.remove('hidden');
    if (ultimateSelect) ultimateSelect.classList.add('hidden');
    overlay.classList.remove('hidden');
  }
}

function nextLevel() {
  currentLevel++;
  if (currentLevel >= LEVELS.length) {
    overlayTitle.textContent = '恭喜通关！';
    overlayMessage.textContent = `最终得分: ${score}  总躲避: ${dodgeCount} 次`;
    overlayHint.textContent = '按 空格键 重新开始';
    state = STATE.GAME_OVER;
    document.getElementById('controls-info').classList.remove('hidden');
    if (ultimateSelect) ultimateSelect.classList.add('hidden');
    overlay.classList.remove('hidden');
    return;
  }
  loadLevel(currentLevel);
  initLevel();
  showUltimateSelect();
}

function gameOver(reason) {
  state = STATE.GAME_OVER;
  shakeScreen(12);
  overlayTitle.textContent = '游戏结束';
  overlayMessage.textContent = `${reason}  得分: ${score}  躲避: ${dodgeCount} 次`;
  overlayHint.textContent = '按 空格键 重新开始';
  document.getElementById('controls-info').classList.remove('hidden');
  if (ultimateSelect) ultimateSelect.classList.add('hidden');
  overlay.classList.remove('hidden');
}

function restartGame() {
  startGame();
}

// ===== HUD =====
function updateHUD() {
  document.getElementById('level-display').textContent = currentLevel + 1;
  document.getElementById('score-display').textContent = score;
  document.getElementById('lives-display').textContent = lives > 0 ? `❤️ ${lives}` : '💔';
  const aliveCount = enemies.filter(e => e.alive).length + enemySpawnQueue.length;
  document.getElementById('enemies-display').textContent = aliveCount;
  document.getElementById('dodge-display').textContent = dodgeCount;

  const ultimateEl = document.getElementById('ultimate-display');
  if (ultimateEl) {
    const ultimateName = getUltimateLabel();
    const cdLeft = Math.max(0, ultimateAvailableAt - Date.now());
    ultimateEl.textContent = cdLeft <= 0 ? `${ultimateName} 就绪` : `${ultimateName} ${Math.ceil(cdLeft / 1000)}s`;
    ultimateEl.style.color = cdLeft <= 0 ? getUltimateColor() : '#8899aa';
  }
}

function showError(message) {
  if (!errorBox) {
    alert(message);
    return;
  }
  errorBox.textContent = message;
  errorBox.classList.remove('hidden');
}

function drawFieldBackground() {
  ctx.fillStyle = '#1b2a1b';
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= COLS; x++) {
    ctx.beginPath();
    ctx.moveTo(x * TILE, 0);
    ctx.lineTo(x * TILE, CANVAS_SIZE);
    ctx.stroke();
  }
  for (let y = 0; y <= ROWS; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y * TILE);
    ctx.lineTo(CANVAS_SIZE, y * TILE);
    ctx.stroke();
  }
}

function drawTile(x, y, type) {
  const px = x * TILE;
  const py = y * TILE;

  switch (type) {
    case TILE_BRICK:
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(px, py, TILE, TILE);
      ctx.fillStyle = '#A0522D';
      ctx.fillRect(px + 2, py + 2, TILE / 2 - 2, TILE / 2 - 2);
      ctx.fillRect(px + TILE / 2, py + TILE / 2, TILE / 2 - 2, TILE / 2 - 2);
      break;
    case TILE_STEEL:
      ctx.fillStyle = '#708090';
      ctx.fillRect(px, py, TILE, TILE);
      ctx.fillStyle = '#B0C4DE';
      ctx.fillRect(px + 3, py + 3, TILE - 6, TILE - 6);
      ctx.strokeStyle = '#4a5568';
      ctx.lineWidth = 1;
      ctx.strokeRect(px + 3, py + 3, TILE - 6, TILE - 6);
      break;
    case TILE_WATER:
      ctx.fillStyle = '#1e90ff';
      ctx.fillRect(px, py, TILE, TILE);
      ctx.fillStyle = '#87ceeb';
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(px + 4 + i * 7, py + 6 + (i % 2) * 6, 5, 3);
      }
      break;
    case TILE_BASE:
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.moveTo(px + TILE / 2, py + 2);
      ctx.lineTo(px + TILE - 2, py + TILE - 2);
      ctx.lineTo(px + 2, py + TILE - 2);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#e94560';
      ctx.fillRect(px + TILE / 2 - 3, py + TILE / 2, 6, 8);
      break;
  }
}

function drawGrass(x, y) {
  const px = x * TILE;
  const py = y * TILE;
  ctx.fillStyle = 'rgba(34, 139, 34, 0.6)';
  ctx.fillRect(px, py, TILE, TILE);
  ctx.fillStyle = 'rgba(50, 205, 50, 0.4)';
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(px + 3 + i * 5, py + 4 + (i % 2) * 8, 3, 8);
  }
}

function drawTank(tank) {
  if (!tank.alive) {
    if (tank.flashTimer > 0) {
      ctx.globalAlpha = tank.flashTimer % 2 === 0 ? 1 : 0.3;
      tank.flashTimer--;
    } else {
      return;
    }
  }

  ctx.save();
  ctx.translate(tank.x, tank.y);
  ctx.rotate(tank.dir * Math.PI / 2);

  // 履带
  ctx.fillStyle = '#333';
  ctx.fillRect(-tank.width / 2, -tank.height / 2, 6, tank.height);
  ctx.fillRect(tank.width / 2 - 6, -tank.height / 2, 6, tank.height);

  // 车身
  ctx.fillStyle = tank.color;
  ctx.fillRect(-tank.width / 2 + 4, -tank.height / 2 + 2, tank.width - 8, tank.height - 4);

  // 炮塔
  ctx.fillStyle = tank.isPlayer ? '#3bb3aa' : '#c73650';
  ctx.fillRect(-6, -6, 12, 12);

  // 炮管
  ctx.fillStyle = '#ddd';
  ctx.fillRect(-2, -tank.height / 2 - 4, 4, 10);

  if (tank.invincible > 0 && tank.isPlayer) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, tank.width / 2 + 3, 0, Math.PI * 2);
    ctx.stroke();
    tank.invincible--;
  }

  ctx.restore();
  ctx.globalAlpha = 1;
}

function drawBullet(b) {
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(b.x, b.y, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ff0';
  ctx.beginPath();
  ctx.arc(b.x, b.y, 1.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawParticles() {
  for (const p of particles) {
    ctx.globalAlpha = p.life / 35;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
  }
  ctx.globalAlpha = 1;
}

function drawLasers() {
  for (const laser of lasers) {
    const alpha = laser.life / 25;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 8;
    ctx.shadowColor = '#00ffff';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.moveTo(laser.x1, laser.y1);
    ctx.lineTo(laser.x2, laser.y2);
    ctx.stroke();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 0;
    ctx.stroke();
    ctx.restore();
  }
}

function updateLasers() {
  for (const laser of lasers) laser.life--;
  lasers = lasers.filter(laser => laser.life > 0);
}

function drawExplosions() {
  for (const ex of explosions) {
    const progress = 1 - ex.life / 30;
    const radius = ex.maxRadius * progress;
    ctx.save();
    ctx.globalAlpha = ex.life / 30;
    ctx.fillStyle = 'rgba(255, 100, 0, 0.35)';
    ctx.strokeStyle = '#ff6600';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(ex.x, ex.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }
}

function updateExplosions() {
  for (const ex of explosions) ex.life--;
  explosions = explosions.filter(ex => ex.life > 0);
}

function drawFloatingTexts() {
  for (const t of floatingTexts) {
    ctx.globalAlpha = Math.min(1, t.life / 20);
    ctx.fillStyle = t.color;
    ctx.font = 'bold 14px "Segoe UI", "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(t.text, t.x, t.y);
  }
  ctx.globalAlpha = 1;
  ctx.textAlign = 'left';
}

function render() {
  ctx.save();
  if (screenShake > 0) {
    const intensity = screenShake * 0.4;
    ctx.translate(
      (Math.random() - 0.5) * intensity,
      (Math.random() - 0.5) * intensity
    );
    screenShake--;
  }

  drawFieldBackground();

  // 地图（不含草）
  if (map.length > 0) {
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (map[y][x] !== TILE_EMPTY) {
          drawTile(x, y, map[y][x]);
        }
      }
    }
  }

  // 坦克
  if (player) drawTank(player);
  for (const e of enemies) drawTank(e);

  // 子弹
  for (const b of bullets) drawBullet(b);

  // 激光
  drawLasers();

  // 爆炸
  drawExplosions();

  // 粒子
  drawParticles();

  // 草地（覆盖在坦克上方）
  for (const g of grassTiles) {
    drawGrass(g.x, g.y);
  }

  drawFloatingTexts();
  ctx.restore();
}

// ===== 主循环 =====
function getPlayerDirection() {
  if (keys['ArrowUp'] || keys['KeyW']) return DIR.UP;
  if (keys['ArrowDown'] || keys['KeyS']) return DIR.DOWN;
  if (keys['ArrowLeft'] || keys['KeyA']) return DIR.LEFT;
  if (keys['ArrowRight'] || keys['KeyD']) return DIR.RIGHT;
  return -1;
}

function update() {
  if (state !== STATE.PLAYING) return;

  frameCount++;

  // 玩家移动
  if (player && player.alive) {
    const dir = getPlayerDirection();
    if (dir >= 0) moveTank(player, dir);
    if (player.shootCooldown > 0) player.shootCooldown--;
  }

  // 敌人生成
  const aliveEnemies = enemies.filter(e => e.alive).length;
  if (enemySpawnQueue.length > 0 && aliveEnemies < 4) {
    spawnTimer++;
    if (spawnTimer >= 90) {
      spawnNextEnemy();
      spawnTimer = 0;
    }
  }

  // 敌人 AI
  for (const e of enemies) {
    if (e.shootCooldown > 0) e.shootCooldown--;
    updateEnemyAI(e);
  }

  updateBullets();
  updateLasers();
  updateExplosions();
  updateParticles();
  updateFloatingTexts();
  updateHUD();
}

function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

// ===== 启动 =====
function initGame() {
  try {
    canvas = document.getElementById('game-canvas');
    overlay = document.getElementById('overlay');
    overlayTitle = document.getElementById('overlay-title');
    overlayMessage = document.getElementById('overlay-message');
    overlayHint = document.getElementById('overlay-hint');
    errorBox = document.getElementById('error-box');
    ultimateSelect = document.getElementById('ultimate-select');
    pickLaserBtn = document.getElementById('pick-laser');
    pickExplosionBtn = document.getElementById('pick-explosion');
    pickSprayBtn = document.getElementById('pick-spray');

    if (!canvas) throw new Error('找不到游戏画布，请确认 index.html 完整。');
    ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('浏览器不支持 Canvas，请换 Chrome / Edge / Safari 打开。');

    setupMouseInput();
    pickLaserBtn.addEventListener('click', () => {
      if (state === STATE.SELECT_ULTIMATE) beginLevelWithUltimate(ULTIMATE.LASER);
    });
    pickExplosionBtn.addEventListener('click', () => {
      if (state === STATE.SELECT_ULTIMATE) beginLevelWithUltimate(ULTIMATE.EXPLOSION);
    });
    pickSprayBtn.addEventListener('click', () => {
      if (state === STATE.SELECT_ULTIMATE) beginLevelWithUltimate(ULTIMATE.SPRAY);
    });
    loadLevel(0);
    overlayTitle.textContent = '坦克大战';
    overlayMessage.textContent = '';
    overlayHint.textContent = '按 空格键 开始游戏';
    overlay.classList.remove('hidden');
    updateHUD();
    gameLoop();
  } catch (err) {
    showError('游戏启动失败：' + err.message);
    console.error(err);
  }
}

window.addEventListener('error', (event) => {
  showError('运行出错：' + (event.message || '未知错误'));
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}
