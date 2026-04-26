# 🚀 QUICK START GUIDE

Get your food delivery app running in 5 minutes!

## Prerequisites Check
```bash
node --version  # Should be v14+
npm --version   # Should be 6+
mongod --version # Should be installed
```

## Step 1: Install MongoDB (if not installed)

### Windows:
Download from: https://www.mongodb.com/try/download/community

### Mac:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux:
```bash
sudo apt-get install mongodb
sudo systemctl start mongod
```

## Step 2: Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```
MONGODB_URI=mongodb://localhost:27017/food-delivery
JWT_SECRET=mysecretkey123
PORT=5000
```

Start backend:
```bash
npm run dev
```

✅ Backend should be running on http://localhost:5000

## Step 3: Setup Frontend

Open NEW terminal:
```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:5000
```

Start frontend:
```bash
npm run dev
```

✅ Frontend should be running on http://localhost:3000

## Step 4: Setup Admin Panel

Open NEW terminal:
```bash
cd admin
npm install
npm run dev
```

✅ Admin panel should be running on http://localhost:3001

## Step 5: Test the Application

### Customer Side (http://localhost:3000):
1. Click "Sign In" → Create account
2. Browse food items
3. Add items to cart
4. Proceed to checkout
5. Place order

### Admin Side (http://localhost:3001):
1. Click "Add Items"
2. Upload a food image
3. Fill details and submit
4. Go to "List Items" to see your food
5. Go to "Orders" to see customer orders
6. Update order status

## Common Issues & Fixes

### Port Already in Use:
```bash
# Kill process on port 5000
npx kill-port 5000

# Or change PORT in backend/.env
PORT=5001
```

### MongoDB Not Running:
```bash
# Start MongoDB
mongod

# Or on Mac:
brew services start mongodb-community
```

### Cannot Connect to Backend:
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in frontend/.env
- Clear browser cache

### Images Not Loading:
- Ensure backend/uploads folder exists
- Check backend server is running
- Verify image was uploaded successfully

## Testing Workflow

1. **Add Food Items (Admin)**
   - Go to http://localhost:3001/add
   - Add 5-10 food items with images

2. **Customer Orders**
   - Go to http://localhost:3000
   - Register new account
   - Add items to cart
   - Place order

3. **Manage Orders (Admin)**
   - Go to http://localhost:3001/orders
   - See the customer order
   - Update status to "Out for Delivery"
   - Then to "Delivered"

4. **Check Order History**
   - Customer can see order status at http://localhost:3000/orders

## Next Steps

- Add more food items through admin panel
- Test different categories
- Try multiple user accounts
- Test cart functionality
- Review order management

## Production Deployment

See main README.md for detailed deployment instructions.

---

Need help? Check the main README.md or the code comments!
