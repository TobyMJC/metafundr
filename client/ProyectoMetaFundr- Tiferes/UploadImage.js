const userId = localStorage.getItem("user_id");
const accessToken = localStorage.getItem("access_token");

document.addEventListener("DOMContentLoaded", cargarFotoActual);
document.getElementById("upload").addEventListener("change", mostrarVistaPrevia);

function cargarFotoActual() {
    // Realizar la petición GET para obtener la imagen actual del usuario
    fetch(`http://localhost:8000/api/users/${userId}/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then((data) => {
        const actualImage = document.querySelector(".im1 img");
        if (data.image) { // Suponiendo que la URL de la imagen está en la propiedad `image`
            actualImage.src = data.image;
        } else {
            console.log("El usuario no tiene una imagen establecida.");
        }
    })
    .catch((error) => {
        console.log("Error al cargar la imagen del usuario:", error);
    });
}

function mostrarVistaPrevia() {
    const fileInput = document.getElementById("upload");
    const file = fileInput.files[0];

    if (file) {
        const previewImage = document.querySelector(".img2");
        previewImage.src = URL.createObjectURL(file);
    }
}

function CambiarFoto() {
    console.log(userId);
    const fileInput = document.getElementById("upload");
    const file = fileInput.files[0];

    if (file) {
        const formData = new FormData();
        formData.append("image", file);

        fetch(`http://localhost:8000/api/users/${userId}/`, {
            method: "PUT",
            body: formData,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            // Actualizar "Foto actual" con la nueva imagen
            const actualImage = document.querySelector(".im1 img");
            actualImage.src = URL.createObjectURL(file);
        })
        .catch((error) => {
            console.log("Error al subir la imagen:", error);
        });
    } else {
        console.log("No se seleccionó ninguna imagen.");
    }
}
