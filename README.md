# CineTrack

Aplikasi web pribadi untuk manajemen koleksi film, serial, dan anime Anda. Catat tontonan Anda, atur status, berikan rating, dan tambahkan ulasan untuk setiap media yang Anda ikuti.

## Daftar Isi

* [Tentang Proyek](#tentang-proyek)
* [Fitur Utama](#fitur-utama)
* [Teknologi yang Digunakan](#teknologi-yang-digunakan)
* [Struktur Proyek](#struktur-proyek)
* [Instalasi dan Menjalankan Proyek](#instalasi-dan-menjalankan-proyek)
    * [Backend (Pyramid)](#backend-pyramid)
    * [Frontend (React)](#frontend-react)
* [Penggunaan](#penggunaan)

## Tentang Proyek

CineTrack adalah aplikasi web yang dirancang untuk membantu Anda mengelola koleksi film, serial TV, atau anime pribadi Anda. Dengan CineTrack, Anda dapat dengan mudah:

* Menambahkan media ke daftar tontonan Anda.
* Memperbarui status tontonan ("Planned", "Watching", "Completed").
* Memberikan rating dan menulis ulasan pribadi.
* Melihat riwayat tontonan dan statistik koleksi Anda.

Aplikasi ini bertujuan untuk menyediakan solusi yang sederhana dan efektif bagi para penggemar media untuk melacak apa yang telah mereka tonton dan apa yang ingin mereka tonton.

## Fitur Utama

* **Manajemen Koleksi:** Tambahkan, edit, dan hapus film/serial/anime dari koleksi pribadi Anda.
* **Status Tontonan:** Atur status tontonan menjadi "Planned", "Watching", atau "Completed".
* **Rating dan Ulasan:** Berikan rating (skala 1-5) dan tulis ulasan untuk setiap media yang Anda tonton.
* **Filter Koleksi:** Saring daftar koleksi berdasarkan status tontonan.
* **Detail Media:** Lihat informasi detail untuk setiap media dalam koleksi Anda.
* **Otentikasi Pengguna:** Fungsionalitas register, login, dan logout untuk mengelola koleksi pribadi.

## Teknologi yang Digunakan

### Frontend (React)

* **React:** *Library* JavaScript untuk membangun antarmuka pengguna.
* **React Router DOM:** Untuk navigasi deklaratif dalam aplikasi.
* **Redux & Redux Toolkit:** Untuk manajemen *state* yang efisien dan terstruktur.
* **Axios:** Klien HTTP berbasis *Promise* untuk membuat permintaan ke API (digunakan dengan *mock API* via `localStorage` di sisi *frontend*).
* **TailwindCSS:** *Framework* CSS yang berorientasi utilitas untuk *styling* cepat dan responsif.

### Backend (Pyramid)

* **Pyramid:** *Framework* web Python untuk membangun RESTful API.
* **SQLAlchemy:** *Toolkit* SQL dan *Object-Relational Mapper* (ORM) untuk interaksi basis data.
* **Marshmallow:** *Library* serialisasi/deserialisasi objek Python.
* **Alembic:** *Tool* revisi basis data untuk SQLAlchemy.
* **`python-jose`:** Untuk implementasi otentikasi JWT.
* **`bcrypt`:** Untuk hashing kata sandi.
* **Basis Data:** SQLite (default untuk pengembangan, dapat dikonfigurasi).

## Struktur Proyek

Repositori ini terdiri dari dua bagian utama:
```
uas_pemrograman_web_122140008/
├── backend/            # Aplikasi backend Pyramid (API)
│   ├── backend/        # Kode sumber aplikasi backend
│   │   ├── alembic/    # Migrasi basis data dengan Alembic
│   │   ├── models/     # Definisi model basis data (User, Media, Watchlist)
│   │   ├── schema/     # Skema serialisasi dengan Marshmallow
│   │   ├── services/   # Logika bisnis dan interaksi basis data
│   │   └── views/      # Endpoint API dan handler
│   ├── development.ini # Konfigurasi untuk lingkungan pengembangan
│   ├── production.ini  # Konfigurasi untuk lingkungan produksi
│   ├── pytest.ini      # Konfigurasi Pytest
│   ├── setup.py        # File instalasi Python
│   └── tests/          # Tes unit dan fungsional backend
└── cine-track/         # Aplikasi frontend React
├── public/         # File statis (index.html, manifest.json, dll.)
├── src/            # Kode sumber aplikasi frontend
│   ├── app/        # Konfigurasi Redux store dan hooks
│   ├── components/ # Komponen UI yang dapat digunakan kembali
│   ├── constants/  # Konstanta aplikasi
│   ├── features/   # Fitur-fitur Redux (auth, movies)
│   ├── hooks/      # Custom React Hooks
│   ├── pages/      # Komponen level halaman (misalnya, HomePage, LoginPage)
│   ├── services/   # Logika interaksi API frontend
│   └── styles/     # Styling global dan variabel CSS
├── package.json    # Dependensi dan script NPM
├── package-lock.json
└── tailwind.config.js # Konfigurasi TailwindCSS
```

### Entitas Basis Data

Aplikasi ini menggunakan dua entitas utama dalam perancangannya: **User** dan **Media**.

---

### 1. 🧑 User

Mewakili pengguna aplikasi.

| Atribut    | Tipe Data | Keterangan                                       |
| :--------- | :-------- | :----------------------------------------------- |
| `id`       | Integer   | Primary Key (Otomatis dari `BaseModel`)          |
| `username` | String(50)| Nama pengguna (unik, tidak boleh kosong)         |
| `password` | String(255)| Kata sandi yang sudah di-hash (tidak boleh kosong)|
| `role`     | String(20)| Peran pengguna, default 'user' (opsional)        |

---

### 2. 🎬 Media

Menyimpan informasi mengenai film, serial, anime, atau dokumenter.

| Atribut    | Tipe Data  | Keterangan                                       |
| :--------- | :--------- | :----------------------------------------------- |
| `id`       | Integer    | Primary Key (Otomatis dari `BaseModel`)          |
| `title`    | String(255)| Judul media (tidak boleh kosong)                 |
| `year`     | Integer    | Tahun rilis (tidak boleh kosong)                 |
| `type`     | Enum       | Tipe media: 'Movie', 'Series', 'Anime', 'Documentary' (tidak boleh kosong) |
| `director` | String(255)| Nama sutradara/pembuat (opsional)               |
| `genre`    | String(255)| Genre, bisa dipisahkan koma (opsional)           |
| `status`   | Enum       | Status tontonan: 'Planned', 'Watching', 'Completed' (tidak boleh kosong) |
| `rating`   | Float      | Penilaian pengguna (skala 1.0 - 5.0) (opsional)  |
| `synopsis` | Text       | Ringkasan cerita (opsional)                      |
| `notes`    | Text       | Catatan pribadi pengguna (opsional)              |
| `poster`   | String(512)| URL gambar poster (opsional)                     |

## Instalasi dan Menjalankan Proyek

Pastikan Anda memiliki Node.js dan Python terinstal di sistem Anda.

### Backend (Pyramid)

1.  **Navigasi ke direktori `backend`:**
    ```bash
    cd backend
    ```

2.  **Buat dan aktifkan virtual environment:**
    ```bash
    python -m venv venv
    # Di Windows
    .\venv\Scripts\activate
    # Di macOS/Linux
    source venv/bin/activate
    ```

3.  **Instal dependensi:**
    ```bash
    pip install -e .
    ```

4.  **Inisialisasi basis data dan masukkan data contoh:**
    ```bash
    initialize_uas_pemrograman_web_122140008_db development.ini
    ```
    *Catatan: Nama script mungkin berbeda sedikit tergantung setup.py, biasanya `initialize_backend_db` atau sesuai nama package. Silakan cek `setup.py` untuk nama yang tepat jika perintah di atas gagal.*

5.  **Jalankan server backend:**
    ```bash
    pserve development.ini --reload
    ```
    Backend akan berjalan di `http://localhost:6543`.

### Frontend (React)

1.  **Navigasi ke direktori `cine-track`:**
    ```bash
    cd ../cine-track
    ```

2.  **Instal dependensi:**
    ```bash
    npm install
    ```

3.  **Jalankan aplikasi frontend:**
    ```bash
    npm start
    ```
    Aplikasi frontend akan terbuka di *browser* Anda pada `http://localhost:3000`.

## Penggunaan

Setelah aplikasi berjalan:

1.  **Registrasi/Login:** Buat akun baru atau masuk menggunakan akun yang sudah ada.
2.  **Tambahkan Film/Serial:** Gunakan fitur "Tambah Media" untuk menambahkan entri baru ke koleksi Anda.
3.  **Kelola Koleksi:** Lihat daftar media Anda, ubah status, tambahkan rating, dan tulis ulasan.
4.  **Jelajahi Detail:** Klik pada media untuk melihat detail lengkap dan riwayat tontonan.
