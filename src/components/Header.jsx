import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGamificationStore } from '../store/useGamificationStore';
import { Camera, LogOut, Sun, Moon } from 'lucide-react';

const Header = () => {
  const { user, trackXP, logout, getTrackLevel, getTrackProgress, theme, toggleTheme } = useGamificationStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isFotografiActive = trackXP.fotografi > 0 || trackXP.desain === 0; // Default to fotografi if both 0

  return (
    <header className="glass">
      <div className="container flex items-center justify-between">
        <Link to={user.isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2">
          <div className="glow-effect" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--primary-accent), var(--secondary-accent))', borderRadius: '8px', padding: '6px' }}>
            <Camera size={24} color="white" />
          </div>
          <span className="logo" style={{ fontSize: '1.25rem' }}>Kelas Multimedia <span className="text-gradient">UPM</span></span>
        </Link>
        
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="btn-secondary flex items-center justify-center" style={{ padding: '0.5rem', borderRadius: '50%' }} aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

        {user.isLoggedIn ? (
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end" style={{ marginRight: '1rem' }}>
              <span className="text-sm text-muted">Level {getTrackLevel('fotografi')} Fotografer</span>
              <div className="progress-track" style={{ width: '100px', height: '6px', marginTop: '4px' }}>
                <div className="progress-fill" style={{ width: `${getTrackProgress('fotografi')}%` }}></div>
              </div>
            </div>
            <div className="flex flex-col items-end" style={{ marginRight: '1rem' }}>
              <span className="text-sm text-muted">Level {getTrackLevel('desain')} Desainer</span>
              <div className="progress-track" style={{ width: '100px', height: '6px', marginTop: '4px' }}>
                <div className="progress-fill" style={{ width: `${getTrackProgress('desain')}%` }}></div>
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 btn-secondary" style={{ padding: '0.5rem 1rem' }}>
              <LogOut size={16} />
              <span className="text-sm">Keluar</span>
            </button>
          </div>
        ) : (
          <Link to="/onboarding" className="btn-primary">Mulai Gratis</Link>
        )}
        </div>
      </div>
    </header>
  );
};

export default Header;
