// A predefined list of soft, accessible colors for the avatars
const avatarColors = [
  '#e57373', '#ba68c8', '#7986cb', '#4fc3f7', '#4db6ac',
  '#81c784', '#dce775', '#ffd54f', '#ff8a65', '#a1887f'
];

/**
 * Generates a consistent color from the predefined list based on a string (e.g., username).
 * @param {string} str The input string.
 * @returns {string} A hex color code.
 */
export const generateColor = (str) => {
  if (!str) return avatarColors[0];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash % avatarColors.length);
  return avatarColors[index];
};