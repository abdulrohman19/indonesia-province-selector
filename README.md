# Provinsi dan Kota App

Aplikasi ini dibuat menggunakan ReactJS + TypeScript + Vite. Aplikasi ini menampilkan daftar **provinsi** dalam bentuk **burger menu** sesuai jumlah yang dimasukkan pengguna, dan menampilkan semua **kabupaten/kota** dari provinsi yang dipilih.

## 📸 Preview
<img width="1034" alt="image" src="https://github.com/user-attachments/assets/71223c80-ed53-40b9-9a7c-c8e79de66a5d" />


## ✨ Fitur Utama

- Input jumlah provinsi yang ingin ditampilkan (maksimal 32)
- Burger menu interaktif dan responsif
- Menampilkan daftar kabupaten/kota tanpa batasan jumlah
- Validasi input dan pesan error jika input tidak valid
- Efek animasi untuk burger menu saat terbuka/tutup (jika sudah diterapkan)
- Responsif dan dapat digunakan di perangkat mobile

## 🔧 Tech Stack

- ReactJS
- TypeScript
- Vite
- CSS

## 🚀 Cara Menjalankan

- Clone repo ini:

```bash
git clone https://github.com/abdulrohman19/indonesia-province-selector.git

move folder:
cd indonesia-province-selector

Install dependencies:
npm install

Jalankan aplikasi:
npm run dev

🗺️ Sumber Data Wilayah
Data provinsi dan kabupaten/kota diambil dari API publik:
API Wilayah Indonesia - emsifa.com 

📝 Catatan
Maksimal jumlah provinsi yang dapat dimasukkan: 32
Jika jumlah di luar batas tersebut, aplikasi akan menampilkan pesan error
