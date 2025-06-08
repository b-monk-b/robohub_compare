import { format, parseISO } from 'date-fns';

/**
 * Formats a date string into a human-readable format
 * @param dateString - The date string to format (ISO format)
 * @param formatStr - Optional format string (defaults to 'MMMM d, yyyy')
 * @returns Formatted date string
 */
export const formatDate = (dateString: string, formatStr: string = 'MMMM d, yyyy'): string => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Gets the relative time from a date (e.g., "2 days ago")
 * @param dateString - The date string to format (ISO format)
 * @returns Relative time string
 */
export const getRelativeTime = (dateString: string): string => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
      }
    }
    
    return 'Just now';
  } catch (error) {
    console.error('Error getting relative time:', error);
    return '';
  }
};
