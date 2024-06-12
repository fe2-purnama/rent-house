// Import Sequelize
import { DataTypes } from "sequelize";

// Import koneksi database
import sequelize from "../library/database.js";

// Import model User
import User from "./UserModel.js";

// Definisikan model Order
const Order = sequelize.define("Order", {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tgl_order: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  produk_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Hubungkan model Order dengan model User
Order.belongsTo(User, { foreignKey: "user_id" });

// Sinkronisasi model dengan database
// Jika tabel belum ada, Sequelize akan membuatnya
Order.sync({ alter: true });

// Export model Order
export default Order;
