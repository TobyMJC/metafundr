const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get("id");
const userId = localStorage.getItem("user_id");
let userid;
let authorid2;
const isLoggedIn = localStorage.getItem("access_token") !== null;

function redirectToProfile() {
  fetch(`http://localhost:8000/api/posts/${projectId}`)
    .then((response) => response.json())
    .then((publicacion) => {
      var authorid2 = publicacion.author.id;
      window.location.href = `ProfileStartup.html?authorid=${authorid2}`;
    })
    .catch((error) => console.error("Error:", error));
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
    userid = user.id;
  })
  .catch((error) => console.error("Error:", error));

fetch(`http://localhost:8000/api/posts/${projectId}`)
  .then((response) => response.json())
  .then((publicacion) => {
    let authoridd = publicacion.author.id;
    console.log("acaaaaa" + userId);

    document.getElementById("project-title").textContent = publicacion.title;
    document.getElementById("project-description").textContent =
      publicacion.description;
    document.getElementById("project-author").textContent =
      publicacion.author.username;
    document.getElementById("project-thumbnail").src = publicacion.author.image;
    document.querySelector(
      ".left-panel"
    ).style.backgroundImage = `url(${publicacion.thumbnail})`;

    if (userId == authoridd) {
      console.log("holaaaaaa");
      const deleteButton = document.createElement("button");
      deleteButton.id = "Delete-button";
      deleteButton.onclick = deletePost;
      deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

      const profileDiv = document.getElementById("Perfil");
      profileDiv.appendChild(deleteButton);
    } else {
      console.log("chauuuu");
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
      document.getElementById("InputComent").value = "";
      location.reload();
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
    console.log("id usuario", userId);

    const commentsContainer = document.getElementById("comments-container");
    fetch(`http://localhost:8000/api/posts/${projectId}`)
      .then((response) => response.json())
      .then((publicacion) => {
        let authorid = publicacion.author.id;

        comments.forEach((comentario) => {
          if (comentario.post == projectId) {
            const comment = document.createElement("div");
            const cajares = document.createElement("div");
            const newP = document.createElement("p");
            newP.classList.add("comentario");
            newP.textContent = comentario.content;

            comment.classList.add("comment");
            cajares.classList.add("cajares1");

            comment.appendChild(newP);

            // Solo agrega la "L" y la respuesta si el comentario tiene respuesta
            if (comentario.answer) {
              const newi = document.createElement("img");
              const newres = document.createElement("p");

              newi.classList.add("Lrespuesta");
              newi.src = "Lrespuesta.png";

              newres.classList.add("respuesta-texto");
              newres.textContent = comentario.answer;

              cajares.appendChild(newi); // Añade la "L" en cajares
              cajares.appendChild(newres); // Añade la respuesta a la derecha de la "L"

              comment.appendChild(cajares); // Añade cajares al comentario
            }

            if (!comentario.answer && userId == authorid && isLoggedIn) {
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
                inputRespuesta.placeholder =
                  "Respondiendo a " + newP.textContent;
                const respuesta = inputRespuesta.value;
                const idcomentario = comentario.id;
                console.log(inputRespuesta.value);
                const formDatares = new FormData();
                formDatares.append("answer", respuesta);

                fetch(`http://localhost:8000/api/comments/${idcomentario}/`, {
                  method: "PUT",
                  body: formDatares,
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      "access_token"
                    )}`,
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
            }

            commentsContainer.appendChild(comment);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((error) => {
    console.error("Error al cargar los comentarios:", error);
  });
//aa
