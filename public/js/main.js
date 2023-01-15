
const industria= $('#InputIndustria')
const problema= $('#InputProblema')
const detalles= $('#InputDetalles')

const Btn1= $('#Btn1')
const Btn2= $('#Btn2')
const BtnSubmit= $('#submit')
const Last_modal= $('#Last_modal')


const ContactarLast= $('#ContactarLast')
const NewConsult= $('#NewConsult')


// Eventos
industria.on("input",()=>{
  if (industria.val().trim() === ""){
    Btn1.attr("disabled", true);
  }
  else{
    Btn1.removeAttr("disabled")  
  }

})

problema.on("input",()=>{
  if (problema.val().trim() === ""){
    Btn2.attr("disabled", true);
  }
  else{
    Btn2.removeAttr("disabled")  
  }

})

detalles.on("input",()=>{
  if (detalles.val().trim() === ""){
    BtnSubmit.attr("disabled", true);
  }
  else{
    BtnSubmit.removeAttr("disabled")    

  }

})


NewConsult.on("click", ()=>
{
  Last_modal.html(`<div id="spiner" class="spinner-border text-success" role="status"> <span class="visually-hidden">Loading...</span></div>`)
  NewConsult.attr("disabled", true);
  ContactarLast.attr("disabled", true);

  const cursor= $('.typed-cursor')
  cursor.remove()

}
)


BtnSubmit.on("click",  async (e )=> {
    await fetch(`${document.location.protocol}//${document.location.hostname}:8282/?prompt=${generatePrompt()}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.text())
    .then(data => {
      // Aquí manejas la respuesta obtenida
      console.log(data);
      Last_modal.text("")

      let options = {
        strings: [data],
        typeSpeed: 40,
        onComplete: function() {
          // Change button state here
          NewConsult.removeAttr("disabled");
          ContactarLast.removeAttr("disabled");
          industria.val("")
          problema.val("")
          detalles.val("")

          ContactarLast.addClass("btn-success")
          ContactarLast.removeClass("btn-primary")

      }
      };
      
      let typed = new Typed('#Last_modal', options);

      
    })
    .catch(error => {
      // Aquí manejas el error
      console.error(error);
    });

})


function generatePrompt() {
    return `Dame una solución o estudios que se deben realizar. En caso se pueda, usa leyes peruanas. Los detalles de la consulta son: 
    
    - 1. mi industria es: ${industria.val()}
    - 2. mi problema es ${problema.val()} 
    - 3. Detalles Extra ${detalles.val()}

    Da la solución de forma objetiva, profesional y directa.
    Primero da la solución de forma objetiva, al final invitalos a obtener nuestros servicios de la consultoría Carranza con el número +51 994-615-074.
    Dame la resupuesta en menos de 1000 caracteres.`;
  }
  