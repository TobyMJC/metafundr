 document.getElementById('redirect-icon').addEventListener('click', function() {
    window.location.href = 'Publications.html';
});

    document.getElementById('search-button').addEventListener('click', function() {
    window.location.href = 'MainBusqueda.html';
});
document.getElementById('redirect-user').addEventListener('click', function() {
    window.location.href = 'headerUser.html';
});

let publications = [];
fetch(`http://localhost:8000/api/posts/`)
    .then((response) => response.json())
    .then((datos2) => {
        console.log('datos fetch', datos2);
        publications = datos2;

        const projectsContainer = document.querySelector('.projects');

        publications.forEach((publicacion) => {
            const newDiv = document.createElement('div');
            newDiv.classList.add('project'); 
            const newImg = document.createElement('img');
            newImg.src = publicacion.thumbnail; 
            newImg.alt = publicacion.description; 
            newDiv.appendChild(newImg);
            const newP = document.createElement('p');
            newP.textContent = publicacion.title; 
            newDiv.appendChild(newP);
            projectsContainer.appendChild(newDiv);
        });
    })
    .catch((error) => {
        console.error('Error al obtener las publicaciones:', error);
    });

