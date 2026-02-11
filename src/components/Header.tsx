import { useTheme } from '../theme/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className='app-header'>
      <button
        type='button'
        className='theme-switch'
        onClick={toggleTheme}
        aria-label='Toggle theme'
        aria-pressed={theme === 'dark'}
      >
        {theme === 'dark' ? 'Light' : 'Dark'}
      </button>
    </header>
  );
}
