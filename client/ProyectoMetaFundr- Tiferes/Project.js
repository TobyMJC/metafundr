const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');
const userId = localStorage.getItem("user_id");

function PostComent() {
    const Contenido = document.getElementById("InputComent").value;
    const formData = new FormData();
    formData.append("content", Contenido);
    formData.append("post", projectId);
    console.log(formData);

    fetch('http://localhost:8000/api/comments/', { 
        method: 'POST',
        body: formData,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log("Comentario enviado:", data);
        const commentsContainer = document.getElementById('comments-container'); 
        const newP = document.createElement('p');
        newP.classList.add('comentario');
        newP.textContent = Contenido; 
        commentsContainer.appendChild(newP);
        document.getElementById("InputComent").value = ''; 
    })
    .catch((error) => {
        console.error("Error al enviar el comentario:", error);
    });
}

let comments = [];
fetch(`http://localhost:8000/api/comments/`)
    .then((response) => response.json())
    .then((datos2) => {
        console.log('datos fetch', datos2);
        comments = datos2;

        const commentsContainer = document.getElementById('comments-container'); 

        comments.forEach((comentario) => {
            if (comentario.post == projectId) {   
                const newP = document.createElement('p');
                newP.classList.add('comentario');
                newP.textContent = comentario.content;
                console.log(newP);
                commentsContainer.appendChild(newP);
            }
        });
    })
    .catch((error) => {
        console.error('Error al cargar los comentarios:', error);
    });

fetch(`http://localhost:8000/api/posts/${projectId}`)
    .then((response) => response.json())
    .then((publicacion) => {
        document.getElementById('project-title').textContent = publicacion.title;
        document.getElementById('project-description').textContent = publicacion.description;
        document.getElementById('project-author').textContent = publicacion.author.username; 
        document.getElementById('project-thumbnail').src = publicacion.thumbnail;
        document.querySelector('.left-panel').style.backgroundImage = `url(${publicacion.thumbnail})`;
    })
    .catch((error) => {
        console.error('Error al cargar los detalles de la publicación:', error);
    });
 
    /*fetch(`http://localhost:8000/api/posts/${projectId}`)
    .then((response) => response.json())
    .then((publicacion) => {
        if(userId == publicacion.author)*/