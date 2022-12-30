// import { verifyToken } from "./refreshToken";
// setInterval(verifyToken, 14 * 60 * 1000);


// Variables para identificar al usuario
const getEmail = localStorage.getItem('email')
const getAdmin = localStorage.getItem('is_staff')
const getUsername = localStorage.getItem('username')
const getUserID = localStorage.getItem('userID')
const tokenAccess = localStorage.getItem('tokenAccess');
const expiredToken = localStorage.getItem('expiredToken')

// Cantidad inicial de resultados para mostrar en la página
var resultsPerPage = 3;

// Elementos del documento HTML a modificar
const resultRowMade = document.querySelector("#resultRowMade");
const resultRowExpired = document.querySelector("#resultRowExpired");
const showMoreMade = document.querySelector("#showMoreMade")
const showMoreExpired = document.querySelector("#showMoreExpired")
const showServices = document.querySelector("#services")
const showUsername = document.querySelector("#username")

// Mostrar el nombre del usuario
showUsername.innerHTML = `<h6 style="margin:0;">Bienvenido, ${getUsername}</h6>`

// Mostrar la opción de servicios si es Admin
if (getAdmin === "false") {
    showServices.style.display = "none";
}

// Se ejecutan las funciones para obtener los pagos del usuario
userMadePayment(getEmail, resultsPerPage)
userExpiredPayment(getEmail, resultsPerPage)

async function userMadePayment(email, numResults) {
    const response = await fetch("http://127.0.0.1:8000/pagos/payment/", {
        mode: "cors",
        headers: {
            "Authorization": `Bearer ${tokenAccess}`
        }
    });
    if (response.status == 401) {
        window.location.replace("./login.html")
    }
    const data = await response.json();
    const users = data.results
    resultRowMade.innerHTML = "";
    const payUser = users.filter(item => item.email === email)
    for (var i = 0; i < numResults; i++) {
        var item = payUser[i];
        resultRowMade.innerHTML += payments(item);
    }
}

// Para mostrar más resultados de los pagos realizados
showMoreMade.addEventListener("click", function () {
    userMadePayment(getEmail, resultsPerPage + 3);
    resultsPerPage = resultsPerPage + 3;
});

async function userExpiredPayment(email, numResults) {
    const responseexpired = await fetch("http://127.0.0.1:8000/pagos/expired-payments/", {
        mode: "cors",
        headers: {
            "Authorization": `Bearer ${tokenAccess}`
        }
    });
    const dataexpired = await responseexpired.json();
    const usersExpired = dataexpired.results
    resultRowExpired.innerHTML = "";
    const payUserExpired = usersExpired.filter(item => item.email === email)
    for (var i = 0; i < numResults; i++) {
        var item = payUserExpired[i];
        resultRowExpired.innerHTML += expiredPayments(item);
    }
}

// Para mostrar más resultados de los pagos vencidos
showMoreExpired.addEventListener("click", function () {
    userExpiredPayment(getEmail, resultsPerPage + 3);
    resultsPerPage = resultsPerPage + 3;
});

// Crea los elementos para los pagos realizados
function payments(item) {
    return `
    <div class="col-12" id = "${item.id}">
        <div class="card mb-3">
            <div class="row" style="align-items:center;">
                <div class="col-md-2">
                    <img src="${item.logo}" style="height:50px;" alt="${item.servicio}">
                </div>
                <div class="col-md-4">
                    <div class="card-body">
                        <h5 class="card-title">${item.servicio}</h5>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card-body">
                        <p class="card-text">${item["fecha de pago"]}</p>
                    </div>
                </div>
                <div class="col-md-3">
                <div class="card-body">
                    <p class="card-text">${item.monto}</p>
                </div>
            </div>
            </div>
        </div>
    </div>
    `;
}

// Crea los elementos para los pagos vencidos
function expiredPayments(item) {
    return `
    <div class="col-12" id = "${item.id}">
        <div class="card mb-3">
            <div class="row" style="align-items:center;">
                <div class="col-md-2">
                    <img src="${item.logo}" style="height:50px;" alt="${item.service}">
                </div>
                <div class="col-md-4">
                    <div class="card-body">
                        <h5 class="card-title">${item.service}</h5>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="card-body">
                        <p class="card-text">${item["fecha de pago"]}</p>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="card-body">
                        <p class="card-text">${item.monto}</p>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="card-body">
                        <p class="card-text">${item["importe de la multa"]}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
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