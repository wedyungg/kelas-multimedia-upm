import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGamificationStore } from '../store/useGamificationStore';
import { Camera, PenTool, Radio, CheckCircle } from 'lucide-react';

const Onboarding = () => {
  const [name, setName] = useState('');
  const [selectedTracks, setSelectedTracks] = useState([]);
  const login = useGamificationStore(state => state.login);
  const navigate = useNavigate();

  const toggleTrack = (trackId) => {
    setSelectedTracks(prev => 
      prev.includes(trackId) ? prev.filter(t => t !== trackId) : [...prev, trackId]
    );
  };

  const handleStart = (e) => {
    e.preventDefault();
    if (selectedTracks.length === 0) {
      alert('Pilih minimal satu track untuk mulai.');
      return;
    }
    login(name || 'Kreator', selectedTracks);
    navigate('/dashboard');
  };

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '800px', padding: '4rem 2rem' }}>
      <div className="card text-center" style={{ padding: '3rem 2rem' }}>
        <h1 className="heading-lg" style={{ marginBottom: '1rem' }}>Mulai Perjalananmu</h1>
        <p className="text-muted" style={{ marginBottom: '2.5rem' }}>Beritahu kami apa yang ingin kamu pelajari hari ini.</p>
        
        <form onSubmit={handleStart} className="flex flex-col gap-8">
          <div className="flex flex-col gap-2" style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
            <label htmlFor="name" className="text-sm font-medium">Nama / Panggilan (Opsional)</label>
            <input 
              id="name"
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan namamu..."
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-inactive-heavy)',
                color: 'var(--text-main)',
                fontFamily: 'inherit',
                fontSize: '1rem'
              }}
            />
          </div>

          <div className="flex flex-col gap-4" style={{ textAlign: 'left' }}>
            <label className="text-sm font-medium text-center">Pilih Track (Bisa lebih dari satu)</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <button 
                type="button"
                onClick={() => toggleTrack('fotografi')}
                style={{
                  padding: '1.5rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${selectedTracks.includes('fotografi') ? 'var(--primary-accent)' : 'var(--border-color)'}`,
                  background: selectedTracks.includes('fotografi') ? 'rgba(107, 70, 193, 0.1)' : 'var(--bg-inactive)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  position: 'relative'
                }}
              >
                {selectedTracks.includes('fotografi') && (
                  <CheckCircle size={20} color="var(--primary-accent)" style={{ position: 'absolute', top: '10px', right: '10px' }} />
                )}
                <Camera size={32} color={selectedTracks.includes('fotografi') ? 'var(--primary-accent)' : 'var(--text-muted)'} />
                <span className="font-medium" style={{ color: selectedTracks.includes('fotografi') ? 'var(--text-main)' : 'var(--text-muted)' }}>Fotografi</span>
              </button>

              <button 
                type="button"
                onClick={() => toggleTrack('desain')}
                style={{
                  padding: '1.5rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${selectedTracks.includes('desain') ? 'var(--secondary-accent)' : 'var(--border-color)'}`,
                  background: selectedTracks.includes('desain') ? 'rgba(236, 72, 153, 0.1)' : 'var(--bg-inactive)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  position: 'relative'
                }}
              >
                {selectedTracks.includes('desain') && (
                  <CheckCircle size={20} color="var(--secondary-accent)" style={{ position: 'absolute', top: '10px', right: '10px' }} />
                )}
                <PenTool size={32} color={selectedTracks.includes('desain') ? 'var(--secondary-accent)' : 'var(--text-muted)'} />
                <span className="font-medium" style={{ color: selectedTracks.includes('desain') ? 'var(--text-main)' : 'var(--text-muted)' }}>Desain Grafis</span>
              </button>

              <button 
                type="button"
                onClick={() => toggleTrack('streaming')}
                style={{
                  padding: '1.5rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${selectedTracks.includes('streaming') ? 'var(--success)' : 'var(--border-color)'}`,
                  background: selectedTracks.includes('streaming') ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-inactive)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  position: 'relative'
                }}
              >
                {selectedTracks.includes('streaming') && (
                  <CheckCircle size={20} color="var(--success)" style={{ position: 'absolute', top: '10px', right: '10px' }} />
                )}
                <Radio size={32} color={selectedTracks.includes('streaming') ? 'var(--success)' : 'var(--text-muted)'} />
                <span className="font-medium" style={{ color: selectedTracks.includes('streaming') ? 'var(--text-main)' : 'var(--text-muted)' }}>Live Streaming</span>
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
            Mulai Belajar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
