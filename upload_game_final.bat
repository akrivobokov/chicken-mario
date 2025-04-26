@echo off
cd /d C:\Users\Borox_info\Downloads\chicken_mario_fully_fixed

echo Инициализация Git...
git init

echo Переключение на ветку main...
git branch -M main

echo Привязка репозитория...
git remote remove origin
git remote add origin https://github.com/akrivobokov/chicken-mario.git

echo Добавление всех файлов...
git add .

echo Создание коммита...
git commit -m "Обновление Chicken Mario: полностью исправленная версия"

echo Загрузка на GitHub...
git push -f origin main

echo ==========================
echo Загрузка завершена успешно!
pause
