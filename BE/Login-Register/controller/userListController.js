const config = require('../library/database');
let mysql = require('mysql');
let pool = mysql.createPool(config);
const moment = require('moment');

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    userList(req, res) {
        try {
            pool.getConnection(function (err, connection) {
                if (err) throw err;

                let query;
                let params = [];
                const userRole = req.session.role;
// const userRole = req.role;
                if (userRole == 2) {
                    query = `SELECT * FROM user WHERE role IN (?, ?)`;
                    params = [1, 3];
                } else if (userRole == 4) {
                    query = `SELECT * FROM user WHERE role = ?`;
                    params = [2];
                } else {
                    query = `SELECT * FROM user`;
                }

                connection.query(query, params, function (error, results) {
                    if (error) throw error;
                    results.forEach(user => {
                        user.last_login = moment(user.last_login).fromNow();
                    });
                    res.json({
                        url: 'http://localhost:3000/',
                        nama_depan: req.session.nama_depan,
                        users: results
                    });
                });

                connection.release();
            });
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            res.status(500).json({ message: 'Terjadi kesalahan pada server' });
        }
    },
    getUserById(req, res) {
        const user_id = req.params.id;
        try {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `SELECT * FROM user WHERE user_id = ?`, [user_id],
                    function (error, results) {
                        if (error) throw error;
                        if (results.length > 0) {
                            results[0].last_login = moment(results[0].last_login).fromNow();
                            res.json({
                                url: 'http://localhost:3000/',
                                nama_depan: req.session.nama_depan,
                                user: results[0]
                            });
                        } else {
                            res.status(404).json({ message: 'User tidak ditemukan' });
                        }
                    }
                );
                connection.release();
            });
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            res.status(500).json({ message: 'Terjadi kesalahan pada server' });
        }
    },
    updateUser(req, res) {
        const user_id = req.params.id;
        const { nama_depan, nama_belakang, email, no_tlpn, role } = req.body;
        try {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `UPDATE user SET nama_depan = ?, nama_belakang = ?, email = ?, no_tlpn = ?, role = ?, update_time = NOW() WHERE user_id = ?`,
                    [nama_depan, nama_belakang, email, no_tlpn, role, user_id],
                    function (error, results) {
                        if (error) throw error;
                        res.json({ message: 'User updated successfully' });
                    }
                );
                connection.release();
            });
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            res.status(500).json({ message: 'Terjadi kesalahan pada server' });
        }
    },
    deleteUser(req, res) {
        const user_id = req.params.id;
        try {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `DELETE FROM user WHERE user_id = ?`,
                    [user_id],
                    function (error, results) {
                        if (error) throw error;
                        res.json({ message: 'User deleted successfully' });
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
