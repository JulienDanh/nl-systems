import { Section, Callout, Tag, DecisionMatrix, HandExampleCard, FlashcardsSection, QuizSection, S, H, D, C } from '../components/ui'
import type { HandExample } from '../components/ui'

const examples: HandExample[] = [
  { tag: "Pure CR", tagVariant: "default", board: <>T52 rainbow · J<S>♠</S>6<S>♠</S> (vs CO, ½ pot)</>, desc: "T-high · rainbow · J♠6♠ · vs CO", verdict: "agree", verdictText: "System agrees", system: "BDFD + BD straight + overcard to T → pure check-raise.", solver: "Pure CR. Agrees." },
  { tag: "Pure call/raise", tagVariant: "call", board: <>T72 (2 diamonds) · Q<D>♦</D>9 (vs BTN, 30%)</>, desc: "T-high · Q♦9 · vs BTN", verdict: "agree", verdictText: "System agrees", system: "Q♦ > 9♦; overcard + BD flush → pure play. Student folded — mistake.", solver: "Pure raise or call. Q♦ (high card diamond) better." },
  { tag: "Mix", tagVariant: "risk", board: <>K<S>♠</S> 8<H>♥</H> 4<C>♣</C></>, desc: "K-high · K8s · ½ pot", verdict: "agree", verdictText: "System agrees", system: "K8 = mix. K7 close, K6 pure fold.", solver: "Confirms K8 mix, K7 close, K6 pure fold." },
  { tag: "Super gut shot", tagVariant: "call", board: <>JT8 two-tone · 9<D>♦</D>7 (gut shot + BDFD)</>, desc: "J-high · two-tone · 9♦7 · super gut shot", verdict: "agree", verdictText: "System agrees", system: "'Super gut shot' → call. Student folded — mistake.", solver: "9-7 offsuit pure fold, but 9♦7 is played (BDFD rescues it)." },
]

export function S9Page() {
  return (
    <>
      <Section title="System 9 — Defending Flops (Calls and Raises)">
        <p>Defending the flop vs c-bet from BB (primarily BB vs RFI).</p>
        <h3>Defend buckets</h3>
        <table>
          <tr><th>Hand type</th><th>Action</th></tr>
          <tr><td>Weak/bottom pair + BDFD</td><td><Tag variant="call">Call</Tag> (BDFD &gt; good kicker)</td></tr>
          <tr><td>Bottom pair, no BDFD</td><td>Fold vs large; call vs small</td></tr>
          <tr><td>Gut shot + BDFD ("super gut shot")</td><td><Tag variant="call">Call</Tag> — turns combo draws on suit cards</td></tr>
          <tr><td>Naked gut shot (double unders)</td><td><Tag variant="fold">Fold</Tag></td></tr>
          <tr><td>Gut shot with overcard</td><td>Call/mix</td></tr>
          <tr><td>Double overs + BDFD</td><td><Tag variant="call">Pure call</Tag> (vs small bet)</td></tr>
          <tr><td>Ace-high + BDFD</td><td><Tag variant="call">Pure call</Tag> (vs small bet)</td></tr>
          <tr><td>3-straight + 3-flush (suited)</td><td>Call or check-raise</td></tr>
        </table>
      </Section>
      <Section title="Decision Matrix">
        <DecisionMatrix columns={["With BDFD", "With overcard / 3-straight", "Naked (no draws)"]} intro="Hand type (row) x draws/conditions (column). Green = call, red = fold, orange = mix."
          rows={[
            { label: "Weak pair / bottom pair", cells: [{ action: "Call", sub: "BDFD > good kicker almost always.", color: "green" }, { action: "Call", color: "green" }, { action: "Fold vs large, call vs small", color: "orange" }] },
            { label: "Gut shot", cells: [{ action: 'Call ("super gut shot")', sub: "Turns combo draws on suit cards.", color: "green" }, { action: "Call/mix", sub: "With overcard = direct outs vs value.", color: "green" }, { action: "Fold", sub: "Naked (double unders): no equity vs value range.", color: "red" }] },
            { label: "High card", labelSub: "ace-high, K-high", cells: [{ action: "Pure call (vs small)", sub: "Double overs + BDFD = pure call.", color: "green" }, { action: "Pure call", sub: "A-high + BDFD. 3-straight + 3-flush = call or CR.", color: "green" }, { action: "Fold", sub: "No BDFD, no 3-straight = naked high card.", color: "red" }] },
          ]}
        />
      </Section>
      <Section title="Three inputs for wide defending">
        <Callout><strong>Weak own range + Weak opponent range + Small bet → defend very wide.</strong></Callout>
        <h3>Check-raise criteria (properties)</h3>
        <ul><li>Direct equity vs opponent's top pair (gut shot, overcard)</li><li>Backdoor straight draw potential</li><li>Backdoor flush draw (3-to-flush)</li><li>Opponent missed the board frequently</li><li>Opponent bet small</li><li>High card of suit &gt; low card (blocks linear RFI more effectively)</li></ul>
        <h3>Risk factors</h3>
        <table>
          <tr><th>Factor</th><th>Effect</th></tr>
          <tr><td><strong>Bet sizing</strong></td><td>Scale up → fold more pairs. Q-J/K-J without ♦: call vs 30% → fold vs 83%</td></tr>
          <tr><td><strong>Rainbow vs two-tone</strong></td><td>Rainbow = messier (fewer BDFDs). Two-tone cleaner (flush draws supplement).</td></tr>
          <tr><td><strong>Blind vs blind</strong></td><td>Ranges too wide — never fold pairs (even pocket 4s with BDFD)</td></tr>
          <tr><td><strong>K8 vs half-pot</strong></td><td>Solver = mix. K7 close, K6 pure fold.</td></tr>
        </table>
      </Section>
      <Section title="Hand Examples">{examples.map((ex, i) => <HandExampleCard key={i} ex={ex} />)}</Section>
      <FlashcardsSection sys="s9" />
      <QuizSection sys="s9" />
    </>
  )
}
export default S9Page
