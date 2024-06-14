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
            let user_id = req.session.user_id;
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `SELECT * FROM user WHERE user_id = ?`,
                    [user_id],
                    function (error, results) {
                        if (error) throw error;
                        res.json({
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
            res.status(500).json({ message: 'Terjadi kesalahan pada server' });
        }
    },

    editProfile(req, res) {
        try {
            let user_id = req.session.user_id;
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `SELECT * FROM user WHERE user_id = ?`,
                    [user_id],
                    function (error, results) {
                        if (error) throw error;
                        res.json({
                            url: 'http://localhost:3000/',
                            user: results[0]
                        });
                    }
                );
                connection.release();
            });
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            res.status(500).json({ message: 'Terjadi kesalahan pada server' });
        }
    },

    updateProfile(req, res) {
        try {
            let user_id = req.session.user_id;
            let { nama_depan, nama_belakang, no_tlpn } = req.body;
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `UPDATE user SET nama_depan = ?, nama_belakang = ?, no_tlpn = ?, update_time = NOW() WHERE user_id = ?`,
                    [nama_depan, nama_belakang, no_tlpn, user_id],
                    function (error, results) {
                        if (error) throw error;
                        res.json({ message: 'Profile updated successfully' });
                    }
                );
                connection.release();
            });
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            res.status(500).json({ message: 'Terjadi kesalahan pada server' });
        }
    },

    changePassword(req, res) {
        res.json({
            url: 'http://localhost:3000/'
        });
    },

    updatePassword(req, res) {
        try {
            let user_id = req.session.user_id;
            let { old_password, new_password } = req.body;
            console.log(`Old password: ${old_password}`);
            console.log(`New password: ${new_password}`);
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if (!passwordRegex.test(new_password)) {
                return res.status(400).json({
                    color: 'danger',
                    status: 'Oops..',
                    message: 'New password does not meet security criteria.'
                });
            }
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `SELECT password FROM user WHERE user_id = ?`,
                    [user_id],
                    function (error, results) {
                        if (error) throw error;

                        let storedPassword = results[0].password;
                        let hashedOldPassword = crypto.createHash('sha512').update(old_password).digest('hex');
                        let hashedNewPassword = crypto.createHash('sha512').update(new_password).digest('hex');
                        if (hashedOldPassword === hashedNewPassword) {
                            return res.status(400).json({
                                color: 'danger',
                                status: 'Oops..',
                                message: 'New password cannot be the same as the old password.'
                            });
                        }
                        if (hashedOldPassword === storedPassword) {
                            connection.query(
                                `UPDATE user SET password = ?, update_time = NOW() WHERE user_id = ?`,
                                [hashedNewPassword, user_id],
                                function (error, results) {
                                    if (error) throw error;
                                    res.json({
                                        color: 'success',
                                        status: 'Success',
                                        message: 'Password updated successfully'
                                    });
                                }
                            );
                        } else {
                            res.status(400).json({
                                color: 'danger',
                                status: 'Oops..',
                                message: 'Incorrect old password'
                            });
                        }
                    }
                );
                connection.release();
            });
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            res.status(500).json({ message: 'Terjadi kesalahan pada server' });
        }
    }
};
