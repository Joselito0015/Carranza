
const industria= $('#InputIndustria')
// const problema= $('#InputProblema')
const detalles= $('#InputDetalles')

const Btn1= $('#Btn1')
const Btn2= $('#Btn2')
const BtnSubmit= $('#submit')
const Last_modal= $('#Last_modal')


const ContactarLast= $('#ContactarLast')
const NewConsult= $('#NewConsult')


const otroInput = $('#InputProblema');
const otroRadioBtn= $('#thirdRadio')


const GBtn = $('#radio3')
const PBtn = $('#radio4')
const PBtn2 = $('#radio5')
const PBtn3= $('#radio6')
const PBtn4 = $('#radio7')
const PBtn5 = $('#radio8')



otroRadioBtn.on('change', function() {
  if ($(this).is(':checked')) {
    console.log("se selecionso esteee")
    // Si se seleccionó "Otros", habilitamos el input text correspondiente
    otroInput.prop('disabled', false);
    Btn2.attr("disabled", true);

    
    otroInput.on('input', function() {
      Btn2.removeAttr("disabled")  
    })


  } else {
    console.log("se selecionso otroo")
    // Si se seleccionó otra opción, deshabilitamos el input text correspondiente
    otroInput.prop('disabled', true);
    
  }
});

GBtn.on('change', function() {
  if ($(this).is(':checked')) {
    console.log("se selecionso esteee")
    // Si se seleccionó "Otros", habilitamos el input text correspondiente
    otroInput.attr("disabled", true)
    otroInput.val("")
    Btn2.removeAttr("disabled")
  } 
});

PBtn.on('change', function() {
  if ($(this).is(':checked')) {
    console.log("se selecionso esteee")
    // Si se seleccionó "Otros", habilitamos el input text correspondiente
    otroInput.attr("disabled", true)
    otroInput.val("")
    Btn2.removeAttr("disabled")
  } 
});

PBtn2.on('change', function() {
  if ($(this).is(':checked')) {
    console.log("se selecionso esteee")
    // Si se seleccionó "Otros", habilitamos el input text correspondiente
    otroInput.attr("disabled", true)
    otroInput.val("")
    Btn2.removeAttr("disabled")
  } 
});

PBtn3.on('change', function() {
  if ($(this).is(':checked')) {
    console.log("se selecionso esteee")
    // Si se seleccionó "Otros", habilitamos el input text correspondiente
    otroInput.attr("disabled", true)
    otroInput.val("")
    Btn2.removeAttr("disabled")
  } 
});

PBtn4.on('change', function() {
  if ($(this).is(':checked')) {
    console.log("se selecionso esteee")
    // Si se seleccionó "Otros", habilitamos el input text correspondiente
    otroInput.attr("disabled", true)
    otroInput.val("")
    Btn2.removeAttr("disabled")
  } 
});
PBtn5.on('change', function() {
  if ($(this).is(':checked')) {
    console.log("se selecionso esteee")
    // Si se seleccionó "Otros", habilitamos el input text correspondiente
    otroInput.attr("disabled", true)
    otroInput.val("")
    Btn2.removeAttr("disabled")
  } 
});




// industria.on("input",()=>{
//   if (industria.val().trim() === ""){
//     Btn1.attr("disabled", true);
//   }
//   else{
//     Btn1.removeAttr("disabled")  
//   }

// })

// problema.on("input",()=>{
//   if (problema.val().trim() === ""){
//     Btn2.attr("disabled", true);
//   }
//   else{
//     Btn2.removeAttr("disabled")  
//   }

// })

detalles.on("input",()=>{
  if (detalles.val().trim() === ""){

    BtnSubmit.attr("disabled", true);
  }
  else{
    const valorSeleccionado = $('ul.list-group input[type="radio"]:checked').val();
    console.log(valorSeleccionado)

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
          otroInput.val("")
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

  const valorSeleccionado = $('ul.list-group input[type="radio"]:checked').val();

  let Tema

  if (valorSeleccionado === "1") {
    Tema = "Product management";
  } else if (valorSeleccionado === "2") {
    Tema = "Growth strategy";
  } else if (valorSeleccionado === "3") {
    Tema = "Marketing";
  } else if (valorSeleccionado === "4") {
    Tema = "Finance";
  } else if (valorSeleccionado === "5") {
    Tema = "Technology";
  } else if (valorSeleccionado === "6") {
    Tema = "Data";
  }
  else if (valorSeleccionado === "7"){
    Tema = otroInput.val()
  }

  return `
  Da la solución de forma objetiva, profesional y directa.
    
  Primero dame la solución de forma objetiva.
    
  Dame la resupuesta en menos de 1000 caracteres. 

  Dame una respuesta corta o consejo corto que se pueda tomar. 
  
  En caso se pueda, usa ejemplos del ecosistema de latinoamerica. Los detalles de la consulta son:
    - 1. mi tópico es  ${Tema} 
    - 2. Detalles Extra ${detalles.val()}
  `
  }
  

  industria.on('input', function() {
    const email = industria.val().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      Btn1.prop('disabled', false);
    } else {
      Btn1.prop('disabled', true);
    }
  });