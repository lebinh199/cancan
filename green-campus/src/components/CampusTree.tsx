/** Cây tập thể của khoa: lớn dần theo tổng điểm. */
export const TREE_STAGES = [0, 3000, 3600, 4200, 4800, 5500];

export function treeStage(points: number): number {
  let s = 0;
  TREE_STAGES.forEach((min, i) => {
    if (points >= min) s = i;
  });
  return s;
}

export default function CampusTree({ points }: { points: number }) {
  const stage = treeStage(points);
  const leaves = [
    [60, 52, 26], [38, 66, 18], [82, 66, 18], [46, 40, 16], [76, 40, 16], [60, 30, 18],
  ].slice(0, stage + 1);
  const trunkH = 24 + stage * 6;
  return (
    <svg viewBox="0 0 120 120" className="tree" role="img" aria-label={`Cây của khoa – giai đoạn ${stage + 1}/6`}>
      <ellipse cx="60" cy="112" rx="40" ry="5" className="tree-ground" />
      <rect x="56" y={110 - trunkH} width="8" height={trunkH} rx="3" className="tree-trunk" />
      {leaves.map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy + (5 - stage) * 6} r={r} className="tree-leaf" style={{ opacity: 0.75 + i * 0.05 }} />
      ))}
      {stage >= 4 && <circle cx="70" cy={46 + (5 - stage) * 6} r="3" className="tree-fruit" />}
      {stage >= 5 && <circle cx="48" cy="58" r="3" className="tree-fruit" />}
    </svg>
  );
}
