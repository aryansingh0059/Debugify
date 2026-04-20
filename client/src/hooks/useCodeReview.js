import { useState } from 'react';
import axios from 'axios';

/**
 * Custom hook for handling code review submissions.
 * 
 * @returns {Object} { review, loading, error, submitReview }
 */
export const useCodeReview = () => {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Submits code to the backend for AI review.
   * 
   * @param {string} code - Source code to analyze
   * @param {string} language - Programming language context
   */
  const submitReview = async (code, language) => {
    // Reset state for new submission
    setLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      const response = await axios.post(`${apiUrl}/api/review`, {
        code,
        language
      });

      // Update state with review data from backend
      setReview(response.data);
    } catch (err) {
      console.error('[CodeReview Hook Error]:', err);
      
      // Generic error message as per requirements
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    review,
    loading,
    error,
    submitReview
  };
};
