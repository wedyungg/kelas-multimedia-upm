import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useGamificationStore } from '../store/useGamificationStore';
import { ArrowLeft, CheckCircle, Send, AlertCircle } from 'lucide-react';

const AssignmentDetail = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { user, completedAssignments, completeAssignment } = useGamificationStore();
  
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
    if (!submissionLink.trim()) return;

    setIsSubmitting(true);

    // Simulate network request or Web3Forms integration
    // To make this work with Web3Forms, replace the URL and add your Access Key below:
    const web3formsAccessKey = ""; // PENGISI PELATIHAN: Masukkan Access Key Web3Forms Anda di sini

    try {
      if (web3formsAccessKey) {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: web3formsAccessKey,
            subject: `Pengumpulan Tugas: ${assignment.title} dari ${user.name}`,
            name: user.name,
            assignment_id: assignment.id,
            submission_link: submissionLink
          })
        });
      } else {
        // Simulated delay if no access key is provided
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.warn("Web3Forms Access Key is not set. Submission simulated locally.");
      }

      completeAssignment(assignment.id);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Gagal mengirim tugas. Silakan coba lagi.");
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
              <div className="flex flex-col gap-2">
                <label htmlFor="submission" className="font-medium text-sm">Link Karya (Google Drive / Portofolio)</label>
                <input 
                  id="submission"
                  type="url" 
                  required
                  placeholder="https://drive.google.com/..."
                  value={submissionLink}
                  onChange={(e) => setSubmissionLink(e.target.value)}
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
                <div className="flex items-start gap-2 text-sm text-muted" style={{ marginTop: '0.5rem' }}>
                  <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Pastikan link yang diberikan dapat diakses publik agar instruktur bisa melihat karya Anda.</span>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="btn-primary flex items-center justify-center gap-2" 
                disabled={isSubmitting || !submissionLink.trim()}
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
