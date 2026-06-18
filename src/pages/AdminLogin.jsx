import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Lock, LogIn, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError('Gagal login. Periksa kembali email dan password Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in flex flex-col items-center justify-center" style={{ minHeight: '80vh' }}>
      <div className="card text-center" style={{ width: '100%', maxWidth: '400px', padding: '3rem 2rem' }}>
        <div className="flex justify-center" style={{ marginBottom: '1.5rem' }}>
          <div className="glow-effect" style={{ background: 'rgba(107, 70, 193, 0.1)', padding: '1rem', borderRadius: '50%' }}>
            <Lock size={32} color="var(--primary-accent)" />
          </div>
        </div>
        
        <h1 className="heading-md" style={{ marginBottom: '0.5rem' }}>Login Instruktur</h1>
        <p className="text-muted text-sm" style={{ marginBottom: '2rem' }}>Masuk untuk mengelola tugas peserta</p>

        {error && (
          <div className="flex items-start gap-2 text-sm text-left" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4 text-left">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@contoh.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-inactive)',
                color: 'var(--text-main)'
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-inactive)',
                color: 'var(--text-main)'
              }}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary flex items-center justify-center gap-2" 
            style={{ marginTop: '1rem' }}
            disabled={isLoading}
          >
            {isLoading ? 'Memproses...' : (
              <>
                <LogIn size={18} /> Masuk Dashboard
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
