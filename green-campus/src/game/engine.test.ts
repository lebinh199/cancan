import { describe, expect, it } from 'vitest';
import {
  completeQuiz,
  dailyMissions,
  impactOf,
  initialState,
  levelFor,
  liveStreak,
  logAction,
  redeem,
  updateStreak,
  type GameState,
} from './engine';
import { ACTION_BY_ID } from '../data/actions';
import { LESSONS } from '../data/lessons';

const day = (d: number, h = 9) => new Date(2026, 10, d, h);

function mustLog(s: GameState, id: string, when: Date) {
  const r = logAction(s, id, when);
  if (!r.ok) throw new Error(r.reason);
  return r;
}

describe('levels', () => {
  it('maps xp to levels with progress', () => {
    expect(levelFor(0).current.level).toBe(1);
    expect(levelFor(150).current.level).toBe(2);
    expect(levelFor(150).progress).toBeCloseTo(0.25);
    expect(levelFor(99999).next).toBeNull();
  });
});

describe('streak', () => {
  it('increments on consecutive days and resets on gaps', () => {
    let s = initialState().streak;
    s = updateStreak(s, '2026-11-01');
    s = updateStreak(s, '2026-11-02');
    s = updateStreak(s, '2026-11-02');
    expect(s.current).toBe(2);
    s = updateStreak(s, '2026-11-05');
    expect(s).toEqual({ current: 1, best: 2, lastDate: '2026-11-05' });
  });

  it('handles month boundaries', () => {
    const s = updateStreak({ current: 4, best: 4, lastDate: '2026-10-31' }, '2026-11-01');
    expect(s.current).toBe(5);
  });

  it('live streak drops to 0 after a missed day', () => {
    const s = { current: 5, best: 5, lastDate: '2026-11-01' };
    expect(liveStreak(s, '2026-11-02')).toBe(5);
    expect(liveStreak(s, '2026-11-03')).toBe(0);
  });
});

describe('daily missions', () => {
  it('is deterministic, distinct categories', () => {
    const a = dailyMissions('2026-11-06');
    expect(a).toEqual(dailyMissions('2026-11-06'));
    expect(a).toHaveLength(3);
    expect(new Set(a.map((id) => ACTION_BY_ID[id].category)).size).toBe(3);
  });
});

describe('logAction', () => {
  it('awards xp/points, first badge, and enforces daily limits', () => {
    let s = initialState();
    const r = mustLog(s, 'ac26', day(6));
    expect(r.gain.xp).toBe(ACTION_BY_ID.ac26.xp);
    expect(r.gain.newBadges).toContain('first');
    s = r.state;
    const again = logAction(s, 'ac26', day(6, 15));
    expect(again.ok).toBe(false);
    expect(logAction(s, 'ac26', day(7)).ok).toBe(true);
  });

  it('gives mission bonus once when all daily missions are done', () => {
    let s = initialState();
    const missions = dailyMissions('2026-11-06');
    let bonusCount = 0;
    for (const id of missions) {
      const r = mustLog(s, id, day(6));
      bonusCount += r.gain.bonus.filter((b) => b.includes('nhiệm vụ')).length;
      s = r.state;
    }
    expect(bonusCount).toBe(1);
    expect(s.bonusDates).toEqual(['2026-11-06']);
  });

  it('gives a 7-day streak bonus', () => {
    let s = initialState();
    let last;
    for (let d = 1; d <= 7; d++) {
      last = mustLog(s, 'stairs', day(d));
      s = last.state;
    }
    expect(last!.gain.bonus.some((b) => b.includes('7 ngày'))).toBe(true);
    expect(s.badges).toEqual(expect.arrayContaining(['streak3', 'streak7']));
  });
});

describe('impact', () => {
  it('sums impact factors', () => {
    let s = initialState();
    s = mustLog(s, 'lights', day(6)).state;
    s = mustLog(s, 'bottle', day(6)).state;
    const t = impactOf(s.log);
    expect(t.kwh).toBeCloseTo(1);
    expect(t.co2Kg).toBeCloseTo(0.74);
    expect(t.plasticG).toBe(20);
    expect(t.byCategory.energy).toBe(1);
  });
});

describe('quiz', () => {
  it('only rewards improvements', () => {
    const lesson = LESSONS[0];
    let s = initialState();
    const first = completeQuiz(s, lesson.id, 1);
    expect(first.gain.xp).toBe(lesson.xpPerCorrect);
    s = first.state;
    expect(completeQuiz(s, lesson.id, 1).gain.xp).toBe(0);
    const better = completeQuiz(s, lesson.id, lesson.quiz.length);
    expect(better.gain.xp).toBe((lesson.quiz.length - 1) * lesson.xpPerCorrect);
    expect(better.state.badges).toContain('perfect');
  });
});

describe('redeem', () => {
  it('requires enough points and deducts them', () => {
    const s = initialState();
    expect(redeem(s, 'coffee', day(6)).ok).toBe(false);
    const r = redeem({ ...s, points: 60 }, 'coffee', day(6));
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.state.points).toBe(10);
      expect(r.code).toMatch(/^GQ-COFFEE-\d{5}$/);
      expect(r.state.badges).toContain('giver');
    }
  });
});
