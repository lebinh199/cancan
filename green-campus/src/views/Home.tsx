import type { Tab } from '../App';
import { ACTION_BY_ID } from '../data/actions';
import { FACULTIES } from '../data/catalog';
import { useGame } from '../game/store';
import {
  countOn,
  dailyMissions,
  impactOf,
  levelFor,
  liveStreak,
  MISSION_BONUS,
  toDateKey,
  TREE_KG_PER_YEAR,
} from '../game/engine';
import { campusFeed, facultyBoard } from '../game/social';
import Progress from '../components/Progress';
import CampusTree, { TREE_STAGES, treeStage } from '../components/CampusTree';

export default function Home({ go }: { go: (t: Tab) => void }) {
  const { state, act } = useGame();
  const today = toDateKey(new Date());
  const lvl = levelFor(state.xp);
  const streak = liveStreak(state.streak, today);
  const missions = dailyMissions(today);
  const doneCount = missions.filter((id) => countOn(state, id, today) > 0).length;
  const impact = impactOf(state.log);
  const board = facultyBoard(state);
  const myRank = board.findIndex((f) => f.me) + 1;
  const myFaculty = board.find((f) => f.me)!;
  const stage = treeStage(myFaculty.points);
  const nextStage = TREE_STAGES[stage + 1];
  const faculty = FACULTIES.find((f) => f.id === state.player!.facultyId)!;

  return (
    <div className="stack">
      <header className="greeting">
        <div>
          <p className="muted">Xin chào,</p>
          <h1>{state.player!.name}</h1>
        </div>
        <div className="chips">
          <span className="chip" title="Chuỗi ngày">🔥 {streak}</span>
          <span className="chip" title="Điểm Xanh">🍃 {state.points}</span>
        </div>
      </header>

      <section className="card level">
        <div className="level-icon" aria-hidden>{lvl.current.icon}</div>
        <div className="grow">
          <div className="row between">
            <strong>Cấp {lvl.current.level} · {lvl.current.title}</strong>
            <span className="muted">{state.xp} XP</span>
          </div>
          <Progress value={lvl.progress} label="Tiến độ cấp độ" />
          <small className="muted">
            {lvl.next ? `Còn ${lvl.next.minXp - state.xp} XP tới “${lvl.next.title}”` : 'Cấp cao nhất!'}
          </small>
        </div>
      </section>

      <section className="card">
        <div className="row between">
          <h2>Nhiệm vụ hôm nay</h2>
          <span className="muted">{doneCount}/3</span>
        </div>
        <p className="muted small">Hoàn thành cả 3 để nhận thêm +{MISSION_BONUS.xp} XP.</p>
        <ul className="list">
          {missions.map((id) => {
            const a = ACTION_BY_ID[id];
            const done = countOn(state, id, today) > 0;
            return (
              <li key={id} className={done ? 'mission done' : 'mission'}>
                <span className="icon" aria-hidden>{a.icon}</span>
                <span className="grow">
                  {a.title}
                  <small className="muted"> +{a.xp} XP</small>
                </span>
                <button className="btn small" disabled={done} onClick={() => act(id)}>
                  {done ? '✓ Xong' : 'Đã làm'}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="card tree-card">
        <CampusTree points={myFaculty.points} />
        <div className="grow">
          <h2>Cây của {faculty.short}</h2>
          <p className="small">
            Hạng <b>#{myRank}</b>/{board.length} · {myFaculty.points.toLocaleString('vi-VN')} điểm
          </p>
          {nextStage ? (
            <>
              <Progress
                value={(myFaculty.points - TREE_STAGES[stage]) / (nextStage - TREE_STAGES[stage])}
                label="Tiến độ cây"
              />
              <small className="muted">Còn {(nextStage - myFaculty.points).toLocaleString('vi-VN')} điểm để cây lớn thêm</small>
            </>
          ) : (
            <small className="muted">Cây đã ra quả – khoa bạn thật tuyệt!</small>
          )}
          <button className="link" onClick={() => go('rank')}>Xem bảng xếp hạng →</button>
        </div>
      </section>

      <section className="card">
        <h2>Tác động của bạn</h2>
        <div className="stats">
          <Stat value={impact.co2Kg.toFixed(1)} unit="kg CO₂" />
          <Stat value={impact.kwh.toFixed(1)} unit="kWh điện" />
          <Stat value={Math.round(impact.plasticG)} unit="g nhựa" />
          <Stat value={Math.round(impact.waterL)} unit="lít nước" />
        </div>
        <p className="muted small">
          ≈ lượng CO₂ {(impact.co2Kg / TREE_KG_PER_YEAR * 365).toFixed(0)} cây xanh hấp thụ trong một ngày. Số liệu là ước tính giáo dục.
        </p>
      </section>

      <section className="card">
        <h2>Campus đang xanh lên</h2>
        <ul className="feed">
          {campusFeed(state).map((f) => (
            <li key={f.id} className={f.me ? 'me' : ''}>
              <span aria-hidden>{f.icon}</span>
              <span className="grow">
                <b>{f.who}</b> {f.text}
              </span>
              <small className="muted">{f.ago}</small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Stat({ value, unit }: { value: string | number; unit: string }) {
  return (
    <div className="stat">
      <strong>{value}</strong>
      <small>{unit}</small>
    </div>
  );
}
