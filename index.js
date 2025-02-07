import express from 'express';
import bodyParser from 'body-parser';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Configure OpenAI with API key
const configuration = new Configuration({
    apiKey: 'sample key here',
});
const openai = new OpenAIApi(configuration);

// Basic endpoint to handle chat messages
app.post('/send-message', async (req, res) => {
    try {
        const { message } = req.body;
        
        const completion = await openai.createCompletion(
            'davinci', 
            {
                model: 'davinci',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: message },
                ],
            });

        res.json({ 
            response: completion.data.choices[0].text 
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});