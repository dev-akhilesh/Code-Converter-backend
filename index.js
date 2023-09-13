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


app.post('/converter', async (req, res) => {

    const { inputCode, sourceLanguage, targetLanguage } = req.body;

    let prompt;
    if (sourceLanguage) {
        prompt = `Convert the following ${sourceLanguage} code to ${targetLanguage}:\n${inputCode}`;
    } else {
        prompt = `Convert the following code into ${targetLanguage}:\n${inputCode}`;
    }

    try {

        const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                prompt,
                max_tokens: 150,  // Adjust as needed
            }),
        });

        const responseData = await response.json();
        const generatedCode = responseData.choices[0].text.trim();

        console.log(`generatedCode `, generatedCode);

        return res.status(201).send({
            data: generatedCode
        })


    } catch (error) {

        console.error('Error converting code:', error);

        return res.status(201).send({
            data: error
        })

    }

})


app.post('/debug', async (req, res) => {

    const { inputCode, sourceLanguage, targetLanguage } = req.body;

    const prompt = `debug the following code (which could include identification of errors, suggestions for fixes, etc.) : \n${inputCode}`;

    try {

        const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                prompt,
                max_tokens: 150,  // Adjust as needed
            }),
        });

        const responseData = await response.json();
        const generatedCode = responseData.choices[0].text.trim();

        console.log(`generatedCode `, generatedCode);

        return res.status(201).send({
            data: generatedCode
        })


    } catch (error) {

        console.error('Error converting code:', error);

        return res.status(201).send({
            data: error
        })

    }

})


app.post('/performance', async (req, res) => {

    const { inputCode, sourceLanguage, targetLanguage } = req.body;

    const prompt = `check performance of the following code and assessment of the code's quality (such as commentary on style, organization, potential improvements, etc.) : \n${inputCode}`;

    try {

        const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                prompt,
                max_tokens: 150,  // Adjust as needed
            }),
        });

        const responseData = await response.json();
        const generatedCode = responseData.choices[0].text.trim();

        console.log(`generatedCode `, generatedCode);

        return res.status(201).send({
            data: generatedCode
        })


    } catch (error) {

        console.error('Error converting code:', error);

        return res.status(201).send({
            data: error
        })

    }

})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});