import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Gamepad2, Trophy, ArrowRight } from 'lucide-react';

const Landing = () => {
  return (
    <div className="container animate-fade-in">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center" style={{ minHeight: '60vh' }}>
        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(107, 70, 193, 0.1)', border: '1px solid var(--primary-accent)', borderRadius: 'var(--radius-full)', marginBottom: '2rem' }}>
          <span className="text-sm font-medium" style={{ color: 'var(--primary-accent-light)' }}>Platform Gamifikasi Pertama untuk Kreatif</span>
        </div>
        <h1 className="heading-xl" style={{ marginBottom: '1.5rem', maxWidth: '800px' }}>
          Jadikan setiap orang bisa bercerita melalui gambar <br/>
          <span className="text-gradient">satu level dalam satu waktu.</span>
        </h1>
        <p className="text-lg text-muted" style={{ marginBottom: '3rem', maxWidth: '600px' }}>
          Belajar fotografi dan desain grafis secara terstruktur dan menyenangkan. Kumpulkan XP, naik level, dan kuasai keahlian visual secara gratis.
        </p>
        <Link to="/onboarding" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.125rem' }}>
          Mulai Gratis Sekarang <ArrowRight size={20} />
        </Link>
      </section>

      <section style={{ padding: '4rem 0' }}>
        <h2 className="heading-lg text-center" style={{ marginBottom: '3rem' }}>Cara Kerja Kelas Multimedia UPM</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="card text-center flex flex-col items-center">
            <div className="glow-effect" style={{ background: 'rgba(107, 70, 193, 0.1)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
              <Camera size={40} color="var(--primary-accent-light)" />
            </div>
            <h3 className="heading-md" style={{ marginBottom: '1rem' }}>1. Pilih Track Belajar</h3>
            <p className="text-muted">Pilih jalur Fotografi atau Desain Grafis. Materi disusun terstruktur dari nol hingga mahir.</p>
          </div>
          <div className="card text-center flex flex-col items-center">
            <div className="glow-effect" style={{ background: 'rgba(236, 72, 153, 0.1)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
              <Gamepad2 size={40} color="var(--secondary-accent)" />
            </div>
            <h3 className="heading-md" style={{ marginBottom: '1rem' }}>2. Pelajari & Kumpulkan XP</h3>
            <p className="text-muted">Baca materi, tonton video, dan kerjakan kuis. Dapatkan Experience Points (XP) di setiap aktivitas.</p>
          </div>
          <div className="card text-center flex flex-col items-center">
            <div className="glow-effect" style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
              <Trophy size={40} color="var(--success)" />
            </div>
            <h3 className="heading-md" style={{ marginBottom: '1rem' }}>3. Naik Level & Kuasai</h3>
            <p className="text-muted">Buka materi lanjutan seiring kenaikan levelmu. Jadilah fotografer dan desainer handal.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
