import './Home.css';
import Counter from '../components/Counter';
import { debounce } from 'lodash';
import { useEffect } from 'react';
import { DialogDemo } from '@core/DialogDemo';
import { HelloClass } from '../components/HelloClass';
import Header from '../components/Header';
import { useAuthStore } from '../store/authStore';

export default function Home() {
  const username = useAuthStore((s) => s.username);
  const debouncedLog = debounce(() => {
    console.log('===== Phase 5.4.3: Environment Variables Test =====');
    console.log('🎯 Define Replacements:');
    console.log('  App Version:', __APP_VERSION__);
    console.log('  API URL from define:', __API_URL__);
    console.log('');
    console.log('🌍 Import.meta.env:');
    console.log('  MODE:', import.meta.env.MODE);
    console.log('  NODE_ENV:', import.meta.env.NODE_ENV);
    console.log('  DEV:', import.meta.env.DEV);
    console.log('  PROD:', import.meta.env.PROD);
    console.log('');
    console.log('📦 IONIFY_ prefixed vars:');
    console.log('  IONIFY_API_URL:', import.meta.env.IONIFY_API_URL);
    console.log('  IONIFY_APP_NAME:', import.meta.env.IONIFY_APP_NAME);
    console.log('  IONIFY_APP_DESCRIPTION:', import.meta.env.IONIFY_APP_DESCRIPTION);
    console.log('  IONIFY_ENABLE_MOCK:', import.meta.env.IONIFY_ENABLE_MOCK);
    console.log('');
    console.log('⚡ IONIFY_ prefixed vars:');
    console.log('  IONIFY_DEBUG:', import.meta.env.IONIFY_DEBUG);
  }, 1000);

  useEffect(() => {
    debouncedLog();
  }, []);

  return (
    <>
      <Header />
      <div className='app'>
        <h1>React Ionify - Phase 5.4.3 Demo</h1>
        {username ? (
          <p style={{ marginTop: 6, color: 'var(--text-muted)' }}>Signed in as: {username}</p>
        ) : null}
      <div style={{ padding: '1rem', background: '#f0f0f0', borderRadius: '8px', marginBottom: '1rem' }}>
        <h3>✅ Define Replacements:</h3>
        <p><strong>Version:</strong> {__APP_VERSION__}</p>
        <p><strong>API (from define):</strong> {__API_URL__}</p>
      </div>
      <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '8px', marginBottom: '1rem' }}>
        <h3>🌍 Environment Variables:</h3>
        <p><strong>Mode:</strong> {import.meta.env.MODE}</p>
        <p><strong>Dev:</strong> {String(import.meta.env.DEV)}</p>
        <p><strong>API URL:</strong> {import.meta.env.IONIFY_API_URL}</p>
        <p><strong>App Name:</strong> {import.meta.env.IONIFY_APP_NAME}</p>
        <p><strong>Mock Enabled:</strong> {import.meta.env.IONIFY_ENABLE_MOCK}</p>
        <p><strong>Debug:</strong> {import.meta.env.IONIFY_DEBUG}</p>
      </div>
      <HelloClass />
      <Counter />
      <DialogDemo />
      </div>
    </>
  );
}
