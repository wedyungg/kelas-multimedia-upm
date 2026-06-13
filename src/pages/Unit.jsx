import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUnitDetails } from '../data/curriculum';
import { useGamificationStore } from '../store/useGamificationStore';
import { ArrowLeft, CheckCircle, Star, X, ZoomIn, ZoomOut } from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const Unit = () => {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const unit = getUnitDetails(unitId);
  const { completeUnit, completedUnits } = useGamificationStore();
  
  const [selectedImg, setSelectedImg] = useState(null);
  const contentRef = useRef(null);

  if (!unit) return <div className="container" style={{ padding: '4rem 0' }}>Unit tidak ditemukan.</div>;
  if (unit.type === 'quiz') {
    // Redirect to quiz page
    setTimeout(() => navigate(`/quiz/${unitId}`), 0);
    return null;
  }

  const isCompleted = completedUnits.includes(unit.id);

  const handleComplete = () => {
    completeUnit(unit.id, unit.trackId, unit.xp);
    navigate(`/track/${unit.trackId}`);
  };

  useEffect(() => {
    if (!contentRef.current) return;
    
    const images = contentRef.current.querySelectorAll('img');
    const handleImageClick = (e) => {
      setSelectedImg(e.target.src);
    };

    images.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.style.transition = 'transform 0.2s';
      img.addEventListener('click', handleImageClick);
      img.addEventListener('mouseenter', () => img.style.transform = 'scale(1.02)');
      img.addEventListener('mouseleave', () => img.style.transform = 'scale(1)');
    });

    return () => {
      images.forEach(img => {
        img.removeEventListener('click', handleImageClick);
        // clean up other listeners indirectly
      });
    };
  }, [unit.content]);

  const handleClose = () => {
    setSelectedImg(null);
  };

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '700px' }}>
      <button onClick={() => navigate(`/track/${unit.trackId}`)} className="flex items-center gap-2 text-muted" style={{ marginBottom: '2rem' }}>
        <ArrowLeft size={18} /> Kembali ke Materi
      </button>

      <div className="card" style={{ padding: '3rem' }}>
        <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
          <span className="text-sm font-medium" style={{ background: 'var(--bg-element)', color: 'var(--primary-accent-light)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)' }}>
            Level {unit.levelNum}
          </span>
          <span className="text-sm text-muted">• {unit.type === 'video' ? 'Video Pembelajaran' : 'Artikel'}</span>
        </div>

        <h1 className="heading-lg" style={{ marginBottom: '2rem' }}>{unit.title}</h1>

        <div 
          ref={contentRef}
          className="content" 
          style={{ fontSize: '1.125rem', lineHeight: '1.8', color: 'var(--text-main)', marginBottom: '3rem' }}
          dangerouslySetInnerHTML={{ __html: unit.content }}
        />

        <div className="flex items-center justify-between" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
          <div className="flex items-center gap-2">
            <Star size={24} color="var(--warning)" />
            <span className="font-bold text-lg">+{unit.xp} XP</span>
          </div>
          <button 
            onClick={handleComplete} 
            className={`btn-primary flex items-center gap-2 ${isCompleted ? 'opacity-50' : ''}`}
            disabled={isCompleted}
            style={{ opacity: isCompleted ? 0.7 : 1, cursor: isCompleted ? 'not-allowed' : 'pointer' }}
          >
            {isCompleted ? (
              <><CheckCircle size={20} /> Selesai Dibaca</>
            ) : (
              <><CheckCircle size={20} /> Selesai & Klaim XP</>
            )}
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div 
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={handleClose}
        >
          <TransformWrapper
            initialScale={1}
            minScale={1}
            maxScale={8}
            centerOnInit={true}
            wheel={{ step: 0.1 }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <div 
                  style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '1rem', zIndex: 10000 }}
                  onClick={e => e.stopPropagation()}
                >
                  <button onClick={() => zoomOut()} className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }}>
                    <ZoomOut size={24} />
                  </button>
                  <button onClick={() => zoomIn()} className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }}>
                    <ZoomIn size={24} />
                  </button>
                  <button onClick={() => { resetTransform(); handleClose(); }} className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }}>
                    <X size={24} />
                  </button>
                </div>
                
                <TransformComponent wrapperStyle={{ width: '100vw', height: '100vh' }}>
                  <img 
                    src={selectedImg} 
                    alt="Fullscreen" 
                    style={{
                      maxWidth: '100vw',
                      maxHeight: '100vh',
                      objectFit: 'contain',
                      display: 'block'
                    }}
                    onClick={e => e.stopPropagation()}
                    draggable="false"
                  />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </div>
      )}
    </div>
  );
};

export default Unit;
