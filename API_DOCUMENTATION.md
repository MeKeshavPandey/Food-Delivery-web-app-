# API Documentation

Base URL: `http://localhost:5000`

## Authentication

### Register User
**POST** `/api/user/register`

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f5a1b2c3d4e5f6g7h8i9j0",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Login User
**POST** `/api/user/login`

Request Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f5a1b2c3d4e5f6g7h8i9j0",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Get User Profile (Protected)
**GET** `/api/user/profile`

Headers:
```
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "user": {
    "_id": "64f5a1b2c3d4e5f6g7h8i9j0",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "cartData": {}
  }
}
```

## Food Items

### Get All Food Items
**GET** `/api/food/list`

Query Parameters:
- `category` (optional): Filter by category
- `search` (optional): Search by name

Response:
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "64f5a1b2c3d4e5f6g7h8i9j0",
      "name": "Caesar Salad",
      "description": "Fresh romaine lettuce with Caesar dressing",
      "price": 250,
      "image": "image-1234567890.jpg",
      "category": "Salad",
      "available": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Single Food Item
**GET** `/api/food/:id`

Response:
```json
{
  "success": true,
  "data": {
    "_id": "64f5a1b2c3d4e5f6g7h8i9j0",
    "name": "Caesar Salad",
    "description": "Fresh romaine lettuce with Caesar dressing",
    "price": 250,
    "image": "image-1234567890.jpg",
    "category": "Salad",
    "available": true
  }
}
```

### Add Food Item
**POST** `/api/food/add`

Content-Type: `multipart/form-data`

Form Data:
- `name`: Product name
- `description`: Product description
- `price`: Product price (number)
- `category`: Category (Salad, Rolls, Deserts, etc.)
- `image`: Image file

Response:
```json
{
  "success": true,
  "message": "Food item added successfully",
  "data": {
    "_id": "64f5a1b2c3d4e5f6g7h8i9j0",
    "name": "Caesar Salad",
    "price": 250,
    "category": "Salad"
  }
}
```

### Update Food Item
**PUT** `/api/food/:id`

Content-Type: `multipart/form-data`

Form Data (all optional):
- `name`: Updated name
- `description`: Updated description
- `price`: Updated price
- `category`: Updated category
- `available`: Boolean
- `image`: New image file

Response:
```json
{
  "success": true,
  "message": "Food item updated successfully",
  "data": {
    "_id": "64f5a1b2c3d4e5f6g7h8i9j0",
    "name": "Updated Name"
  }
}
```

### Delete Food Item
**DELETE** `/api/food/:id`

Response:
```json
{
  "success": true,
  "message": "Food item deleted successfully"
}
```

## Cart Management

All cart endpoints require authentication.

### Add to Cart (Protected)
**POST** `/api/cart/add`

Headers:
```
Authorization: Bearer <token>
```

Request Body:
```json
{
  "itemId": "64f5a1b2c3d4e5f6g7h8i9j0"
}
```

Response:
```json
{
  "success": true,
  "message": "Item added to cart",
  "cartData": {
    "64f5a1b2c3d4e5f6g7h8i9j0": 2
  }
}
```

### Remove from Cart (Protected)
**POST** `/api/cart/remove`

Headers:
```
Authorization: Bearer <token>
```

Request Body:
```json
{
  "itemId": "64f5a1b2c3d4e5f6g7h8i9j0"
}
```

Response:
```json
{
  "success": true,
  "message": "Item removed from cart",
  "cartData": {
    "64f5a1b2c3d4e5f6g7h8i9j0": 1
  }
}
```

### Get Cart (Protected)
**GET** `/api/cart/get`

Headers:
```
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "cartData": {
    "64f5a1b2c3d4e5f6g7h8i9j0": 2,
    "64f5a1b2c3d4e5f6g7h8i9j1": 1
  }
}
```

### Clear Cart (Protected)
**DELETE** `/api/cart/clear`

Headers:
```
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "message": "Cart cleared successfully"
}
```

## Orders

### Place Order (Protected)
**POST** `/api/order/place`

Headers:
```
Authorization: Bearer <token>
```

Request Body:
```json
{
  "items": [
    {
      "foodId": "64f5a1b2c3d4e5f6g7h8i9j0",
      "name": "Caesar Salad",
      "price": 250,
      "quantity": 2,
      "image": "image-1234567890.jpg"
    }
  ],
  "amount": 540,
  "address": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipcode": "400001",
    "country": "India",
    "phone": "9876543210"
  }
}
```

Response:
```json
{
  "success": true,
  "message": "Order placed successfully",
  "orderId": "64f5a1b2c3d4e5f6g7h8i9j0"
}
```

### Verify Order (Protected)
**POST** `/api/order/verify`

Headers:
```
Authorization: Bearer <token>
```

Request Body:
```json
{
  "orderId": "64f5a1b2c3d4e5f6g7h8i9j0"
}
```

Response:
```json
{
  "success": true,
  "message": "Order confirmed",
  "order": {
    "_id": "64f5a1b2c3d4e5f6g7h8i9j0",
    "status": "Food Processing",
    "amount": 540
  }
}
```

### Get User Orders (Protected)
**GET** `/api/order/user`

Headers:
```
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "count": 5,
  "orders": [
    {
      "_id": "64f5a1b2c3d4e5f6g7h8i9j0",
      "userId": "64f5a1b2c3d4e5f6g7h8i9j1",
      "items": [...],
      "amount": 540,
      "address": {...},
      "status": "Food Processing",
      "payment": false,
      "paymentMethod": "Cash on Delivery",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get All Orders (Admin)
**GET** `/api/order/list`

Response:
```json
{
  "success": true,
  "count": 50,
  "orders": [
    {
      "_id": "64f5a1b2c3d4e5f6g7h8i9j0",
      "userId": {
        "name": "John Doe",
        "email": "john@example.com"
      },
      "items": [...],
      "amount": 540,
      "status": "Delivered",
      "payment": true
    }
  ]
}
```

### Update Order Status (Admin)
**POST** `/api/order/status`

Request Body:
```json
{
  "orderId": "64f5a1b2c3d4e5f6g7h8i9j0",
  "status": "Out for Delivery"
}
```

Valid statuses:
- `Food Processing`
- `Out for Delivery`
- `Delivered`

Response:
```json
{
  "success": true,
  "message": "Order status updated successfully",
  "order": {
    "_id": "64f5a1b2c3d4e5f6g7h8i9j0",
    "status": "Out for Delivery",
    "payment": false
  }
}
```

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

### Authentication Error (401)
```json
{
  "success": false,
  "message": "Not authorized. Please login."
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## File Upload

Images are uploaded to `/uploads` directory and accessible at:
```
http://localhost:5000/uploads/<filename>
```

Restrictions:
- Max file size: 5MB
- Allowed formats: jpeg, jpg, png, gif, webp

## Categories

Available food categories:
- Salad
- Rolls
- Deserts
- Sandwich
- Cake
- Pure Veg
- Pasta
- Noodles
