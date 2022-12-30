// Variables para identificar al usuario
const getEmail = localStorage.getItem('email')
const getAdmin = localStorage.getItem('is_staff')
const getUsername = localStorage.getItem('username')
const getUserID = localStorage.getItem('userID')
const tokenAccess = localStorage.getItem('tokenAccess');
const expiredToken = localStorage.getItem('expiredToken')

services()

// Elementos del documento HTML a modificar
const formNewPayment = document.querySelector("#formNewPayment");
const expiredDate = document.querySelector("#expiredDate");
const amount = document.querySelector("#amount");
const options = document.querySelector("#options");
const showServices = document.querySelector("#services")
const showUsername = document.querySelector("#username")
let msg = document.getElementById("msg");
let msg1 = document.getElementById("msg1");

// Mostrar el nombre del usuario
showUsername.innerHTML = `<h6 style="margin:0;">Bienvenido, ${getUsername}</h6>`

// Mostrar la opción de servicios si es Admin
if (getAdmin === "false") {
    showServices.style.display = "none";
}

// Manejador de eventos cuando se hace clicl en "Añadir pago"
formNewPayment.addEventListener('submit', (event) => {
    event.preventDefault();
    formValidation();
});

// Validación si los campos se encuentran vacíos
let formValidation = () => {
    if (expiredDate.value === "") {
        msg.classList.remove("d-none");
    }
    if (amount.value === "") {
        msg1.classList.remove("d-none");
    }
    if (expiredDate.value !== "" && amount.value !== "") {
        msg.classList.add("d-none");
        msg1.classList.add("d-none");
        newPayment()
    }
};

async function newPayment() {
    const response = await fetch("http://127.0.0.1:8000/pagos/payment/", {
        method: "POST",
        mode: "cors",
        headers: {
            "Authorization": `Bearer ${tokenAccess}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            amount: amount.value,
            user_id: getUserID,
            expirationdate: expiredDate.value,
            service_id: options.value
        })

    })

    if (response.status == 201) {
        Swal.fire(
            '¡Creado!',
            'Los datos se guardaron correctamente',
            'success'
        ).then((result) => {
            console.log(result)
            debugger
            if (result.isConfirmed) {
                window.location.href("./payments.html");
            }
        })
    }
    else {
        Swal.fire({
            icon: "error",
            title: 'Oops...',
            text: "¡Ingresaste un valor incorrecto!"
        })
    }

    if (response.status == 401) {
        window.location.replace("./login.html")
    }
};

async function services() {
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