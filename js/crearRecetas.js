const btnCrearReceta = document.querySelector(".btnCrearTarea");
const seccionAlerta = document.querySelector(".alerta");
const seccionTareas = document.querySelector(".tareas");
console.log(seccionTareas);

btnCrearReceta.addEventListener("click", function () {
    agregarTarea();
});

function agregarTarea() {
    const tituloTarea = document.querySelector(".tituloTarea");
    const tareaValue = tituloTarea.value;
    const descripcionTarea = document.querySelector(".descripcionTarea");
    const descripcionValue = descripcionTarea.value;
    if(tareaValue === "" || descripcionValue === "") {
        alertaCamposVacios();
    } else { 
        const contenedorTareas = document.createElement("div");
        contenedorTareas.classList.add("contenedorTareas");
    
        const tituloTareaMostrar = document.createElement("h3");
        tituloTareaMostrar.classList.add("tituloTareaMostrar")
        tituloTareaMostrar.textContent = tareaValue;
    
        const descripcionTareaMostrar = document.createElement("p");
        descripcionTareaMostrar.classList.add("descripcionTareaMostrar")
        descripcionTareaMostrar.textContent = descripcionValue;
    
    
    
        const btnEliminarTarea = document.createElement("button");
        btnEliminarTarea.classList.add("btnEliminarTarea");
        btnEliminarTarea.textContent = "Delete Recipe";
        //Le pasamos al boton funcion para eliminar esa tarea cuando le hacemos click
        btnEliminarTarea.addEventListener("click", function () {
            quitarTarea(contenedorTareas);
        });

    
        contenedorTareas.appendChild(tituloTareaMostrar);
        contenedorTareas.appendChild(descripcionTareaMostrar);
        contenedorTareas.appendChild(btnEliminarTarea);
        seccionTareas.appendChild(contenedorTareas);
        
    }
}

//Funcion para que aparezca alerta si no ha rellenado los campos
function alertaCamposVacios() {
    const alerta = document.createElement("h3");
    alerta.classList.add("textoAlerta");
    alerta.textContent = "You must fill all the fields";

    seccionAlerta.appendChild(alerta);
    //Temporizador para que se elimine alerta
    setTimeout(function() {
       alerta.remove(); 
    }, 3000);
}

//Funcion para eliminar Tarea
function quitarTarea(contenedorTareas) {
    contenedorTareas.remove();
}
