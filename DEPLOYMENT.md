# Cookie Clicker - Deployment Guide

## Changes Made

The project has been restructured for Vercel deployment:

### File Reorganization
✅ Created `index.html` at root (main game interface)
✅ Created `cookie_clicker.js` at root (game logic)
✅ Created `config.js` at root (environment detection)
✅ Updated `vercel.json` (simplified routing)
✅ `api/scores.js` remains in api/ folder (Vercel serverless function)

### Current Structure
```
alexi/
├── index.html              (Main entry point)
├── cookie_clicker.js       (Game engine)
├── config.js              (Server URL config)
├── vercel.json            (Vercel config - simplified)
├── package.json           (Dependencies)
├── api/
│   └── scores.js          (Serverless function)
└── public/                (Old - can be deleted)
    ├── cookie_clicker.html
    ├── cookie_clicker.js
    └── config.js
```

## Deployment Steps

### Using Vercel CLI (Recommended)
```bash
# Install Node.js and npm first if not already installed
# Then install Vercel CLI:
npm install -g vercel

# Navigate to project
cd c:\Users\bento\Documents\csvegd\alexi

# Deploy
vercel --prod
```

### Using Git Push
```bash
# Initialize/update Git
git add .
git commit -m "Fix: restructure files for Vercel deployment"
git push

# Then deploy via Vercel dashboard
# https://vercel.com/dashboard
```

## How It Works

### Frontend
- `index.html` - Loads `config.js` and `cookie_clicker.js`
- `config.js` - Auto-detects environment (localhost vs production)
- `cookie_clicker.js` - Game engine with leaderboard API calls

### Backend (Vercel Serverless)
- `api/scores.js` - Handles GET/POST/DELETE requests for scores
- Stores scores in `scores.json`
- Enforces one-score-per-player (case-insensitive names)
- Returns top 10 scores

### Features
✅ Click cookie to earn cookies
✅ Buy improvements (grandmother +2/click, factory +1/sec)
✅ Submit scores to shared leaderboard
✅ View top 10 scores with medals
✅ Leaderboard persists across users/devices
✅ localStorage fallback if server unavailable

## Troubleshooting

### 404 Error
- **Old Issue**: Files were in `public/` folder
- **Fix Applied**: Moved files to root, simplified `vercel.json`

### Leaderboard Not Loading
- Check browser console for API errors
- Verify `/api/scores` endpoint is accessible
- Check that `scores.json` exists on server

### Scores Not Persisting
- Ensure `api/scores.js` has write permissions
- Check Vercel deployment logs
- LocalStorage backup activates if API fails

## Next Steps

To complete deployment:
1. Install Git and Node.js if not already installed
2. Run `vercel --prod` from the project directory
3. Test the game at your Vercel URL
4. Verify leaderboard saves scores correctly

