const path = require('path');
const express = require('express');
require('dotenv').config();


const { Configuration, OpenAIApi } = require("openai");

// Crea una instancia de Express
const app = express();
app.use(express.static(path.join(__dirname, 'public')));


// Crea una configuración con tu API Key de OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


// Define una ruta para manejar peticiones
app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});


const requestOpenAIApi= async(req) => {
  const completion = await  openai.createCompletion({
    max_tokens: 3800,
    model: "text-davinci-003",
    prompt: req.query.prompt,
    temperature: 0.9 
  })
  return completion
}

app.post('/', async (req, res) => {

  console.log("REQUEST!!!!!!!!")  
  let completion
  try {
    completion = await requestOpenAIApi(req)
      // Obtener la respuesta en formato de texto
    const responseText = completion.data.choices[0].text;
    // console.log(responseText);

    // Enviar la respuesta al cliente
    console.log(responseText);

    res.send(responseText + "\n Visita la página de GrowthMorning para más información");
    


  } catch{
    res.send("Up! tuvimos un problema con el servidor. Intentalo más tarde");
  }
  
});


// Inicia el servidor escuchando en un puerto específico
app.listen(8282, () => {
  console.log('Server started on port 8282');
});

