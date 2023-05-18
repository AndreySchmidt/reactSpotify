export const MIN_DESCTOP_WIDTH = 900;

let debounceTimer = null;

export function debounce(callback, delay) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(callback, delay);
}
