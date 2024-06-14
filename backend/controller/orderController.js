const config = require("../library/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  addOrder: async (req, res) => {
    const { tgl_order, tanggal_mulai, lama_tinggal } = req.body;
    const product_id = req.session.productId;
    const user_id = req.session.user_id;

    console.log("Received data:", req.body);
    console.log("Session data:", { product_id, user_id });

    if (!product_id || !user_id) {
      return res
        .status(400)
        .json({ error: "Product ID and User ID must be in session" });
    }

    try {
      // Check ijika product exists dan get harga
      const productQuery = `SELECT harga FROM product WHERE product_id = ?`;
      pool.query(productQuery, [product_id], (productError, productResults) => {
        if (productError) {
          console.error("Product query error:", productError.message);
          return res.status(500).json({ error: productError.message });
        }
        if (productResults.length === 0) {
          console.log("Product not found for product_id:", product_id);
          return res.status(404).json({ error: "Product not found" });
        }
        const harga_produk = productResults[0].harga;
        const harga_total = harga_produk * lama_tinggal;

        // Menghitung tanggal_selesai
        const startDate = new Date(tanggal_mulai);
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + parseInt(lama_tinggal));

        const tanggal_selesai = endDate.toISOString().split("T")[0]; // Format tanggal yyyy-mm-dd

        // chek jika user exists
        const userQuery = `SELECT user_id FROM user WHERE user_id = ?`;
        pool.query(userQuery, [user_id], (userError, userResults) => {
          if (userError) {
            console.error("User query error:", userError.message);
            return res.status(500).json({ error: userError.message });
          }
          if (userResults.length === 0) {
            console.log("User not found for user_id:", user_id);
            return res.status(404).json({ error: "User not found" });
          }
          const insertQuery = `
            INSERT INTO \`order\` (tgl_order, product_id, user_id, status, tanggal_selesai, tanggal_mulai, harga_total, lama_tinggal)
            VALUES (?, ?, ?, 'Pending', ?, ?, ?, ?)
          `;
          pool.query(
            insertQuery,
            [
              tgl_order,
              product_id,
              user_id,
              tanggal_selesai,
              tanggal_mulai,
              harga_total,
              lama_tinggal,
            ],
            (insertError, insertResults) => {
              if (insertError) {
                console.error("Insert query error:", insertError.message);
                return res.status(500).json({ error: insertError.message });
              }
              res.status(201).json({
                order_id: insertResults.insertId,
                message: "Order added successfully",
              });
            }
          );
        });
      });
    } catch (error) {
      console.error("Catch error:", error.message);
      res.status(500).json({ error: error.message });
    }
  },
};
