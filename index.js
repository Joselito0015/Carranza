const path = require('path');
const express = require('express');
require('dotenv').config();


const { Configuration, OpenAIApi } = require("openai");

// Crea una instancia de Express
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

console.log(process.env.OPENAI_API_KEY)

// Crea una configuración con tu API Key de OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



// function generatePrompt() {
//   return `Hablame como si fueras un consultor ambiental. Invitalos a obtener los servicios de la consultoría Carranza con el número +511-4601863`;
// }


// Define una ruta para manejar peticiones
app.get('/completion', async (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});


app.get('/ia', async (req, res) => {
  const completion = await openai.createCompletion({
    max_tokens: 3800,
    model: "text-davinci-003",
    prompt: req.query.prompt,
    temperature: 0.9,
    // top_p: 1,
    // stop: ["\n"]
  });

  // Obtener la respuesta en formato de texto
  const responseText = completion.data.choices[0].text;
  // console.log(responseText);

  // Enviar la respuesta al cliente
  console.log(responseText);

  res.send(responseText);
});


// Inicia el servidor escuchando en un puerto específico
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

