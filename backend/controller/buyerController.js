const config = require("../library/database");
let mysql = require("mysql");
let pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err); 
});

// Menampilkan List Pembeli
module.exports = {
  getBuyers: (req, res) => {
    const roleBuyer = req.session.role;
    if (roleBuyer == 3 || roleBuyer == 2) {
      const query = `
    SELECT user.user_id, user.nama_depan, user.email,user.role, product.nama_product, kategori.nama_kategori, product.harga, product.lokasi, order.status
    FROM \`order\`
    JOIN user ON \`order\`.user_id = user.user_id
    JOIN product ON \`order\`.product_id = product.product_id
    JOIN kategori ON product.kategori_id = kategori.kategori_id
    `;
      pool.query(query, (err, results) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json({ buyers: results });
        }
      });
    } else {
      // Jika pengguna tidak memiliki peran 2 atau 3, mereka tidak diizinkan untuk melihat daftar pembeli
      res.status(403).json({
        error: "Anda tidak memiliki akses pada halaman ini.",
      });
    }
  },

  getBuyerById: (req, res) => {
    const orderId = req.params.id;
    const roleBuyer = req.session.role; // Mengambil role pengguna dari session
    if (roleBuyer == 3 || roleBuyer == 2) {
      let query = `
      SELECT user.user_id, user.nama_depan, user.email, user.role, product.nama_product, kategori.nama_kategori, product.harga, product.lokasi, \`order\`.status
      FROM \`order\`
      JOIN user ON \`order\`.user_id = user.user_id
      JOIN product ON \`order\`.product_id = product.product_id
      JOIN kategori ON product.kategori_id = kategori.kategori_id
      WHERE \`order\`.order_id = ?
    `;
      pool.query(query, [orderId], (err, results) => {
        if (err) {
          return res.status(500).send("Error fetching buyer by ID");
        }
        if (results.length === 0) {
          return res.status(404).send("Buyer not found");
        }
        res.send(results[0]);
      });
    } else {
      // Jika pengguna tidak memiliki peran 2 atau 3, mereka tidak diizinkan
      res.status(403).json({
        error: "Anda tidak memiliki akses pada halaman ini.",
      });
    }
  },

  //memperbarui status berdasarkan order_id
  updateBuyer: (req, res) => {
    const roleBuyer = req.session.role;
    if (roleBuyer == 3 || roleBuyer == 2) {
      const { user_id, status } = req.body;
      const query = "UPDATE `order` SET status = ? WHERE order_id = ?";
      pool.query(query, [status, user_id], (err, results) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(200).json({ message: "Status updated successfully" });
        }
      });
    } else {
      // Jika pengguna tidak memiliki peran 2 atau 3, mereka tidak diizinkan
      res.status(403).json({
        error: "Anda tidak memiliki akses pada halaman ini.",
      });
    }
  },

  //menghapus status berdasarkan order_id
  deleteBuyer: (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM `order` WHERE order_id = ?";

    pool.query(query, [id], (err, results) => {
      if (err) {
        console.error("Query error:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).json({ message: "Order not found" });
        } else {
          res.status(200).json({ message: "Order deleted successfully" });
        }
      }
    });
  },
};
