import { useCallback, useEffect, useState, useRef } from 'react';
import './db.css';

// Constants - Remove /api from base URL since it's already in endpoints
const API_BASE_URL = (import.meta.env.VITE_API_URL ?? "https://backend1-2agm.onrender.com").replace(/\/$/, "");
const TOKEN_KEY = 'sauravEdu:token';
const USER_KEY = 'sauravEdu:user';
const TOAST_DURATION = 3500;

console.log('API Base URL:', API_BASE_URL); // Debug

// Helpers
const createEmptyFormState = () => ({ title: '', category: '', notes: '', file: null, preview: '' });
const createLoginForm = () => ({ username: '', password: '' });

const getImageUrl = (imageData) => {
  if (!imageData) return null;
  if (typeof imageData === 'string' && imageData.startsWith('http')) return imageData;
  if (imageData && typeof imageData === 'object') return imageData.url || imageData.secure_url || null;
  return null;
};

// Toast Hook
function useToast() {
  const [toast, setToast] = useState(null);
  const timeoutRef = useRef();
  useEffect(() => {
    if (toast) {
      timeoutRef.current = setTimeout(() => setToast(null), TOAST_DURATION);
      return () => clearTimeout(timeoutRef.current);
    }
  }, [toast]);
  return { toast, setToast };
}

// Auth Hook
function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_KEY);
    try { return stored ? JSON.parse(stored) : null; } catch { return null; }
  });

  useEffect(() => { token ? localStorage.setItem(TOKEN_KEY, token) : localStorage.removeItem(TOKEN_KEY); }, [token]);
  useEffect(() => { user ? localStorage.setItem(USER_KEY, JSON.stringify(user)) : localStorage.removeItem(USER_KEY); }, [user]);

  const resetSession = useCallback(() => { setToken(''); setUser(null); }, []);

  return { token, user, setToken, setUser, resetSession, isAuthenticated: Boolean(token) };
}

// API Calls - CORRECT ENDPOINTS based on your Django URLs
async function loginUser({ username, password }) {
  const res = await fetch(`${API_BASE_URL}/api/gallery/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    // Better error handling for HTML responses
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      throw new Error('Server returned HTML page. Check if API endpoint is correct.');
    }
    
    try {
      const errorData = await res.json();
      throw new Error(errorData.detail || errorData.message || 'Login failed');
    } catch (parseError) {
      throw new Error(`Login failed: ${res.status} ${res.statusText}`);
    }
  }

  return await res.json();
}

async function fetchPhotos(token) {
  const res = await fetch(`${API_BASE_URL}/api/gallery/photos/`, { 
    headers: { 'Authorization': `Token ${token}` } 
  });
  
  if (!res.ok) {
    if (res.status === 401) throw new Error('Authentication required. Please login again.');
    if (res.status === 404) throw new Error('Photos endpoint not found. Check URL.');
    
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      throw new Error('Server returned HTML instead of JSON. Check API endpoint.');
    }
    
    throw new Error(`Failed to load photos: ${res.status}`);
  }
  
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

async function uploadPhoto(token, form) {
  if (!form.file) throw new Error('Please select an image file');

  const formData = new FormData();
  formData.append('image', form.file);
  formData.append('title', form.title);
  formData.append('category', form.category);
  if (form.notes) formData.append('notes', form.notes);

  const res = await fetch(`${API_BASE_URL}/api/gallery/photos/`, {
    method: 'POST',
    headers: { 'Authorization': `Token ${token}` },
    body: formData,
  });

  if (!res.ok) {
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      throw new Error('Upload endpoint returned HTML. Check if endpoint exists.');
    }
    
    let errorMessage = `Upload failed: ${res.status}`;
    try { 
      const errorData = await res.json(); 
      errorMessage = errorData.detail || errorData.message || JSON.stringify(errorData); 
    } 
    catch { 
      errorMessage = await res.text(); 
    }
    throw new Error(errorMessage);
  }

  return await res.json();
}

async function deletePhoto(token, photoId) {
  const res = await fetch(`${API_BASE_URL}/api/gallery/photos/${photoId}/`, {
    method: 'DELETE',
    headers: { Authorization: `Token ${token}` },
  });

  if (!res.ok) {
    if (res.status === 404) throw new Error('Delete endpoint not found');
    throw new Error(`Delete failed: ${res.status}`);
  }
  return true;
}

// Components (SAME AS BEFORE)
function AuthForm({ onLogin, authLoading }) {
  const [loginForm, setLoginForm] = useState(createLoginForm());

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(loginForm);
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <p className="eyebrow">SauravEdu Admin</p>
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
          <label className="field">
            <span>Username</span>
            <input type="text" value={loginForm.username} onChange={(e) => setLoginForm(f => ({ ...f, username: e.target.value }))} required />
          </label>
          <label className="field">
            <span>Password</span>
            <input type="password" value={loginForm.password} onChange={(e) => setLoginForm(f => ({ ...f, password: e.target.value }))} required />
          </label>
          <button type="submit" disabled={authLoading}>{authLoading ? 'Signing in...' : 'Sign in'}</button>
        </form>
      </div>
    </div>
  );
}

function PhotoUploadForm({ onSubmit, formDisabled }) {
  const [form, setForm] = useState(createEmptyFormState());

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) { alert('Invalid file type'); e.target.value = ''; return; }
    if (file.size > 10 * 1024 * 1024) { alert('File too large'); e.target.value = ''; return; }

    const reader = new FileReader();
    reader.onload = () => setForm(f => ({ ...f, file, preview: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => { e.preventDefault(); onSubmit(form); };
  const resetForm = () => { setForm(createEmptyFormState()); const fi = document.querySelector('input[type=file]'); if (fi) fi.value = ''; };

  return (
    <form className={`upload-card ${formDisabled ? 'disabled' : ''}`} onSubmit={handleSubmit}>
      <h2>Upload Photo</h2>
      <label className="field"><span>Title *</span><input type="text" value={form.title} disabled={formDisabled} required placeholder="Title" onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} /></label>
      <label className="field"><span>Category *</span><input type="text" value={form.category} disabled={formDisabled} required placeholder="Category" onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))} /></label>
      <label className="field"><span>Notes</span><textarea value={form.notes} disabled={formDisabled} placeholder="Optional" onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))} /></label>
      <label className="field file-field"><span>Image *</span><input type="file" accept="image/*" disabled={formDisabled} required onChange={handleFileChange} /></label>
      {form.preview && <div className="preview"><img src={form.preview} alt="Preview" /><p>{form.file?.name} ({(form.file?.size/1024/1024).toFixed(2)} MB)</p></div>}
      <div className="form-actions">
        <button type="submit" disabled={formDisabled || !form.file || !form.title.trim() || !form.category.trim()}>{formDisabled ? 'Uploading...' : 'Upload'}</button>
        <button type="button" className="ghost" onClick={resetForm} disabled={formDisabled}>Clear</button>
      </div>
    </form>
  );
}

function GalleryGrid({ photos, onDelete, loading }) {
  if (loading) return <div className="gallery-card"><p>Loading photos...</p></div>;
  if (photos.length === 0) return <div className="gallery-card"><p>No photos uploaded</p></div>;

  return (
    <div className="gallery-section">
      <h3>Your Photos ({photos.length})</h3>
      <ul className="gallery-grid">
        {photos.map(photo => {
          const imageUrl = getImageUrl(photo.image);
          return (
            <li key={photo.id} className="gallery-card-item">
              <div className="image-container">
                {imageUrl ? <img src={imageUrl} alt={photo.title} loading="lazy" /> : <div className="image-fallback">📷 No Image</div>}
              </div>
              <div className="card-body">
                {photo.category && <span className="category-tag">{photo.category}</span>}
                <h4>{photo.title || 'Untitled'}</h4>
                {photo.notes && <p className="notes">{photo.notes}</p>}
                <p className="date">{photo.created_at ? new Date(photo.created_at).toLocaleDateString() : 'Unknown date'}</p>
                <button className="delete-btn" onClick={() => onDelete(photo.id)}>🗑️ Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function DB() {
  const { toast, setToast } = useToast();
  const { token, user, setToken, setUser, resetSession, isAuthenticated } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [authLoading, setAuthLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [photosLoading, setPhotosLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && token) {
      setPhotosLoading(true);
      fetchPhotos(token).then(setPhotos).catch(err => {
        console.error('Fetch photos error:', err);
        setToast({ type: 'error', message: err.message });
        if (err.message.includes('Authentication')) resetSession();
      }).finally(() => setPhotosLoading(false));
    }
  }, [isAuthenticated, token, resetSession, setToast]);

  const handleLogin = useCallback(async (form) => {
    setAuthLoading(true);
    try {
      const data = await loginUser(form);
      setToken(data.token);
      setUser(data.user);
      setToast({ type: 'success', message: `Welcome ${data.user.username}` });
    } catch (err) { 
      console.error('Login error:', err); 
      setToast({ type: 'error', message: err.message }); 
    }
    finally { setAuthLoading(false); }
  }, [setToken, setUser, setToast]);

  const handleUpload = useCallback(async (form) => {
    setUploadLoading(true);
    try {
      const newPhoto = await uploadPhoto(token, form);
      setPhotos(prev => [newPhoto, ...prev]);
      setToast({ type: 'success', message: 'Photo uploaded successfully' });
    } catch (err) { 
      console.error('Upload error:', err); 
      setToast({ type: 'error', message: err.message }); 
    }
    finally { setUploadLoading(false); }
  }, [token, setToast]);

  const handleDelete = useCallback(async (photoId) => {
    if (!window.confirm('Delete this photo?')) return;
    try { 
      await deletePhoto(token, photoId); 
      setPhotos(prev => prev.filter(p => p.id !== photoId)); 
      setToast({ type: 'success', message: 'Deleted!' }); 
    }
    catch (err) { 
      console.error('Delete error:', err); 
      setToast({ type: 'error', message: err.message }); 
    }
  }, [token, setToast]);

  const handleLogout = useCallback(() => { 
    resetSession(); 
    setPhotos([]); 
    setToast({ type: 'info', message: 'Logged out' }); 
  }, [resetSession, setToast]);

  if (!isAuthenticated) return (<><AuthForm onLogin={handleLogin} authLoading={authLoading} />{toast && <div className={`toast ${toast.type}`}><p>{toast.message}</p></div>}</>);

  return (
    <div className="db-container">
      <header className="db-header">
        <div><h1>📸 Media Library</h1><p className="user-info">Welcome, {user?.username}</p></div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>
      <main className="db-main">
        <PhotoUploadForm onSubmit={handleUpload} formDisabled={uploadLoading} />
        <GalleryGrid photos={photos} onDelete={handleDelete} loading={photosLoading} />
      </main>
      {toast && <div className={`toast ${toast.type}`}><p>{toast.message}</p></div>}
    </div>
  );
}

export default DB;