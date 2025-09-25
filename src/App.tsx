import './App.css'
import { useEffect, useState } from 'react'
import QAPreview from './components/QAPreview'

type TimelineItem = {
  period: string
  title: string
  description: string
}

const qaTimeline: TimelineItem[] = [
  {
    period: '1920s–1940s',
    title: 'Inspection Era',
    description:
      'Quality focused on end-of-line inspection in manufacturing. Defects were identified after production.'
  },
  {
    period: '1950s–1970s',
    title: 'Statistical Quality Control',
    description:
      'Pioneers like Deming and Juran introduced process control, sampling, and continuous improvement (PDCA).'
  },
  {
    period: '1980s–1990s',
    title: 'Total Quality Management',
    description:
      'Quality became an organization-wide responsibility. Standards like ISO 9001 emerged.'
  },
  {
    period: '2000s',
    title: 'Software QA Matures',
    description:
      'Testing methodologies, automation tools, and risk-based testing gained wide adoption.'
  },
  {
    period: '2010s–Present',
    title: 'Shift-Left and DevOps',
    description:
      'Quality is built-in from the start with CI/CD, test automation, observability, and QA as quality engineering.'
  }
]

function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('qa-theme')
      if (stored) return stored === 'dark'
      // Default to dark if no stored preference
      return true
    } catch (_) {
      // Fallback to current DOM state if storage is unavailable
      return typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
    }
  })

  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    if (isDark) {
      root.classList.add('dark')
      body.classList.add('dark')
      localStorage.setItem('qa-theme', 'dark')
    } else {
      root.classList.remove('dark')
      body.classList.remove('dark')
      localStorage.setItem('qa-theme', 'light')
    }
  }, [isDark])
  // Parallax state for hero blobs
  const [parallaxY, setParallaxY] = useState<number>(0)

  useEffect(() => {
    const onScroll = () => {
      // Small parallax: move blobs at ~5% of scroll delta, clamped
      const y = Math.max(-40, Math.min(40, window.scrollY * 0.05))
      setParallaxY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Gentle page transition on in-page navigation
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!link) return
      document.body.classList.add('is-navigating')
      setTimeout(() => document.body.classList.remove('is-navigating'), 300)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="page-transition min-h-dvh bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/80 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/70">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span title="Quality Assurance" aria-label="Quality Assurance" className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white shadow-sm">QA</span>
            <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Quality Assurance (QA)</span>
          </div>
          <div className="flex items-center gap-3">
            <nav className="hidden gap-6 text-sm text-indigo-600 md:flex">
              <a className="hover:underline underline-offset-4" href="#preview">Preview</a>
              <a className="hover:underline underline-offset-4" href="#about">What is QA</a>
              <a className="hover:underline underline-offset-4" href="#history">History</a>
              <a className="hover:underline underline-offset-4" href="#why">Why QA</a>
            </nav>
            <button
              type="button"
              aria-label="Toggle color mode"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              onClick={() => setIsDark((v) => !v)}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <span className="sr-only">Theme</span>
              <svg
                className={`h-5 w-5 ${isDark ? 'hidden' : 'block'}`}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <svg
                className={`h-5 w-5 ${isDark ? 'block' : 'hidden'}`}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="snap-y-mandatory">
        <section className="relative overflow-hidden snap-start min-h-dvh flex items-center">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-500/20 via-transparent to-transparent dark:from-indigo-400/15" />
          <div className="parallax" style={{ ['--py' as any]: `${parallaxY}px` }}>
            <div className="pointer-events-none absolute -top-16 -left-24 -z-10 h-64 w-64 rounded-full bg-indigo-500/30 blob" style={{ ['--dur' as any]: '18s' }} />
            <div className="pointer-events-none absolute -bottom-20 -right-16 -z-10 h-72 w-72 rounded-full bg-fuchsia-500/25 blob" style={{ ['--dur' as any]: '22s' }} />
          </div>
          <div className="container py-20 md:py-28">
            <div className="max-w-2xl">
              <p className="mb-3 inline-flex items-center rounded-full bg-indigo-600/10 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20 dark:text-indigo-300">Intro</p>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                <span className="bg-gradient-to-r from-indigo-300 via-indigo-100 to-indigo-300 bg-clip-text text-transparent dark:from-indigo-400 dark:via-fuchsia-300 dark:to-indigo-400">Build quality in</span>, from day one.
              </h1>
              <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                A quick introduction to Quality Assurance and how it evolved from inspection to
                quality engineering in modern software delivery.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <a className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950" href="#about">Learn about QA</a>
                <a className="inline-flex items-center rounded-lg border border-indigo-500/40 px-4 py-2.5 text-sm font-medium text-indigo-700 transition hover:-translate-y-0.5 hover:bg-indigo-500/10 dark:text-indigo-300" href="#history">Explore the history</a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="snap-start min-h-dvh flex items-center py-14 md:py-20">
          <div className="container">
            <div className="grid items-start gap-8 md:grid-cols-12">
              <div className="md:col-span-5">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">What is Quality Assurance?</h2>
              </div>
              <div className="md:col-span-7">
                <p className="text-zinc-700 dark:text-zinc-300">
                  Quality Assurance (QA) is the disciplined practice of ensuring products meet
                  defined requirements and user expectations. In software, QA covers the entire
                  lifecycle—from requirements and design through development, testing, release,
                  and operation. QA emphasizes prevention over detection by improving processes,
                  enabling fast feedback, and making quality a shared responsibility.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-zinc-700 marker:text-zinc-400 dark:text-zinc-300">
                  <li className="list-disc pl-4">Process focus: prevent defects early rather than catching them late.</li>
                  <li className="list-disc pl-4">Evidence-based: use metrics, tests, and reviews to guide decisions.</li>
                  <li className="list-disc pl-4">Collaboration: developers, testers, and ops partner to deliver quality.</li>
                  <li className="list-disc pl-4">User-centered: quality is defined by value delivered to users.</li>
                </ul>
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="group relative rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/15 text-indigo-600 dark:text-indigo-300">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12h16M12 4v16"/></svg>
                </div>
                <h3 className="text-base font-semibold">Shift-left testing</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Catch issues where they start: requirements, design, and code review.</p>
              </div>
              <div className="group relative rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/15 text-indigo-600 dark:text-indigo-300">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7h18M3 12h12M3 17h6"/></svg>
                </div>
                <h3 className="text-base font-semibold">CI/CD & automation</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Automated tests and checks on every commit to keep quality always green.</p>
              </div>
              <div className="group relative rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/15 text-indigo-600 dark:text-indigo-300">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 12a9 9 0 1 0 18 0A9 9 0 0 0 3 12Zm9-5v5l3 3"/></svg>
                </div>
                <h3 className="text-base font-semibold">Observability</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Tracing, logs, and SLOs make quality measurable in production.</p>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <h4 className="text-sm font-semibold">Quick wins checklist</h4>
              <ul className="mt-2 grid gap-2 text-sm text-zinc-700 dark:text-zinc-300 md:grid-cols-2">
                <li className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500"/>Lint + type-check in CI</li>
                <li className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500"/>Pre-commit tests</li>
                <li className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500"/>Critical paths covered by E2E</li>
                <li className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500"/>Error budgets and alerts</li>
              </ul>
            </div>
          </div>
        </section>

        <QAPreview />

        <section id="history" className="snap-start min-h-dvh flex items-center bg-white py-14 dark:bg-zinc-900 md:py-20">
          <div className="container">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight md:mb-10 md:text-3xl">History of QA</h2>
            <div className="grid gap-4">
              {qaTimeline.map((item) => (
                <article key={item.period} className="grid grid-cols-[140px_1fr] items-start gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{item.period}</div>
                  <div>
                    <h3 className="m-0 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300">Inspection → Prevention</span>
                <span className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300">SQC</span>
                <span className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300">TQM</span>
                <span className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300">Automation</span>
                <span className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300">DevOps & Shift-left</span>
              </div>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">Across a century, QA moved from late-stage inspection to proactive engineering with data, feedback loops, and continuous delivery.</p>
            </div>
          </div>
        </section>

        <section id="why" className="snap-start min-h-dvh flex items-center py-14 md:py-20">
          <div className="container">
            <h2 className="mb-8 text-2xl font-semibold tracking-tight md:text-3xl">Why QA matters</h2>
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900">
                <div className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">30%+</div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">defect reduction</div>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900">
                <div className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">2×</div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">faster release cadence</div>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900">
                <div className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">↑</div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">higher user satisfaction</div>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="group relative rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-indigo-500/15 to-fuchsia-500/15 opacity-0 blur-2xl transition group-hover:opacity-100" />
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/15 text-indigo-600 dark:text-indigo-300">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.95-6.95-2.12 2.12M7.05 16.95l-2.12 2.12M16.95 16.95l2.12 2.12M7.05 7.05 4.93 4.93"/></svg>
                </div>
                <h3 className="text-lg font-semibold">Reduce Risk</h3>
                <p className="mt-1 text-zinc-600 dark:text-zinc-400">Prevent costly defects and outages through early feedback and automation.</p>
              </div>
              <div className="group relative rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-fuchsia-500/15 to-indigo-500/15 opacity-0 blur-2xl transition group-hover:opacity-100" />
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/15 text-indigo-600 dark:text-indigo-300">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7h18M3 12h12M3 17h6"/></svg>
                </div>
                <h3 className="text-lg font-semibold">Accelerate Delivery</h3>
                <p className="mt-1 text-zinc-600 dark:text-zinc-400">CI/CD and reliable tests enable frequent, confident releases.</p>
              </div>
              <div className="group relative rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-indigo-500/15 to-fuchsia-500/15 opacity-0 blur-2xl transition group-hover:opacity-100" />
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/15 text-indigo-600 dark:text-indigo-300">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21s-6-4.35-6-9a6 6 0 1 1 12 0c0 4.65-6 9-6 9Z"/></svg>
                </div>
                <h3 className="text-lg font-semibold">Delight Users</h3>
                <p className="mt-1 text-zinc-600 dark:text-zinc-400">Stable, accessible, and performant experiences build trust and loyalty.</p>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h3 className="text-base font-semibold">Get started checklist</h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Adopt a few practices this week to elevate quality without slowing down.</p>
                </div>
                <a className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-500" href="#about">Start now</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 py-6 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
        <div className="container">
          <p>© {new Date().getFullYear()} QA Overview. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
