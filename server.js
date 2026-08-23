const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// الاتصال بقاعدة البيانات عبر المتغير البيئي
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch(err => console.error('Connection error:', err));

// صفحة تجريبية للتأكد من عمل الخادم
app.get('/', (req, res) => {
  res.send('Server is running smoothly!');
});

// تحديد المنفذ الديناميكي الخاص بـ Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
