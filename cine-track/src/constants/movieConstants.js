// Watch status constants
export const WATCH_STATUS = {
  WATCHING: 'Watching',     // Currently watching
  COMPLETED: 'Completed',   // Finished watching
  PLANNED: 'Planned',   // Planned to watch
};

// Movie types
export const MOVIE_TYPES = [
  'movie',
  'series',
  'documentary',
  'anime'
];

// Status filter options for UI
export const STATUS_FILTERS = [
  { value: 'all', label: 'All' },
  { value: WATCH_STATUS.WATCHING, label: 'Watching' },
  { value: WATCH_STATUS.COMPLETED, label: 'Completed' },
  { value: WATCH_STATUS.PLANNED, label: 'Planned' }
];