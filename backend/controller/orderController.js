const config = require("../library/database");
let mysql = require("mysql");
let pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  addOrder: async (req, res) => {
    const { tgl_order, product_id, user_id, tanggal_selesai, tanggal_mulai } =
      req.body;

    console.log("Received data:", req.body);

    try {
      // Check if the product exists and get its price
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
        const harga_total = productResults[0].harga;

        // Check if the user exists
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

          // Insert the order
          const insertQuery = `
            INSERT INTO \`order\` (tgl_order, product_id, user_id, status, tanggal_selesai, tanggal_mulai, harga_total)
            VALUES (?, ?, ?, 'Pending', ?, ?, ?)
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
