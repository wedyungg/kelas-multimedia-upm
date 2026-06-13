import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { trackFotografi, trackDesain } from '../data/curriculum';
import { useGamificationStore } from '../store/useGamificationStore';
import { Lock, CheckCircle, Play, BookOpen, Video, HelpCircle, ArrowLeft } from 'lucide-react';

const Track = () => {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const track = trackId === 'fotografi' ? trackFotografi : (trackId === 'desain' ? trackDesain : null);
  const { completedUnits, isUnitUnlocked, getTrackLevel } = useGamificationStore();

  if (!track) return <div className="container" style={{ padding: '4rem 0' }}>Track tidak ditemukan.</div>;

  const currentLevel = getTrackLevel(trackId);

  const getIcon = (type) => {
    switch(type) {
      case 'read': return <BookOpen size={18} />;
      case 'video': return <Video size={18} />;
      case 'quiz': return <HelpCircle size={18} />;
      default: return <Play size={18} />;
    }
  };

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '800px' }}>
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-muted" style={{ marginBottom: '2rem' }}>
        <ArrowLeft size={18} /> Kembali ke Dashboard
      </button>

      <div style={{ marginBottom: '4rem' }}>
        <h1 className="heading-xl text-gradient" style={{ marginBottom: '1rem' }}>{track.title}</h1>
        <p className="text-lg text-muted">{track.description}</p>
      </div>

      <div className="flex flex-col gap-8">
        {track.levels.map((level, index) => {
          const isLevelUnlocked = currentLevel >= level.level || index === 0;

          return (
            <div key={level.id} className="card" style={{ opacity: isLevelUnlocked ? 1 : 0.5, borderLeft: `4px solid ${isLevelUnlocked ? 'var(--primary-accent)' : 'var(--border-color)'}` }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
                <div>
                  <h2 className="heading-md">Level {level.level}: {level.title}</h2>
                  {!isLevelUnlocked && <p className="text-sm text-warning" style={{ marginTop: '0.25rem' }}>Dibutuhkan {level.xpRequired} XP untuk membuka level ini.</p>}
                </div>
                {!isLevelUnlocked && <Lock size={24} className="text-muted" />}
              </div>

              {level.units.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {level.units.map(unit => {
                    const unlocked = isUnitUnlocked(unit.id, trackId);
                    const completed = completedUnits.includes(unit.id);

                    return (
                      <Link 
                        key={unit.id}
                        to={unlocked ? `/unit/${unit.id}` : '#'}
                        onClick={(e) => {
                          if (!unlocked) {
                            e.preventDefault();
                            alert('Selesaikan materi sebelumnya untuk membuka unit ini.');
                          }
                        }}
                        className={`flex items-center justify-between ${unlocked ? 'btn-secondary' : ''}`}
                        style={{ 
                          padding: '1rem', 
                          borderRadius: 'var(--radius-sm)',
                          background: completed ? 'rgba(16, 185, 129, 0.05)' : (!unlocked ? 'var(--bg-inactive-heavy)' : undefined),
                          border: completed ? '1px solid rgba(16, 185, 129, 0.2)' : (!unlocked ? '1px dashed var(--border-color)' : undefined),
                          pointerEvents: unlocked ? 'auto' : 'none'
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div style={{ color: completed ? 'var(--success)' : (unlocked ? 'var(--text-main)' : 'var(--text-muted)') }}>
                            {completed ? <CheckCircle size={20} /> : (!unlocked ? <Lock size={20} /> : getIcon(unit.type))}
                          </div>
                          <span style={{ color: unlocked ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: completed ? 500 : 400 }}>{unit.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm" style={{ color: 'var(--primary-accent-light)', fontWeight: 600 }}>+{unit.xp} XP</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-muted text-sm italic">Materi untuk level ini sedang disiapkan.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Track;
