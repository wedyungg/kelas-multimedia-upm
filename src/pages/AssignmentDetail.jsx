import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useGamificationStore } from '../store/useGamificationStore';
import { ArrowLeft, CheckCircle, Send, AlertCircle, User } from 'lucide-react';

const AssignmentDetail = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { user, completedAssignments, completeAssignment } = useGamificationStore();
  
  const [studentName, setStudentName] = useState(user?.name || '');
  const [submissionLink, setSubmissionLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const docRef = doc(db, 'assignments', assignmentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAssignment({ id: docSnap.id, ...docSnap.data() });
        } else {
          setAssignment(null);
        }
      } catch (error) {
        console.error("Error fetching assignment:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAssignment();
  }, [assignmentId]);

  if (isLoading) {
    return <div className="container" style={{ padding: '4rem 0' }}>Memuat tugas...</div>;
  }

  if (!assignment) {
    return <div className="container" style={{ padding: '4rem 0' }}>Tugas tidak ditemukan.</div>;
  }

  const isCompleted = completedAssignments.includes(assignment.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!submissionLink.trim() || !studentName.trim()) return;

    setIsSubmitting(true);

    try {
      // Simpan data pengumpulan ke koleksi 'submissions' di Firestore
      await addDoc(collection(db, 'submissions'), {
        assignmentId,
        assignmentTitle: assignment.title,
        studentName,
        submissionLink,
        createdAt: serverTimestamp()
      });

      // Tandai tugas selesai di state lokal (Gamification)
      completeAssignment(assignment.id);
      setShowSuccess(true);
      setSubmissionLink('');
    } catch (error) {
      console.error("Gagal mengirim tugas:", error);
      alert("Terjadi kesalahan saat mengirim tugas. Pastikan Anda terhubung ke internet dan Firestore Security Rules sudah diupdate.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '800px', paddingBottom: '4rem' }}>
      <button onClick={() => navigate('/assignments')} className="flex items-center gap-2 text-muted" style={{ marginBottom: '2rem' }}>
        <ArrowLeft size={18} /> Kembali ke Daftar Tugas
      </button>

      <div className="card" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
        
        {/* Success Overlay */}
        {showSuccess && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'var(--bg-main)', zIndex: 10,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: '2rem'
          }}>
            <div className="glow-effect" style={{ borderRadius: '50%', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', marginBottom: '2rem' }}>
              <CheckCircle size={64} color="var(--success)" />
            </div>
            <h2 className="heading-lg" style={{ color: 'var(--success)', marginBottom: '1rem' }}>Selamat, kamu hebaat! 🎉</h2>
            <p className="text-lg text-muted" style={{ marginBottom: '2rem' }}>
              Tugas <strong>{assignment.title}</strong> telah berhasil dikumpulkan.<br/>
              Instruktur akan segera menilainya. Teruslah berkarya!
            </p>
            <button onClick={() => navigate('/assignments')} className="btn-secondary">
              Kembali ke Daftar Tugas
            </button>
          </div>
        )}

        <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
          <span className="text-sm font-medium" style={{ background: 'var(--bg-element)', color: 'var(--primary-accent-light)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)' }}>
            {assignment.trackId.toUpperCase()}
          </span>
          <span className="text-sm text-muted">• Durasi Pengerjaan: {assignment.duration}</span>
        </div>

        <h1 className="heading-lg" style={{ marginBottom: '2rem' }}>{assignment.title}</h1>

        <div 
          className="content" 
          style={{ fontSize: '1.125rem', lineHeight: '1.8', color: 'var(--text-main)', marginBottom: '3rem' }}
          dangerouslySetInnerHTML={{ __html: assignment.description }}
        />

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
          <h3 className="heading-md" style={{ marginBottom: '1.5rem' }}>Area Pengumpulan</h3>
          
          {isCompleted ? (
            <div className="flex items-center gap-3" style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--success)' }}>
              <CheckCircle size={24} color="var(--success)" />
              <div>
                <p className="font-medium" style={{ color: 'var(--success)' }}>Tugas sudah dikumpulkan!</p>
                <p className="text-sm text-muted">Kamu luar biasa. Menunggu penilaian instruktur.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="studentName" className="text-sm font-medium flex items-center gap-2">
                  <User size={16} /> Nama Anda
                </label>
                <input
                  type="text"
                  id="studentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Masukkan nama lengkap Anda"
                  required
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
                <label htmlFor="submissionLink" className="text-sm font-medium flex items-center gap-2">
                  <Send size={16} /> Link Karya (Google Drive / Figma / dll)
                </label>
                <input
                  type="url"
                  id="submissionLink"
                  value={submissionLink}
                  onChange={(e) => setSubmissionLink(e.target.value)}
                  placeholder="https://..."
                  required
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
              
              <div className="flex items-start gap-2 text-sm text-muted" style={{ marginTop: '0.5rem' }}>
                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Pastikan link yang diberikan dapat diakses publik agar instruktur bisa melihat karya Anda.</span>
              </div>
              
              <button 
                type="submit" 
                className="btn-primary flex items-center justify-center gap-2" 
                disabled={isSubmitting || !submissionLink.trim() || !studentName.trim()}
                style={{ marginTop: '1rem' }}
              >
                {isSubmitting ? 'Mengirim...' : (
                  <>
                    <Send size={18} /> Kumpulkan Tugas
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetail;
