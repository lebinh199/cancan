import { useState } from 'react';
import { ACTION_BY_ID, CATEGORIES, type Category } from '../data/actions';
import { FACULTIES, REWARDS } from '../data/catalog';
import { useGame } from '../game/store';
import { BADGES, impactOf, levelFor } from '../game/engine';

export default function Me() {
  const { state, buy, reset } = useGame();
  const [view, setView] = useState<'badges' | 'shop' | 'history'>('badges');
  const lvl = levelFor(state.xp);
  const impact = impactOf(state.log);
  const faculty = FACULTIES.find((f) => f.id === state.player!.facultyId);
  const maxCat = Math.max(1, ...Object.values(impact.byCategory));

  return (
    <div className="stack">
      <header className="card profile">
        <div className="avatar" aria-hidden>{lvl.current.icon}</div>
        <div className="grow">
          <h1>{state.player!.name}</h1>
          <p className="muted small">{faculty?.name} · Cấp {lvl.current.level} {lvl.current.title}</p>
        </div>
      </header>

      <section className="stats card">
        <div className="stat"><strong>{state.xp}</strong><small>XP</small></div>
        <div className="stat"><strong>{state.points}</strong><small>Điểm Xanh 🍃</small></div>
        <div className="stat"><strong>{state.streak.best}</strong><small>Chuỗi dài nhất</small></div>
        <div className="stat"><strong>{impact.actions}</strong><small>Hành động</small></div>
      </section>

      <section className="card">
        <h2>Hồ sơ xanh theo nhóm</h2>
        <ul className="cats">
          {(Object.keys(CATEGORIES) as Category[]).map((c) => (
            <li key={c}>
              <span className="cat-label">{CATEGORIES[c].label}</span>
              <span className="bar"><span style={{ width: `${(impact.byCategory[c] / maxCat) * 100}%`, background: CATEGORIES[c].color }} /></span>
              <span className="muted small">{impact.byCategory[c]}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="segmented">
        <button className={view === 'badges' ? 'on' : ''} onClick={() => setView('badges')}>Huy hiệu</button>
        <button className={view === 'shop' ? 'on' : ''} onClick={() => setView('shop')}>Đổi quà</button>
        <button className={view === 'history' ? 'on' : ''} onClick={() => setView('history')}>Lịch sử</button>
      </div>

      {view === 'badges' && (
        <ul className="badges">
          {BADGES.map((b) => {
            const has = state.badges.includes(b.id);
            return (
              <li key={b.id} className={has ? 'card badge' : 'card badge locked'} title={b.description}>
                <span className="badge-icon" aria-hidden>{has ? b.icon : '🔒'}</span>
                <strong>{b.title}</strong>
                <small className="muted">{b.description}</small>
              </li>
            );
          })}
        </ul>
      )}

      {view === 'shop' && (
        <ul className="list">
          {REWARDS.map((r) => {
            const mine = state.redeemed.filter((x) => x.rewardId === r.id);
            return (
              <li key={r.id} className="card reward">
                <span className="icon big" aria-hidden>{r.icon}</span>
                <span className="grow">
                  <strong>{r.title}</strong>
                  <small className="muted">{r.description}</small>
                  {mine.map((m) => <code key={m.code}>{m.code}</code>)}
                </span>
                <button className="btn primary small" disabled={state.points < r.cost} onClick={() => buy(r.id)}>
                  {r.cost} 🍃
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {view === 'history' && (
        <ul className="feed card">
          {state.log.length === 0 && <li className="muted">Chưa có hành động nào.</li>}
          {[...state.log].reverse().slice(0, 50).map((e) => {
            const a = ACTION_BY_ID[e.actionId];
            return (
              <li key={e.id}>
                <span aria-hidden>{a?.icon}</span>
                <span className="grow">
                  {a?.title}
                  {e.note && <small className="muted"> – {e.note}</small>}
                </span>
                <small className="muted">{new Date(e.ts).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })}</small>
              </li>
            );
          })}
        </ul>
      )}

      <button
        className="link danger"
        onClick={() => {
          if (confirm('Xoá toàn bộ dữ liệu trên thiết bị này?')) reset();
        }}
      >
        Đặt lại dữ liệu
      </button>
    </div>
  );
}
