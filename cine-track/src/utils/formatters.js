// Format a date string (ISO) to a readable format, e.g., "12 May 2024"
export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

// Format movie type to capitalized (e.g., "movie" => "Movie")
export function formatType(type) {
  if (!type) return '';
  return type.charAt(0).toUpperCase() + type.slice(1);
}

// Format rating to "x/5" or "Not rated"
export function formatRating(rating) {
  if (!rating || rating < 1) return 'Not rated';
  return `${rating}/5`;
}

// Format status to readable label 
export function formatStatus(status) {
  switch (status) {
    case 'Sedang':
      return 'Watching';
    case 'Selesai':
      return 'Completed';
    case 'Rencana':
      return 'Planned';
    default:
      return status;
  }
}