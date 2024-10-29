
    // Extraer el término de búsqueda de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    if (query) {
        fetch(`http://localhost:8000/api/posts/?title=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(datos => {
                const projectsContainer = document.querySelector('.columns');
                projectsContainer.innerHTML = ""; // Limpiar resultados previos

                datos.forEach(publicacion => {
                    const card = document.createElement('div');
                    card.classList.add('card');

                    const img = document.createElement('img');
                    img.src = publicacion.thumbnail;
                    img.alt = publicacion.title;
                    card.appendChild(img);

                    const cardInfo = document.createElement('div');
                    cardInfo.classList.add('card-info');

                    const title = document.createElement('p');
                    title.textContent = publicacion.title;
                    cardInfo.appendChild(title);

                    const span = document.createElement('span');
                    span.textContent = publicacion.accountType || "Cuenta Desconocida"; // Personalizar según tu backend
                    cardInfo.appendChild(span);

                    card.appendChild(cardInfo);
                    projectsContainer.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Error al cargar las publicaciones:', error);
            });
    }

