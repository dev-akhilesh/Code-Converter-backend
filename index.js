const express = require('express');
const cors = require('cors')
// const { OpenAIApi, Configuration } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors())
app.use(express.json());

// Set your OpenAI API key
const apiKey = process.env.OPEN_AI_KEY;

app.get('/', (req, res) => {
    res.status(200).send('Welcome To Open AI');
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});