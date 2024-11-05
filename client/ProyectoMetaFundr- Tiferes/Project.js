const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get("id");
const userId = localStorage.getItem("user_id");
let authormail;
let usermail;
const isLoggedIn = localStorage.getItem("access_token") !== null;

function redirectToProfile() {
  window.location.href = "ProfileStartup.html";
}

function redirectToMain() {
  window.location.href = "Main.html";
}

fetch(`http://localhost:8000/dj-rest-auth/user/`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((user) => {
    usermail = user.email;
    console.log(usermail);
  })
  .catch((error) => console.error("Error:", error));

fetch(`http://localhost:8000/api/posts/${projectId}`)
  .then((response) => response.json())
  .then((publicacion) => {
    authormail = publicacion.author.email;
    document.getElementById("project-title").textContent = publicacion.title;
    document.getElementById("project-description").textContent =
      publicacion.description;
    document.getElementById("project-author").textContent =
      publicacion.author.username;
    document.getElementById("project-thumbnail").src = publicacion.thumbnail;
    document.querySelector(
      ".left-panel"
    ).style.backgroundImage = `url(${publicacion.thumbnail})`;

    if (usermail === authormail) {
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
      deleteButton.id = "Delete-button";
      deleteButton.onclick = deletePost;

      const deleteButton2 = document.createElement("button");
      deleteButton2.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
      deleteButton2.id = "Delete-button2";
      deleteButton2.onclick = deletePost; // Asocia la función deletePost

      // Agrega el botón a la sección de perfil
      const profileDiv = document.querySelector(".profile");
      profileDiv.appendChild(deleteButton2);
      profileDiv.appendChild(deleteButton);
    }
  })
  .catch((error) => {
    console.error("Error al cargar los detalles de la publicación:", error);
  });

function deletePost() {
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
      redirectToMain();
    })
    .catch((error) => {
      console.error("Error al eliminar la publicación:", error);
      alert("No se pudo eliminar la publicación.");
    });
}

function PostComent() {
  const Contenido = document.getElementById("InputComent").value;
  const formData = new FormData();
  formData.append("content", Contenido);
  formData.append("post", projectId);
  console.log(formData);

  fetch("http://localhost:8000/api/comments/", {
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
    .then((data) => {
      console.log("Comentario enviado:", data);
      const commentsContainer = document.getElementById("comments-container");
      const newP = document.createElement("p");
      newP.classList.add("comentario");
      newP.textContent = Contenido;
      commentsContainer.appendChild(newP);
      location.reload();
      document.getElementById("InputComent").value = "";
    })
    .catch((error) => {
      console.error("Error al enviar el comentario:", error);
    });
}

let comments = [];
fetch(`http://localhost:8000/api/comments/`)
  .then((response) => response.json())
  .then((datos2) => {
    console.log("datos fetch", datos2);
    comments = datos2;
    console.log("el mail de usuario", usermail);
    console.log("mail author", authormail);
    console.log("id usuario", userId);

    const commentsContainer = document.getElementById("comments-container");

    comments.forEach((comentario) => {
      if (comentario.post == projectId) {
        console.log(comentario);
        const comment = document.createElement("div");
        const newP = document.createElement("p");
        const newres = document.createElement("p");
        newres.classList.add("comment");
        newres.textContent = comentario.answer;
        comment.classList.add("comment");
        newP.classList.add("comentario");
        newP.textContent = comentario.content;
        console.log(newP);
        comment.appendChild(newP);
        comment.appendChild(newres);
        if (!comentario.answer && usermail == authormail && isLoggedIn) {
          const inputRespuesta = document.createElement("input");
          inputRespuesta.placeholder = "Escribe tu respuesta aquí";
          const button = document.createElement("button");
          button.textContent = "Responder";
          button.id = "botonenviar2";

          inputRespuesta.id = "InputRespuesta";
          button.classList.add("responder-boton");
          comment.appendChild(inputRespuesta);
          comment.appendChild(button);

          button.addEventListener("click", () => {
            inputRespuesta.placeholder = "Respondiendo a " + newP.textContent;
            const respuesta = inputRespuesta.value;
            const idcomentario = comentario.id;
            console.log(inputRespuesta.value);
            const formDatares = new FormData();
            formDatares.append("answer", respuesta);

            fetch(`http://localhost:8000/api/comments/${idcomentario}/`, {
              method: "PUT",
              body: formDatares,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }).then((response) => {
              if (!response.ok) {
                throw new Error(
                  `Error ${response.status}: ${response.statusText}`
                );
              }
              location.reload();
              return response.json();
            });
          });
        } else {
          //Si hay respuesta
        }
        commentsContainer.appendChild(comment);
      }
    });
  })
  .catch((error) => {
    console.error("Error al cargar los comentarios:", error);
  });
