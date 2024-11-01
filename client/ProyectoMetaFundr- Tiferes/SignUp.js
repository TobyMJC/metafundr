async function obtenerIdUsuario() {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    console.error("No se encontró el token de acceso");
    return;
  }

  try {
    const response = await fetch(" ", {
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
    first_name: "tobi4124214",
    last_name: "majic414124",
    email: document.getElementById("EmailId").value,
    phone_number: "123",
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

    if (!response.ok) {
      throw new Error("Error en el registro");
    }

    const data = await response.json();
    console.log("Usuario registrado:", data);

    localStorage.setItem("access_token", data.access_token);
    console.log("Access token guardado:", data.access_token);

    const userData = await obtenerIdUsuario();
    userId = userData.pk;
    localStorage.setItem("user_id", userId);
    console.log("ID del usuario:", userId);
    window.location.href = "Publications.html";
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
  }
}
