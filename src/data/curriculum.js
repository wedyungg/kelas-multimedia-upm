// src/data/curriculum.js

export const trackFotografi = {
  id: 'fotografi',
  title: 'Fotografi',
  description: 'Belajar menangkap momen dengan cahaya dan komposisi.',
  levels: [
    {
      id: 'photo-lvl-1',
      level: 1,
      title: 'Pengamat',
      xpRequired: 0,
      units: [
        { 
          id: 'photo-1-1', 
          title: 'Anatomi Kamera', 
          type: 'read', 
          xp: 20,
          content: `
            <h3>Memahami Senjata Utamamu</h3>
            <p>Kamera modern, baik itu DSLR maupun Mirrorless, pada dasarnya memiliki komponen utama yang sama. Menguasai letak dan fungsi masing-masing adalah langkah pertama menjadi fotografer handal.</p>
            <img src="/images/kamera.png" alt="Anatomi Kamera" style="width:100%; border-radius: 12px; margin: 2rem 0; border: 1px solid var(--border-color);" />
            <ul>
              <li><strong>Body & Sensor:</strong> Jantung dari kamera yang menangkap cahaya dan mengubahnya menjadi gambar digital.</li>
              <li><strong>Viewfinder:</strong> Jendela bidik untuk melihat komposisi sebelum menekan tombol shutter.</li>
              <li><strong>Mode Dial:</strong> Roda bergerigi untuk memilih mode pemotretan (Auto, Manual, Aperture Priority, dll).</li>
            </ul>
            <p>Jangan takut bereksperimen dengan tombol-tombol ini. Kamera tidak akan rusak hanya karena Anda salah memutar <em>dial</em>!</p>
          `
        },
        { 
          id: 'photo-1-2', 
          title: 'Jenis-jenis Lensa', 
          type: 'read', 
          xp: 20,
          content: `
            <h3>Mata Kedua Fotografer</h3>
            <p>Lensa menentukan seberapa luas atau sempit dunia yang bisa ditangkap oleh kameramu.</p>
            <img src="/images/lensa.png" alt="Jenis Lensa" style="width:100%; border-radius: 12px; margin: 2rem 0; border: 1px solid var(--border-color);" />
            <ul>
              <li><strong>Lensa Wide (Misal 16-35mm):</strong> Sangat cocok untuk pemandangan (lanskap) dan arsitektur karena sudut pandangnya yang lebar.</li>
              <li><strong>Lensa Prime (Misal 50mm):</strong> Tidak bisa di-zoom, namun kualitasnya sangat tajam dan biasanya memiliki bukaan (aperture) besar untuk efek blur (bokeh). Cocok untuk potret.</li>
              <li><strong>Lensa Telefoto (Misal 70-200mm):</strong> Digunakan untuk menangkap objek dari jarak jauh, sangat populer di fotografi olahraga dan satwa liar.</li>
            </ul>
          `
        },
        { 
          id: 'photo-1-3', 
          title: 'Perlengkapan Pendukung', 
          type: 'read', 
          xp: 20,
          content: `
            <h3>Di Luar Kamera dan Lensa</h3>
            <p>Selain kamera dan lensa, ada beberapa aksesori yang sangat membantu proses pemotretan:</p>
            <ul>
              <li><strong>Tripod:</strong> Membantu menjaga kamera tetap stabil, terutama saat menggunakan <em>shutter speed</em> lambat.</li>
              <li><strong>Flash Eksternal:</strong> Memberikan kontrol cahaya buatan yang jauh lebih baik daripada flash bawaan kamera.</li>
              <li><strong>Filter Lensa (UV / CPL / ND):</strong> Melindungi lensa depan atau memberikan efek khusus pada gambar (seperti menggelapkan langit atau membuat air mengalir terlihat lembut).</li>
            </ul>
          `
        },
        { id: 'photo-1-quiz', title: 'Kuis Pengenalan Alat', type: 'quiz', xp: 50 }
      ]
    },
    {
      id: 'photo-lvl-2',
      level: 2,
      title: 'Penjepret',
      xpRequired: 200,
      units: [
        { 
          id: 'photo-2-1', 
          title: 'Apa itu Eksposur?', 
          type: 'read', 
          xp: 20,
          content: `
            <h3>Harmoni Cahaya</h3>
            <p>Eksposur adalah tentang seberapa terang atau gelap foto yang dihasilkan. Foto yang terlalu terang disebut <em>overexposed</em>, sementara yang terlalu gelap disebut <em>underexposed</em>.</p>
            <img src="/images/eksposur.png" alt="Segitiga Eksposur" style="width:100%; border-radius: 12px; margin: 2rem 0; border: 1px solid var(--border-color);" />
            <p>Ada tiga elemen utama yang mengatur eksposur ini, yang dikenal sebagai <strong>Segitiga Eksposur</strong>: ISO, Aperture, dan Shutter Speed.</p>
          `
        },
        { 
          id: 'photo-2-2', 
          title: 'ISO: Sensitivitas Cahaya', 
          type: 'read', 
          xp: 20,
          content: `
            <h3>Sensitivitas Sensor</h3>
            <p>ISO menentukan seberapa sensitif sensor kamera terhadap cahaya.</p>
            <ul>
              <li><strong>ISO Rendah (100 - 400):</strong> Digunakan saat cuaca cerah di luar ruangan. Hasil foto sangat jernih dan bebas "noise" (bintik-bintik).</li>
              <li><strong>ISO Tinggi (1600 - 6400+):</strong> Digunakan saat kondisi minim cahaya (malam hari, dalam ruangan gelap). Namun komprominya, gambar akan memiliki banyak <em>noise</em>.</li>
            </ul>
          `
        },
        { 
          id: 'photo-2-3', 
          title: 'Aperture: Bukaan Lensa', 
          type: 'read', 
          xp: 30,
          content: `
            <h3>Mengatur Bukaan Lensa</h3>
            <p>Aperture (atau f-stop) seperti pupil mata kita. Semakin besar ia terbuka, semakin banyak cahaya yang masuk ke dalam sensor.</p>
            <img src="/images/aperture.png" alt="Ilustrasi Aperture" style="width:100%; border-radius: 12px; margin: 2rem 0; border: 1px solid var(--border-color);" />
            <ul>
              <li><strong>Aperture Besar (Misal f/1.4 atau f/1.8):</strong> Angka kecil berarti bukaan besar. Cahaya masuk sangat banyak, dan area yang fokus sangat sempit (<em>Depth of Field dangkal</em>). Hasilnya, subjek utama tajam namun latar belakangnya sangat blur (bokeh). Sangat cocok untuk foto potret atau produk.</li>
              <li><strong>Aperture Kecil (Misal f/11 atau f/16):</strong> Angka besar berarti bukaan kecil. Cahaya yang masuk lebih sedikit, namun area yang fokus sangat luas. Hasilnya, seluruh gambar dari depan hingga belakang akan terlihat tajam. Biasanya digunakan untuk memotret pemandangan (lanskap).</li>
            </ul>
            <p>Satu hal yang perlu diingat: Mengubah aperture tidak hanya berdampak pada blur (bokeh), tetapi juga pada jumlah cahaya. Jika Anda menggunakan aperture kecil (f/16) di tempat gelap, foto akan menjadi sangat gelap kecuali Anda menurunkan <em>shutter speed</em> atau menaikkan <em>ISO</em>.</p>
          `
        },
        { 
          id: 'photo-2-4', 
          title: 'Shutter Speed', 
          type: 'read', 
          xp: 20,
          content: `
            <h3>Membekukan Waktu</h3>
            <p>Shutter speed adalah seberapa lama sensor kamera "terbuka" untuk menangkap cahaya.</p>
            <ul>
              <li><strong>Shutter Speed Cepat (Misal 1/1000 detik):</strong> Membekukan gerakan (freeze motion). Sangat berguna untuk olahraga atau burung yang terbang.</li>
              <li><strong>Shutter Speed Lambat (Misal 1/10 detik atau lebih lambat):</strong> Membuat efek pergerakan menjadi blur (motion blur), seperti efek air terjun yang selembut kapas atau lampu mobil yang memanjang di malam hari. <em>Biasanya membutuhkan tripod!</em></li>
            </ul>
          `
        },
        { id: 'photo-2-quiz', title: 'Kuis Segitiga Eksposur', type: 'quiz', xp: 80 }
      ]
    },
    {
      id: 'photo-lvl-3',
      level: 3,
      title: 'Komposer',
      xpRequired: 500,
      units: [] // Placeholder for Phase 2
    }
  ]
};

export const trackDesain = {
  id: 'desain',
  title: 'Desain Grafis',
  description: 'Berkomunikasi melalui visual, tipografi, dan ruang.',
  levels: [
    {
      id: 'design-lvl-1',
      level: 1,
      title: 'Pengamat Estetika',
      xpRequired: 0,
      units: [
        { 
          id: 'design-1-1', 
          title: 'Apa itu Desain Grafis?', 
          type: 'read', 
          xp: 20,
          content: `
            <h3>Lebih dari Sekadar "Cantik"</h3>
            <p>Desain grafis bukan hanya tentang membuat sesuatu terlihat estetis atau indah. Pada intinya, desain grafis adalah <strong>komunikasi visual</strong> dan <strong>pemecahan masalah</strong>.</p>
            <img src="/images/desain.png" alt="Konsep Desain" style="width:100%; border-radius: 12px; margin: 2rem 0; border: 1px solid var(--border-color);" />
            <p>Setiap warna, bentuk, garis, dan huruf yang Anda pilih harus memiliki tujuan yang mendukung pesan yang ingin disampaikan.</p>
          `
        },
        { 
          id: 'design-1-2', 
          title: 'Elemen Dasar Desain', 
          type: 'read', 
          xp: 20,
          content: `
            <h3>Blok Bangunan Visual</h3>
            <p>Setiap desain tersusun dari elemen-elemen dasar berikut:</p>
            <ul>
              <li><strong>Garis (Line):</strong> Membagi ruang, mengarahkan mata, atau menekankan kata.</li>
              <li><strong>Bentuk (Shape):</strong> Area 2D yang dibatasi (bisa geometris seperti lingkaran/persegi, atau organik).</li>
              <li><strong>Warna (Color):</strong> Mengatur <em>mood</em> dan emosi. Warna merah bisa berarti semangat atau bahaya, biru bisa berarti tenang atau profesional.</li>
              <li><strong>Ruang (Space / Negative Space):</strong> Area kosong di antara elemen desain, sangat krusial agar desain bisa "bernapas".</li>
            </ul>
          `
        },
        { 
          id: 'design-1-3', 
          title: 'Prinsip Desain', 
          type: 'read', 
          xp: 30,
          content: `
            <h3>Aturan Main Visual</h3>
            <p>Jika elemen (seperti garis dan bentuk) adalah bahan baku, maka <strong>Prinsip Desain</strong> adalah resep cara menyatukannya agar menjadi komposisi yang lezat dan masuk akal.</p>
            <img src="/images/prinsip_desain.png" alt="Prinsip Desain" style="width:100%; border-radius: 12px; margin: 2rem 0; border: 1px solid var(--border-color);" />
            <p>Berikut adalah 5 prinsip utama yang harus dikuasai:</p>
            <ul>
              <li><strong>Kontras (Contrast):</strong> Membuat dua hal yang berbeda menjadi "sangat berbeda" (misal: teks putih di atas latar hitam, atau font besar bersebelahan dengan font kecil). Kontras adalah cara terbaik untuk menarik perhatian mata dan menciptakan penekanan.</li>
              <li><strong>Keseimbangan (Balance):</strong> Distribusi "berat visual" dalam desain. Bisa berupa simetris (kiri-kanan sama persis, memberi kesan formal/kaku) atau asimetris (berbeda bentuk namun terasa seimbang, memberi kesan dinamis/modern).</li>
              <li><strong>Repetisi (Repetition):</strong> Mengulang elemen tertentu (seperti warna yang sama, jenis font yang sama, atau bentuk yang sama) di seluruh desain untuk menciptakan konsistensi dan kesatuan.</li>
              <li><strong>Penjajaran (Alignment):</strong> Tidak ada elemen yang boleh diletakkan sembarangan. Setiap elemen harus memiliki koneksi visual dengan elemen lain di halaman (misal: rata kiri, rata tengah). Penjajaran membuat desain terlihat bersih dan teratur.</li>
              <li><strong>Kedekatan (Proximity):</strong> Mengelompokkan elemen-elemen yang saling berkaitan secara berdekatan. Jika dua teks saling berjauhan, audiens akan mengira keduanya tidak berhubungan.</li>
            </ul>
            <p>Dengan menerapkan prinsip-prinsip di atas, desain yang tadinya terlihat "amatir" akan seketika terlihat rapi dan profesional.</p>
          `
        },
        { id: 'design-1-quiz', title: 'Kuis Tujuan Desain', type: 'quiz', xp: 50 }
      ]
    },
    {
      id: 'design-lvl-2',
      level: 2,
      title: 'Penyusun',
      xpRequired: 200,
      units: [
        { 
          id: 'design-2-1', 
          title: 'Hirarki Visual', 
          type: 'read', 
          xp: 20,
          content: `
            <h3>Mengarahkan Mata Pembaca</h3>
            <p>Hirarki visual adalah cara desainer mengontrol urutan informasi mana yang dibaca audiens terlebih dahulu, kedua, dan seterusnya.</p>
            <img src="/images/hirarki.png" alt="Hirarki Visual" style="width:100%; border-radius: 12px; margin: 2rem 0; border: 1px solid var(--border-color);" />
            <p>Tanpa hirarki, sebuah desain akan terasa kacau karena semua elemen "berteriak" meminta perhatian dalam waktu bersamaan.</p>
          `
        },
        { 
          id: 'design-2-2', 
          title: 'Ukuran, Warna & Posisi', 
          type: 'read', 
          xp: 20,
          content: `
            <h3>Alat Menciptakan Hirarki</h3>
            <p>Bagaimana cara kita membuat hirarki yang baik?</p>
            <ul>
              <li><strong>Ukuran:</strong> Secara alami, mata kita akan melihat elemen yang paling besar terlebih dahulu.</li>
              <li><strong>Warna:</strong> Warna yang cerah dan kontras (misal kuning terang di atas latar gelap) akan langsung menarik perhatian dibanding warna abu-abu atau pudar.</li>
              <li><strong>Posisi:</strong> Dalam budaya baca Barat/Indonesia, kita terbiasa membaca dari Kiri ke Kanan, Atas ke Bawah. Menempatkan informasi penting di bagian atas (Top Left) adalah teknik yang efektif.</li>
            </ul>
          `
        },
        { 
          id: 'design-2-3', 
          title: 'Focal Point dan Flow', 
          type: 'read', 
          xp: 20,
          content: `
            <h3>Titik Pusat dan Aliran Visual</h3>
            <p><strong>Focal Point</strong> adalah elemen pertama yang ditangkap mata. Bisa berupa <em>headline</em> yang sangat besar, atau gambar orang yang menatap langsung ke audiens.</p>
            <p><strong>Flow</strong> adalah jalur yang diambil mata setelah melihat focal point. Desainer menggunakan garis, tatapan mata subjek dalam foto, atau elemen repetisi untuk memandu mata audiens menjelajahi sisa informasi dalam desain tersebut.</p>
          `
        },
        { id: 'design-2-quiz', title: 'Kuis Hirarki Visual', type: 'quiz', xp: 80 }
      ]
    },
    {
      id: 'design-lvl-3',
      level: 3,
      title: 'Tipografer',
      xpRequired: 500,
      units: [] // Placeholder for Phase 2
    }
  ]
};

export const trackStreaming = {
  id: 'streaming',
  title: 'Live Streaming',
  description: 'Siaran langsung, manajemen alat, audio, dan OBS.',
  levels: [
    {
      id: 'stream-lvl-1',
      level: 1,
      title: 'Broadcaster Pemula',
      xpRequired: 0,
      units: [
        { 
          id: 'stream-1-1', 
          title: 'Pengenalan Setup Streaming', 
          type: 'read', 
          xp: 30,
          content: `
            <h3>Fondasi Siaran Langsung</h3>
            <p>Live streaming menggabungkan berbagai perangkat keras dan lunak agar gambar dan suara Anda bisa sampai ke penonton dengan kualitas terbaik tanpa gangguan (delay atau lag).</p>
            <img src="/images/streaming_setup.png" alt="Streaming Setup" style="width:100%; border-radius: 12px; margin: 2rem 0; border: 1px solid var(--border-color);" />
            <p>Alat-alat dasar untuk setup live streaming profesional:</p>
            <ul>
              <li><strong>Kamera & Lensa:</strong> Kamera Mirrorless atau Webcam berkualitas tinggi. Jika menggunakan Mirrorless, Anda membutuhkan lensa dengan <em>aperture</em> besar untuk efek blur latar belakang dan koneksi kabel HDMI.</li>
              <li><strong>Capture Card:</strong> Alat penerjemah sinyal dari kamera (HDMI) menjadi sinyal digital (USB) yang bisa dibaca komputer.</li>
              <li><strong>Pencahayaan (Lighting):</strong> Key Light (cahaya utama) dan Fill Light. Cahaya adalah kunci utama; webcam murah dengan cahaya bagus jauh lebih baik daripada kamera mahal tanpa cahaya.</li>
            </ul>
          `
        },
        { 
          id: 'stream-1-2', 
          title: 'Kabel, Koneksi & Cable Management', 
          type: 'read', 
          xp: 20,
          content: `
            <h3>Signal Chain: Urat Nadi Streaming</h3>
            <p>Menghubungkan alat bukan sekadar colok-mencolok. Pahami alur sinyalnya (Signal Chain).</p>
            <ul>
              <li><strong>Kabel Video (HDMI & USB):</strong> HDMI dari kamera masuk ke Capture Card, kemudian USB dari Capture Card masuk ke Komputer. Hindari kabel HDMI yang terlalu panjang agar tidak <em>delay</em>.</li>
              <li><strong>Kabel Audio (XLR & Jack 3.5mm):</strong> Mikrofon kelas studio menggunakan kabel XLR yang masuk ke Audio Interface, sebelum akhirnya dihubungkan ke komputer via USB.</li>
            </ul>
            <p><strong>Pra dan Pasca Cable Management:</strong> Selalu rapikan kabel menggunakan velcro. Kabel yang berantakan tidak hanya tidak enak dipandang, tapi juga berisiko tinggi tersandung dan merusak port alat-alat mahal Anda saat live.</p>
          `
        },
        { id: 'stream-1-quiz', title: 'Kuis Hardware Streaming', type: 'quiz', xp: 50 }
      ]
    },
    {
      id: 'stream-lvl-2',
      level: 2,
      title: 'Pengendali Siaran',
      xpRequired: 200,
      units: [
        { 
          id: 'stream-2-1', 
          title: 'Dasar Audio Mixing', 
          type: 'read', 
          xp: 30,
          content: `
            <h3>Menjaga Kualitas Suara</h3>
            <p>Audio yang buruk akan langsung membuat penonton kabur, meskipun visual Anda sebagus film bioskop.</p>
            <img src="/images/audio_mixer.png" alt="Audio Mixer" style="width:100%; border-radius: 12px; margin: 2rem 0; border: 1px solid var(--border-color);" />
            <p>Prinsip dasar pada Audio Mixer / Interface:</p>
            <ul>
              <li><strong>Gain vs Volume:</strong> <em>Gain</em> adalah seberapa sensitif mic menangkap suara dari ruangan. <em>Volume (Fader)</em> adalah seberapa keras suara tersebut dikirim ke penonton. Atur Gain secukupnya agar tidak "bocor", lalu naikkan Volume.</li>
              <li><strong>Peaking (Zona Merah):</strong> Pastikan indikator lampu audio Anda berada di area hijau dan kuning. Jika masuk ke warna merah (peaking), suara akan pecah dan menyakitkan telinga penonton.</li>
            </ul>
          `
        },
        { 
          id: 'stream-2-2', 
          title: 'Operasional OBS Studio', 
          type: 'read', 
          xp: 30,
          content: `
            <h3>Pusat Komando: OBS Studio</h3>
            <p>OBS (Open Broadcaster Software) adalah aplikasi standar industri untuk live streaming.</p>
            <img src="/images/obs_studio.png" alt="OBS Studio" style="width:100%; border-radius: 12px; margin: 2rem 0; border: 1px solid var(--border-color);" />
            <ul>
              <li><strong>Scenes:</strong> Kumpulan layout. Anda bisa membuat scene "Starting Soon", "Just Chatting" (wajah penuh), dan "Gameplay" (layar game + wajah kecil).</li>
              <li><strong>Sources:</strong> Elemen-elemen di dalam satu scene. Bisa berupa kamera (Video Capture Device), layar (Display Capture), gambar, atau teks.</li>
              <li><strong>Audio Mixer Panel:</strong> Pastikan Anda melakukan <em>mute</em> pada audio desktop jika tidak ingin suara notifikasi komputer masuk ke siaran. Tambahkan filter <em>Noise Suppression</em> pada mikrofon untuk menghilangkan suara kipas PC.</li>
            </ul>
          `
        },
        { id: 'stream-2-quiz', title: 'Kuis Audio & OBS', type: 'quiz', xp: 80 }
      ]
    }
  ]
};

export const getUnitDetails = (unitId) => {
  const allTracks = [trackFotografi, trackDesain, trackStreaming];
  for (const track of allTracks) {
    for (const level of track.levels) {
      const unit = level.units.find(u => u.id === unitId);
      if (unit) {
        return { ...unit, trackId: track.id, levelId: level.id, levelNum: level.level };
      }
    }
  }
  return null;
};
