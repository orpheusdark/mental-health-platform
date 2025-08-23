import React, { useState } from 'react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

export default function SearchBar({ 
  onSearch, 
  onFilter, 
  placeholder = "Search...", 
  filters = [],
  activeFilters = [],
  className = "" 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleFilterToggle = (filter) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter(f => f !== filter)
      : [...activeFilters, filter];
    onFilter(newFilters);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className={`search-container ${className}`}>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            className="search-input"
            aria-label="Search"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="clear-search"
              aria-label="Clear search"
            >
              <FiX />
            </button>
          )}
        </div>
        
        {filters.length > 0 && (
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            aria-label="Toggle filters"
          >
            <FiFilter />
            {activeFilters.length > 0 && (
              <span className="filter-count">{activeFilters.length}</span>
            )}
          </button>
        )}
      </form>

      {showFilters && filters.length > 0 && (
        <div className="filters-panel slide-up">
          <h4>Filter by:</h4>
          <div className="filter-options">
            {filters.map((filter) => (
              <label key={filter.value} className="filter-option">
                <input
                  type="checkbox"
                  checked={activeFilters.includes(filter.value)}
                  onChange={() => handleFilterToggle(filter.value)}
                />
                <span className="checkmark"></span>
                {filter.label}
              </label>
            ))}
          </div>
          {activeFilters.length > 0 && (
            <button
              onClick={() => onFilter([])}
              className="clear-filters"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      <style jsx>{`
        .search-container {
          margin-bottom: var(--space-6);
        }

        .search-form {
          display: flex;
          gap: var(--space-3);
          align-items: center;
        }

        .search-input-wrapper {
          position: relative;
          flex: 1;
        }

        .search-icon {
          position: absolute;
          left: var(--space-3);
          top: 50%;
          transform: translateY(-50%);
          color: var(--neutral-500);
          width: 18px;
          height: 18px;
        }

        .search-input {
          width: 100%;
          padding-left: var(--space-10);
          padding-right: var(--space-10);
          border: 1px solid var(--neutral-300);
          border-radius: var(--radius-full);
          font-size: var(--font-size-base);
          transition: all var(--transition-fast);
        }

        .search-input:focus {
          border-color: var(--primary-500);
          box-shadow: 0 0 0 3px var(--primary-100);
        }

        .clear-search {
          position: absolute;
          right: var(--space-3);
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--neutral-500);
          cursor: pointer;
          padding: var(--space-1);
          border-radius: var(--radius-full);
          transition: all var(--transition-fast);
        }

        .clear-search:hover {
          color: var(--neutral-700);
          background-color: var(--neutral-100);
        }

        .filter-toggle {
          position: relative;
          background-color: white;
          border: 1px solid var(--neutral-300);
          border-radius: var(--radius-lg);
          padding: var(--space-3);
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .filter-toggle:hover {
          border-color: var(--primary-500);
          background-color: var(--primary-50);
        }

        .filter-toggle.active {
          background-color: var(--primary-600);
          border-color: var(--primary-600);
          color: white;
        }

        .filter-count {
          position: absolute;
          top: -8px;
          right: -8px;
          background-color: var(--error-500);
          color: white;
          border-radius: var(--radius-full);
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-bold);
        }

        .filters-panel {
          background-color: white;
          border: 1px solid var(--neutral-200);
          border-radius: var(--radius-lg);
          padding: var(--space-4);
          margin-top: var(--space-3);
          box-shadow: var(--shadow-md);
        }

        .filters-panel h4 {
          margin: 0 0 var(--space-3) 0;
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--neutral-800);
        }

        .filter-options {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
          margin-bottom: var(--space-4);
        }

        .filter-option {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          cursor: pointer;
          font-size: var(--font-size-sm);
          color: var(--neutral-700);
          position: relative;
        }

        .filter-option input[type="checkbox"] {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        .checkmark {
          width: 18px;
          height: 18px;
          border: 2px solid var(--neutral-300);
          border-radius: var(--radius-sm);
          position: relative;
          transition: all var(--transition-fast);
        }

        .filter-option input:checked + .checkmark {
          background-color: var(--primary-600);
          border-color: var(--primary-600);
        }

        .filter-option input:checked + .checkmark::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }

        .clear-filters {
          background: none;
          border: none;
          color: var(--primary-600);
          font-size: var(--font-size-sm);
          cursor: pointer;
          text-decoration: underline;
          padding: 0;
        }

        .clear-filters:hover {
          color: var(--primary-700);
        }

        @media (max-width: 768px) {
          .search-form {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-options {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}