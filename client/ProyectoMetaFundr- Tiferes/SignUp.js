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
        "Content-Type": "application/json",
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

  let usuario = {
    username: document.getElementById("UsernameId").value,
    first_name: document.getElementById("FirstNameId").value,
    last_name: document.getElementById("LastNameId").value,
    email: document.getElementById("EmailId").value,
    phone_number:
      document.getElementById("PhoneNumber1").value +
      " " +
      document.getElementById("PhoneNumber2").value,
    date_of_birth: FechaNac,
    password: document.getElementById("PasswordId").value,
  };

  try {
    const response = await fetch("http://localhost:8000/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    const data = await response.json();
    console.log("Usuario registrado:", data);

    if (!data.access_token) {
      throw new Error("Error en el registro");
    }

    localStorage.setItem("access_token", data.access_token);
    console.log("Access token guardado:", data.access_token);

    const userData = await obtenerIdUsuario();
    userId = userData.id;
    localStorage.setItem("user_id", userId);
    console.log("ID del usuario:", userId);
    window.location.href = "Main.html";
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
  }
}
