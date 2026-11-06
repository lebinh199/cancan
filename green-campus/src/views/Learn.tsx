import { useState } from 'react';
import { LESSONS, type Lesson } from '../data/lessons';
import { CATEGORIES } from '../data/actions';
import { useGame } from '../game/store';

export default function Learn() {
  const { state } = useGame();
  const [open, setOpen] = useState<Lesson | null>(null);

  if (open) return <LessonView lesson={open} onClose={() => setOpen(null)} />;

  const done = LESSONS.filter((l) => state.quiz[l.id]).length;
  return (
    <div className="stack">
      <header>
        <h1>Học xanh</h1>
        <p className="muted">Bài học 3 phút. Đã hoàn thành {done}/{LESSONS.length}.</p>
      </header>
      <ul className="lessons">
        {LESSONS.map((l) => {
          const r = state.quiz[l.id];
          return (
            <li key={l.id}>
              <button className="card lesson" onClick={() => setOpen(l)}>
                <span className="dot" style={{ background: CATEGORIES[l.category].color }} />
                <span className="grow">
                  <strong>{l.title}</strong>
                  <small className="muted">
                    {l.minutes} phút · {l.quiz.length} câu hỏi · tối đa {l.quiz.length * l.xpPerCorrect + 20} XP
                  </small>
                </span>
                <span className={r ? 'badge-score done' : 'badge-score'}>
                  {r ? `${r.correct}/${r.total}` : 'Mới'}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function LessonView({ lesson, onClose }: { lesson: Lesson; onClose: () => void }) {
  const { finishQuiz } = useGame();
  const [step, setStep] = useState(0); // 0..cards-1: thẻ đọc; sau đó là câu hỏi
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [result, setResult] = useState<{ xp: number } | null>(null);

  const nCards = lesson.cards.length;
  const qIndex = step - nCards;
  const q = qIndex >= 0 ? lesson.quiz[qIndex] : null;
  const total = nCards + lesson.quiz.length;

  const next = () => {
    if (q && picked === null) return;
    const gotIt = q && picked === q.answer ? 1 : 0;
    const newCorrect = correct + gotIt;
    setCorrect(newCorrect);
    setPicked(null);
    if (step + 1 >= total) {
      const gain = finishQuiz(lesson.id, newCorrect);
      setResult({ xp: gain.xp });
    } else setStep(step + 1);
  };

  return (
    <div className="stack">
      <div className="row between">
        <button className="link" onClick={onClose}>← Bài học</button>
        <small className="muted">{Math.min(step + 1, total)}/{total}</small>
      </div>
      <div className="steps" aria-hidden>
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={i <= step ? 'on' : ''} />
        ))}
      </div>
      <h1>{lesson.title}</h1>

      {result ? (
        <div className="card center">
          <div className="celebrate" aria-hidden>{correct === lesson.quiz.length ? '🏆' : '🌱'}</div>
          <h2>Đúng {correct}/{lesson.quiz.length} câu</h2>
          <p>{result.xp > 0 ? `+${result.xp} XP` : 'Bạn đã nhận XP cho bài này rồi – làm tốt hơn để nhận thêm.'}</p>
          <button className="btn primary" onClick={onClose}>Tiếp tục</button>
        </div>
      ) : q ? (
        <div className="card">
          <p className="muted small">Câu hỏi {qIndex + 1}</p>
          <h2>{q.q}</h2>
          <div className="options">
            {q.options.map((o, i) => {
              let cls = 'option';
              if (picked !== null) {
                if (i === q.answer) cls += ' right';
                else if (i === picked) cls += ' wrong';
              }
              return (
                <button key={i} className={cls} disabled={picked !== null} onClick={() => setPicked(i)}>
                  {o}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <p className={picked === q.answer ? 'feedback good' : 'feedback bad'}>
              {picked === q.answer ? '✓ Chính xác! ' : '✗ Chưa đúng. '}
              {q.explain}
            </p>
          )}
          <button className="btn primary full" disabled={picked === null} onClick={next}>
            {step + 1 >= total ? 'Hoàn thành' : 'Câu tiếp'}
          </button>
        </div>
      ) : (
        <div className="card">
          <p className="lesson-card">{lesson.cards[step]}</p>
          <button className="btn primary full" onClick={next}>
            {step + 1 === nCards ? 'Làm quiz' : 'Tiếp'}
          </button>
        </div>
      )}
    </div>
  );
}
