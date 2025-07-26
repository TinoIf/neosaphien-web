// ======================= Logika untuk Navbar Mobile =======================
const tombolMenu = document.getElementById('tombol-menu')
const menuSeluler = document.getElementById('menu-seluler')

// Pastikan elemennya ada sebelum menambahkan event listener
if (tombolMenu && menuSeluler) {
  tombolMenu.addEventListener('click', function () {
    menuSeluler.classList.toggle('hidden')
  })
}

// ======================= Logika untuk Efek Parallax di Hero Section =======================
const latarParallax = document.getElementById('latar-parallax')

// Pastikan elemennya ada sebelum menambahkan event listener
if (latarParallax) {
  window.addEventListener('scroll', function () {
    let posisiScroll = window.pageYOffset
    latarParallax.style.transform = 'translateY(' + posisiScroll * 0.6 + 'px)'
  })
}
// ======================= Logika untuk Efek Ketik Murni di Hero Section =======================
const elemenKetik = document.getElementById('efek-ketik')
const daftarTeks = [
  'Belajar Apapun. Kapanpun. Secara Digital.',
  'Evolve Your Mind. Shape Your Future.',
]

// Pastikan elemennya ada sebelum menjalankan fungsi
if (elemenKetik) {
  let indexTeks = 0
  let indexKarakter = 0
  let sedangMenghapus = false

  function ketikDanHapus() {
    const teksSaatIni = daftarTeks[indexTeks]

    if (sedangMenghapus) {
      // Proses menghapus teks
      elemenKetik.textContent = teksSaatIni.substring(0, indexKarakter - 1)
      indexKarakter--

      // Jika sudah selesai menghapus
      if (indexKarakter === 0) {
        sedangMenghapus = false
        indexTeks++ // Lanjut ke teks berikutnya
        // Jika sudah di akhir daftar, kembali ke awal
        if (indexTeks >= daftarTeks.length) {
          indexTeks = 0
        }
      }
    } else {
      // Proses mengetik teks
      elemenKetik.textContent = teksSaatIni.substring(0, indexKarakter + 1)
      indexKarakter++

      // Jika sudah selesai mengetik satu kalimat
      if (indexKarakter === teksSaatIni.length) {
        sedangMenghapus = true
        // Beri jeda waktu sebelum mulai menghapus
        setTimeout(ketikDanHapus, 2000) // Jeda 2 detik
        return // Hentikan fungsi sementara
      }
    }

    // Atur kecepatan mengetik dan menghapus
    const kecepatan = sedangMenghapus ? 40 : 80
    setTimeout(ketikDanHapus, kecepatan)
  }

  // Mulai animasi
  ketikDanHapus()
}
// ======================= Logika untuk Progressive Disclosure di Features Section =======================

// 1. Ambil semua tombol "Selengkapnya" yang ada
const semuaTombolDetail = document.querySelectorAll('.tombol-detail')

// 2. Loop setiap tombol dan berikan event listener
semuaTombolDetail.forEach(function (tombol) {
  tombol.addEventListener('click', function () {
    // 3. Cari elemen detail yang berada di dalam "wrapper" yang sama dengan tombol
    const wrapperTombol = tombol.parentElement
    const kontenDetail = wrapperTombol.querySelector('.detail-fitur')

    // 4. Toggle class 'hidden' untuk menampilkan/menyembunyikan detail
    kontenDetail.classList.toggle('hidden')

    // 5. (Opsional tapi bagus) Ubah teks tombolnya
    if (kontenDetail.classList.contains('hidden')) {
      tombol.textContent = 'Selengkapnya'
    } else {
      tombol.textContent = 'Sembunyikan'
    }
  })
})
// ======================= Data dan Logika untuk Testimonials Section (REVISI FINAL 2) =======================

// 1. DATA:
const daftarTestimoni = [
  {
    nama: 'Budi Hartono',
    jabatan: 'Machine Learning Engineer',
    foto: 'https://i.pravatar.cc/150?u=budi',
    rating: 5,
    kutipan:
      'Kurikulum di NeoSaphien selangkah di depan. Adaptive path membuat saya fokus pada kelemahan saya hingga benar-benar paham. Luar biasa!',
  },
  {
    nama: 'Citra Lestari',
    jabatan: 'Product Designer',
    foto: 'https://i.pravatar.cc/150?u=citra',
    rating: 5,
    kutipan:
      'NeoSaphien mengubah cara saya berpikir tentang desain. Ini bukan sekadar belajar tools, tapi belajar problem-solving. Sangat direkomendasikan.',
  },
  {
    nama: 'Doni Saputra',
    jabatan: 'Mahasiswa IT',
    foto: 'https://i.pravatar.cc/150?u=doni',
    rating: 4,
    kutipan:
      'Menjadi pelengkap materi kuliah yang sangat solid. Penjelasannya mudah dipahami dan studi kasusnya relevan dengan industri saat ini.',
  },
  {
    nama: 'Rina Amelia',
    jabatan: 'Data Analyst',
    foto: 'https://i.pravatar.cc/150?u=rina',
    rating: 5,
    kutipan:
      'Fitur Cloud Workspace sangat membantu. Saya bisa langsung praktik tanpa pusing memikirkan instalasi di laptop saya. Sangat efisien.',
  },
]

// 2. LOGIKA:
const carouselTrack = document.getElementById('carousel-track')
const tombolPrev = document.getElementById('tombol-prev')
const tombolNext = document.getElementById('tombol-next')

if (carouselTrack) {
  let indexSlideSaatIni = 0
  let jumlahSlide = 0
  let intervalAutoSlide

  function buatKartuHtml(testimoni) {
    let bintangHtml = ''
    for (let i = 0; i < 5; i++) {
      const warnaBintang =
        i < testimoni.rating ? 'text-yellow-400' : 'text-gray-600'
      bintangHtml += `<svg class="w-4 h-4 ${warnaBintang}" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`
    }

    // Perubahan utama ada di baris di bawah ini: 'flex', 'flex-col', dan 'h-full'
    return `
        <div class="kartu-testimoni bg-gray-900/50 p-6 rounded-lg flex flex-col h-full">
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <img src="${testimoni.foto}" alt="${testimoni.nama}" class="w-12 h-12 rounded-full object-cover border-2 border-purple-500/50">
                    <div class="ml-4 text-left">
                        <p class="font-bold text-white">${testimoni.nama}</p>
                        <p class="text-sm text-gray-400">${testimoni.jabatan}</p>
                    </div>
                </div>
                <div class="flex">${bintangHtml}</div>
            </div>
            <blockquote class="text-sm text-gray-300 italic mt-4 flex-grow">
                "${testimoni.kutipan}"
            </blockquote>
        </div>
    `
  }

  function bangunCarousel() {
    carouselTrack.innerHTML = ''
    let itemsPerSlide = window.innerWidth < 768 ? 1 : 2

    for (let i = 0; i < daftarTestimoni.length; i += itemsPerSlide) {
      const slide = document.createElement('div')
      slide.className = 'w-full flex-shrink-0'

      const gridContainer = document.createElement('div')
      gridContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-8 p-4'

      gridContainer.innerHTML += buatKartuHtml(daftarTestimoni[i])

      if (i + 1 < daftarTestimoni.length && itemsPerSlide === 2) {
        gridContainer.innerHTML += buatKartuHtml(daftarTestimoni[i + 1])
      }

      slide.appendChild(gridContainer)
      carouselTrack.appendChild(slide)
    }
    jumlahSlide = carouselTrack.children.length
  }

  function tampilkanSlide(index) {
    // REVISI KUNCI: Backslash (\) telah dihapus dari baris ini.
    carouselTrack.style.transform = `translateX(-${index * 100}%)`
  }

  function mulaiAutoSlide() {
    intervalAutoSlide = setInterval(() => {
      indexSlideSaatIni = (indexSlideSaatIni + 1) % jumlahSlide
      tampilkanSlide(indexSlideSaatIni)
    }, 4000) // REVISI: Waktu diubah menjadi 4 detik
  }

  function resetAutoSlide() {
    clearInterval(intervalAutoSlide)
    mulaiAutoSlide()
  }

  if (tombolNext && tombolPrev) {
    tombolNext.addEventListener('click', () => {
      indexSlideSaatIni = (indexSlideSaatIni + 1) % jumlahSlide
      tampilkanSlide(indexSlideSaatIni)
      resetAutoSlide()
    })

    tombolPrev.addEventListener('click', () => {
      indexSlideSaatIni = (indexSlideSaatIni - 1 + jumlahSlide) % jumlahSlide
      tampilkanSlide(indexSlideSaatIni)
      resetAutoSlide()
    })
  }

  bangunCarousel()
  mulaiAutoSlide()
  window.addEventListener('resize', bangunCarousel)
}
// ======================= Logika untuk Animasi Scroll BERTINGKAT di Halaman About =======================
const wadahTimeline = document.getElementById('wadah-timeline')

if (wadahTimeline) {
  const semuaItemTimeline = wadahTimeline.querySelectorAll('.timeline-item')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Jika kontainer timeline masuk ke dalam viewport
        if (entry.isIntersecting) {
          // Loop setiap item di dalamnya dan berikan animasi dengan jeda
          semuaItemTimeline.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('is-visible')
            }, index * 500) // Jeda 200 milidetik antar setiap item
          })

          // Hentikan pengamatan setelah animasi berjalan sekali agar tidak berulang
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1, // Picu saat 10% kontainer terlihat
    }
  )

  // Mulai amati kontainer timeline
  observer.observe(wadahTimeline)
}
// ======================= Logika untuk Sistem Tab di Halaman Services (Revisi) =======================
const semuaTombolTab = document.querySelectorAll('.tab-tombol')
const semuaPanelTab = document.querySelectorAll('.tab-panel')

semuaTombolTab.forEach((tombol) => {
  tombol.addEventListener('click', () => {
    // Hapus kelas 'tab-aktif' dari semua tombol
    semuaTombolTab.forEach((btn) => btn.classList.remove('tab-aktif'))
    // Tambahkan kelas 'tab-aktif' hanya ke tombol yang diklik
    tombol.classList.add('tab-aktif')

    const targetPanelId = tombol.dataset.target

    // Sembunyikan semua panel
    semuaPanelTab.forEach((panel) => panel.classList.add('hidden'))
    // Tampilkan panel yang ditargetkan
    document.querySelector(targetPanelId).classList.remove('hidden')
  })
})
// ======================= Data dan Logika untuk Halaman Services =======================

// 1. DATA KURSUS
const daftarKursus = [
  {
    nama: 'Full-Stack Web Developer',
    kategori: 'web-dev',
    deskripsi:
      'Menguasai front-end dan back-end untuk membangun aplikasi web modern dari nol.',
    harga: 'Rp 3.500.000',
    gambar:
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    nama: 'Machine Learning Fundamentals',
    kategori: 'data-science',
    deskripsi:
      'Memahami konsep dasar dan algoritma inti dalam machine learning dengan Python.',
    harga: 'Rp 4.250.000',
    gambar:
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    nama: 'UI/UX Design with Figma',
    kategori: 'ui-ux',
    deskripsi:
      'Mendesain antarmuka yang indah dan fungsional menggunakan tools standar industri.',
    harga: 'Rp 2.750.000',
    gambar:
      'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    nama: 'Advanced Data Analysis',
    kategori: 'data-science',
    deskripsi:
      'Teknik analisis data tingkat lanjut, visualisasi, dan business intelligence.',
    harga: 'Rp 4.500.000',
    gambar:
      'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    nama: 'Interactive Front-End with React',
    kategori: 'web-dev',
    deskripsi:
      'Membangun UI yang dinamis dan interaktif menggunakan library React.js.',
    harga: 'Rp 3.750.000',
    gambar:
      'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    nama: 'Design Thinking for UX',
    kategori: 'ui-ux',
    deskripsi:
      'Memahami proses design thinking untuk menciptakan produk yang berpusat pada pengguna.',
    harga: 'Rp 2.500.000',
    gambar:
      'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
]

// 2. LOGIKA UNTUK KATALOG & FILTER
const wadahGrid = document.getElementById('katalog-grid')
const semuaTombolFilter = document.querySelectorAll('.filter-tombol')

// Fungsi untuk menampilkan kursus ke dalam grid
function tampilkanKursus(daftar) {
  wadahGrid.innerHTML = '' // Kosongkan grid terlebih dahulu
  daftar.forEach((kursus) => {
    const kartuHtml = `
            <div class="kartu-fitur group bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden flex flex-col">
                <div class="h-48 overflow-hidden">
                    <img src="${kursus.gambar}" alt="${kursus.nama}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                </div>
                <div class="p-6 flex-grow flex flex-col">
                    <h3 class="text-xl font-bold text-white">${kursus.nama}</h3>
                    <p class="text-sm text-gray-400 mt-2 flex-grow">${kursus.deskripsi}</p>
                    <div class="mt-6 flex justify-between items-center">
                        <span class="text-lg font-bold text-purple-400">${kursus.harga}</span>
                        <a href="#" class="bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors">Daftar</a>
                    </div>
                </div>
            </div>
        `
    wadahGrid.innerHTML += kartuHtml
  })
}

// Logika untuk tombol filter
semuaTombolFilter.forEach((tombol) => {
  tombol.addEventListener('click', () => {
    // Hapus kelas aktif dari semua tombol
    semuaTombolFilter.forEach((btn) =>
      btn.classList.remove('filter-aktif', 'bg-purple-600')
    )

    // Tambahkan kelas non-aktif ke semua tombol
    semuaTombolFilter.forEach((btn) => {
      btn.classList.add('bg-gray-700', 'hover:bg-gray-600')
    })

    // Tambahkan kelas aktif ke tombol yang diklik
    tombol.classList.add('filter-aktif', 'bg-purple-600')
    tombol.classList.remove('bg-gray-700', 'hover:bg-gray-600')

    const filter = tombol.dataset.filter

    if (filter === 'all') {
      tampilkanKursus(daftarKursus)
    } else {
      const kursusTerfilter = daftarKursus.filter(
        (kursus) => kursus.kategori === filter
      )
      tampilkanKursus(kursusTerfilter)
    }
  })
})

// Tampilkan semua kursus saat halaman pertama kali dimuat
if (wadahGrid) {
  tampilkanKursus(daftarKursus)
}
// ======================= Logika untuk Kalkulator Harga =======================
const formKalkulator = document.getElementById('form-kalkulator')
const tampilanTotalHarga = document.getElementById('total-harga')
const ringkasanPilihan = document.getElementById('ringkasan-pilihan')

// Fungsi untuk menghitung dan menampilkan total harga
function hitungTotalHarga() {
  if (!formKalkulator) return // Hentikan jika form tidak ada di halaman

  let totalHarga = 0
  const itemTerpilih = []

  // Ambil harga dari paket dasar (radio button) yang dipilih
  const paketTerpilih = formKalkulator.querySelector(
    'input[name="paket"]:checked'
  )
  if (paketTerpilih) {
    totalHarga += parseInt(paketTerpilih.dataset.harga)
    itemTerpilih.push({
      nama: `Paket ${paketTerpilih.value}`,
      harga: parseInt(paketTerpilih.dataset.harga),
    })
  }

  // Ambil harga dari semua fitur tambahan (checkbox) yang dipilih
  const addonTerpilih = formKalkulator.querySelectorAll(
    'input[name="addon"]:checked'
  )
  addonTerpilih.forEach((addon) => {
    totalHarga += parseInt(addon.dataset.harga)
    itemTerpilih.push({
      nama: addon.value,
      harga: parseInt(addon.dataset.harga),
    })
  })

  // Format harga ke dalam format Rupiah
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  })
  tampilanTotalHarga.textContent = formatter.format(totalHarga)

  // Tampilkan ringkasan pilihan
  if (itemTerpilih.length > 0) {
    ringkasanPilihan.innerHTML =
      '<p class="font-bold text-white mb-2">Ringkasan:</p>'
    const list = document.createElement('ul')
    list.className = 'list-disc list-inside text-gray-300'
    itemTerpilih.forEach((item) => {
      const listItem = document.createElement('li')
      listItem.textContent = `${item.nama} (${formatter.format(item.harga)})`
      list.appendChild(listItem)
    })
    ringkasanPilihan.appendChild(list)
  } else {
    ringkasanPilihan.innerHTML =
      '<p class="text-gray-400 text-center">Silakan pilih paket untuk melihat ringkasan.</p>'
  }
}

// Tambahkan event listener ke form
if (formKalkulator) {
  formKalkulator.addEventListener('change', hitungTotalHarga)
  // Jalankan sekali saat halaman dimuat untuk inisialisasi
  hitungTotalHarga()
}
// ======================= Data dan Logika untuk Halaman Portfolio =======================

// 1. DATA KISAH SUKSES
// REVISI: Ganti seluruh array ini dengan data baru yang sudah disesuaikan
const daftarKisahSukses = [
  {
    id: 'ks1',
    nama: 'Citra Lestari',
    judul: 'Dari Fresh Graduate di Banten menjadi Product Designer',
    kategori: 'pindah-karir',
    lokasi: { top: '65.43%', left: '24.31%' }, // Koordinat Banten Anda
    kutipanTestimoni:
      'NeoSaphien mengubah cara saya berpikir tentang desain. Ini bukan sekadar belajar tools, tapi belajar problem-solving.',
    ceritaLengkap:
      'Citra, seorang fresh graduate dari Serang, Banten, merasa kesulitan mencari pekerjaan. Setelah mengambil jalur belajar UI/UX di NeoSaphien, ia berhasil membangun portfolio yang kuat dan kini menjadi Product Designer di sebuah startup edutech ternama.',
    gambarProyek: [
      'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
  },
  {
    id: 'ks2',
    nama: 'Budi Hartono',
    judul: 'Mahasiswa dari Yogyakarta yang Membangun Startup',
    kategori: 'mahasiswa',
    lokasi: { top: '70.12%', left: '33.61%' }, // Koordinat Jogja Anda
    kutipanTestimoni:
      'Fitur Cloud Workspace sangat membantu. Saya bisa langsung praktik tanpa pusing memikirkan instalasi di laptop saya.',
    ceritaLengkap:
      "Budi adalah seorang mahasiswa tingkat akhir di Yogyakarta. Dengan mengikuti kursus 'Full-Stack Web Developer', ia berhasil membuat prototipe startup-nya sendiri dan mendapatkan pendanaan awal dari sebuah inkubator lokal.",
    gambarProyek: [
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
  },
  {
    id: 'ks3',
    nama: 'Rina Amelia',
    judul: 'Beralih Karir menjadi Data Analyst di Bali',
    kategori: 'pindah-karir',
    lokasi: { top: '72.59%', left: '49.31%' }, // Koordinat Bali Anda
    kutipanTestimoni:
      'Materi machine learning di NeoSaphien sangat menantang tapi rewarding. Saya tidak pernah menyangka bisa beralih karir secepat ini.',
    ceritaLengkap:
      "Merasa jenuh dengan pekerjaan di bidang pariwisata, Rina dari Bali memutuskan untuk beralih ke dunia data. Ia mengambil jalur belajar 'Data Science' di NeoSaphien dan kini bekerja sebagai Data Analyst yang menganalisa tren pariwisata untuk sebuah perusahaan travel besar.",
    gambarProyek: [
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
  },
  {
    id: 'ks4',
    nama: 'Agus Santoso',
    judul: 'Aktivis Lingkungan di Pontianak (Kalbar)',
    kategori: 'social-impact',
    lokasi: { top: '42.47%', left: '35.28%' }, // Koordinat Kalbar Anda
    kutipanTestimoni:
      'Dengan ilmu data dari NeoSaphien, organisasi kami sekarang bisa memetakan deforestasi dengan lebih akurat.',
    ceritaLengkap:
      'Agus adalah seorang aktivis lingkungan di Kalimantan Barat. Ia menggunakan skill analisis data yang dipelajarinya untuk mengolah data citra satelit, membantu organisasinya dalam upaya konservasi hutan.',
    gambarProyek: [
      'https://images.pexels.com/photos/113338/pexels-photo-113338.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
  },
  {
    id: 'ks5',
    nama: 'Dewi Putri',
    judul: 'Mengembangkan Aplikasi Pariwisata di Gorontalo',
    kategori: 'entrepreneurship',
    lokasi: { top: '39.75%', left: '58.47%' }, // Koordinat Gorontalo Anda
    kutipanTestimoni:
      'NeoSaphien tidak hanya mengajar coding, tapi juga cara berpikir seperti seorang problem solver.',
    ceritaLengkap:
      "Dewi melihat potensi pariwisata di daerah asalnya, Gorontalo. Setelah lulus dari jalur belajar 'Mobile App Development', ia berhasil menciptakan sebuah aplikasi untuk mempromosikan destinasi wisata lokal yang kini mulai digunakan oleh dinas pariwisata setempat.",
    gambarProyek: [
      'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
  },
]
// 2. LOGIKA UNTUK MEMBANGUN HALAMAN PORTFOLIO SECARA DINAMIS
const wadahPeta = document.getElementById('wadah-peta')
const gridKisahTerbaru = document.getElementById('grid-kisah-terbaru')

function bangunHalamanPortfolio() {
  if (!wadahPeta || !gridKisahTerbaru) return // Hanya jalankan jika elemen ada

  // Kosongkan kontainer
  wadahPeta.innerHTML =
    '<img src="assets/images/world-map.png" alt="Peta Dunia" class="w-full opacity-40">'
  gridKisahTerbaru.innerHTML = ''

  // Loop data untuk membuat penanda peta dan kartu
  daftarKisahSukses.forEach((kisah, index) => {
    // Buat dan tambahkan penanda ke peta
    const penanda = document.createElement('button')
    penanda.className = 'penanda-peta'
    penanda.style.top = kisah.lokasi.top
    penanda.style.left = kisah.lokasi.left
    penanda.dataset.storyId = kisah.id
    penanda.innerHTML = `<div class="pulse"></div><div class="dot"></div>`
    wadahPeta.appendChild(penanda)

    // Ambil 3 cerita pertama untuk ditampilkan di grid "Terbaru"
    if (index < 3) {
      const kartuHtml = `
                <div class="kartu-fitur group bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl flex flex-col cursor-pointer" data-story-id="${kisah.id}">
                    <div class="p-6 flex-grow flex flex-col">
                        <h3 class="text-xl font-bold text-white">${kisah.judul}</h3>
                        <p class="text-sm text-purple-400 mt-1 font-semibold">${kisah.nama}</p>
                        <p class="text-sm text-gray-400 mt-4 flex-grow">${kisah.kutipanTestimoni}</p>
                        <span class="text-white font-bold mt-6 self-start hover:underline">Baca Selengkapnya &rarr;</span>
                    </div>
                </div>
            `
      gridKisahTerbaru.innerHTML += kartuHtml
    }
  })
}

// Jalankan fungsi untuk membangun halaman
bangunHalamanPortfolio()
// ======================= Logika Interaktif untuk Modal & Lightbox Portfolio =======================

// Ambil semua elemen yang dibutuhkan dari halaman
const modal = document.getElementById('story-modal')
const tombolTutupModal = document.getElementById('modal-close-btn')
const lightbox = document.getElementById('lightbox')
const tombolTutupLightbox = document.getElementById('lightbox-close-btn')
const lightboxImg = document.getElementById('lightbox-img')

// --- FUNGSI-FUNGSI UTAMA ---

// Fungsi untuk membuka modal dan mengisinya dengan data
function bukaModal(idCerita) {
  if (!modal) return
  const dataCerita = daftarKisahSukses.find((kisah) => kisah.id === idCerita)
  if (!dataCerita) return

  // Isi konten modal dengan data yang sesuai
  document.getElementById('modal-judul').textContent = dataCerita.judul
  document.getElementById('modal-nama').textContent = dataCerita.nama
  document.getElementById('modal-cerita').textContent = dataCerita.ceritaLengkap
  document.getElementById(
    'modal-testimoni'
  ).textContent = `"${dataCerita.kutipanTestimoni}"`

  // Bangun galeri gambar di dalam modal
  const wadahGaleri = document.getElementById('modal-galeri')
  wadahGaleri.innerHTML = '' // Kosongkan galeri dari konten sebelumnya
  dataCerita.gambarProyek.forEach((urlGambar) => {
    const img = document.createElement('img')
    img.src = urlGambar
    img.alt = 'Gambar Proyek'
    img.className =
      'w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity'

    // Tambahkan event listener ke setiap gambar untuk membuka lightbox
    img.addEventListener('click', () => bukaLightbox(urlGambar))

    wadahGaleri.appendChild(img)
  })

  // Tampilkan modal
  modal.classList.remove('hidden')
}

// Fungsi untuk menutup modal
function tutupModal() {
  if (modal) modal.classList.add('hidden')
}

// Fungsi untuk membuka lightbox
function bukaLightbox(urlGambar) {
  if (!lightbox || !lightboxImg) return
  lightboxImg.src = urlGambar
  lightbox.classList.remove('hidden')
}

// Fungsi untuk menutup lightbox
function tutupLightbox() {
  if (lightbox) lightbox.classList.add('hidden')
}

// --- EVENT LISTENERS ---

// Gunakan event delegation untuk menangani klik pada peta dan kartu
document.addEventListener('click', function (event) {
  const targetPembukaModal = event.target.closest('[data-story-id]')
  if (targetPembukaModal) {
    bukaModal(targetPembukaModal.dataset.storyId)
  }
})

// Event listener untuk tombol tutup modal
if (tombolTutupModal) {
  tombolTutupModal.addEventListener('click', tutupModal)
}

// Event listener untuk tombol tutup lightbox
if (tombolTutupLightbox) {
  tombolTutupLightbox.addEventListener('click', tutupLightbox)
}

// Event listener untuk menutup lightbox saat mengklik area gelap di sekitarnya
if (lightbox) {
  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) {
      // Hanya tutup jika klik di latar belakang, bukan di gambar
      tutupLightbox()
    }
  })
}

// Event listener untuk menutup modal/lightbox dengan tombol 'Escape'
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    if (!lightbox.classList.contains('hidden')) {
      tutupLightbox()
    } else if (!modal.classList.contains('hidden')) {
      tutupModal()
    }
  }
})
// ======================= Logika untuk Filter di Halaman Portfolio =======================
const wadahFilter = document.getElementById('portfolio-filters')

if (wadahFilter) {
  const semuaTombolFilterPortfolio =
    wadahFilter.querySelectorAll('.filter-tombol')

  semuaTombolFilterPortfolio.forEach((tombol) => {
    tombol.addEventListener('click', () => {
      // Atur style tombol aktif
      semuaTombolFilterPortfolio.forEach((btn) =>
        btn.classList.remove('filter-aktif', 'bg-purple-600')
      )
      semuaTombolFilterPortfolio.forEach((btn) =>
        btn.classList.add('bg-gray-700', 'hover:bg-gray-600')
      )
      tombol.classList.add('filter-aktif', 'bg-purple-600')
      tombol.classList.remove('bg-gray-700', 'hover:bg-gray-600')

      const filter = tombol.dataset.filter
      const semuaPenanda = document.querySelectorAll('.penanda-peta')

      // Loop setiap penanda di peta untuk disaring
      semuaPenanda.forEach((penanda) => {
        const idCerita = penanda.dataset.storyId
        const dataCerita = daftarKisahSukses.find(
          (kisah) => kisah.id === idCerita
        )

        // Sembunyikan semua penanda terlebih dahulu
        penanda.classList.add('hidden')

        if (filter === 'all' || dataCerita.kategori === filter) {
          // Tampilkan hanya yang cocok dengan filter
          penanda.classList.remove('hidden')
        }
      })
    })
  })
}
// ======================= Logika untuk Validasi Form Kontak =======================
const formKontak = document.getElementById('form-kontak')

if (formKontak) {
  const inputNama = document.getElementById('nama')
  const inputEmail = document.getElementById('email')
  const inputSubjek = document.getElementById('subjek')
  const inputPesan = document.getElementById('pesan')
  const hitungKarakter = document.getElementById('hitung-karakter')

  // Fungsi untuk menampilkan/menyembunyikan error
  function tampilkanError(inputElemen, pesan) {
    const pesanError = inputElemen.nextElementSibling
    pesanError.textContent = pesan
    pesanError.classList.remove('hidden')
    inputElemen.classList.add('border-red-500')
    inputElemen.classList.remove('border-gray-600')
  }

  function sembunyikanError(inputElemen) {
    const pesanError = inputElemen.nextElementSibling
    pesanError.classList.add('hidden')
    inputElemen.classList.remove('border-red-500')
    inputElemen.classList.add('border-gray-600')
  }

  // Validasi Real-time saat pengguna mengetik
  inputNama.addEventListener('input', () => {
    if (inputNama.value.trim() !== '') sembunyikanError(inputNama)
  })
  inputSubjek.addEventListener('input', () => {
    if (inputSubjek.value.trim() !== '') sembunyikanError(inputSubjek)
  })
  inputEmail.addEventListener('input', () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (regexEmail.test(inputEmail.value)) {
      sembunyikanError(inputEmail)
    }
  })
  inputPesan.addEventListener('input', () => {
    const jumlah = inputPesan.value.length
    hitungKarakter.textContent = `${jumlah} / 500`
    if (jumlah >= 10) {
      sembunyikanError(
        document.getElementById('hitung-karakter').previousElementSibling
      )
    }
  })

  // Validasi saat form disubmit
  formKontak.addEventListener('submit', function (event) {
    event.preventDefault() // Mencegah form dikirim
    let isValid = true

    // Cek Nama
    if (inputNama.value.trim() === '') {
      tampilkanError(inputNama, 'Nama wajib diisi.')
      isValid = false
    }
    // Cek Subjek
    if (inputSubjek.value.trim() === '') {
      tampilkanError(inputSubjek, 'Subjek wajib diisi.')
      isValid = false
    }
    // Cek Email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regexEmail.test(inputEmail.value)) {
      tampilkanError(inputEmail, 'Format email tidak valid.')
      isValid = false
    }
    // Cek Pesan
    if (inputPesan.value.length < 10) {
      tampilkanError(
        document.getElementById('hitung-karakter').previousElementSibling,
        'Pesan minimal 10 karakter.'
      )
      isValid = false
    }

    if (isValid) {
      alert('Pesan berhasil dikirim! (Ini hanya simulasi)')
      formKontak.reset()
      hitungKarakter.textContent = '0 / 500'
    }
  })
}
// ======================= Logika untuk FAQ Accordion & Search =======================
const wadahFaq = document.getElementById('faq-container')
const inputCariFaq = document.getElementById('faq-search')

if (wadahFaq && inputCariFaq) {
  // --- Logika untuk Accordion ---
  wadahFaq.addEventListener('click', function (event) {
    const tombolPertanyaan = event.target.closest('.faq-question')
    if (!tombolPertanyaan) return

    const itemFaq = tombolPertanyaan.parentElement.parentElement
    const jawaban = itemFaq.querySelector('.faq-answer')
    const ikonChevron = tombolPertanyaan.querySelector('.faq-chevron')

    jawaban.classList.toggle('hidden')
    ikonChevron.classList.toggle('rotate-180')
  })

  // --- Logika untuk Pencarian ---
  inputCariFaq.addEventListener('input', function (event) {
    const kataKunci = event.target.value.toLowerCase()
    const semuaItemFaq = wadahFaq.querySelectorAll('.faq-item')

    semuaItemFaq.forEach((item) => {
      const teksPertanyaan = item
        .querySelector('.faq-question span')
        .textContent.toLowerCase()
      const teksJawaban = item
        .querySelector('.faq-answer p')
        .textContent.toLowerCase()

      if (
        teksPertanyaan.includes(kataKunci) ||
        teksJawaban.includes(kataKunci)
      ) {
        item.classList.remove('hidden')
      } else {
        item.classList.add('hidden')
      }
    })
  })
}
// ======================= Logika untuk Simulasi Live Chat =======================
const chatWidget = document.getElementById('chat-widget')

if (chatWidget) {
  const chatToggleButton = document.getElementById('chat-toggle-btn')
  const chatWindow = document.getElementById('chat-window')
  const chatCloseButton = document.getElementById('chat-close-btn')
  const chatForm = document.getElementById('chat-form')
  const chatInput = document.getElementById('chat-input')
  const chatMessages = document.getElementById('chat-messages')

  // Fungsi untuk membuka chat
  chatToggleButton.addEventListener('click', () => {
    chatWindow.classList.remove('hidden')
    chatToggleButton.classList.add('hidden')
  })

  // Fungsi untuk menutup chat
  chatCloseButton.addEventListener('click', () => {
    chatWindow.classList.add('hidden')
    chatToggleButton.classList.remove('hidden')
  })

  // Fungsi untuk mengirim pesan
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const pesanPengguna = chatInput.value.trim()

    if (pesanPengguna === '') return

    // Tampilkan pesan pengguna di chat
    tampilkanPesan(pesanPengguna, 'pengguna')
    chatInput.value = ''

    // Simulasi balasan dari bot
    setTimeout(() => {
      const balasanBot =
        'Terima kasih atas pesan Anda. Tim kami akan segera merespons melalui email dalam 1x24 jam.'
      tampilkanPesan(balasanBot, 'bot')
    }, 1500) // Jeda 1.5 detik
  })

  // Fungsi helper untuk menampilkan pesan di jendela chat
  function tampilkanPesan(teks, pengirim) {
    const divPesan = document.createElement('div')
    divPesan.textContent = teks
    divPesan.className = 'p-3 rounded-lg max-w-xs text-sm'

    if (pengirim === 'pengguna') {
      divPesan.classList.add('bg-gray-700', 'text-white', 'self-end', 'ml-auto')
    } else {
      divPesan.classList.add(
        'bg-purple-600',
        'text-white',
        'self-start',
        'mr-auto'
      )
    }

    chatMessages.appendChild(divPesan)
    // Otomatis scroll ke pesan terbaru
    chatMessages.scrollTop = chatMessages.scrollHeight
  }
}
// ======================= Logika untuk Animasi Angka Statistik =======================
const semuaAngkaStatistik = document.querySelectorAll('.stat-counter')

if (semuaAngkaStatistik.length > 0) {
  const observerStatistik = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elemen = entry.target
          const targetAngka = parseInt(elemen.dataset.target)

          let angkaAwal = 0
          const durasi = 2000 // Durasi animasi 2 detik
          const langkahWaktu = 20 // Update setiap 20ms
          const totalLangkah = durasi / langkahWaktu
          const kenaikan = targetAngka / totalLangkah

          const timer = setInterval(() => {
            angkaAwal += kenaikan
            if (angkaAwal >= targetAngka) {
              elemen.textContent = targetAngka
              clearInterval(timer)
            } else {
              elemen.textContent = Math.ceil(angkaAwal)
            }
          }, langkahWaktu)

          // Hentikan pengamatan setelah animasi berjalan
          observerStatistik.unobserve(elemen)
        }
      })
    },
    {
      threshold: 0.5, // Picu saat 50% elemen terlihat
    }
  )

  // Amati setiap elemen statistik
  semuaAngkaStatistik.forEach((angka) => {
    observerStatistik.observe(angka)
  })
}
// ======================= Data dan Logika untuk Halaman Blog =======================
const daftarArtikel = [
  {
    id: 1,
    judul: '5 Tren Web Development yang Wajib Dipantau di 2025',
    kategori: 'Web Development',
    gambar:
      'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600',
    kutipan:
      'Dunia web terus berkembang. Dari AI-powered tools hingga arsitektur serverless, inilah tren yang akan membentuk masa depan...',
    konten: 'Konten lengkap tentang tren web development... (sekitar 600 kata)',
    linkEksternal:
      'https://myedusolve.com/id/blog/catat-ini-10-tren-web-development-di-2024',
  },
  {
    id: 2,
    judul: 'Memahami Peran Data Scientist di Era Big Data',
    kategori: 'Data Science',
    gambar:
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
    kutipan:
      'Data scientist bukan hanya tentang angka, tapi tentang cerita. Pelajari bagaimana mereka mengubah data mentah menjadi keputusan bisnis...',
    konten: 'Konten lengkap tentang peran data scientist... (sekitar 800 kata)',
    linkEksternal: 'https://www.simplilearn.com/what-is-data-scientist-article',
  },
  {
    id: 3,
    judul: 'Prinsip Utama Desain UI/UX yang Baik',
    kategori: 'UI/UX Design',
    gambar:
      'https://images.pexels.com/photos/3471423/pexels-photo-3471423.jpeg?auto=compress&cs=tinysrgb&w=600',
    kutipan:
      'Desain yang baik tidak terlihat. Inilah prinsip fundamental yang harus diketahui setiap desainer UI/UX untuk menciptakan pengalaman...',
    konten: 'Konten lengkap tentang prinsip desain... (sekitar 400 kata)',
    linkEksternal:
      'https://dibimbing.id/en/blog/detail/prinsip-desain-ui-ux-terbaik-tips-di-tahun',
  },
  {
    id: 4,
    judul: 'Client-Side vs Server-Side Rendering: Mana yang Terbaik?',
    kategori: 'Web Development',
    gambar:
      'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=600',
    kutipan:
      'Perdebatan klasik di dunia front-end. Mari kita bedah kelebihan dan kekurangan dari masing-masing pendekatan untuk membantu Anda...',
    konten: 'Konten lengkap tentang rendering... (sekitar 750 kata)',
    linkEksternal:
      'https://scythe-studio.com/de/blog/client-side-vs-server-side-rendering',
  },
  {
    id: 5,
    judul: 'Etika AI: Tantangan Terbesar bagi Data Scientist',
    kategori: 'Data Science',
    gambar:
      'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600',
    kutipan:
      'Dengan kekuatan besar datang tanggung jawab besar. Model AI bisa memiliki bias, dan menjadi tugas kita untuk memastikan keadilan...',
    konten: 'Konten lengkap tentang etika AI... (sekitar 900 kata)',
    linkEksternal:
      'https://www.geeksforgeeks.org/ai-ethics-for-data-scientists/',
  },
]
// --- LOGIKA HALAMAN BLOG ---
const wadahArtikel = document.getElementById('artikel-container')
const wadahPaginasi = document.getElementById('paginasi-container')
const inputCariBlog = document.getElementById('blog-search')
const wadahFilterKategori = document.getElementById('blog-kategori-filter')

if (wadahArtikel) {
  let state = {
    querySet: daftarArtikel,
    halaman: 1,
    artikelPerHalaman: 3,
  }

  // Fungsi menghitung waktu baca
  function hitungWaktuBaca(teks) {
    const jumlahKata = teks.split(/\s+/).length
    const kecepatanBaca = 200 // rata-rata kata per menit
    return Math.ceil(jumlahKata / kecepatanBaca)
  }

  // Fungsi untuk membangun daftar kategori di sidebar
  function bangunKategori() {
    const semuaKategori = [
      'Semua',
      ...new Set(daftarArtikel.map((a) => a.kategori)),
    ]
    wadahFilterKategori.innerHTML = ''
    semuaKategori.forEach((kategori) => {
      const isAktif = kategori === 'Semua'
      wadahFilterKategori.innerHTML += `
                <button data-kategori="${kategori}" class="kategori-tombol block w-full text-left px-4 py-2 rounded-md ${
        isAktif ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-700'
      }">${kategori}</button>
            `
    })
  }

  // Fungsi untuk paginasi
  function dataPaginasi(querySet, halaman, artikelPerHalaman) {
    const awal = (halaman - 1) * artikelPerHalaman
    const akhir = awal + artikelPerHalaman
    const dataTrimmed = querySet.slice(awal, akhir)
    const jumlahHalaman = Math.ceil(querySet.length / artikelPerHalaman)
    return { querySet: dataTrimmed, jumlahHalaman: jumlahHalaman }
  }

  // Fungsi untuk membangun tombol paginasi
  function tombolPaginasi(jumlahHalaman) {
    wadahPaginasi.innerHTML = ''
    for (let i = 1; i <= jumlahHalaman; i++) {
      const isAktif = i === state.halaman
      wadahPaginasi.innerHTML += `<button value=${i} class="paginasi-tombol px-4 py-2 rounded-md text-sm ${
        isAktif ? 'bg-purple-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
      }">${i}</button>`
    }
  }

  // Fungsi utama untuk membangun list artikel
  function bangunListArtikel() {
    const data = dataPaginasi(
      state.querySet,
      state.halaman,
      state.artikelPerHalaman
    )
    const listArtikel = data.querySet
    wadahArtikel.innerHTML = ''

    listArtikel.forEach((artikel) => {
      const waktuBaca = hitungWaktuBaca(artikel.konten)

      // URL dan Judul yang sudah di-encode untuk link share
      const encodedUrl = encodeURIComponent(artikel.linkEksternal)
      const encodedJudul = encodeURIComponent(artikel.judul)

      const kartuHtml = `
        <div class="bg-white/5 border border-white/10 rounded-xl overflow-hidden group">
            <img src="${artikel.gambar}" alt="${artikel.judul}" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105">
            <div class="p-6">
                <p class="text-sm text-purple-400 font-semibold">${artikel.kategori} • ${waktuBaca} menit baca</p>
                <h3 class="text-2xl font-bold text-white mt-2">${artikel.judul}</h3>
                <p class="text-gray-400 mt-4">${artikel.kutipan}</p>
                <div class="mt-6 flex justify-between items-center">
                    <a href="${artikel.linkEksternal}" target="_blank" rel="noopener noreferrer" class="font-bold text-white hover:underline">Baca Selengkapnya &rarr;</a>
                    
                    <div class="flex space-x-3 text-gray-500">
                        <a href="https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedJudul}" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors" title="Share on Twitter">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                        </a>
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors" title="Share on Facebook">
                           <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7.03H7.9V12.02h2.54V9.87c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.91h-2.33v7.03c4.78-.75 8.44-4.9 8.44-9.9C22 6.53 17.5 2.04 12 2.04z"></path></svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `
      wadahArtikel.innerHTML += kartuHtml
    })

    tombolPaginasi(data.jumlahHalaman)
  }

  // Event Listeners
  wadahFilterKategori.addEventListener('click', (e) => {
    if (e.target.classList.contains('kategori-tombol')) {
      document
        .querySelectorAll('.kategori-tombol')
        .forEach((btn) => btn.classList.remove('bg-purple-600', 'text-white'))
      e.target.classList.add('bg-purple-600', 'text-white')

      const kategori = e.target.dataset.kategori
      state.querySet =
        kategori === 'Semua'
          ? daftarArtikel
          : daftarArtikel.filter((a) => a.kategori === kategori)
      state.halaman = 1
      bangunListArtikel()
    }
  })

  inputCariBlog.addEventListener('input', (e) => {
    const kataKunci = e.target.value.toLowerCase()
    state.querySet = daftarArtikel.filter(
      (a) =>
        a.judul.toLowerCase().includes(kataKunci) ||
        a.kutipan.toLowerCase().includes(kataKunci)
    )
    state.halaman = 1
    bangunListArtikel()
  })

  wadahPaginasi.addEventListener('click', (e) => {
    if (e.target.classList.contains('paginasi-tombol')) {
      state.halaman = Number(e.target.value)
      bangunListArtikel()
    }
  })

  // Inisialisasi
  bangunKategori()
  bangunListArtikel()
}

// ======================= Logika untuk Link Navbar Aktif =======================

function aturLinkAktif() {
  const semuaLinkNav = document.querySelectorAll('.nav-link')
  const halamanSaatIni =
    window.location.pathname.split('/').pop() || 'index.html'

  semuaLinkNav.forEach((link) => {
    const linkHalaman = link.getAttribute('href')

    // Reset semua link ke gaya default (tidak tebal)
    link.classList.remove('text-white', 'text-purple-400', 'font-bold')
    link.classList.add('text-gray-300')

    if (linkHalaman === halamanSaatIni) {
      // Terapkan gaya aktif: ungu dan tebal
      link.classList.add('text-purple-400', 'font-bold')
      link.classList.remove('text-gray-300')
    }
  })
}

// Jalankan fungsi setelah semua elemen HTML dimuat
document.addEventListener('DOMContentLoaded', aturLinkAktif)
