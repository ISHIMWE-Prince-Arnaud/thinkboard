# ThinkBoard 📝

A full-stack note-taking application built with the MERN stack (MongoDB, Express, React, Node.js). ThinkBoard allows users to create, read, update, and delete notes with a secure authentication system.

## 🚀 Features

- **User Authentication**: Secure signup/login system with JWT tokens and bcrypt password hashing
- **CRUD Operations**: Create, read, update, and delete notes
- **User Profiles**: Each user has their own profile with a randomly generated avatar
- **Protected Routes**: Authentication middleware protects sensitive endpoints
- **Responsive UI**: Modern, beautiful interface built with React, TailwindCSS, and DaisyUI
- **Smooth Animations**: Enhanced UX with Framer Motion animations
- **Toast Notifications**: User feedback with React Hot Toast

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** - Server and API
- **MongoDB** & **Mongoose** - Database and ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **cookie-parser** - Cookie handling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP requests
- **TailwindCSS** - Styling framework
- **DaisyUI** - Component library
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Vite** - Build tool and dev server

## 📁 Project Structure

```
thinkboard/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── notes.controller.js # Notes CRUD logic
│   │   │   └── user.controller.js  # User auth logic
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js  # JWT authentication
│   │   ├── models/
│   │   │   ├── Note.js             # Note schema
│   │   │   └── User.js             # User schema
│   │   ├── routes/
│   │   │   ├── notes.route.js      # Notes routes
│   │   │   └── user.route.js       # User routes
│   │   └── utils/
│   │       └── generateToken.js    # JWT token generation
│   ├── index.js                    # Server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthContext.jsx     # Authentication context
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   ├── NoteCard.jsx        # Note display card
│   │   │   ├── NoteCardSkeleton.jsx # Loading skeleton
│   │   │   ├── NotesNotFound.jsx   # Empty state
│   │   │   └── protectedRoutes.jsx # Route protection
│   │   ├── pages/
│   │   │   ├── Create.jsx          # Create note page
│   │   │   ├── Home.jsx            # Notes dashboard
│   │   │   ├── LogIn.jsx           # Login page
│   │   │   ├── Note.jsx            # Note detail/edit page
│   │   │   ├── Profile.jsx         # User profile page
│   │   │   ├── SignUp.jsx          # Registration page
│   │   │   └── Welcome.jsx         # Landing page
│   │   ├── utils/
│   │   │   ├── axios.js            # Axios configuration
│   │   │   └── utils.js            # Utility functions
│   │   ├── App.jsx                 # Main app component
│   │   └── main.jsx                # App entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── package.json                    # Root package.json
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/ISHIMWE-Prince-Arnaud/thinkboard.git
cd thinkboard
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Run the Application

#### Development Mode
Run backend and frontend separately:

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173` and backend on `http://localhost:5001`

#### Production Mode
```bash
# From root directory
npm run build
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /user/signup` - Register a new user
- `POST /user/login` - Login user
- `POST /user/logout` - Logout user
- `GET /user/profile` - Get user profile (protected)
- `PUT /user/profile` - Update user profile (protected)

### Notes
- `GET /notes` - Get all user notes (protected)
- `GET /notes/:id` - Get a specific note (protected)
- `POST /notes/create` - Create a new note (protected)
- `PUT /notes/update/:id` - Update a note (protected)
- `DELETE /notes/delete/:id` - Delete a note (protected)

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored in HTTP-only cookies
- Protected routes require valid JWT token
- Passwords are hashed using bcryptjs before storage
- Middleware validates tokens on protected endpoints

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark/Light Mode**: Theme support via DaisyUI
- **Loading States**: Skeleton loaders for better UX
- **Smooth Animations**: Page transitions with Framer Motion
- **Toast Notifications**: Real-time feedback for user actions
- **Protected Routes**: Automatic redirect for unauthorized access

## 📝 Database Schema

### User Model
```javascript
{
  username: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  avatar: String (default: random avatar URL),
  timestamps: true
}
```

### Note Model
```javascript
{
  title: String (required),
  content: String (required),
  user: ObjectId (ref: User, required),
  timestamps: true
}
```

## 🚀 Deployment

The application is configured for production deployment:
- Backend serves the frontend static files in production
- CORS configured for development environment
- Environment-based configuration
- Production build script included

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**ISHIMWE Prince Arnaud**
- GitHub: [@ISHIMWE-Prince-Arnaud](https://github.com/ISHIMWE-Prince-Arnaud)

## 🙏 Acknowledgments

- Avatar images from [Avatar Iran](https://avatar.iran.liara.run/)
- Icons from [Lucide](https://lucide.dev/)
- UI components from [DaisyUI](https://daisyui.com/)

---

Made with ❤️ by ISHIMWE Prince Arnaud
