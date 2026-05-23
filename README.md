   
<h1 align="center">🏡 WanderLoft</h1>

<p align="center">

 A full-stack travel community and listing platform where users can explore destinations, share experiences,create listings, post community content, and manage their travel memories.
</p>
---

## 🚀 Features

- 🔐 User Authentication (Signup / Login / Logout)
- 🔑 Secure Password Reset Flow
- 🏡 Create, Edit & Delete Travel Listings
- 🌍 Explore Destinations & Community Posts
- ❤️ Favorites System (Save Listings)
- 💬 Reviews & Ratings System
- 👤 User Profile Management
- 🧭 Community Sharing Section
- 📸 Image Upload Support
- 🔒 Secure Sessions with Passport.js
- ⚡ Flash Messages for Feedback
- 🗺️ Map integration for location-based listings

---

## 🛠️ Tech Stack

### Frontend
- EJS (Embedded JavaScript Templates)
- Bootstrap / Custom CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication
- Passport.js (Local Strategy)
- express-session

### Other Tools
- connect-mongo (Session Storage)
- method-override
- connect-flash
- dotenv

---

## 📁 Project StructureWanderLoft/
│
├── controllers/
├── models/
├── routes/
├── views/
├── public/
├── utils/
├── middleware/
├── app.js
└── .env

---

## 🌐 Deployment

Deployed using **Render** 🚀

Visit the live project here:  https://wanderloft-proj.onrender.com/listings

- Auto deploy from GitHub
- Environment variables managed via Render dashboard
- MongoDB Atlas used for database

---

## 🔐 Authentication Flow

1. User signs up → stored in MongoDB  
2. Passport handles authentication  
3. Session stored using `connect-mongo`  
4. Protected routes require login  
5. Flash messages show login status  

---

## ✨ Project Highlights

- Clean MVC architecture
- Secure authentication system
- Scalable folder structure
- Production-ready deployment setup
- Community + listing hybrid platform

---

## 👨‍💻 Author

**Neha Kumari**  
Full-stack Developer 🚀

---

## ⭐ Support

If you like this project:
- ⭐ Star it
- 🍴 Fork it
- 🚀 Improve it further

  
