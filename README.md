# 🍪 Cookie Clicker Multiplayer

Un jeu Cookie Clicker en ligne avec un leaderboard partagé !

## 🎮 Jouer en ligne

- **Frontend:** https://yourusername.github.io/cookie-clicker/
- **API Server:** (à déployer sur Heroku/Railway)

## 📋 Installation locale

### Prérequis
- Node.js 14+
- Git

### 1. Cloner le repository
```bash
git clone https://github.com/yourusername/cookie-clicker.git
cd cookie-clicker
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer le serveur
```bash
npm start
```

### 4. Ouvrir le jeu
Allez à `http://localhost:3000/cookie_clicker.html`

## 🚀 Déployer sur GitHub Pages (Frontend)

### 1. Créer un repository GitHub
- Aller sur https://github.com/new
- Nom: `cookie-clicker`
- Public

### 2. Pousser le code
```bash
git init
git add .
git commit -m "Initial commit: Cookie Clicker game"
git branch -M main
git remote add origin https://github.com/yourusername/cookie-clicker.git
git push -u origin main
```

### 3. Activer GitHub Pages
- Settings → Pages
- Source: `main` branch
- Save
- Le site sera accessible à `https://yourusername.github.io/cookie-clicker/`

## 🔧 Déployer le serveur sur Heroku (Backend API)

### 1. Créer un compte Heroku
- https://www.heroku.com/

### 2. Installer Heroku CLI
```bash
npm install -g heroku
heroku login
```

### 3. Créer l'app Heroku
```bash
heroku create your-cookie-clicker-api
```

### 4. Déployer
```bash
git push heroku main
```

### 5. URL du serveur
L'API sera à `https://your-cookie-clicker-api.herokuapp.com/api/scores`

## ⚙️ Configurer l'URL du serveur

Dans `cookie_clicker.js`, remplacer :
```javascript
const SERVER_URL = 'http://localhost:3000/api/scores';
```

Par :
```javascript
const SERVER_URL = 'https://your-cookie-clicker-api.herokuapp.com/api/scores';
```

## 📊 Fonctionnalités

- 🍪 Cliquer pour gagner des cookies
- 👵 Amélioration "Grand-mère" (+2/clic)
- ⚙️ Amélioration "Usine" (+1/sec)
- 📈 Prix augmentent après chaque achat
- 💾 Sauvegarde du jeu
- 📊 Leaderboard partagé en ligne
- 🔄 Un seul score par pseudo

## 📝 Structure du projet

```
cookie-clicker/
├── alexi/
│   ├── cookie_clicker.html      # Page HTML
│   ├── cookie_clicker.js        # Logique du jeu
│   ├── script.js                # (Autre projet)
│   └── package.json             # Dépendances
├── server.js                    # Serveur backend
├── scores.json                  # Base de données scores
└── README.md                    # Cette page
```

## 🛠️ Technologies

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Node.js, Express
- **Hosting:** GitHub Pages (frontend) + Heroku (backend)
- **Storage:** JSON file

## 📄 Licence

MIT

## 👨‍💻 Auteur

Créé par vous ! 🚀
