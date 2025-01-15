![image](https://github.com/user-attachments/assets/71da7c03-e313-4d55-b75f-8c0f650cf1bd)# KopiNusantara.
Kopi Nusantara sebuah coffee shop yang mengangkat keunikan dan kekayaan cita rasa biji kopi Indonesia dengan pendekatan modern dan "brutal" dalam hal intensitas rasa dan metode penyajiannya. Berlokasi di kawasan strategis, Kopi Nusantara hadir sebagai destinasi bagi para pecinta kopi yang menginginkan pengalaman menikmati biji kopi dari berbagai penjuru nusantara dengan cara yang berbeda dan memorable.

# Penentuan Ide Proyek

**Latar Belakang**
Website kopinusantara dibuat untuk mempermudah pelanggal coffeshop kopi nusantara dalam melakukan pemesanan produk, mencari tahu seperti apa coffeshop ini.

# Tujuan Proyek
Tujuan utama dari pembuatan website Kopi Nusantara adalah untuk membangun kehadiran digital yang kuat melalui platform yang tidak hanya informatif dan interaktif, tetapi juga mampu merepresentasikan karakter unik brand kami—brutal, namun tetap profesional. Kami ingin memperkenalkan keunikan biji kopi Indonesia kepada lebih banyak orang, sambil mempermudah pelanggan untuk menjelajahi menu, memahami cerita di balik setiap produk, dan melakukan pemesanan dengan mudah.

Website ini juga menjadi cara kami untuk memperkuat identitas Kopi Nusantara, menghubungkan komunitas pecinta kopi, dan berbagi inspirasi tentang kekayaan kopi nusantara. Melalui desain yang menarik dan fitur interaktif, kami berharap bisa menciptakan ruang yang nyaman untuk berbagi cerita, pengalaman, dan wawasan seputar kopi. Selain itu, kami ingin menjadikan platform ini sebagai wujud dukungan kami kepada petani kopi lokal, membantu mereka untuk dikenal lebih luas.


# Fitur utama
Daftar fitur utama yang akan dikembangkan pada proyek ini:
•	Slider carousell untuk promo yang sedang berlangsung
•	Fitur pesan menu dari website
•	Halaman menu yang interaktif
•	Metode pembayaran yang variatif

# Skenario Alur
1.	Halaman Utama, user membuka situs web dan melihat halaman utama "Kopi Nusantara" yang terdiri dari beberapa bagian seperti navigasi, slider promosi, informasi tentang "Kopi Nusantara," menu populer, dan kontak. user dapat memilih untuk membaca lebih lanjut tentang layanan atau langsung mengklik tombol "Pesan Sekarang" yang akan mengarahkan mereka ke halaman pemesanan.
2.	Halaman Pemesanan (Pilih Meja) user diarahkan ke halaman pemesanan yang menampilkan pilihan meja dengan informasi kapasitas masing-masing. Meja yang sudah terisi ditandai sehingga tidak dapat dipilih. Ketika user memilih meja yang tersedia, user dapat pindah ke bagian menu.
3.	Halaman Pemesanan (Pilih Menu) Setelah memilih meja, pengguna diarahkan ke bagian menu. Di sini pengguna dapat:
a.	Menggunakan fitur pencarian untuk mencari menu tertentu.
b.	Menggunakan filter kategori seperti kopi, non-kopi, pastry, atau main dish.
4.	Melihat daftar menu dengan gambar, deskripsi, harga, dan dengan tombol "Tambah ke Keranjang." user dapat menambahkan item ke keranjang belanja hingga pesanan user terpenuhi.
5.	Keranjang Pesanan menampilkan daftar item yang dipilih, jumlah masing-masing item, dan total harga. User dapat mengubah jumlah item atau menghapus item dari keranjang. Setelah cukup, User mengklik tombol "Pesan Sekarang" untuk melanjutkan ke proses pembayaran.
6.	Proses Pembayaran Sistem menampilkan window dengan tiga pilihan metode pembayaran: QR Payment, Card Payment, atau Cash Payment.
7.	Konfirmasi Pesanan Sistem memproses pesanan dan memberikan notifikasi kepada pengguna

# Teknologi Front End
1. **HTML, CSS, dan Javascript** disini kami tidak menggunakan library apapun itu (native). Kami hanya menggunakan fitur bawaan dari html, css dan javascriptnya.
2. **Typography dan Icons** disini kami menggunakan font dari google fonts, yaitu font poppins. dan untuk iconnya disini kami menggunakan feather icons untuk menampilkan icon yang simpel dan elegan.

# Teknologi Back End
Disini kami menggunakan apache sebagai webserver dari kopinusantara, serta php sebagai bahasa servernya.
pada bagian database kami mempunyai beberapa tabel, yaitu :
1. Meja
![image](https://github.com/user-attachments/assets/7ff2068b-649f-4521-a5be-25f25ccfaf9b)
Tabel ini berfungsi sebagai penampung data meja, dimana status meja disini akan berubah menjadi terisi bila ada user yang sudah memilih meja.

3. Menu
![image](https://github.com/user-attachments/assets/4efd7342-df41-4f74-9a00-b22b75b4b60b)
Tabel ini berfungsi sebagai database menu, dimana data menu berada. disini owner atau pegawai coffeshop kopi nusantara bisa  menambah, mengurangi, dan mengubah menu.

data menu kami : 
![image](https://github.com/user-attachments/assets/7c2808b1-e4c9-40ba-bb65-6d40d5abb234)


5. orders
 ![image](https://github.com/user-attachments/assets/2e5326ba-a370-47ee-afd3-32e0447c2cb3)
Tabel ini berfungsi sebagai penampung dari orderan yang masuk, dimana jika user sudah menyelesaikan pembayaran orderan akan masuk ke dalam tabel ini.



