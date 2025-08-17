```markdown
# 🐦 Mini Twitter App (React + Supabase)

A minimal Twitter-like application built with **React**, **Vite**, and **Supabase**.  
Includes authentication, tweet creation, and infinite scrolling.

## 🚀 Features
- 🔐 User Sign Up / Sign In (Supabase Auth)
- 📝 Post tweets (only available to logged-in users)
- ♾ Infinite scroll – fetches 10 tweets at a time
- ♻️ Optional polling every 60 seconds to refresh data
- 💅 Clean and responsive styling

## 🧰 Tech Stack
- **Frontend:** React + Vite
- **Backend:** Supabase (PostgreSQL + Auth)
- **Auth:** Supabase Email/Password Authentication

## ⚙️ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
npm run dev
```

### 2. Set up Supabase
- Create a free project at [https://supabase.com](https://supabase.com)
- Create a table called `Tweets` with the following columns:

| Column     | Type      | Description                          |
|------------|-----------|--------------------------------------|
| `id`       | bigint    | Primary Key, Auto-increment          |
| `content`  | text      | The tweet content                    |
| `userName` | text      | The user's email                     |
| `date`     | timestamp | Date the tweet was posted (UTC)      |

- Enable **Email/Password Auth** in your Supabase project
- Copy your project URL and `anon` key and paste into `supabaseClient.js`:

## 🗂 Folder Structure
```
src/
│
├── App.jsx
├── main.jsx
├── index.css
│
├── context/
│   ├── AuthContext.jsx
│   └── TweetsContext.jsx
│
├── components/
│   ├── Navbar.jsx
│   ├── TweetForm.jsx
│   ├── TweetCard.jsx
│   ├── TweetList.jsx
│   ├── SignIn.jsx
│   └── SignUp.jsx
│
├── lib/
│   └── api.js
│
└── supabaseClient.js
```

## 📌 TODO / Extensions
- 🖼 Add user avatars
- ❤️ Like/favorite tweets
- 📬 Email verification step
- 🌐 Deploy on Vercel / Netlify

## 🧑‍💻 Author
Created by Haim Fellner Cohen.  
Feel free to fork or contribute!
```
