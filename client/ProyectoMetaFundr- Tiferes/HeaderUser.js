function goBack() {
    window.location.href = 'main.html';
}

document.getElementById('logout-button').addEventListener('click', function() {
    localStorage.removeItem('access_token'); // Eliminar el token de acceso
    console.log('Usuario deslogueado'); // Mensaje de confirmación
    window.location.href = 'LogIn.html'; // Redirigir a la página de login
});
