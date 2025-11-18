import { useCallback, useEffect, useState, useRef } from 'react';
import './db.css';

// Constants
const API_BASE_URL = (
  process.env.REACT_APP_API_URL ?? "https://backend1-2agm.onrender.com/api"
).replace(/\/$/, '');

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

// Helper functions
const createEmptyFormState = () => ({
  title: '',
  category: '',
  notes: '',
  file: null,
  preview: '',
});

const createLoginForm = () => ({
  username: '',
  password: '',
});

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
    try {
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
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
    setToken('');
    setUser(null);
  }, []);

  return { token, user, setToken, setUser, resetSession, isAuthenticated: Boolean(token) };
}

function useBackendStatus() {
  const [backendOnline, setBackendOnline] = useState(true);
  return { backendOnline, setBackendOnline };
}

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
            <input
              type="text"
              value={loginForm.username}
              onChange={(e) => setLoginForm((current) => ({ ...current, username: e.target.value }))}
              placeholder="admin"
              autoComplete="username"
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm((current) => ({ ...current, password: e.target.value }))}
              placeholder="••••••••"
              autoComplete="current-password"
            />
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

function PhotoUploadForm({ onSubmit, formDisabled, backendOnline }) {
  const [form, setForm] = useState(createEmptyFormState());

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Please choose a file smaller than 5 MB.');
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({ ...current, file, preview: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(createEmptyFormState());
    document.getElementById('photo-upload-input').value = '';
  };

  return (
    <form className={`upload-card ${formDisabled ? 'disabled' : ''}`} onSubmit={handleSubmit}>
      <div className="section-header">
        <div>
          <h2>Upload new photo</h2>
          <p>Accepted formats: JPG, PNG, WebP up to 5 MB.</p>
        </div>
      </div>
      <label className="field">
        <span>Title</span>
        <input
          type="text"
          disabled={formDisabled}
          value={form.title}
          onChange={(e) => setForm((current) => ({ ...current, title: e.target.value }))}
          placeholder="Eg. NEET Toppers Ceremony"
        />
      </label>
      <label className="field">
        <span>Category</span>
        <input
          type="text"
          disabled={formDisabled}
          value={form.category}
          onChange={(e) => setForm((current) => ({ ...current, category: e.target.value }))}
          placeholder="Academics, Events, Hostel..."
        />
      </label>
      <label className="field">
        <span>Notes (optional)</span>
        <textarea
          rows={3}
          disabled={formDisabled}
          value={form.notes}
          onChange={(e) => setForm((current) => ({ ...current, notes: e.target.value }))}
          placeholder="Describe where this banner will be used."
        />
      </label>
      <label className="field file-field">
        <span>Upload photo</span>
        <input
          id="photo-upload-input"
          type="file"
          accept="image/*"
          disabled={formDisabled}
          onChange={handleFileChange}
        />
      </label>
      {form.preview && (
        <div className="preview">
          <img src={form.preview} alt="Preview" />
          <div>
            <p>{form.file?.name}</p>
            <p className="muted">
              {(form.file?.size / 1024).toFixed(1)} KB · {form.file?.type}
            </p>
          </div>
        </div>
      )}
      <button type="submit" disabled={formDisabled}>
        {formDisabled ? 'Uploading...' : 'Add to gallery'}
      </button>
      {!backendOnline && (
        <p className="muted">Uploads are paused until the backend connection is restored.</p>
      )}
    </form>
  );
}

function GalleryGrid({ photos, searchTerm, onDelete, backendOnline, loading }) {
  const filteredPhotos = photos.filter((photo) =>
    [photo.title, photo.category, photo.notes].some((value) =>
      value?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) return <div className="loader"><span className="spinner" /> Loading photos...</div>;
  if (filteredPhotos.length === 0) return (
    <div className="empty-state">
      {photos.length === 0 ? (
        <>
          <p>No photos in gallery yet.</p>
          <p className="muted">Upload your first image to get started.</p>
        </>
      ) : (
        <>
          <p>No photos match your search.</p>
          <p className="muted">Try a different search term or clear the search.</p>
        </>
      )}
    </div>
  );

  return (
    <ul className="gallery-grid">
      {filteredPhotos.map((photo) => (
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
            <div style={{ background: '#f0f0f0', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
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

function DB() {
  const { toast, setToast } = useToast();
  const { token, user, setToken, setUser, resetSession, isAuthenticated } = useAuth();
  const { backendOnline, setBackendOnline } = useBackendStatus();
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [sessionBusy, setSessionBusy] = useState(false);
  const [loading, setLoading] = useState(Boolean(token));

  const resolveImageSrc = useCallback((image) => {
    if (!image) return null;
    if (typeof image === 'string') return fixImageUrl(image);
    if (typeof image === 'object') {
      return (
        image.secure_url ||
        image.url ||
        fixImageUrl(image.path || image.public_id || '')
      );
    }
    return null;
  }, []);

  const fetchPhotos = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/photos/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.status === 401) {
        resetSession();
        setToast({ status: 'error', message: 'Session expired. Please log in again.' });
        return;
      }
      if (!response.ok) {
        throw new Error('Unable to load photos');
      }
      const data = await response.json();
      const photosWithFixedUrls = data.map(photo => ({
        ...photo,
        image: resolveImageSrc(photo.image),
      }));
      setPhotos(photosWithFixedUrls);
      setBackendOnline(true);
    } catch (error) {
      console.error(error);
      setBackendOnline(false);
      setToast({
        status: 'error',
        message: 'Backend server is offline. Start Django to manage the gallery.',
      });
    } finally {
      setLoading(false);
    }
  }, [token, resetSession, setToast, setBackendOnline, resolveImageSrc]);

  useEffect(() => {
    if (token) {
      fetchPhotos();
    } else {
      setBackendOnline(true);
    }
  }, [fetchPhotos, token]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogin = async (loginForm) => {
    if (!loginForm.username || !loginForm.password) {
      setToast({ status: 'error', message: 'Enter a username and password.' });
      return;
    }
    try {
      setAuthLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        const message = payload?.detail || 'Invalid credentials. Please try again.';
        throw new Error(message);
      }
      setToken(payload.token);
      setUser(payload.user);
      setBackendOnline(true);
      setToast({ status: 'success', message: 'Welcome back!' });
    } catch (error) {
      console.error(error);
      const isOffline = error.message.includes('fetch') || error.name === 'TypeError';
      if (isOffline) {
        setBackendOnline(false);
        setToast({
          status: 'error',
          message: 'Backend unreachable. Start Django and try again.',
        });
      } else {
        setBackendOnline(true);
        setToast({ status: 'error', message: error.message });
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSubmit = async (form) => {
    if (!backendOnline) {
      setToast({
        status: 'error',
        message: 'Backend is offline. Start the server to upload.',
      });
      return;
    }
    if (!form.file) {
      setToast({ status: 'error', message: 'Please select a photo to upload.' });
      return;
    }
    try {
      setUploading(true);
      const payload = new FormData();
      payload.append('title', form.title.trim() || 'Untitled photo');
      payload.append('category', form.category.trim());
      payload.append('notes', form.notes.trim());
      payload.append('image', form.file);
      const response = await fetch(`${API_BASE_URL}/photos/`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
        },
        body: payload,
      });
      if (response.status === 401) {
        resetSession();
        setToast({ status: 'error', message: 'Session expired. Please log in again.' });
        return;
      }
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      const newPhoto = await response.json();
      const photoWithFixedUrl = {
        ...newPhoto,
        image: resolveImageSrc(newPhoto.image),
      };
      setPhotos((current) => [photoWithFixedUrl, ...current]);
      setToast({ status: 'success', message: 'Photo uploaded successfully.' });
    } catch (error) {
      console.error('Upload error:', error);
      setToast({
        status: 'error',
        message: 'Upload failed. Confirm the backend is running.',
      });
      setBackendOnline(false);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!backendOnline) return;
    try {
      const response = await fetch(`${API_BASE_URL}/photos/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.status === 401) {
        resetSession();
        setToast({ status: 'error', message: 'Session expired. Please log in again.' });
        return;
      }
      if (!response.ok) {
        throw new Error('Deletion failed');
      }
      setPhotos((current) => current.filter((photo) => photo.id !== id));
      setToast({ status: 'info', message: 'Photo removed from gallery.' });
    } catch (error) {
      console.error(error);
      setToast({
        status: 'error',
        message: 'Unable to delete. Check the backend connection.',
      });
      setBackendOnline(false);
    }
  };

  const handleLogout = async () => {
    try {
      setSessionBusy(true);
      await fetch(`${API_BASE_URL}/auth/logout/`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSessionBusy(false);
      resetSession();
      setBackendOnline(true);
      setToast({ status: 'info', message: 'You have been logged out.' });
    }
  };

  const formDisabled = uploading || !backendOnline || !isAuthenticated;

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.add('db-admin-theme');
      return () => document.body.classList.remove('db-admin-theme');
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <>
        <AuthForm onLogin={handleLogin} authLoading={authLoading} backendOnline={backendOnline} />
        {toast && (
          <div className={`toast ${toast.status}`}>
            <p>{toast.message}</p>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="admin-shell">
      {!backendOnline && (
        <div className="status-banner error">
          <div>
            <h4>Backend disconnected</h4>
            <p>
              Start the Django server (python manage.py runserver) so uploads and deletes can sync to MySQL.
            </p>
          </div>
          <button type="button" onClick={fetchPhotos}>
            Retry connection
          </button>
        </div>
      )}
      <header className="admin-header">
        <div>
          <p className="eyebrow">SauravEdu Admin</p>
          <h1>Media Control Center</h1>
          <p className="subtitle">
            Upload hero visuals, keep website sections fresh, and manage the gallery that powers the public site.
          </p>
        </div>
        <div className="header-meta">
          <div className="stats-card">
            <p className="label">Total photos</p>
            <p className="value">{photos.length}</p>
            <p className="muted">Auto-sync ready for deployment</p>
          </div>
          <div className="session-card">
            <p className="label">Signed in</p>
            <p className="value user">{user?.username}</p>
            <button
              type="button"
              className="outline"
              onClick={handleLogout}
              disabled={sessionBusy}
            >
              {sessionBusy ? 'Signing out…' : 'Logout'}
            </button>
          </div>
        </div>
      </header>
      <section className="panel-grid">
        <PhotoUploadForm onSubmit={handleSubmit} formDisabled={formDisabled} backendOnline={backendOnline} />
        <div className="gallery-card">
          <div className="gallery-header">
            <div>
              <h2>Gallery manager</h2>
              <p>Search, review, and delete website-ready assets.</p>
            </div>
            <input
              className="search"
              type="search"
              placeholder="Search by title or category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {loading ? (
            <div className="loader">
              <span className="spinner" />
              <p>Loading photos...</p>
            </div>
          ) : (
            <GalleryGrid
              photos={photos}
              searchTerm={searchTerm}
              onDelete={handleDelete}
              backendOnline={backendOnline}
            />
          )}
        </div>
      </section>
      {toast && (
        <div className={`toast ${toast.status}`}>
          <p>{toast.message}</p>
        </div>
      )}
    </div>
  );
}

export default DB;
