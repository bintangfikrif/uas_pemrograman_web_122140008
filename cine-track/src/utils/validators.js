// Validate movie form data
export function validateMovieForm(formData) {
  const errors = {};

  // Title is required
  if (!formData.title || !formData.title.trim()) {
    errors.title = "Title is required";
  }

  // Year must be a valid number and reasonable range
  const currentYear = new Date().getFullYear();
  const yearNum = parseInt(formData.year, 10);
  if (
    isNaN(yearNum) ||
    yearNum < 1888 || // First film year
    yearNum > currentYear + 5
  ) {
    errors.year = `Year must be between 1888 and ${currentYear + 5}`;
  }

  // Poster URL (if provided) must be a valid URL
  if (formData.poster && formData.poster.trim()) {
    try {
      new URL(formData.poster);
    } catch {
      errors.poster = "Poster must be a valid URL";
    }
  }

  // Rating must be between 0 and 5
  if (
    formData.rating !== undefined &&
    (isNaN(formData.rating) || formData.rating < 0 || formData.rating > 5)
  ) {
    errors.rating = "Rating must be between 0 and 5";
  }

  return errors;
}