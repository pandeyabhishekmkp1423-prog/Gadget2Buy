import React from 'react';
import { Layers } from 'lucide-react';

export function CategoryPills({ categories = [], selectedCategory, onSelectCategory }) {
  return (
    <div className="category-bar">
      <button
        type="button"
        className={`category-chip ${selectedCategory === '' ? 'active' : ''}`}
        onClick={() => onSelectCategory('')}
      >
        <Layers size={14} />
        <span>All Gadgets</span>
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
          onClick={() => onSelectCategory(cat)}
        >
          <span>{cat}</span>
        </button>
      ))}
    </div>
  );
}
