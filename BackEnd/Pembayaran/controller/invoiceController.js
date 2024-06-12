const config = require("../library/database");
let mysql = require("mysql");
let pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  getInvoice: (req, res) => {
    const orderId = req.params.orderId;
    const query = `
      SELECT
          o.order_id AS invoice_id,
          u.user_id AS customer_user_id,
          CONCAT(u.nama_depan, ' ', u.nama_belakang) AS customer_name,
          u.email AS customer_email,
          p.product_id AS product_id,
          p.nama_product AS product_name,
          k.nama_kategori AS category_name,
          p.gambar1 AS product_image_url,  -- Menggunakan gambar1 sebagai gambar utama
          p.akses_wifi AS wifi_access,
          p.jumlah_kamar AS room_count,
          p.ruang_tamu AS living_room,
          p.garasi AS garage,
          p.lokasi AS location,
          p.no_rek AS bank_account,
          p.harga AS price,
          p.map AS map_url,
          o.tgl_order AS order_date,
          o.role AS user_role,
          o.status AS order_status,
          od.quantity AS quantity  -- Menambahkan kolom quantity dari tabel order
      FROM \`order\` o
      JOIN user u ON o.user_id = u.user_id
      JOIN product p ON o.product_id = p.product_id
      JOIN kategori k ON p.kategori_id = k.kategori_id
      JOIN \`order\` od ON o.order_id = od.order_id
      WHERE o.order_id = ?
    `;

    pool.query(query, [orderId], (err, results) => {
      if (err) {
        console.error("Query error:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "Invoice not found" });
        return;
      }

      const invoiceData = {
        invoice_id: results[0].invoice_id,
        customer: {
          user_id: results[0].customer_user_id,
          name: results[0].customer_name,
          email: results[0].customer_email,
        },
        product: {
          product_id: results[0].product_id,
          name: results[0].product_name,
          category: results[0].category_name,
          image_url: results[0].product_image_url,
          wifi_access: results[0].wifi_access,
          room_count: results[0].room_count,
          living_room: results[0].living_room,
          garage: results[0].garage,
          location: results[0].location,
          bank_account: results[0].bank_account,
          price: results[0].price,
          map_url: results[0].map_url,
          quantity: results[0].quantity, // Menambahkan jumlah produk yang dipesan
        },
        order_date: results[0].order_date,
        user_role: results[0].user_role,
        order_status: results[0].order_status,
        total_price: results[0].price * results[0].quantity, // Menghitung total harga
      };

      // // Render view invoice.ejs dengan data invoiceData
      // res.render("invoice", { invoice: invoiceData });

      // Render as JSON
      res.json({ invoice: invoiceData });
    });
  },
};
