import { Section, Callout, Tag, Code, DecisionMatrix, HandExampleCard, FlashcardsSection, QuizSection, S, H, D, C } from '../components/ui'
import type { HandExample } from '../components/ui'

const examples: HandExample[] = [
  { tag: "Bucket 1 · clean", tagVariant: "default", board: <>J<S>♠</S> 8<D>♦</D> 4<C>♣</C></>, desc: "J-high · disconnected · no straights", verdict: "agree", verdictText: "System agrees", system: "T-high+ clean → c-bet 100%. Hero checked — mistake.", solver: "~100% c-bet to 40%. Agrees." },
  { tag: "Bucket 1 · clean", tagVariant: "default", board: <>K<S>♠</S> K<D>♦</D> 3<C>♣</C></>, desc: "K-high · high-high-low · rainbow", verdict: "agree", verdictText: "System agrees", system: "High-high-low is NOT a risk factor → c-bet 100%.", solver: "~100% c-bet. Agrees." },
  { tag: "Bucket 1 · clean", tagVariant: "default", board: <>K<S>♠</S> 8<H>♥</H> 3<H>♥</H></>, desc: "K-high · 8 · 3 · two-tone", verdict: "agree", verdictText: "System agrees", system: "No risk factor → bet 100% — AK, AA, QJ, JTs, 77, everything.", solver: "~100% c-bet, 0 checks, 40%. Agrees." },
  { tag: "Risk: ace-high monotone", tagVariant: "risk", board: <>A<H>♥</H>9<H>♥</H>5<H>♥</H></>, desc: "A-high · ace-monotone", verdict: "agree", verdictText: "System agrees", system: "Risk factor → slow down. But QJo no-heart is trash → still bet.", solver: "Checks T9s, KK no-heart, A3s. Bets QJ no-heart. QJ with heart → checks." },
  { tag: "Risk: high-low-low (J66)", tagVariant: "risk", board: <>J<C>♣</C>6<D>♦</D>6<S>♠</S></>, desc: "J-high · high-low-low · J66", verdict: "agree", verdictText: "System agrees", system: "High-low-low → check ~50%.", solver: "Bets A6s, 76s, 65s, trips, JJ/TT; checks TT–77, AK, ATs." },
  { tag: "Risk: high-low-low (T55)", tagVariant: "risk", board: <>T<S>♠</S>5<H>♥</H>5<D>♦</D></>, desc: "T-high · high-low-low · T55 · rainbow", verdict: "agree", verdictText: "System agrees", system: "Even though T-high+, paired-low wins → mix, not 100%.", solver: "Bets A5s, 5x, TT, JJ; checks 99–66, A9, A8, AQ, AK." },
]

export function S1Page() {
  return (
    <>
      <Section title="System 1 — UTG RFI vs BB Call · C-betting">
        <p>UTG opens, BB calls, BB checks. We decide our flop c-bet.</p>
        <h3>Two flop buckets</h3>
        <table>
          <tr><th>Bucket</th><th>Boards</th><th>Default</th></tr>
          <tr><td><strong>1 · T-high+</strong></td><td>T, J, Q, K, A high</td><td><Tag variant="default">C-bet 100%</Tag> Subject to risk factors.</td></tr>
          <tr><td><strong>2 · 9-high & below</strong></td><td>9-high to trips-deuces</td><td><Tag variant="risk">~70/30 bet/check</Tag> Strong+weak bet; medium checks.</td></tr>
        </table>
        <Callout>Bucket 1 occurs far more often — one ace makes a flop ace-high. Highest-ROI piece.</Callout>
        <h3>Why bet 100% on T-high+?</h3>
        <p><strong>Overpair asymmetry</strong>: UTG has far more strong pairs than BB caller. Shorter stacks amplify → bet more. Deeper → more caution.</p>
        <Callout variant="warn"><strong>Bet MORE when shallow, not less.</strong> Most players do the opposite — correct the leak.</Callout>
        <h3>Sizing</h3>
        <p>Start at <Code>1/4 to 1/3 pot</Code>. Solver examples land at 25–40%.</p>
      </Section>

      <Section title="Decision Matrix">
        <DecisionMatrix
          columns={["No risk factor (clean)", "Risk factor present"]}
          intro="Find your flop bucket (row) x risk factor presence (column). Green = c-bet 100%, orange = mix."
          rows={[
            { label: "T-high+", labelSub: "T, J, Q, K, A high", cells: [
              { action: "C-bet 100%", sub: "Every hand — hit or miss. Small size (~25–40%). No checks.", color: "green" },
              { action: "Mix — bet strong + weak", sub: "See risk factors below.", color: "orange" },
            ]},
            { label: "9-high & below", labelSub: "always", cells: [
              { action: "Always mix (~70/30)", sub: "Default — no 100% exists.", color: "orange" },
              { action: "Mix", sub: "\u00a0", color: "orange" },
            ]},
          ]}
        />
      </Section>

      <Section title={'Risk Factors (override "c-bet 100%")'}>
        <h3>1. Straights possible <Tag variant="risk">primary</Tag></h3>
        <ul><li><strong>1 straight</strong> → still bet frequently.</li><li><strong>3 straights</strong> → slow down heavily.</li></ul>
        <h3>2. Ace-high monotone <Tag variant="risk">secondary</Tag></h3>
        <p>Bet very strong (flush, sets) + very weak (trash); check medium (88 no-heart, weak aces, KK no-heart).</p>
        <h3>3. AKx family <Tag variant="risk">secondary</Tag></h3>
        <p>AK2, AK3, AK4 — "looks like that." Slow down.</p>
        <h3>4. Stack depth <Tag variant="risk">secondary</Tag></h3>
        <p>Deeper (→150bb) → caution. Shallower (→20bb) → lean into 100%.</p>
        <h3>5. High-Low-Low (paired low card) <Tag variant="risk">secondary</Tag></h3>
        <p>High card (T–A) with two paired low cards: <Code>A22, K33, Q33, J66, T55</Code>.</p>
        <ul><li><strong>Bet:</strong> trips, overpairs (JJ, TT), very weak.</li><li><strong>Check:</strong> underpairs (99–66), medium aces, AK/AQ/AT.</li><li><strong>Blocker nuance:</strong> ATo bets more when ace blocks backdoor FD CRs.</li></ul>
        <Callout variant="bad"><strong>Not High-High-Low.</strong> KK3 rainbow is <em>not</em> a risk factor — c-bet 100%. Only paired low under high counts.</Callout>
      </Section>

      <Section title="Hand Examples">
        {examples.map((ex, i) => <HandExampleCard key={i} ex={ex} />)}
      </Section>

      <FlashcardsSection sys="s1" />
      <QuizSection sys="s1" />
    </>
  )
}

export default S1Page
