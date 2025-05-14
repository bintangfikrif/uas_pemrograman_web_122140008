# Cine-Track

CINE-TRACK adalah sebuah aplikasi web yang dirancang untuk membantu pengguna mencatat dan mengelola koleksi film atau series pribadi mereka. Aplikasi ini memungkinkan pengguna untuk mengatur status tontonan seperti "Watching", "Completed", atau "Planned", serta memberikan rating dan menambahkan komentar untuk setiap judul yang ditonton.

## Fitur
Berikut adalah fitur-fitur utama dari aplikasi CINE-TRACK:
1. Tambah Film/Series ke koleksi pribadi.
2. Ubah Status Tontonan: "Planned", "Watching", atau "Completed".
3. Tambah Ulasan dan Rating untuk setiap film atau series.
4. Lihat Daftar Koleksi lengkap dengan detail film.
5. Filter Koleksi berdasarkan status tontonan.
6. Edit Ulasan atau Rating yang telah dibuat.
7. Hapus Film dari koleksi.
8. Hapus Ulasan yang sudah ditambahkan.
   
## Entitas dalam Aplikasi CINE-TRACK

Aplikasi ini menggunakan tiga entitas utama dalam perancangannya, yaitu **User**, **Media**, dan **Watchlist**. Berikut penjelasan masing-masing entitas:

---

### 1. 🧑 User
Mewakili pengguna aplikasi.

| Atribut      | Tipe Data   | Keterangan                  |
|--------------|-------------|-----------------------------|
| id_user      | Integer     | Primary Key                 |
| username     | Varchar     | Nama pengguna               |
| password     | Varchar     | Kata sandi untuk login      |

---

### 2. 🎬 Media
Menyimpan informasi mengenai film atau serial.

| Atribut      | Tipe Data   | Keterangan                  |
|--------------|-------------|-----------------------------|
| id_media     | Integer     | Primary Key                 |
| title        | Varchar     | Judul film/serial           |
| genre        | Varchar     | Genre (aksi, drama, dll)    |
| year         | Integer     | Tahun rilis                 |
| synopsis     | Text        | Ringkasan cerita            |

---

### 3. 📂 Watchlist
Merupakan entitas relasi antara **User** dan **Media**, yang juga menyimpan aktivitas pengguna terhadap media tersebut.

| Atribut      | Tipe Data   | Keterangan                                      |
|--------------|-------------|-------------------------------------------------|
| id_user      | Integer     | Foreign Key ke entitas `User`                  |
| id_media     | Integer     | Foreign Key ke entitas `Media`                 |
| status       | Varchar     | Status tontonan: "Rencana", "Sedang", "Selesai"|
| rating       | Integer     | Penilaian pengguna (skala 1–5)                 |
| review       | Text        | Komentar/ulasan pengguna                       |


---

