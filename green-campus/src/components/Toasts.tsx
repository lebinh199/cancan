import { useGame } from '../game/store';

export default function Toasts() {
  const { toasts, dismiss } = useGame();
  return (
    <div className="toasts" role="status" aria-live="polite">
      {toasts.map((t) => (
        <button key={t.id} className={`toast ${t.tone}`} onClick={() => dismiss(t.id)}>
          <strong>{t.title}</strong>
          {t.lines.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </button>
      ))}
    </div>
  );
}
