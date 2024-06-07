const config = require('../library/database');
let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    formRegister(req, res) {
        res.render("register", {
            url: 'http://localhost:3000/',
            messages: req.flash()
        });
    },
    saveRegister(req, res) {
        try {
            let nama_depan = req.body.nama_depan;
            let nama_belakang = req.body.nama_belakang;
            let email = req.body.email;
            let password = req.body.pass;
            let no_tlpn = req.body.no_tlpn;
            let role = req.body.role;

            // Debugging: Cetak nilai yang diterima
            console.log('Data pendaftaran:', { nama_depan, nama_belakang, email, password, no_tlpn, role });

            // Debugging: Cetak nilai password
            console.log('Password yang diterima:', password);

            // Validasi password
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if (!passwordRegex.test(password)) {
                console.error('Password tidak memenuhi kriteria keamanan');
                req.flash('error', 'Password harus memiliki simbol, angka, 1 huruf kapital, dan panjangnya minimal 8 karakter');
                res.redirect('/register');
                return;
            }

            if (nama_depan && nama_belakang && email && password && no_tlpn && role) {
                pool.getConnection(function (err, connection) {
                    if (err) {
                        console.error('Koneksi ke database gagal:', err);
                        req.flash('error', 'Terjadi kesalahan pada server');
                        res.redirect('/register');
                        return;
                    }
                    
                    // Cek apakah email sudah ada
                    const checkEmailQuery = `
                        SELECT COUNT(*) AS count FROM user WHERE email = ?;
                    `;
                    
                    connection.query(checkEmailQuery, [email], function (error, results) {
                        if (error) {
                            console.error('Kesalahan pada query cek email:', error);
                            req.flash('error', 'Terjadi kesalahan saat pengecekan email');
                            res.redirect('/register');
                            connection.release();
                            return;
                        }
                        
                        if (results[0].count > 0) {
                            console.error('Email sudah terdaftar:', email);
                            req.flash('error', 'Email sudah terdaftar');
                            res.redirect('/register');
                            connection.release();
                            return;
                        } else {
                            // Query SQL dengan urutan kolom yang benar termasuk create_time
                            const insertQuery = `
                                INSERT INTO user (nama_depan, nama_belakang, email, password, no_tlpn, create_time, role)
                                VALUES (?, ?, ?, SHA2(?, 512), ?, NOW(), ?);
                            `;

                            // Eksekusi query dengan parameter yang benar
                            connection.query(insertQuery, [nama_depan, nama_belakang, email, password, no_tlpn, role], function (error, results) {
                                if (error) {
                                    console.error('Kesalahan pada query:', error);
                                    req.flash('error', 'Registrasi gagal');
                                    res.redirect('/register');
                                } else {
                                    req.flash('success', 'Registrasi berhasil');
                                    res.redirect('/login');
                                }
                                connection.release();
                            });
                        }
                    });
                });
            } else {
                console.error('Data input tidak lengkap:', { nama_depan, nama_belakang, email, password, no_tlpn, role});
                req.flash('error', 'Data input tidak lengkap');
                res.redirect('/register');
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            req.flash('error', 'Terjadi kesalahan pada server');
            res.redirect('/register');
        }
    }
};
