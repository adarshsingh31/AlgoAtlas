import React from 'react';
import { Search, X } from 'lucide-react';

export function Controls({ search, setSearch, diffFilter, setDiffFilter }) {
  return (
    <div className="controls-container">
      <div className="search-wrap">
        <Search className="search-icon" size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search problems by title or slug..."
        />
        {search && (
          <X className="clear-icon" size={16} onClick={() => setSearch('')} title="Clear search" />
        )}
      </div>

      <div className="diff-filter">
        {['ALL', 'E', 'M', 'H'].map((diffKey) => {
          const labels = { ALL: 'ALL', E: 'EASY', M: 'MEDIUM', H: 'HARD' };
          const isActive = diffFilter === diffKey;
          return (
            <button
              key={diffKey}
              className={`chip ${isActive ? 'active' : ''}`}
              onClick={() => setDiffFilter(diffKey)}
            >
              {labels[diffKey]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
