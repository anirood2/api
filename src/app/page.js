'use client';

import { useState } from 'react';
import ArchDiagram from '../../components/ArchDiagram';

export default function ArchitecturePage() {
  const [unlocked, setUnlocked] = useState(false);
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  const check = () => {
    if (pw === 'api2019') {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (unlocked) return <ArchDiagram />;

  return (
    <div style={{
      fontFamily: "'Outfit', sans-serif",
      background: '#06070A', color: '#E8E8E3',
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{ maxWidth: 360, width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: 22, fontWeight: 300, letterSpacing: '0.15em', marginBottom: 8 }}>API</div>
        <div style={{ fontSize: 11, color: '#454545', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 32 }}>Architecture · Restricted</div>
        <input
          type="password"
          value={pw}
          onChange={e => { setPw(e.target.value); setError(false); }}
          onKeyDown={e => e.key === 'Enter' && check()}
          placeholder="Enter access code"
          style={{
            width: '100%', fontFamily: "'Outfit', sans-serif", fontSize: 14,
            padding: '14px 20px', border: `1px solid ${error ? '#EF4444' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: 100, background: 'rgba(255,255,255,0.04)',
            color: '#E8E8E3', outline: 'none', textAlign: 'center',
            marginBottom: 12, transition: 'border-color 0.2s',
          }}
        />
        {error && <div style={{ fontSize: 12, color: '#EF4444', marginBottom: 12 }}>Incorrect access code</div>}
        <button onClick={check} style={{
          width: '100%', fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 500,
          padding: '12px 28px', border: 'none', borderRadius: 100, cursor: 'pointer',
          background: '#10B981', color: '#000', transition: 'all 0.2s',
        }}>Access</button>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: #404040; }
        input:focus { border-color: #10B981 !important; }
      `}</style>
    </div>
  );
}
