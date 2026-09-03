# AGENTS.md — Building Learning Content from Source Transcripts

This repo contains poker training transcripts (`simple_system/*.txt`) converted into
a single-file interactive HTML study guide (`systems.html`). Follow these principles
when extending or revising that content.

## Source material handling

The source files are verbatim speech-to-text dumps — conversational, repetitive, and
sometimes garbled. Treat them as raw data, not polished prose.

- **Read the full transcript before structuring.** Every system file, end to end,
  before writing any output. The system rules are often stated early, refined in the
  middle, and only fully clear by the end.
- **Extract structure, not narration.** The transcripts narrate hand-by-hand. Your
  job is to distill the *repeating rules* (buckets, risk factors, sizing) from the
  anecdotal examples. The rules are the lesson; the hands are the evidence.
- **Flag garbled specifics.** Some exact range edges or combo counts are
  speech-to-text artifacts (e.g. "King 8 suited and 5s plus"). Encode them faithfully
  but add a note in the output if a number seems ambiguous. Never silently "fix" a
  number you're unsure about.
- **Don't copy the speaker's voice.** The transcripts use filler, hedging, and
  repetition. The output should be terse, declarative, and scannable.

## Content structure (per system)

Every system page should follow the same template. Consistency makes the study guide
navigable; variety makes it harder to learn.

1. **Scenario** — one sentence: who opened, who called, what decision we're making.
2. **Core rules / buckets** — the primary decision framework, as a table. This is the
   thing to memorize. If the system splits boards or hands into categories, those
   categories go here.
3. **Risk factors / exceptions** — what overrides the default rule, as a table. Always
   separate "primary" from "secondary" if the source does.
4. **Decision flow** — a visual flowchart (HTML/CSS nodes) when the decision tree has
   branches. Skip it if the rule is a simple table lookup.
5. **Sizing** — a short paragraph or table. Include the default and the reasoning
   ("shorter stacks amplify the overpair asymmetry → bet more").
6. **Hand examples** — 4-7 real examples from the transcript. Each shows the board,
   the system's recommendation, and the solver's verdict. Tag each with the decision
   type (default / risk / fold / call / etc.) using colored pills.
7. **Flashcards** — 8-12 Q&A pairs for active recall. Front: the question. Back: the
   answer, one sentence. These test the *rules*, not the anecdotes.
8. **Quiz** — 5-6 multiple-choice questions applying the system to new spots. Each
   has a one-sentence explanation linking back to the rule. The quiz should require
   *applying* the system, not reciting it.

## Writing for learning

- **Buckets before nuance.** Lead with the 2-3 categories the system uses. Put
  exceptions and risk factors *after* the default rule. A learner who only remembers
  the buckets will get most decisions right; the nuance is for edge cases.
- **Name the heuristic, then explain it.** "Bet top, bet bottom, check middle" is
  stickier than "polarize your range by betting strong and weak hands while checking
  medium-strength holdings." The short phrase is the memory hook.
- **Contrast pairs explicitly.** "High-high-low is NOT a risk factor; high-low-low
  (paired low under high) IS." The distinction is the lesson. Don't state one without
  the other.
- **State the counter-intuitive rule boldly.** "Bet MORE when shallow, not less."
  Most players get this wrong — that's why it's a system. Call out the leak it
  corrects.
- **Use callouts for the highest-impact points.** Green for insights, orange for
  warnings/leaks, red for critical distinctions. Don't overuse them — reserve for
  the 2-3 things per system that a student must not miss.
- **Hand examples prove the system works.** Each example should show: the board, what
  the system says, what the solver says, and whether they agree. Disagreements are
  fine and should be noted honestly ("solver mixes here; author would pure-call").
- **Flashcards test rules, not trivia.** "What are the two flop buckets?" not "What
  did the solver say on the K83 board?" The rules transfer; the anecdotes don't.
- **Quiz questions apply, don't recite.** Give a new board/hand and ask for the
  action. The student has to run the system, not remember a slide.

## HTML/build conventions

- **Single file, no dependencies.** All CSS, JS, and content inline. The file must
  open offline in any browser (including iTerm2's built-in browser).
- **Consistent component classes.** `.tag.default` (green), `.tag.risk` (orange),
  `.tag.call` (blue), `.tag.fold` (red) for decision labels. `.callout` with
  `.warn` / `.bad` / `.good` variants for highlighted boxes. `.ex-card` for hand
  examples. `.board` for notated boards.
- **Per-system IDs.** Flashcard grid `flash-sN`, quiz host `quiz-sN`, progress bar
  `prog-sN`, score `score-sN`. The JS build function uses `window['__start_sN']` so
  quizzes lazy-init on first page visit.
- **Sidebar nav.** One entry per system + primer + conclusion. Active state toggles
  via `.nav-item.active`. Mobile collapses to a hamburger menu.
- **Tag hand examples by decision type.** Each `.ex-card` starts with a colored tag
  so the student can scan: green = default/bet, orange = risk factor, red = fold,
  blue = call/defend.

## What to avoid

- **No solver-output memorization.** The source explicitly warns against treating
  solver outputs as "answers at the back of the book." The systems are human-
  executable heuristics, not solver replicas. Frame them as such.
- **No filler prose.** If a sentence doesn't carry a rule, a distinction, or a
  reason, cut it. The study guide is for scanning and recall, not reading cover to
  cover.
- **No unsourced claims.** Every rule should trace to a statement in a transcript.
  If you're inferring a rule, say so or leave it out.
- **No emoji or decorative styling.** The tags and callouts carry the visual
  hierarchy. Adding icons or color beyond the defined palette makes it harder to
  scan, not easier.
