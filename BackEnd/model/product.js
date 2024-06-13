const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('renthouse', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    kategori_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    nama_product: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gambar1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gambar2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gambar3: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gambar4: {
        type: DataTypes.STRING,
        allowNull: true
    },
    akses_wifi: {
        type: DataTypes.ENUM('yes', 'no'),
        defaultValue: 'no'
    },
    jumlah_kamar: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    lokasi: {
        type: DataTypes.STRING,
        allowNull: true
    },
    harga: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    ruang_tamu: {
        type: DataTypes.ENUM('yes', 'no'),
        defaultValue: 'no'
    },
    garasi: {
        type: DataTypes.ENUM('yes', 'no'),
        defaultValue: 'no'
    },
    no_rek: {
        type: DataTypes.STRING,
        allowNull: false
    },
    map: {
        type: DataTypes.STRING,
        allowNull: true
    },
    luas_properti: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tanggal_selesai: {
        type: DataTypes.DATE,
        allowNull: true
    },
    tanggal_mulai: {
        type: DataTypes.DATE,
        allowNull: true
    },
    harga_total: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'product',
    timestamps: false
});

module.exports = Product;
