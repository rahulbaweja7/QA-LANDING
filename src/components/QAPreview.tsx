import React from 'react'

type PreviewCard = {
  title: string
  description: string
  icon: React.ReactNode
}

const previewCards: PreviewCard[] = [
  {
    title: 'Unit & Component Tests',
    description:
      'Fast feedback on every change with Vitest/Jest and React Testing Library.',
    icon: (
      <span aria-hidden className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/15 text-indigo-600 dark:text-indigo-300">🧪</span>
    )
  },
  {
    title: 'E2E & Accessibility',
    description: 'Critical flows covered with Playwright/Cypress and a11y checks.',
    icon: (
      <span aria-hidden className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/15 text-indigo-600 dark:text-indigo-300">🌐</span>
    )
  },
  {
    title: 'Static Analysis',
    description: 'Typescript, ESLint, and formatting guard code quality in CI.',
    icon: (
      <span aria-hidden className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/15 text-indigo-600 dark:text-indigo-300">🧰</span>
    )
  },
  {
    title: 'Monitoring & SLOs',
    description: 'Logs, traces, and alerts keep reliability visible after release.',
    icon: (
      <span aria-hidden className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/15 text-indigo-600 dark:text-indigo-300">📈</span>
    )
  }
]

export default function QAPreview() {
  return (
    <section id="preview" className="snap-start min-h-dvh flex items-center py-14 md:py-20">
      <div className="container">
        <div className="mb-10 flex items-start justify-between gap-6 md:mb-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Preview: what QA looks like</h2>
            <p className="mt-2 text-zinc-700 dark:text-zinc-300">
              Quality is a system. Here’s a quick, visual tour of the practices that keep
              software dependable without slowing teams down.
            </p>
          </div>
          <a
            className="hidden shrink-0 items-center rounded-lg border border-indigo-500/40 px-3 py-2 text-sm font-medium text-indigo-700 transition hover:-translate-y-0.5 hover:bg-indigo-500/10 md:inline-flex dark:text-indigo-300"
            href="#about"
          >
            Learn the basics
          </a>
        </div>

        {/* Delivery pipeline (animated) */}
        <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="pipeline grid grid-cols-4 items-center gap-4">
            {[
              { name: 'Plan', emoji: '📝' },
              { name: 'Build', emoji: '🧱' },
              { name: 'Test', emoji: '✅' },
              { name: 'Release', emoji: '🚀' }
            ].map((stage, index) => (
              <div key={stage.name} className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 text-lg">
                    <span aria-hidden>{stage.emoji}</span>
                  </div>
                  <div className="text-sm font-semibold">{stage.name}</div>
                </div>
                {index < 3 && (
                  <div className="pointer-events-none absolute left-[calc(2.25rem+12px)] right-[-0.5rem] top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-indigo-500/40 to-fuchsia-500/40 md:block" />
                )}
              </div>
            ))}
          </div>

          {/* subtle animated dots */}
          <div className="mt-4 flex gap-2 text-[10px] text-zinc-500">
            <span className="inline-flex animate-pulse-slow">●</span>
            <span className="inline-flex animate-pulse-slow [animation-delay:120ms]">●</span>
            <span className="inline-flex animate-pulse-slow [animation-delay:240ms]">●</span>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {previewCards.map((card) => (
            <article
              key={card.title}
              className="group relative rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10 opacity-0 blur-2xl transition group-hover:opacity-100" />
              <div className="mb-2">{card.icon}</div>
              <h3 className="text-base font-semibold">{card.title}</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{card.description}</p>
            </article>
          ))}
        </div>

        {/* Logos/stack marquee */}
        <div className="mt-8 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <div className="marquee flex gap-8 whitespace-nowrap px-5 py-3 text-sm text-zinc-600 dark:text-zinc-400">
            <span>TypeScript</span>
            <span>ESLint</span>
            <span>Prettier</span>
            <span>Vitest</span>
            <span>Playwright</span>
            <span>React Testing Library</span>
            <span>OpenTelemetry</span>
            <span>GitHub Actions</span>
            <span>Feature Flags</span>
            {/* duplicate content for seamless loop */}
            <span>TypeScript</span>
            <span>ESLint</span>
            <span>Prettier</span>
            <span>Vitest</span>
            <span>Playwright</span>
            <span>React Testing Library</span>
            <span>OpenTelemetry</span>
            <span>GitHub Actions</span>
            <span>Feature Flags</span>
          </div>
        </div>
      </div>
    </section>
  )
}


