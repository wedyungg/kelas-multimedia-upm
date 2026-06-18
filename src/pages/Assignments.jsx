import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGamificationStore } from '../store/useGamificationStore';
import { db } from '../lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { CheckCircle, Clock, Send } from 'lucide-react';

const Assignments = () => {
  const { selectedTracks, completedAssignments } = useGamificationStore();
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const q = query(collection(db, 'assignments'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAssignments(data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  // Filter assignments based on selected tracks
  const relevantAssignments = assignments.filter(a => selectedTracks.includes(a.trackId));
  const otherAssignments = assignments.filter(a => !selectedTracks.includes(a.trackId));

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="heading-lg" style={{ marginBottom: '0.5rem' }}>Tugas & Proyek</h1>
        <p className="text-muted text-lg">Kumpulkan portofolio dan proyek Anda untuk dinilai oleh instruktur.</p>
      </div>

      {isLoading ? (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <p className="text-muted">Memuat daftar tugas terbaru dari server...</p>
        </div>
      ) : selectedTracks.length === 0 ? (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <p className="text-muted mb-4">Anda belum memilih track pembelajaran.</p>
          <Link to="/dashboard" className="btn-primary">Pilih Track di Dashboard</Link>
        </div>
      ) : (
        <>
          <h2 className="heading-md" style={{ marginBottom: '1.5rem' }}>Tugas Aktif Anda</h2>
          {relevantAssignments.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {relevantAssignments.map(assignment => {
                const isCompleted = completedAssignments.includes(assignment.id);
                return (
                  <div key={assignment.id} className="card flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-medium" style={{ 
                        background: isCompleted ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-element)', 
                        color: isCompleted ? 'var(--success)' : 'var(--primary-accent-light)', 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '4px' 
                      }}>
                        {assignment.trackId.toUpperCase()}
                      </span>
                      {isCompleted && <CheckCircle size={20} color="var(--success)" />}
                    </div>
                    
                    <h3 className="heading-md" style={{ fontSize: '1.25rem' }}>{assignment.title}</h3>
                    
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <Clock size={16} />
                      <span>Durasi: {assignment.duration}</span>
                    </div>

                    <Link 
                      to={`/assignment/${assignment.id}`} 
                      className={`flex items-center justify-center gap-2 ${isCompleted ? 'btn-secondary' : 'btn-primary'}`} 
                      style={{ marginTop: 'auto' }}
                    >
                      {isCompleted ? 'Lihat Tugas' : (
                        <>
                          <Send size={18} /> Kerjakan Sekarang
                        </>
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
             <p className="text-muted">Tidak ada tugas untuk track yang Anda pilih.</p>
          )}
          
          {otherAssignments.length > 0 && (
            <div style={{ marginTop: '4rem' }}>
              <h2 className="heading-md" style={{ marginBottom: '1.5rem' }}>Tugas Track Lain</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', opacity: 0.7 }}>
                {otherAssignments.map(assignment => (
                  <div key={assignment.id} className="card flex flex-col gap-4" style={{ borderStyle: 'dashed' }}>
                    <span className="text-xs font-medium text-muted" style={{ background: 'var(--bg-element)', padding: '0.25rem 0.5rem', borderRadius: '4px', alignSelf: 'flex-start' }}>
                      {assignment.trackId.toUpperCase()}
                    </span>
                    <h3 className="heading-md" style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>{assignment.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <Clock size={16} />
                      <span>Durasi: {assignment.duration}</span>
                    </div>
                    <Link to="/dashboard" className="btn-secondary text-center" style={{ marginTop: 'auto' }}>
                      Pilih Track Ini Terlebih Dahulu
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Assignments;
