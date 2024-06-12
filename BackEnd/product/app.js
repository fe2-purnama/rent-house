const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const db = require('./config/db');

app.use(express.json());

// Gunakan rute produk
app.use('/api/products', productRoutes);

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});

// Tes koneksi database
db.authenticate()
    .then(() => console.log('Koneksi ke database berhasil'))
    .catch(err => console.log('Koneksi ke database gagal:', err));
