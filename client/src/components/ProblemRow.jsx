import React from 'react';
import { Check, ExternalLink } from 'lucide-react';
import { titleFromSlug, DIFF_NAME } from '../data/dpData';

export function ProblemRow({ slug, diff, isChecked, onToggle }) {
  const title = titleFromSlug(slug);
  const leetCodeUrl = `https://leetcode.com/problems/${slug}/`;

  return (
    <div className={`problem-row ${isChecked ? 'done' : ''}`}>
      <div
        className={`custom-checkbox ${isChecked ? 'checked' : ''}`}
        onClick={() => onToggle(slug)}
        title={isChecked ? "Mark as unsolved" : "Mark as solved"}
      >
        {isChecked && <Check size={14} strokeWidth={3} />}
      </div>

      <a
        className="problem-title"
        href={leetCodeUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{title}</span>
        <ExternalLink size={13} className="ext-icon" />
      </a>

      <div className={`tag ${diff}`} title={`Difficulty: ${DIFF_NAME[diff]}`}>
        {DIFF_NAME[diff]}
      </div>
    </div>
  );
}
