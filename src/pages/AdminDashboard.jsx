import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { LogOut, Plus, Trash2, Edit, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [expandedAssignmentId, setExpandedAssignmentId] = useState(null);
  const navigate = useNavigate();

  // Form State
  const [title, setTitle] = useState('');
  const [trackId, setTrackId] = useState('fotografi');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Ambil tugas (assignments)
      const qAssignments = query(collection(db, 'assignments'), orderBy('createdAt', 'desc'));
      const snapshotA = await getDocs(qAssignments);
      const dataA = snapshotA.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAssignments(dataA);

      // Ambil pengumpulan (submissions)
      const qSubmissions = query(collection(db, 'submissions'), orderBy('createdAt', 'desc'));
      const snapshotS = await getDocs(qSubmissions);
      const dataS = snapshotS.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubmissions(dataS);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchData();
      } else {
        navigate('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'assignments'), {
        title,
        trackId,
        duration,
        description,
        createdAt: serverTimestamp()
      });
      
      // Reset form
      setTitle('');
      setTrackId('fotografi');
      setDuration('');
      setDescription('');
      setIsAdding(false);
      
      // Refresh list
      fetchData();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Gagal menambahkan tugas");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus tugas ini? (Pengumpulan tugas oleh peserta juga bisa menjadi yatim piatu)")) {
      try {
        await deleteDoc(doc(db, 'assignments', id));
        fetchData();
      } catch (error) {
        console.error("Error deleting document: ", error);
        alert("Gagal menghapus tugas");
      }
    }
  };

  if (!user) return <div className="container" style={{ padding: '4rem 0' }}>Memuat...</div>;

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '3rem' }}>
        <div>
          <h1 className="heading-lg">Dashboard Instruktur</h1>
          <p className="text-muted">Kelola tugas peserta dari sini.</p>
        </div>
        <button onClick={handleLogout} className="btn-secondary flex items-center gap-2">
          <LogOut size={16} /> Keluar
        </button>
      </div>

      {!isAdding ? (
        <div style={{ marginBottom: '2rem' }}>
          <button onClick={() => setIsAdding(true)} className="btn-primary flex items-center gap-2">
            <Plus size={18} /> Buat Tugas Baru
          </button>
        </div>
      ) : (
        <div className="card" style={{ marginBottom: '3rem', border: '1px solid var(--primary-accent)' }}>
          <h2 className="heading-md" style={{ marginBottom: '1.5rem' }}>Buat Tugas Baru</h2>
          <form onSubmit={handleAddAssignment} className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="flex flex-col gap-1" style={{ flex: 2 }}>
                <label className="text-sm font-medium">Judul Tugas</label>
                <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="form-input" placeholder="Cth: Proyek Akhir Fotografi" />
              </div>
              <div className="flex flex-col gap-1" style={{ flex: 1 }}>
                <label className="text-sm font-medium">Kategori Track</label>
                <select value={trackId} onChange={e => setTrackId(e.target.value)} className="form-input">
                  <option value="fotografi">Fotografi</option>
                  <option value="desain">Desain Grafis</option>
                  <option value="streaming">Live Streaming</option>
                </select>
              </div>
              <div className="flex flex-col gap-1" style={{ flex: 1 }}>
                <label className="text-sm font-medium">Durasi Pengerjaan</label>
                <input required type="text" value={duration} onChange={e => setDuration(e.target.value)} className="form-input" placeholder="Cth: 1 Minggu" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Deskripsi Lengkap (Dukung Tag HTML)</label>
              <textarea 
                required 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                className="form-input" 
                rows="6"
                placeholder="<h3>Instruksi:</h3><ol><li>Buat foto...</li></ol>"
              ></textarea>
              <span className="text-xs text-muted">Gunakan tag HTML seperti &lt;h3&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;ol&gt;, &lt;li&gt; agar tampilan lebih rapi.</span>
            </div>

            <div className="flex gap-4" style={{ marginTop: '1rem' }}>
              <button type="submit" className="btn-primary">Simpan Tugas</button>
              <button type="button" onClick={() => setIsAdding(false)} className="btn-secondary">Batal</button>
            </div>
          </form>
        </div>
      )}

      <h2 className="heading-md" style={{ marginBottom: '1.5rem' }}>Daftar Tugas Aktif</h2>
      
      {isLoading ? (
        <p className="text-muted">Mengambil data...</p>
      ) : assignments.length === 0 ? (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <p className="text-muted">Belum ada tugas yang dibuat.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {assignments.map(assignment => {
            const assignmentSubmissions = submissions.filter(s => s.assignmentId === assignment.id);
            const isExpanded = expandedAssignmentId === assignment.id;
            
            return (
              <div key={assignment.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-medium" style={{ background: 'var(--bg-element)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                      {assignment.trackId.toUpperCase()}
                    </span>
                    <button onClick={() => handleDelete(assignment.id)} className="text-danger hover-text-main transition-colors" title="Hapus Tugas">
                      <Trash2 size={18} color="var(--danger)" />
                    </button>
                  </div>
                  
                  <div>
                    <h3 className="heading-md" style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{assignment.title}</h3>
                    <p className="text-sm text-muted">Durasi: {assignment.duration}</p>
                  </div>
                  
                  <div style={{ marginTop: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                    <button 
                      onClick={() => setExpandedAssignmentId(isExpanded ? null : assignment.id)}
                      className="flex items-center justify-between w-full text-sm font-medium hover-text-main transition-colors"
                      style={{ color: isExpanded ? 'var(--primary-accent-light)' : 'var(--text-main)' }}
                    >
                      <span className="flex items-center gap-2">
                        Lihat Pengumpulan 
                        <span style={{ background: assignmentSubmissions.length > 0 ? 'var(--primary-accent)' : 'var(--bg-element)', color: assignmentSubmissions.length > 0 ? '#fff' : 'inherit', padding: '0.1rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem' }}>
                          {assignmentSubmissions.length}
                        </span>
                      </span>
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div style={{ background: 'var(--bg-inactive-heavy)', padding: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                    {assignmentSubmissions.length === 0 ? (
                      <p className="text-muted text-sm text-center">Belum ada yang mengumpulkan tugas ini.</p>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {assignmentSubmissions.map((sub, index) => (
                          <div key={sub.id} className="flex justify-between items-center bg-main p-3" style={{ background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                            <div className="flex items-center gap-3">
                              <div className="font-bold text-muted" style={{ width: '24px' }}>#{index + 1}</div>
                              <div>
                                <p className="font-medium text-sm">{sub.studentName}</p>
                                <p className="text-xs text-muted">
                                  {sub.createdAt?.toDate ? sub.createdAt.toDate().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' }) : 'Baru saja'}
                                </p>
                              </div>
                            </div>
                            <a 
                              href={sub.submissionLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="btn-secondary flex items-center gap-2 text-sm"
                              style={{ padding: '0.5rem 1rem' }}
                            >
                              Buka Karya <ExternalLink size={14} />
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Internal styles for form inputs in admin dashboard */}
      <style>{`
        .form-input {
          width: 100%;
          padding: 0.75rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: var(--bg-inactive);
          color: var(--text-main);
          font-family: inherit;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
