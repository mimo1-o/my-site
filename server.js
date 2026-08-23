const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // للسماح للموقع بالتواصل مع الخادم
const app = express();

app.use(cors());
app.use(express.json());

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch(err => console.error('Connection error:', err));

// 1. تحديد شكل البيانات (Message Schema)
const MessageSchema = new mongoose.Schema({
  text: String,
  date: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', MessageSchema);

// 2. رابط لإرسال رسالة وتخزينها (POST)
app.post('/api/messages', async (req, res) => {
  try {
    const newMessage = new Message({ text: req.body.text });
    await newMessage.save();
    res.json({ success: true, message: 'Saved to database!' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. رابط لعرض جميع الرسائل المخزنة (GET)
app.get('/api/messages', async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
