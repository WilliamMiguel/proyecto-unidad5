const tokenAccess = localStorage.getItem("tokenAccess") ?? [];
const tokenRefresh = localStorage.getItem("tokenRefresh") ?? [];

if (tokenAccess.length > 0){
    window.location.replace('./payments.html')
}

const formUser = document.querySelector("#formUser")
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const buttonLogin = document.querySelector("#buttonLogin");
let msg = document.getElementById("msg");

formUser.addEventListener('submit', (event) =>{
    const emailLogin = inputEmail.value;
    const passwordLogin = inputPassword.value;
    event.preventDefault();
    userLogin(emailLogin, passwordLogin);
});

async function userLogin(email, password){
    const response = await fetch("http://127.0.0.1:8000/users/login/", {
        method: "POST",
        mode:"cors",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password:password,
        })
    });

    if (response.ok){
        const data = await response.json();
        localStorage.setItem('tokenAccess', data.tokens["access"]);
        localStorage.setItem('tokenRefresh', data.tokens["refresh"]);
        const dateToken = new Date();
        localStorage.setItem('createdToken', dateToken);
        const expiredDateToken = new Date(dateToken.setSeconds(dateToken.getSeconds() + 10));
        localStorage.setItem('expiredToken', expiredDateToken);
        localStorage.setItem('email', data.email);

        const tokenAccess = localStorage.getItem('tokenAccess');
        const newresponse = await fetch("http://127.0.0.1:8000/users/", {
            mode: "cors",
            headers: {
                "Authorization": `Bearer ${tokenAccess}`
            }
        });
        const dataUser = await newresponse.json();
        const user = dataUser.results
        const username = user.find(item => item.email === email )
        localStorage.setItem('username', username.username);
        localStorage.setItem('userID', username.id);
        localStorage.setItem('is_staff', username.is_staff);
        window.location.replace('./payments.html');

    } else {
        msg.classList.remove("d-none");
    }
}
