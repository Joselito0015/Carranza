
const industria= $('#InputIndustria')
const problema= $('#InputProblema')
const detalles= $('#InputDetalles')
const BtnSubmit= $('#submit')
const Last_modal= $('#Last_modal')


console.log("gaaaaaaaas")
// Eventos
BtnSubmit.on("click",  async ( )=> {

  await fetch(`http://127.0.0.1:3000/ia?prompt=${generatePrompt()}`)
  .then(response => response.text())
  .then(data => {
    // Aquí manejas la respuesta obtenida
    console.log(data);
    Last_modal.text(data)

  })
  .catch(error => {
    // Aquí manejas el error
    console.error(error);
  });

  
  console.log("response222")
})


function generatePrompt() {
    return `Dame una solución o estudios que se deben realizar. En caso se pueda, usa leyes peruanas. Los detalles de la consulta son: 
    
    - 1. mi industria es: ${industria.val()}
    - 2. mi problema es ${problema.val()} 
    - 3. Detalles Extra ${detalles.val()}

    Da la solución de forma objetiva, profesional y directa.
    Primero da la solución de forma objetiva, al final invitalos a obtener nuestros servicios de la consultoría Carranza con el número +511-4601863.
    Dame la resupuesta en menos de 1000 caracteres.`;
  }
  