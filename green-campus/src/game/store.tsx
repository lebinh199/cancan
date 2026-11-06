import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  completeQuiz,
  initialState,
  logAction,
  redeem,
  BADGES,
  type Gain,
  type GameState,
  type Player,
} from './engine';

const KEY = 'greenquest:v1';

function load(): GameState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as GameState;
      if (parsed.version === 1) return { ...initialState(), ...parsed };
    }
  } catch {
    /* bộ nhớ trình duyệt không khả dụng – chạy ở chế độ tạm */
  }
  return initialState();
}

export interface Toast {
  id: number;
  title: string;
  lines: string[];
  tone: 'good' | 'warn';
}

interface Store {
  state: GameState;
  toasts: Toast[];
  join(player: Omit<Player, 'joinedAt'>): void;
  act(actionId: string, note?: string): boolean;
  finishQuiz(lessonId: string, correct: number): Gain;
  buy(rewardId: string): string | null;
  reset(): void;
  dismiss(id: number): void;
}

const Ctx = createContext<Store | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(load);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const stateRef = useRef(state);
  stateRef.current = state;
  const seq = useRef(0);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const push = useCallback((t: Omit<Toast, 'id'>) => {
    const id = ++seq.current;
    setToasts((ts) => [...ts, { ...t, id }]);
    setTimeout(() => setToasts((ts) => ts.filter((x) => x.id !== id)), 3800);
  }, []);

  const announce = useCallback(
    (title: string, gain: Gain) => {
      const lines = [...gain.bonus];
      for (const b of gain.newBadges) {
        const def = BADGES.find((x) => x.id === b);
        if (def) lines.push(`${def.icon} Huy hiệu mới: ${def.title}`);
      }
      push({ title: `${title}  +${gain.xp} XP · +${gain.points} 🍃`, lines, tone: 'good' });
    },
    [push],
  );

  const store = useMemo<Store>(
    () => ({
      state,
      toasts,
      join: (p) => setState((s) => ({ ...s, player: { ...p, joinedAt: new Date().toISOString() } })),
      act: (actionId, note) => {
        const r = logAction(stateRef.current, actionId, new Date(), note);
        if (!r.ok) {
          push({ title: r.reason, lines: [], tone: 'warn' });
          return false;
        }
        stateRef.current = r.state;
        setState(r.state);
        announce('Tuyệt vời!', r.gain);
        return true;
      },
      finishQuiz: (lessonId, correct) => {
        const r = completeQuiz(stateRef.current, lessonId, correct);
        stateRef.current = r.state;
        setState(r.state);
        if (r.gain.xp > 0 || r.gain.newBadges.length) announce('Hoàn thành bài học', r.gain);
        return r.gain;
      },
      buy: (rewardId) => {
        const r = redeem(stateRef.current, rewardId, new Date());
        if (!r.ok) {
          push({ title: r.reason, lines: [], tone: 'warn' });
          return null;
        }
        stateRef.current = r.state;
        setState(r.state);
        push({ title: 'Đổi quà thành công', lines: [`Mã nhận quà: ${r.code}`], tone: 'good' });
        return r.code;
      },
      reset: () => setState(initialState()),
      dismiss: (id) => setToasts((ts) => ts.filter((x) => x.id !== id)),
    }),
    [state, toasts, push, announce],
  );

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useGame(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error('useGame must be used inside GameProvider');
  return s;
}
