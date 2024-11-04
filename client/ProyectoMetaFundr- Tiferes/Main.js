document.getElementById('redirect-icon').addEventListener('click', function() {
    window.location.href = 'Publications.html';
});

console.log(localStorage.getItem("access_token"));
// Evento del botón de usuario
document.getElementById('redirect-user').addEventListener('click', function() {
    const isLoggedIn = localStorage.getItem('access_token'); // Cambia esto según cómo determines el estado de login
    if (isLoggedIn) {
        window.location.href = 'headerUser.html';
    } else {
        window.location.href = 'LogIn.html';
    }
});


let publications = [];

function displayProjects(filteredPublications) {
    const projectsContainer = document.querySelector('.projects');
    projectsContainer.innerHTML = ''; 
    filteredPublications.forEach((publicacion) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('project');
        
        const newImg = document.createElement('img');
        newImg.src = publicacion.thumbnail;
        newImg.alt = publicacion.description;
        newDiv.appendChild(newImg);
        
        const newP = document.createElement('p');
        newP.textContent = publicacion.title;
        newDiv.appendChild(newP);
        
        newDiv.addEventListener('click', () => {
            window.location.href = `Project.html?id=${publicacion.id}`;
        });
        
        projectsContainer.appendChild(newDiv);
    });
}

function filterProjects() {
    const searchQuery = document.getElementById('buscador').value.toLowerCase();
    const filteredPublications = publications.filter(publicacion =>
        publicacion.title.toLowerCase().includes(searchQuery)
    );
    displayProjects(filteredPublications);
}

fetch(`http://localhost:8000/api/posts/`)
    .then((response) => response.json())
    .then((datos2) => {
        publications = datos2;
        displayProjects(publications); 
    })
    .catch((error) => {
        console.error('Error al obtener las publicaciones:', error);
    });

document.getElementById('search-button').addEventListener('click', function() {
    filterProjects(); 
});
