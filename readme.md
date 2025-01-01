# PulTime API

PulTime API adalah backend RESTful untuk website **PulTime** yang dirancang untuk mengelola data tugas, kelas, dan tim pengguna.

---

## Daftar Isi
- [Tentang Proyek](#tentang-proyek)
- [Fitur Utama](#fitur-utama)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Struktur Proyek](#struktur-proyek)
- [Instalasi](#instalasi)
- [Menjalankan Server](#menjalankan-server)
- [Pengujian](#pengujian)
- [Dokumentasi API](#dokumentasi-api)
- [Kontribusi](#kontribusi)

---

## Tentang Proyek

PulTime API adalah backend RESTful yang dikembangkan untuk mendukung website PulTime dalam mengelola data tugas, kelas, dan tim pengguna. API ini menyediakan serangkaian endpoint untuk autentikasi, manajemen kelas dan tim, serta penyimpanan data terkait tugas.

Dirancang menggunakan arsitektur **Clean Architecture** dengan pendekatan **Domain-Driven Design (DDD)**, PulTime API menjamin modularitas, skalabilitas, dan fleksibilitas dalam pengembangan dan pemeliharaan sistem.

---

## Fitur Utama
- **Autentikasi dan Otorisasi:** Menggunakan JWT (JSON Web Token) untuk autentikasi pengguna.
- **Manajemen Kelas dan Tim:** CRUD (Create, Read, Update, Delete) untuk data kelas dan tim.
- **Manajemen Tugas:** CRUD untuk tugas yang terkait dengan kelas dan tim.
- **Validasi Data Input:** Middleware untuk memverifikasi dan memvalidasi data yang dikirimkan oleh klien.
- **Database ORM:** Menggunakan Prisma ORM untuk pengelolaan database yang efisien.
- **Dokumentasi API Otomatis:** Menggunakan Swagger untuk dokumentasi endpoint.

---

## Teknologi yang Digunakan

- **Node.js** - Runtime JavaScript untuk server-side.
- **Express.js** - Framework web minimalis untuk Node.js.
- **TypeScript** - Bahasa pemrograman yang diketik secara statis.
- **Prisma ORM** - Pengelolaan database yang efisien dan mudah.
- **JWT (JSON Web Token)** - Autentikasi pengguna.
- **Swagger** - Dokumentasi API yang interaktif.
- **Jest** - Pengujian unit dan integrasi.

---

## Struktur Proyek

```
├── dist/                  # Hasil build dari TypeScript
├── docs/                  # Dokumentasi API
├── node_modules/          # Dependensi proyek
├── prisma/                # Skema database dan migrasi menggunakan Prisma ORM
├── src/                   # Kode sumber aplikasi
│   ├── configs/           # Konfigurasi aplikasi
│   ├── controllers/       # Logika kontrol (request/response handler)
│   ├── database/          # Koneksi database dan konfigurasi ORM
│   ├── interfaces/        # Kontrak data dan layanan
│   ├── middlewares/       # Middleware (autentikasi, validation, dll.)
│   ├── models/            # Definisi model dan entitas data
│   ├── routes/            # Routing dan endpoint API
│   ├── services/          # Logika bisnis aplikasi
│   ├── types/             # Tipe data tambahan untuk TypeScript
│   ├── utils/             # Fungsi utilitas umum
│   ├── validators/        # Validasi input dan data
│   └── Server.ts          # Entry point untuk menjalankan server
├── test/                  # Pengujian aplikasi
├── .env                   # File konfigurasi lingkungan
├── .env.example           # Contoh konfigurasi lingkungan
├── .gitignore             # File yang diabaikan Git
├── babel.config.json      # Konfigurasi Babel
├── index.ts               # Entry point utama aplikasi
├── package.json           # Dependensi dan metadata proyek
├── package-lock.json      # Lock file untuk dependensi
├── readme.md              # Dokumentasi proyek
└── tsconfig.json          # Konfigurasi TypeScript
```

---

## Instalasi

Ikuti langkah-langkah berikut untuk menginstal dan menjalankan proyek ini di lingkungan lokal:

1. **Clone repository ini:**
   ```bash
   git clone https://github.com/vanderoo/api-pultime.git
   cd api-pultime
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Buat file konfigurasi lingkungan:**
   Salin file `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```
   Sesuaikan nilai variabel lingkungan di dalamnya sesuai kebutuhan.

4. **Inisialisasi database:**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

---

## Menjalankan Server

1. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```

2. Server akan tersedia di:
   ```
   http://{HOSTNAME}:{PORT}
   ```

---

## Pengujian

1. Jalankan semua pengujian:
   ```bash
   npm run test
   ```

---

## Dokumentasi API

- Dokumentasi API dapat diakses di endpoint berikut setelah server berjalan:
  `http://{HOSTNAME}:{PORT}/api-docs`

- Dokumentasi API juga dapat diakses secara online di [tautan ini](https://pultime.api.deroo.tech/api-docs).

Dokumentasi ini disediakan oleh Swagger untuk kemudahan eksplorasi dan pengujian endpoint.

---

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, ikuti langkah-langkah berikut:
1. Fork repository ini.
2. Buat branch baru untuk fitur atau perbaikan Anda.
3. Lakukan commit perubahan Anda dengan deskripsi yang jelas.
4. Kirimkan pull request ke branch `main`.

---

**Selamat Berkontribusi!** 🚀

