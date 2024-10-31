 const urlParams = new URLSearchParams(window.location.search);
 const projectId = urlParams.get('id');

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