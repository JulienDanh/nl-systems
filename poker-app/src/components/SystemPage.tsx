import { Flashcards, Quiz } from './Sidebar'

// Raw HTML content for each system page, loaded from the build output
// These are the inner HTML of each <div class="page"> from the vanilla systems.html
// We load them at build time via Vite's raw imports

const pageModules = import.meta.glob('../pages/*.html', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

function getPageHtml(id: string): string {
  const key = `../pages/${id}.html`
  const html = pageModules[key] || ''
  // Strip the outer <div class="page..."> wrapper
  return html.replace(/<div class="page[^"]*" id="page-[^"]*">/, '').replace(/<\/div>\s*$/, '')
}

export function SystemPage({ id }: { id: string }) {
  const html = getPageHtml(id)

  // Split the HTML at the flashcards/quiz sections so we can inject React components
  const flashMarker = '<section><h2>Flashcards</h2>'
  const quizMarker = '<section><h2>Quiz</h2>'

  const flashIdx = html.indexOf(flashMarker)
  const quizIdx = html.indexOf(quizMarker)

  let contentHtml = html
  let hasFlash = false
  let hasQuiz = false

  if (flashIdx !== -1) {
    contentHtml = html.substring(0, flashIdx)
    hasFlash = true
  }
  if (quizIdx !== -1) {
    contentHtml = contentHtml.substring(0, contentHtml.indexOf(quizMarker) === -1 ? contentHtml.length : contentHtml.indexOf(quizMarker))
    hasQuiz = true
  }

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      {hasFlash && (
        <section className="section">
          <h2>Flashcards</h2>
          <Flashcards sys={id} />
        </section>
      )}
      {hasQuiz && (
        <section className="section">
          <h2>Quiz</h2>
          <Quiz sys={id} />
        </section>
      )}
    </>
  )
}
