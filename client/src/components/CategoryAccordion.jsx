import React from 'react';
import { ChevronDown } from 'lucide-react';
import { ProblemRow } from './ProblemRow';

export function CategoryAccordion({
  category,
  catIndex,
  isOpen,
  onToggleOpen,
  filteredProblems,
  checkedState,
  onToggleProblem
}) {
  const totalInCat = category.problems.length;
  const doneInCat = category.problems.filter(([slug]) => !!checkedState[slug]).length;
  const pct = totalInCat > 0 ? (doneInCat / totalInCat) * 100 : 0;
  const indexLabel = String(catIndex + 1).padStart(2, '0');

  return (
    <div className="category-card">
      <div className="cat-header" onClick={onToggleOpen}>
        <div className="cat-index">{indexLabel}</div>
        <div className="cat-name">{category.name}</div>
        
        <div className="cat-bar-wrap">
          <div className="cat-bar">
            <div className="cat-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="cat-count">
            {doneInCat}/{totalInCat}
          </div>
        </div>

        <ChevronDown className={`chevron-icon ${isOpen ? 'open' : ''}`} size={16} />
      </div>

      {isOpen && (
        <div className="cat-body">
          {filteredProblems.length === 0 ? (
            <div className="empty-msg" style={{ border: 'none', borderRadius: 0, padding: '20px' }}>
              No problems match your filters in this category.
            </div>
          ) : (
            filteredProblems.map(([slug, diff]) => (
              <ProblemRow
                key={slug}
                slug={slug}
                diff={diff}
                isChecked={!!checkedState[slug]}
                onToggle={onToggleProblem}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
