// Déterminer automatiquement l'URL du serveur API selon l'environnement
function getServerURL() {
    // Si en développement local
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:3000/api/scores';
    }
    
    // Si sur GitHub Pages, utiliser l'API en ligne
    // Remplacer par votre URL Heroku/Railway après le déploiement
    // Exemple: return 'https://your-app-name.herokuapp.com/api/scores';
    return 'https://cookie-clicker-api.herokuapp.com/api/scores';
}

const SERVER_URL = getServerURL();
