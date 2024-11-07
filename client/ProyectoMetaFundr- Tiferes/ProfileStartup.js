const urlParams = new URLSearchParams(window.location.search);
const authorid = urlParams.get("authorid");
console.log("Author ID:", authorid);

let publications = [];

function RedirectToProfile() {
  window.location.href = `Profile.html?authorid=${authorid}`;
}

function displayProjects(filteredPublications) {
  const projectsContainer = document.querySelector(".projects");
  projectsContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar proyectos

  filteredPublications.forEach((publicacion) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("project");

    // Imagen del proyecto
    const newImg = document.createElement("img");
    newImg.src = publicacion.thumbnail;
    newImg.alt = publicacion.description;
    newDiv.appendChild(newImg);

    // Título del proyecto
    const newP = document.createElement("p");
    newP.textContent = publicacion.title;
    newDiv.appendChild(newP);

    // Agregar redirección al hacer clic en el proyecto
    newDiv.addEventListener("click", () => {
      window.location.href = `Project.html?id=${publicacion.id}`;
    });

    // Agregar el proyecto al contenedor principal
    projectsContainer.appendChild(newDiv);
  });
}

fetch(`http://localhost:8000/api/users/${authorid}`)
  .then((response) => response.json())
  .then((datos2) => {
    user = datos2;
    console.log(user);
    document.getElementById("NombreAutor").textContent = user.username;
  })
  .catch((error) => {
    console.error("Error al obtener las publicaciones:", error);
  });

fetch(`http://localhost:8000/api/posts/`)
  .then((response) => response.json())
  .then((datos2) => {
    publications = datos2;
    const filteredPublications = publications.filter(
      (publicacion) => publicacion.author.id == authorid
    );
    displayProjects(filteredPublications);
  })
  .catch((error) => {
    console.error("Error al obtener las publicaciones:", error);
  });
