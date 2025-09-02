# Laravel 12 + React Starter Kit

This project is built with **Laravel 12** and the **React starter kit**.  
Follow the steps below to set up and run the project locally.

---

## Requirements

Make sure you have the following installed:

- [PHP 8.3+](https://www.php.net/downloads.php)
- [Composer](https://getcomposer.org/)
- [Node.js 20+](https://nodejs.org/)
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [MySQL / PostgreSQL / SQLite] (your choice)

---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bonczbe/Ominimo.git
   cd Ominimo

2. **Copy .env.example to .env and edit database connection**
   
3. **Download Composer packages**
   ```bash
   composer i && npm i

4. **Api key generation**
   ```bash
   php artisan key:generate
   
5. **Migrate database and seed template datas**
   ```bash
   php artisan migrate --seed

6. **Run developement server**
   ```bash
   composer run dev
   
7. **Login with the following user:**
   email: test@example.com
   password: 123456
