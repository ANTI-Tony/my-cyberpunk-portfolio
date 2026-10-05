import { Fragment, type CSSProperties, type ReactNode } from 'react';
import { ArrowUpRight, Github, GraduationCap, Linkedin, Mail, PenLine } from 'lucide-react';
import Hero from './Hero';
import SectionNav from './SectionNav';
import ThemeToggle from './ThemeToggle';
import {
  about,
  education,
  experience,
  projects,
  publications,
  sectionIds,
  site,
  skills,
  ui,
  writing,
  type Entry,
  type Lang,
} from '@/content/profile';

// Renders **emphasis** markers from the content file as <strong>.
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}

function External({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function Section({
  id,
  label,
  note,
  children,
}: {
  id: string;
  label: string;
  note?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-label`}>
      <div className="section-side">
        <h2 className="section-label" id={`${id}-label`}>
          {label}
        </h2>
        {note}
      </div>
      <div className="section-body">{children}</div>
    </section>
  );
}

function EntryBlock({ entry, lang }: { entry: Entry; lang: Lang }) {
  return (
    <article className="entry">
      <header className="entry-head">
        <h3 className="entry-org">{entry.org[lang]}</h3>
        <p className="entry-date">{entry.date[lang]}</p>
      </header>
      <p className="entry-role">
        {entry.role[lang]}
        <span className="entry-team">{entry.team[lang]}</span>
      </p>
      <ul className="bullets">
        {entry.bullets[lang].map((bullet) => (
          <li key={bullet}>
            <Rich text={bullet} />
          </li>
        ))}
      </ul>
    </article>
  );
}

const step = (i: number) => ({ '--i': i }) as CSSProperties;

export default function HomePage({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const intro = about[lang];
  const edu = education[lang];
  const blog = writing[lang];
  const navItems = sectionIds.map((id) => ({ id, label: t.sections[id] }));
  const other =
    lang === 'en' ? { href: '/zh', label: '中文', lang: 'zh-CN' } : { href: '/', label: 'EN', lang: 'en' };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    alternateName: `${site.nickname} Wen`,
    url: site.url,
    email: `mailto:${site.email}`,
    affiliation: { '@type': 'CollegeOrUniversity', name: 'University of Sydney' },
    sameAs: Object.values(site.links),
  };

  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>

      <header className="site-header">
        <div className="wrap site-bar">
          <a className="brand" href="#top">
            {site.name}
          </a>
          <SectionNav items={navItems} label={t.navLabel} />
          <div className="site-tools">
            <a className="lang-switch" href={other.href} hrefLang={other.lang} lang={other.lang}>
              {other.label}
            </a>
            <ThemeToggle label={t.themeToggle} />
          </div>
        </div>
      </header>

      <main id="main">
        <Hero
          lang={lang}
          head={
            <>
              <p className="eyebrow rise" style={step(0)}>
                {intro.eyebrow.split(' · ').map((part, i) => (
                  <Fragment key={part}>
                    {i > 0 && ' · '}
                    <span className="nowrap">{part}</span>
                  </Fragment>
                ))}
              </p>
              <h1 className="rise" style={step(1)}>
                {site.name} <span className="aka">({site.nickname})</span>
              </h1>
            </>
          }
          intro={
            <div className="hero-intro rise" style={step(2)}>
              <p className="lead">{intro.lead}</p>
              <p className="bio">{intro.bio}</p>
              <p className="status">{intro.status}</p>
              <ul className="contact">
                <li>
                  <a href={`mailto:${site.email}`}>
                    <Mail size={16} strokeWidth={1.75} aria-hidden />
                    {site.email}
                  </a>
                </li>
                <li>
                  <External href={site.links.scholar}>
                    <GraduationCap size={16} strokeWidth={1.75} aria-hidden />
                    Google Scholar
                  </External>
                </li>
                <li>
                  <External href={site.links.github}>
                    <Github size={16} strokeWidth={1.75} aria-hidden />
                    GitHub
                  </External>
                </li>
                <li>
                  <External href={site.links.linkedin}>
                    <Linkedin size={16} strokeWidth={1.75} aria-hidden />
                    LinkedIn
                  </External>
                </li>
                <li>
                  <External href={site.links.juejin}>
                    <PenLine size={16} strokeWidth={1.75} aria-hidden />
                    {lang === 'en' ? 'Juejin' : '掘金'}
                  </External>
                </li>
              </ul>
            </div>
          }
        />

        <div className="wrap">
          <Section
            id="research"
            label={t.sections.research}
            note={
              <External href={site.links.scholar} className="section-note">
                {t.scholarNote}
                <ArrowUpRight size={13} strokeWidth={1.75} aria-hidden />
              </External>
            }
          >
            <p className="section-intro">{intro.research}</p>
            <ol className="pubs">
              {publications.map((pub) => (
                <li className="pub" key={pub.arxiv}>
                  <h3 className="pub-title" lang="en">
                    <External href={`https://arxiv.org/abs/${pub.arxiv}`}>{pub.title}</External>
                  </h3>
                  <p className="pub-authors" lang="en">
                    {pub.authors.map((author, i) => (
                      <Fragment key={author}>
                        {i > 0 && ', '}
                        {author === site.name ? <strong>{author}</strong> : author}
                      </Fragment>
                    ))}
                  </p>
                  <p className="pub-venue">
                    {t.preprint} · <span className="mono">arXiv:{pub.arxiv}</span> [{pub.category}] · {pub.date[lang]}
                  </p>
                  <p className="pub-summary">
                    <Rich text={pub.summary[lang]} />
                  </p>
                  <p className="pub-links">
                    <External href={`https://arxiv.org/abs/${pub.arxiv}`}>arXiv</External>
                    <External href={`https://arxiv.org/pdf/${pub.arxiv}`}>PDF</External>
                    {pub.code && <External href={pub.code}>Code</External>}
                  </p>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="experience" label={t.sections.experience}>
            {experience.map((entry) => (
              <EntryBlock key={entry.org.en} entry={entry} lang={lang} />
            ))}
          </Section>

          <Section id="projects" label={t.sections.projects}>
            {projects.map((entry) => (
              <EntryBlock key={entry.org.en} entry={entry} lang={lang} />
            ))}
          </Section>

          <Section id="skills" label={t.sections.skills}>
            <dl className="skills">
              {skills.map((group) => (
                <div key={group.label.en}>
                  <dt>{group.label[lang]}</dt>
                  <dd lang="en">{group.items.join(' · ')}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="education" label={t.sections.education}>
            <article className="entry">
              <header className="entry-head">
                <h3 className="entry-org">{edu.school}</h3>
                <p className="entry-date">{edu.date}</p>
              </header>
              <p className="entry-role">{edu.degree}</p>
              <ul className="facts">
                {edu.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </article>
          </Section>

          <Section id="writing" label={t.sections.writing}>
            <p>{blog.text}</p>
            <p className="cta">
              <External href={site.links.juejin} className="text-link">
                {blog.cta}
                <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden />
              </External>
            </p>
          </Section>
        </div>
      </main>

      <footer className="wrap">
        <div className="site-footer">
          <p>
            © 2026 {site.name} · {t.updated}
          </p>
          <p className="footer-links">
            <a href={`mailto:${site.email}`}>Email</a>
            <External href={site.links.scholar}>Scholar</External>
            <External href={site.links.github}>GitHub</External>
            <a href="#top">{t.backToTop} ↑</a>
          </p>
          <p className="footer-credit">
            <External href="https://visibleearth.nasa.gov/collection/1484/blue-marble">{t.imagery}</External>
          </p>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
