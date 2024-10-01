function obtenerIdUsuario() {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
        console.error("No se encontró el token de acceso");
        return;
    }

    fetch('http://localhost:8000/dj-rest-auth/user/', { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}` 
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener el ID del usuario');
        }
        return response.json();
    })
    .then(data => {
        console.log('Datos del usuario:', data);
        console.log('ID del usuario:', data.id); 
    })
    .catch(error => {
        console.error('Error al obtener el ID del usuario:', error);
    });
}

export {obtenerIdUsuario};
