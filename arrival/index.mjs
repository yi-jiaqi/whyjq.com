// export const handler = async (event) => {
//   // TODO implement
//   const response = {
//     statusCode: 200,
//     body: JSON.stringify('Hello from Lambda!'),
//   };
//   return response;
// };


import fetch from 'node-fetch';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const prefix = process.env.THE_PREFIX;
const suffix = process.env.THE_SUFFIX;

export const handler = async (event) => {
    try {
        // Parse incoming event body
        const body = JSON.parse(event.body);
        const userMessage = prefix + body.message + suffix;

        // Call OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',  // Use the correct model name here
                messages: [{ role: 'user', content: userMessage }]
            })
        });

        const data = await response.json();
        console.log(data);

        // Error handling for empty response
        if (!data.choices || data.choices.length === 0 || !data.choices[0].message || !data.choices[0].message.content) {
            throw new Error('Invalid response from OpenAI API');
        }

        // Return the OpenAI response
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: data.choices[0].message.content
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
    } catch (error) {
        console.error('Error:', error);

        // Return error response
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error processing your request',
                error: error.toString()
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        };
    }
};