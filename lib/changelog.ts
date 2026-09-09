export const changelog = [
  {
    version: '0.1.1', timestamp: '2026-09-09T16:30:26Z', label: '2026-09-09 · 16:30 UTC',
    title: 'A visible record of what ships',
    changes: [
      { type: 'Added', text: 'Timestamped release history with version numbers and categorized changes.' },
      { type: 'Added', text: 'Changelog navigation and a matching changelog in the source repository.' },
    ],
  },
  {
    version: '0.1.0', timestamp: '2026-09-09T16:29:52Z', label: '2026-09-09 · 16:29 UTC',
    title: 'First private preview',
    changes: [
      { type: 'Added', text: 'Game catalogue with search, category filters, and individual listing details.' },
      { type: 'Added', text: 'Persistent text feedback, input validation, and submission rate limits.' },
      { type: 'Preview', text: 'Three clearly labeled concept listings. Real games and GitHub submissions are not connected yet.' },
    ],
  },
] as const;
