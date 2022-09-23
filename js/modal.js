
const abrir = document.getElementById('boton-elegidos');
const cerrar = document.getElementById('boton-cerrar');

const pagar = document.getElementById('pagar');

const contenedorModal =document.getElementsByClassName('modal-factura') [0]
const contenidoModal = document.getElementsByClassName('modal-viaje')[0]

let toast = document.getElementById('toast')



abrir.addEventListener('click',() =>{
  console.log('abierto')
  contenedorModal.classList.toggle('modal-none')

})


contenidoModal.addEventListener('click', (e)=> {
    e.stopPropagation()
})

contenedorModal.addEventListener('click', ()=>{
    cerrar.click()
})

pagar.addEventListener('click',() =>{
    console.log('pagar')
    Toastify({

      text: "Pago aprobado ✅",
            
      duration: 10000000000,
      close: true,
      gravity: "bottom",
      position: "right", 
      stopOnFocus: false,
      style: {
        background: "linear-gradient(to right, #15af15, #efba30)",
      },
      onClick: function(){}
      
      }).showToast();
 
  })


