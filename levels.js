// levels.js — структура уровней для Chicken Mario

const levels = [
  // Уровень 1
  {
    platforms: [
      { x: 0, y: 0, width: 300 },
      { x: 400, y: 100, width: 200 },
    ],
    enemies: [
      { x: 150, y: 20 },
    ],
    eggs: [
      { x: 50, y: 20 },
      { x: 450, y: 120 },
    ]
  },

  // Уровень 2
  {
    platforms: [
      { x: 0, y: 0, width: 200 },
      { x: 250, y: 80, width: 150 },
      { x: 450, y: 160, width: 200 },
    ],
    enemies: [
      { x: 300, y: 100 },
      { x: 500, y: 180 },
    ],
    eggs: [
      { x: 100, y: 20 },
      { x: 480, y: 180 },
    ]
  },

  // Уровень 3
  {
    platforms: [
      { x: 0, y: 0, width: 150 },
      { x: 200, y: 60, width: 250 },
      { x: 500, y: 120, width: 100 },
    ],
    enemies: [
      { x: 220, y: 80 },
      { x: 520, y: 140 },
    ],
    eggs: [
      { x: 60, y: 10 },
      { x: 260, y: 80 },
      { x: 530, y: 140 },
    ]
  }
];

// Автогенерация уровней 4–99
for (let i = 4; i <= 99; i++) {
  levels.push({
    platforms: [
      { x: 0, y: 0, width: 200 + i },
      { x: 300, y: 50 + (i % 5) * 20, width: 150 + (i % 3) * 50 },
    ],
    enemies: Array.from({ length: Math.floor(i/10) + 1 }, (_, idx) => ({
      x: 100 + idx * 150,
      y: 20 + (idx % 2) * 50
    })),
    eggs: Array.from({ length: 2 + (i % 3) }, (_, idx) => ({
      x: 50 + idx * 100,
      y: 30 + (idx % 2) * 60
    }))
  });
}
