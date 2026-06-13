import React from 'react';
import { Link } from 'react-router-dom';
import { useGamificationStore } from '../store/useGamificationStore';
import { trackFotografi, trackDesain } from '../data/curriculum';
import { Camera, PenTool, PlayCircle } from 'lucide-react';

const Dashboard = () => {
  const { user, selectedTracks, addTrack, trackXP, getTrackLevel, getTrackProgress } = useGamificationStore();

  const getTrackData = (trackId) => {
    return trackId === 'fotografi' ? trackFotografi : trackDesain;
  };

  const allTrackIds = ['fotografi', 'desain'];
  const unselectedTracks = allTrackIds.filter(id => !selectedTracks.includes(id));

  return (
    <div className="container animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="heading-lg" style={{ marginBottom: '0.5rem' }}>Selamat datang, {user.name}!</h1>
        <p className="text-muted text-lg">Siap untuk naik level hari ini?</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        {selectedTracks.map(trackId => {
          const track = getTrackData(trackId);
          const xp = trackXP[trackId];
          const level = getTrackLevel(trackId);
          const progress = getTrackProgress(trackId);
          const isPhoto = trackId === 'fotografi';
          const Icon = isPhoto ? Camera : PenTool;
          const colorVar = isPhoto ? 'var(--primary-accent)' : 'var(--secondary-accent)';
          const lightColorVar = isPhoto ? 'var(--primary-accent-light)' : '#f472b6'; // pink-400

          return (
            <div key={trackId} className="card flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div style={{ background: `rgba(${isPhoto ? '107, 70, 193' : '236, 72, 153'}, 0.1)`, padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <Icon size={32} color={colorVar} />
                </div>
                <div>
                  <h2 className="heading-md">{track.title}</h2>
                  <p className="text-sm" style={{ color: lightColorVar }}>Level {level} • {xp} XP</p>
                </div>
              </div>
              
              <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
                <div className="flex justify-between text-sm" style={{ marginBottom: '0.5rem' }}>
                  <span className="text-muted">Progres ke Level {level + 1}</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${colorVar}, ${lightColorVar})` }}></div>
                </div>
              </div>

              <Link to={`/track/${trackId}`} className="btn-secondary flex items-center justify-center gap-2" style={{ marginTop: 'auto' }}>
                <PlayCircle size={18} />
                Lanjutkan Belajar
              </Link>
            </div>
          );
        })}
      </div>

      {unselectedTracks.length > 0 && (
        <div style={{ marginTop: '4rem' }}>
          <h2 className="heading-md" style={{ marginBottom: '1.5rem' }}>Eksplorasi Track Lainnya</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {unselectedTracks.map(trackId => {
              const track = getTrackData(trackId);
              const isPhoto = trackId === 'fotografi';
              const Icon = isPhoto ? Camera : PenTool;
              
              return (
                <div key={trackId} className="card flex flex-col gap-4" style={{ opacity: 0.8, borderStyle: 'dashed' }}>
                  <div className="flex items-center gap-4">
                    <div style={{ background: 'var(--bg-element)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                      <Icon size={32} color="var(--text-muted)" />
                    </div>
                    <div>
                      <h2 className="heading-md" style={{ color: 'var(--text-muted)' }}>{track.title}</h2>
                      <p className="text-sm text-muted">Mulai perjalanan baru</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => addTrack(trackId)} 
                    className="btn-secondary" 
                    style={{ marginTop: 'auto' }}
                  >
                    Tambah Track Ini
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
