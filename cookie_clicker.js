const GRANDMOTHER_BONUS = 2;
const FACTORY_BONUS = 1;
const GRANDMOTHER_INITIAL_PRICE = 10;
const FACTORY_INITIAL_PRICE = 50;

let gameState = {
    cookies: 0,
    totalCookiesGenerated: 0,
    grandmotherCount: 0,
    grandmotherPrice: GRANDMOTHER_INITIAL_PRICE,
    factoryCount: 0,
    factoryPrice: FACTORY_INITIAL_PRICE
};

const elements = {
    cookieCount: document.getElementById('cookieCount'),
    cookieBtn: document.getElementById('cookieBtn'),
    grandmotherCount: document.getElementById('grandmotherCount'),
    grandmotherPrice: document.getElementById('grandmotherPrice'),
    buyGrandmother: document.getElementById('buyGrandmother'),
    factoryCount: document.getElementById('factoryCount'),
    factoryPrice: document.getElementById('factoryPrice'),
    buyFactory: document.getElementById('buyFactory'),
    autoPerSecond: document.getElementById('autoPerSecond'),
    resetBtn: document.getElementById('resetBtn'),
    playerName: document.getElementById('playerName'),
    submitScoreBtn: document.getElementById('submitScoreBtn'),
    leaderboardBody: document.getElementById('leaderboardBody'),
    resetScoresBtn: document.getElementById('resetScoresBtn')
};

function loadGame() {
    const saved = localStorage.getItem('cookieClickerGame');
    if (saved) {
        gameState = JSON.parse(saved);
    }
    updateUI();
}

function saveGame() {
    localStorage.setItem('cookieClickerGame', JSON.stringify(gameState));
}

function loadLeaderboard() {
    const saved = localStorage.getItem('cookieClickerLeaderboard');
    return saved ? JSON.parse(saved) : [];
}

function saveLeaderboard(scores) {
    localStorage.setItem('cookieClickerLeaderboard', JSON.stringify(scores));
}

async function fetchLeaderboardFromServer() {
    try {
        const response = await fetch(SERVER_URL);
        if (response.ok) {
            const scores = await response.json();
            return scores;
        }
    } catch (err) {
        console.warn('Serveur non disponible, utilisation du cache local');
    }
    return loadLeaderboard();
}

async function submitScoreToServer(name, score) {
    try {
        const response = await fetch(SERVER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, score })
        });
        if (response.ok) {
            return await response.json();
        }
    } catch (err) {
        console.warn('Erreur lors de l\'envoi au serveur');
    }
    return null;
}

async function updateLeaderboardDisplay() {
    const scores = await fetchLeaderboardFromServer();
    const tbody = elements.leaderboardBody;
    tbody.innerHTML = '';

    if (scores.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; color: #999;">Aucun score enregistré</td></tr>';
        return;
    }

    scores.forEach((score, index) => {
        const row = document.createElement('tr');
        let medal = '';
        if (index === 0) medal = '🥇';
        else if (index === 1) medal = '🥈';
        else if (index === 2) medal = '🥉';
        else medal = '#' + (index + 1);

        row.innerHTML = `
            <td><span class="medal">${medal}</span></td>
            <td>${score.name}</td>
            <td>${score.score}</td>
        `;
        tbody.appendChild(row);
    });
}

async function resetLeaderboard() {
    if (confirm('Êtes-vous sûr de vouloir effacer tout le classement ? Cette action est irréversible.')) {
        try {
            await fetch(SERVER_URL, { method: 'DELETE' });
            updateLeaderboardDisplay();
            alert('Classement réinitialisé ! 🔄');
        } catch (err) {
            alert('Erreur lors de la réinitialisation du classement.');
        }
    }
}

function updateUI() {
    elements.cookieCount.textContent = gameState.cookies;
    elements.grandmotherCount.textContent = gameState.grandmotherCount;
    elements.grandmotherPrice.textContent = gameState.grandmotherPrice;
    elements.factoryCount.textContent = gameState.factoryCount;
    elements.factoryPrice.textContent = gameState.factoryPrice;
    
    const autoPerSecond = gameState.factoryCount * FACTORY_BONUS;
    elements.autoPerSecond.textContent = autoPerSecond;

    // Activer/désactiver les boutons d'achat
    elements.buyGrandmother.disabled = gameState.cookies < gameState.grandmotherPrice;
    elements.buyFactory.disabled = gameState.cookies < gameState.factoryPrice;
}

function clickCookie() {
    const clickBonus = 1 + gameState.grandmotherCount * GRANDMOTHER_BONUS;
    gameState.cookies += clickBonus;
    gameState.totalCookiesGenerated += clickBonus;
    updateUI();
    saveGame();
}

function buyGrandmother() {
    if (gameState.cookies >= gameState.grandmotherPrice) {
        gameState.cookies -= gameState.grandmotherPrice;
        gameState.grandmotherCount++;
        gameState.grandmotherPrice = Math.floor(gameState.grandmotherPrice * 1.15);
        updateUI();
        saveGame();
    }
}

function buyFactory() {
    if (gameState.cookies >= gameState.factoryPrice) {
        gameState.cookies -= gameState.factoryPrice;
        gameState.factoryCount++;
        gameState.factoryPrice = Math.floor(gameState.factoryPrice * 1.15);
        updateUI();
        saveGame();
    }
}

function resetGame() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser le jeu ? Tous vos progrès seront perdus.')) {
        gameState = {
            cookies: 0,
            totalCookiesGenerated: 0,
            grandmotherCount: 0,
            grandmotherPrice: GRANDMOTHER_INITIAL_PRICE,
            factoryCount: 0,
            factoryPrice: FACTORY_INITIAL_PRICE
        };
        localStorage.removeItem('cookieClickerGame');
        updateUI();
    }
}

async function submitScore() {
    const playerName = elements.playerName.value.trim();
    if (!playerName) {
        alert('Veuillez entrer votre pseudo');
        return;
    }

    // Essayer d'envoyer au serveur
    const result = await submitScoreToServer(playerName, gameState.totalCookiesGenerated);
    
    if (result) {
        if (result.updated) {
            alert(result.message.includes('updated') ? 'Score mis à jour ! 🎉' : 'Score soumis ! 🎉');
        } else {
            alert('Votre nouveau score n\'est pas meilleur que l\'ancien.');
        }
    } else {
        alert('Erreur lors de l\'envoi du score. Vérifiez que le serveur est lancé.');
        return;
    }

    elements.playerName.value = '';
    updateLeaderboardDisplay();
}

function autoGenerate() {
    const autoPerSecond = gameState.factoryCount * FACTORY_BONUS;
    if (autoPerSecond > 0) {
        gameState.cookies += autoPerSecond;
        gameState.totalCookiesGenerated += autoPerSecond;
        updateUI();
        saveGame();
    }
}

// Event listeners
elements.cookieBtn.addEventListener('click', clickCookie);
elements.buyGrandmother.addEventListener('click', buyGrandmother);
elements.buyFactory.addEventListener('click', buyFactory);
elements.resetBtn.addEventListener('click', resetGame);
elements.submitScoreBtn.addEventListener('click', submitScore);
elements.resetScoresBtn.addEventListener('click', resetLeaderboard);

// Auto-generation toutes les secondes
setInterval(autoGenerate, 1000);

// Charger le jeu au démarrage
loadGame();
updateLeaderboardDisplay();
