import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setFilter, selectActiveFilter, WATCH_STATUS } from '../../features/movies/moviesSlice';

const StatusFilter = () => {
  const dispatch = useAppDispatch();
  const activeFilter = useAppSelector(selectActiveFilter);
  
  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };
  
  const filters = [
    { value: 'all', label: 'All' },
    { value: WATCH_STATUS.WATCHING, label: 'Watching' },
    { value: WATCH_STATUS.COMPLETED, label: 'Completed' },
    { value: WATCH_STATUS.PLANNED, label: 'Planned' }
  ];
  
  return (
    <div className="status-filters">
      <h3>Filter by Status</h3>
      <div className="filter-buttons">
        {filters.map(filter => (
          <button
            key={filter.value}
            className={`filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
            onClick={() => handleFilterChange(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusFilter;