
const apiBaseUrl = 'http://localhost:3000'; // L'adresse de votre API

export async function loginUser(email, password) {
    try {
        const response = await fetch(`${apiBaseUrl}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            return data.token; // Retourne le token JWT
        } else {
            throw new Error(data.message || 'Erreur lors de la connexion');
        }
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        throw error;
    }
}

export async function registerUser(email, password) {
    try {
        const response = await fetch(`${apiBaseUrl}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Erreur lors de l\'inscription');
        }
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        throw error;
    }
}

export async function submitReactionTime(userId, time) {
    try {
        const response = await fetch(`${apiBaseUrl}/submit-reaction-time`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Token JWT pour l'authentification
            },
            body: JSON.stringify({ user_id: userId, time: time })
        });

        const data = await response.json();
        console.log('Temps de réaction soumis:', data);
    } catch (error) {
        console.error('Erreur lors de la soumission du temps de réaction:', error);
    }
}

export async function getBestTimes(userId) {
    try {
        const response = await fetch(`${apiBaseUrl}/get-reaction-times/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Token JWT pour l'authentification
            }
        });

        const data = await response.json();
        console.log('Meilleurs temps de réaction:', data);
    } catch (error) {
        console.error('Erreur lors de la récupération des meilleurs temps:', error);
    }
}
