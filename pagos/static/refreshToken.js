export async function verifyToken() {
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
    const expiredDateToken = new Date(dateToken.setSeconds(dateToken.getSeconds() + 10));
    localStorage.setItem('expiredToken', expiredDateToken);
}