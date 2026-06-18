export const assignments = [
  {
    id: 'tugas-fotografi-1',
    title: 'Proyek Akhir: Bercerita dengan Cahaya',
    trackId: 'fotografi',
    duration: '1 Minggu',
    description: `
      <h3>Tantangan Fotografi</h3>
      <p>Terapkan semua pengetahuan Anda tentang Anatomi Kamera, Lensa, dan Segitiga Eksposur untuk membuat karya fotografi yang bercerita.</p>
      
      <h4>Instruksi Tugas:</h4>
      <ol>
        <li>Buatlah <strong>3 lembar foto</strong> dengan tema yang sama (misal: Kehidupan Jalanan, Kopi di Pagi Hari, atau Suasana Hujan).</li>
        <li>Pastikan Anda menggunakan setting <em>Aperture</em>, <em>Shutter Speed</em>, dan <em>ISO</em> secara manual (M Mode) atau Semi-Manual (A/S Mode).</li>
        <li>Unggah 3 foto tersebut ke Google Drive atau portofolio online Anda (Flickr, 500px, dsb).</li>
        <li>Kirimkan link folder/portofolio tersebut pada kolom di bawah ini. Pastikan akses link bersifat <strong>Publik</strong>.</li>
      </ol>
      <p>Kumpulkan karya terbaik Anda dan tunjukkan kepada kami!</p>
    `
  },
  {
    id: 'tugas-desain-1',
    title: 'Proyek Akhir: Mendesain Poster Film Fiktif',
    trackId: 'desain',
    duration: '2 Minggu',
    description: `
      <h3>Tantangan Desain Grafis</h3>
      <p>Terapkan prinsip-prinsip desain (Kontras, Keseimbangan, Repetisi, Penjajaran, dan Kedekatan) serta hirarki visual untuk mendesain poster yang menarik.</p>
      
      <h4>Instruksi Tugas:</h4>
      <ol>
        <li>Rancang sebuah <strong>Poster Film Fiktif</strong> dengan genre bebas (Sci-Fi, Horor, Drama, dll).</li>
        <li>Gunakan hirarki visual dengan jelas: Judul Film harus menjadi <em>Focal Point</em>. Tambahkan teks pendukung seperti nama sutradara, aktor, dan tanggal rilis.</li>
        <li>Gunakan alat desain favorit Anda (Figma, Adobe Illustrator, Photoshop, atau Canva).</li>
        <li>Simpan hasil akhir dalam format PDF atau PNG/JPG resolusi tinggi, lalu unggah ke Google Drive.</li>
        <li>Kirimkan link Google Drive tersebut pada form di bawah. Pastikan akses link bersifat <strong>Publik</strong>.</li>
      </ol>
      <p>Kami sangat menantikan imajinasi dan kreativitas Anda!</p>
    `
  },
  {
    id: 'tugas-streaming-1',
    title: 'Proyek Akhir: Layout & Routing Audio OBS',
    trackId: 'streaming',
    duration: '1 Minggu',
    description: `
      <h3>Tantangan Live Streaming</h3>
      <p>Siapkan fondasi siaran langsung yang profesional menggunakan OBS Studio.</p>
      
      <h4>Instruksi Tugas:</h4>
      <ol>
        <li>Buatlah 3 buah <strong>Scene</strong> di OBS: <em>Starting Soon</em>, <em>Just Chatting</em>, dan <em>Gameplay/Screen Share</em>.</li>
        <li>Tambahkan filter <em>Noise Suppression</em> dan <em>Compressor</em> pada source mikrofon Anda.</li>
        <li>Rekam video (bukan live) menggunakan tombol <strong>Start Recording</strong> di OBS selama 1-2 menit, memperlihatkan Anda berpindah antar Scene dan berbicara.</li>
        <li>Unggah hasil rekaman (.mkv / .mp4) ke YouTube (set Unlisted) atau Google Drive.</li>
        <li>Kirimkan link video tersebut pada form di bawah ini.</li>
      </ol>
      <p>Buktikan bahwa Anda siap untuk mengudara secara profesional!</p>
    `
  }
];

export const getAssignmentDetails = (assignmentId) => {
  return assignments.find(a => a.id === assignmentId) || null;
};
