const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const SCORES_FILE = path.join(__dirname, 'scores.json');

app.use(cors());
app.use(express.json());
app.use(express.static('alexi'));

// Initialiser le fichier scores.json s'il n'existe pas
if (!fs.existsSync(SCORES_FILE)) {
    fs.writeFileSync(SCORES_FILE, JSON.stringify([]));
}

// Charger les scores depuis le fichier
function loadScores() {
    try {
        const data = fs.readFileSync(SCORES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// Sauvegarder les scores dans le fichier
function saveScores(scores) {
    fs.writeFileSync(SCORES_FILE, JSON.stringify(scores, null, 2));
}

// GET /api/scores - Récupérer les 10 meilleurs scores
app.get('/api/scores', (req, res) => {
    const scores = loadScores();
    res.json(scores.sort((a, b) => b.score - a.score).slice(0, 10));
});

// POST /api/scores - Soumettre un nouveau score
app.post('/api/scores', (req, res) => {
    const { name, score } = req.body;

    if (!name || score === undefined) {
        return res.status(400).json({ error: 'Name and score are required' });
    }

    let scores = loadScores();
    const existingPlayerIndex = scores.findIndex(s => s.name.toLowerCase() === name.toLowerCase());

    if (existingPlayerIndex !== -1) {
        // Pseudo existe déjà
        if (score > scores[existingPlayerIndex].score) {
            scores[existingPlayerIndex].score = score;
            scores[existingPlayerIndex].timestamp = new Date().toISOString();
            saveScores(scores);
            res.json({ message: 'Score updated', updated: true });
        } else {
            res.json({ message: 'Score not better than existing', updated: false });
        }
    } else {
        // Nouveau pseudo
        scores.push({
            name,
            score,
            timestamp: new Date().toISOString()
        });
        saveScores(scores);
        res.json({ message: 'Score submitted', updated: true });
    }
});

// DELETE /api/scores - Réinitialiser le leaderboard (admin)
app.delete('/api/scores', (req, res) => {
    fs.writeFileSync(SCORES_FILE, JSON.stringify([]));
    res.json({ message: 'Leaderboard cleared' });
});

app.listen(PORT, () => {
    console.log(`🍪 Cookie Clicker Server running on http://localhost:${PORT}`);
    console.log(`📊 Leaderboard API: http://localhost:${PORT}/api/scores`);
});
