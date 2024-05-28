const config = require('../library/database');
let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    login(req, res) {
        try {
            res.render("login", {
                url: 'http://localhost:3000/',
                colorFlash: req.flash('color'),
                statusFlash: req.flash('status'),
                pesanFlash: req.flash('message'),
            });
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            res.status(500).send('Terjadi kesalahan pada server');
        }
    },
    loginAuth(req, res) {
        try {
            let email = req.body.email;
            let password = req.body.pass;
            console.log('Email:', email, 'Password:', password);
            if (email && password) {
                pool.getConnection(function (err, connection) {
                    if (err) throw err;
                    connection.query(
                        `SELECT * FROM user WHERE email = ? AND password = SHA2(?, 512)`,
                        [email, password],
                        function (error, results) {
                            if (error) throw error;
                            if (results.length > 0) {
                                const userId = results[0].user_id;

                                // Update last_login waktu sekarang
                                const updateQuery = `UPDATE user SET last_login = NOW() WHERE user_id = ?`;

                                connection.query(updateQuery, [userId], function (updateError, updateResults) {
                                    if (updateError) {
                                        console.error('Kesalahan pada query update last_login:', updateError);
                                        req.flash('color', 'danger');
                                        req.flash('status', 'Oops..');
                                        req.flash('message', 'Terjadi kesalahan pada server');
                                        res.redirect('/login');
                                        return;
                                    }

                                    // Set session dan redirect ke profil
                                    req.session.loggedin = true;
                                    req.session.userid = userId;
                                    req.session.nama_depan = results[0].nama_depan;
                                    res.redirect('/profile');
                                });
                            } else {
                                req.flash('color', 'danger');
                                req.flash('status', 'Oops..');
                                req.flash('message', 'Akun tidak ditemukan');
                                res.redirect('/login');
                            }
                            connection.release();
                        }
                    );
                });
            } else {
                req.flash('color', 'danger');
                req.flash('status', 'Oops..');
                req.flash('message', 'Email dan password harus diisi');
                res.redirect('/login');
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            req.flash('color', 'danger');
            req.flash('status', 'Oops..');
            req.flash('message', 'Terjadi kesalahan pada server');
            res.redirect('/login');
        }
    },
    logout(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Terjadi kesalahan pada server');
                    return;
                }
                res.clearCookie('thisissecret');
                res.redirect('/login');
            });
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            res.status(500).send('Terjadi kesalahan pada server');
        }
    },
};
