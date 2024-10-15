async function LoginUser() {
    let usuario = {
        username: document.getElementById("EmailInput").value,
        password: document.getElementById("PasswordInput").value
    };

    try {
        const response = await fetch('http://localhost:8000/dj-rest-auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (!response.ok) {
            if (response.status === 400) {
                const errorData = await response.json();
                if (errorData.detail) {
                    console.error('Error de autenticación:', errorData.detail);
                    alert('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
                } else {
                    console.error('Error desconocido durante el inicio de sesión');
                    alert('Error desconocido. Inténtalo nuevamente.');
                }
            } else {
                throw new Error('Error en el servidor');
            }
            return;  
        }

        const data = await response.json();
        console.log('Usuario logueado:', data);

        localStorage.setItem("access_token", data.access_token);
        console.log("Access token guardado:", data.access_token);

        const userData = await obtenerIdUsuario();
        const userId = userData.pk;  
        localStorage.setItem("user_id", userId);
        console.log("ID del usuario:", userId);

        window.location.href = "Publications.html";

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error al conectar con el servidor. Inténtalo más tarde.');
    }
}
