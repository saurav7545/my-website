# 🔌 Backend Connection Guide

## ⚠️ Current Issue:
**Backend is offline** - That's why photo upload is showing "Uploading..." and then failing.

---

## 🚀 Solution - Start Your Django Backend:

### Option 1: Backend Already Deployed on Render.com
If your backend is deployed at: `https://backend1-2agm.onrender.com`

**Check if it's online**:
```bash
curl https://backend1-2agm.onrender.com/api/photos/
```

**If it's sleeping** (Render free tier):
- Just visit the URL in browser
- Wait 30-60 seconds for it to wake up
- Then try uploading again

---

### Option 2: Run Backend Locally

#### Step 1: Navigate to Backend Folder
```bash
cd path/to/your/django/backend
```

#### Step 2: Activate Virtual Environment
**Windows (PowerShell)**:
```bash
.\venv\Scripts\Activate.ps1
```

**Windows (CMD)**:
```bash
venv\Scripts\activate.bat
```

**Mac/Linux**:
```bash
source venv/bin/activate
```

#### Step 3: Run Django Server
```bash
python manage.py runserver
```

Backend should start at: `http://localhost:8000`

#### Step 4: Update Frontend to Use Local Backend
Create/Update `.env` file in your frontend folder:
```
REACT_APP_API_URL=http://localhost:8000/api
```

#### Step 5: Restart Frontend
```bash
# Stop current server (Ctrl+C)
npm start
```

---

## 🔧 Quick Backend Check:

### Test if Backend is Running:
```bash
# For deployed backend
curl https://backend1-2agm.onrender.com/api/photos/

# For local backend
curl http://localhost:8000/api/photos/
```

**Expected Response**:
- Status 200 or 401 (means backend is alive)
- JSON response with photos or error message

**If Backend is Down**:
- Status 500 or connection refused
- No response at all

---

## 📝 Backend Requirements:

Your Django backend should have:
- ✅ `/api/auth/login/` endpoint (POST)
- ✅ `/api/photos/` endpoint (GET, POST)
- ✅ `/api/photos/{id}/` endpoint (DELETE)
- ✅ Token authentication enabled
- ✅ CORS configured for frontend domain
- ✅ File upload handling (multipart/form-data)

---

## 🎯 Test Upload After Backend is Online:

1. **Refresh DB page**: `http://localhost:3000/db`
2. **Login again** (if needed)
3. **Fill all fields**:
   - Title: "Test Photo"
   - Category: "Test"
   - Select a photo
4. **Click "Add to gallery"**
5. **Expected**: 
   - Button shows "Uploading..." briefly
   - Success toast appears
   - Photo appears in gallery
   - Form resets

---

## 🐛 Still Having Issues?

### Check Browser Console (F12):
Look for errors like:
```
Upload error: TypeError: Failed to fetch
```
This means backend is not reachable.

### Check Network Tab (F12 → Network):
- Click "Add to gallery"
- Look for request to `/api/photos/`
- Check status code:
  - **0 or Failed**: Backend offline
  - **401**: Authentication issue
  - **403**: Permission denied
  - **500**: Backend error
  - **200**: Success!

---

## 💡 Environment Variables:

Your `.env` file should have:
```env
# For deployed backend
REACT_APP_API_URL=https://backend1-2agm.onrender.com/api

# OR for local backend
REACT_APP_API_URL=http://localhost:8000/api
```

**After changing .env, restart frontend**:
```bash
# Ctrl+C to stop
npm start
```

---

## ✅ Backend Status Indicators:

In the DB upload form, you'll see:
- **No warning** = Backend online ✅
- **"⚠️ Backend offline"** = Backend not responding ❌

The upload button will be:
- **Enabled** (blue gradient) = Can upload
- **Disabled** (gray) = Cannot upload (backend offline or missing fields)

---

## 🎨 What Changed in Code:

1. **Button now disabled when backend offline**
2. **Form only resets on successful upload**
3. **Better error messages**
4. **Console logs for debugging**
5. **Backend status indicator**

---

**Last Updated**: November 19, 2025
