const userId = localStorage.getItem("user_id");
console.log("ID del usuario obtenido:", userId);

fetch("http://127.0.0.1:8000/api/posts/")
  .then((Response) => Response.json())
  .then((datos) => {
    console.log("datos fetch", datos);
    publicaciones = datos;
  })
  .catch((err) => {
    console.log(err);
  });

document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("Pre").src = e.target.result;
        document.getElementById("Pre").style.marginTop = "50px";
      };
      reader.readAsDataURL(file);
    }
  });

function subirPublicacion() {
  console.log(localStorage.getItem("access_token"));
  const nombre = document.getElementById("nombreId").value;
  const descripcion = document.getElementById("descripcionId").value;
  const fileInput = document.getElementById("fileInput");

  const file = fileInput.files[0];
  console.log(nombre + descripcion);
  console.log(userId);

  const formData = new FormData();
  formData.append("title", nombre);
  formData.append("description", descripcion);
  formData.append("goal", 0);
  formData.append("income", 0);
  formData.append("thumbnail", file);
  fetch("http://127.0.0.1:8000/api/posts/", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then((salida) => {
      console.log(salida);
      document.getElementById("nombreId").value = "";
      document.getElementById("descripcionId").value = "";
      document.getElementById("etiquetaId").value = "";
      document.getElementById("Pre").src = "imagenVacia.png";
    })
    .catch((err) => {
      console.log(err);
    });
}
