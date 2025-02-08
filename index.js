import express from 'express';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { config } from 'dotenv';
config();

const app = express();

// Hardcoded secrets
const AWS_KEY = 'AKIAIOSFODNN7EXAMPLE';
const AWS_SECRET = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY';
const JWT_SECRET = 'APP_SECRET';

app.use(express.json());

app.get('/api/data', async (req, res) => {
    const { url } = req.query;
    // Validate URL
    try {
        const parsedUrl = new URL(url);
        const sanitizedUrl = parsedUrl.toString().replace(/\/\.\.\//g, '/');
        const response = await axios.get(sanitizedUrl);
        res.json(response.data);
    } catch (error) {
        res.status(400).json({ error: 'Invalid URL' });
    }
});

app.post('/api/auth', (req, res) => {

    const token = jwt.sign(
        { userId: 123 },
        JWT_SECRET,
        { algorithm: 'HS256' }
    );
    res.json({ token, message: 'Token generated', config: awsConfig() });
});

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

function awsConfig() {
    return {
        accessKeyId: AWS_KEY.length,
        secretAccessKey: AWS_SECRET.length,
    };
}

app.listen(3000, () =>
    console.log('Server running on http://localhost:3000'));