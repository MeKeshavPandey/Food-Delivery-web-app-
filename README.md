# FoodExpress - Complete MERN Stack Food Delivery Application

A production-grade food delivery platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js), featuring a customer website, admin dashboard, and robust backend API.

## 🚀 Features

### Customer Website
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ Browse food items by category
- ✅ Search and filter functionality
- ✅ Shopping cart with quantity management
- ✅ User authentication (JWT-based)
- ✅ Secure checkout process
- ✅ Cash on Delivery payment
- ✅ Order history and tracking
- ✅ Real-time order status updates

### Admin Dashboard
- ✅ Add new food items with image upload
- ✅ List and manage all food items
- ✅ Delete food items
- ✅ View all customer orders
- ✅ Update order status (Food Processing → Out for Delivery → Delivered)
- ✅ Responsive admin interface
- ✅ Toast notifications for actions

### Backend API
- ✅ RESTful API architecture
- ✅ JWT authentication & authorization
- ✅ MongoDB with Mongoose ODM
- ✅ Image upload with Multer
- ✅ Input validation
- ✅ Error handling middleware
- ✅ CORS enabled
- ✅ Secure password hashing with bcrypt

## 📁 Project Structure

```
food-delivery-app/
├── backend/              # Node.js + Express API
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth & upload middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── uploads/         # Uploaded images
│   ├── server.js        # Entry point
│   └── package.json
│
├── frontend/            # Customer React app
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # Context API state
│   │   ├── pages/       # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
└── admin/               # Admin React app
    ├── src/
    │   ├── components/  # Admin components
    │   ├── pages/       # Admin pages
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── package.json
```

## 🛠️ Tech Stack

**Frontend (Customer & Admin):**
- React.js 18
- Vite (Build tool)
- Tailwind CSS
- React Router DOM
- Axios
- React Icons
- React Toastify (Admin)
- Context API (State Management)

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (Authentication)
- Bcrypt.js (Password hashing)
- Multer (File upload)
- Validator (Input validation)
- CORS

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher) installed
- MongoDB installed and running locally, OR MongoDB Atlas account
- npm or yarn package manager

## ⚙️ Installation & Setup

### 1. Clone or Extract the Project

```bash
cd food-delivery-app
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your configuration
# MONGODB_URI=mongodb://localhost:27017/food-delivery
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/food-delivery
# JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
# PORT=5000
# NODE_ENV=development
```

### 3. Frontend Setup

```bash
# Navigate to frontend folder (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file
# VITE_API_URL=http://localhost:5000
```

### 4. Admin Panel Setup

```bash
# Navigate to admin folder (from project root)
cd admin

# Install dependencies
npm install

# No .env needed - uses same backend API
```

## 🚀 Running the Application

### Option 1: Run Each Part Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Backend runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:3000
```

**Terminal 3 - Admin:**
```bash
cd admin
npm run dev
# Admin runs on http://localhost:3001
```

### Option 2: Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

**Admin:**
```bash
cd admin
npm run build
npm run preview
```

## 🌐 Access the Application

- **Customer Website:** http://localhost:3000
- **Admin Dashboard:** http://localhost:3001
- **Backend API:** http://localhost:5000

## 📱 API Endpoints

### Authentication
```
POST   /api/user/register      - Register new user
POST   /api/user/login         - Login user
GET    /api/user/profile       - Get user profile (protected)
```

### Food Items
```
GET    /api/food/list          - Get all food items
GET    /api/food/:id           - Get single food item
POST   /api/food/add           - Add food item (with image)
PUT    /api/food/:id           - Update food item
DELETE /api/food/:id           - Delete food item
```

### Cart
```
POST   /api/cart/add           - Add item to cart (protected)
POST   /api/cart/remove        - Remove item from cart (protected)
GET    /api/cart/get           - Get user cart (protected)
DELETE /api/cart/clear         - Clear cart (protected)
```

### Orders
```
POST   /api/order/place        - Place new order (protected)
POST   /api/order/verify       - Verify order (protected)
GET    /api/order/user         - Get user orders (protected)
GET    /api/order/list         - Get all orders (admin)
POST   /api/order/status       - Update order status (admin)
```

## 👥 Default Test Credentials

Create a new account through the customer website registration, or use these for testing:

**Customer:**
- Register through the website

**Admin:**
- Access admin panel directly at http://localhost:3001
- No login required (add authentication in production)

## 🎨 Features Walkthrough

### Customer Flow:
1. Browse food items on homepage
2. Filter by category
3. Add items to cart
4. Register/Login
5. Proceed to checkout
6. Fill delivery details
7. Place order (Cash on Delivery)
8. View order history
9. Track order status

### Admin Flow:
1. Add new food items with images
2. View all food items in inventory
3. Delete items
4. View all customer orders
5. Update order status
6. Mark orders as delivered

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes
- Input validation
- File upload restrictions
- CORS configuration
- Environment variables for secrets

## 🎯 Key Highlights

- **Production-Ready:** Error handling, validation, loading states
- **Modern UI:** Tailwind CSS with custom design system
- **Responsive:** Mobile-first design approach
- **State Management:** React Context API
- **Image Upload:** Multer with validation
- **Real-time Updates:** Order status tracking
- **Clean Code:** Modular structure, reusable components

## 📝 MongoDB Collections

### users
```javascript
{
  _id, name, email, password, role, cartData, timestamps
}
```

### foods
```javascript
{
  _id, name, description, price, image, category, available, timestamps
}
```

### orders
```javascript
{
  _id, userId, items[], amount, address{}, status, payment, paymentMethod, date, timestamps
}
```

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running: `mongod` or check MongoDB Atlas connection string
- Verify .env MONGODB_URI is correct

**Port Already in Use:**
- Change PORT in backend .env
- Change port in frontend/admin vite.config.js

**Images Not Loading:**
- Ensure backend server is running
- Check uploads folder exists
- Verify proxy configuration in vite.config.js

**CORS Error:**
- Ensure backend CORS is enabled
- Check API URL in frontend .env

## 📦 Dependencies

**Backend:**
- express, mongoose, bcryptjs, jsonwebtoken, dotenv, cors, multer, validator

**Frontend/Admin:**
- react, react-dom, react-router-dom, axios, react-icons, tailwindcss

## 🚀 Deployment Tips

**Backend:**
- Use MongoDB Atlas for database
- Deploy on Heroku, Render, or Railway
- Set environment variables on hosting platform
- Enable CORS for production domains

**Frontend/Admin:**
- Build: `npm run build`
- Deploy on Vercel, Netlify, or AWS S3
- Update VITE_API_URL to production backend URL

## 📄 License

This project is created for educational purposes.

## 🤝 Contributing

This is a complete starter template. Feel free to extend with:
- Payment gateway integration (Stripe, Razorpay)
- Real-time notifications
- Email confirmations
- Rating & review system
- Multiple restaurants
- Delivery tracking with maps

## 📧 Support

For issues or questions, check the code comments or create an issue.

---

**Built with ❤️ using MERN Stack**
