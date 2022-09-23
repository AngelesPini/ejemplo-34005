(function(){
    let lista = document.getElementById("lista"),
    tareaInput = document.getElementById("tareaInput"),
    btnNuevaTarea = document.getElementById("btn-agregar")


    // funciones
    // agregar
    let agregarTarea = function(){
           let tarea = tareaInput.value, 
           nuevaTarea = document.createElement("li"),
            enlace = document.createElement("a"),
            contenido = document.createTextNode(tarea);
           console.log ("agregar")
           if(tarea == ""){
               tareaInput.setAttribute("placeholder" , "Agregar campo válido");
               tareaInput.className = "error";
               return false;
           }
           enlace.appendChild(contenido);

           enlace.setAttribute("href","#");

           nuevaTarea.appendChild(enlace);

           lista.appendChild(nuevaTarea);

           tareaInput.value = "";

        //    eliminar nuevo valor
        for (var i = 0; i <= lista.children.length -1; i++){
            lista.children[i].addEventListener("click", function(){
                this.parentNode.removeChild(this);
            });
        }
        };
        // reset input
    let comprobarInput = function(){ 
        tareaInput.className = "";
        tareaInput.setAttribute("placeholder" , "Agrega objetos a tu equipaje");
        console.log("comprobar")};

    // eliminar valor
    let eliminarTarea = function(){
        this.parentNode.removeChild(this);
         console.log("eliminar")};

    // eventos
    btnNuevaTarea.addEventListener("click", agregarTarea);
    tareaInput.addEventListener("click", comprobarInput);


    // borrar elementos
    for (var i = 0; i <= lista.children.length -1; i++){
        lista.children[i].addEventListener("click", eliminarTarea);
    }

}());



