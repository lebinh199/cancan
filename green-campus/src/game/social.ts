/**
 * Dữ liệu cộng đồng MÔ PHỎNG cho bản prototype chạy offline.
 * Khi có backend, thay các hàm này bằng API thật.
 */
import { FACULTIES } from '../data/catalog';
import { ACTIONS } from '../data/actions';
import type { GameState } from './engine';

const NAMES = [
  'Minh Anh', 'Quốc Bảo', 'Thu Hà', 'Gia Huy', 'Ngọc Linh', 'Đức Thắng', 'Khánh Vy', 'Hoàng Nam',
  'Phương Thảo', 'Tuấn Kiệt', 'Bảo Ngọc', 'Thanh Tâm', 'Hải Đăng', 'Mai Chi', 'Trung Hiếu',
];

function rand(seed: number) {
  let x = seed || 1;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return ((x >>> 0) % 10000) / 10000;
  };
}

export interface Ranked {
  id: string;
  name: string;
  sub: string;
  points: number;
  me?: boolean;
}

export function facultyBoard(state: GameState): Ranked[] {
  return FACULTIES.map((f) => ({
    id: f.id,
    name: f.name,
    sub: f.short,
    points: f.basePoints + (state.player?.facultyId === f.id ? state.xp : 0),
    me: state.player?.facultyId === f.id,
  })).sort((a, b) => b.points - a.points);
}

export function peopleBoard(state: GameState): Ranked[] {
  const r = rand(20261106);
  const peers: Ranked[] = NAMES.map((n, i) => {
    const f = FACULTIES[Math.floor(r() * FACULTIES.length)];
    return { id: `p${i}`, name: n, sub: f.short, points: Math.round(80 + r() * 900) };
  });
  if (state.player) {
    const f = FACULTIES.find((x) => x.id === state.player!.facultyId);
    peers.push({ id: 'me', name: `${state.player.name} (bạn)`, sub: f?.short ?? '', points: state.xp, me: true });
  }
  return peers.sort((a, b) => b.points - a.points);
}

export interface FeedItem {
  id: string;
  who: string;
  icon: string;
  text: string;
  ago: string;
  me?: boolean;
}

function ago(ms: number): string {
  const m = Math.max(1, Math.round(ms / 60000));
  if (m < 60) return `${m} phút trước`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} giờ trước`;
  return `${Math.round(h / 24)} ngày trước`;
}

export function campusFeed(state: GameState, now = Date.now()): FeedItem[] {
  const r = rand(Math.floor(now / 3_600_000));
  const sims: FeedItem[] = Array.from({ length: 6 }, (_, i) => {
    const a = ACTIONS[Math.floor(r() * ACTIONS.length)];
    return {
      id: `s${i}`,
      who: NAMES[Math.floor(r() * NAMES.length)],
      icon: a.icon,
      text: a.title.toLowerCase(),
      ago: ago((i + 1) * (5 + r() * 40) * 60000),
    };
  });
  const mine: FeedItem[] = state.log
    .slice(-3)
    .reverse()
    .map((e) => {
      const a = ACTIONS.find((x) => x.id === e.actionId)!;
      return { id: e.id, who: 'Bạn', icon: a.icon, text: a.title.toLowerCase(), ago: ago(now - e.ts), me: true };
    });
  return [...mine, ...sims].slice(0, 6);
}
