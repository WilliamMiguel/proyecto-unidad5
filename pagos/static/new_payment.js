const getEmail = localStorage.getItem('email')
const getUserID = localStorage.getItem('userID')
const getAdmin = localStorage.getItem('is_staff')
const getUsername = localStorage.getItem('username')

const formNewPayment = document.querySelector("#formNewPayment");
const expiredDate = document.querySelector("#expiredDate");
const amount = document.querySelector("#amount");
const options = document.querySelector("#options");
const showServices = document.querySelector("#services")
const showUsername = document.querySelector("#username")

showUsername.innerHTML = `<h6>Bienvenido, ${getUsername}</h6>`

if (getAdmin === "false"){
    showServices.style.display = "none";
}

formNewPayment.addEventListener('submit', (event) => {
    event.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (expiredDate.value === "") {
        //   msg.classList.remove("d-none");
        console.log("Ingresa una fecha")
    }
    if (amount.value === "") {
        //   msg1.classList.remove("d-none");
        console.log("Ingresa un valor")
    }
    if (expiredDate.value !== "" && amount.value !== "") {
        //   msg.classList.add("d-none");
        //   msg1.classList.add("d-none");
        //   acceptData();
        console.log("Listo")
        newPayment()
    }
};

async function newPayment() {
    const tokenAccess = localStorage.getItem('tokenAccess');
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
    if (response.status==401){
        window.location.replace("./login.html")
    }
}

async function services(){
    const tokenAccess = localStorage.getItem('tokenAccess');
    const response = await fetch("http://127.0.0.1:8000/pagos/services/", {
        headers: {
            "Authorization": `Bearer ${tokenAccess}`
        }
    });
    if (response.status==401){
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

services()