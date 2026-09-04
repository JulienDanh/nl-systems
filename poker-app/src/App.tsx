import { useState, useEffect } from 'react'
import { Sidebar } from './components/Sidebar'
import { SystemPage } from './components/SystemPage'
import { flashcards, quizzes, navTitles } from './data/content'

type PageId = 'primer' | 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 's7' | 's8' | 's9' | 's10' | 's11' | 's12' | 'conclusion'

function App() {
  const [page, setPage] = useState<PageId>('s1')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Inject flashcard and quiz data into window for the components to read
  useEffect(() => {
    ;(window as any).__flashcards = flashcards
    ;(window as any).__quizzes = quizzes
  }, [])

  const navigate = (p: string) => {
    setPage(p as PageId)
    setSidebarOpen(false)
    window.scrollTo(0, 0)
  }

  return (
    <div className="layout">
      <Sidebar activePage={page} onNavigate={navigate} open={sidebarOpen} />
      <main className="main">
        <div className="header-bar">
          <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>≡</button>
          <div className="crumbs" dangerouslySetInnerHTML={{ __html: navTitles[page] || '' }} />
          <span className="pill">React + Vite · 12 systems</span>
        </div>
        <SystemPage id={page} />
        <footer>No-Limit Systems Study Guide · study aid, not a solver replacement.</footer>
      </main>
    </div>
  )
}

export default App
