/**
 * Logic game hoá thuần (không phụ thuộc React) để dễ kiểm thử và
 * chuyển lên máy chủ sau này.
 */
import { ACTIONS, ACTION_BY_ID, type Category, type Impact } from '../data/actions';
import { LESSONS } from '../data/lessons';
import { LEVELS, REWARDS, type LevelDef } from '../data/catalog';

export interface Player {
  name: string;
  facultyId: string;
  joinedAt: string;
}

export interface LogEntry {
  id: string;
  actionId: string;
  date: string; // YYYY-MM-DD (giờ địa phương)
  ts: number;
  note?: string;
}

export interface Redemption {
  rewardId: string;
  ts: number;
  code: string;
}

export interface GameState {
  version: 1;
  player: Player | null;
  xp: number;
  points: number;
  log: LogEntry[];
  quiz: Record<string, { correct: number; total: number }>;
  badges: string[];
  redeemed: Redemption[];
  streak: { current: number; best: number; lastDate: string | null };
  bonusDates: string[];
}

export const MISSION_BONUS = { xp: 30, points: 15 };
export const STREAK_BONUS_EVERY = 7;

export function initialState(): GameState {
  return {
    version: 1,
    player: null,
    xp: 0,
    points: 0,
    log: [],
    quiz: {},
    badges: [],
    redeemed: [],
    streak: { current: 0, best: 0, lastDate: null },
    bonusDates: [],
  };
}

export function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function dayDiff(a: string, b: string): number {
  const [ya, ma, da] = a.split('-').map(Number);
  const [yb, mb, db] = b.split('-').map(Number);
  return Math.round((Date.UTC(yb, mb - 1, db) - Date.UTC(ya, ma - 1, da)) / 86_400_000);
}

/* ---------- Cấp độ ---------- */

export interface LevelInfo {
  current: LevelDef;
  next: LevelDef | null;
  progress: number; // 0..1 tới cấp kế tiếp
}

export function levelFor(xp: number): LevelInfo {
  let idx = 0;
  for (let i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i].minXp) idx = i;
  const current = LEVELS[idx];
  const next = LEVELS[idx + 1] ?? null;
  const progress = next ? (xp - current.minXp) / (next.minXp - current.minXp) : 1;
  return { current, next, progress };
}

/* ---------- Chuỗi ngày (streak) ---------- */

export function updateStreak(streak: GameState['streak'], date: string): GameState['streak'] {
  if (streak.lastDate === date) return streak;
  const continued = streak.lastDate !== null && dayDiff(streak.lastDate, date) === 1;
  const current = continued ? streak.current + 1 : 1;
  return { current, best: Math.max(streak.best, current), lastDate: date };
}

/** Streak hiển thị: nếu đã bỏ lỡ hôm qua thì về 0. */
export function liveStreak(streak: GameState['streak'], today: string): number {
  if (!streak.lastDate) return 0;
  return dayDiff(streak.lastDate, today) <= 1 ? streak.current : 0;
}

/* ---------- Nhiệm vụ hằng ngày ---------- */

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** 3 nhiệm vụ cố định theo ngày, thuộc 3 nhóm khác nhau – giống nhau với mọi người. */
export function dailyMissions(date: string, count = 3): string[] {
  const pool = ACTIONS.filter((a) => a.id !== 'event');
  const sorted = [...pool].sort((a, b) => hash(date + a.id) - hash(date + b.id));
  const picked: string[] = [];
  const cats = new Set<Category>();
  for (const a of sorted) {
    if (picked.length >= count) break;
    if (cats.has(a.category)) continue;
    cats.add(a.category);
    picked.push(a.id);
  }
  return picked;
}

export function countOn(state: GameState, actionId: string, date: string): number {
  return state.log.filter((e) => e.actionId === actionId && e.date === date).length;
}

export function missionsDone(state: GameState, date: string): boolean[] {
  return dailyMissions(date).map((id) => countOn(state, id, date) > 0);
}

/* ---------- Ghi nhận hành động ---------- */

export interface Gain {
  xp: number;
  points: number;
  newBadges: string[];
  bonus: string[];
}

export type LogResult = { ok: true; state: GameState; gain: Gain } | { ok: false; reason: string };

export function canLog(state: GameState, actionId: string, date: string): boolean {
  const a = ACTION_BY_ID[actionId];
  return !!a && countOn(state, actionId, date) < a.dailyLimit;
}

export function logAction(
  state: GameState,
  actionId: string,
  now: Date,
  note?: string,
): LogResult {
  const action = ACTION_BY_ID[actionId];
  if (!action) return { ok: false, reason: 'Hành động không tồn tại.' };
  const date = toDateKey(now);
  if (!canLog(state, actionId, date)) {
    return { ok: false, reason: `Đã đạt giới hạn ${action.dailyLimit} lần/ngày cho hành động này.` };
  }

  let xp = action.xp;
  let points = action.points;
  const bonus: string[] = [];

  const entry: LogEntry = {
    id: `${now.getTime()}-${Math.random().toString(36).slice(2, 7)}`,
    actionId,
    date,
    ts: now.getTime(),
    note: note?.trim() || undefined,
  };

  const prevStreak = state.streak;
  const streak = updateStreak(prevStreak, date);
  let next: GameState = { ...state, log: [...state.log, entry], streak };

  if (streak.current !== prevStreak.current && streak.current % STREAK_BONUS_EVERY === 0) {
    xp += 50;
    points += 25;
    bonus.push(`Chuỗi ${streak.current} ngày! +50 XP`);
  }

  if (!next.bonusDates.includes(date) && missionsDone(next, date).every(Boolean)) {
    xp += MISSION_BONUS.xp;
    points += MISSION_BONUS.points;
    next = { ...next, bonusDates: [...next.bonusDates, date] };
    bonus.push(`Hoàn thành nhiệm vụ ngày! +${MISSION_BONUS.xp} XP`);
  }

  next = { ...next, xp: next.xp + xp, points: next.points + points };
  const { state: withBadges, newBadges } = awardBadges(next);
  return { ok: true, state: withBadges, gain: { xp, points, newBadges, bonus } };
}

/* ---------- Học & quiz ---------- */

export function completeQuiz(
  state: GameState,
  lessonId: string,
  correct: number,
): { state: GameState; gain: Gain } {
  const lesson = LESSONS.find((l) => l.id === lessonId);
  if (!lesson) throw new Error('Unknown lesson');
  const total = lesson.quiz.length;
  const prev = state.quiz[lessonId];
  // Chỉ thưởng phần cải thiện so với lần làm tốt nhất trước đó.
  const improved = Math.max(0, correct - (prev?.correct ?? 0));
  const xp = improved * lesson.xpPerCorrect + (!prev && correct === total ? 20 : 0);
  const points = Math.round(xp / 2);
  let next: GameState = {
    ...state,
    xp: state.xp + xp,
    points: state.points + points,
    quiz: { ...state.quiz, [lessonId]: { correct: Math.max(correct, prev?.correct ?? 0), total } },
  };
  const res = awardBadges(next);
  next = res.state;
  return { state: next, gain: { xp, points, newBadges: res.newBadges, bonus: [] } };
}

/* ---------- Đổi quà ---------- */

export function redeem(
  state: GameState,
  rewardId: string,
  now: Date,
): { ok: true; state: GameState; code: string } | { ok: false; reason: string } {
  const reward = REWARDS.find((r) => r.id === rewardId);
  if (!reward) return { ok: false, reason: 'Phần thưởng không tồn tại.' };
  if (state.points < reward.cost) return { ok: false, reason: 'Chưa đủ Điểm Xanh.' };
  const code = `GQ-${rewardId.toUpperCase()}-${(hash(String(now.getTime()) + rewardId) % 100000)
    .toString()
    .padStart(5, '0')}`;
  const next: GameState = {
    ...state,
    points: state.points - reward.cost,
    redeemed: [...state.redeemed, { rewardId, ts: now.getTime(), code }],
  };
  return { ok: true, state: awardBadges(next).state, code };
}

/* ---------- Tác động ---------- */

export interface ImpactTotals extends Required<Impact> {
  actions: number;
  byCategory: Record<Category, number>;
}

export function impactOf(log: LogEntry[]): ImpactTotals {
  const t: ImpactTotals = {
    co2Kg: 0,
    kwh: 0,
    plasticG: 0,
    waterL: 0,
    actions: 0,
    byCategory: { energy: 0, waste: 0, water: 0, transport: 0, food: 0, community: 0 },
  };
  for (const e of log) {
    const a = ACTION_BY_ID[e.actionId];
    if (!a) continue;
    t.actions++;
    t.byCategory[a.category]++;
    t.co2Kg += a.impact.co2Kg ?? 0;
    t.kwh += a.impact.kwh ?? 0;
    t.plasticG += a.impact.plasticG ?? 0;
    t.waterL += a.impact.waterL ?? 0;
  }
  return t;
}

/** Quy đổi dễ hiểu: 1 cây xanh trưởng thành hấp thụ ~ 22 kg CO2/năm. */
export const TREE_KG_PER_YEAR = 22;

/* ---------- Huy hiệu ---------- */

export interface BadgeDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  test: (s: GameState) => boolean;
}

const catCount = (s: GameState, c: Category) => impactOf(s.log).byCategory[c];

export const BADGES: BadgeDef[] = [
  { id: 'first', title: 'Bước chân đầu tiên', description: 'Ghi nhận hành động xanh đầu tiên.', icon: '👣', test: (s) => s.log.length >= 1 },
  { id: 'streak3', title: 'Bền bỉ', description: 'Duy trì chuỗi 3 ngày.', icon: '🔥', test: (s) => s.streak.best >= 3 },
  { id: 'streak7', title: 'Thói quen xanh', description: 'Duy trì chuỗi 7 ngày.', icon: '🌟', test: (s) => s.streak.best >= 7 },
  { id: 'streak21', title: '21 ngày thay đổi', description: 'Duy trì chuỗi 21 ngày liên tục.', icon: '🏅', test: (s) => s.streak.best >= 21 },
  { id: 'plastic', title: 'Chiến binh không nhựa', description: '10 lần từ chối nhựa dùng một lần.', icon: '🐢', test: (s) => s.log.filter((e) => e.actionId === 'bottle' || e.actionId === 'bag').length >= 10 },
  { id: 'energy', title: 'Người giữ điện', description: '15 hành động tiết kiệm năng lượng.', icon: '⚡', test: (s) => catCount(s, 'energy') >= 15 },
  { id: 'rider', title: 'Tay lái xanh', description: '10 chuyến đi xanh.', icon: '🚴', test: (s) => catCount(s, 'transport') >= 10 },
  { id: 'water', title: 'Giọt nước quý', description: '10 hành động tiết kiệm nước.', icon: '💧', test: (s) => catCount(s, 'water') >= 10 },
  { id: 'reporter', title: 'Tai mắt Green Campus', description: 'Báo cáo 3 điểm lãng phí.', icon: '🔎', test: (s) => s.log.filter((e) => e.actionId === 'report').length >= 3 },
  { id: 'all6', title: 'Toàn diện', description: 'Có hành động ở cả 6 nhóm.', icon: '🌈', test: (s) => Object.values(impactOf(s.log).byCategory).every((n) => n > 0) },
  { id: 'scholar', title: 'Nhà thông thái xanh', description: 'Hoàn thành tất cả bài học.', icon: '📚', test: (s) => LESSONS.every((l) => s.quiz[l.id]) },
  { id: 'perfect', title: 'Điểm tuyệt đối', description: 'Trả lời đúng hết một bài quiz.', icon: '💯', test: (s) => Object.values(s.quiz).some((q) => q.correct === q.total) },
  { id: 'co2_10', title: '10 kg CO₂', description: 'Giảm ước tính 10 kg CO₂.', icon: '🌍', test: (s) => impactOf(s.log).co2Kg >= 10 },
  { id: 'giver', title: 'Đổi quà xanh', description: 'Đổi phần thưởng đầu tiên.', icon: '🎁', test: (s) => s.redeemed.length >= 1 },
];

export function awardBadges(state: GameState): { state: GameState; newBadges: string[] } {
  const newBadges = BADGES.filter((b) => !state.badges.includes(b.id) && b.test(state)).map((b) => b.id);
  if (!newBadges.length) return { state, newBadges };
  return { state: { ...state, badges: [...state.badges, ...newBadges] }, newBadges };
}
