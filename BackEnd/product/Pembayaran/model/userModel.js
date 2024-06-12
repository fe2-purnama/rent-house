// Import Sequelize
import { DataTypes } from "sequelize";

// Import koneksi database
import sequelize from "../library/database.js";

// Definisikan model User
const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_depan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_belakang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING, // Anda perlu menambahkan tipe data untuk kolom password
      allowNull: false,
    },
    no_tlpn: {
      type: DataTypes.STRING, // Anda perlu menambahkan tipe data untuk kolom no_tlpn
    },
    update_time: {
      type: DataTypes.DATE, // Anda perlu menambahkan tipe data untuk kolom update_time
    },
    last_login: {
      type: DataTypes.DATE, // Anda perlu menambahkan tipe data untuk kolom last_login
    },
    create_time: {
      type: DataTypes.DATE, // Anda perlu menambahkan tipe data untuk kolom create_time
    },
    role: {
      type: DataTypes.STRING, // Anda perlu menambahkan tipe data untuk kolom role
    },
  },
  {
    timestamps: false, // Menonaktifkan pembuatan kolom createdAt dan updatedAt
  }
);

// Sinkronisasi model dengan database
// Jika tabel belum ada, Sequelize akan membuatnya
User.sync({ alter: true });

// Export model User
export default User;
