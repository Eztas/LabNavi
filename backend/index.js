
require('dotenv').config();


const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const users = [];

const JWT_SECRET =  process.env.JWT_SECRET;

// ユーザー登録API
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ email, password: hashedPassword }); // ← 修正

    res.status(201).send('ユーザー登録が完了しました');
});

// ログインAPI
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(400).send('ユーザーが見つかりません');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('パスワードが正しくありません');
        }

        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' }); // ← 修正
        res.json({ token }); // ← 修正

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