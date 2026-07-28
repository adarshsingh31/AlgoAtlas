import React from 'react';

const CIRCUMFERENCE = 2 * Math.PI * 44; // 276.46

export function StatsCard({ statsByDiff }) {
  const total = statsByDiff.E.total + statsByDiff.M.total + statsByDiff.H.total;
  const doneTotal = statsByDiff.E.done + statsByDiff.M.done + statsByDiff.H.done;
  const percentage = total > 0 ? Math.round((doneTotal / total) * 100) : 0;
  const remaining = total - doneTotal;

  // Calculate arc lengths for total problems per difficulty category (Background Slices)
  const easyTotalLen = total > 0 ? (statsByDiff.E.total / total) * CIRCUMFERENCE : 0;
  const medTotalLen = total > 0 ? (statsByDiff.M.total / total) * CIRCUMFERENCE : 0;
  const hardTotalLen = total > 0 ? (statsByDiff.H.total / total) * CIRCUMFERENCE : 0;

  // Calculate arc lengths for solved problems per difficulty category (Foreground Active Progress)
  const easyDoneLen = total > 0 ? (statsByDiff.E.done / total) * CIRCUMFERENCE : 0;
  const medDoneLen = total > 0 ? (statsByDiff.M.done / total) * CIRCUMFERENCE : 0;
  const hardDoneLen = total > 0 ? (statsByDiff.H.done / total) * CIRCUMFERENCE : 0;

  // Offsets for each section around the circle
  const easyOffset = 0;
  const medOffset = -easyTotalLen;
  const hardOffset = -(easyTotalLen + medTotalLen);

  return (
    <div className="stats-card">
      <div className="donut-wrap">
        <svg width="130" height="130" viewBox="0 0 104 104">
          {/* Base track */}
          <circle cx="52" cy="52" r="44" fill="none" stroke="var(--line-soft)" strokeWidth="12" />

          {/* 1. Easy Background Slice (Dim) */}
          <circle
            cx="52"
            cy="52"
            r="44"
            fill="none"
            stroke="var(--easy)"
            strokeWidth="12"
            strokeOpacity="0.22"
            strokeDasharray={`${easyTotalLen.toFixed(2)} ${CIRCUMFERENCE.toFixed(2)}`}
            strokeDashoffset={easyOffset.toFixed(2)}
          />

          {/* 2. Medium Background Slice (Dim) */}
          <circle
            cx="52"
            cy="52"
            r="44"
            fill="none"
            stroke="var(--medium)"
            strokeWidth="12"
            strokeOpacity="0.22"
            strokeDasharray={`${medTotalLen.toFixed(2)} ${CIRCUMFERENCE.toFixed(2)}`}
            strokeDashoffset={medOffset.toFixed(2)}
          />

          {/* 3. Hard Background Slice (Dim) */}
          <circle
            cx="52"
            cy="52"
            r="44"
            fill="none"
            stroke="var(--hard)"
            strokeWidth="12"
            strokeOpacity="0.22"
            strokeDasharray={`${hardTotalLen.toFixed(2)} ${CIRCUMFERENCE.toFixed(2)}`}
            strokeDashoffset={hardOffset.toFixed(2)}
          />

          {/* --- ACTIVE SOLVED PROGRESS OVERLAYS --- */}

          {/* Easy Solved Active Stroke */}
          <circle
            className="donut-seg"
            cx="52"
            cy="52"
            r="44"
            fill="none"
            stroke="var(--easy)"
            strokeWidth="12"
            strokeDasharray={`${easyDoneLen.toFixed(2)} ${CIRCUMFERENCE.toFixed(2)}`}
            strokeDashoffset={easyOffset.toFixed(2)}
            strokeLinecap="round"
          />

          {/* Medium Solved Active Stroke */}
          <circle
            className="donut-seg"
            cx="52"
            cy="52"
            r="44"
            fill="none"
            stroke="var(--medium)"
            strokeWidth="12"
            strokeDasharray={`${medDoneLen.toFixed(2)} ${CIRCUMFERENCE.toFixed(2)}`}
            strokeDashoffset={medOffset.toFixed(2)}
            strokeLinecap="round"
          />

          {/* Hard Solved Active Stroke */}
          <circle
            className="donut-seg"
            cx="52"
            cy="52"
            r="44"
            fill="none"
            stroke="var(--hard)"
            strokeWidth="12"
            strokeDasharray={`${hardDoneLen.toFixed(2)} ${CIRCUMFERENCE.toFixed(2)}`}
            strokeDashoffset={hardOffset.toFixed(2)}
            strokeLinecap="round"
          />
        </svg>

        <div className="donut-center">
          <b>{percentage}%</b>
          <small>solved</small>
        </div>
      </div>

      <div className="legend">
        <div className="legend-row">
          <div className="legend-swatch" style={{ background: 'var(--easy)' }}></div>
          <span className="legend-label">Easy</span>
          <span className="legend-count">{statsByDiff.E.done} / {statsByDiff.E.total}</span>
        </div>

        <div className="legend-row">
          <div className="legend-swatch" style={{ background: 'var(--medium)' }}></div>
          <span className="legend-label">Medium</span>
          <span className="legend-count">{statsByDiff.M.done} / {statsByDiff.M.total}</span>
        </div>

        <div className="legend-row">
          <div className="legend-swatch" style={{ background: 'var(--hard)' }}></div>
          <span className="legend-label">Hard</span>
          <span className="legend-count">{statsByDiff.H.done} / {statsByDiff.H.total}</span>
        </div>

        <div className="legend-row">
          <div className="legend-swatch" style={{ background: 'var(--line-soft)', border: '1px solid var(--line)' }}></div>
          <span className="legend-label">Remaining</span>
          <span className="legend-count">{remaining}</span>
        </div>
      </div>
    </div>
  );
}
