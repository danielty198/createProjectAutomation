@echo off
REM Save the current directory
set "ORIGINAL_DIR=%cd%"

REM Navigate to the directory of this script
cd /d %~dp0

REM Start the Node.js server %* is for arguments passed to the batch file
echo Starting server.js...
node serverPages.js %*

REM Go back to the original directory
cd /d "%ORIGINAL_DIR%"
