 const urlParams = new URLSearchParams(window.location.search);
 const projectId = urlParams.get('id');
 const userId = localStorage.getItem("user_id");

function PostComent(){

 const Contenido = getElementById("InputComent").value    
 const formData = new FormData();    
 formData.append ("content",Contenido)   

 fetch('http://localhost:8000/api/comments'), {
     ethod: 'POST',
     body: formData, 
     headers: {
         "Authorization": `Bearer ${userId}` 
     }
 }}

 

 let Comments = [];
  fetch(`http://localhost:8000/api/comments/${projectId}`)
     .then((response) => response.json())
     .then((datos2) => {
         console.log('datos fetch', datos2);
         comentarios = datos2;

         const projectsContainer = document.querySelector('container');

         Comments.forEach((comentario) => {
            const newDiv = document.createElement('div');
            newDiv.classList.add('comentario');  
            const newP = document.createElement('p');
            newP.textContent = comentario.content;
            newDiv.appendChild(newP);
        
            // Añadir el evento de clic para redirigir a la página de detalles
            newDiv.addEventListener('click', () => {
                window.location.href = `Project.html?id=${publicacion.id}`;
            });
        
            projectsContainer.appendChild(newDiv);
        });

        })

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