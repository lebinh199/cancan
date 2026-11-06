import { useState } from 'react';
import { useGame } from './game/store';
import Onboarding from './views/Onboarding';
import Home from './views/Home';
import Act from './views/Act';
import Learn from './views/Learn';
import Rank from './views/Rank';
import Me from './views/Me';
import Toasts from './components/Toasts';

export type Tab = 'home' | 'act' | 'learn' | 'rank' | 'me';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'home', label: 'Trang chủ', icon: '🏠' },
  { id: 'act', label: 'Hành động', icon: '✅' },
  { id: 'learn', label: 'Học', icon: '📘' },
  { id: 'rank', label: 'Xếp hạng', icon: '🏆' },
  { id: 'me', label: 'Hồ sơ', icon: '🙂' },
];

export default function App() {
  const { state } = useGame();
  const [tab, setTab] = useState<Tab>('home');

  if (!state.player) return <Onboarding />;

  return (
    <div className="app">
      <main className="content">
        {tab === 'home' && <Home go={setTab} />}
        {tab === 'act' && <Act />}
        {tab === 'learn' && <Learn />}
        {tab === 'rank' && <Rank />}
        {tab === 'me' && <Me />}
      </main>
      <nav className="tabbar" aria-label="Điều hướng chính">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={tab === t.id ? 'tab active' : 'tab'}
            onClick={() => setTab(t.id)}
            aria-current={tab === t.id ? 'page' : undefined}
          >
            <span aria-hidden>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>
      <Toasts />
    </div>
  );
}
