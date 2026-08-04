import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="wrap">
      <section className="hero">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">
              <span className="dot"></span>213 PATTERNS MAPPED · AUTO-SAVED LOCALLY
            </div>
            <h1>Stop grinding<br/>random problems.<br/><span className="accent">Learn the pattern.</span></h1>
            <p className="hero-sub">AlgoAtlas groups curated LeetCode problems by the recurrence idea or traversal pattern behind them — not by difficulty label. Drill one idea until it clicks, then move on.</p>
            <div className="hero-actions">
              <a href="#sheets" className="btn-primary">Explore Sheets →</a>
              <a href="#how" className="btn-ghost">How it works</a>
            </div>
            <div className="trust-row">
              <div className="trust-item"><span className="trust-num">290+</span><span className="trust-label">PROBLEMS</span></div>
              <div className="trust-item"><span className="trust-num">3</span><span className="trust-label">PATTERN SHEETS</span></div>
              <div className="trust-item"><span className="trust-num">0 cost</span><span className="trust-label">FOREVER</span></div>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card-top">
              <span className="hc-title">Your Progress</span>
              <span className="hc-tag">8 / 290</span>
            </div>
            <div className="ring-row">
              <div className="ring-wrap">
                <svg viewBox="0 0 128 128">
                  <circle cx="64" cy="64" r="54" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10"/>
                  <circle cx="64" cy="64" r="54" fill="none" stroke="#7c7ff5" strokeWidth="10" strokeDasharray="339" strokeDashoffset="330" strokeLinecap="round"/>
                </svg>
                <div className="ring-center">
                  <span className="ring-pct">3%</span>
                  <span className="ring-label">SOLVED</span>
                </div>
              </div>
              <div className="legend">
                <div className="legend-row">
                  <div className="legend-left"><span className="swatch" style={{ background: 'var(--indigo)' }}></span>DP Sheet</div>
                  <span className="legend-val">8 / 221</span>
                </div>
                <div className="legend-row">
                  <div className="legend-left"><span className="swatch" style={{ background: 'var(--green)' }}></span>Tree Sheet</div>
                  <span className="legend-val">0 / 35</span>
                </div>
                <div className="legend-row">
                  <div className="legend-left"><span className="swatch" style={{ background: 'var(--amber)' }}></span>Graph Sheet</div>
                  <span className="legend-val">0 / 34</span>
                </div>
              </div>
            </div>
            <div className="hc-bar-track"><div className="hc-bar-fill"></div></div>
            <div className="hc-foot"><span>3 pattern sheets · 213 sub-patterns</span><span>next: Knapsack</span></div>
          </div>
        </div>
      </section>

      <section className="section" id="sheets">
        <div className="section-head">
          <span className="section-kicker">Pattern Sheets</span>
          <h2>Three tracks. One recurring idea each.</h2>
          <p>Every sheet is broken into sub-patterns you expand one at a time — so your progress bar means "I understand this idea," not just "I clicked a checkbox."</p>
        </div>
        <div className="sheet-grid">
          <div className="sheet-card dp">
            <div className="sc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 19V5m0 14h16M8 19v-6m4 6V9m4 10v-4"/>
              </svg>
            </div>
            <div className="sc-title">DP Sheet</div>
            <div className="sc-desc">Linear DP, knapsack, intervals, digit DP, and 11 more recurrence families — 221 problems in total.</div>
            <div className="sc-foot"><div className="sc-progress-track"><div className="sc-progress-fill"></div></div><span className="sc-count">8/221</span></div>
          </div>
          <div className="sheet-card tree">
            <div className="sc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 3v6M12 9L6 15M12 9l6 6M6 15v6M18 15v6"/>
                <circle cx="12" cy="4.5" r="1.5" fill="currentColor" stroke="none"/>
                <circle cx="6" cy="16.5" r="1.5" fill="currentColor" stroke="none"/>
                <circle cx="18" cy="16.5" r="1.5" fill="currentColor" stroke="none"/>
              </svg>
            </div>
            <div className="sc-title">Tree Sheet</div>
            <div className="sc-desc">Traversals, BSTs, LCA, tries, and tree-DP — grouped by the shape of recursion they share.</div>
            <div className="sc-foot"><div className="sc-progress-track"><div className="sc-progress-fill"></div></div><span className="sc-count">0/35</span></div>
          </div>
          <div className="sheet-card graph">
            <div className="sc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="5" cy="6" r="2"/>
                <circle cx="19" cy="6" r="2"/>
                <circle cx="12" cy="18" r="2"/>
                <path d="M6.6 7.4L11 16.5M17.4 7.4L13 16.5M7 6h10"/>
              </svg>
            </div>
            <div className="sc-title">Graph Sheet</div>
            <div className="sc-desc">BFS/DFS, union-find, shortest paths, and topological sort — organized by traversal strategy.</div>
            <div className="sc-foot"><div className="sc-progress-track"><div className="sc-progress-fill"></div></div><span className="sc-count">0/34</span></div>
          </div>
        </div>
      </section>

      <section className="section" id="how">
        <div className="section-head">
          <span className="section-kicker">How it works</span>
          <h2>Built for the way you actually forget things.</h2>
          <p>Difficulty tags tell you nothing about *why* a problem is hard. Pattern grouping does.</p>
        </div>
        <div className="how-grid">
          <div className="how-step">
            <span className="how-idx">01 / PICK A PATTERN</span>
            <h3>Open one sub-category</h3>
            <p>Expand "Linear DP" or "Knapsack" instead of a random Hard-tagged problem. Each group is small enough to actually finish.</p>
          </div>
          <div className="how-step">
            <span className="how-idx">02 / DRILL THE RECURRENCE</span>
            <h3>Solve until it's automatic</h3>
            <p>Work through easy → medium → hard inside the same idea, so the recurrence relation gets reinforced, not re-learned each time.</p>
          </div>
          <div className="how-step">
            <span className="how-idx">03 / TRACK WHAT STICKS</span>
            <h3>Progress saves in your browser</h3>
            <p>No account, no server. Your ring, your bars, your streak — all stored locally and there when you come back.</p>
          </div>
        </div>
      </section>

      <section className="section" id="difficulty">
        <div className="section-head">
          <span className="section-kicker">Coverage</span>
          <h2>Every difficulty, inside every pattern.</h2>
          <p>So you're not stuck doing only Easy problems in a topic you already know.</p>
        </div>
        <div className="diff-strip">
          <div className="diff-item easy"><span className="diff-dot"></span><div className="diff-text"><div className="diff-name">Easy</div><div className="diff-count">warm-ups per pattern</div></div></div>
          <div className="diff-divider"></div>
          <div className="diff-item medium"><span className="diff-dot"></span><div className="diff-text"><div className="diff-name">Medium</div><div className="diff-count">the interview core</div></div></div>
          <div className="diff-divider"></div>
          <div className="diff-item hard"><span className="diff-dot"></span><div className="diff-text"><div className="diff-name">Hard</div><div className="diff-count">edge cases & combos</div></div></div>
        </div>
      </section>

      <section className="cta-band">
        <h2>Your ring is at <span style={{ color: 'var(--indigo)' }}>3%</span>. Let's move it.</h2>
        <p>Pick a sheet — DP, Tree, or Graph — expand a pattern, solve one problem. That's the whole method.</p>
        <div className="cta-actions">
          <a href="#sheets" className="btn-primary">Explore Sheets →</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
