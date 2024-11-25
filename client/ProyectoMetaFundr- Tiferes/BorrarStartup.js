document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("projectId");

  // Mostrar información de la publicación
  fetch(`http://localhost:8000/api/posts/${projectId}`)
    .then((response) => response.json())
    .then((publicacion) => {
      document.querySelector(".Startup").textContent = publicacion.title;
    })
    .catch((error) => console.error("Error al cargar el proyecto:", error));

  // Manejar el botón de borrar
  document.querySelector(".delete-button").addEventListener("click", () => {
    fetch(`http://localhost:8000/api/posts/${projectId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        window.location.href = "Main.html"; // Redirige al main
      })
      .catch((error) => {
        console.error("Error al eliminar la publicación:", error);
        alert("No se pudo eliminar la publicación.");
      });
  });
});
