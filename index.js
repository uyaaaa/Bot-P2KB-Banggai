const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Web Server Bot P2KB Aktif 24 Jam!');
});

app.listen(port, () => {
    console.log(`Web server menyala di port ${port}`);
});

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Inisialisasi client dengan penyimpanan sesi lokal agar tidak perlu scan QR terus-menerus
const client = new Client({
    authStrategy: new LocalAuth()
});

// Menghasilkan QR Code di terminal untuk di-scan
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Silakan scan QR Code di atas menggunakan aplikasi WhatsApp Anda.');
});

// Pesan saat bot berhasil login
client.on('ready', () => {
    console.log('Bot HelpDesk P2KB IDI Banggai sudah aktif dan siap menerima pesan!');
});

// Mendeteksi jika WhatsApp diputus/logout dari HP
client.on('disconnected', (reason) => {
    console.log('Bot terputus atau di-logout dari HP:', reason);
    console.log('Menghapus sesi dan mematikan bot untuk restart...');
    // Menghancurkan client agar server bisa me-restart dengan bersih
    client.destroy();
    process.exit(0); // Memaksa program Node.js berhenti total
});

// Teks Menu Utama
const menuUtama = `*Selamat datang di HelpDesk P2KB IDI Banggai*

Silakan pilih menu dengan mengetik angkanya:
1. Syarat Mengajukan SKP Seminar/workshop IDI
2. Cara Upload SKP Ranah B
3. Cara Upload SKP Ranah C
4. Hubungi Admin P2KB
5. FAQ

Ketik MENU kapan saja untuk kembali ke tampilan awal.`;

// Logika balasan pesan
client.on('message', message => {
    // Mengubah huruf menjadi kapital dan menghapus spasi untuk mempermudah pengecekan
    const text = message.body.trim().toUpperCase();

    if (text === '1') {
        message.reply(`Silakan pilih informasi yang ingin Dokter ketahui:\n1.1 Syarat Registrasi Pelaksanaan Peningkatan Kompetensi Lainnya BAPELKES SULTENG\n1.2 Kerangka Acuan Kegiatan sesuai format Kemenkes`);
    } 
    else if (text === '1.1') {
        message.reply(`Syarat Registrasi:\n1. Permohonan maksimal 40 hari sebelum penyelenggaraan\n2. Surat Permohonan\n3. Dokumen Perjanjian Kerja Sama (PKS)\n4. Kerangka Acuan Kegiatan sesuai Format Kemenkes\n5. Jadwal\n6. CV Pelatih\n7. Pelatih memiliki akun Plataran Sehat\n\nSyarat Penyelenggaraan:\n* Penyelenggaraan sesuai Standar Pelayanan & SOP Penyelenggaraan Peningkatan Kompetensi Lainnya.\n* Contact Person BAPELKES SULTENG: Aisyia Shafira Amalia Pamekas, SKM (HP/WA) +62 823-5333-3963`);
    } 
    else if (text === '1.2') {
        message.reply(`Berikut adalah Kerangka Acuan Kegiatan sesuai format Kemenkes: https://drive.google.com/file/d/1klLeitjOQnEORf1H5NTHcIgBEYSpIS8P/view?usp=sharing`);
    } 
    else if (text === '2') {
        message.reply(`Berikut adalah panduan Cara Upload SKP Ranah B: https://drive.google.com/drive/folders/100aGrivR3LuFpl48zCRt-7d-Dpk8bIMH`);
    } 
    else if (text === '3') {
        message.reply(`Berikut adalah panduan Cara Upload SKP Ranah C: https://drive.google.com/drive/folders/1oPAqt-X5MeqkThqIcu3ZKDbUyym-zPO7`);
    } 
    else if (text === '4') {
        // Ganti nomor 6281234567890 dengan nomor WhatsApp Admin yang sebenarnya
        message.reply(`Silakan hubungi Admin P2KB melalui tautan WhatsApp berikut:\nhttps://api.whatsapp.com/send?phone=6285146338688\n\n *(Klik tautan di atas untuk langsung beralih ke chat Admin)*`);
    } 
    else if (text === '5') {
        message.reply(`*PERTANYAAN YANG SERING DIAJUKAN (FAQ)*\n\nKetik angka di bawah ini untuk melihat jawaban:\n\n*5.1* Apakah semua seminar otomatis mendapat SKP?\n*5.2* Saya sudah punya sertifikat, apakah pasti dapat SKP?\n*5.3* Apakah saya boleh upload sertifikat yang sama berkali-kali?\n*5.4* SKP saya belum muncul, apa yang dilakukan?\n*5.5* Apakah bot P2KB IDI dapat menentukan SKP saya disetujui?\n*5.6* Link Resmi Akses SKP\n\nKetik *MENU* untuk kembali ke awal.`);
    } 
    else if (text === '5.1') {
        message.reply(`*Tanya:* Apakah semua seminar otomatis mendapat SKP?\n\n*Jawab:*\nTidak. Pengakuan SKP bergantung pada mekanisme kegiatan, profesi, penyelenggara, dan proses verifikasi yang berlaku.\n\n*(Ketik 5 untuk kembali ke daftar FAQ)*`);
    }
    else if (text === '5.2') {
        message.reply(`*Tanya:* Saya sudah punya sertifikat, apakah pasti dapat SKP?\n\n*Jawab:*\nTidak otomatis. Sertifikat adalah bukti kegiatan; pengakuan dan nilai SKP mengikuti ketentuan serta verifikasi.\n\n*(Ketik 5 untuk kembali ke daftar FAQ)*`);
    }
    else if (text === '5.3') {
        message.reply(`*Tanya:* Apakah saya boleh upload sertifikat yang sama berkali-kali?\n\n*Jawab:*\nJangan. Hindari klaim ganda dan ikuti mekanisme pencatatan yang ditentukan sistem.\n\n*(Ketik 5 untuk kembali ke daftar FAQ)*`);
    }
    else if (text === '5.4') {
        message.reply(`*Tanya:* SKP saya belum muncul, apa yang dilakukan?\n\n*Jawab:*\nPeriksa status kegiatan, integrasi, profil, dan bukti. Jika tetap belum tercatat, kembali ke MENU awal dan pilih angka 4 untuk menghubungi admin.\n\n*(Ketik 5 untuk kembali ke daftar FAQ)*`);
    }
    else if (text === '5.5') {
        message.reply(`*Tanya:* Apakah bot P2KB IDI dapat menentukan SKP saya disetujui?\n\n*Jawab:*\nTidak. Bot hanya membantu navigasi administratif awal; keputusan akhir pada mekanisme resmi.\n\n*(Ketik 5 untuk kembali ke daftar FAQ)*`);
    }
    else if (text === '5.6') {
        message.reply(`*LINK RESMI AKSES SKP*\n\n* SATUSEHAT SDMK:\nhttps://satusehat.kemkes.go.id/sdmk\n\n* SKP Platform Kemenkes:\nhttps://skp.kemkes.go.id/\n\n* Plataran Sehat:\nhttps://lms.kemkes.go.id/\n\n* JDIH Kemenkes:\nhttps://jdih.kemkes.go.id/\n\n*(Ketik 5 untuk kembali ke daftar FAQ)*`);
    }
     
    else {
        // Jika pengguna mengetik MENU, mengucapkan salam, atau mengetik kata yang tidak dikenali, bot akan memunculkan Menu Utama
        message.reply(menuUtama);
    }
});

client.initialize();