const config = require('../library/database');
let mysql = require('mysql');
let pool = mysql.createPool(config);
const crypto = require('crypto');

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    profile(req, res) {
        try {
            let id = req.session.userid;
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `SELECT * FROM user WHERE user_id = ?`,
                    [id],
                    function (error, results) {
                        if (error) throw error;
                        res.render("profile", {
                            url: 'http://localhost:3000/',
                            nama_depan: results[0]['nama_depan'],
                            email: results[0]['email'],
                            nama_belakang: results[0]['nama_belakang'],
                            no_tlpn: results[0]['no_tlpn']
                        });
                    }
                );
                connection.release();
            });
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            res.status(500).send('Terjadi kesalahan pada server');
        }
    },

    editProfile(req, res) {
        try {
            let id = req.session.userid;
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `SELECT * FROM user WHERE user_id = ?`,
                    [id],
                    function (error, results) {
                        if (error) throw error;
                        res.render("profileUpdate", {
                            url: 'http://localhost:3000/',
                            user: results[0]
                        });
                    }
                );
                connection.release();
            });
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            res.status(500).send('Terjadi kesalahan pada server');
        }
    },

    updateProfile(req, res) {
        try {
            let id = req.session.userid;
            let { nama_depan, nama_belakang, no_tlpn } = req.body;
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `UPDATE user SET nama_depan = ?, nama_belakang = ?, no_tlpn = ?, update_time = NOW() WHERE user_id = ?`,
                    [nama_depan, nama_belakang, no_tlpn, id],
                    function (error, results) {
                        if (error) throw error;
                        res.redirect('/profile');
                    }
                );
                connection.release();
            });
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            res.status(500).send('Terjadi kesalahan pada server');
        }
    },

    changePassword(req, res) {
        res.render("changePassword", {
            url: 'http://localhost:3000/'
        });
    },

    updatePassword(req, res) {
        try {
            let id = req.session.userid;
            let { old_password, new_password } = req.body;

            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `SELECT password FROM user WHERE user_id = ?`,
                    [id],
                    function (error, results) {
                        if (error) throw error;

                        let storedPassword = results[0].password;
                        let hashedOldPassword = crypto.createHash('sha512').update(old_password).digest('hex');
                        
                        if (hashedOldPassword === storedPassword) {
                            let hashedNewPassword = crypto.createHash('sha512').update(new_password).digest('hex');
                            connection.query(
                                `UPDATE user SET password = ?, update_time = NOW() WHERE user_id = ?`,
                                [hashedNewPassword, id],
                                function (error, results) {
                                    if (error) throw error;
                                    req.flash('color', 'success');
                                    req.flash('status', 'Success');
                                    req.flash('message', 'Password updated successfully');
                                    res.redirect('/profile');
                                }
                            );
                        } else {
                            req.flash('color', 'danger');
                            req.flash('status', 'Oops..');
                            req.flash('message', 'Incorrect old password');
                            res.redirect('/profile/change-password');
                        }
                    }
                );
                connection.release();
            });
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            res.status(500).send('Terjadi kesalahan pada server');
        }
    }
};
