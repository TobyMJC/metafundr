function obtenerIdUsuario() {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
        console.error("No se encontró el token de acceso");
        return;
    }

    return fetch('http://localhost:8000/dj-rest-auth/user/', { 
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
        // Cambia el acceso al campo correcto del ID
        const userId = data.id || data.user?.id;
        if (userId) {
            console.log('ID del usuario:', userId);
            return { pk: userId }; // Devuelve el ID del usuario
        } else {
            throw new Error('No se pudo encontrar el ID del usuario');
        }
    })
    .catch(error => {
        console.error('Error al obtener el ID del usuario:', error);
    });
}
async function LoginUser() {
    let usuario = {
        email: document.getElementById("EmailInput").value,
        password: document.getElementById("PasswordInput").value
    };

    try {
        console.log("Datos del usuario que se enviarán:", usuario);

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
                    console.error('Error desconocido durante el inicio de sesión', errorData);
                }
            } else {
                throw new Error('Error en el servidor');
            }
            return;  
        }

        const data = await response.json();
        console.log('Usuario logueado:', data);

        // Guarda el access token
        localStorage.setItem("access_token", data.access);
        console.log("Access token guardado:", data.access);

        // Obtén los datos del usuario
        const userData = await obtenerIdUsuario();
        if (userData) {
            const userId = userData.pk;  
            localStorage.setItem("user_id", userId);
            console.log("ID del usuario:", userId);

            // Redirige al usuario
            window.location.href = "Publications.html";
        }

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error al conectar con el servidor. Inténtalo más tarde.');
    }
}
