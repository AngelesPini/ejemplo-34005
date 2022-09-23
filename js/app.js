
// array vacio donde almaceno mis prodcutos

let miViaje = []

// filtro para encontrar paquetes y vuelos

const buscadorPaquetes = document.getElementById('buscadorPaquetes');
const buscadorVuelos = document.getElementById('buscadorVuelos')

// contenedor de paquetes y vuelos
const pack = document.getElementById('paquetes');
const flies = document.getElementById('vuelos');

// contenedor de carrito
const serviciosElegidos = document.getElementById('serviciosElegidos')

// resultado de la suma de mis productos
const precioTotal = document.getElementById('precioTotal');

const agregados = document.getElementById('agregados')



// filtro de búsqueda paquetes
buscadorPaquetes.addEventListener('change',()=>{
    // operadores ternarios (if.....else)
    buscadorPaquetes.value == 'all' ? mostrarPaquetes(paquetes) : mostrarPaquetes(paquetes.filter(el => el.hotel == buscadorPaquetes.value))
    })

// filtro de búsqueda vuelos
buscadorVuelos.addEventListener('change',()=>{
    // operadores ternarios (if.....else)
    buscadorVuelos.value == 'all' ? mostrarVuelos(vuelos) : mostrarVuelos(vuelos.filter(el => el.clase == buscadorVuelos.value))
    })

// ================
mostrarPaquetes(paquetes);
mostrarVuelos(vuelos);


// funcion para mostrar paquetes
function mostrarPaquetes(array){
    // le pido que cree un elemento HTML
    pack.innerHTML='';

    // declaro parametros condicionales para mostrar mis productos
    for (const Paquete of array){

        // creo un div a traves de una variable
        let div = document.createElement('div');

        // asigno un classname
        div.className = 'Paquete';

        // le asigno el contenido a mi variable (el cual va a corresponder a mi array de productos)
        div.innerHTML = `<div class="card card1 col-12 column">
          <div>
           <small class="first">DEJATE ATRAPAR</small>
           <figure><img src="./multimedia/${Paquete.img}" alt="Image"> </figure>
           <h3>${Paquete.nombre}</h3>
            <p>Para ${Paquete.cantidad} persona</p>
            <div class="inner">
            <ul>
              <li><small>Duración ${Paquete.dias} días</small> <span><img src="./UI-kit/icons8-calendar-30.png" alt="">DISPONIBLE TODO EL AÑO</span> </li>
              <li><small>HOTEL?</small> <span><img src="./UI-kit/icons8-hotel-check-out-30.png" alt="">${Paquete.hotel}</span> </li>
              <li><small>Precio en dólares:</small><span><img src="./UI-kit/icons8-sale-price-tag-30.png" alt=""> ${Paquete.precio}</span> </li>
            </ul>
            <button id="botonAgregar${Paquete.id}" type="button" class="btn btn-warning">LO QUIERO!</button>
            </div>
        </div>
      </div>
      `
        // contenedor hijo
      pack.appendChild(div);

    //   le pido a mi botón que cumpla la funcion de agregar productos a mi chango
      let btnAgregar = document.getElementById(`botonAgregar${Paquete.id}`)
      btnAgregar.addEventListener('click',()=>{
        // a traves de una arrow function
        agregarPack(Paquete.id)

        // utilizo una libreria para dar mejor estilo a mi alerta
        Toastify({

            // llamo los parámetros condicionales en mi alerta, al igual que en mi catálogo
            text: "Agregaste a tu voucher " + '"'+ Paquete.nombre + '"' + " por el precio de " + Paquete.precio + " dólares",
            
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "right", 
            stopOnFocus: false,
            style: {
              background: "linear-gradient(to right, #740001, #efba30)",
            },
            onClick: function(){}
            
            }).showToast(); 
// llamo a mi libreria ^
      
      })
    }   
}



// agregar paquetes funcion
function agregarPack(id){

    // creo una variable que me permita encontrar mis productos con facilidad
    let add = miViaje.find(item => item.id == id)

    // a esta variable le agrego condiciones
    if(add ){

        // le pido que lea la cantidad de mi item a agregado
        add.cantidad = add .cantidad + 1
        document.getElementById(`cantidad${add.id}`).innerHTML = `<p id=cantidad${add.id}> Cantidad : ${add.cantidad}</p>`
        
        // pido que actualice el voucher
        actualizarVoucher()
    }else{
        // creo una nueva variable y le asigno parametros
        let packAgregar = paquetes.find(elemento => elemento.id == id)

        // le pido que lo muestre
        miViaje.push(packAgregar)

        // que vuelva a actualizar
        actualizarVoucher()

        // creo el div
        let div = document.createElement('div')

        // le asigno una classname
        div.className = 'voucher'

        // le digo lo que tiene que mostrar (en este caso lo que agregué a mi carrito)
        div.innerHTML=`
        <p class="nombre">Paquete: <span class="resaltado">${packAgregar.nombre}</span></p>
        <p id=cantidad${packAgregar.id}>Cantidad: <span class="resaltado">${packAgregar.cantidad}</span></p>
        <p class="clase">Tipo: <span class="resaltado">${packAgregar.clase}</span></p>
        <p class="precio">Por el precio de <span class="resaltado">${packAgregar.precio}</span> dólares</p>
        <button id="eliminar${packAgregar.id}" class="btn-eliminar"><img src="./UI-kit/icons8-trash-30.png" alt=""></button>
        `
        // le digo que a servicios elegidos debe agregarle las condiciones de mi variable "div"
        serviciosElegidos.appendChild(div)
        console.log(packAgregar.nombre + ' ' +  packAgregar.precio + ' AGREGADO');

        // le pido que elimine mi producto del carrito creando una variable
        let trash = document.getElementById(`eliminar${packAgregar.id}`)

        // le digo que esta variable se va a ejecutar cuando YO se lo pida, a traves de una arrow function con "REMOVE"
        trash.addEventListener('click',() =>{
            console.log(packAgregar.nombre + ' ELIMINADO');
            trash.parentElement.remove()

            // le pido a mi array que almacena los prodcutos que filtre el id del objeto que quiero eliminar
            miViaje=miViaje.filter(elemento=>elemento.id != packAgregar.id)

            // y porfa actualiza nuevamente el voucher
            actualizarVoucher()

            // que el cambio se almacene en mi storage si elimino un producto
            localStorage.setItem('voucher', JSON.stringify(miViaje))
        })
    }
    // que los agregados se almacenen en mi storage
    localStorage.setItem('voucher', JSON.stringify(miViaje))

}

// VUELOS
function mostrarVuelos(array){
    flies.innerHTML='';
    for (const Vuelo of array){
        let div = document.createElement('div');
        div.className = 'vuelo';
        div.innerHTML = `<div class="cards card col-12 column">

          <div>
           <small class="first">A VOLAR!</small>
           <figure><img src="./multimedia/${Vuelo.img}" alt="Image"> </figure>
           <h3>${Vuelo.aerolínea}</h3>
            <p>Para 1 persona</p>
            <div class="inner">
            <ul>
              <li><small>Clase ${Vuelo.clase}</small> <span><img src="./UI-kit/plane.png" alt="" class="icons">DISPONIBLE TODO EL AÑO</span> </li>
              <li><small>Precio en dólares: usd$</small> <span><img src="./UI-kit/icons8-sale-price-tag-30.png" alt="" class="icons">${Vuelo.precio}</span> </li>
            </ul>
            <button id="btnAgregar${Vuelo.id}" type="button" class="btn">LO QUIERO!</button>
            </div>
              </div>
        </div>`

      flies.appendChild(div);
      let btnAgregar = document.getElementById(`btnAgregar${Vuelo.id}`)
      btnAgregar.addEventListener('click',()=>{
          // LIBRERÍA TOASTIFY
        agregarVuelo(Vuelo.id)
        Toastify({

            text: "Agregaste a tu voucher vuelo " + Vuelo.aerolínea + ' ' + Vuelo.clase + " por el precio de " + Vuelo.precio + " dólares" ,
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "right", 
            stopOnFocus: false,
            style: {
              background: "linear-gradient(to right, #efba30,#740001 )",
            },
            onClick: function(){}
            
            }).showToast();


        })
    }   
}





// FUNCTION VUELOS
function agregarVuelo(id){
    // variable local
    let add = miViaje.find(item => item.id == id)

    if(add){
        add.cantidad = add .cantidad + 1
        document.getElementById(`cantidad${add.id}`).innerHTML = `<p id=cantidad${add.id}> Cantidad : ${add.cantidad}</p>`
        actualizarVoucher()
    }else{
        let vueloAgregar = vuelos.find(elemento => elemento.id == id);
        // agrego mi paquete
        miViaje.push(vueloAgregar)
        // llamo a actualizar mi voucher para que se sume a mi carrito
        actualizarVoucher()
        // creo mi voucher
        let div = document.createElement('div')
        div.className = 'voucher'
        console.log(vueloAgregar);
        div.innerHTML=`
        <p class="nombre">Aerolínea: <span class="resaltado">${vueloAgregar.aerolínea}</span></p>
        <p id=cantidad${vueloAgregar.id}>para <span class="resaltado">${vueloAgregar.cantidad} </span>persona</p>
        <p class="clase">En clase <span class="resaltado">${vueloAgregar.clase}</span></p>
        <p class="precio">Al precio de <span class="resaltado">${vueloAgregar.precio}</span> dólares</p>
        <button id="eliminar${vueloAgregar.id}" class="btn-eliminar"><img src="./UI-kit/icons8-trash-30.png" alt=""></button>

        `


        serviciosElegidos.appendChild(div)
        
        // le pido que elimine el producto seleccionado
        let trash = document.getElementById(`eliminar${vueloAgregar.id}`)
        // le digo a mi botón que al hacerle click ejecute la funcion "remove"
        trash.addEventListener('click',() =>{
            trash.parentElement.remove()
            miViaje=miViaje.filter(elemento=>elemento.id != vueloAgregar.id)
            // le pido que vuelva a actualizar el voucher con el producto eliminado
            actualizarVoucher()
            // le pido que se elimine de mi storage
            localStorage.setItem('vuelo', JSON.stringify(miViaje))
        })
    }
    // le vuelvo a solicitar que mantenga almacenado mi stock pero actualizado
    localStorage.setItem('voucher', JSON.stringify(miViaje))
}


// actualizar a medida que agrego productos

function actualizarVoucher(){
agregados.innerHTML = miViaje.reduce((acc,el) => acc + el.cantidad, 0)
precioTotal.innerText = miViaje.reduce((acc,el)=> acc + (el.precio * el.cantidad), 0)
}



// guardar en localStorage


function salvar (){
    let salvarStorage = JSON.parse(localStorage.getItem('voucher'))
    
    if(salvarStorage){
        salvarStorage.forEach(element =>{
            agregarPack(element.id)

        });
    }
}
salvar();