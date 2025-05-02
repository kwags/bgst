import React, { useState, useEffect } from 'react';
import styles from './styles/Sorting.module.css';

const Sorting = ({ onSortChange, dateField = 'date' }) => {
    const [sortBy, setSortBy] = useState(dateField);
    const [direction, setDirection] = useState(dateField === 'date' ? 'desc' : 'asc'); 

    useEffect(() => {
        if (dateField && dateField !== 'name') {
            setSortBy(dateField);
            setDirection('desc');
        } else {
            setSortBy('name');
            setDirection('asc');
        }
    }, [dateField]);

    useEffect(() => {
        onSortChange({ sortBy, direction });
    }, [sortBy, direction, onSortChange]);

    const toggleSort = (type) => {
        if (sortBy === type) {
            setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortBy(type);
            setDirection('asc');
        }
    };
  
  return (
    <div className={styles.sortContainer}>
        {dateField && dateField !== 'name' && (
        <button
          className={`${styles.sortButton} ${sortBy === dateField ? styles.active : ''}`}
          onClick={() => toggleSort(dateField)}
        >
          <span className={styles.iconWrapper}>
            <i
              className={`fa-solid ${
                sortBy === dateField
                  ? direction === 'asc'
                    ? 'fa-arrow-down-short-wide'
                    : 'fa-arrow-down-wide-short'
                  : 'fa-arrow-down-wide-short'
              } ${sortBy === dateField ? styles.visible : styles.inactiveIcon}`}
            ></i>
          </span>
          Date
        </button>
      )}

      <button
        className={`${styles.sortButton} ${sortBy === 'name' ? styles.active : ''}`}
        onClick={() => toggleSort('name')}
      >
        <span className={styles.iconWrapper}>
          <i
            className={`fa-solid ${
              sortBy === 'name'
                ? direction === 'asc'
                  ? 'fa-arrow-down-a-z'
                  : 'fa-arrow-down-z-a'
                : 'fa-arrow-down-a-z'
            } ${sortBy === 'name' ? styles.visible : styles.inactiveIcon}`}
          ></i>
        </span>
        Name
      </button>
    </div>
  );
};

export default Sorting;