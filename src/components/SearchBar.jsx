import React from 'react';
import { Search, X } from 'lucide-react';

export function SearchBar({ value, onChange, placeholder = 'Search smartphones, headphones, smartwatches...' }) {
  return (
    <div className="search-wrapper">
      <div className="search-input-box">
        <Search size={18} color="var(--text-dim)" style={{ marginLeft: '0.2rem' }} />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="search-input"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="search-clear-btn"
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
