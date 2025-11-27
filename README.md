# 🍪 Cookie Clicker Multiplayer

Un jeu Cookie Clicker en ligne avec un leaderboard partagé !

## 🎮 Jouer en ligne

- **Site:** https://votre-app.vercel.app/
- **API:** Serverless Functions (intégrées)

## 🚀 Déployer sur Vercel (Tout-en-un)

### 1. Cloner le repository GitHub
```bash
git clone https://github.com/VotreUsername/cookie-clicker.git
cd cookie-clicker
```

### 2. Installer Vercel CLI
```bash
npm install -g vercel
```

### 3. Déployer sur Vercel
```bash
vercel
```

Vercel va demander :
- `Set up and deploy "~/cookie-clicker"?` → **y**
- `Which scope do you want to deploy to?` → **Your Account**
- `Link to existing project?` → **n**
- `What's your project's name?` → **cookie-clicker**
- `In which directory is your code located?` → **.** (current)

### 4. ✅ Déploiement terminé !
Le site est maintenant en ligne à `https://cookie-clicker-xxxxx.vercel.app/`

## 📚 Structure du projet

```
cookie-clicker/
├── public/                      # Frontend statique
│   ├── cookie_clicker.html      # Page HTML
│   ├── cookie_clicker.js        # Logique du jeu
│   └── config.js                # Config d'URL
├── api/
│   └── scores.js                # API Serverless (backend)
├── vercel.json                  # Config Vercel
├── package.json                 # Dépendances
└── README.md                    # Cette page
```

## ⚙️ Fonctionnalités

- 🍪 Cliquer pour gagner des cookies
- 👵 Amélioration "Grand-mère" (+2/clic)
- ⚙️ Amélioration "Usine" (+1/sec)
- 📈 Prix augmentent après chaque achat
- 💾 Sauvegarde du jeu (localStorage)
- 📊 Leaderboard partagé en ligne
- 🔄 Un seul score par pseudo
- 🌍 Serveur Vercel (gratuit)

## 🔗 URL API

L'API est accessible à :
```
https://votre-app.vercel.app/api/scores
```

### Endpoints

- `GET /api/scores` — Récupère les 10 meilleurs scores
- `POST /api/scores` — Soumet un score
- `DELETE /api/scores` — Réinitialise le leaderboard

## 💾 Données

Les scores sont stockés dans un fichier `scores.json` sur Vercel (gratuit mais avec limitations).

Pour une vraie base de données, modifier `api/scores.js` pour utiliser MongoDB/PostgreSQL.

## 🛠️ Développement local

```bash
npm install
npm start
```

Accès: `http://localhost:3000/`

## 📄 Licence

MIT

## 👨‍💻 Auteur

Cookie Clicker Multiplayer 🚀

