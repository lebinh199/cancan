import { useState } from 'react';
import { useGame } from '../game/store';
import { facultyBoard, peopleBoard, type Ranked } from '../game/social';

export default function Rank() {
  const { state } = useGame();
  const [mode, setMode] = useState<'faculty' | 'people'>('faculty');
  const rows: Ranked[] = mode === 'faculty' ? facultyBoard(state) : peopleBoard(state);
  const max = rows[0]?.points || 1;

  return (
    <div className="stack">
      <header>
        <h1>Bảng xếp hạng</h1>
        <p className="muted">
          {mode === 'faculty'
            ? 'Mỗi XP bạn kiếm được cộng vào điểm của khoa. Khoa dẫn đầu cuối tháng nhận “Cúp Green Campus”.'
            : 'Xếp hạng theo XP. Tháng mới bắt đầu lại để ai cũng có cơ hội.'}
        </p>
      </header>
      <div className="segmented">
        <button className={mode === 'faculty' ? 'on' : ''} onClick={() => setMode('faculty')}>Theo khoa</button>
        <button className={mode === 'people' ? 'on' : ''} onClick={() => setMode('people')}>Cá nhân</button>
      </div>
      <ol className="board">
        {rows.map((r, i) => (
          <li key={r.id} className={r.me ? 'me' : ''}>
            <span className="rank">{i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1}</span>
            <span className="grow">
              <span className="row between">
                <strong>{r.name}</strong>
                <span>{r.points.toLocaleString('vi-VN')}</span>
              </span>
              <span className="bar"><span style={{ width: `${(r.points / max) * 100}%` }} /></span>
              {mode === 'people' && <small className="muted">{r.sub}</small>}
            </span>
          </li>
        ))}
      </ol>
      <p className="small muted">Dữ liệu các thành viên khác là mô phỏng trong bản thử nghiệm.</p>
    </div>
  );
}
