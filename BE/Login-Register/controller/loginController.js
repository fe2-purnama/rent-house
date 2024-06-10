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
            console.log('Request body:', req.body); // Log the entire request body for debugging
            let email = req.body.email;
            let password = req.body.password;
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
                                const user_id = results[0].user_id;
                                const role = results[0].role;

                                // Update last_login waktu sekarang
                                const updateQuery = `UPDATE user SET last_login = NOW() WHERE user_id = ?`;

                                connection.query(updateQuery, [user_id], function (updateError, updateResults) {
                                    if (updateError) {
                                        console.error('Kesalahan pada query update last_login:', updateError);
                                        return res.status(500).json({
                                            color: 'danger',
                                            status: 'Oops..',
                                            message: 'Terjadi kesalahan pada server'
                                        });
                                    }

                                    // Set session
                                    req.session.loggedin = true;
                                    req.session.user_id = user_id;
                                    req.session.nama_depan = results[0].nama_depan;
                                    req.session.role = role;

                                    // Send JSON response with user information
                                    res.json({
                                        user: {
                                            user_id,
                                            nama_depan: results[0].nama_depan,
                                            role
                                        },
                                        message: 'Login successful'
                                    });

                                });
                            } else {
                                res.status(401).json({
                                    color: 'danger',
                                    status: 'Oops..',
                                    message: 'Akun tidak ditemukan'
                                });
                            }
                            connection.release();
                        }
                    );
                });
            } else {
                res.status(400).json({
                    color: 'danger',
                    status: 'Oops..',
                    message: 'Email dan password harus diisi'
                });
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            res.status(500).json({
                color: 'danger',
                status: 'Oops..',
                message: 'Terjadi kesalahan pada server'
            });
        }
    },
    logout(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        color: 'danger',
                        status: 'Oops..',
                        message: 'Terjadi kesalahan pada server'
                    });
                }
                res.clearCookie('thisissecret');
                res.json({
                    message: 'Logout successful'
                });
            });
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            res.status(500).json({
                color: 'danger',
                status: 'Oops..',
                message: 'Terjadi kesalahan pada server'
            });
        }
    }
};
