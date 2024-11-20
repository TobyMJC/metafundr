async function obtenerIdUsuario() {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    console.error("No se encontró el token de acceso");
    return;
  }

  try {
    const response = await fetch("http://localhost:8000/dj-rest-auth/user/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener el ID del usuario");
    }

    const data = await response.json();
    console.log("Datos del usuario:", data);
    return data;
  } catch (error) {
    console.error("Error al obtener el ID del usuario:", error);
  }
}

async function RegistarUser() {
  const FechaNac =
    document.getElementById("AnoId").value +
    "-" +
    document.getElementById("MesID").value +
    "-" +
    document.getElementById("DiaId").value;

  // Crear FormData para enviar los datos
  let formData = new FormData();

  formData.append("username", document.getElementById("UsernameId").value);
  formData.append("first_name", document.getElementById("FirstNameId").value);
  formData.append("last_name", document.getElementById("LastNameId").value);
  formData.append("email", document.getElementById("EmailId").value);
  formData.append(
    "phone_number",
    document.getElementById("PhoneNumber1").value +
      " " +
      document.getElementById("PhoneNumber2").value
  );
  formData.append("date_of_birth", FechaNac);
  formData.append("password", document.getElementById("PasswordId").value);

  // Adjuntar archivo del input file
  const file = fileInput.files[0];
  if (file) {
    console.log("Archivo seleccionado:", file);
    formData.append("image", file);
  } else {
    console.warn("No se seleccionó ningún archivo.");
  }

  try {
    const response = await fetch("http://localhost:8000/register/", {
      method: "POST",
      body: formData, // Usar FormData
    });

    const data = await response.json();
    console.log("Usuario registrado:", data);

    if (!data.access_token) {
      throw new Error("Error en el registro");
    }

    localStorage.setItem("access_token", data.access_token);
    console.log("Access token guardado:", data.access_token);

    const userData = await obtenerIdUsuario();
    const userId = userData.id;
    localStorage.setItem("user_id", userId);
    console.log("ID del usuario:", userId);

    // Redirigir si es necesario
    window.location.href = "Main.html";
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
  }
}
