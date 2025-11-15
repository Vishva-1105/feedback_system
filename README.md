# Feedback Dashboard

A complete MERN stack application for collecting, managing, and analyzing customer feedback. Built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- **Submit Feedback**: Clean form with validation for name, email, rating (1-5), and message
- **Real-time Analytics**: Dashboard showing total feedbacks, average rating, positive/negative counts
- **Feedback Management**: View all feedbacks with sorting, filtering, and CSV export
- **Responsive Design**: Modern UI built with Tailwind CSS, works on all devices
- **Error Handling**: Comprehensive error handling and loading states
- **RESTful API**: Clean API endpoints with validation

## 📁 Project Structure

```
feedback-dashboard/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── AnalyticsCards.jsx
│   │   │   └── FeedbackTable.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── FeedbackForm.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/       # API services
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
├── server/                 # Node.js backend
│   ├── models/
│   │   └── Feedback.js     # Mongoose model
│   ├── routes/
│   │   └── feedback.js     # API routes
│   ├── server.js           # Main server file
│   ├── package.json
│   └── .env.example
├── README.md
└── .gitignore
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **Tailwind CSS** for modern, responsive styling
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Express Validator** for input validation
- **CORS** for cross-origin requests

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### 1. Clone and Setup

```bash
# Navigate to project directory
cd feedback-dashboard

# Setup Backend
cd server
npm install
cp .env.example .env  # Configure your environment variables

# Setup Frontend
cd ../client
npm install
```

### 2. Configure Environment Variables

Create `.env` file in the `server` directory:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/feedback_dashboard?retryWrites=true&w=majority
PORT=5000
```

**MongoDB Atlas Setup:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free account and cluster
3. Create a database user with password
4. Add your IP to whitelist (0.0.0.0/0 for development)
5. Get your connection string and replace credentials in MONGO_URI

### 3. Run the Application

```bash
# Start Backend (in server directory)
cd server
npm run dev

# Start Frontend (in client directory) - open new terminal
cd client
npm run dev
```

**Access URLs:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- API Health: http://localhost:5000/health

## 📡 API Endpoints

### Feedback Management
- `POST /api/feedback` - Submit new feedback
- `GET /api/feedback` - Get all feedbacks (supports `?rating` filter)
- `GET /api/feedback/stats` - Get feedback statistics

### Health Check
- `GET /health` - Server health status

### API Examples

```bash
# Submit feedback
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","rating":5,"message":"Great service!"}'

# Get all feedbacks
curl http://localhost:5000/api/feedback

# Get feedback statistics
curl http://localhost:5000/api/feedback/stats

# Filter by rating
curl "http://localhost:5000/api/feedback?rating=5,4"
```

## 🧪 Testing Guide

### Manual Testing Steps

1. **Submit Feedback Test**
   - Navigate to http://localhost:5173/feedback
   - Fill out the form with valid data
   - Submit and verify success message
   - Check that form clears after submission

2. **Form Validation Test**
   - Try submitting without required fields
   - Verify error messages appear
   - Test invalid email format
   - Verify rating selection is required

3. **Dashboard Analytics Test**
   - Navigate to http://localhost:5173/dashboard
   - Verify analytics cards show correct data
   - Check that stats update after new feedback submission

4. **Feedback Table Test**
   - Verify all submitted feedback appears in table
   - Test rating filter functionality
   - Test CSV export feature
   - Verify table sorting by created date

5. **API Error Handling Test**
   - Stop the backend server
   - Try using the frontend - verify error handling
   - Test with invalid data formats

### Sample Test Data

Use these curl commands to populate test data:

```bash
# Sample feedback 1
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Johnson","email":"alice@example.com","rating":5,"message":"Excellent customer service! The team was very responsive and helpful."}'

# Sample feedback 2
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"Bob Smith","email":"bob@example.com","rating":3,"message":"Good experience overall, but there is room for improvement in response time."}'

# Sample feedback 3
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"Carol Davis","rating":1,"message":"Very disappointed with the service. Had to wait a long time and no resolution provided."}'

# Sample feedback 4
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"David Wilson","email":"david@example.com","rating":4,"message":"Great product quality and fast shipping. Would recommend to others."}'

# Sample feedback 5
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"Emma Brown","rating":2,"message":"Below average experience. The website was confusing and checkout process was problematic."}'
```

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Build for Production**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Vercel**
   - Install Vercel CLI: `npm i -g vercel`
   - Run: `vercel` in client directory
   - Follow prompts to deploy

3. **Environment Variables**
   - Set `VITE_API_URL` to your deployed backend URL

### Backend Deployment (Render)

1. **Prepare for Deployment**
   - Add `"start": "node server.js"` to server/package.json
   - Ensure all dependencies are in package.json

2. **Deploy to Render**
   - Push code to GitHub
   - Connect GitHub account to Render
   - Create new Web Service
   - Set build command: `npm install`
   - Set start command: `npm start`

3. **Environment Variables**
   - Set `MONGO_URI` to your MongoDB Atlas connection string
   - Set `PORT=5000`

### Alternative: Railway Deployment

1. **Deploy to Railway**
   - Install Railway CLI: `npm install -g @railway/cli`
   - Login: `railway login`
   - Deploy: `railway up` in server directory

2. **Configure Environment**
   - Set MONGO_URI in Railway dashboard
   - Railway will automatically assign a PORT

## 🗄️ Database Schema

### Feedback Model

```javascript
{
  name: String (required, max 100 chars),
  email: String (optional, valid email),
  message: String (required, max 500 chars),
  rating: Number (required, 1-5),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 🔧 Development Notes

### Timebox Completion Plan (2 hours)

- **0-20m**: Scaffold project, install dependencies, configure environment
- **20-60m**: Implement backend routes, database connection, validation
- **60-100m**: Build frontend components, form, table, API integration
- **100-120m**: Add analytics cards, polish UI, write documentation

### Key Features Implemented

✅ **Core Features**
- Feedback submission with validation
- Real-time analytics dashboard
- Feedback table with sorting and filtering
- CSV export functionality
- Responsive design with Tailwind CSS

✅ **Bonus Features**
- Rating filter (single and multiple ratings)
- CSV export with proper formatting
- Loading states and error handling
- Toast notifications for success messages

✅ **Production Ready**
- Environment variable configuration
- Comprehensive error handling
- API documentation
- Deployment instructions

### Performance Considerations

- Frontend uses React hooks for efficient re-rendering
- API calls include timeout handling
- MongoDB indexes recommended for large datasets
- CSV export handled client-side to reduce server load

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify MONGO_URI in .env file
   - Check if IP is whitelisted in MongoDB Atlas
   - Ensure database user has correct permissions

2. **CORS Error**
   - Backend should be running on port 5000
   - Frontend proxy configured in vite.config.js

3. **Tailwind CSS Not Working**
   - Run `npm install` in client directory
   - Check that PostCSS config exists

4. **API Not Responding**
   - Check if backend server is running
   - Verify port 5000 is not in use
   - Check browser console for errors

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ using React, Node.js, Express, and MongoDB**
