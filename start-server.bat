@echo off
echo Starting AUR Blockchain Explorer...
echo.
echo Clearing cache...
if exist .next rmdir /s /q .next
echo.
echo Starting development server...
echo The server will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
npm run dev
pause


