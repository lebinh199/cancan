import { useState } from 'react';
import { ACTIONS, CATEGORIES, type Category, type GreenAction } from '../data/actions';
import { useGame } from '../game/store';
import { countOn, toDateKey } from '../game/engine';

export default function Act() {
  const { state, act } = useGame();
  const [cat, setCat] = useState<Category | 'all'>('all');
  const [pending, setPending] = useState<GreenAction | null>(null);
  const [note, setNote] = useState('');
  const today = toDateKey(new Date());
  const list = ACTIONS.filter((a) => cat === 'all' || a.category === cat);

  return (
    <div className="stack">
      <header>
        <h1>Hành động xanh</h1>
        <p className="muted">Mỗi hành động được gắn với một tiêu chí UI GreenMetric.</p>
      </header>

      <div className="filters" role="tablist">
        <button className={cat === 'all' ? 'pill on' : 'pill'} onClick={() => setCat('all')}>Tất cả</button>
        {(Object.keys(CATEGORIES) as Category[]).map((c) => (
          <button key={c} className={cat === c ? 'pill on' : 'pill'} onClick={() => setCat(c)}>
            {CATEGORIES[c].label}
          </button>
        ))}
      </div>

      <ul className="actions">
        {list.map((a) => {
          const n = countOn(state, a.id, today);
          const full = n >= a.dailyLimit;
          return (
            <li key={a.id} className="card action" style={{ borderLeftColor: CATEGORIES[a.category].color }}>
              <span className="icon big" aria-hidden>{a.icon}</span>
              <div className="grow">
                <strong>{a.title}</strong>
                <p className="small muted">{a.description}</p>
                <div className="tags">
                  <span className="tag">+{a.xp} XP</span>
                  <span className="tag">+{a.points} 🍃</span>
                  {a.impact.co2Kg ? <span className="tag">−{a.impact.co2Kg} kg CO₂</span> : null}
                  <span className="tag ghost">{CATEGORIES[a.category].greenMetric}</span>
                </div>
              </div>
              <div className="act-side">
                <button
                  className="btn primary small"
                  disabled={full}
                  onClick={() => {
                    setNote('');
                    setPending(a);
                  }}
                >
                  {full ? 'Đủ' : 'Ghi nhận'}
                </button>
                <small className="muted">{n}/{a.dailyLimit} hôm nay</small>
              </div>
            </li>
          );
        })}
      </ul>

      {pending && (
        <div className="sheet-backdrop" onClick={() => setPending(null)}>
          <form
            className="sheet"
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              if (act(pending.id, note)) setPending(null);
            }}
          >
            <h2>
              {pending.icon} {pending.title}
            </h2>
            <label>
              Ghi chú (không bắt buộc)
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                maxLength={200}
                placeholder={pending.id === 'report' ? 'Vị trí và mô tả: VD “Vòi nước rò rỉ WC tầng 3 nhà A”' : 'Bạn đã làm gì?'}
              />
            </label>
            <p className="small muted">
              Bản chính thức sẽ hỗ trợ ảnh minh chứng, quét QR tại sự kiện và xác minh chéo bởi bạn bè.
            </p>
            <div className="row gap">
              <button type="button" className="btn" onClick={() => setPending(null)}>Huỷ</button>
              <button type="submit" className="btn primary grow">Xác nhận</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
