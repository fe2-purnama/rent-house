const config = require('../library/database');
let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    userList(req, res) {
        try {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `SELECT * FROM user`, // Query all users
                    function (error, results) {
                        if (error) throw error;
                        res.render("userList", {
                            url: 'http://localhost:3000/',
                            nama_depan: req.session.nama_depan,
                            users: results // Pass all users to the template
                        });
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
