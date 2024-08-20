import { gameMain } from './game.js'; // Assurez-vous que le chemin est correct

export function loadHTML(filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('content').innerHTML = html;
            console.log('Content loaded');
            initializeGame();
        })
        .catch(error => {
            console.error('Erreur lors du chargement du contenu:', error);
        });
}

function initializeGame() {
    console.log('Initializing game...');
    

    gameMain();
}

// Appel initial pour charger le contenu
