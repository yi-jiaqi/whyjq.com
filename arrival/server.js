import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Replace with your actual OpenAI API key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const prefix = process.env.THE_PREFIX
const suffix = process.env.THE_SUFFIX

app.post('/chatgpt', async (req, res) => {
    const userMessage = prefix + req.body.message + suffix;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: userMessage }]
            })
        });

        const data = await response.json();
        console.log(data);
        console.log(data.choices[0].message.content)

        if (!data.choices || data.choices.length === 0 || !data.choices[0].message || !data.choices[0].message.content) {
            throw new Error('Invalid response from OpenAI API');
        }

        res.send(data.choices[0].message.content);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing your request');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


// require('dotenv').config();
// const express = require('express');
// // const fetch = require('node-fetch');
// import fetch from 'node-fetch';
// const cors = require('cors');
// const app = express();


// app.use(express.json());
// app.use(cors()); // Enable CORS for all routes

// // Replace with your actual OpenAI API key
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY; 

// app.post('/chatgpt', async (req, res) => {
//     const userMessage = req.body.message;

//     try {
//         const response = await fetch('https://api.openai.com/v1/chat/completions', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${OPENAI_API_KEY}`
//             },
//             body: JSON.stringify({
//                 model: 'gpt-3.5-turbo',
//                 messages: [{ role: 'user', content: userMessage }]
//             })
//         });

//         const data = await response.json();
//         console.log(data);

//         if (!data.choices || data.choices.length === 0 || !data.choices[0].message || !data.choices[0].message.content) {
//             throw new Error('Invalid response from OpenAI API');
//         }

//         res.send(data.choices[0].message.content);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send('Error processing your request');
//     }
// });

