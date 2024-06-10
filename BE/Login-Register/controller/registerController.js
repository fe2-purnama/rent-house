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
            let { nama_depan, nama_belakang, email, password, no_tlpn, role } = req.body;

            console.log('Data pendaftaran:', { nama_depan, nama_belakang, email, password, no_tlpn, role });

            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if (!passwordRegex.test(password)) {
                console.error('Password tidak memenuhi kriteria keamanan');
                res.json({
                    status: 'error',
                    message: 'Password harus memiliki simbol, angka, 1 huruf kapital, dan panjangnya minimal 8 karakter'
                });
                return;
            }

            if (nama_depan && nama_belakang && email && password && no_tlpn && role) {
                pool.getConnection(function (err, connection) {
                    if (err) {
                        console.error('Koneksi ke database gagal:', err);
                        res.json({
                            status: 'error',
                            message: 'Terjadi kesalahan pada server'
                        });
                        return;
                    }

                    const checkEmailQuery = `SELECT COUNT(*) AS count FROM user WHERE email = ?;`;

                    connection.query(checkEmailQuery, [email], function (error, results) {
                        if (error) {
                            console.error('Kesalahan pada query cek email:', error);
                            res.json({
                                status: 'error',
                                message: 'Terjadi kesalahan saat pengecekan email'
                            });
                            connection.release();
                            return;
                        }

                        if (results[0].count > 0) {
                            console.error('Email sudah terdaftar:', email);
                            res.json({
                                status: 'error',
                                message: 'Email sudah terdaftar'
                            });
                            connection.release();
                            return;
                        } else {
                            const insertQuery = `
                                INSERT INTO user (nama_depan, nama_belakang, email, password, no_tlpn, create_time, role)
                                VALUES (?, ?, ?, SHA2(?, 512), ?, NOW(), ?);
                            `;

                            connection.query(insertQuery, [nama_depan, nama_belakang, email, password, no_tlpn, role], function (error, results) {
                                if (error) {
                                    console.error('Kesalahan pada query:', error);
                                    res.json({
                                        status: 'error',
                                        message: 'Registrasi gagal'
                                    });
                                } else {
                                    res.json({
                                        status: 'success',
                                        message: 'Registrasi berhasil'
                                    });
                                }
                                connection.release();
                            });
                        }
                    });
                });
            } else {
                console.error('Data input tidak lengkap:', { nama_depan, nama_belakang, email, password, no_tlpn, role});
                res.json({
                    status: 'error',
                    message: 'Data input tidak lengkap'
                });
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            res.json({
                status: 'error',
                message: 'Terjadi kesalahan pada server'
            });
        }
    }
};
