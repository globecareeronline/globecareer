#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "==============================================================================="
echo "                  GlobeCareer - Local Preview Launcher"
echo "==============================================================================="
echo ""

# 1. Check for Node.js
if ! command -v node >/dev/null 2>&1; then
    echo "[ERROR] Node.js is required to run GlobeCareer locally, but was not found!"
    echo ""
    echo "To install Node.js:"
    echo "  - macOS: brew install node   OR download from https://nodejs.org"
    echo "  - Linux: sudo apt install nodejs npm  OR visit https://nodejs.org"
    echo ""
    if command -v python3 >/dev/null 2>&1 || command -v python >/dev/null 2>&1; then
        echo "[INFO] Python detected! Starting Python local preview server..."
        python3 start.py 2>/dev/null || python start.py
        exit 0
    fi
    exit 1
fi

NODE_VER=$(node -v)
NPM_VER=$(npm -v)
echo "[OK] Node.js $NODE_VER detected."
echo "[OK] npm $NPM_VER detected."
echo ""

# 2. Check dependencies
if [ ! -d "node_modules" ]; then
    echo "[INFO] Installing dependencies (first-time setup)..."
    npm install
    echo "[OK] Dependencies installed."
    echo ""
else
    echo "[OK] Dependencies verified."
fi

# 3. Check dist
if [ ! -d "dist" ]; then
    echo "[INFO] Building production bundle..."
    npm run build
    echo "[OK] Build complete."
    echo ""
fi

# 4. Start preview server
echo "==============================================================================="
echo "  [STARTING] Launching GlobeCareer at http://localhost:3000 ..."
echo "  [INFO] Press Ctrl+C in this terminal to stop the server."
echo "==============================================================================="
echo ""

# Open browser
if command -v open >/dev/null 2>&1; then
    open "http://localhost:3000" &
elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "http://localhost:3000" &
fi

npx vite preview --port 3000
