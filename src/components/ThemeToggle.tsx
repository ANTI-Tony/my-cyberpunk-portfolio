'use client';

import { Moon, Sun } from 'lucide-react';

// The active theme lives on <html data-theme>, set before paint by the inline
// script in app/shell.tsx. Both icons are rendered and CSS shows the right one,
// so this component needs no state and cannot mismatch on hydration.
export default function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit.
    }
  };

  return (
    <button type="button" className="icon-button" onClick={toggle} aria-label={label} title={label}>
      <Sun className="icon-sun" size={17} strokeWidth={1.75} aria-hidden />
      <Moon className="icon-moon" size={17} strokeWidth={1.75} aria-hidden />
    </button>
  );
}
