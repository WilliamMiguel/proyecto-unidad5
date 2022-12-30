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
const logoService = document.querySelector('#addLogo');
const changeName = document.querySelector('#changeName');
const changePrefix = document.querySelector('#changePrefix');
const changeLogo = document.querySelector('#changeLogo');
const deleteButton = document.querySelector('#deleteButton');
const showUsername = document.querySelector("#username")

showServices()

// Mostrar el nombre del usuario
showUsername.innerHTML = `<h6 style="margin:0;">Bienvenido, ${getUsername}</h6>`

// Mostrar la opción de servicios si es Admin
if (getAdmin === "false") {
    showServices.style.display = "none";
}

// Añadir nuevo servicio
formNewService.addEventListener('submit', (event) => {
    event.preventDefault();
    formServiceValidation();
});

// Valida la información para el nuevo servicio
let formServiceValidation = () => {
    if (nameService.value === "") {
        msg.classList.remove("d-none");
    }
    if (prefixService.value === "") {
        msg1.classList.remove("d-none");
    }
    if (logoService.value === "") {
        msg2.classList.remove("d-none");
    }

    if (nameService.value !== "" && prefixService.value !== "") {
        msg.classList.add("d-none");
        msg1.classList.add("d-none");
        msg2.classList.add("d-none");
        newService()
    }
};


// Función para crear el nuevo servicio
async function newService() {
    const logoService = document.querySelector('#addLogo');
    const logoImg = logoService.files[0];
    const reader = new FileReader();
    reader.onload = function() {
        const imageData = reader.result;
      }
    reader.readAsDataURL(logoImg);
    const response = await fetch("http://127.0.0.1:8000/pagos/services/", {
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
            logo: imageData
        })
    });

    if (response.status == 401) {
        window.location.replace("./login.html")
    }
}

// Muestra los servicios disponibles
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

// Para el botón modificar
formModifyService.addEventListener('submit', (event) => {
    event.preventDefault();
    formModifyValidation();
    // const id = options.value
    // modifyService(id)    
});

let formModifyValidation = () => {
    if (changeName.value === "") {
        cmsg.classList.remove("d-none");
    }
    if (changePrefix.value === "") {
        cmsg1.classList.remove("d-none");
    }
    if (changeLogo.value === "") {
        cmsg2.classList.remove("d-none");
    }

    if (changeName.value !== "" && changePrefix.value !== "") {
        cmsg.classList.add("d-none");
        cmsg1.classList.add("d-none");
        cmsg2.classList.add("d-none");
        const id = options.value
        modifyService(id)
    }
};

// Función para modificar un servicio
async function modifyService(id) {
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
    }).then((response) => {
        if (response.ok) {
            Swal.fire(
                '¡Actualizado!',
                'Los datos se actualizaron correctamente',
                'success'
            )
        }
        else {
            Swal.fire({
                icon: "error",
                title: 'Oops...',
                text: "¡Ocurrió un error!"
            })
        }
    })
}

// Eliminar un servicio
deleteButton.addEventListener('click', function (event) {
    event.preventDefault();
    const id = options.value
    deleteService(id)
})

// Función para borrar un servicio
async function deleteService(id) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
    }).then(async (result) => {
        if (result.isConfirmed) {
            await fetch(`http://127.0.0.1:8000/pagos/services/${id}/`, {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Authorization": `Bearer ${tokenAccess}`
                },
            }).then((response) => {
                if (response.ok) {
                    if (response.ok) {
                        Swal.fire(
                            "¡Eliminado!",
                            "El servicio se eliminó correctamente",
                            "success"
                        ).then((result) => {
                            if (result.isConfirmed) {
                                window.location.replace("./services.html");
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "¡Ocurrió un error!",
                        });
                    }
                }
            });
        }
    });
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

// Para obtener nuevos tokens
setInterval(verifyToken, 14 * 60 * 1000);
async function verifyToken() {
    const refreshToken = localStorage.getItem('tokenRefresh')
    const response = await fetch('http://127.0.0.1:8000/users/refresh-token/', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            refresh: refreshToken
        })
    });
    const data = await response.json();
    localStorage.setItem('tokenAccess', data.access);
    localStorage.setItem('tokenRefresh', data.refresh);
    const dateToken = new Date();
    localStorage.setItem('createdToken', dateToken);
    const expiredDateToken = new Date(dateToken.setMinutes(dateToken.getMinutes() + 10));
    localStorage.setItem('expiredToken', expiredDateToken);
}