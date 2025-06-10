/**
 * Smoothly scrolls the page to the specified element
 * @param id - The ID of the element to scroll to (without the #)
 * @param offset - Optional offset from the top of the element (in pixels)
 */
export const scrollToId = (id: string, offset = 0): void => {
  if (typeof window === 'undefined') return;
  
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with id "${id}" not found`);
    return;
  }

  const headerOffset = offset || 80; // Default offset to account for fixed header
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
};

/**
 * Checks if an element is in the viewport
 * @param element - The DOM element to check
 * @param offset - Optional offset from the top and bottom of the viewport (in pixels)
 * @returns Boolean indicating if the element is in the viewport
 */
export const isInViewport = (element: HTMLElement, offset = 0): boolean => {
  if (typeof window === 'undefined') return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -offset &&
    rect.left >= -offset &&
    rect.bottom <= (window.innerHeight + offset) &&
    rect.right <= (window.innerWidth + offset)
  );
};

/**
 * Scrolls to the top of the page
 * @param behavior - Scroll behavior ('auto' or 'smooth')
 */
export const scrollToTop = (behavior: ScrollBehavior = 'smooth'): void => {
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
      behavior,
    });
  }
};

/**
 * Scrolls to the bottom of an element
 * @param element - The DOM element to scroll to the bottom of
 * @param behavior - Scroll behavior ('auto' or 'smooth')
 */
export const scrollToBottom = (element: HTMLElement, behavior: ScrollBehavior = 'smooth'): void => {
  element.scrollTo({
    top: element.scrollHeight,
    behavior,
  });
};

/**
 * Adds a scroll event listener that triggers a callback when scrolling stops
 * @param callback - Function to call when scrolling stops
 * @param delay - Delay in milliseconds after scrolling stops before calling the callback
 * @returns A function to remove the event listener
 */
export const onScrollStop = (callback: () => void, delay = 150) => {
  if (typeof window === 'undefined') return () => {};
  
  let timeoutId: NodeJS.Timeout;
  
  const handleScroll = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      callback();
    }, delay);
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Return cleanup function
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    window.removeEventListener('scroll', handleScroll);
  };
};
