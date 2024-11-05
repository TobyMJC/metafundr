function goBack() {
  window.location.href = "main.html";
}

document.getElementById("logout-button").addEventListener("click", function () {
  localStorage.removeItem("access_token");
  console.log("Usuario deslogueado");
  window.location.href = "LogIn.html";
});

fetch(`http://localhost:8000/dj-rest-auth/user/`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((user) => {
    const name = user.first_name;
    const Surname = user.last_name;
    const number = user.phone_number;
    const usern = user.username;
    const dateofb = user.date_of_birth;

    document.getElementById("apellido").value = Surname;
    document.getElementById("fecha-nacimiento").value = dateofb;
    document.getElementById("Nombre").value = name;
    document.getElementById("PhoneNumber").value = number;
    document.getElementById("Nombre").value = name;
    document.getElementById("userInput").value = usern;
  })
  .catch((error) => console.error("Error:", error));
