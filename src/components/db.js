import { useCallback, useEffect, useState, useRef } from 'react';
import './db.css';

// Constants
const API_BASE_URL = (
  process.env.REACT_APP_API_URL ?? "https://backend1-2agm.onrender.com/api"
).replace(/\/$/, '');

console.log('DB Component - API_BASE_URL:', API_BASE_URL);

const BACKEND_BASE_URL = (() => {
  const fallback = API_BASE_URL.replace(/\/api\/?$/, '');
  if (typeof window === 'undefined') return fallback;
  try {
    const resolved = new URL(API_BASE_URL, window.location.origin);
    return resolved.origin.replace(/\/$/, '');
  } catch {
    return fallback;
  }
})();

const TOKEN_KEY = 'sauravEdu:token';
const USER_KEY = 'sauravEdu:user';
const TOAST_DURATION = 3500;

// Helpers
const createEmptyFormState = () => ({
  title: '', category: '', notes: '', file: null, preview: '',
});
const createLoginForm = () => ({ username: '', password: '' });

const fixImageUrl = (imageUrl) => {
  if (!imageUrl) return null;
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
  const base = BACKEND_BASE_URL || API_BASE_URL;
  try {
    const normalizedBase = base.endsWith('/') ? base : `${base}/`;
    return new URL(imageUrl.replace(/^\//, ''), normalizedBase).href;
  } catch {
    const fallbackBase = (BACKEND_BASE_URL || '').replace(/\/$/, '');
    const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    return `${fallbackBase}${path}`;
  }
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

function useBackendStatus() {
  const [backendOnline, setBackendOnline] = useState(true);
  return { backendOnline, setBackendOnline };
}

// API Calls
async function loginUser({ username, password }) {
  const res = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return await res.json();
}

async function fetchPhotos(token) {
  console.log('Fetching photos from:', `${API_BASE_URL}/photos/`);
  console.log('Using token:', token ? `${token.substring(0, 10)}...` : 'NO TOKEN');
  
  const res = await fetch(`${API_BASE_URL}/photos/`, {
    headers: { Authorization: `Token ${token}` },
  });
  
  console.log('Fetch photos response:', res.status, res.statusText);
  
  if (!res.ok) {
    const errorText = await res.text();
    console.error('Failed to fetch photos:', res.status, errorText);
    throw new Error(`Unable to load photos: ${res.status} ${res.statusText}`);
  }
  
  const data = await res.json();
  console.log('Photos loaded:', data.length, 'photos');
  return data;
}

async function uploadPhoto(token, form) {
  const formData = new FormData();
  formData.append('image', form.file);
  formData.append('title', form.title);
  formData.append('category', form.category);
  formData.append('notes', form.notes);
  
  console.log('Uploading photo:', {
    title: form.title,
    category: form.category,
    fileName: form.file.name,
    fileSize: form.file.size,
    url: `${API_BASE_URL}/photos/`
  });
  
  const res = await fetch(`${API_BASE_URL}/photos/`, {
    method: 'POST',
    headers: { Authorization: `Token ${token}` },
    body: formData,
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    console.error('Upload failed:', res.status, errorText);
    throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
  }
  
  return await res.json();
}

async function deletePhoto(token, photoId) {
  const res = await fetch(`${API_BASE_URL}/photos/${photoId}/`, {
    method: 'DELETE',
    headers: { Authorization: `Token ${token}` },
  });
  if (!res.ok) throw new Error('Delete failed');
  return true;
}

// UI Components
function AuthForm({ onLogin, authLoading, backendOnline }) {
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
        <p className="subtitle">Use your Django staff credentials to manage the media library.</p>
        <form onSubmit={handleSubmit}>
          <label className="field">
            <span>Username</span>
            <input type="text" value={loginForm.username}
              onChange={(e) => setLoginForm((f) => ({ ...f, username: e.target.value }))} />
          </label>
          <label className="field">
            <span>Password</span>
            <input type="password" value={loginForm.password}
              onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))} />
          </label>
          <button type="submit" disabled={authLoading}>
            {authLoading ? 'Verifying…' : 'Sign in'}
          </button>
        </form>
        {!backendOnline && (
          <div className="status-banner error inline">
            <p>Backend is offline. Start Django and try again.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PhotoUploadForm({ onSubmit, formDisabled, backendOnline, onUploadComplete }) {
  const [form, setForm] = useState(createEmptyFormState());
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('File too large'); e.target.value = ''; return;
    }
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, file, preview: reader.result }));
    reader.readAsDataURL(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit(form);
    // Only reset form if upload was successful
    if (success) {
      setForm(createEmptyFormState());
      const fileInput = document.getElementById('photo-upload-input');
      if (fileInput) fileInput.value = '';
    }
  };
  return (
    <form className={`upload-card ${formDisabled ? 'disabled' : ''}`} onSubmit={handleSubmit}>
      <h2>Upload new photo</h2>
      <label className="field"><span>Title *</span>
        <input type="text" value={form.title} disabled={formDisabled} required
          placeholder="Enter photo title"
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
      </label>
      <label className="field"><span>Category *</span>
        <input type="text" value={form.category} disabled={formDisabled} required
          placeholder="e.g., Nature, Portrait, Landscape"
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
      </label>
      <label className="field"><span>Notes</span>
        <textarea rows={3} value={form.notes} disabled={formDisabled}
          placeholder="Add optional description or notes"
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} />
      </label>
      <label className="field file-field"><span>Upload photo *</span>
        <input id="photo-upload-input" type="file" accept="image/*" disabled={formDisabled} required
          onChange={handleFileChange} />
      </label>
      {form.preview && (
        <div className="preview">
          <img src={form.preview} alt="Preview" />
          <p>{form.file?.name}</p>
        </div>
      )}
      <button type="submit" disabled={formDisabled || !form.file || !form.title || !form.category || !backendOnline}>
        {formDisabled ? 'Uploading...' : 'Add to gallery'}
      </button>
      <p className="muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>* Required fields</p>
      {!backendOnline && (
        <p className="muted" style={{ color: '#fca5a5', fontWeight: '600' }}>⚠️ Backend offline. Check connection.</p>
      )}
    </form>
  );
}

function GalleryGrid({ photos, searchTerm, onDelete, backendOnline, loading }) {
  const filtered = photos.filter((p) =>
    [p.title, p.category, p.notes].some((v) =>
      v?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="gallery-card">
        <div className="loader">
          <span className="spinner" />
          <p>Loading photos...</p>
        </div>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="gallery-card">
        <div className="empty-state">
          <p>No matching photos found.</p>
          <p className="muted">Try a different search term or clear the search.</p>
        </div>
      </div>
    );
  }

  return (
    <ul className="gallery-grid">
      {filtered.map((photo) => (
        <li key={photo.id} className="gallery-card-item">
          {photo.image ? (
            <img
              src={photo.image}
              alt={photo.title || 'Uploaded photo'}
              onError={(e) => {
                e.target.style.backgroundColor = '#f0f0f0';
                e.target.alt = 'Image failed to load';
              }}
            />
          ) : (
            <div style={{
              background: '#f0f0f0',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666'
            }}>
              No Image Available
            </div>
          )}
          <div className="card-body">
            <div>
              {photo.category && <p className="pill">{photo.category}</p>}
              <h3>{photo.title || 'Untitled photo'}</h3>
              {photo.notes && <p className="muted">{photo.notes}</p>}
              <p className="muted">
                {photo.created_at ? new Date(photo.created_at).toLocaleString() : 'Unknown date'}
              </p>
            </div>
            <button
              type="button"
              className="ghost"
              disabled={!backendOnline}
              onClick={() => onDelete(photo.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

// Main Component
function DB() {
  const { toast, setToast } = useToast();
  const { token, user, setToken, setUser, resetSession, isAuthenticated } = useAuth();
  const { backendOnline, setBackendOnline } = useBackendStatus();
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [photosLoading, setPhotosLoading] = useState(false);

  // Add body class for styling
  useEffect(() => {
    document.body.classList.add('db-admin-theme');
    return () => {
      document.body.classList.remove('db-admin-theme');
    };
  }, []);

  // Load photos on mount
  useEffect(() => {
    if (isAuthenticated) {
      setPhotosLoading(true);
      fetchPhotos(token)
        .then((data) => {
          const fixedPhotos = data.map((p) => ({
            ...p,
            image: fixImageUrl(p.image),
          }));
          setPhotos(fixedPhotos);
          setBackendOnline(true);
        })
        .catch((err) => {
          console.error('Failed to load photos:', err);
          setToast({ type: 'error', message: 'Failed to load photos' });
          setBackendOnline(false);
        })
        .finally(() => setPhotosLoading(false));
    }
  }, [isAuthenticated, token, setBackendOnline, setToast]);

  const handleLogin = useCallback(
    async (loginForm) => {
      setAuthLoading(true);
      try {
        const data = await loginUser(loginForm);
        setToken(data.token);
        setUser({ username: loginForm.username });
        setBackendOnline(true);
        setToast({ type: 'success', message: `Welcome, ${loginForm.username}!` });
      } catch (err) {
        console.error('Login error:', err);
        setToast({ type: 'error', message: 'Login failed. Check credentials.' });
        setBackendOnline(false);
      } finally {
        setAuthLoading(false);
      }
    },
    [setToken, setUser, setBackendOnline, setToast]
  );

  const handleUpload = useCallback(
    async (form) => {
      // Validate required fields
      if (!form.file) {
        setToast({ type: 'error', message: 'Please select a photo to upload' });
        return false;
      }
      if (!form.title || form.title.trim() === '') {
        setToast({ type: 'error', message: 'Please enter a title' });
        return false;
      }
      if (!form.category || form.category.trim() === '') {
        setToast({ type: 'error', message: 'Please enter a category' });
        return false;
      }
      
      setUploadLoading(true);
      try {
        const newPhoto = await uploadPhoto(token, form);
        const fixedPhoto = { ...newPhoto, image: fixImageUrl(newPhoto.image) };
        setPhotos((prev) => [fixedPhoto, ...prev]);
        setToast({ type: 'success', message: 'Photo uploaded successfully!' });
        setBackendOnline(true);
        return true; // Success
      } catch (err) {
        console.error('Upload error:', err);
        const errorMessage = err.message || 'Upload failed. Check your connection and try again.';
        setToast({ type: 'error', message: errorMessage });
        setBackendOnline(false);
        return false; // Failure
      } finally {
        setUploadLoading(false);
      }
    },
    [token, setToast, setBackendOnline]
  );

  const handleDelete = useCallback(
    async (photoId) => {
      if (!window.confirm('Are you sure you want to delete this photo?')) return;
      try {
        await deletePhoto(token, photoId);
        setPhotos((prev) => prev.filter((p) => p.id !== photoId));
        setToast({ type: 'success', message: 'Photo deleted successfully!' });
      } catch (err) {
        console.error('Delete error:', err);
        setToast({ type: 'error', message: 'Delete failed. Try again.' });
      }
    },
    [token, setToast]
  );

  const handleLogout = useCallback(() => {
    resetSession();
    setPhotos([]);
    setToast({ type: 'info', message: 'Logged out successfully' });
  }, [resetSession, setToast]);

  if (!isAuthenticated) {
    return (
      <>
        <AuthForm
          onLogin={handleLogin}
          authLoading={authLoading}
          backendOnline={backendOnline}
        />
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
          <h1>SauravEdu Media Library</h1>
          <p className="muted">Logged in as {user?.username}</p>
        </div>
        <div className="header-actions">
          <label className="search-field">
            <input
              type="search"
              placeholder="Search photos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
          <button type="button" onClick={handleLogout} className="ghost">
            Log out
          </button>
        </div>
      </header>

      <div className="db-content">
        <PhotoUploadForm
          onSubmit={handleUpload}
          formDisabled={uploadLoading || !backendOnline}
          backendOnline={backendOnline}
        />
        <GalleryGrid
          photos={photos}
          searchTerm={searchTerm}
          onDelete={handleDelete}
          backendOnline={backendOnline}
          loading={photosLoading}
        />
      </div>

      {toast && (
        <div className={`toast ${toast.type}`}>
          <p>{toast.message}</p>
        </div>
      )}
    </div>
  );
}

export default DB;
