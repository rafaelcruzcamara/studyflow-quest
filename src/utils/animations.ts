
/**
 * Utility functions for animations
 */

/**
 * Creates a staggered animation effect for child elements
 * @param index Position of the element in the list
 * @param staggerAmount Time delay in ms between each element
 * @returns Delay in seconds
 */
export const staggerDelay = (index: number, staggerAmount: number = 100): string => {
  return `${index * staggerAmount}ms`;
};

/**
 * Intersection Observer options for animations
 */
export const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

/**
 * Animation variants for Framer Motion
 */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

export const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const slideDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const slideRight = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

export const slideLeft = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
};
