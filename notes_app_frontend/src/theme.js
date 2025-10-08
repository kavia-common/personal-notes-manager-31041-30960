export const theme = {
  name: 'Ocean Professional',
  colors: {
    primary: '#2563EB',
    secondary: '#F59E0B',
    success: '#F59E0B',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
  },
  gradient: 'from-blue-500/10 to-gray-50',
};

// PUBLIC_INTERFACE
export function getThemeName() {
  /** Returns the current theme name. */
  return theme.name;
}
