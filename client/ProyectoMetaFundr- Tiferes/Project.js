 // Obtener el ID de la publicación desde la URL
 const urlParams = new URLSearchParams(window.location.search);
 const projectId = urlParams.get('id');

 // Hacer fetch de los detalles de la publicación usando el ID
 fetch(`http://localhost:8000/api/posts/${projectId}`)
     .then((response) => response.json())
     .then((publicacion) => {
         document.getElementById('project-title').textContent = publicacion.title;
         document.getElementById('project-description').textContent = publicacion.description;
         document.getElementById('project-author').textContent = publicacion.author.username; // Si "author" es un nombre
         document.getElementById('project-thumbnail').src = publicacion.thumbnail;
         document.getElementById('Foto.project').src = publicacion.thumbnail;

     })
     .catch((error) => {
         console.error('Error al cargar los detalles de la publicación:', error);
     });