const config = require("../library/database");
let mysql = require("mysql");
let pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  getBuyers: (req, res) => {
    const query = `
    SELECT user.user_id, user.nama_depan, user.email, product.nama_product, kategori.nama_kategori, product.harga, product.lokasi, order.role, order.status
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
  },

  getBuyerById: (req, res) => {
    const buyerId = req.params.id;
    // Query SQL untuk mengambil pembeli berdasarkan ID
    const query = `
    SELECT user.user_id, user.nama_depan, user.email, product.nama_product, kategori.nama_kategori, product.harga, product.lokasi, order.role, order.status
    FROM \`order\`
    JOIN user ON \`order\`.user_id = user.user_id
    JOIN product ON \`order\`.product_id = product.product_id
    JOIN kategori ON product.kategori_id = kategori.kategori_id
`;
    pool.query(query, [buyerId], (err, results) => {
      if (err) {
        return res.status(500).send("Error fetching buyer by ID");
      }
      if (results.length === 0) {
        return res.status(404).send("Buyer not found");
      }

      res.send(results[0]);
    });
  },

  //memperbarui status berdasarkan user_id
  updateBuyer: (req, res) => {
    const { user_id, status } = req.body;
    const query = "UPDATE `order` SET status = ? WHERE user_id = ?";
    pool.query(query, [status, user_id], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({ message: "Status updated successfully" });
      }
    });
  },

  deleteBuyer: (req, res) => {
    const { id } = req.params;
    let query;
    let params;

    // Periksa apakah id adalah user_id atau order_id
    if (!isNaN(id)) {
      query = "DELETE FROM `order` WHERE user_id = ?";
      params = [id];
    } else {
      query = "DELETE FROM `order` WHERE order_id = ?";
      params = [id];
    }

    pool.query(query, params, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
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