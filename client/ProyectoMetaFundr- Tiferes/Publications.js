const userId = localStorage.getItem("user_id");
console.log("ID del usuario obtenido:", userId);

fetch('http://127.0.0.1:8000/api/posts/')
.then((Response) => Response.json())
.then((datos) => {
    console.log('datos fetch', datos)
    publicaciones = datos;
}).catch(err => {
    console.log(err)
})



function subirPublicacion (){
    const nombre = document.getElementById("nombreId")
    const descripcion = document.getElementById("descripcionId")
    const etiqueta = document.getElementById("etiquetaId")
    const imagen = document.getElementById("imagenId")

    console.log(nombre.value + descripcion.value)

    const publicacion = {"title":nombre.value, "description":descripcion.value, "author_id": userId, "goal":0,"income":0}

    fetch('http://127.0.0.1:8000/api/posts/',
    {
        method:'POST',
        body: JSON.stringify(publicacion),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((response) => response.json())
    .then((salida)=> {
        console.log(salida)  
        nombre.innerHTML=""
    }).catch(err => {
        console.log(err)
    })
    nombre.value=""
    descripcion.value=""
    etiqueta.value=""
    imagen.value=""
}
