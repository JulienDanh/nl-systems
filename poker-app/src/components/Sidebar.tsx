import { useState } from 'react'
import type { QuizQuestion } from '../data/content'

interface SidebarProps {
  activePage: string
  onNavigate: (page: string) => void
  open: boolean
}

const SYSTEMS = [
  { id: 's1', label: 'UTG vs BB · C-bet', num: '1' },
  { id: 's2', label: 'BTN vs BB · C-bet', num: '2' },
  { id: 's3', label: 'BB vs SB Limp Stab', num: '3' },
  { id: 's4', label: 'River Bluffing', num: '4' },
  { id: 's5', label: 'Barreling Med Hands', num: '5' },
  { id: 's6', label: 'Check-Raising Top Pair', num: '6' },
  { id: 's7', label: 'C-bet Folding Flops', num: '7' },
  { id: 's8', label: 'Bet Sizing IP', num: '8' },
  { id: 's9', label: 'Defending Flops', num: '9' },
  { id: 's10', label: 'River Value Betting', num: '10' },
  { id: 's11', label: 'Hero Calling', num: '11' },
  { id: 's12', label: 'Defending 3-Bets OOP', num: '12' },
]

export function Sidebar({ activePage, onNavigate, open }: SidebarProps) {
  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="brand">
        <h1>No-Limit Systems</h1>
        <div className="sub">Complete Study Guide</div>
      </div>
      <div className="nav-group">
        <div className="nav-label">Fundamentals</div>
        <div
          className={`nav-item ${activePage === 'primer' ? 'active' : ''}`}
          onClick={() => onNavigate('primer')}
        >
          <span className="num">·</span> Preflop Primer
        </div>
      </div>
      <div className="nav-group">
        <div className="nav-label">Systems</div>
        {SYSTEMS.map((s) => (
          <div
            key={s.id}
            className={`nav-item ${activePage === s.id ? 'active' : ''}`}
            onClick={() => onNavigate(s.id)}
          >
            <span className="num">{s.num}</span> {s.label}
          </div>
        ))}
      </div>
      <div className="nav-group">
        <div className="nav-label">Summary</div>
        <div
          className={`nav-item ${activePage === 'conclusion' ? 'active' : ''}`}
          onClick={() => onNavigate('conclusion')}
        >
          <span className="num">·</span> Cross-System Principles
        </div>
      </div>
    </aside>
  )
}

export function Flashcards({ cards }: { cards: [string, string][] }) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set())

  const toggle = (i: number) => {
    setFlipped((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  if (!cards.length) return null

  return (
    <div className="cards-grid">
      {cards.map((card: [string, string], i: number) => (
        <div
          key={i}
          className={`flip ${flipped.has(i) ? 'flipped' : ''}`}
          onClick={() => toggle(i)}
        >
          <div className="flip-inner">
            <div className="face">
              <div className="q">{card[0]}</div>
              <div className="hint">tap to reveal</div>
            </div>
            <div className="face back">
              <div className="a">{card[1]}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [showEx, setShowEx] = useState(false)
  const [done, setDone] = useState(false)

  if (!questions.length) return null
  if (done) {
    return (
      <div className="quiz-card" style={{ textAlign: 'center' }}>
        <h3 style={{ border: 'none', padding: 0 }}>
          Done — {score} / {questions.length}
        </h3>
        <p className="muted">
          {score === questions.length
            ? 'Clean run.'
            : score >= questions.length * 0.7
            ? 'Solid. Review the flashcards.'
            : 'Re-read this system and retry.'}
        </p>
        <button
          className="btn"
          onClick={() => {
            setIdx(0)
            setScore(0)
            setPicked(null)
            setShowEx(false)
            setDone(false)
          }}
        >
          Retake
        </button>
      </div>
    )
  }

  const item = questions[idx]
  const progress = (idx / questions.length) * 100

  const handlePick = (i: number) => {
    if (picked !== null) return
    setPicked(i)
    if (i === item.a) setScore(score + 1)
    setShowEx(true)
    setTimeout(() => {
      if (idx + 1 >= questions.length) setDone(true)
      else {
        setIdx(idx + 1)
        setPicked(null)
        setShowEx(false)
      }
    }, 1400)
  }

  return (
    <>
      <div className="progress">
        <div style={{ width: `${progress}%` }} />
      </div>
      <div className="score">
        Score {score} / {questions.length}
      </div>
      <div className="quiz-card">
        <div className="quiz-q">
          Q{idx + 1}/{questions.length}. {item.q}
        </div>
        <div className="choices">
          {item.o.map((opt: string, i: number) => (
            <button
              key={i}
              className={`btn ${
                picked !== null && i === item.a
                  ? 'correct'
                  : picked === i && i !== item.a
                  ? 'wrong'
                  : ''
              }`}
              disabled={picked !== null}
              onClick={() => handlePick(i)}
            >
              {opt}
            </button>
          ))}
        </div>
        {showEx && (
          <div className="explanation" style={{ display: 'block' }}>
            <strong>{picked === item.a ? 'Correct.' : 'Not quite.'}</strong>{' '}
            {item.why}
          </div>
        )}
      </div>
    </>
  )
}
