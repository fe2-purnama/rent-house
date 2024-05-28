const config = require('../library/database');
let mysql = require('mysql');
let pool = mysql.createPool(config);

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
                    `
                    SELECT * FROM user where user_id = '${id}';
                    `,
                    function (error, results) {
                        if (error) throw error;
                        res.render("profile", {
                            url: 'http://localhost:3000/',
                            nama_depan: req.session.nama_depan,
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
    }
};
