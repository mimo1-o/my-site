const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// رابط الاتصال بقاعدة البيانات
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://overg0090_db_user:hhsz7BlUpzsOz5Gm@cluster0.xxxxxx.mongodb.net/luxury_store?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas! 🚀'))
  .catch(err => console.error('Connection error:', err));

// تحديد شكل المنتج في قاعدة البيانات
const ProductSchema = new mongoose.Schema({
  title: String,
  price: Number,
  seller: String,
  size: String,
  wilaya: String,
  condition: String,
  date: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', ProductSchema);

// مسار لجلب المنتجات من MongoDB
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ date: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// مسار لإضافة منتج جديد لـ MongoDB
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
