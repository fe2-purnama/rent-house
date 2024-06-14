const Product = require('../model/product');
const { Op } = require('sequelize');

// Mendapatkan semua produk atau filter berdasarkan query parameters
exports.getAllProducts = async (req, res) => {
    try {
        const { kategori_id, min_luas, max_luas, harga, lokasi } = req.query;
        const filter = {};

        if (kategori_id) filter.kategori_id = kategori_id;
        if (min_luas || max_luas) {
            filter.luas_properti = {};
            if (min_luas) filter.luas_properti[Op.gte] = min_luas;
            if (max_luas) filter.luas_properti[Op.lte] = max_luas;
        }
        if (harga) filter.harga = harga;
        if (lokasi) filter.lokasi = { [Op.like]: `%${lokasi}%` };

        const products = await Product.findAll({ where: filter });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mendapatkan produk berdasarkan ID dan menyimpan ID dalam sesi
exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id || req.session.productId;
        if (!productId) {
            return res.status(400).json({ message: 'Product ID not provided' });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        req.session.productId = productId; // Save product ID in session
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Membuat produk baru
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Mengupdate produk berdasarkan ID
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        await product.update(req.body);
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Menghapus produk berdasarkan ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        await product.destroy();
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
