@echo off
setlocal enabledelayedexpansion
title GlobeCareer - Local Launcher
cd /d "%~dp0"

echo ===============================================================================
echo                   GlobeCareer - Local Preview Launcher
echo ===============================================================================
echo.

:: 1. Check for Node.js
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is required to run GlobeCareer locally, but was not found!
    echo.
    echo GlobeCareer is a modern full-featured web application that requires Node.js
    echo to serve application assets and run client-side routing properly.
    echo.
    echo -------------------------------------------------------------------------------
    echo How to fix this:
    echo   1. Download and install Node.js (LTS version recommended) from:
    echo      https://nodejs.org
    echo   2. Run the Node.js installer and accept default settings.
    echo   3. Once installed, double-click start.bat again.
    echo -------------------------------------------------------------------------------
    echo.
    
    :: Secondary Python check
    where python >nul 2>nul
    if %ERRORLEVEL% equ 0 (
        echo [INFO] Python is detected on your computer!
        echo You can preview the pre-built application right now using Python.
        echo.
        set /p RUN_PY="Would you like to start using Python local server? (Y/N): "
        if /i "!RUN_PY!"=="Y" (
            echo.
            echo Starting Python server...
            python start.py
            goto end
        )
    )
    
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

:: Display detected versions
for /f "tokens=*" %%i in ('node -v 2^>nul') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm -v 2^>nul') do set NPM_VERSION=%%i
echo [OK] Node.js !NODE_VERSION! detected.
echo [OK] npm !NPM_VERSION! detected.
echo.

:: 2. Check and install dependencies if node_modules is missing
if not exist "node_modules\" (
    echo [INFO] First-time setup: Installing required dependencies...
    echo (This only happens on the first run and takes about 1 minute.)
    echo.
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo.
        echo [ERROR] npm install encountered an error.
        echo Please ensure you have an active internet connection and try running 'npm install' in this folder.
        echo.
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed successfully.
    echo.
) else (
    echo [OK] Dependencies verified.
)

:: 3. Check and build production bundle if dist is missing
if not exist "dist\" (
    echo [INFO] Building production bundle...
    call npm run build
    if %ERRORLEVEL% neq 0 (
        echo.
        echo [WARN] Production build had a warning. Starting development server instead...
        echo.
        start http://localhost:3000
        call npm run dev -- --port 3000
        goto end
    )
    echo [OK] Production build ready.
    echo.
) else (
    echo [OK] Production build verified in dist/
)

:: 4. Start local preview server and open browser
echo ===============================================================================
echo   [STARTING] Launching GlobeCareer at http://localhost:3000 ...
echo   [INFO] Your default web browser will open automatically.
echo   [INFO] Keep this command prompt window open while using the website.
echo   [INFO] To stop the server, press Ctrl+C or close this window.
echo ===============================================================================
echo.

:: Open default browser after brief pause
start http://localhost:3000

:: Run Vite preview server
call npx vite preview --port 3000
if %ERRORLEVEL% neq 0 (
    echo.
    echo [INFO] Trying alternative port or development server...
    start http://localhost:5173
    call npm run dev
)

:end
echo.
echo Server stopped.
pause
