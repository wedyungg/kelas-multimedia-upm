import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUnitDetails } from '../data/curriculum';
import { useGamificationStore } from '../store/useGamificationStore';
import { ArrowLeft, CheckCircle, XCircle, Award } from 'lucide-react';

const quizData = {
  'photo-1-quiz': {
    questions: [
      { q: "Apa fungsi utama dari sensor kamera?", options: ["Menyimpan baterai", "Menangkap cahaya", "Mengatur fokus", "Memutar lensa"], answer: 1 },
      { q: "Lensa mana yang cocok untuk foto lanskap?", options: ["Lensa Makro", "Lensa Telefoto", "Lensa Wide", "Lensa Prime 50mm"], answer: 2 },
    ]
  },
  'photo-2-quiz': {
    questions: [
      { q: "Komponen yang mengatur seberapa banyak cahaya yang masuk melalui lensa disebut?", options: ["ISO", "Aperture", "Shutter Speed", "White Balance"], answer: 1 },
      { q: "Untuk membekukan objek yang bergerak cepat (freeze motion), kita menggunakan?", options: ["Shutter Speed lambat", "ISO rendah", "Aperture kecil", "Shutter Speed cepat"], answer: 3 },
    ]
  },
  'design-1-quiz': {
    questions: [
      { q: "Tujuan utama dari desain grafis adalah?", options: ["Membuat gambar yang indah", "Komunikasi visual", "Menghabiskan warna", "Seni abstrak"], answer: 1 },
      { q: "Prinsip desain yang mengatur perbedaan menyolok antar elemen disebut?", options: ["Kontras", "Repetisi", "Alignment", "Proximity"], answer: 0 },
    ]
  },
  'design-2-quiz': {
    questions: [
      { q: "Elemen apa yang paling pertama menarik perhatian mata pada sebuah poster?", options: ["Teks kecil di bawah", "Focal Point", "Background", "Warna abu-abu"], answer: 1 },
    ]
  }
};

const Quiz = () => {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const unit = getUnitDetails(unitId);
  const { completeUnit, completedUnits } = useGamificationStore();
  
  const data = quizData[unitId] || { questions: [{ q: "Contoh Soal", options: ["A", "B"], answer: 0 }] };
  
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  if (!unit) return <div className="container">Kuis tidak ditemukan.</div>;

  const isAlreadyCompleted = completedUnits.includes(unit.id);

  const handleOptionSelect = (idx) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(idx);
    const correct = idx === data.questions[currentQ].answer;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (currentQ < data.questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const finishQuiz = () => {
    const percentage = (score / data.questions.length) * 100;
    if (percentage >= 60 && !isAlreadyCompleted) {
      let finalXp = unit.xp;
      if (percentage === 100 && finalXp === 50) finalXp = 80; // Perfect score bonus logic based on PRD
      completeUnit(unit.id, unit.trackId, finalXp);
    }
    navigate(`/track/${unit.trackId}`);
  };

  if (showResult) {
    const percentage = (score / data.questions.length) * 100;
    const passed = percentage >= 60;

    return (
      <div className="container animate-fade-in flex justify-center items-center" style={{ minHeight: '80vh' }}>
        <div className="card text-center" style={{ padding: '4rem', maxWidth: '500px', width: '100%' }}>
          <div className="glow-effect" style={{ margin: '0 auto 2rem', width: '80px', height: '80px', borderRadius: '50%', background: passed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award size={40} color={passed ? "var(--success)" : "var(--danger)"} />
          </div>
          <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>{passed ? 'Kuis Berhasil!' : 'Belum Lulus'}</h2>
          <p className="text-lg" style={{ marginBottom: '2rem' }}>Skor Anda: <strong>{score}/{data.questions.length}</strong> ({percentage}%)</p>
          
          {passed && !isAlreadyCompleted && (
            <p className="text-warning font-bold text-xl" style={{ marginBottom: '2rem' }}>
              +{percentage === 100 && unit.xp === 50 ? 80 : unit.xp} XP
            </p>
          )}

          <div className="flex gap-4 justify-center">
            {passed ? (
              <button onClick={finishQuiz} className="btn-primary">Lanjutkan</button>
            ) : (
              <>
                <button onClick={() => { setShowResult(false); setCurrentQ(0); setScore(0); setSelectedOption(null); setIsCorrect(null); }} className="btn-primary">Coba Lagi</button>
                <button onClick={() => navigate(`/track/${unit.trackId}`)} className="btn-secondary">Kembali</button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  const q = data.questions[currentQ];

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '700px' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '3rem' }}>
        <button onClick={() => navigate(`/track/${unit.trackId}`)} className="text-muted flex items-center gap-2">
          <ArrowLeft size={18} /> Keluar Kuis
        </button>
        <span className="font-bold text-lg" style={{ color: 'var(--primary-accent-light)' }}>Soal {currentQ + 1} dari {data.questions.length}</span>
      </div>

      <div className="card">
        <h2 className="heading-md" style={{ marginBottom: '2rem', lineHeight: '1.4' }}>{q.q}</h2>
        <div className="flex flex-col gap-3">
          {q.options.map((opt, idx) => {
            let bg = 'var(--bg-element)';
            let border = '1px solid var(--border-color)';
            
            if (selectedOption !== null) {
              if (idx === q.answer) {
                bg = 'rgba(16, 185, 129, 0.2)';
                border = '1px solid var(--success)';
              } else if (idx === selectedOption && !isCorrect) {
                bg = 'rgba(239, 68, 68, 0.2)';
                border = '1px solid var(--danger)';
              }
            }

            return (
              <button 
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                className="flex items-center justify-between"
                style={{
                  padding: '1.25rem 1.5rem',
                  borderRadius: 'var(--radius-sm)',
                  background: bg,
                  border: border,
                  textAlign: 'left',
                  fontSize: '1.125rem',
                  transition: 'all 0.2s ease',
                  cursor: selectedOption !== null ? 'default' : 'pointer'
                }}
              >
                {opt}
                {selectedOption !== null && idx === q.answer && <CheckCircle size={20} color="var(--success)" />}
                {selectedOption === idx && !isCorrect && <XCircle size={20} color="var(--danger)" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
