function iniciarApp () {
    
    const selectCategorias = document.querySelector("#categorias");

    selectCategorias.addEventListener("change", seleccionarCategoria)
    const resultado = document.querySelector(".recetas__resultado");

    const div = document.getElementById("verRecetas__resultado--Hidden");
    const opacidad = document.getElementById("opacidad");



//Funcion para obtener el listado de Categorias
    obtenerCategorias();

    function obtenerCategorias () {
        const url = "https://www.themealdb.com/api/json/v1/1/categories.php"
        fetch(url) 
        .then (respuesta => {
            return respuesta.json()})
        .then (resultado => mostrarCategorias(resultado.categories))
            
    }

    //Funcion para mostrar las categorias en el select como options
    function mostrarCategorias(categorias = []) {
        categorias.forEach (categoria => {
            const {strCategory} = categoria;

            const option = document.createElement("option");
            option.value = strCategory;
            option.textContent = strCategory;
            selectCategorias.appendChild(option);
        })
    }

    //Funcion para seleccionar el valor de la categoría elegida y poder consultar la API mediante ella
    function seleccionarCategoria (e) {
      const categoria = e.target.value;
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;
      fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado =>mostrarRecetas(resultado.meals))
    }

    //Funcion para mostrar recetas en el HTML
    function mostrarRecetas( recetas = []) {

        //Limpia resultados previos si pulsas de nuevo
        limpiarHTML(resultado);

        recetas.forEach (receta => {
            const {idMeal, strMeal, strMealThumb} = receta;

            const recetaContenedor = document.createElement("div");
            recetaContenedor.classList.add("recetaContenedor");

            const recetaImagen = document.createElement("img");
            recetaImagen.classList.add("imagenesReceta");
            recetaImagen.alt = `Imagen de la receta ${strMeal}`;
            recetaImagen.src = strMealThumb;

            const recetaHeading = document.createElement("H3");
            recetaHeading.classList.add("tituloRecetas"); 
            recetaHeading.textContent = strMeal;

            const recetaButton = document.createElement ("Button");
            recetaButton.classList.add("receta__btn");
            recetaButton.textContent = "Ver Receta";
            //Cada vez que presionamos boton de ver receta hacemos referencia a funcion que nos trae detalles de esta
            recetaButton.onclick = function() {
                div.classList.remove("verRecetas__resultado--Hidden");
                div.classList.add("verRecetas__resultado");
                opacidad.classList.add("opacidad")
                seleccionarReceta(idMeal)
            }
    

            recetaContenedor.appendChild(recetaImagen);
            recetaContenedor.appendChild(recetaHeading);
            recetaContenedor.appendChild(recetaButton);
            resultado.appendChild(recetaContenedor);

        })
    }

    //Funcion para relacionar la receta sobre la que pinchamos en ver receta con la Api para ver sus datos
    function seleccionarReceta (id) {
        const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarReceta(resultado.meals[0]))
    }

    function mostrarReceta(receta) {
        limpiarHTML(div);
        const {idMeal, strInstructions, strMeal, strMealThumb} = receta

        const verRecetaContenedor = document.createElement("div");
        verRecetaContenedor.classList.add("verRecetaContenedor");

        const verRecetaTitulo = document.createElement("h3");
            verRecetaTitulo.classList.add("verReceta__Titulo")
            verRecetaTitulo.textContent = strMeal;

        const verRecetaImagen = document.createElement("img");
            verRecetaImagen.classList.add("verImagenesReceta");
            verRecetaImagen.alt = `Imagen de la receta ${strMeal}`;
            verRecetaImagen.src = strMealThumb;

        const verRecetaDescripcion = document.createElement("p");
            verRecetaDescripcion.classList.add("verReceta__Descripcion")
            verRecetaDescripcion.textContent = strInstructions;

        const verRecetaButton = document.createElement ("Button");
            verRecetaButton.classList.add("verReceta__btn");
            verRecetaButton.textContent = "Cerrar";

           
            verRecetaButton.onclick = function() {
                div.classList.remove("verRecetas__resultado");
                div.classList.add("verRecetas__resultado--Hidden");
                opacidad.classList.remove("opacidad");
            }


            verRecetaContenedor.appendChild(verRecetaTitulo);
            verRecetaContenedor.appendChild(verRecetaImagen);
            verRecetaContenedor.appendChild(verRecetaDescripcion);
            verRecetaContenedor.appendChild(verRecetaButton);
            div.appendChild(verRecetaContenedor)
    }

    function limpiarHTML(selector) {
        while(selector.firstChild) {
            selector.removeChild(selector.firstChild);
        }
    }
}

document.addEventListener("DOMContentLoaded" , iniciarApp)