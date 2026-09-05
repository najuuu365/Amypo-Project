import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchFilter = ({
  searchTerm = '',
  onSearchChange,
  placeholder = 'Search campaigns or creators...',
  categories = [],
  selectedCategory = '',
  onCategoryChange
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}
    >
      <div style={{ position: 'relative', flex: '1 1 280px' }}>
        <span
          style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Search size={16} />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '0.75rem 1rem 0.75rem 2.5rem',
            borderRadius: '8px',
            backgroundColor: '#0b0f19',
            border: '1px solid #1e293b',
            color: '#f8fafc',
            outline: 'none',
            fontSize: '0.95rem'
          }}
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            style={{
              position: 'absolute',
              right: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {categories.length > 0 && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === (cat.id || cat);
            return (
              <button
                key={cat.id || cat}
                type="button"
                onClick={() => onCategoryChange(cat.id || cat)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  border: isSelected ? '1px solid #3b82f6' : '1px solid #1e293b',
                  backgroundColor: isSelected ? '#1e3a8a' : '#111827',
                  color: isSelected ? '#ffffff' : '#94a3b8',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat.label || cat}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
