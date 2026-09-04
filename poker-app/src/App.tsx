import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { navTitles } from './data/content'
import { PrimerPage } from './pages/Primer'
import { S1Page } from './pages/S1'
import { S2Page } from './pages/S2'
import { S3Page } from './pages/S3'
import { S4Page } from './pages/S4'
import { S5Page } from './pages/S5'
import { S6Page } from './pages/S6'
import { S7Page } from './pages/S7'
import { S8Page } from './pages/S8'
import { S9Page } from './pages/S9'
import { S10Page } from './pages/S10'
import { S11Page } from './pages/S11'
import { S12Page } from './pages/S12'
import { ConclusionPage } from './pages/Conclusion'

type PageId = 'primer' | 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 's7' | 's8' | 's9' | 's10' | 's11' | 's12' | 'conclusion'

const PAGES: Record<PageId, React.FC> = {
  primer: PrimerPage, s1: S1Page, s2: S2Page, s3: S3Page, s4: S4Page,
  s5: S5Page, s6: S6Page, s7: S7Page, s8: S8Page, s9: S9Page,
  s10: S10Page, s11: S11Page, s12: S12Page, conclusion: ConclusionPage,
}

function App() {
  const [page, setPage] = useState<PageId>('s1')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigate = (p: string) => {
    setPage(p as PageId)
    setSidebarOpen(false)
    window.scrollTo(0, 0)
  }

  const PageComponent = PAGES[page]

  return (
    <div className="layout">
      <Sidebar activePage={page} onNavigate={navigate} open={sidebarOpen} />
      <main className="main">
        <div className="header-bar">
          <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>≡</button>
          <div className="crumbs" dangerouslySetInnerHTML={{ __html: navTitles[page] || '' }} />
          <span className="pill">React + Vite · 12 systems</span>
        </div>
        <PageComponent />
        <footer>No-Limit Systems Study Guide · study aid, not a solver replacement.</footer>
      </main>
    </div>
  )
}

export default App
