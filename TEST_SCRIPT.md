# Test Script for Feedback Dashboard

## Automated Test Commands

Copy and paste these commands into your terminal to test the API endpoints:

```bash
#!/bin/bash

echo "🧪 Testing Feedback Dashboard API..."
echo ""

# Test 1: Health Check
echo "1. Testing Health Check..."
curl -s http://localhost:5000/health | jq '.'
echo ""

# Test 2: Submit Sample Feedbacks
echo "2. Submitting Sample Feedbacks..."

curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Johnson","email":"alice@example.com","rating":5,"message":"Excellent customer service! The team was very responsive and helpful."}' \
  -s | jq '.'

curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"Bob Smith","email":"bob@example.com","rating":3,"message":"Good experience overall, but there is room for improvement in response time."}' \
  -s | jq '.'

curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"Carol Davis","rating":1,"message":"Very disappointed with the service. Had to wait a long time and no resolution provided."}' \
  -s | jq '.'

curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"David Wilson","email":"david@example.com","rating":4,"message":"Great product quality and fast shipping. Would recommend to others."}' \
  -s | jq '.'

curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"Emma Brown","rating":2,"message":"Below average experience. The website was confusing and checkout process was problematic."}' \
  -s | jq '.'

echo ""

# Test 3: Get All Feedbacks
echo "3. Getting All Feedbacks..."
curl -s http://localhost:5000/api/feedback | jq '.'
echo ""

# Test 4: Get Statistics
echo "4. Getting Statistics..."
curl -s http://localhost:5000/api/feedback/stats | jq '.'
echo ""

# Test 5: Filter by Rating
echo "5. Filtering Feedbacks by Rating (4-5 stars)..."
curl -s "http://localhost:5000/api/feedback?rating=5,4" | jq '.'
echo ""

# Test 6: Test Validation (should fail)
echo "6. Testing Validation (empty name - should fail)..."
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"","email":"test@example.com","rating":5,"message":"Test message"}' \
  -s | jq '.'

echo ""
echo "✅ API Testing Complete!"
echo "📊 Visit http://localhost:5173 to test the frontend"
```

## Manual Testing Checklist

### Backend Testing
- [ ] Health check returns 200 OK
- [ ] Can submit feedback with valid data
- [ ] Validation rejects invalid data (empty name, invalid email, invalid rating)
- [ ] Can retrieve all feedbacks
- [ ] Can get statistics
- [ ] Rating filter works correctly
- [ ] Error handling returns proper HTTP status codes

### Frontend Testing
- [ ] Home page loads and navigation works
- [ ] Feedback form validates all fields correctly
- [ ] Success toast appears after submission
- [ ] Form clears after successful submission
- [ ] Dashboard shows analytics cards
- [ ] Feedback table displays all entries
- [ ] Rating filter works on frontend
- [ ] CSV export downloads file
- [ ] Loading states appear during API calls
- [ ] Error messages display when API fails

### Integration Testing
- [ ] Frontend successfully submits to backend
- [ ] Dashboard updates after new feedback submission
- [ ] Filters work between frontend and backend
- [ ] Real-time updates across components

## Expected Results

After running the test script, you should see:

1. **Health Check**: `{"success": true, "message": "Server is running"}`
2. **Successful Submissions**: `{"success": true, "message": "Feedback submitted successfully"}`
3. **Statistics**: Something like `{"success": true, "data": {"total": 5, "averageRating": 3.0, "positiveCount": 2, "negativeCount": 2}}`
4. **Filtered Results**: Only feedbacks with ratings 4 or 5
5. **Validation Error**: `{"success": false, "errors": [{"msg": "Name is required", "param": "name"}]}`

## Troubleshooting

If tests fail:

1. **Connection Refused**: Ensure backend is running on port 5000
2. **MongoDB Error**: Check MONGO_URI in .env file
3. **CORS Error**: Verify frontend proxy configuration
4. **Validation Errors**: Check request body format

Run these commands to debug:

```bash
# Check if backend is running
curl http://localhost:5000/health

# Check MongoDB connection
cd server && npm run dev

# Check frontend
cd client && npm run dev
```
