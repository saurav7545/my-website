import { useCallback, useEffect, useState, useRef } from 'react';
import './db.css';

// Constants
const API_BASE_URL = "https://backend1-2agm.onrender.com/api";

const TOKEN_KEY = 'sauravEdu:token';
const USER_KEY = 'sauravEdu:user';
const TOAST_DURATION = 3500;

// Helpers
const createEmptyFormState = () => ({
  title: '', category: '', notes: '', file: null, preview: '',
});
const createLoginForm = () => ({ username: '', password: '' });

// Cloudinary URL handler
const getImageUrl = (imageData) => {
  if (!imageData) return null;
  
  // If it's already a URL string
  if (typeof imageData === 'string' && imageData.startsWith('http')) {
    return imageData;
  }
  
  // If it's a Cloudinary object
  if (imageData && typeof imageData === 'object') {
    return imageData.url || imageData.secure_url || null;
  }
  
  return null;
};

// Hooks
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

function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_KEY);
    try { return stored ? JSON.parse(stored) : null; } catch { return null; }
  });
  useEffect(() => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  }, [token]);
  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);
  const resetSession = useCallback(() => {
    setToken(''); setUser(null);
  }, []);
  return { token, user, setToken, setUser, resetSession, isAuthenticated: Boolean(token) };
}

// API Calls
async function loginUser({ username, password }) {
  const res = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || 'Login failed');
  }
  
  return await res.json();
}

async function fetchPhotos(token) {
  console.log('🔄 Fetching photos with token...');
  const res = await fetch(`${API_BASE_URL}/photos/`, {
    headers: { 
      'Authorization': `Token ${token}`,
    },
  });
  
  console.log('📡 Photos response:', res.status, res.statusText);
  
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Authentication required. Please login again.');
    }
    const errorText = await res.text();
    throw new Error(`Failed to load photos: ${res.status}`);
  }
  
  const data = await res.json();
  console.log('✅ Photos loaded:', data.length || 0);
  return Array.isArray(data) ? data : [];
}

async function uploadPhoto(token, form) {
  console.log('🚀 Uploading photo...');
  
  if (!form.file) {
    throw new Error('Please select an image file');
  }

  const formData = new FormData();
  formData.append('image', form.file);
  formData.append('title', form.title);
  formData.append('category', form.category);
  
  if (form.notes) {
    formData.append('notes', form.notes);
  }

  const res = await fetch(`${API_BASE_URL}/photos/`, {
    method: 'POST',
    headers: { 
      'Authorization': `Token ${token}`
    },
    body: formData,
  });

  console.log('📡 Upload response:', res.status);

  if (!res.ok) {
    let errorMessage = `Upload failed: ${res.status}`;
    try {
      const errorData = await res.json();
      console.error('Backend error:', errorData);
      errorMessage = errorData.detail || errorData.error || JSON.stringify(errorData);
    } catch (e) {
      const errorText = await res.text();
      errorMessage = errorText || errorMessage;
    }
    throw new Error(errorMessage);
  }
  
  const data = await res.json();
  console.log('✅ Upload success:', data);
  return data;
}

async function deletePhoto(token, photoId) {
  const res = await fetch(`${API_BASE_URL}/photos/${photoId}/`, {
    method: 'DELETE',
    headers: { Authorization: `Token ${token}` },
  });
  
  if (!res.ok) {
    throw new Error(`Delete failed: ${res.status}`);
  }
  
  return true;
}

// UI Components
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
        <h1>Sign in to continue</h1>
        <p className="subtitle">Staff credentials required</p>
        <form onSubmit={handleSubmit}>
          <label className="field">
            <span>Username</span>
            <input 
              type="text" 
              value={loginForm.username}
              onChange={(e) => setLoginForm((f) => ({ ...f, username: e.target.value }))} 
              required
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input 
              type="password" 
              value={loginForm.password}
              onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))} 
              required
            />
          </label>
          <button type="submit" disabled={authLoading}>
            {authLoading ? 'Signing in...' : 'Sign in'}
          </button>
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
    
    // File validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please select JPEG, PNG, GIF, or WebP image');
      e.target.value = '';
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      alert('File too large (max 10MB)'); 
      e.target.value = ''; 
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, file, preview: reader.result }));
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(form);
  };
  
  const resetForm = () => {
    setForm(createEmptyFormState());
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };
  
  return (
    <form className={`upload-card ${formDisabled ? 'disabled' : ''}`} onSubmit={handleSubmit}>
      <h2>Upload New Photo</h2>
      <label className="field">
        <span>Title *</span>
        <input 
          type="text" 
          value={form.title} 
          disabled={formDisabled}
          required
          placeholder="Enter photo title"
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} 
        />
      </label>
      <label className="field">
        <span>Category *</span>
        <input 
          type="text" 
          value={form.category} 
          disabled={formDisabled}
          required
          placeholder="e.g., Nature, Portrait"
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} 
        />
      </label>
      <label className="field">
        <span>Notes</span>
        <textarea 
          rows={2}
          value={form.notes} 
          disabled={formDisabled}
          placeholder="Optional description"
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} 
        />
      </label>
      <label className="field file-field">
        <span>Image File *</span>
        <input 
          type="file" 
          accept="image/*" 
          disabled={formDisabled}
          required
          onChange={handleFileChange} 
        />
      </label>
      {form.preview && (
        <div className="preview">
          <img src={form.preview} alt="Preview" />
          <p>{form.file?.name} ({(form.file?.size / 1024 / 1024).toFixed(2)} MB)</p>
        </div>
      )}
      <div className="form-actions">
        <button 
          type="submit" 
          disabled={formDisabled || !form.file || !form.title.trim() || !form.category.trim()}
        >
          {formDisabled ? 'Uploading...' : 'Upload to Cloudinary'}
        </button>
        <button 
          type="button" 
          className="ghost"
          onClick={resetForm}
          disabled={formDisabled}
        >
          Clear
        </button>
      </div>
    </form>
  );
}

function GalleryGrid({ photos, onDelete, loading }) {
  if (loading) {
    return (
      <div className="gallery-card">
        <div className="loader">
          <p>Loading photos...</p>
        </div>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="gallery-card">
        <div className="empty-state">
          <p>No photos in your library</p>
          <p className="muted">Upload your first photo using the form above</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-section">
      <h3>Your Photos ({photos.length})</h3>
      <ul className="gallery-grid">
        {photos.map((photo) => {
          const imageUrl = getImageUrl(photo.image);
          return (
            <li key={photo.id} className="gallery-card-item">
              <div className="image-container">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={photo.title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="image-fallback" style={{ display: imageUrl ? 'none' : 'flex' }}>
                  📷 No Image
                </div>
              </div>
              <div className="card-body">
                <div className="photo-info">
                  {photo.category && <span className="category-tag">{photo.category}</span>}
                  <h4>{photo.title || 'Untitled'}</h4>
                  {photo.notes && <p className="notes">{photo.notes}</p>}
                  <p className="date">
                    {photo.created_at ? new Date(photo.created_at).toLocaleDateString() : 'Unknown date'}
                  </p>
                </div>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => onDelete(photo.id)}
                  title="Delete photo"
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Main Component
function DB() {
  const { toast, setToast } = useToast();
  const { token, user, setToken, setUser, resetSession, isAuthenticated } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [authLoading, setAuthLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [photosLoading, setPhotosLoading] = useState(false);

  // Load photos when authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      setPhotosLoading(true);
      fetchPhotos(token)
        .then((data) => {
          setPhotos(data);
        })
        .catch((err) => {
          console.error('Load error:', err);
          setToast({ type: 'error', message: err.message });
          // Auto-logout if authentication fails
          if (err.message.includes('Authentication')) {
            resetSession();
          }
        })
        .finally(() => setPhotosLoading(false));
    }
  }, [isAuthenticated, token, setToast, resetSession]);

  const handleLogin = useCallback(async (loginForm) => {
    setAuthLoading(true);
    try {
      const data = await loginUser(loginForm);
      setToken(data.token);
      setUser(data.user);
      setToast({ type: 'success', message: `Welcome ${data.user.username}!` });
    } catch (err) {
      console.error('Login error:', err);
      setToast({ type: 'error', message: err.message });
    } finally {
      setAuthLoading(false);
    }
  }, [setToken, setUser, setToast]);

  const handleUpload = useCallback(async (form) => {
    setUploadLoading(true);
    try {
      const newPhoto = await uploadPhoto(token, form);
      setPhotos(prev => [newPhoto, ...prev]);
      setToast({ type: 'success', message: 'Photo uploaded successfully!' });
    } catch (err) {
      console.error('Upload error:', err);
      setToast({ type: 'error', message: err.message });
    } finally {
      setUploadLoading(false);
    }
  }, [token, setToast]);

  const handleDelete = useCallback(async (photoId) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return;
    try {
      await deletePhoto(token, photoId);
      setPhotos(prev => prev.filter(p => p.id !== photoId));
      setToast({ type: 'success', message: 'Photo deleted!' });
    } catch (err) {
      console.error('Delete error:', err);
      setToast({ type: 'error', message: err.message });
    }
  }, [token, setToast]);

  const handleLogout = useCallback(() => {
    resetSession();
    setPhotos([]);
    setToast({ type: 'info', message: 'Logged out successfully' });
  }, [resetSession, setToast]);

  if (!isAuthenticated) {
    return (
      <>
        <AuthForm onLogin={handleLogin} authLoading={authLoading} />
        {toast && (
          <div className={`toast ${toast.type}`}>
            <p>{toast.message}</p>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="db-container">
      <header className="db-header">
        <div>
          <h1>📸 Media Library</h1>
          <p className="user-info">Welcome, {user?.username}</p>
        </div>
        <div className="header-actions">
          <button 
            type="button" 
            onClick={handleLogout}
            className="logout-btn"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="db-main">
        <PhotoUploadForm 
          onSubmit={handleUpload} 
          formDisabled={uploadLoading} 
        />
        <GalleryGrid 
          photos={photos} 
          onDelete={handleDelete} 
          loading={photosLoading} 
        />
      </main>

      {toast && (
        <div className={`toast ${toast.type}`}>
          <p>{toast.message}</p>
        </div>
      )}
    </div>
  );
}

export default DB;