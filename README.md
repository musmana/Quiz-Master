🎯 Quiz Master – React + TypeScript Quiz Platform

A modern, full-featured quiz platform built using React, TypeScript, Vite, Tailwind CSS, Radix UI, and Recharts.

🌐 Live Demo
👉 https://musmana.github.io/Quiz-Master/

🚀 Features
👤 User Module

User Registration & Login (Mock)

Timed Quiz Attempt

Question Navigator

Flag Questions for Review

Quiz Result Page

Leaderboard

User Profile Page

Quiz History & Statistics

🛠 Admin Module

Admin Dashboard

Question Management (Add / Edit / Delete)

Quiz Management

Category Management

Analytics & Reports

Drop-off Analysis

User Performance Table

🧰 Tech Stack

⚛ React 18

🔷 TypeScript

⚡ Vite

🎨 Tailwind CSS

🧩 Radix UI

📊 Recharts

🧠 React Router DOM

🧱 class-variance-authority (CVA)

📁 Project Structure
src/
 ├── components/
 │   ├── layout/
 │   └── ui/
 ├── pages/
 │   ├── admin/
 │   └── user/
 ├── data/
 ├── lib/
 └── main.tsx

🛠 Installation

Clone the repository:

git clone https://github.com/musmana/Quiz-Master.git
cd Quiz-Master


Install dependencies:

npm install


Run development server:

npm run dev

🏗 Build for Production
npm run build


Preview production build:

npm run preview

🌍 Deploy to GitHub Pages

Make sure:

vite.config.ts
export default defineConfig({
  base: "/Quiz-Master/",
});

main.tsx
<BrowserRouter basename="/Quiz-Master">


Then deploy:

npm run deploy

📊 Reports & Analytics

Area Chart – User Activity Trends

Bar Chart – Drop-off Analysis

Category Performance

Most Attempted Quiz Tracking

User Performance Metrics

🔐 Authentication

Currently uses mock authentication (frontend simulation).
Can be integrated with:

Firebase

Supabase

Node + Express

JWT Authentication

🧠 Future Improvements

Backend Integration

API-based Dynamic Data

Role-based Route Protection

Pagination

PDF Export Reports

Dark Mode

Performance Optimization

👨‍💻 Author

Shiny Musmana J
Senior Web Developer
Tamil Nadu, India

GitHub: https://github.com/musmana

⭐ Support

If you like this project, give it a ⭐ on GitHub!