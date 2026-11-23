// A thin line-art Indonesian street: café, warung, bakery, small shop, barbershop (one per template).
// Lines are text-muted, lamps and lights are small gold fills. The lines draw once on first view
// (CSS in styles/site.css); with reduced motion everything is shown at once. No JavaScript.

type Shop = { lines: string[]; lights: [number, number, number][] };

// Each shop is drawn in local coordinates: 172 wide, ground at y=204.
const SHOPS: Shop[] = [
  {
    // 01 Café: two storeys, sign with a cup, scalloped awning, window and door, a hanging lamp.
    lines: [
      "M0 204 V64 H172 V204",
      "M-4 64 H176 V56 H-4 Z",
      "M22 82 h40 v34 h-40 Z M42 82 v34",
      "M110 82 h40 v34 h-40 Z M130 82 v34",
      "M24 126 h124 v22 h-124 Z",
      "M79 131 h13 v5 a6.5 6.5 0 0 1 -13 0 Z M92 133 a3 3 0 0 1 0 5",
      "M8 152 H164 M8 152 V160 a13 8 0 0 0 26 0 a13 8 0 0 0 26 0 a13 8 0 0 0 26 0 a13 8 0 0 0 26 0 a13 8 0 0 0 26 0 a13 8 0 0 0 26 0 V152",
      "M34 152 v8 M60 152 v8 M86 152 v8 M112 152 v8 M138 152 v8",
      "M12 204 V172 H102 V204 M28 194 h30 M43 194 v10",
      "M118 204 V172 H156 V204 M124 186 v6",
      "M137 166 v5",
    ],
    lights: [[137, 175, 3.5]],
  },
  {
    // 02 Warung: tin roof, open counter with jars and a steaming bowl, a banner, a lantern.
    lines: [
      "M-6 122 L20 104 H152 L178 122 Z",
      "M48 104 l-3 18 M78 104 l-1 18 M108 104 l1 18 M138 104 l3 18",
      "M4 204 V122 M168 122 V204",
      "M14 176 V140 H158 V176",
      "M40 124 h92 v12 h-92 Z M54 130 h22 M84 130 h34",
      "M8 176 H164 M20 176 V204 M152 176 V204",
      "M30 176 v-12 a4 4 0 0 1 4 -4 h8 a4 4 0 0 1 4 4 v12 M54 176 v-10 a4 4 0 0 1 4 -4 h8 a4 4 0 0 1 4 4 v10",
      "M106 166 h30 a15 10 0 0 1 -30 0 Z",
      "M115 160 q-3 -4 0 -8 M127 160 q-3 -4 0 -8",
      "M150 122 v5",
    ],
    lights: [[150, 132, 4]],
  },
  {
    // 03 Bakery: curved gable with a round window, sign with a loaf, awning, arched display and door.
    lines: [
      "M0 204 V96 Q86 50 172 96 V204",
      "M10 100 Q86 62 162 100",
      "M76 84 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0",
      "M30 110 h112 v20 h-112 Z",
      "M72 126 q0 -10 14 -10 q14 0 14 10 Z M80 121 l3 -3 M86 121 l3 -3 M92 121 l3 -3",
      "M10 138 H162 L154 150 H18 Z",
      "M14 204 V172 Q14 158 28 158 H86 Q100 158 100 172 V204 M20 184 H94",
      "M28 184 a6 5 0 0 1 12 0 M48 184 a6 5 0 0 1 12 0 M68 184 a6 5 0 0 1 12 0",
      "M114 204 V164 Q114 156 122 156 H150 Q158 156 158 164 V204 M146 182 v6",
    ],
    lights: [[86, 84, 4]],
  },
  {
    // 04 Small shop: parapet, sign with a bag, half-open roller shutter, shelves of goods, a bracket lamp.
    lines: [
      "M0 204 V96 H172 V204",
      "M-4 96 H176 V88 H-4 Z",
      "M14 104 H158 V124 H14 Z",
      "M78 110 h16 l-2 10 h-12 Z M82 110 a4 4 0 0 1 8 0",
      "M12 204 V134 H160 V204",
      "M12 139 H160 M12 144 H160 M12 149 H160 M12 154 H160 M12 159 H160 M82 159 v4 h8 v-4",
      "M18 178 H154 M18 194 H154",
      "M24 178 v-10 h12 v10 M42 178 v-13 h10 v13 M100 178 v-8 h16 v8 M128 178 v-11 a3 3 0 0 1 6 0 v11",
      "M30 194 v-8 h18 v8 M110 194 v-10 h10 v10",
      "M0 102 h-6 v4",
    ],
    lights: [[-6, 110, 3.5]],
  },
  {
    // 05 Barbershop: slanted roof, sign with scissors, window with chair and mirror, barber pole, door.
    lines: [
      "M0 204 V84 L172 72 V204",
      "M0 100 H172",
      "M20 108 H152 V128 H20 Z",
      "M75 113 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M75 123 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M81 114 L96 121 M81 122 L96 115",
      "M12 204 V140 H102 V204",
      "M24 150 h44 v12 h-44 Z",
      "M36 188 h30 M60 188 V168 M51 188 V200 M42 200 h18",
      "M105 172 h7 v-28 h-7 Z M105 151 l7 -4 M105 159 l7 -4 M105 167 l7 -4 M104 175 h9",
      "M116 204 V140 H158 V204 M124 150 h26 v30 h-26 Z",
    ],
    lights: [[108.5, 140, 3]],
  },
];

const SHOP_X = [14, 212, 410, 608, 806];
const GAP_CENTERS = [199, 397, 595, 793];

function Lamp({ x }: { x: number }) {
  return (
    <>
      <path className="ln" pathLength={1} d={`M${x} 204 V150 q0 -6 6 -6 h2`} />
      <circle className="glow" cx={x + 10} cy={148} r={3.5} fill="var(--color-star)" />
    </>
  );
}

function Tree({ x }: { x: number }) {
  return (
    <>
      <path className="ln" pathLength={1} d={`M${x} 204 v-16 M${x - 8} 204 h16`} />
      <path className="ln" pathLength={1} d={`M${x - 11} 178 a11 11 0 1 0 22 0 a11 11 0 1 0 -22 0`} />
    </>
  );
}

export function StreetIllustration({ label }: { label: string }) {
  return (
    <svg
      className="street block h-auto w-full text-text-muted"
      viewBox="0 40 1000 166"
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMax meet"
    >
      <path className="ln" pathLength={1} d="M0 204 H1000" />
      {SHOPS.map((shop, i) => (
        <g key={i} transform={`translate(${SHOP_X[i]} 0)`} style={{ "--d": i } as React.CSSProperties}>
          {shop.lines.map((d, j) => (
            <path key={j} className="ln" pathLength={1} d={d} />
          ))}
          {shop.lights.map(([cx, cy, r], j) => (
            <circle key={`l${j}`} className="glow" cx={cx} cy={cy} r={r} fill="var(--color-star)" />
          ))}
        </g>
      ))}
      <g style={{ "--d": 2 } as React.CSSProperties}>
        <Lamp x={GAP_CENTERS[0]!} />
        <Tree x={GAP_CENTERS[1]!} />
        <Lamp x={GAP_CENTERS[2]!} />
        <Tree x={GAP_CENTERS[3]!} />
      </g>
    </svg>
  );
}
