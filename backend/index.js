
require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
// MongoDB接続設定
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB接続成功'))
  .catch(err => console.error('MongoDB接続エラー:', err));

const app = express();
app.use(cors());
app.use(express.json());

//const users = []; この行は削除

const JWT_SECRET =  process.env.JWT_SECRET;

// ユーザー登録API
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // 既存ユーザーの重複チェック
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).send('既に登録されています');
        }
        // パスワードをハッシュ化
        const hashedPassword = await bcrypt.hash(password, 10);
        // ユーザーをDBに保存
        await User.create({ name, email, password: hashedPassword });
        res.status(201).send('ユーザー登録が完了しました');
    } catch (err) {
        res.status(500).send('サーバーエラー');
    }
});

// ログインAPI
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // ↓ここを修正
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('ユーザーが見つかりません');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('パスワードが正しくありません');
        }

        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });

    } catch (error) {
        res.status(500).send('サーバーエラー');
    }
});

// 保護されたAPI（サンプル）
app.get('/api/profile', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // ← 修正
    if (!token) {
        return res.status(401).send('認証されていません');
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET); // ← 修正
        res.json({ message: `こんにちは、${decoded.email}さん` }); // ← 修正
    } catch (error) {
        res.status(401).send('無効なトークンです');
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`サーバーがポート${PORT}で起動しました`);
});