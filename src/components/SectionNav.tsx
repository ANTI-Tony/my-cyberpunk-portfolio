'use client';

import { useEffect, useState } from 'react';

interface NavItem {
  id: string;
  label: string;
}

// Header navigation that marks the section currently crossing the middle of the viewport.
export default function SectionNav({ items, label }: { items: NavItem[]; label: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    // Every section is observed, including ones without a nav link, so the
    // highlight clears when the reader scrolls back above the first linked one.
    document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="site-nav" aria-label={label}>
      {items.map((item) => (
        <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
