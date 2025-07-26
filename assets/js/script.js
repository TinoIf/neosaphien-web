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
    latarParallax.style.transform = 'translateY(' + posisiScroll * 0.4 + 'px)'
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
