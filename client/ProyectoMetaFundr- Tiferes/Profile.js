const urlParams = new URLSearchParams(window.location.search);
const authorid = urlParams.get("authorid");
console.log("Author ID:", authorid);

function RedirectToPS() {
  window.location.href = `ProfileStartup.html?authorid=${authorid}`;
}

fetch(`http://localhost:8000/api/users/${authorid}`)
  .then((response) => response.json())
  .then((datos2) => {
    user = datos2;
    console.log(user);
    const profileImage = document.getElementById("profileImage");
    profileImage.src = user.image;
    document.getElementById("NombrePerfil").textContent = user.username;
    document.getElementById("FechaNac").textContent =
      "Fecha de nacimineto: " + user.date_of_birth;
    document.getElementById("Nombre").textContent =
      "nombre: " + user.first_name;
    document.getElementById("Apellido").textContent =
      "Apellido: " + user.last_name;
    document.getElementById("NumeroTel").textContent =
      "Numero de telefono: " + user.phone_number;
    document.getElementById("Mail").textContent = "Mail: " + user.email;
  })
  .catch((error) => {
    console.error("Error al obtener las publicaciones:", error);
  });
