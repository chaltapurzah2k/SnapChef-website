@echo off
echo Initializing Git...
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/chaltapurzah2k/SnapChef-website.git

echo Deploying to GitHub Pages...
npm run deploy

echo Done! Pause to view results.
pause
