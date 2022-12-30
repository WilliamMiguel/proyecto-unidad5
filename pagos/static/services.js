// import { verifyToken } from "./refreshToken";
// setInterval(verifyToken, 14 * 60 * 1000);

// Variables para identificar al usuario
const getEmail = localStorage.getItem('email')
const getAdmin = localStorage.getItem('is_staff')
const getUsername = localStorage.getItem('username')
const getUserID = localStorage.getItem('userID')
const tokenAccess = localStorage.getItem('tokenAccess');
const expiredToken = localStorage.getItem('expiredToken')

// Elementos del documento HTML a modificar
const formNewService = document.querySelector("#formNewService");
const formModifyService = document.querySelector("#formModifyService");
const nameService = document.querySelector('#addName');
const prefixService = document.querySelector('#addPrefix');
const changeName = document.querySelector('#changeName');
const changePrefix = document.querySelector('#changePrefix');
const deleteButton = document.querySelector('#deleteButton');
const showUsername = document.querySelector("#username")

// Mostrar el nombre del usuario
showUsername.innerHTML = `<h6 style="margin:0;">Bienvenido, ${getUsername}</h6>`

// Mostrar la opción de servicios si es Admin
if (getAdmin === "false"){
    showServices.style.display = "none";
}

formNewService.addEventListener('submit', (event) => {
    event.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (nameService.value === "") {
        //   msg.classList.remove("d-none");
    }
    if (prefixService.value === "") {
        //   msg1.classList.remove("d-none");
    }
    if (logoService.value === "") {
        //   msg1.classList.remove("d-none");
    }

    if (nameService.value !== "" && prefixService.value !== "") {
        //   msg.classList.add("d-none");
        //   msg1.classList.add("d-none");
        newService()
    }
};

async function newService() {
    const logoService = document.querySelector('#addLogo');
    const reader = new FileReader();
    reader.readAsDataURL(logoService.files[0]);
    reader.onload = function () {
        var imagenBase64 = reader.result;
        fetch("http://127.0.0.1:8000/pagos/services/", {
            method: "POST",
            mode: "cors",
            headers: {
                "Authorization": `Bearer ${tokenAccess}`,
                // "Content-Type": "multipart/form-data",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: nameService.value,
                prefix: prefixService.value,
                logo: imagenBase64
            })
        });

        if (response.status == 401) {
            window.location.replace("./login.html")
        }
    }
}

showServices()
async function showServices() {
    const response = await fetch("http://127.0.0.1:8000/pagos/services/", {
        mode: "cors",
        headers: {
            "Authorization": `Bearer ${tokenAccess}`
        }
    });
    if (response.status == 401) {
        window.location.replace("./login.html")
    }
    const data = await response.json();
    const services = data.results
    services.forEach(service => {
        const newOption = document.createElement('option');
        newOption.value = service.id;
        newOption.text = service.name;
        options.appendChild(newOption);
    })
}

formModifyService.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = options.value
    acceptData(id)
    // formValidation();
    // acceptData(id)
});

async function acceptData(id) {
    const data = {
        name: changeName.value,
        prefix: changePrefix.value,
        // logo: 
    }
    await fetch(`http://127.0.0.1:8000/pagos/services/${id}/`, {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenAccess}`
        },
        body: JSON.stringify(data)
    })
}

deleteButton.addEventListener('click', function(event){
    event.preventDefault();
    const id = options.value
    deleteService(id)
})

async function deleteService(id) {
    await fetch(`http://127.0.0.1:8000/pagos/services/${id}/`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Authorization": `Bearer ${tokenAccess}`
        },
    })
}

// Función para cerrar sesión
async function userLogout() {
    const response = await fetch("http://127.0.0.1:8000/users/logout/", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenAccess}`
        },
        body: JSON.stringify({
            id: parseInt(getUserID),
        })
    });
    localStorage.clear()
}