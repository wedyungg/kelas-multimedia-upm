import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { LogOut, Plus, Trash2, Edit } from 'lucide-react';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  // Form State
  const [title, setTitle] = useState('');
  const [trackId, setTrackId] = useState('fotografi');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchAssignments();
      } else {
        navigate('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchAssignments = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'assignments'));
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
      fetchAssignments();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Gagal menambahkan tugas");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
      try {
        await deleteDoc(doc(db, 'assignments', id));
        fetchAssignments();
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {assignments.map(assignment => (
            <div key={assignment.id} className="card flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <span className="text-xs font-medium" style={{ background: 'var(--bg-element)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                  {assignment.trackId.toUpperCase()}
                </span>
                <button onClick={() => handleDelete(assignment.id)} className="text-danger hover-text-main transition-colors" title="Hapus Tugas">
                  <Trash2 size={18} color="var(--danger)" />
                </button>
              </div>
              
              <h3 className="heading-md" style={{ fontSize: '1.25rem' }}>{assignment.title}</h3>
              <p className="text-sm text-muted">Durasi: {assignment.duration}</p>
            </div>
          ))}
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
