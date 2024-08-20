import { loadHTML } from './loadContent.js'; // Assurez-vous que le chemin est correct

const API_BASE_URL = 'http://localhost:3000'; // Remplacez par l'URL de votre API

function isLoggedIn() {
    return !!localStorage.getItem('token');
}

function setToken(token) {
    localStorage.setItem('token', token);
}

function clearToken() {
    localStorage.removeItem('token');
}

document.addEventListener('DOMContentLoaded', () => {
    if (isLoggedIn()) {
        loadHTML('view/game.html');
    } else {
        loadHTML('view/login.html');
    }
});

function handleLoginResponse(data) {
    if (data.token) {
        setToken(data.token);
        localStorage.setItem('userId', data.userId); // Stocke l'ID utilisateur
        loadHTML('view/game.html');
    } else {
        alert('Erreur de connexion');
    }
}

document.addEventListener('submit', function (event) {
    event.preventDefault();
    
    if (event.target.id === 'loginForm') {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(handleLoginResponse)
        .catch(error => console.error('Erreur:', error));
    }

    if (event.target.id === 'registerForm') {
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        fetch(`${API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert('Inscription réussie. Vous pouvez maintenant vous connecter.');
                loadHTML('view/login.html');
            } else {
                alert('Erreur d\'inscription');
            }
        })
        .catch(error => console.error('Erreur:', error));
    }
});


document.addEventListener('click', function (event) {
    if (event.target.id === 'showRegister') {
        event.preventDefault();
        loadHTML('view/register.html');
    }

    if (event.target.id === 'showLogin') {
        event.preventDefault();
        loadHTML('view/login.html');
    }
});


