# Backend URL Configuration Guide

## 🔗 Backend URL कैसे Change करें

Backend URL change करने के लिए आपके पास **3 options** हैं:

### Option 1: Environment Variable (Recommended) ✅

1. Project root directory में एक `.env` file बनाएं
2. उसमें यह add करें:
   ```
   REACT_APP_API_URL=https://your-backend-url.com
   ```
3. Development server को restart करें:
   ```bash
   npm start
   ```

**Example:**
```
REACT_APP_API_URL=https://my-backend.onrender.com
REACT_APP_API_URL=http://localhost:8000
REACT_APP_API_URL=https://api.example.com
```

### Option 2: Config File में Direct Change

`src/config/api.js` file खोलें और `DEFAULT_API_URL` को change करें:

```javascript
const DEFAULT_API_URL = 'https://your-backend-url.com';
```

फिर development server को restart करें।

### Option 3: Production Build के लिए

Production build के लिए environment variable set करें:

**Windows (PowerShell):**
```powershell
$env:REACT_APP_API_URL="https://your-backend-url.com"
npm run build
```

**Linux/Mac:**
```bash
REACT_APP_API_URL=https://your-backend-url.com npm run build
```

---

## 📝 Notes

- Environment variable का नाम `REACT_APP_API_URL` होना चाहिए
- URL के अंत में `/` (slash) नहीं होना चाहिए
- Changes apply करने के लिए development server को restart करना जरूरी है
- `.env` file को `.gitignore` में add करें (security के लिए)

---

## 🔍 Current Configuration

Current backend URL: `src/config/api.js` file में देखें

